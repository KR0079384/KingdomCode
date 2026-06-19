import { motion } from "framer-motion";
import { Award, ArrowUpRight, Crown, Users } from "lucide-react";
import { useContributors } from "@/lib/api/hooks";

export default function HallOfFamePage() {
  const { data: contributors, loading, error } = useContributors();
  const sortedContributors = (contributors ?? []).slice().sort((a, b) => b.points - a.points);
  const top3 = sortedContributors.slice(0, 3);
  const topContributor = sortedContributors[0];
  const mostMerged = sortedContributors.reduce((best, contributor) => {
    if (!best || contributor.merged_prs > best.merged_prs) {
      return contributor;
    }
    return best;
  }, sortedContributors[0]);
  const highestScore = topContributor;

  return (
    <div className="flex flex-col gap-8">
      <header>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Order of Merit
        </div>
        <h1 className="mt-1 font-display text-3xl text-gradient-gold">
          Hall of Fame
        </h1>
      </header>

      {error ? (
        <div className="glass rounded-3xl border border-glass-border p-6 text-sm text-amber-foreground">
          <div className="font-medium">Unable to load Hall of Fame data.</div>
          <p className="mt-2 text-muted-foreground">Please check your backend connection and refresh.</p>
        </div>
      ) : null}

      {loading ? (
        <div className="glass rounded-3xl border border-glass-border p-6 text-center text-muted-foreground">
          Loading Hall of Fame...
        </div>
      ) : null}

      {!loading && !error && (
        <>
          <section className="grid gap-4 lg:grid-cols-4">
            <MetricCard
              label="Top Contributor"
              value={topContributor?.username ?? "—"}
              subtext={topContributor ? `${topContributor.points} points` : "No data"}
              icon={Crown}
            />
            <MetricCard
              label="Most Merged PRs"
              value={mostMerged ? mostMerged.username : "—"}
              subtext={mostMerged ? `${mostMerged.merged_prs} merged PRs` : "No data"}
              icon={Users}
            />
            <MetricCard
              label="Highest Score"
              value={highestScore?.points.toString() ?? "—"}
              subtext={highestScore ? `${highestScore.username}` : "No data"}
              icon={ArrowUpRight}
            />
            <MetricCard
              label="Total Contributors"
              value={(contributors ?? []).length.toString()}
              subtext="active kingdom builders"
              icon={Award}
            />
          </section>

          <section className="glass rounded-3xl border border-glass-border p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                  Top 3 Contributors
                </div>
                <h2 className="mt-1 text-2xl font-display text-gradient-gold">Hall of Fame Standings</h2>
              </div>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {top3.length > 0 ? (
                top3.map((contributor) => {
                  const githubUrl = `https://github.com/${contributor.username}`;
                  const avatarUrl = `https://github.com/${contributor.username}.png`;
                  return (
                    <a
                      key={contributor.username}
                      href={githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="glass group rounded-3xl border border-glass-border p-5 transition hover:border-primary/30"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src={avatarUrl}
                          alt={contributor.username}
                          className="h-16 w-16 rounded-2xl ring-1 ring-glass-border"
                        />
                        <div className="min-w-0">
                          <div className="truncate font-display text-lg text-foreground">
                            {contributor.username}
                          </div>
                          <div className="mt-1 text-xs uppercase tracking-[0.2em] text-muted-foreground">
                            {contributor.points} points
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
                        <div className="rounded-2xl border border-glass-border bg-background/30 p-3">
                          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            Merged PRs
                          </div>
                          <div className="mt-2 font-medium text-foreground">{contributor.merged_prs}</div>
                        </div>
                        <div className="rounded-2xl border border-glass-border bg-background/30 p-3">
                          <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                            Contributions
                          </div>
                          <div className="mt-2 font-medium text-foreground">{contributor.contributions.length}</div>
                        </div>
                      </div>
                    </a>
                  );
                })
              ) : (
                <div className="rounded-3xl border border-glass-border bg-background/30 p-6 text-muted-foreground">
                  No contributors available.
                </div>
              )}
            </div>
          </section>
        </>
      )}
    </div>
  );
}

function MetricCard({
  label,
  value,
  subtext,
  icon: Icon,
}: {
  label: string;
  value: string;
  subtext: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <div className="glass rounded-3xl border border-glass-border p-6">
      <div className="flex items-center justify-between gap-3">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">{label}</div>
          <div className="mt-2 text-2xl font-display text-foreground">{value}</div>
        </div>
        <span className="grid h-12 w-12 place-items-center rounded-3xl bg-background/30 text-primary">
          <Icon className="h-5 w-5" />
        </span>
      </div>
      <div className="mt-4 text-sm text-muted-foreground">{subtext}</div>
    </div>
  );
}
