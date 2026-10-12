import { CommandPalette } from "@/components/site/CommandPalette";
import { Contact } from "@/components/site/Contact";
import { Education } from "@/components/site/Education";
import { Experience } from "@/components/site/Experience";
import { Footer } from "@/components/site/Footer";
import { Hero } from "@/components/site/Hero";
import { LogDock } from "@/components/site/LogDock";
import { Projects } from "@/components/site/Projects";
import { Stack } from "@/components/site/Stack";
import { TopBar } from "@/components/site/TopBar";
import { SiteProvider } from "@/state/SiteProvider";

const Index = () => (
  <SiteProvider>
    <a
      href="#experience"
      className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-foreground focus:px-3 focus:py-2 focus:text-background"
    >
      Skip to content
    </a>
    <TopBar />
    <main>
      <Hero />
      <Experience />
      <Projects />
      <Stack />
      <Education />
      <Contact />
    </main>
    <Footer />
    <LogDock />
    <CommandPalette />
  </SiteProvider>
);

export default Index;
