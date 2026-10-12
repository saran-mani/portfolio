import { useState } from "react";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { projects } from "@/content/resume";
import { useLog } from "@/state/context";
import { cn } from "@/lib/utils";
import { FlowSimulator } from "./lab/FlowSimulator";
import { LockSimulator } from "./lab/LockSimulator";
import { Section } from "./Section";

const TABS = [
  { id: "flow", label: "onboarding.flow", caption: "BullMQ parent-child flow, with retries" },
  { id: "lock", label: "stock.lock", caption: "Redis lock vs. a lost update" },
] as const;
type TabId = (typeof TABS)[number]["id"];

function Lab() {
  const { log } = useLog();
  const [tab, setTab] = useState<TabId>("flow");
  const active = TABS.find((t) => t.id === tab)!;

  return (
    <div className="mt-12">
      <p className="mb-4 font-serif text-2xl italic leading-tight text-muted-foreground">
        Two ideas from the codebase, runnable here.
      </p>
      <div className="rounded-xl border bg-card">
        <div className="flex items-end justify-between gap-4 border-b px-2">
          <div role="tablist" aria-label="Simulations" className="flex">
            {TABS.map((t) => (
              <button
                key={t.id}
                id={`lab-tab-${t.id}`}
                role="tab"
                type="button"
                aria-selected={tab === t.id}
                aria-controls="lab-panel"
                onClick={() => {
                  setTab(t.id);
                  log("GET", `/lab/${t.id}`, 200);
                }}
                className={cn(
                  "relative px-3 py-3 font-mono text-xs transition-colors",
                  tab === t.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t.label}
                {tab === t.id && (
                  <motion.span layoutId="lab-tab" className="absolute inset-x-3 -bottom-px h-px bg-foreground" />
                )}
              </button>
            ))}
          </div>
          <span className="hidden pb-3 pr-2 font-mono text-[11px] text-muted-foreground sm:block">{active.caption}</span>
        </div>
        <div id="lab-panel" role="tabpanel" aria-labelledby={`lab-tab-${tab}`} className="p-4 sm:p-6">
          {tab === "flow" ? <FlowSimulator /> : <LockSimulator />}
        </div>
      </div>
      <p className="mt-3 font-mono text-[11px] text-muted-foreground">
        Simulated in your browser. Timings and counts are illustrative; the production system runs on BullMQ + Redis.
      </p>
    </div>
  );
}

export function Projects() {
  const project = projects[0];
  return (
    <Section id="projects" title="Selected work" api="projects" lede="A side project, in progress.">
      <article>
        <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
          <div>
            <h3 className="font-serif text-6xl leading-none tracking-tight sm:text-7xl">{project.name}</h3>
            <p className="mt-3 text-muted-foreground">{project.tagline}</p>
          </div>
          <Link
            to={project.caseStudy}
            className="group inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm transition-colors hover:border-foreground"
          >
            Product page
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        <ul className="mt-6 flex flex-wrap gap-2 font-mono text-[11.5px]">
          {project.stack.map((tech) => (
            <li key={tech} className="rounded-full border px-2.5 py-1 text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>

        <ol className="mt-10 space-y-6">
          {project.highlights.map((text, i) => (
            <li key={i} className="grid grid-cols-[2rem_minmax(0,1fr)] gap-3 sm:grid-cols-[2.5rem_minmax(0,1fr)]">
              <span className="pt-[3px] font-mono text-xs text-signal-ink">{String(i + 1).padStart(2, "0")}</span>
              <p className="text-pretty text-[15px] leading-relaxed">{text}</p>
            </li>
          ))}
        </ol>

        <Lab />
      </article>
    </Section>
  );
}
