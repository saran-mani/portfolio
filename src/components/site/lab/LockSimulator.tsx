import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Play } from "lucide-react";
import { useLog } from "@/state/context";
import { cn } from "@/lib/utils";
import { Segmented } from "./Segmented";

type Lane = "A" | "B";
type World = { stock: number; holder: Lane | null; sold: number; rejected: number };
type Step = { lane: Lane; cmd: string; result: string; warn?: boolean; apply?: (w: World) => World };

const SKU = "MUG-01";
const KEY = `lock:sku:${SKU}`;
const START: World = { stock: 1, holder: null, sold: 0, rejected: 0 };

const LANES: Record<Lane, { channel: string; order: string }> = {
  A: { channel: "shopify", order: "#1042" },
  B: { channel: "etsy", order: "#7781" },
};

const sell = (w: World): World => ({ ...w, stock: w.stock - 1, sold: w.sold + 1 });

/** Two order webhooks for the last unit land at the same moment. */
function script(locked: boolean): Step[] {
  if (!locked) {
    return [
      { lane: "A", cmd: `read stock(${SKU})`, result: "1" },
      { lane: "B", cmd: `read stock(${SKU})`, result: "1" },
      { lane: "A", cmd: `write stock(${SKU}) = 0`, result: "ok", apply: sell },
      { lane: "B", cmd: `write stock(${SKU}) = 0`, result: "ok · lost update", warn: true, apply: (w) => ({ ...w, sold: w.sold + 1 }) },
    ];
  }
  return [
    { lane: "A", cmd: `SET ${KEY} A NX PX 5000`, result: "OK", apply: (w) => ({ ...w, holder: "A" }) },
    { lane: "B", cmd: `SET ${KEY} B NX PX 5000`, result: "(nil) · retry", warn: true },
    { lane: "A", cmd: `read stock(${SKU})`, result: "1" },
    { lane: "A", cmd: `write stock(${SKU}) = 0`, result: "ok", apply: sell },
    { lane: "A", cmd: "release (compare-and-delete)", result: "1", apply: (w) => ({ ...w, holder: null }) },
    { lane: "B", cmd: `SET ${KEY} B NX PX 5000`, result: "OK", apply: (w) => ({ ...w, holder: "B" }) },
    { lane: "B", cmd: `read stock(${SKU})`, result: "0" },
    { lane: "B", cmd: "reject: out of stock", result: "flagged", warn: true, apply: (w) => ({ ...w, rejected: w.rejected + 1 }) },
    { lane: "B", cmd: "release (compare-and-delete)", result: "1", apply: (w) => ({ ...w, holder: null }) },
  ];
}

const STEP_MS = 650;

export function LockSimulator() {
  const { log } = useLog();
  const [mode, setMode] = useState<"lock on" | "lock off">("lock on");
  const [world, setWorld] = useState<World>(START);
  const [shown, setShown] = useState<Step[]>([]);
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const runId = useRef(0);

  useEffect(() => () => void runId.current++, []);

  const run = async () => {
    const id = ++runId.current;
    const steps = script(mode === "lock on");
    let w = START;
    setWorld(START);
    setShown([]);
    setStatus("running");
    log("POST", "/orders", 201, `x2 · ${mode}`);

    for (const step of steps) {
      await new Promise((resolve) => window.setTimeout(resolve, STEP_MS));
      if (runId.current !== id) return;
      if (step.apply) w = step.apply(w);
      setWorld(w);
      setShown((prev) => [...prev, step]);
    }
    setStatus("done");
  };

  const running = status === "running";
  const oversold = world.sold - START.stock;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Segmented label="Redis lock" options={["lock on", "lock off"] as const} value={mode} onChange={setMode} disabled={running} />
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-opacity disabled:opacity-40"
        >
          <Play className="size-3.5" />
          {running ? "racing…" : "sell the last unit twice"}
        </button>
      </div>

      <dl className="grid grid-cols-3 divide-x overflow-hidden rounded-lg border font-mono">
        <div className="px-3 py-3">
          <dt className="text-[10.5px] text-muted-foreground">stock · {SKU}</dt>
          <dd className="mt-1 text-2xl tabular-nums">
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span
                key={world.stock}
                className="inline-block"
                initial={{ y: -12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 12, opacity: 0 }}
              >
                {world.stock}
              </motion.span>
            </AnimatePresence>
          </dd>
        </div>
        <div className="px-3 py-3">
          <dt className="text-[10.5px] text-muted-foreground">{KEY.replace(`:${SKU}`, "")}</dt>
          <dd className={cn("mt-1.5 text-[13px]", world.holder ? "text-signal-ink" : "text-muted-foreground")}>
            {world.holder ? `held · ${LANES[world.holder].channel}` : mode === "lock off" ? "not used" : "free"}
          </dd>
        </div>
        <div className="px-3 py-3">
          <dt className="text-[10.5px] text-muted-foreground">orders</dt>
          <dd className="mt-1.5 text-[13px]">
            {world.sold} sold{world.rejected > 0 && <span className="text-muted-foreground"> · {world.rejected} flagged</span>}
          </dd>
        </div>
      </dl>

      <div className="rounded-lg bg-muted/60 p-3">
        <div className="mb-2 hidden grid-cols-2 gap-3 font-mono text-[10.5px] text-muted-foreground sm:grid">
          <span>worker A · {LANES.A.channel} order {LANES.A.order}</span>
          <span>worker B · {LANES.B.channel} order {LANES.B.order}</span>
        </div>
        <ol className="min-h-[9.5rem] space-y-1.5 font-mono text-[11.5px]" aria-live="polite">
          {shown.length === 0 && (
            <li className="text-muted-foreground">
              Two channels sell the last {SKU} at the same moment. Toggle the lock and race them.
            </li>
          )}
          {shown.map((step, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: step.lane === "A" ? -8 : 8 }}
              animate={{ opacity: 1, x: 0 }}
              className={cn("rounded-md border bg-card px-2.5 py-1.5 sm:w-[calc(50%-0.375rem)]", step.lane === "B" && "sm:ml-auto")}
            >
              <span className="mr-2 text-muted-foreground sm:hidden">{step.lane}</span>
              <span className="break-all">{step.cmd}</span>{" "}
              <span className={step.warn ? "text-signal-ink" : "text-ok"}>→ {step.result}</span>
            </motion.li>
          ))}
        </ol>
      </div>

      <AnimatePresence>
        {status === "done" && (
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={cn("font-mono text-[12px]", oversold > 0 ? "text-destructive" : "text-ok")}
          >
            {oversold > 0
              ? `✕ oversold by ${oversold} — both workers read 1 before either wrote.`
              : "✓ consistent — one sale, one order flagged, stock never went negative."}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
