import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect } from "react";
import { Building2, Hammer, Users, Castle } from "lucide-react";
import { contributors, entities } from "@/lib/kingdom-data";

function useCountUp(value: number) {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => Math.round(v));
  useEffect(() => {
    const controls = animate(mv, value, { duration: 1.2, ease: "easeOut" });
    return controls.stop;
  }, [value, mv]);
  return rounded;
}

const stats = [
  { label: "Total Cities", value: entities.filter((e) => e.type === "CITYHALL").length, icon: Castle, tint: "from-primary/30 to-accent/20" },
  { label: "Total Entities", value: entities.length, icon: Building2, tint: "from-accent/30 to-primary/10" },
  { label: "Active Contributors", value: contributors.length, icon: Users, tint: "from-emerald/30 to-emerald/5" },
  { label: "Operational", value: entities.filter((e) => e.status === "OPERATIONAL").length, icon: Hammer, tint: "from-amber/30 to-amber/5" },
];

export function StatCards() {
  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {stats.map((s, i) => (
        <StatCard key={s.label} {...s} delay={i * 0.08} />
      ))}
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  tint,
  delay,
}: {
  label: string;
  value: number;
  icon: React.ComponentType<{ className?: string }>;
  tint: string;
  delay: number;
}) {
  const count = useCountUp(value);
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, type: "spring", stiffness: 200, damping: 24 }}
      whileHover={{ y: -3 }}
      className={`glass relative overflow-hidden rounded-2xl p-4 bg-gradient-to-br ${tint}`}
    >
      <div className="flex items-center justify-between">
        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{label}</div>
        <span className="grid h-8 w-8 place-items-center rounded-lg bg-background/40 text-primary">
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <motion.div className="mt-3 font-display text-3xl text-gradient-gold">{count}</motion.div>
      <div className="mt-1 text-[11px] text-muted-foreground">across the kingdom</div>
    </motion.div>
  );
}
