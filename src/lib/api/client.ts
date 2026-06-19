import type { Contributor, Entity, LeaderboardEntry } from "./types";

const apiUrl = import.meta.env.VITE_API_URL?.replace(/\/+$/, "") ?? "http://localhost:8000";

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${apiUrl}${path}`);

  if (!response.ok) {
    const errorText = await response.text().catch(() => response.statusText);
    throw new Error(`API request failed (${response.status}): ${errorText}`);
  }

  return response.json();
}

export async function getLeaderboard(): Promise<LeaderboardEntry[]> {
  return fetchJson<LeaderboardEntry[]>("/leaderboard");
}

export async function getContributors(): Promise<Contributor[]> {
  return fetchJson<Contributor[]>("/contributors");
}

export async function getEntities(): Promise<Entity[]> {
  return fetchJson<Entity[]>("/entities");
}
