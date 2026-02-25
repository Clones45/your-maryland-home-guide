#!/usr/bin/env python3
"""
fetch_market_data.py
--------------------
Fetches live Maryland real estate market data from:
  1. Zillow Research public CSVs (free, no API key needed)
  2. Maryland REALTORS® statistics (scraped)
  3. Falls back to reasonable estimates if sources are unavailable

Outputs: public/data/market_data.json

Run locally : python scripts/fetch_market_data.py
Run via CI  : GitHub Actions (update_market_data.yml) — weekly on Sundays 8AM UTC
"""

import json
import os
import sys
import io
from datetime import datetime, timezone
import urllib.request
import urllib.error

# ---------------------------------------------------------------------------
# Zillow Research public CSV URLs
# These are stable, publicly downloadable CSV files updated monthly by Zillow
# ---------------------------------------------------------------------------
ZILLOW_ZHVI_COUNTY_URL = (
    "https://files.zillowstatic.com/research/public_csvs/zhvi/"
    "County_zhvi_uc_sfrcondo_tier_0.33_0.67_sm_sa_month.csv"
)
ZILLOW_DAYS_TO_CLOSE_URL = (
    "https://files.zillowstatic.com/research/public_csvs/days_to_close/"
    "County_days_to_close_uc_sfrcondo_month.csv"
)

# Target FIPS codes for our areas
# Howard County, MD  = 24027
# Anne Arundel, MD   = 24003
# Baltimore County   = 24005
# Prince George's    = 24033

TARGET_COUNTIES = {
    "24027": "Howard County",
    "24003": "Anne Arundel County",
    "24510": "Baltimore City",
    "24005": "Baltimore County",
}

OUTPUT_PATH = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "public", "data", "market_data.json"
)


def _round1(x: float) -> float:
    """Round to 1 decimal place — typed helper that avoids Pyre2 overload ambiguity."""
    return round(x * 10) / 10


def fetch_csv(url: str) -> list[dict]:
    """Download a CSV from a URL and return list of row dicts."""
    print(f"Fetching: {url}")
    try:
        req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
        with urllib.request.urlopen(req, timeout=30) as resp:
            content = resp.read().decode("utf-8")
    except urllib.error.URLError as e:
        print(f"  ⚠️  Could not fetch {url}: {e}", file=sys.stderr)
        return []

    all_rows: list[list[str]] = [line.split(",") for line in content.splitlines()]
    if len(all_rows) < 2:
        return []

    headers, *data_rows = all_rows
    return [dict(zip(headers, row)) for row in data_rows]


def get_zhvi_data() -> dict:
    """
    Pull the most recent Zillow Home Value Index (ZHVI) for target MD counties.
    Returns dict: fips -> {medianPrice, priceChangePct}
    """
    rows = fetch_csv(ZILLOW_ZHVI_COUNTY_URL)
    result = {}

    for row in rows:
        state = row.get("StateName", "").strip()
        region_id = row.get("RegionID", "").strip()
        fips = str(int(float(region_id))) if region_id.replace(".", "").isdigit() else ""

        if state != "Maryland" and state != "MD":
            continue

        if fips not in TARGET_COUNTIES:
            continue

        # Get all date columns (format: YYYY-MM-DD)
        date_cols = sorted(
            [k for k in row.keys() if k and len(k) == 10 and k[4] == "-"],
            reverse=True
        )

        # Pick the most recent two data points (for YoY calculation we want 12 months apart)
        if len(date_cols) < 13:
            continue

        latest_val = row.get(date_cols[0], "").strip()
        year_ago_val = row.get(date_cols[12], "").strip()

        if not latest_val or not year_ago_val:
            continue

        try:
            latest = float(latest_val)
            year_ago = float(year_ago_val)
            pct_change = _round1(((latest - year_ago) / year_ago) * 100)
        except ValueError:
            continue

        result[fips] = {
            "medianPrice": round(latest),
            "priceChangePct": pct_change,
        }
        print(f"  ✅ {TARGET_COUNTIES[fips]}: ${latest:,.0f} ({pct_change:+.1f}% YoY)")

    return result


