import { useCallback, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  ActiveSectionContext,
  LogContext,
  PrefsContext,
  type LogEntry,
  type Theme,
  type View,
} from "./context";

const MAX_LOG_ENTRIES = 60;

const initialTheme = (): Theme =>
  document.documentElement.classList.contains("dark") ? "dark" : "light";

export function SiteProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<LogEntry[]>([]);
  const nextId = useRef(0);

  const log = useCallback((method: string, path: string, status: number, note?: string) => {
    const entry = { id: nextId.current++, at: new Date(), method, path, status, note };
    setEntries((prev) => [...prev.slice(-(MAX_LOG_ENTRIES - 1)), entry]);
  }, []);

  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [view, setViewState] = useState<View>("ui");
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage can be unavailable (private mode); the toggle still works for this visit.
    }
    log("PATCH", "/prefs", 204, `theme=${next}`);
  }, [theme, log]);

  const setView = useCallback(
    (next: View) => {
      if (next === view) return;
      setViewState(next);
      log("PATCH", "/prefs", 204, `view=${next}`);
    },
    [view, log],
  );

  const toggleView = useCallback(() => setView(view === "ui" ? "json" : "ui"), [view, setView]);

  // Every section the visitor scrolls into is recorded as a request.
  const lastLogged = useRef<string | null>(null);
  useEffect(() => {
    if (lastLogged.current === active) return;
    lastLogged.current = active;
    log("GET", active === "top" ? "/" : `/${active}`, 200);
  }, [active, log]);

  const prefs = useMemo(
    () => ({ theme, toggleTheme, view, setView, toggleView, paletteOpen, setPaletteOpen }),
    [theme, toggleTheme, view, setView, toggleView, paletteOpen],
  );
  const logValue = useMemo(() => ({ entries, log }), [entries, log]);
  const activeValue = useMemo(() => ({ active, setActive }), [active]);

  return (
    <LogContext.Provider value={logValue}>
      <PrefsContext.Provider value={prefs}>
        <ActiveSectionContext.Provider value={activeValue}>{children}</ActiveSectionContext.Provider>
      </PrefsContext.Provider>
    </LogContext.Provider>
  );
}
