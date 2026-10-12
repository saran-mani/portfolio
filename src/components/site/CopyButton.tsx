import { useEffect, useState } from "react";
import { useLog } from "@/state/context";
import { cn } from "@/lib/utils";

type Props = { text: string; label?: string; what: string; className?: string };

export function CopyButton({ text, label = "copy", what, className }: Props) {
  const { log } = useLog();
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");

  useEffect(() => {
    if (state === "idle") return;
    const id = window.setTimeout(() => setState("idle"), 1600);
    return () => window.clearTimeout(id);
  }, [state]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
      log("POST", "/clipboard", 201, what);
    } catch {
      setState("failed");
      log("POST", "/clipboard", 500, what);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className={cn(
        "font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground",
        state === "copied" && "text-ok hover:text-ok",
        className,
      )}
    >
      {state === "copied" ? "copied ✓" : state === "failed" ? "blocked" : label}
    </button>
  );
}
