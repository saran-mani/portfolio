import { useRef, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import type { EndpointName } from "@/content/resume";
import { useSectionTracking } from "@/hooks/use-section-tracking";
import { ease } from "@/lib/motion";
import { usePrefs } from "@/state/context";
import { JsonResponse } from "./JsonResponse";
import { Wrap } from "./Wrap";

type Props = {
  id: string;
  title: ReactNode;
  api: EndpointName;
  method?: "GET" | "POST";
  lede?: ReactNode;
  children: ReactNode;
};

/**
 * A page section presented as an endpoint. The left rail names the route;
 * the body swaps between the designed view and the raw JSON response.
 */
export function Section({ id, title, api, method = "GET", lede, children }: Props) {
  const ref = useRef<HTMLElement>(null);
  const { view } = usePrefs();
  useSectionTracking(id, ref);

  return (
    <section id={id} ref={ref} aria-labelledby={`${id}-title`} className="border-t py-20 sm:py-28">
      <Wrap>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -15% 0px" }}
          transition={{ duration: 0.7, ease }}
          className="grid gap-x-14 gap-y-10 md:grid-cols-[13rem_minmax(0,1fr)]"
        >
          <header className="self-start md:sticky md:top-24">
            <p className="font-mono text-xs">
              <span className="font-medium text-signal-ink">{method}</span>{" "}
              <span className="text-muted-foreground">/{id}</span>
            </p>
            <h2 id={`${id}-title`} className="mt-3 font-serif text-[2.75rem] leading-none tracking-tight sm:text-5xl">
              {title}
            </h2>
            {lede && <div className="mt-4 text-sm text-muted-foreground">{lede}</div>}
          </header>

          <div className="min-w-0">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={view}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease }}
              >
                {view === "json" ? <JsonResponse name={api} /> : children}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </Wrap>
    </section>
  );
}
