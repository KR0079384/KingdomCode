import { motion } from "framer-motion";
import { Award, ArrowUpRight, Users, Sparkles } from "lucide-react";
import { StatCard } from "@/components/StatCards";
import { cn } from "@/lib/utils";
import { getContributorScore, getLeaderboard, timeline, contributors } from "@/lib/kingdom-data";
import { useLeaderboard } from "@/lib/api/hooks";

const rankBadgeStyles: Record<string, string> = {
  "Royal Council": "bg-amber/20 text-amber border border-amber/30",
  Architect: "bg-violet/20 text-violet-200 border border-violet/30",
  Craftsman: "bg-sky/20 text-sky-200 border border-sky/30",
  Settler: "bg-emerald/20 text-emerald border border-emerald/30",
};

const summaryStats = [
  {
    label: "Total Contributors",
    value: contributors.length,
    icon: Users,
    tint: "from-accent/30 to-primary/10",
    description: "active kingdom builders",
  },
  {
    label: "Total Contributions",
    value: contributors.reduce((sum, contributor) => sum + contributor.contributions, 0),
    icon: Sparkles,
    tint: "from-primary/30 to-amber/10",
    description: "pull requests merged",
  },
  {
    label: "Total Quest Wins",
    value: contributors.reduce((sum, contributor) => sum + contributor.questWins, 0),
    icon: Award,
    tint: "from-emerald/30 to-emerald/10",
    description: "kingdom achievements earned",
  },
  {
    label: "Highest Score",
    value: Math.max(...contributors.map(getContributorScore), 0),
    icon: ArrowUpRight,
    tint: "from-cyan-300/30 to-slate-300/10",
    description: "top leaderboard score",
  },
];

function LeaderboardPodiumCard({
  contributor,
  position,
}: {
  contributor: ReturnType<typeof getLeaderboard>[number];
  position: number;
}) {
  const label = position === 1 ? "Gold" : position === 2 ? "Silver" : "Bronze";
  const sizeClass = position === 1 ? "lg:col-span-2" : "lg:col-span-1";

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: position * 0.05 }}
      className={cn(
        "glass rounded-3xl border border-glass-border p-5 text-left",
        sizeClass,
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {label} Podium
          </div>
          <div className="font-display text-2xl text-gradient-gold mt-1">
            {contributor.username}
          </div>
        </div>
        <img
          src={contributor.avatar}
          alt={contributor.username}
          className="h-16 w-16 rounded-2xl ring-1 ring-glass-border"
        />
      </div>
      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={cn(
          "rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] border",
          rankBadgeStyles[contributor.rank],
        )}>
          {contributor.rank}
        </span>
        <span className="rounded-full bg-background/40 px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Score {contributor.score}
        </span>
      </div>
      <div className="mt-5 grid min-w-0 grid-cols-3 gap-3 text-sm text-muted-foreground">
        <div className="min-w-0 rounded-2xl border border-glass-border bg-background/30 p-3">
          <div className="break-words text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Contributions</div>
          <div className="mt-2 font-medium text-foreground">{contributor.contributions}</div>
        </div>
        <div className="min-w-0 rounded-2xl border border-glass-border bg-background/30 p-3">
          <div className="break-words text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Quest Wins</div>
          <div className="mt-2 font-medium text-foreground">{contributor.questWins}</div>
        </div>
        <div className="min-w-0 rounded-2xl border border-glass-border bg-background/30 p-3">
          <div className="break-words text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Rank</div>
          <div className="mt-2 font-medium text-foreground">{contributor.rank}</div>
        </div>
      </div>
    </motion.div>
  );
}

