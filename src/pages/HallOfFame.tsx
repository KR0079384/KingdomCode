
import { motion } from "framer-motion";
import { Crown, Hammer, Compass, Sprout } from "lucide-react";
import { contributors, type Contributor } from "@/lib/kingdom-data";



const ranks = [
  {
    rank: "Royal Council",
    icon: Crown,
    blurb: "Founders and stewards of the kingdom",
  },
  {
    rank: "Architect",
    icon: Compass,
    blurb: "Designers of structures and systems",
  },
  { rank: "Craftsman", icon: Hammer, blurb: "Builders refining the kingdom" },
  {
    rank: "Settler",
    icon: Sprout,
    blurb: "Newcomers planting the next district",
  },
] as const;

function bucket(rank: Contributor["rank"]) {
  return contributors.filter((c) => c.rank === rank);
}

export default function HallOfFamePage() {
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

      {ranks.map((r, idx) => {
        const Icon = r.icon;
        const members = bucket(r.rank);
        if (members.length === 0) return null;
        return (
          <motion.section
            key={r.rank}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
            className="glass rounded-3xl p-6"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <div>
                <h2 className="font-display text-xl">{r.rank}</h2>
                <div className="text-xs text-muted-foreground">{r.blurb}</div>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {members.map((m) => (
                <a
                  key={m.username}
                  href={m.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 rounded-2xl border border-glass-border bg-background/30 p-3 transition hover:bg-background/50"
                >
                  <img
                    src={m.avatar}
                    alt={m.username}
                    className="h-12 w-12 rounded-xl"
                  />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{m.username}</div>
                    <div className="text-[11px] text-muted-foreground">
                      {m.contributions} contribs · {m.questWins} quests
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </motion.section>
        );
      })}
    </div>
  );
}
