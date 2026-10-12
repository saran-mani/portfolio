import { useState } from "react";
import { experience, type Role } from "@/content/resume";
import { useNow } from "@/hooks/use-now";
import { formatDuration, formatMonth, formatPeriod, monthEnd, monthStart, monthsBetween } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

type Stint = { id: string; label: string; start: Date; end: Date; current: boolean };

// ISO months sort lexicographically, so the smallest string is the earliest start.
const firstStart = experience
  .flatMap((role) => [role.period.start, role.previously?.period.start ?? role.period.start])
  .sort()[0];

function stintsUntil(now: Date): Stint[] {
  const stints = experience.flatMap((role) => {
    const main: Stint = {
      id: `${role.company}-${role.title}`,
      label: `${role.title} · ${role.company}`,
      start: monthStart(role.period.start),
      end: role.period.end ? monthEnd(role.period.end) : now,
      current: !role.period.end,
    };
    if (!role.previously) return [main];
    const prev: Stint = {
      id: `${role.company}-${role.previously.title}`,
      label: `${role.previously.title} · ${role.company}`,
      start: monthStart(role.previously.period.start),
      end: monthEnd(role.previously.period.end),
      current: false,
    };
    return [prev, main];
  });
  return stints.sort((a, b) => a.start.getTime() - b.start.getTime());
}

/** A to-scale bar of every stint from the first job until today. */
function CareerBar() {
  const now = useNow(60_000);
  const stints = stintsUntil(now);
  const [hovered, setHovered] = useState<string | null>(null);

  const from = stints[0].start.getTime();
  const span = now.getTime() - from;
  const pos = (d: Date) => ((d.getTime() - from) / span) * 100;

  const years: number[] = [];
  for (let y = stints[0].start.getFullYear() + 1; y <= now.getFullYear(); y++) years.push(y);

  return (
    <div className="mb-14">
      <div className="relative h-2.5">
        {stints.map((s) => (
          <div
            key={s.id}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "absolute inset-y-0 rounded-full transition-opacity duration-300",
              s.current ? "bg-signal" : "bg-muted-foreground/45",
              hovered && hovered !== s.id && "opacity-30",
            )}
            style={{ left: `calc(${pos(s.start)}% + 1.5px)`, width: `calc(${pos(s.end) - pos(s.start)}% - 3px)` }}
          />
        ))}
      </div>
      <div className="relative mt-2 h-4 font-mono text-[10.5px] text-muted-foreground">
        <span className="absolute left-0">{formatMonth(firstStart)}</span>
        {years.map((y) => (
          <span
            key={y}
            className="absolute -translate-x-1/2 before:absolute before:-top-2 before:left-1/2 before:h-1.5 before:w-px before:bg-border"
            style={{ left: `${pos(new Date(y, 0, 1))}%` }}
          >
            {y}
          </span>
        ))}
        <span className="absolute right-0">today</span>
      </div>
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[13px]">
        {stints.map((s) => (
          <li
            key={s.id}
            onMouseEnter={() => setHovered(s.id)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
              "flex items-center gap-2 transition-opacity duration-300",
              hovered && hovered !== s.id && "opacity-40",
            )}
          >
            <span className={cn("size-2 rounded-full", s.current ? "bg-signal" : "bg-muted-foreground/45")} />
            <span className="text-muted-foreground">{s.label}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function RoleBlock({ role }: { role: Role }) {
  return (
    <article>
      <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
        <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{role.company}</h3>
        <span className="font-mono text-xs text-muted-foreground">
          {formatPeriod(role.period.start, role.period.end)}
        </span>
      </div>
      <p className="mt-1.5 text-muted-foreground">
        {[role.title, role.location, role.context].filter(Boolean).join(" · ")}
      </p>
      {role.previously && (
        <p className="mt-1 font-mono text-xs text-muted-foreground">
          ↳ joined as {role.previously.title}, {formatMonth(role.previously.period.start)} –{" "}
          {formatMonth(role.previously.period.end)}
        </p>
      )}

      <ul className="group/list mt-6 border-t">
        {role.highlights.map((h) => (
          <li
            key={h.key}
            className="grid gap-1 border-b py-4 transition-opacity duration-300 group-hover/list:opacity-35 hover:!opacity-100 sm:grid-cols-[6.5rem_minmax(0,1fr)] sm:gap-4"
          >
            <span className="pt-[3px] font-mono text-xs text-signal-ink">{h.key}</span>
            <p className="text-pretty text-[15px] leading-relaxed">{h.text}</p>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function Experience() {
  const now = useNow(60_000);
  const tenure = formatDuration(monthsBetween(monthStart(firstStart), now));

  return (
    <Section id="experience" title="Experience" api="experience" lede={<>{tenure} across two healthtech teams</>}>
      <CareerBar />
      <div className="space-y-16">
        {experience.map((role) => (
          <RoleBlock key={role.company} role={role} />
        ))}
      </div>
    </Section>
  );
}
