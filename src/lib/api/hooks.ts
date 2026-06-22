import { useEffect, useState } from "react";
import { getLeaderboard as getLocalLeaderboard } from "@/lib/kingdom-data";
import { contributors as localContributors } from "@/lib/kingdom-data";
import type { Contributor, Entity, LeaderboardEntry } from "./types";
import { getContributors as fetchContributors, getEntities as fetchEntities, getLeaderboard as fetchLeaderboard } from "./client";

export function useLeaderboard() {
  const [data, setData] = useState<LeaderboardEntry[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchLeaderboard()
      .then((result) => setData(result))
      .catch((err) => {
        setError(`Unable to load leaderboard. Showing fallback data. ${err.message}`);
        const fallback = getLocalLeaderboard(localContributors).map((contributor) => ({
          username: contributor.username,
          merged_prs: contributor.contributions,
          points: contributor.score,
        }));
        setData(fallback);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useContributors() {
  const [data, setData] = useState<Contributor[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchContributors()
      .then((result) => setData(result))
      .catch((err) => {
        setError(`Unable to load contributors. Showing fallback data. ${err.message}`);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}

export function useEntities() {
  const [data, setData] = useState<Entity[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetchEntities()
      .then((result) => setData(result))
      .catch((err) => {
        setError(`Unable to load entities. Showing fallback data. ${err.message}`);
        setData([]);
      })
      .finally(() => setLoading(false));
  }, []);

  return { data, loading, error };
}
