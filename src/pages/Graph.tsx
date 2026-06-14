import { motion } from "framer-motion";
import { KingdomGraph } from "@/components/KingdomGraph";
import { EntityInspector } from "@/components/EntityInspector";

export default function GraphPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col h-full gap-4"
    >
      <header>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Interactive Map
        </div>
        <h1 className="mt-1 font-display text-3xl text-gradient-gold">
          Kingdom Graph
        </h1>
      </header>

      <div className="grid flex-1 grid-cols-1 gap-4 lg:grid-cols-4 min-h-[640px]">
        <div className="lg:col-span-3 h-full">
          <KingdomGraph />
        </div>
        <div className="lg:col-span-1 h-full">
          <EntityInspector />
        </div>
      </div>
    </motion.div>
  );
}
