"""
fetch_gbp_data.py
=================
Stealth-scrapes Google for Gayane Gevorgyan's:
  - Local 3-Pack rank
  - Average star rating (Google Business Profile)
  - 3 most recent Google reviews

Outputs to: public/data/seo_stats.json
Fallback:   If any part of the scrape fails, existing JSON is preserved /
            merged so old reviews are never lost.

Usage:
    pip install scrapling playwright
    playwright install chromium
    python scripts/fetch_gbp_data.py
"""

import json
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Dict, List, Optional
import itertools

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
REPO_ROOT = Path(__file__).resolve().parent.parent
OUTPUT_FILE = REPO_ROOT / "public" / "data" / "seo_stats.json"

# ---------------------------------------------------------------------------
# Config
# ---------------------------------------------------------------------------
SEARCH_QUERY = "Gayane Gevorgyan Realtor Maryland"
TARGET_NAME_SNIPPET = "gayane"   # matched case-insensitively in pack results

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def load_existing() -> Dict[str, Any]:
    """Load existing JSON if present; return empty scaffold otherwise."""
    if OUTPUT_FILE.exists():
        try:
            with open(OUTPUT_FILE, "r", encoding="utf-8") as fh:
                return json.load(fh)
        except Exception:
            pass
    return {
        "lastUpdated": None,
        "localPackRank": None,
        "rating": None,
        "reviewCount": None,
        "reviews": [],
    }


def save(data: dict) -> None:
    OUTPUT_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(OUTPUT_FILE, "w", encoding="utf-8") as fh:
        json.dump(data, fh, indent=2, ensure_ascii=False)
    print(f"[OK] Written → {OUTPUT_FILE}")


def merge(existing: Dict[str, Any], fresh: Dict[str, Any]) -> Dict[str, Any]:
    """
    Merge fresh data into existing, preserving old values for keys that
    the fresh scrape couldn't populate (i.e., None means 'scrape failed').
    """
    merged = existing.copy()
    for key, value in fresh.items():
        if value is not None:
            # For reviews: keep up to 3 most recent, deduplicated by text
            if key == "reviews" and isinstance(value, list) and len(value) > 0:
                existing_texts = {r.get("text", "") for r in merged.get("reviews", [])}
                combined = value + [r for r in merged.get("reviews", []) if r.get("text") not in {v.get("text") for v in value}]
                merged[key] = list(itertools.islice(combined, 3))
            else:
                merged[key] = value
    merged["lastUpdated"] = datetime.now(timezone.utc).strftime("%Y-%m-%dT%H:%M:%SZ")
    return merged


# ---------------------------------------------------------------------------
# Core scraping logic using Scrapling + Playwright Fetcher
# ---------------------------------------------------------------------------

