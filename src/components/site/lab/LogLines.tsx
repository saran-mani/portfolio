import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type Tone = "muted" | "ok" | "warn";
export type Line = { id: number; t: number; tag: string; text: string; tone: Tone };

const TONE: Record<Tone, string> = {
  muted: "text-muted-foreground",
  ok: "text-ok",
  warn: "text-signal-ink",
};

/** Auto-scrolling, timestamped log output for the simulators. */
export function LogLines({ lines, placeholder }: { lines: Line[]; placeholder: string }) {
  const ref = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  return (
    <ol
      ref={ref}
      aria-live="polite"
      className="h-44 overflow-y-auto rounded-lg bg-muted/60 px-3 py-2.5 font-mono text-[11.5px] leading-relaxed"
    >
      {lines.length === 0 && <li className="text-muted-foreground">{placeholder}</li>}
      {lines.map((line) => (
        <li key={line.id} className="grid grid-cols-[3.4rem_minmax(0,1fr)] gap-2 animate-in fade-in slide-in-from-bottom-1 duration-300 motion-reduce:animate-none">
          <span className="tabular-nums text-muted-foreground/70">+{(line.t / 1000).toFixed(2)}s</span>
          <span className="min-w-0 break-words">
            <span className="text-foreground">{line.tag}</span> <span className={TONE[line.tone]}>{line.text}</span>
          </span>
        </li>
      ))}
    </ol>
  );
}
