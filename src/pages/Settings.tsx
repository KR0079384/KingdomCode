
import { uiActions, useUI } from "@/lib/kingdom-store";
import { Sun, Moon } from "lucide-react";



export default function SettingsPage() {
  const theme = useUI((s) => s.theme);
  return (
    <div className="flex max-w-2xl flex-col gap-6">
      <header>
        <div className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          Preferences
        </div>
        <h1 className="mt-1 font-display text-3xl text-gradient-gold">
          Settings
        </h1>
      </header>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg">Appearance</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Choose your kingdom's atmosphere.
        </p>
        <div className="mt-4 inline-flex gap-1 rounded-xl border border-glass-border bg-background/40 p-1">
          {(["dark", "light"] as const).map((t) => (
            <button
              key={t}
              onClick={() => theme !== t && uiActions.toggleTheme()}
              className={
                "flex items-center gap-2 rounded-lg px-4 py-2 text-sm capitalize transition " +
                (theme === t
                  ? "bg-gradient-to-r from-primary to-accent text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground")
              }
            >
              {t === "dark" ? (
                <Moon className="h-4 w-4" />
              ) : (
                <Sun className="h-4 w-4" />
              )}
              {t} mode
            </button>
          ))}
        </div>
      </section>

      <section className="glass rounded-3xl p-6">
        <h2 className="font-display text-lg">About</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          OOP Kingdom Explorer is a living visualization of a Java-based
          open-source ecosystem — every entity, contributor and milestone,
          rendered as a kingdom.
        </p>
      </section>
    </div>
  );
}
