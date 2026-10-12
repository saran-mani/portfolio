import { useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { endpoints, type EndpointName } from "@/content/resume";
import { CopyButton } from "./CopyButton";
import { highlightJson } from "./json";

/**
 * The "raw" face of a section: the same data the static /api/<name>.json
 * endpoint serves, shown as an HTTP response.
 */
export function JsonResponse({ name }: { name: EndpointName }) {
  const body = useMemo(() => JSON.stringify(endpoints[name], null, 2), [name]);
  const bytes = useMemo(() => new TextEncoder().encode(body).length, [body]);
  const href = `/api/${name}.json`;
  const url = `${window.location.origin}${href}`;

  return (
    <div className="overflow-hidden rounded-xl border bg-card font-mono text-[12px] leading-relaxed sm:text-[12.5px]">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-2.5">
        <span className="min-w-0 truncate text-muted-foreground">
          <span className="text-signal-ink">$</span> curl -s {url}
        </span>
        <div className="flex shrink-0 items-center gap-4">
          <CopyButton text={body} what={`${name}.json`} />
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-0.5 text-[11px] text-muted-foreground transition-colors hover:text-foreground"
          >
            open <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
      <div className="border-b px-4 py-2.5 text-muted-foreground">
        <div>
          <span className="text-ok">HTTP/1.1 200 OK</span>
        </div>
        <div>content-type: application/json; charset=utf-8</div>
        <div>content-length: {bytes}</div>
      </div>
      <pre className="max-h-[70vh] overflow-auto whitespace-pre-wrap break-words px-4 py-4 text-muted-foreground">
        {highlightJson(body)}
      </pre>
    </div>
  );
}
