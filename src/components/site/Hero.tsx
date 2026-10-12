import { useRef } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowDown, ArrowRight, Github, Linkedin } from "lucide-react";
import resumePdf from "@/assets/Saran_Resume.pdf";
import { experience, profile } from "@/content/resume";
import { useNow } from "@/hooks/use-now";
import { useSectionTracking } from "@/hooks/use-section-tracking";
import { ease } from "@/lib/motion";
import { paletteShortcut } from "@/lib/platform";
import { useLog, usePrefs } from "@/state/context";
import { JsonResponse } from "./JsonResponse";
import { RequestTrace } from "./RequestTrace";
import { Wrap } from "./Wrap";

const istClock = new Intl.DateTimeFormat("en-GB", {
  timeZone: profile.timezone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const current = experience[0];

function StatusLine() {
  const now = useNow();
  return (
    <p className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
      <span className="inline-flex items-center gap-2 text-foreground">
        <span className="relative flex size-2">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-ok opacity-50 motion-reduce:hidden" />
          <span className="relative inline-flex size-2 rounded-full bg-ok" />
        </span>
        open to opportunities
      </span>
      <span aria-hidden>/</span>
      <span>{profile.location}</span>
      <span aria-hidden>/</span>
      <span className="tabular-nums">{istClock.format(now)} IST</span>
    </p>
  );
}

/** Each letter lifts and catches the signal colour under the pointer. */
function Name() {
  const letters = Array.from("Saran");
  return (
    <h1 aria-label={profile.name} className="font-serif text-[clamp(6.25rem,21vw,15rem)] leading-[0.8] tracking-[-0.035em]">
      <span aria-hidden className="inline-flex">
        {letters.map((ch, i) => (
          <motion.span
            key={i}
            className="inline-block cursor-default transition-colors duration-300 hover:text-signal"
            initial={{ y: "0.35em", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            whileHover={{ y: "-0.06em" }}
            transition={{ duration: 0.8, delay: 0.05 * i, ease }}
          >
            {ch}
          </motion.span>
        ))}
        <motion.span
          className="ml-[0.18em] inline-block italic"
          initial={{ y: "0.35em", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease }}
        >
          M<span className="text-signal">.</span>
        </motion.span>
      </span>
    </h1>
  );
}

function Intro() {
  const { log } = useLog();
  const { setPaletteOpen } = usePrefs();
  return (
    <div>
      <p className="max-w-2xl text-balance text-2xl leading-[1.3] tracking-tight sm:text-[2rem]">
        Backend-focused full stack engineer who owns features{" "}
        <em className="font-serif text-[1.12em] italic">end to end</em> — from API and data design to CI/CD and
        deployment.
      </p>
      <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
        Currently building NestJS services, BullMQ pipelines and AWS infrastructure for a HIPAA-compliant healthtech
        platform. On the side: <span className="text-foreground">VendPilot</span>, inventory sync for small sellers
        across Shopify, WooCommerce and Etsy.
      </p>

      <div className="mt-9 flex flex-wrap items-center gap-3">
        <a
          href={resumePdf}
          download="Saran_M_Resume.pdf"
          onClick={() => log("GET", "/resume.pdf", 200)}
          className="group inline-flex items-center gap-2 rounded-full bg-foreground px-5 py-2.5 text-sm font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          <ArrowDown className="size-4 transition-transform group-hover:translate-y-0.5" />
          Resume
        </a>
        <a
          href="#contact"
          className="group inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-medium transition-colors hover:border-foreground"
        >
          Get in touch
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
        <span className="flex items-center gap-1">
          <a
            href={profile.links.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full p-2.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Github className="size-[18px]" />
          </a>
          <a
            href={profile.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full p-2.5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="size-[18px]" />
          </a>
        </span>
      </div>

      <button
        type="button"
        onClick={() => setPaletteOpen(true)}
        className="mt-8 hidden font-mono text-xs text-muted-foreground transition-colors hover:text-foreground md:inline-block"
      >
        tip: press <kbd className="rounded border bg-card px-1.5 py-0.5 text-[11px]">{paletteShortcut}</kbd> to fly around, or flip
        the page to <span className="text-foreground">json</span> up top
      </button>
    </div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { view } = usePrefs();
  useSectionTracking("top", ref);

  return (
    <section id="top" ref={ref} className="relative pb-20 pt-28 sm:pb-28 sm:pt-36">
      <Wrap>
        <StatusLine />

        <div className="mt-8 flex items-end justify-between gap-8">
          <Name />
          <motion.p
            className="hidden pb-4 text-right font-mono text-xs leading-relaxed text-muted-foreground lg:block"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {current.title}
            <br />@ {current.company}
            <br />
            <span className="text-foreground">since {current.previously?.period.start.slice(0, 4)}</span>
          </motion.p>
        </div>

        <div className="mt-12 grid items-end gap-12 sm:mt-16 lg:grid-cols-[minmax(0,1fr)_25rem]">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={view}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease }}
              className="min-w-0"
            >
              {view === "json" ? <JsonResponse name="profile" /> : <Intro />}
            </motion.div>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35, ease }}
          >
            <RequestTrace />
          </motion.div>
        </div>
      </Wrap>
    </section>
  );
}
