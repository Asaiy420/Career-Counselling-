import { useCallback, useEffect, useState } from "react";
import { fetchLatestRecommendations } from "../api";
import type { RecommendationResult } from "../types";

export function useRecommendations() {
  const [recommendations, setRecommendations] = useState<RecommendationResult[]>([]);
  const [submittedAt, setSubmittedAt] = useState<string | null>(null);
  const [categoryScores, setCategoryScores] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const refresh = useCallback(async () => {
    if (!token) {
      setRecommendations([]);
      setSubmittedAt(null);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchLatestRecommendations();
      setRecommendations(data.recommendations);
      setSubmittedAt(data.submittedAt);
      setCategoryScores(data.categoryScores);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load recommendations"
      );
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  const topCategories = Object.entries(categoryScores)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([category]) => category);

  return {
    recommendations,
    submittedAt,
    categoryScores,
    topCategories,
    loading,
    error,
    refresh,
    hasTakenAssessment: submittedAt !== null,
  };
}
