import { useState, type InputHTMLAttributes, type KeyboardEvent, type TextareaHTMLAttributes } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, CornerDownLeft } from "lucide-react";
import resumePdf from "@/assets/Saran_Resume.pdf";
import { profile } from "@/content/resume";
import { ease } from "@/lib/motion";
import { paletteShortcut } from "@/lib/platform";
import { useLog } from "@/state/context";
import { cn } from "@/lib/utils";
import { CopyButton } from "./CopyButton";
import { highlightJson } from "./json";
import { Section } from "./Section";

type Response = { status: number; reason: string; body: Record<string, string> };

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const field =
  "w-full min-w-0 bg-transparent text-ok caret-signal outline-none placeholder:text-muted-foreground/50 focus-visible:outline-none";

type AutoInputProps = InputHTMLAttributes<HTMLInputElement> & { value: string };

/** An input that grows with its content, so the closing quote hugs the text. */
function AutoInput({ value, placeholder, className, ...props }: AutoInputProps) {
  return (
    <span className="inline-grid min-w-0 max-w-full">
      <span aria-hidden className="invisible col-start-1 row-start-1 overflow-hidden whitespace-pre">
        {value || placeholder}
      </span>
      <input size={1} value={value} placeholder={placeholder} className={cn(field, "col-start-1 row-start-1", className)} {...props} />
    </span>
  );
}

type AutoTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & { value: string };

/** Same trick for multi-line text: a hidden mirror sizes the textarea's width and height. */
function AutoTextarea({ value, placeholder, className, ...props }: AutoTextareaProps) {
  return (
    <span className="inline-grid min-w-0 max-w-full">
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-pre-wrap break-words">
        {(value || placeholder) + " "}
      </span>
      <textarea
        rows={1}
        cols={1}
        value={value}
        placeholder={placeholder}
        className={cn(field, "col-start-1 row-start-1 resize-none overflow-hidden", className)}
        {...props}
      />
    </span>
  );
}

