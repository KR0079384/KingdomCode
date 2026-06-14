import { useCallback, useEffect, useMemo, useRef } from "react";
import ReactFlow, {
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  type Edge,
  type Node,
  type NodeMouseHandler,
  useEdgesState,
  useNodesState,
  useReactFlow,
  ReactFlowProvider,
} from "reactflow";
import "reactflow/dist/style.css";
import { entities, edges as kingdomEdges } from "@/lib/kingdom-data";
import { uiActions, uiStore, useUI } from "@/lib/kingdom-store";
import { KingdomNode, type KingdomNodeData } from "./KingdomNode";

const nodeTypes = { kingdom: KingdomNode };

function GraphInner() {
  const selectedId = useUI((s) => s.selectedEntityId);
  const focusId = useUI((s) => s.focusEntityId);
  const search = useUI((s) => s.searchQuery);
  const { fitView, setCenter, getNode } = useReactFlow();

  const connected = useMemo(() => {
    if (!selectedId) return new Set<string>();
    const set = new Set<string>([selectedId]);
    kingdomEdges.forEach((e) => {
      if (e.source === selectedId) set.add(e.target);
      if (e.target === selectedId) set.add(e.source);
    });
    return set;
  }, [selectedId]);

  const matches = useMemo(() => {
    if (!search) return null;
    const q = search.toLowerCase();
    return new Set(
      entities
        .filter((e) => [e.name, e.identity, e.type].join(" ").toLowerCase().includes(q))
        .map((e) => e.id),
    );
  }, [search]);

  const initialNodes: Node<KingdomNodeData>[] = useMemo(
    () =>
      entities.map((e) => ({
        id: e.id,
        type: "kingdom",
        position: e.position,
        data: {
          name: e.name,
          identity: e.identity,
          type: e.type,
          status: e.status,
          properties: e.properties,
        },
      })),
    [],
  );

  const initialEdges: Edge[] = useMemo(
    () =>
      kingdomEdges.map((e) => ({
        id: e.id,
        source: e.source,
        target: e.target,
        label: e.label,
        animated: true,
        style: { stroke: "oklch(0.78 0.16 75 / 0.7)" },
        labelStyle: { fill: "oklch(0.85 0.02 90)", fontSize: 10, fontWeight: 500 },
        labelBgStyle: { fill: "oklch(0.18 0.03 270 / 0.8)" },
        labelBgPadding: [6, 4],
        labelBgBorderRadius: 6,
      })),
    [],
  );

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // selection + dimming
  useEffect(() => {
    setNodes((ns) =>
      ns.map((n) => {
        const dimmed = matches
          ? !matches.has(n.id)
          : selectedId
            ? !connected.has(n.id)
            : false;
        return { ...n, data: { ...n.data, dimmed, selected: n.id === selectedId } };
      }),
    );
    setEdges((es) =>
      es.map((e) => {
        const active = selectedId && (e.source === selectedId || e.target === selectedId);
        return {
          ...e,
          style: {
            stroke: active ? "oklch(0.82 0.17 80)" : "oklch(0.78 0.16 75 / 0.45)",
            strokeWidth: active ? 2.5 : 1.5,
          },
        };
      }),
    );
  }, [selectedId, connected, matches, setNodes, setEdges]);

  // focus to node
  useEffect(() => {
    if (!focusId) return;
    const n = getNode(focusId);
    if (n) {
      setCenter(n.position.x + 110, n.position.y + 60, { zoom: 1.4, duration: 600 });
    }
    uiStore.set((s) => ({ ...s, focusEntityId: null }));
  }, [focusId, getNode, setCenter]);

  const onNodeClick: NodeMouseHandler = useCallback((_, node) => {
    uiActions.selectEntity(node.id);
  }, []);

  const fitRef = useRef(false);
  useEffect(() => {
    if (fitRef.current) return;
    fitRef.current = true;
    setTimeout(() => fitView({ padding: 0.25, duration: 600 }), 150);
  }, [fitView]);

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onNodeClick={onNodeClick}
      onPaneClick={() => uiActions.selectEntity(null)}
      nodeTypes={nodeTypes}
      fitView
      fitViewOptions={{ padding: 0.25 }}
      proOptions={{ hideAttribution: true }}
      minZoom={0.3}
      maxZoom={2}
    >
      <Background variant={BackgroundVariant.Dots} gap={28} size={1.4} color="oklch(0.45 0.05 270 / 0.4)" />
      <Controls position="bottom-right" showInteractive={false} />
      <MiniMap
        nodeColor={(n) => {
          const t = (n.data as KingdomNodeData)?.type;
          if (t === "CITYHALL") return "oklch(0.78 0.16 75)";
          if (t === "FARM") return "oklch(0.72 0.16 155)";
          if (t === "LUMBERYARD") return "oklch(0.75 0.16 55)";
          return "oklch(0.6 0.05 270)";
        }}
        maskColor="oklch(0.16 0.025 270 / 0.6)"
        pannable
        zoomable
      />
    </ReactFlow>
  );
}

export function KingdomGraph() {
  return (
    <div className="glass relative h-full w-full overflow-hidden rounded-3xl">
      <ReactFlowProvider>
        <GraphInner />
      </ReactFlowProvider>
    </div>
  );
}
