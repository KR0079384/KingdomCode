import { useSyncExternalStore } from "react";

type Listener = () => void;

class Store<T> {
  private state: T;
  private listeners = new Set<Listener>();
  constructor(initial: T) { this.state = initial; }
  get = () => this.state;
  set = (next: T | ((prev: T) => T)) => {
    this.state = typeof next === "function" ? (next as (p: T) => T)(this.state) : next;
    this.listeners.forEach((l) => l());
  };
  subscribe = (l: Listener) => { this.listeners.add(l); return () => { this.listeners.delete(l); }; };
}

export interface UIState {
  sidebarCollapsed: boolean;
  selectedEntityId: string | null;
  searchQuery: string;
  focusEntityId: string | null;
  theme: "dark" | "light";
}

const initial: UIState = {
  sidebarCollapsed: false,
  selectedEntityId: "cityhall-001",
  searchQuery: "",
  focusEntityId: null,
  theme: "dark",
};

export const uiStore = new Store<UIState>(initial);

export function useUI<T>(selector: (s: UIState) => T): T {
  return useSyncExternalStore(
    uiStore.subscribe,
    () => selector(uiStore.get()),
    () => selector(initial),
  );
}

export const uiActions = {
  toggleSidebar: () => uiStore.set((s) => ({ ...s, sidebarCollapsed: !s.sidebarCollapsed })),
  selectEntity: (id: string | null) => uiStore.set((s) => ({ ...s, selectedEntityId: id })),
  setSearch: (q: string) => uiStore.set((s) => ({ ...s, searchQuery: q })),
  focusEntity: (id: string | null) => uiStore.set((s) => ({ ...s, focusEntityId: id, selectedEntityId: id ?? s.selectedEntityId })),
  toggleTheme: () => uiStore.set((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" })),
};
