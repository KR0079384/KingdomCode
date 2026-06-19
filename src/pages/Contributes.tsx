import { motion } from "framer-motion";
import { Code as Github, Trophy } from "lucide-react";
import { useContributors } from "@/lib/api/hooks";

export default function ContributorsPage() {
  const { data: contributors, loading, error } = useContributors();
  const sortedContributors = (contributors ?? []).slice().sort((a, b) => b.points - a.points);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          The Builders
        </div>
        <h1 className="mt-1 font-display text-3xl text-gradient-gold">
          Contributors
        </h1>
      </header>

      {error ? (
        <div className="glass rounded-3xl border border-glass-border p-6 text-sm text-amber-foreground">
          <div className="font-medium">{error}</div>
          <p className="mt-2 text-muted-foreground">Unable to load contributors from the backend.</p>
        </div>
      ) : null}

      {loading ? (
        <div className="glass rounded-3xl border border-glass-border p-6 text-center text-muted-foreground">
          Loading contributors...
        </div>
      ) : null}

      {!loading && sortedContributors.length === 0 ? (
        <div className="glass rounded-3xl border border-glass-border p-6 text-sm text-muted-foreground">
          No contributors found.
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {sortedContributors.map((contributor, i) => {
          const githubUrl = `https://github.com/${contributor.username}`;
          const avatarUrl = `https://github.com/${contributor.username}.png`;
          const recentContributions = [...contributor.contributions]
            .sort((a, b) => new Date(b.merged_at).getTime() - new Date(a.merged_at).getTime())
            .slice(0, 3);

          return (
            <motion.a
              key={contributor.username}
              href={githubUrl}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              whileHover={{ y: -4 }}
              className="glass group relative overflow-hidden rounded-3xl p-5"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-gradient-to-br from-primary/20 to-accent/10 blur-2xl" />
              <div className="flex items-center gap-4">
                <img
                  src={avatarUrl}
                  alt={contributor.username}
                  className="h-14 w-14 rounded-2xl ring-1 ring-glass-border"
                />
                <div className="min-w-0">
                  <div className="truncate font-display text-lg">{contributor.username}</div>
                  <div className="text-[10px] uppercase tracking-wider text-primary">
                    Contributor
                  </div>
                </div>
              </div>

              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <Stat label="Points" value={contributor.points} />
                <Stat label="Merged PRs" value={contributor.merged_prs} />
                <Stat label="Contribs" value={contributor.contributions.length} />
              </div>

              <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                <div className="font-medium text-foreground">Recent Contributions</div>
                <div className="space-y-1">
                  {recentContributions.length > 0 ? (
                    recentContributions.map((contribution) => (
                      <div key={contribution.pr_number} className="rounded-2xl border border-glass-border bg-background/30 p-3">
                        <div className="font-medium text-foreground">{contribution.title}</div>
                        <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                          PR #{contribution.pr_number} · {new Date(contribution.merged_at).toLocaleDateString()}
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="rounded-2xl border border-glass-border bg-background/30 p-3 text-muted-foreground">
                      No recent contributions
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Trophy className="h-3 w-3 text-primary" /> Points: {contributor.points}
                </span>
                <span className="flex items-center gap-1 group-hover:text-foreground">
                  <Github className="h-3 w-3" /> View GitHub
                </span>
              </div>
            </motion.a>
          );
        })}
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-glass-border bg-background/30 p-2">
      <div className="font-display text-lg text-gradient-gold">{value}</div>
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
    </div>
  );
}


