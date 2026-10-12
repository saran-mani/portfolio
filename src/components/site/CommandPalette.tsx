import { useEffect, type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Command } from "cmdk";
import { useNavigate } from "react-router-dom";
import {
  ArrowDown,
  Braces,
  Copy,
  CornerDownLeft,
  FileJson,
  Github,
  Hash,
  Linkedin,
  Link2,
  Moon,
  Package,
  Sun,
} from "lucide-react";
import resumePdf from "@/assets/Saran_Resume.pdf";
import { NAV } from "@/content/nav";
import { profile } from "@/content/resume";
import { useLog, usePrefs } from "@/state/context";

function Item({
  icon,
  children,
  hint,
  onSelect,
  keywords,
}: {
  icon: ReactNode;
  children: ReactNode;
  hint?: string;
  onSelect: () => void;
  keywords?: string[];
}) {
  return (
    <Command.Item
      onSelect={onSelect}
      keywords={keywords}
      className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] text-muted-foreground data-[selected=true]:bg-muted data-[selected=true]:text-foreground [&_svg]:size-4 [&_svg]:shrink-0"
    >
      {icon}
      <span className="flex-1 truncate">{children}</span>
      {hint && <span className="font-mono text-[11px] text-muted-foreground">{hint}</span>}
    </Command.Item>
  );
}

const group =
  "[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1.5 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:text-[10.5px] [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-muted-foreground";

export function CommandPalette() {
  const { paletteOpen, setPaletteOpen, theme, toggleTheme, view, toggleView } = usePrefs();
  const { log } = useLog();
  const navigate = useNavigate();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setPaletteOpen(!paletteOpen);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [paletteOpen, setPaletteOpen]);

  const run = (action: () => void) => () => {
    setPaletteOpen(false);
    // Let the dialog release focus/scroll lock before acting on the page.
    window.setTimeout(action, 60);
  };

  const goTo = (id: string) => run(() => document.getElementById(id)?.scrollIntoView());
  const open = (url: string) => run(() => window.open(url, "_blank", "noopener,noreferrer"));

  const downloadResume = run(() => {
    const a = document.createElement("a");
    a.href = resumePdf;
    a.download = "Saran_M_Resume.pdf";
    a.click();
    log("GET", "/resume.pdf", 200);
  });

  const copyEmail = run(async () => {
    try {
      await navigator.clipboard.writeText(profile.contact.email);
      log("POST", "/clipboard", 201, "email");
    } catch {
      log("POST", "/clipboard", 500, "email");
    }
  });

  return (
    <Dialog.Root open={paletteOpen} onOpenChange={setPaletteOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-background/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed left-1/2 top-[14vh] z-50 w-[min(calc(100vw-2rem),36rem)] -translate-x-1/2 overflow-hidden rounded-2xl border bg-popover shadow-2xl shadow-black/10 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-[0.98] data-[state=open]:zoom-in-[0.98]"
        >
          <Dialog.Title className="sr-only">Command menu</Dialog.Title>
          <Command loop>
            <div className="flex items-center gap-3 border-b px-4">
              <span className="font-mono text-sm text-signal-ink">&gt;</span>
              <Command.Input
                autoFocus
                placeholder="Jump to a section or run a command…"
                className="h-14 w-full bg-transparent text-[15px] outline-none placeholder:text-muted-foreground focus-visible:outline-none"
              />
            </div>
            <Command.List className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain p-2">
              <Command.Empty className="px-3 py-8 text-center font-mono text-xs text-muted-foreground">
                404 · no command matches
              </Command.Empty>

              <Command.Group heading="Go to" className={group}>
                <Item icon={<Hash />} hint="/" onSelect={goTo("top")} keywords={["home", "top", "intro"]}>
                  Home
                </Item>
                {NAV.map((item) => (
                  <Item key={item.id} icon={<Hash />} hint={`/${item.id}`} onSelect={goTo(item.id)}>
                    {item.label}
                  </Item>
                ))}
              </Command.Group>

              <Command.Group heading="Actions" className={group}>
                <Item icon={<CornerDownLeft />} onSelect={goTo("contact")} keywords={["email", "message", "hire"]}>
                  Write to Saran
                </Item>
                <Item icon={<Copy />} hint={profile.contact.email} onSelect={copyEmail} keywords={["mail"]}>
                  Copy email address
                </Item>
                <Item icon={<ArrowDown />} hint="pdf" onSelect={downloadResume} keywords={["cv", "download"]}>
                  Download resume
                </Item>
                <Item icon={<Braces />} hint={view === "json" ? "json → ui" : "ui → json"} onSelect={run(toggleView)} keywords={["raw", "api", "view"]}>
                  {view === "json" ? "View page as UI" : "View page as JSON"}
                </Item>
                <Item icon={theme === "dark" ? <Sun /> : <Moon />} onSelect={run(toggleTheme)} keywords={["theme", "dark", "light", "mode"]}>
                  {theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
                </Item>
              </Command.Group>

              <Command.Group heading="Elsewhere" className={group}>
                <Item icon={<FileJson />} hint="/api/resume.json" onSelect={open("/api/resume.json")} keywords={["json", "api", "raw"]}>
                  Full resume as JSON
                </Item>
                <Item icon={<Package />} hint="/vendpilot" onSelect={run(() => navigate("/vendpilot"))}>
                  VendPilot product page
                </Item>
                <Item icon={<Github />} hint="↗" onSelect={open(profile.links.github)}>
                  GitHub
                </Item>
                <Item icon={<Linkedin />} hint="↗" onSelect={open(profile.links.linkedin)}>
                  LinkedIn
                </Item>
                <Item icon={<Link2 />} hint="↗" onSelect={open(profile.links.linktree)}>
                  Linktree
                </Item>
              </Command.Group>
            </Command.List>
            <div className="flex items-center justify-between border-t px-4 py-2.5 font-mono text-[10.5px] text-muted-foreground">
              <span>↑↓ move · ↵ select · esc close</span>
              <span>saran.m</span>
            </div>
          </Command>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
