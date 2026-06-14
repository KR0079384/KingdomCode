
import { motion } from "framer-motion";
import { StatCards } from "@/components/StatCards";
import { KingdomGraph } from "@/components/KingdomGraph";
import { EntityInspector } from "@/components/EntityInspector";



export default function Dashboard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col gap-4"
    >
      <div className="flex items-end justify-between gap-4">
        <div>
          <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            Royal Overview
          </div>
          <h1 className="mt-1 font-display text-3xl text-gradient-gold">
            Kingdom Dashboard
          </h1>
        </div>
      </div>

      <StatCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-4">
        <div className="lg:col-span-3 h-[640px]">
          <KingdomGraph />
        </div>
        <div className="lg:col-span-1 h-[640px]">
          <EntityInspector />
        </div>
      </div>
    </motion.div>
  );
}
