import { memo } from "react";
import { Handle, Position, type NodeProps } from "reactflow";
import { motion } from "framer-motion";
import { Castle, Wheat, Trees } from "lucide-react";
import type { EntityStatus, EntityType } from "@/lib/kingdom-data";
import { cn } from "@/lib/utils";

export interface KingdomNodeData {
  name: string;
  identity: string;
  type: EntityType;
  status: EntityStatus;
  properties?: Record<string, string | number>;
  selected?: boolean;
  dimmed?: boolean;
}

const typeMeta: Record<EntityType, { icon: typeof Castle; ring: string; glow: string; tint: string; label: string }> = {
  CITYHALL:  { icon: Castle, ring: "from-primary/60 to-accent/60", glow: "glow-gold",    tint: "from-primary/15 to-accent/10",  label: "City Hall" },
  FARM:      { icon: Wheat,  ring: "from-emerald/60 to-emerald/30", glow: "glow-emerald", tint: "from-emerald/15 to-emerald/5",  label: "Farm" },
  LUMBERYARD:{ icon: Trees,  ring: "from-amber/60 to-amber/30",     glow: "glow-amber",   tint: "from-amber/15 to-amber/5",      label: "Lumberyard" },
  BARRACKS:  { icon: Castle, ring: "from-destructive/60 to-destructive/30", glow: "",     tint: "from-destructive/10 to-destructive/5", label: "Barracks" },
  MARKET:    { icon: Castle, ring: "from-accent/60 to-accent/30",   glow: "",             tint: "from-accent/15 to-accent/5",    label: "Market" },
};

const statusStyle: Record<EntityStatus, string> = {
  OPERATIONAL: "bg-emerald/20 text-emerald border-emerald/30",
  UNDER_CONSTRUCTION: "bg-amber/20 text-amber border-amber/30",
  PLANNED: "bg-muted text-muted-foreground border-glass-border",
};

function KingdomNodeBase({ data, selected }: NodeProps<KingdomNodeData>) {
  const meta = typeMeta[data.type];
  const Icon = meta.icon;
  const isCityHall = data.type === "CITYHALL";

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 8 }}
      animate={{ opacity: data.dimmed ? 0.35 : 1, scale: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={cn(
        "group relative w-[220px] rounded-2xl p-[1.5px] transition-all",
        `bg-gradient-to-br ${meta.ring}`,
        (selected || data.selected) && meta.glow,
      )}
    >
      <Handle type="target" position={Position.Top} className="!h-2 !w-2 !border-0 !bg-primary/70" />
      <div className={cn("rounded-[14px] glass-strong p-3", `bg-gradient-to-br ${meta.tint}`)}>
        <div className="flex items-center gap-3">
          <div
            className={cn(
              "grid h-10 w-10 shrink-0 place-items-center rounded-xl text-foreground",
              isCityHall
                ? "bg-gradient-to-br from-primary to-accent text-primary-foreground"
                : "bg-background/60",
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="truncate text-[11px] uppercase tracking-wider text-muted-foreground">
              {meta.label}
            </div>
            <div className="truncate font-display text-sm leading-tight">{data.name}</div>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className={cn("rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider", statusStyle[data.status])}>
            {data.status.replace("_", " ")}
          </span>
          <span className="truncate text-[10px] text-muted-foreground">{data.identity}</span>
        </div>
        {data.type === "LUMBERYARD" && data.properties && (
          <div className="mt-3 rounded-lg border border-glass-border bg-background/30 px-2 py-1.5 text-[11px]">
            <span className="text-muted-foreground">Wood:</span>{" "}
            <span className="text-amber font-medium">{data.properties["Wood Stockpile"]}</span>
          </div>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} className="!h-2 !w-2 !border-0 !bg-primary/70" />
    </motion.div>
  );
}

export const KingdomNode = memo(KingdomNodeBase);
