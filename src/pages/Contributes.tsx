import { motion } from "framer-motion";
import { Code as Github, Trophy } from "lucide-react";
import { contributors, entities } from "@/lib/kingdom-data";

export default function ContributorsPage() {
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {contributors.map((c, i) => {
          const built = entities.filter(
            (e) => e.contributorId === c.username,
          ).length;
          return (
            <motion.a
              key={c.username}
              href={c.github}
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
                  src={c.avatar}
                  alt={c.username}
                  className="h-14 w-14 rounded-2xl ring-1 ring-glass-border"
                />
                <div className="min-w-0">
                  <div className="truncate font-display text-lg">
                    {c.username}
                  </div>
                  <div className="text-[10px] uppercase tracking-wider text-primary">
                    {c.rank}
                  </div>
                </div>
              </div>
              <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                <Stat label="Entities" value={built} />
                <Stat label="Contribs" value={c.contributions} />
                <Stat label="Quests" value={c.questWins} />
              </div>
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Trophy className="h-3 w-3 text-primary" /> Rank: {c.rank}
                </span>
                <span className="flex items-center gap-1 group-hover:text-foreground">
                  <Github className="h-3 w-3" /> Profile
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
