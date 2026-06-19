export interface LeaderboardEntry {
  username: string;
  merged_prs: number;
  points: number;
}

export interface Contribution {
  pr_number: number;
  title: string;
  merged_at: string;
}

export interface Contributor {
  username: string;
  merged_prs: number;
  points: number;
  contributions: Contribution[];
}

export interface Entity {
  name: string;
  contributor: string;
  pr_number: number;
  merged_at: string;
}
