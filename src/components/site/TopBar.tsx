import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Moon, Sun } from "lucide-react";
import { NAV } from "@/content/nav";
import { paletteShortcut } from "@/lib/platform";
import { cn } from "@/lib/utils";
import { useActiveSection, usePrefs } from "@/state/context";
import { Segmented } from "./lab/Segmented";
import { Wrap } from "./Wrap";

export function TopBar() {
  const { theme, toggleTheme, view, setView, setPaletteOpen } = usePrefs();
  const { active } = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300",
        scrolled ? "border-border bg-background/80 backdrop-blur-md" : "border-transparent",
      )}
    >
      <Wrap className="flex h-14 items-center justify-between gap-4">
        <a href="#top" className="flex items-center gap-2 font-mono text-[13px] tracking-tight">
          <span className="size-2 bg-signal" />
          saran.m
        </a>

        <nav aria-label="Sections" className="hidden items-center font-mono text-[12px] lg:flex">
          {NAV.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "relative px-2.5 py-1.5 transition-colors",
                active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {active === item.id && (
                <motion.span
                  layoutId="nav-active"
                  className="absolute left-0.5 top-1/2 size-1 -translate-y-1/2 rounded-full bg-signal"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                />
              )}
              /{item.id}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <Segmented label="Page format" options={["ui", "json"] as const} value={view} onChange={setView} />
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            className="rounded-full border px-2.5 py-1 font-mono text-[11.5px] text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
          >
            <span className="hidden sm:inline">{paletteShortcut}</span>
            <span className="sm:hidden">menu</span>
          </button>
        </div>
      </Wrap>
    </header>
  );
}
