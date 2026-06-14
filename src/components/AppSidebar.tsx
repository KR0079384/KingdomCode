import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Network,
  Users,
  Clock,
  Crown,
  Settings,
  ChevronsLeft,
  ChevronsRight,
  Sun,
  Moon,
  LogOut,
  User as UserIcon,
  Bookmark,
  GitPullRequest,
} from "lucide-react";
import { useState, useEffect } from "react";
import { uiActions, useUI } from "@/lib/kingdom-store";
import { contributors } from "@/lib/kingdom-data";
import { cn } from "@/lib/utils";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/graph", label: "Kingdom Graph", icon: Network },
  { to: "/contributors", label: "Contributors", icon: Users },
  { to: "/timeline", label: "Timeline", icon: Clock },
  { to: "/hall-of-fame", label: "Hall of Fame", icon: Crown },
  { to: "/settings", label: "Settings", icon: Settings },
] as const;

export function AppSidebar() {
  const collapsed = useUI((s) => s.sidebarCollapsed);
  const theme = useUI((s) => s.theme);
  const location = useLocation();
  const pathname = location.pathname;
  const [profileOpen, setProfileOpen] = useState(false);
  const me = contributors[0];

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("dark", "light");
    root.classList.add(theme);
  }, [theme]);

  return (
    <motion.aside
      initial={false}
      animate={{ width: collapsed ? 76 : 248 }}
      transition={{ type: "spring", stiffness: 260, damping: 28 }}
      className="glass sticky top-0 z-30 flex h-screen shrink-0 flex-col rounded-r-3xl border-r border-glass-border"
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 pt-5 pb-4">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground shadow-lg shadow-primary/30">
          <Crown className="h-5 w-5" />
        </div>
        <AnimatePresence initial={false}>
          {!collapsed && (
            <motion.div
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -8 }}
              className="min-w-0"
            >
              <div className="font-display text-base leading-tight text-gradient-gold">OOP Kingdom</div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Explorer</div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Collapse */}
      <button
        onClick={uiActions.toggleSidebar}
        className="mx-3 mb-3 flex items-center justify-center rounded-lg border border-glass-border bg-secondary/40 py-1.5 text-muted-foreground transition hover:text-foreground hover:bg-secondary"
        aria-label="Toggle sidebar"
      >
        {collapsed ? <ChevronsRight className="h-4 w-4" /> : <ChevronsLeft className="h-4 w-4" />}
      </button>

      {/* Nav */}
      <nav className="flex-1 space-y-1 px-3">
        {nav.map((item) => {
          const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
          const Icon = item.icon;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition",
                active
                  ? "bg-gradient-to-r from-primary/20 to-accent/10 text-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50",
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-y-1 left-0 w-1 rounded-r-full bg-gradient-to-b from-primary to-accent"
                />
              )}
              <Icon className={cn("h-5 w-5 shrink-0", active && "text-primary")} />
              <AnimatePresence initial={false}>
                {!collapsed && (
                  <motion.span
                    initial={{ opacity: 0, x: -4 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -4 }}
                    className="truncate"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
              {collapsed && (
                <span className="pointer-events-none absolute left-full ml-3 hidden whitespace-nowrap rounded-md glass px-2 py-1 text-xs group-hover:block">
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Footer: profile + theme */}
      <div className="space-y-2 p-3 border-t border-glass-border">
        <div className="relative">
          <button
            onClick={() => setProfileOpen((v) => !v)}
            className="flex w-full items-center gap-3 rounded-xl border border-glass-border bg-secondary/40 p-2 text-left transition hover:bg-secondary"
          >
            <img src={me.avatar} alt={me.username} className="h-8 w-8 shrink-0 rounded-lg" />
            <AnimatePresence initial={false}>
              {!collapsed && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="min-w-0 flex-1"
                >
                  <div className="truncate text-sm font-medium">{me.username}</div>
                  <div className="truncate text-[10px] text-muted-foreground">{me.rank}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </button>
          <AnimatePresence>
            {profileOpen && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.96 }}
                transition={{ duration: 0.15 }}
                className="glass-strong absolute bottom-full left-0 mb-2 w-56 rounded-2xl p-2 z-50"
              >
                {[
                  { icon: UserIcon, label: "My Profile" },
                  { icon: GitPullRequest, label: "My Contributions" },
                  { icon: Bookmark, label: "Saved Entities" },
                  { icon: Crown, label: "Hall of Fame" },
                  { icon: Settings, label: "Settings" },
                ].map(({ icon: Icon, label }) => (
                  <button
                    key={label}
                    className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                  >
                    <Icon className="h-4 w-4" /> {label}
                  </button>
                ))}
                <div className="my-1 h-px bg-glass-border" />
                <button className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm text-destructive transition hover:bg-destructive/10">
                  <LogOut className="h-4 w-4" /> Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <button
          onClick={uiActions.toggleTheme}
          className="group flex w-full items-center gap-3 rounded-xl border border-glass-border bg-secondary/40 p-2 text-sm text-muted-foreground transition hover:text-foreground hover:bg-secondary"
        >
          <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-background/60">
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {theme === "dark" ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
              </motion.span>
            </AnimatePresence>
          </span>
          {!collapsed && <span className="capitalize">{theme} mode</span>}
        </button>
      </div>
    </motion.aside>
  );
}