export default function LeaderboardPage() {
  const { data: leaderboardData, loading, error } = useLeaderboard();
  const leaderboard = (leaderboardData ?? getLeaderboard(contributors).map((contributor) => ({
    username: contributor.username,
    merged_prs: contributor.contributions,
    points: contributor.score,
  })))
    .slice()
    .sort((a, b) => b.points - a.points)
    .map((entry) => {
      const local = contributors.find((contributor) => contributor.username === entry.username);
      return {
        username: entry.username,
        merged_prs: entry.merged_prs,
        points: entry.points,
        avatar: local?.avatar ?? `https://github.com/${entry.username}.png`,
        github: local?.github ?? `https://github.com/${entry.username}`,
        rank: local?.rank ?? "Settler",
        contributions: entry.merged_prs,
        questWins: local?.questWins ?? 0,
        score: entry.points,
      };
    });
  const podium = leaderboard.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-6"
    >
      <header>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Kingdom Honors
        </div>
        <h1 className="mt-1 font-display text-3xl text-gradient-gold">
          🏆 Kingdom Leaderboard
        </h1>
        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
          Recognizing the architects, craftsmen, and settlers shaping the kingdom.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        {summaryStats.map((stat, index) => (
          <StatCard
            key={stat.label}
            label={stat.label}
            value={stat.value}
            icon={stat.icon}
            tint={stat.tint}
            delay={index * 0.06}
            description={stat.description}
          />
        ))}
      </div>

      <section className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="glass rounded-3xl border border-glass-border p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Podium
              </div>
              <h2 className="mt-1 text-2xl font-display text-gradient-gold">Top Kingdom Champions</h2>
            </div>
            <Award className="h-6 w-6 text-primary" />
          </div>
          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {loading ? (
              <div className="col-span-full rounded-3xl border border-glass-border bg-background/30 p-6 text-center text-muted-foreground">
                Loading leaderboard...
              </div>
            ) : (
              podium.map((contributor, index) => (
                <LeaderboardPodiumCard
                  key={contributor.username}
                  contributor={contributor}
                  position={index + 1}
                />
              ))
            )}
          </div>
        </div>

        <div className="glass rounded-3xl border border-glass-border p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Recent Kingdom Achievements
              </div>
              <h2 className="mt-1 text-2xl font-display text-gradient-gold">Milestones</h2>
            </div>
            <Sparkles className="h-6 w-6 text-emerald" />
          </div>
          <div className="mt-6 space-y-4">
            {timeline.map((event) => (
              <div key={event.id} className="rounded-3xl border border-glass-border bg-background/30 p-4">
                <div className="flex items-start gap-4">
                  <div className="grid h-12 w-12 place-items-center rounded-3xl bg-gradient-to-br from-primary/20 to-accent/10 text-2xl">
                    {event.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-base font-medium text-foreground">{event.title}</div>
                    <div className="mt-1 flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                      <span>{event.date}</span>
                      <span className="h-px w-1 rounded-full bg-glass-border" />
                      <span>{event.contributorId}</span>
                    </div>
                    <p className="mt-2 text-sm text-muted-foreground">{event.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="glass rounded-3xl border border-glass-border p-6">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
              Full Rankings
            </div>
            <h2 className="mt-1 text-2xl font-display text-gradient-gold">Complete Leaderboard</h2>
          </div>
          <div className="text-sm text-muted-foreground">Sorted by score, highest to lowest.</div>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="min-w-full border-separate border-spacing-0 text-sm">
            <thead>
              <tr>
                {[
                  "Position",
                  "Contributor",
                  "Rank",
                  "Contributions",
                  "Quest Wins",
                  "Score",
                  "GitHub",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="border-b border-glass-border px-4 py-3 text-left text-[10px] uppercase tracking-[0.3em] text-muted-foreground"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-glass-border">
              {leaderboard.map((contributor, index) => (
                <tr key={contributor.username} className="transition hover:bg-background/40">
                  <td className="px-4 py-4 text-muted-foreground">#{index + 1}</td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={contributor.avatar}
                        alt={contributor.username}
                        className="h-10 w-10 rounded-2xl ring-1 ring-glass-border"
                      />
                      <div>
                        <div className="font-medium text-foreground">{contributor.username}</div>
                        <div className="text-xs text-muted-foreground">{contributor.github}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span className={cn(
                      "inline-flex rounded-full px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] border",
                      rankBadgeStyles[contributor.rank],
                    )}>{contributor.rank}</span>
                  </td>
                  <td className="px-4 py-4 text-foreground">{contributor.contributions}</td>
                  <td className="px-4 py-4 text-foreground">{contributor.questWins}</td>
                  <td className="px-4 py-4 text-foreground">{contributor.score}</td>
                  <td className="px-4 py-4">
                    <a
                      href={contributor.github}
                      target="_blank"
                      rel="noreferrer"
                      className="rounded-full border border-glass-border bg-background/40 px-3 py-1 text-xs font-medium text-primary transition hover:bg-primary/10"
                    >
                      View Profile
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </motion.div>
  );
}
