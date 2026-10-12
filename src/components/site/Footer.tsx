import { paletteShortcut } from "@/lib/platform";
import { usePrefs } from "@/state/context";
import { Wrap } from "./Wrap";

const built = new Date(__BUILD_TIME__).toISOString().slice(0, 10);

export function Footer() {
  const { setPaletteOpen } = usePrefs();
  return (
    <footer className="border-t py-10 pb-20 sm:pb-10">
      <Wrap className="flex flex-col gap-3 font-mono text-[11.5px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} Saran M · Bengaluru</span>
        <span>
          build {built}
          {__COMMIT__ && <> · {__COMMIT__}</>} ·{" "}
          <a href="/api/resume.json" className="underline decoration-dotted underline-offset-4 hover:text-foreground">
            /api/resume.json
          </a>
        </span>
        <button type="button" onClick={() => setPaletteOpen(true)} className="text-left hover:text-foreground">
          {paletteShortcut} to navigate
        </button>
      </Wrap>
    </footer>
  );
}
