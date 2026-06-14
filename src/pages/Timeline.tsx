
import { motion } from "framer-motion";
import { timeline, getContributor } from "@/lib/kingdom-data";



export default function TimelinePage() {
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

      <div className="relative pl-6">
        <span className="absolute left-2 top-1 bottom-1 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />
        <div className="space-y-4">
          {timeline.map((e, i) => {
            const c = getContributor(e.contributorId);
            return (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: i * 0.08,
                  type: "spring",
                  stiffness: 220,
                  damping: 24,
                }}
                className="relative"
              >
                <span className="absolute -left-[18px] top-4 grid h-6 w-6 place-items-center rounded-full bg-gradient-to-br from-primary to-accent text-xs text-primary-foreground shadow-lg shadow-primary/30">
                  {e.icon}
                </span>
                <div className="glass rounded-2xl p-4">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-display text-lg">{e.title}</h3>
                    <time className="text-[11px] uppercase tracking-wider text-muted-foreground">
                      {e.date}
                    </time>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {e.description}
                  </p>
                  {c && (
                    <div className="mt-3 flex items-center gap-2 text-xs">
                      <img
                        src={c.avatar}
                        alt={c.username}
                        className="h-6 w-6 rounded-md"
                      />
                      <a
                        href={c.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        by <span className="text-foreground">{c.username}</span>
                      </a>
                    </div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
