
import { useMemo } from "react";
import { motion } from "framer-motion";
import { useContributors } from "@/lib/api/hooks";

const entityIconMap: Record<string, string> = {
  hospital: "🏥",
  tavern: "🍺",
  barracks: "⚔️",
  market: "🏪",
  farm: "🌾",
  lumberyard: "🪵",
  cityhall: "🏰",
};

function getEntityIcon(title: string) {
  const normalized = title.toLowerCase();

  for (const key of Object.keys(entityIconMap)) {
    if (normalized.includes(key)) {
      return entityIconMap[key];
    }
  }

  return "📜";
}

interface TimelineEvent {
  username: string;
  title: string;
  prNumber: number;
  mergedAt: string;
  icon: string;
}

export default function TimelinePage() {
  const { data: contributors, loading, error } = useContributors();

  const timelineEvents = useMemo(() => {
    if (!contributors) return [];

    return contributors
      .flatMap((contributor) =>
        contributor.contributions.map((contribution) => ({
          username: contributor.username,
          title: contribution.title,
          prNumber: contribution.pr_number,
          mergedAt: contribution.merged_at,
          icon: getEntityIcon(contribution.title),
        }))
      )
      .sort(
        (a, b) =>
          new Date(b.mergedAt).getTime() - new Date(a.mergedAt).getTime()
      );
  }, [contributors]);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Chronicle
        </div>
        <h1 className="mt-1 font-display text-3xl text-gradient-gold">
          Kingdom Timeline
        </h1>
      </header>

      {error ? (
        <div className="glass rounded-3xl border border-glass-border p-6 text-sm text-amber-foreground">
          <div className="font-medium">Unable to load timeline.</div>
          <p className="mt-2 text-muted-foreground">
            The timeline could not be fetched from the backend.
          </p>
        </div>
      ) : null}

      {loading ? (
        <div className="glass rounded-3xl border border-glass-border p-6 text-center text-muted-foreground">
          Loading timeline...
        </div>
      ) : null}

      {!loading && timelineEvents.length === 0 ? (
        <div className="glass rounded-3xl border border-glass-border p-6 text-sm text-muted-foreground">
          No timeline events found.
        </div>
      ) : null}

      <div className="relative pl-6">
        <span className="absolute left-2 top-1 bottom-1 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />
        <div className="space-y-4">
          {timelineEvents.map((event, index) => (
            <motion.div
              key={`${event.username}-${event.prNumber}-${event.mergedAt}`}
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{
                delay: index * 0.06,
                type: "spring",
                stiffness: 220,
                damping: 24,
              }}
              className="relative"
            >
              <span className="absolute -left-[18px] top-4 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs text-primary-foreground shadow-lg shadow-primary/30">
                {event.icon}
              </span>
              <div className="glass rounded-2xl p-4">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-lg">{event.title}</h3>
                  <time className="text-[11px] uppercase tracking-wider text-muted-foreground">
                    {new Date(event.mergedAt).toLocaleDateString()}
                  </time>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">
                  PR #{event.prNumber} merged by{' '}
                  <a
                    href={`https://github.com/${event.username}`}
                    target="_blank"
                    rel="noreferrer"
                    className="font-medium text-foreground hover:underline"
                  >
                    {event.username}
                  </a>
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
