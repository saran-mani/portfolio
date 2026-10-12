import { useEffect, useRef, useState } from "react";
import { Play, RotateCw } from "lucide-react";
import { useLog } from "@/state/context";
import { cn } from "@/lib/utils";
import { LogLines, type Line, type Tone } from "./LogLines";
import { Segmented } from "./Segmented";

type JobState = "idle" | "waiting" | "waiting-children" | "active" | "failed" | "delayed" | "completed";
type Job = { name: string; depth: number; state: JobState; progress: number; attempt: number };

const CHANNELS = ["Shopify", "WooCommerce", "Etsy"] as const;
type Channel = (typeof CHANNELS)[number];

const PARENT = "onboard-store";

// Execution order. In the flow each step is the *child* of the next one, so
// BullMQ runs the deepest job first and the parent only after the whole chain.
const CHAIN = [
  { name: "register-webhooks", ms: 900, done: (a: string) => `${a}.registerWebhooks() → subscribed` },
  { name: "import-catalog", ms: 1500, done: (a: string) => `${a}.fetchCatalog() → products & variants upserted` },
  { name: "import-locations", ms: 800, done: (a: string) => `${a}.fetchLocations() → locations mapped` },
  { name: "import-stock", ms: 1300, done: (a: string) => `${a}.fetchStock() → levels written under per-SKU locks` },
];

const tree = (state: (name: string, leaf: boolean) => JobState): Job[] => [
  { name: PARENT, depth: 0, state: state(PARENT, false), progress: 0, attempt: 0 },
  ...[...CHAIN].reverse().map((step, i) => ({
    name: step.name,
    depth: i + 1,
    state: state(step.name, i === CHAIN.length - 1),
    progress: 0,
    attempt: 0,
  })),
];

const STATE_STYLE: Record<JobState, string> = {
  idle: "text-muted-foreground/60",
  waiting: "text-muted-foreground",
  "waiting-children": "text-muted-foreground",
  active: "text-signal-ink",
  delayed: "text-signal-ink",
  failed: "text-destructive",
  completed: "text-ok",
};

const sleep = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

export function FlowSimulator() {
  const { log } = useLog();
  const [channel, setChannel] = useState<Channel>("Shopify");
  const [chaos, setChaos] = useState(false);
  const [jobs, setJobs] = useState<Job[]>(() => tree(() => "idle"));
  const [lines, setLines] = useState<Line[]>([]);
  const [status, setStatus] = useState<"idle" | "running" | "done">("idle");
  const runId = useRef(0);
  const lineId = useRef(0);

  // Abandon any in-flight run when the panel unmounts.
  useEffect(() => () => void runId.current++, []);

  const adapter = `${channel}Adapter`;

  const run = async () => {
    const id = ++runId.current;
    const alive = () => runId.current === id;
    const t0 = performance.now();
    const say = (job: string, text: string, tone: Tone = "muted") =>
      setLines((prev) => [...prev, { id: lineId.current++, t: performance.now() - t0, tag: job, text, tone }]);
    const patch = (name: string, next: Partial<Job>) =>
      setJobs((prev) => prev.map((job) => (job.name === name ? { ...job, ...next } : job)));
    const advance = async (name: string, ms: number, upTo = 1) => {
      const steps = Math.max(4, Math.round(ms / 70));
      for (let i = 1; i <= Math.floor(steps * upTo); i++) {
        await sleep(ms / steps);
        if (!alive()) return false;
        patch(name, { progress: i / steps });
      }
      return true;
    };

    setStatus("running");
    setLines([]);
    setJobs(tree((_, leaf) => (leaf ? "waiting" : "waiting-children")));
    log("POST", "/stores/connect", 202, channel.toLowerCase());
    say(PARENT, `flow.add() · ${CHAIN.length} nested children · adapter=${adapter}`);
    await sleep(500);
    if (!alive()) return;

    for (const [i, step] of CHAIN.entries()) {
      patch(step.name, { state: "active", attempt: 1, progress: 0 });

      if (chaos && step.name === "import-catalog") {
        if (!(await advance(step.name, step.ms, 0.45))) return;
        patch(step.name, { state: "failed" });
        say(step.name, "attempt 1/3 failed · 429 Too Many Requests", "warn");
        await sleep(300);
        if (!alive()) return;
        patch(step.name, { state: "delayed", progress: 0 });
        say(step.name, "backoff: exponential · retry in 1000 ms");
        await sleep(1000);
        if (!alive()) return;
        patch(step.name, { state: "active", attempt: 2 });
      }

      if (!(await advance(step.name, step.ms))) return;
      patch(step.name, { state: "completed", progress: 1 });
      say(step.name, step.done(adapter), "ok");
      patch(i + 1 < CHAIN.length ? CHAIN[i + 1].name : PARENT, { state: "waiting" });
      await sleep(250);
      if (!alive()) return;
    }

    patch(PARENT, { state: "active", attempt: 1 });
    if (!(await advance(PARENT, 500))) return;
    patch(PARENT, { state: "completed", progress: 1 });
    say(PARENT, `${channel} store connected · sync is live`, "ok");
    setStatus("done");
  };

  const running = status === "running";

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
        <Segmented
          label="Channel"
          options={CHANNELS}
          value={channel}
          onChange={setChannel}
          disabled={running}
        />
        <label className="inline-flex cursor-pointer select-none items-center gap-2 font-mono text-[11.5px] text-muted-foreground">
          <input
            type="checkbox"
            checked={chaos}
            disabled={running}
            onChange={(e) => setChaos(e.target.checked)}
            className="size-3.5 accent-[hsl(var(--signal))]"
          />
          inject a 429
        </label>
        <button
          type="button"
          onClick={run}
          disabled={running}
          className="ml-auto inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-2 text-[13px] font-medium text-background transition-opacity disabled:opacity-40"
        >
          {status === "done" ? <RotateCw className="size-3.5" /> : <Play className="size-3.5" />}
          {running ? "running…" : status === "done" ? "run again" : "run onboarding"}
        </button>
      </div>

      <p className="overflow-x-auto whitespace-nowrap font-mono text-[12px] text-muted-foreground scrollbar-none">
        <span className="text-signal-ink">const</span> adapter: <span className="text-foreground">PlatformAdapter</span>{" "}
        = <span className="text-signal-ink">new</span> <span className="text-foreground">{adapter}</span>();
      </p>

      <ul className="overflow-hidden rounded-lg border font-mono text-[12px]" aria-label="Job tree">
        {jobs.map((job) => (
          <li key={job.name} className="relative border-b last:border-b-0">
            <span
              aria-hidden
              className={cn(
                "absolute inset-y-0 left-0 transition-[width] duration-100 ease-linear",
                job.state === "completed" ? "bg-ok/[0.07]" : job.state === "failed" ? "bg-destructive/10" : "bg-signal/10",
              )}
              style={{ width: `${job.progress * 100}%` }}
            />
            <div className="relative flex items-center gap-2 px-3 py-2" style={{ paddingLeft: `${0.75 + job.depth * 0.8}rem` }}>
              <span className="text-muted-foreground/60">{job.depth === 0 ? "◆" : "└"}</span>
              <span className="min-w-0 flex-1 truncate">{job.name}</span>
              <span className={cn("shrink-0 text-[11px]", STATE_STYLE[job.state])}>
                {job.state === "idle" ? "—" : job.state}
                {job.attempt > 1 && job.state === "active" && ` · ${job.attempt}/3`}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <LogLines lines={lines} placeholder="Pick a channel and run the flow. Jobs execute leaf-first." />
    </div>
  );
}