def scrape() -> Dict[str, Any]:
    """
    Returns a dict with keys:
        localPackRank  : int | None   (1-indexed position in Google 3-Pack)
        rating         : float | None
        reviewCount    : int | None
        reviews        : list[dict]   [{author, rating, text, relativeDate}]
    All values default to None if parsing fails.
    """
    result: Dict[str, Any] = {
        "localPackRank": None,
        "rating": None,
        "reviewCount": None,
        "reviews": [],
    }

    try:
        from scrapling.fetchers import PlaywrightFetcher  # type: ignore[import]
    except ImportError:
        print("[ERROR] scrapling not installed. Run: pip install scrapling playwright && playwright install chromium")
        return result

    search_url = (
        "https://www.google.com/search?q="
        + SEARCH_QUERY.replace(" ", "+")
        + "&hl=en&gl=us&num=10"
    )

    print(f"[INFO] Fetching: {search_url}")

    try:
        fetcher = PlaywrightFetcher(
            headless=True,
            stealth=True,
            network_idle=True,
        )
        page = fetcher.fetch(search_url)
    except Exception as exc:
        print(f"[ERROR] Playwright fetch failed: {exc}")
        return result

    # ------------------------------------------------------------------
    # 1. Local 3-Pack rank
    # ------------------------------------------------------------------
    try:
        # Google Local Pack results usually sit inside divs with data-cid or
        # inside the local results block. We grab all pack entries by the
        # characteristic 'div[data-local-attribute]' or the 'a' links with
        # href containing /maps/
        pack_entries = page.find_all("div[data-local-attribute]") or \
                       page.find_all("div.rllt__details") or \
                       page.find_all("div[data-rc]")

        if not pack_entries:
            # Fallback: look for anchor texts inside typical 3-pack structure
            pack_entries = page.find_all("a[data-cid]")

        for idx, entry in enumerate(pack_entries, start=1):
            text = entry.get_text(" ", strip=True).lower()
            if TARGET_NAME_SNIPPET in text:
                result["localPackRank"] = idx
                print(f"[OK] Local Pack rank: #{idx}")
                break

        if result["localPackRank"] is None:
            print("[WARN] Could not determine Local Pack rank.")
    except Exception as exc:
        print(f"[WARN] Pack rank extraction failed: {exc}")

    # ------------------------------------------------------------------
    # 2. Rating & Review Count from Knowledge Panel
    # ------------------------------------------------------------------
    try:
        # Rating appears in the Knowledge Panel as text like "4.9"
        # Google renders it inside span[aria-label] or a dedicated block.
        rating_candidates = page.find_all("span[aria-label]")
        for span in rating_candidates:
            label = span.get_attribute("aria-label", "") or ""
            # Look for "Rated X out of 5" or similar
            m = re.search(r"(\d+\.?\d*)\s+out\s+of\s+5", label, re.I)
            if m:
                result["rating"] = float(m.group(1))
                print(f"[OK] Rating: {result['rating']}")
                break

        if result["rating"] is None:
            # Try text patterns like "4.9 ★" or "4.9 stars"
            all_text = page.get_text(" ", strip=True)
            m = re.search(r"\b(4|5)\.\d\b.*?(?:star|review)", all_text[:5000], re.I)
            if m:
                result["rating"] = float(m.group(1))
                print(f"[OK] Rating (fallback): {result['rating']}")

        # Review count
        m_count = re.search(r"([\d,]+)\s+(?:Google\s+)?review", page.get_text(" "), re.I)
        if m_count:
            result["reviewCount"] = int(m_count.group(1).replace(",", ""))
            print(f"[OK] Review count: {result['reviewCount']}")
    except Exception as exc:
        print(f"[WARN] Rating/count extraction failed: {exc}")

    # ------------------------------------------------------------------
    # 3. Latest Reviews
    # ------------------------------------------------------------------
    try:
        # Reviews in SERP snippets often appear inside divs with class
        # containing "review" or "PBEvAb". We try multiple selectors.
        review_blocks = (
            page.find_all("div.PBEvAb") or
            page.find_all("div[data-review-id]") or
            page.find_all("g-review-stars + span") or
            []
        )

        for block in itertools.islice(review_blocks, 3):
            try:
                text_el = block.find("span.review-full-text") or \
                           block.find("span[data-expanded-text]") or \
                           block.find("span")
                review_text = text_el.get_text(" ", strip=True) if text_el else block.get_text(" ", strip=True)

                author_el = block.find("span.TSUbDb") or block.find("div.oqSTJd") or None
                author = author_el.get_text(strip=True) if author_el else "Google Reviewer"

                # Star rating inside block
                stars_el = block.find("span[aria-label]")
                stars_label = stars_el.get_attribute("aria-label", "") if stars_el else ""
                stars_match = re.search(r"(\d+\.?\d*)", stars_label)
                stars = float(stars_match.group(1)) if stars_match else None

                date_el = block.find("span.dehysf") or block.find("span.rsqaWe") or None
                rel_date = date_el.get_text(strip=True) if date_el else ""

                if review_text and len(review_text) > 10:
                    result["reviews"].append({
                        "author": author,
                        "rating": stars,
                        "text": review_text[:300],
                        "relativeDate": rel_date,
                    })
            except Exception:
                continue

        print(f"[OK] Reviews captured: {len(result['reviews'])}")
    except Exception as exc:
        print(f"[WARN] Review extraction failed: {exc}")

    return result


# ---------------------------------------------------------------------------
# Entry Point
# ---------------------------------------------------------------------------

def main():
    print("=" * 55)
    print("  Gayane Gevorgyan — GBP & SEO Data Fetcher")
    print("=" * 55)

    existing = load_existing()
    fresh = scrape()
    merged = merge(existing, fresh)
    save(merged)

    # Print summary
    print("\n── Summary ────────────────────────────────────")
    print(f"  Local Pack Rank : #{merged.get('localPackRank', 'N/A')}")
    print(f"  Rating          : {merged.get('rating', 'N/A')} ★")
    print(f"  Reviews stored  : {len(merged.get('reviews', []))}")
    print(f"  Last updated    : {merged.get('lastUpdated')}")
    print("───────────────────────────────────────────────\n")


if __name__ == "__main__":
    main()
