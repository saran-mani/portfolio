import { education } from "@/content/resume";
import { Section } from "./Section";

export function Education() {
  return (
    <Section id="education" title="Education" api="education">
      <ul className="border-t">
        {education.map((entry) => (
          <li key={entry.degree} className="grid gap-x-6 gap-y-1 border-b py-6 sm:grid-cols-[minmax(0,1fr)_auto]">
            <h3 className="text-xl font-medium tracking-tight sm:text-2xl">{entry.degree}</h3>
            <span className="font-mono text-xs text-muted-foreground sm:pt-2">
              {entry.period.start} — {entry.period.end}
            </span>
            <p className="text-muted-foreground">{entry.school}</p>
            <span className="font-mono text-xs text-muted-foreground sm:text-right">
              CGPA <span className="text-foreground">{entry.cgpa.toFixed(2)}</span>
            </span>
          </li>
        ))}
      </ul>
    </Section>
  );
}
