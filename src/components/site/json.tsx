import type { ReactNode } from "react";

const TOKEN = /("(?:\\u[a-fA-F0-9]{4}|\\[^u]|[^\\"])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?)/g;
const LINK = /^"((?:https?:\/\/|mailto:)[^"\s]+)"$/;

/** Tokenises pretty-printed JSON into coloured spans (no innerHTML). */
export function highlightJson(json: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;

  for (const match of json.matchAll(TOKEN)) {
    const index = match.index ?? 0;
    if (index > last) out.push(json.slice(last, index));
    const [, str, colon, literal, num] = match;

    if (str && colon) {
      out.push(
        <span key={key++} className="text-foreground">
          {str}
        </span>,
        colon,
      );
    } else if (str) {
      const link = LINK.exec(str);
      out.push(
        link ? (
          <a
            key={key++}
            href={link[1]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ok underline decoration-ok/30 underline-offset-2 hover:decoration-ok"
          >
            {str}
          </a>
        ) : (
          <span key={key++} className="text-ok">
            {str}
          </span>
        ),
      );
    } else if (literal) {
      out.push(
        <span key={key++} className="italic text-muted-foreground">
          {literal}
        </span>,
      );
    } else if (num) {
      out.push(
        <span key={key++} className="text-signal-ink">
          {num}
        </span>,
      );
    }
    last = index + match[0].length;
  }

  out.push(json.slice(last));
  return out;
}
