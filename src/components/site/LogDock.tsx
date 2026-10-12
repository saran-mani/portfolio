import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { formatClock } from "@/lib/format";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { useLog } from "@/state/context";

const statusTone = (status: number) => (status < 300 ? "text-ok" : status < 500 ? "text-signal-ink" : "text-destructive");

/**
 * A live access log of this visit: scrolling into sections, toggles and
 * actions are recorded as requests against the "server" that is this page.
 */
export function LogDock() {
  const { entries } = useLog();
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLOListElement>(null);
  const last = entries[entries.length - 1];

  useEffect(() => {
    const el = listRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [entries, open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!last) return null;

  return (
    <div className="fixed bottom-3 right-3 z-40 font-mono text-[11px] sm:bottom-5 sm:right-5">
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.div
            key="panel"
            role="dialog"
            aria-label="Access log for this visit"
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.25, ease }}
            className="w-[min(calc(100vw-1.5rem),25rem)] origin-bottom-right overflow-hidden rounded-xl border bg-popover/95 shadow-xl shadow-black/10 backdrop-blur-md"
          >
            <div className="flex items-center justify-between border-b px-3.5 py-2.5">
              <span>
                access.log <span className="text-muted-foreground">· this visit · {entries.length} req</span>
              </span>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close log"
                className="rounded p-0.5 text-muted-foreground transition-colors hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>
            <ol ref={listRef} className="max-h-64 space-y-0.5 overflow-y-auto px-3.5 py-2.5">
              {entries.map((e) => (
                <li key={e.id} className="grid grid-cols-[5.6rem_2.6rem_minmax(0,1fr)_1.8rem] gap-2">
                  <span className="tabular-nums text-muted-foreground/70">{formatClock(e.at)}</span>
                  <span className="text-signal-ink">{e.method}</span>
                  <span className="truncate">
                    {e.path}
                    {e.note && <span className="text-muted-foreground"> {e.note}</span>}
                  </span>
                  <span className={cn("text-right", statusTone(e.status))}>{e.status}</span>
                </li>
              ))}
            </ol>
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            type="button"
            onClick={() => setOpen(true)}
            aria-label={`Open access log, last request ${last.method} ${last.path}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2, ease }}
            className="relative flex max-w-[calc(100vw-1.5rem)] items-center gap-2 overflow-hidden rounded-full border bg-popover/90 px-3 py-1.5 shadow-sm backdrop-blur-md transition-colors hover:border-foreground/40"
          >
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-60 motion-reduce:hidden" />
              <span className="relative inline-flex size-1.5 rounded-full bg-ok" />
            </span>
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={last.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="truncate"
              >
                <span className="text-signal-ink">{last.method}</span> {last.path}{" "}
                <span className={statusTone(last.status)}>{last.status}</span>
              </motion.span>
            </AnimatePresence>
            <span className="text-muted-foreground">· {entries.length}</span>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