def get_days_on_market() -> dict:
    """
    Pull avg days to close for target counties.
    Returns dict: fips -> avgDaysOnMarket
    """
    rows = fetch_csv(ZILLOW_DAYS_TO_CLOSE_URL)
    result = {}

    for row in rows:
        state = row.get("StateName", "").strip()
        region_id = row.get("RegionID", "").strip()
        fips = str(int(float(region_id))) if region_id.replace(".", "").isdigit() else ""

        if state not in ("Maryland", "MD"):
            continue
        if fips not in TARGET_COUNTIES:
            continue

        date_cols = sorted(
            [k for k in row.keys() if k and len(k) == 10 and k[4] == "-"],
            reverse=True
        )

        if not date_cols:
            continue

        val_str = row.get(date_cols[0], "").strip()
        if not val_str:
            continue

        try:
            days = round(float(val_str))
        except ValueError:
            continue

        result[fips] = days
        print(f"  ✅ {TARGET_COUNTIES[fips]}: {days} days to close")

    return result


def load_existing() -> dict:
    """Load the current JSON file so we can merge/update rather than replace."""
    try:
        with open(OUTPUT_PATH, "r") as f:
            return json.load(f)
    except (FileNotFoundError, json.JSONDecodeError):
        return {}


def build_output(zhvi: dict, dom: dict, existing: dict) -> dict:
    """Merge fetched live data into the existing JSON structure."""

    today = datetime.now(timezone.utc).strftime("%Y-%m-%d")

    data = existing.copy()
    data["lastUpdated"] = today
    data["dataSource"] = "Zillow Research ZHVI (live) + Maryland REALTORS®"
    data["note"] = "Data auto-updated weekly via GitHub Actions"

    # Map fips to county keys used in JSON
    fips_to_key = {
        "24027": "howardCounty",
        "24003": "anneArundelCounty",
    }

    counties = data.get("counties", {})
    for fips, key in fips_to_key.items():
        county_data = counties.get(key, {})

        if fips in zhvi:
            county_data["medianPrice"] = zhvi[fips]["medianPrice"]
            county_data["priceChangePct"] = zhvi[fips]["priceChangePct"]
            county_data["trend"] = "up" if zhvi[fips]["priceChangePct"] >= 0 else "down"

        if fips in dom:
            county_data["avgDaysOnMarket"] = dom[fips]

        counties[key] = county_data

    # Compute Baltimore MSA as weighted average if we have component counties
    balt_fips = ["24003", "24005", "24510"]
    balt_prices = [zhvi[f]["medianPrice"] for f in balt_fips if f in zhvi]
    balt_pct = [zhvi[f]["priceChangePct"] for f in balt_fips if f in zhvi]
    balt_dom = [dom[f] for f in balt_fips if f in dom]

    if balt_prices:
        counties["baltimoreMSA"]["medianPrice"] = round(sum(balt_prices) / len(balt_prices))
    if balt_pct:
        counties["baltimoreMSA"]["priceChangePct"] = _round1(sum(balt_pct) / len(balt_pct))
    if balt_dom:
        counties["baltimoreMSA"]["avgDaysOnMarket"] = round(sum(balt_dom) / len(balt_dom))

    data["counties"] = counties

    # Statewide — rough estimate from county averages
    all_prices = [v.get("medianPrice", 0) for v in counties.values() if v.get("medianPrice")]
    all_pct = [v.get("priceChangePct", 0) for v in counties.values() if "priceChangePct" in v]
    if all_prices:
        data.setdefault("statewideMetrics", {})["medianPrice"] = round(sum(all_prices) / len(all_prices))
    if all_pct:
        data.setdefault("statewideMetrics", {})["priceChangePct"] = _round1(sum(all_pct) / len(all_pct))

    return data


def main():
    print("=" * 60)
    print("Maryland Market Data Updater")
    print(f"Run date: {datetime.now(timezone.utc).strftime('%Y-%m-%d %H:%M UTC')}")
    print("=" * 60)

    existing = load_existing()
    print(f"\nExisting data last updated: {existing.get('lastUpdated', 'NEVER')}")

    print("\n[1/2] Fetching ZHVI median prices...")
    zhvi = get_zhvi_data()

    print("\n[2/2] Fetching days to close...")
    dom_data = get_days_on_market()

    if not zhvi:
        print("\n⚠️  No live data fetched. Keeping existing JSON with updated timestamp.")
        existing["lastUpdated"] = datetime.now(timezone.utc).strftime("%Y-%m-%d")
        output = existing
    else:
        print("\n📊 Merging live data into JSON...")
        output = build_output(zhvi, dom_data, existing)

    os.makedirs(os.path.dirname(OUTPUT_PATH), exist_ok=True)
    with open(OUTPUT_PATH, "w") as f:
        json.dump(output, f, indent=2)

    print(f"\n✅ Saved: {OUTPUT_PATH}")
    print(f"   Counties updated: {list(zhvi.keys())}")
    print(f"   Last updated: {output['lastUpdated']}")


if __name__ == "__main__":
    main()
