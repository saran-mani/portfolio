import { useState } from "react";
import { stack, type Skill } from "@/content/resume";
import { cn } from "@/lib/utils";
import { Section } from "./Section";

const total = stack.reduce((n, g) => n + g.items.length, 0);

/** Where a skill actually shipped, or a note that it's in the toolbox. */
function Inspector({ skill }: { skill: Skill | null }) {
  return (
    <p aria-live="polite" className="min-h-[3rem] font-mono text-[12.5px] leading-relaxed">
      <span className="text-signal-ink">&gt;</span>{" "}
      {!skill && <span className="text-muted-foreground">hover or tap a skill to see where it shipped</span>}
      {skill && (
        <>
          <span className="text-foreground">{skill.name}</span>
          <span className="text-muted-foreground"> → </span>
          {skill.usedIn?.length ? (
            skill.usedIn.map((use, i) => (
              <span key={use.at}>
                {i > 0 && <span className="text-muted-foreground"> · </span>}
                <span className="text-foreground">{use.at}</span>
                <span className="text-muted-foreground">: {use.for}</span>
              </span>
            ))
          ) : (
            <span className="text-muted-foreground">in the toolbox</span>
          )}
        </>
      )}
    </p>
  );
}

export function Stack() {
  const [selected, setSelected] = useState<Skill | null>(null);

  return (
    <Section id="stack" title="Stack" api="stack" lede={`${total} tools. Underlined ones are tied to the work above.`}>
      <div className="md:sticky md:top-16 md:z-10 md:-mx-1 md:bg-background/85 md:px-1 md:pt-2 md:backdrop-blur-sm">
        <Inspector skill={selected} />
      </div>
      <dl className="mt-4 border-t" onMouseLeave={() => setSelected(null)}>
        {stack.map((group) => (
          <div key={group.group} className="grid gap-2 border-b py-5 sm:grid-cols-[9rem_minmax(0,1fr)] sm:gap-6">
            <dt className="pt-1 font-mono text-xs text-muted-foreground">{group.group}</dt>
            <dd className="flex flex-wrap gap-x-1 gap-y-1.5">
              {group.items.map((skill) => {
                const shipped = Boolean(skill.usedIn?.length);
                return (
                  <button
                    key={skill.name}
                    type="button"
                    onMouseEnter={() => setSelected(skill)}
                    onFocus={() => setSelected(skill)}
                    onClick={() => setSelected(skill)}
                    aria-pressed={selected === skill}
                    className={cn(
                      "rounded-md px-2 py-1 text-[15px] transition-colors",
                      shipped
                        ? "underline decoration-muted-foreground/40 decoration-dotted underline-offset-[5px]"
                        : "text-muted-foreground",
                      selected === skill ? "bg-foreground text-background no-underline" : "hover:bg-muted",
                    )}
                  >
                    {skill.name}
                  </button>
                );
              })}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
