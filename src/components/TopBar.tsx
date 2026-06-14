import { Bell, Search, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { uiActions, useUI } from "@/lib/kingdom-store";
import { contributors, entities } from "@/lib/kingdom-data";

export function TopBar() {
  const query = useUI((s) => s.searchQuery);

  const handleSearch = (q: string) => {
    uiActions.setSearch(q);
    if (!q) return;
    const match = entities.find((e) =>
      [e.name, e.identity, e.type].join(" ").toLowerCase().includes(q.toLowerCase()),
    );
    if (match) uiActions.focusEntity(match.id);
  };

  return (
    <header className="sticky top-0 z-20 px-6 pt-4">
      <div className="glass flex flex-wrap items-center gap-4 rounded-2xl px-4 py-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground">
            <Shield className="h-4 w-4" />
          </div>
          <div className="min-w-0">
            <div className="font-display text-sm leading-none text-gradient-gold">OOP Kingdom</div>
            <div className="mt-1 flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald" />
              </span>
              Thriving
            </div>
          </div>
        </div>

        <div className="hidden items-center gap-4 text-xs md:flex">
          <Stat label="Entities" value={entities.length} />
          <div className="h-6 w-px bg-glass-border" />
          <Stat label="Contributors" value={contributors.length} />
        </div>

        <div className="ml-auto flex flex-1 items-center gap-3 sm:flex-none">
          <div className="relative flex-1 sm:w-80">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => handleSearch(e.target.value)}
              placeholder="Search entities, identities, contributors…"
              className="w-full rounded-xl border border-glass-border bg-background/40 py-2 pl-9 pr-3 text-sm outline-none ring-0 transition placeholder:text-muted-foreground focus:border-primary/50 focus:bg-background/70"
            />
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-glass-border bg-background/40 text-muted-foreground hover:text-foreground"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-primary" />
          </motion.button>
        </div>
      </div>
    </header>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="flex items-center gap-2">
      <span className="font-display text-lg text-gradient-gold">{value}</span>
      <span className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
    </div>
  );
}