/** A curl request you can actually fill in. "Sending" hands off to the visitor's mail client. */
function Composer() {
  const { log } = useLog();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState<Response | null>(null);

  const send = () => {
    if (!message.trim()) {
      setResponse({ status: 422, reason: "Unprocessable Entity", body: { error: "validation_failed", field: "message", detail: "message must not be empty" } });
      log("POST", "/contact", 422);
      return;
    }
    if (email.trim() && !EMAIL_RE.test(email.trim())) {
      setResponse({ status: 422, reason: "Unprocessable Entity", body: { error: "validation_failed", field: "email", detail: "email looks malformed" } });
      log("POST", "/contact", 422);
      return;
    }
    const from = name.trim() || "someone on your site";
    const subject = `Hello from ${from}`;
    const signature = [name.trim(), email.trim() && `<${email.trim()}>`].filter(Boolean).join(" ");
    const body = signature ? `${message.trim()}\n\n— ${signature}` : message.trim();
    window.location.href = `mailto:${profile.contact.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setResponse({ status: 202, reason: "Accepted", body: { status: "handed_off", via: "your mail client", to: profile.contact.email } });
    log("POST", "/contact", 202);
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      send();
    }
  };


  return (
    <div className="overflow-hidden rounded-xl border bg-card font-mono text-[12px] leading-[1.9] sm:text-[13px]">
      <div className="px-4 py-4 sm:px-5" onKeyDown={onKeyDown}>
        <p className="break-all text-muted-foreground">
          <span className="text-signal-ink">$</span> curl -X POST {window.location.origin}/contact \
        </p>
        <p className="pl-4 text-muted-foreground">-H "content-type: application/json" \</p>
        <p className="pl-4 text-muted-foreground">-d '{"{"}</p>
        <div className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-2 pl-8">
          <label htmlFor="c-name" className="text-foreground">"name":</label>
          <span className="flex min-w-0 text-ok">
            "<AutoInput id="c-name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Ada Lovelace" autoComplete="name" />",
          </span>
          <label htmlFor="c-email" className="text-foreground">"email":</label>
          <span className="flex min-w-0 text-ok">
            "<AutoInput id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="ada@example.com" autoComplete="email" />",
          </span>
          <label htmlFor="c-message" className="self-start text-foreground">"message":</label>
          <span className="flex min-w-0 text-ok">
            "<AutoTextarea id="c-message" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Let's talk about backend systems…" />
            <span className="self-end">"</span>
          </span>
        </div>
        <p className="pl-4 text-muted-foreground">{"}"}'</p>
      </div>

      <div className="flex items-center justify-between gap-3 border-t px-4 py-3 sm:px-5">
        <span className="text-[11px] text-muted-foreground">
          <span className="hidden sm:inline">{paletteShortcut.replace("K", "")}↵ to send · </span>opens your mail client
        </span>
        <button
          type="button"
          onClick={send}
          className="inline-flex items-center gap-2 rounded-full bg-foreground px-4 py-1.5 font-sans text-[13px] font-medium text-background transition-transform hover:-translate-y-0.5"
        >
          Send <CornerDownLeft className="size-3.5" />
        </button>
      </div>

      <AnimatePresence initial={false}>
        {response && (
          <motion.div
            key={`${response.status}-${response.body.field ?? ""}`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease }}
            className="overflow-hidden border-t bg-muted/50"
          >
            <pre className="whitespace-pre-wrap break-words px-4 py-3 text-muted-foreground sm:px-5">
              <span className={response.status < 300 ? "text-ok" : "text-destructive"}>
                HTTP/1.1 {response.status} {response.reason}
              </span>
              {"\n"}
              {highlightJson(JSON.stringify(response.body, null, 2))}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const CHANNELS = [
  { key: "email", value: profile.contact.email, href: `mailto:${profile.contact.email}`, copy: profile.contact.email },
  { key: "phone", value: profile.contact.phone, href: `tel:${profile.contact.phone.replace(/\s/g, "")}`, copy: profile.contact.phone },
  { key: "linkedin", value: "in/saranmj", href: profile.links.linkedin },
  { key: "github", value: "saran-mani", href: profile.links.github },
  { key: "linktree", value: "linktr.ee/saranmj", href: profile.links.linktree },
];

export function Contact() {
  const { log } = useLog();
  return (
    <Section id="contact" title="Contact" api="contact" method="POST" lede="Based in Bengaluru (IST, UTC+5:30).">
      <p className="mb-10 max-w-2xl text-balance font-serif text-5xl leading-[1.02] tracking-tight sm:text-6xl">
        Have a backend that needs to be <em>boringly reliable</em>? Let's talk.
      </p>

      <Composer />

      <dl className="mt-12 border-t">
        {CHANNELS.map((c) => (
          <div key={c.key} className="group flex items-center gap-4 border-b py-3.5">
            <dt className="w-20 shrink-0 font-mono text-xs text-muted-foreground">{c.key}</dt>
            <dd className="flex min-w-0 flex-1 items-center gap-4">
              <a
                href={c.href}
                target={c.href.startsWith("http") ? "_blank" : undefined}
                rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="inline-flex min-w-0 items-center gap-1 truncate transition-colors hover:text-signal-ink"
              >
                <span className="truncate">{c.value}</span>
                {c.href.startsWith("http") && (
                  <ArrowUpRight className="size-3.5 shrink-0 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                )}
              </a>
              <span aria-hidden className="leader hidden h-3 flex-1 sm:block" />
              {c.copy && <CopyButton text={c.copy} what={c.key} className="ml-auto sm:ml-0" />}
            </dd>
          </div>
        ))}
        <div className="group flex items-center gap-4 border-b py-3.5">
          <dt className="w-20 shrink-0 font-mono text-xs text-muted-foreground">resume</dt>
          <dd>
            <a
              href={resumePdf}
              download="Saran_M_Resume.pdf"
              onClick={() => log("GET", "/resume.pdf", 200)}
              className="transition-colors hover:text-signal-ink"
            >
              Saran_M_Resume.pdf <span className="text-muted-foreground">↓</span>
            </a>
          </dd>
        </div>
      </dl>
    </Section>
  );
}
