export type EntityType = "CITYHALL" | "FARM" | "LUMBERYARD" | "BARRACKS" | "MARKET";
export type EntityStatus = "OPERATIONAL" | "UNDER_CONSTRUCTION" | "PLANNED";

export interface Contributor {
  username: string;
  github: string;
  avatar: string;
  rank: "Royal Council" | "Architect" | "Craftsman" | "Settler";
  contributions: number;
  questWins: number;
}

export interface KingdomEntity {
  id: string;
  identity: string;
  name: string;
  type: EntityType;
  status: EntityStatus;
  founded: string;
  description: string;
  contributorId: string;
  properties?: Record<string, string | number>;
  position: { x: number; y: number };
}

export interface KingdomEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  icon: string;
  title: string;
  contributorId: string;
  description: string;
}

export const contributors: Contributor[] = [
  {
    username: "Kk200507",
    github: "https://github.com/Kk200507",
    avatar: "https://github.com/Kk200507.png",
    rank: "Royal Council",
    contributions: 3,
    questWins: 5,
  },
  {
    username: "octocat",
    github: "https://github.com/octocat",
    avatar: "https://github.com/octocat.png",
    rank: "Architect",
    contributions: 2,
    questWins: 3,
  },
  {
    username: "torvalds",
    github: "https://github.com/torvalds",
    avatar: "https://github.com/torvalds.png",
    rank: "Craftsman",
    contributions: 1,
    questWins: 1,
  },
];

export const entities: KingdomEntity[] = [
  {
    id: "cityhall-001",
    identity: "CITYHALL-001",
    name: "First Settlement",
    type: "CITYHALL",
    status: "OPERATIONAL",
    founded: "2025-01-12",
    description:
      "The founding seat of the kingdom. All dependencies flow outward from here.",
    contributorId: "Kk200507",
    properties: { Population: 240, Influence: 100 },
    position: { x: 0, y: 0 },
  },
  {
    id: "farm-f153641f",
    identity: "FARM-F153641F",
    name: "Auto-generated Farm",
    type: "FARM",
    status: "UNDER_CONSTRUCTION",
    founded: "2025-02-03",
    description: "Provides sustenance for the growing population.",
    contributorId: "Kk200507",
    properties: { "Crop Yield": 30, "Workers": 8 },
    position: { x: -320, y: 220 },
  },
  {
    id: "lumberyard-1023cd3d",
    identity: "LUMBERYARD-1023CD3D",
    name: "Lumberyard",
    type: "LUMBERYARD",
    status: "UNDER_CONSTRUCTION",
    founded: "2025-02-09",
    description: "Harvests timber for construction and trade.",
    contributorId: "Kk200507",
    properties: { "Wood Stockpile": 50, "Harvest Rate": 25, Capacity: 500 },
    position: { x: 320, y: 220 },
  },
];

export const edges: KingdomEdge[] = [
  { id: "e1", source: "cityhall-001", target: "farm-f153641f", label: "supplies" },
  { id: "e2", source: "cityhall-001", target: "lumberyard-1023cd3d", label: "commands" },
];

export const timeline: TimelineEvent[] = [
  {
    id: "t1",
    date: "2025-01-12",
    icon: "🏰",
    title: "Kingdom Founded",
    contributorId: "Kk200507",
    description: "The First Settlement was raised, marking the dawn of the kingdom.",
  },
  {
    id: "t2",
    date: "2025-02-03",
    icon: "🌾",
    title: "Farm Added",
    contributorId: "Kk200507",
    description: "Auto-generated Farm began breaking ground.",
  },
  {
    id: "t3",
    date: "2025-02-09",
    icon: "🪵",
    title: "Lumberyard Added",
    contributorId: "Kk200507",
    description: "Construction of the kingdom's first Lumberyard began.",
  },
  {
    id: "t4",
    date: "2025-03-01",
    icon: "⚔️",
    title: "Barracks Proposed",
    contributorId: "octocat",
    description: "Initial blueprints for a Barracks entered review.",
  },
];

export function getContributor(username: string): Contributor | undefined {
  return contributors.find((c) => c.username === username);
}

export interface RankedContributor extends Contributor {
  score: number;
}

export function getContributorScore(contributor: Contributor) {
  return contributor.contributions * 100 + contributor.questWins * 250;
}

export function getLeaderboard(contributorsList: Contributor[]): RankedContributor[] {
  return contributorsList
    .map((contributor) => ({
      ...contributor,
      score: getContributorScore(contributor),
    }))
    .sort((a, b) => b.score - a.score);
}
