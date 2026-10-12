import { motion } from "motion/react";
import { RotateCw } from "lucide-react";
import { useNavigationTiming } from "@/hooks/use-navigation-timing";
import { formatBytes, formatMs } from "@/lib/format";
import { ease } from "@/lib/motion";
import { cn } from "@/lib/utils";

/**
 * The visitor's own request for this page, drawn as a waterfall from the
 * browser's Navigation Timing API. Nothing here is mocked.
 */
export function RequestTrace() {
  const trace = useNavigationTiming();
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <figure className="w-full rounded-xl border bg-card/80 font-mono text-[11.5px] backdrop-blur-sm">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-2.5">
        <span>
          <span className="text-signal-ink">GET</span> / <span className="text-ok">200</span>
        </span>
        <span className="text-muted-foreground">
          {trace ? (
            <>
              {trace.protocol && <>{trace.protocol} · </>}
              <span className="text-foreground">{formatMs(trace.total)} ms</span>
            </>
          ) : (
            "tracing…"
          )}
        </span>
      </div>

      <div className="space-y-2.5 px-4 py-4">
        {trace === undefined &&
          Array.from({ length: 6 }, (_, i) => (
            <div key={i} className="grid grid-cols-[4.25rem_minmax(0,1fr)_3rem] items-center gap-3">
              <span className="h-2 w-10 rounded bg-muted" />
              <span className="h-1.5 animate-pulse rounded bg-muted" />
              <span />
            </div>
          ))}

        {trace === null && (
          <p className="text-muted-foreground">This browser doesn't expose navigation timing.</p>
        )}

        {trace &&
          trace.phases.map((phase, i) => {
            const left = (phase.start / trace.total) * 100;
            const width = Math.max(((phase.end - phase.start) / trace.total) * 100, 0.8);
            const isTtfb = phase.name === "ttfb";
            return (
              <div key={phase.name} className="grid grid-cols-[4.25rem_minmax(0,1fr)_3rem] items-center gap-3">
                <span className={cn("text-muted-foreground", isTtfb && "text-foreground")}>{phase.name}</span>
                <span className="relative h-1.5 rounded-full bg-muted">
                  <motion.span
                    className={cn("absolute inset-y-0 origin-left rounded-full", isTtfb ? "bg-signal" : "bg-foreground")}
                    style={{ left: `${Math.min(left, 99.2)}%`, width: `${width}%` }}
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.6, delay: 0.15 + i * 0.08, ease }}
                  />
                </span>
                <span className="text-right tabular-nums">{formatMs(phase.end - phase.start)}</span>
              </div>
            );
          })}
      </div>

      <figcaption className="flex items-end justify-between gap-4 border-t px-4 py-3 text-muted-foreground">
        <span className="leading-relaxed">
          your request, traced live
          <br />
          {trace?.fromCache
            ? "served from cache"
            : trace?.transferBytes
              ? `${formatBytes(trace.transferBytes)} transferred`
              : "via Navigation Timing API"}{" "}
          · {zone}
        </span>
        <button
          type="button"
          onClick={() => window.location.reload()}
          className="inline-flex shrink-0 items-center gap-1 transition-colors hover:text-foreground"
          aria-label="Reload the page to trace a new request"
        >
          <RotateCw className="size-3" /> re-run
        </button>
      </figcaption>
    </figure>
  );
}
