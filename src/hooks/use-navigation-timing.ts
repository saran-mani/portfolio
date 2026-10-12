import { useEffect, useState } from "react";

export type Phase = { name: string; start: number; end: number };

export type NavigationTrace = {
  phases: Phase[];
  total: number;
  protocol: string | null;
  transferBytes: number | null;
  fromCache: boolean;
};

const span = (name: string, start: number, end: number): Phase | null =>
  end > 0 && end >= start ? { name, start, end } : null;

function readTrace(): NavigationTrace | null {
  const [nav] = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
  if (!nav) return null;

  const tlsStart = nav.secureConnectionStart > 0 ? nav.secureConnectionStart : 0;
  const end = nav.loadEventEnd || nav.domContentLoadedEventEnd || nav.responseEnd;

  const phases = [
    span("dns", nav.domainLookupStart, nav.domainLookupEnd),
    span("tcp", nav.connectStart, tlsStart || nav.connectEnd),
    tlsStart ? span("tls", tlsStart, nav.connectEnd) : null,
    span("ttfb", nav.requestStart, nav.responseStart),
    span("download", nav.responseStart, nav.responseEnd),
    span("dom", nav.responseEnd, nav.domContentLoadedEventEnd),
    span("load", nav.domContentLoadedEventEnd, nav.loadEventEnd),
  ].filter((phase): phase is Phase => phase !== null);

  return {
    phases,
    total: end,
    protocol: nav.nextHopProtocol || null,
    transferBytes: typeof nav.transferSize === "number" ? nav.transferSize : null,
    fromCache: nav.transferSize === 0 && nav.decodedBodySize > 0,
  };
}

/**
 * The visitor's real page-load timeline from the Navigation Timing API.
 * Resolves after the load event so every phase has an end time.
 */
export function useNavigationTiming() {
  const [trace, setTrace] = useState<NavigationTrace | null | undefined>(undefined);

  useEffect(() => {
    if (typeof performance === "undefined" || !performance.getEntriesByType) {
      setTrace(null);
      return;
    }
    let timer = 0;
    // loadEventEnd is only set after load handlers return, hence the extra tick.
    const capture = () => {
      timer = window.setTimeout(() => setTrace(readTrace()), 0);
    };
    if (document.readyState === "complete") capture();
    else window.addEventListener("load", capture, { once: true });
    return () => {
      window.removeEventListener("load", capture);
      window.clearTimeout(timer);
    };
  }, []);

  return trace;
}
