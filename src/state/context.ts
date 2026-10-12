import { createContext, useContext } from "react";

export type Theme = "light" | "dark";
export type View = "ui" | "json";

export type LogEntry = {
  id: number;
  at: Date;
  method: string;
  path: string;
  status: number;
  note?: string;
};

export type Prefs = {
  theme: Theme;
  toggleTheme: () => void;
  view: View;
  setView: (view: View) => void;
  toggleView: () => void;
  paletteOpen: boolean;
  setPaletteOpen: (open: boolean) => void;
};

export type Log = {
  entries: LogEntry[];
  log: (method: string, path: string, status: number, note?: string) => void;
};

export type ActiveSection = {
  active: string;
  setActive: (id: string) => void;
};

export const PrefsContext = createContext<Prefs | null>(null);
export const LogContext = createContext<Log | null>(null);
export const ActiveSectionContext = createContext<ActiveSection | null>(null);

function required<T>(value: T | null, name: string): T {
  if (value === null) throw new Error(`${name} must be used inside <SiteProvider>`);
  return value;
}

export const usePrefs = () => required(useContext(PrefsContext), "usePrefs");
export const useLog = () => required(useContext(LogContext), "useLog");
export const useActiveSection = () => required(useContext(ActiveSectionContext), "useActiveSection");
