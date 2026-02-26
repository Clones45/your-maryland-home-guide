import { useState, useEffect } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface SeoReview {
    author: string;
    rating: number | null;
    text: string;
    relativeDate: string;
}

export interface SeoStats {
    lastUpdated: string | null;
    localPackRank: number | null;
    rating: number | null;
    reviewCount: number | null;
    reviews: SeoReview[];
}

type HookReturn = {
    stats: SeoStats | null;
    loading: boolean;
    error: boolean;
};

// ---------------------------------------------------------------------------
// Hook
// ---------------------------------------------------------------------------

const SEO_STATS_URL = "/data/seo_stats.json";

/** Fetches seo_stats.json on mount. Returns null while loading or on error
 *  so consumers can safely hide SEO UI until real data is available. */
export function useSeoStats(): HookReturn {
    const [stats, setStats] = useState<SeoStats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        let cancelled = false;

        const fetchStats = async () => {
            try {
                const res = await fetch(SEO_STATS_URL, { cache: "no-store" });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data: SeoStats = await res.json();

                // Only surface data if there's at least something meaningful
                const hasData =
                    data.localPackRank !== null ||
                    data.rating !== null ||
                    (Array.isArray(data.reviews) && data.reviews.length > 0);

                if (!cancelled) {
                    setStats(hasData ? data : null);
                    setError(false);
                }
            } catch {
                if (!cancelled) {
                    setStats(null);
                    setError(true);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchStats();
        return () => { cancelled = true; };
    }, []);

    return { stats, loading, error };
}
