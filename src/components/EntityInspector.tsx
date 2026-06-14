import { AnimatePresence, motion } from "framer-motion";
import { Code as Github, X, Calendar, Hash, Fingerprint, Activity } from "lucide-react";
import { entities, getContributor } from "@/lib/kingdom-data";
import { uiActions, useUI } from "@/lib/kingdom-store";

export function EntityInspector() {
  const selectedId = useUI((s) => s.selectedEntityId);
  const entity = selectedId ? entities.find((e) => e.id === selectedId) : null;

  return (
    <AnimatePresence mode="wait">
      {entity ? (
        <motion.aside
          key={entity.id}
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
          className="glass-strong flex h-full flex-col rounded-3xl"
        >
          <div className="flex items-start justify-between gap-3 border-b border-glass-border p-5">
            <div className="min-w-0">
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {entity.type}
              </div>
              <h2 className="mt-1 truncate font-display text-xl text-gradient-gold">{entity.name}</h2>
            </div>
            <button
              onClick={() => uiActions.selectEntity(null)}
              className="grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-glass-border text-muted-foreground hover:text-foreground"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="space-y-5 overflow-y-auto p-5">
            <Section title="Identity">
              <Row icon={Fingerprint} label="Identity" value={entity.identity} mono />
              <Row icon={Hash} label="Type" value={entity.type} />
              <Row icon={Activity} label="Status" value={entity.status.replace("_", " ")} accent />
              <Row icon={Calendar} label="Founded" value={entity.founded} />
            </Section>

            <Section title="Description">
              <p className="text-sm leading-relaxed text-muted-foreground">{entity.description}</p>
            </Section>

            {entity.properties && (
              <Section title="Runtime Properties">
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(entity.properties).map(([k, v]) => (
                    <div
                      key={k}
                      className="rounded-xl border border-glass-border bg-background/30 p-3"
                    >
                      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        {k}
                      </div>
                      <div className="mt-1 font-display text-lg text-gradient-gold">{v}</div>
                    </div>
                  ))}
                </div>
              </Section>
            )}

            <Section title="Built by">
              <ContributorBlock username={entity.contributorId} />
            </Section>
          </div>
        </motion.aside>
      ) : (
        <motion.aside
          key="empty"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="glass-strong flex h-full flex-col items-center justify-center rounded-3xl p-8 text-center"
        >
          <div className="grid h-14 w-14 place-items-center rounded-2xl border border-glass-border bg-background/40">
            <Fingerprint className="h-6 w-6 text-muted-foreground" />
          </div>
          <h3 className="mt-4 font-display text-lg">Select an entity</h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Click any node in the kingdom graph to inspect it.
          </p>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-2 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
        {title}
      </div>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function Row({
  icon: Icon,
  label,
  value,
  mono,
  accent,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  mono?: boolean;
  accent?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-glass-border bg-background/30 px-3 py-2 text-sm">
      <div className="flex items-center gap-2 text-muted-foreground">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-xs">{label}</span>
      </div>
      <span
        className={
          "truncate text-right " +
          (mono ? "font-mono text-xs " : "") +
          (accent ? "text-primary" : "text-foreground")
        }
      >
        {value}
      </span>
    </div>
  );
}

function ContributorBlock({ username }: { username: string }) {
  const c = getContributor(username);
  if (!c) return null;
  return (
    <div className="glass flex items-center gap-3 rounded-2xl p-3">
      <img src={c.avatar} alt={c.username} className="h-12 w-12 shrink-0 rounded-xl" />
      <div className="min-w-0 flex-1">
        <div className="truncate font-medium">{c.username}</div>
        <div className="truncate text-xs text-muted-foreground">{c.rank}</div>
      </div>
      <a
        href={c.github}
        target="_blank"
        rel="noreferrer"
        className="flex shrink-0 items-center gap-1.5 rounded-lg border border-glass-border bg-background/40 px-3 py-2 text-xs transition hover:bg-secondary hover:text-foreground"
      >
        <Github className="h-3.5 w-3.5" />
        GitHub
      </a>
    </div>
  );
}
