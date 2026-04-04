import { Code2, Layers, Zap, Heart } from "lucide-react";

const About = () => {
  const highlights = [
    {
      icon: Code2,
      title: "Frontend",
      description: "React.js, Next.js (SSR/SSG/App Router), React Native, Tailwind CSS — pixel-perfect UIs shipped to production.",
    },
    {
      icon: Layers,
      title: "Full Stack",
      description: "End-to-end ownership from database schema to deployment — REST APIs, NestJS, and event-driven architecture.",
    },
    {
      icon: Zap,
      title: "Performance",
      description: "Sub-200ms API latency, ~70% infra cost cuts via serverless, and CI/CD that deploys in under 12 minutes.",
    },
    {
      icon: Heart,
      title: "Ownership",
      description: "Track record of zero critical post-deploy incidents across agile sprints in early-stage startup environments.",
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Subtle orb */}
      <div
        className="orb w-[300px] h-[300px] top-0 right-0 animate-pulse-glow opacity-30"
        style={{ background: "hsl(270 80% 65% / 0.15)" }}
      />

      <div className="container mx-auto max-w-5xl relative">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Who I am</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">About Me</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text */}
          <div className="space-y-5">
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              I'm a{" "}
              <span className="text-foreground font-medium">Full Stack Engineer</span>{" "}
              with 2+ years of experience building and shipping end-to-end web applications
              across{" "}
              <span className="text-primary font-medium">telemedicine, geospatial,</span>{" "}
              and{" "}
              <span className="text-primary font-medium">multi-tenant SaaS</span>{" "}
              verticals.
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              Proficient in{" "}
              <span className="text-foreground font-medium">React.js, Next.js, TypeScript, NestJS, PostgreSQL, Redis,</span>{" "}
              and <span className="text-foreground font-medium">AWS</span> — with deep
              ownership of frontend architecture (SSR, SSG, App Router) and backend systems
              (REST APIs, event-driven architecture, distributed systems, CI/CD).
            </p>
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
              I thrive in early-stage startup environments where engineering judgment,
              speed, and product quality all matter.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              {["React.js", "Next.js", "TypeScript", "NestJS", "PostgreSQL", "Redis", "AWS", "Docker"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-sm font-medium rounded-lg glass border border-primary/20 text-primary"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Visual card */}
          <div className="relative">
            <div className="gradient-border p-6 space-y-4">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-xs text-muted-foreground font-mono">saran.ts</span>
              </div>
              <div className="font-mono text-sm space-y-1.5 text-muted-foreground">
                <p><span className="text-accent">const</span> <span className="text-primary">developer</span> = {"{"}</p>
                <p className="pl-4"><span className="text-foreground">name</span>: <span className="text-green-400">"Saran M"</span>,</p>
                <p className="pl-4"><span className="text-foreground">role</span>: <span className="text-green-400">"Full Stack Engineer"</span>,</p>
                <p className="pl-4"><span className="text-foreground">experience</span>: <span className="text-yellow-400">"2+ years"</span>,</p>
                <p className="pl-4"><span className="text-foreground">location</span>: <span className="text-green-400">"Bengaluru, India"</span>,</p>
                <p className="pl-4"><span className="text-foreground">available</span>: <span className="text-yellow-400">true</span>,</p>
                <p className="pl-4"><span className="text-foreground">website</span>: <span className="text-green-400">"saranmani.dev"</span>,</p>
                <p>{"}"}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {highlights.map((item, i) => {
            const Icon = item.icon;
            return (
              <div
                key={i}
                className="glass rounded-xl p-5 border border-border hover:border-primary/30 group hover:-translate-y-1 transition-all duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <Icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default About;
