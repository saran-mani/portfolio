import { ExternalLink, Github, Star } from "lucide-react";

const Projects = () => {
  const projects = [
    {
      title: "VendPilot",
      subtitle: "Multi-tenant Inventory Sync SaaS",
      description:
        "Full stack SaaS platform syncing inventory across Shopify, WooCommerce, Etsy, and eBay via a canonical product model with webhook-first architecture.",
      tech: ["Next.js", "NestJS", "TypeScript", "PostgreSQL", "Redis", "BullMQ", "AWS EC2", "Turborepo"],
      features: [
        "Webhook-first sync engine with HMAC verification & Redis distributed locking",
        "Eventual consistency within 5s of a stock event across all channels",
        "5-job BullMQ onboarding pipeline — new seller onboarded in under 3 minutes",
        "AWS EC2 + nginx + Certbot SSL + GitHub Actions CI/CD zero-downtime releases",
      ],
      github: "https://github.com/saran-mani",
      live: "/vendpilot",
      liveLabel: "Case Study",
      featured: true,
      gradient: "from-blue-500 to-violet-500",
      accentColor: "blue",
    },
    {
      title: "URL Shortener",
      subtitle: "Real-Time Analytics Dashboard",
      description:
        "Full stack URL shortener with a Next.js dashboard showing real-time analytics — clicks, unique visitors, and usage trends — handling 1,000 concurrent redirects at under 80ms p99 latency.",
      tech: ["Next.js", "React.js", "Node.js", "Express.js", "MongoDB", "Docker", "Azure", "GitHub Actions"],
      features: [
        "Handles up to 1,000 concurrent redirects with under 80ms p99 latency",
        "Google OAuth 2.0 authentication with per-user rate limiting",
        "Dockerised and deployed on Microsoft Azure via GitHub Actions CI/CD",
        "Real-time analytics: clicks, unique visitors, usage trends dashboard",
      ],
      github: "https://github.com/saran-mani",
      live: null,
      liveLabel: null,
      featured: false,
      gradient: "from-violet-500 to-pink-500",
      accentColor: "violet",
    },
    {
      title: "Smart Attendance System",
      subtitle: "BLE-based Contactless Attendance",
      description:
        "Contactless BLE-based attendance system with a React Native mobile app covering 5+ classrooms and 200+ students, eliminating manual roll-call and preventing proxy attendance.",
      tech: ["React Native", "Node.js", "Express.js", "MongoDB", "NRF51822 BLE", "TypeScript"],
      features: [
        "Covers 5+ classrooms, 200+ students with unique BLE device ID binding",
        "Prevents proxy attendance via hardware device fingerprinting",
        "Secure REST API for authentication, attendance records, and admin controls",
        "Published research paper on the system's architecture and results",
      ],
      github: "https://github.com/orgs/GeoAttendance-project/repositories",
      live: "https://irjaeh.com/index.php/journal/article/view/686",
      liveLabel: "Research Paper",
      featured: false,
      gradient: "from-emerald-500 to-blue-500",
      accentColor: "emerald",
    },
  ];

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Orb */}
      <div
        className="orb w-[400px] h-[400px] top-1/2 right-[-150px] animate-pulse-glow opacity-20"
        style={{ background: "hsl(270 80% 65% / 0.15)" }}
      />

      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">What I've built</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Featured Projects</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <div
              key={index}
              className="relative glass rounded-2xl border border-border overflow-hidden group hover:-translate-y-2 hover:border-primary/30 transition-all duration-500 flex flex-col"
            >
              {/* Gradient top bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${
                project.accentColor === "blue"
                  ? "from-blue-500 to-violet-500"
                  : project.accentColor === "violet"
                  ? "from-violet-500 to-pink-500"
                  : "from-emerald-500 to-blue-500"
              }`} />

              {/* Card glow overlay on hover */}
              <div className={`absolute inset-0 bg-gradient-to-br ${
                project.accentColor === "blue"
                  ? "from-blue-500/10 via-transparent to-violet-500/10"
                  : project.accentColor === "violet"
                  ? "from-violet-500/10 via-transparent to-pink-500/10"
                  : "from-emerald-500/10 via-transparent to-blue-500/10"
              } opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />

              <div className="relative p-6 flex flex-col flex-1">
                {/* Header */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <h3 className="text-lg font-bold text-foreground">{project.title}</h3>
                    {project.featured && (
                      <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                        <Star className="h-3 w-3" />
                        Featured
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground font-medium">{project.subtitle}</p>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-5">{project.description}</p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 text-xs font-medium rounded-md bg-background/60 text-muted-foreground border border-border"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Features */}
                <ul className="space-y-1.5 mb-6 flex-1">
                  {project.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className={`mt-1.5 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${project.gradient} flex-shrink-0`} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Links */}
                <div className="flex gap-3 mt-auto">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium glass border border-border hover:border-primary/40 hover:text-primary text-muted-foreground transition-all duration-300"
                  >
                    <Github className="h-4 w-4" />
                    Code
                  </a>
                  {project.live && (
                    <a
                      href={project.live}
                      target={project.live.startsWith("http") ? "_blank" : "_self"}
                      rel={project.live.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium bg-primary/10 border border-primary/30 text-primary hover:bg-primary/20 hover:border-primary/60 transition-all duration-300"
                    >
                      <ExternalLink className="h-4 w-4" />
                      {project.liveLabel ?? "Demo"}
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View more */}
        <div className="text-center mt-12">
          <a
            href="https://github.com/saran-mani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-medium glass border border-border hover:border-primary/40 hover:text-primary text-muted-foreground transition-all duration-300"
          >
            <Github className="h-4 w-4" />
            View all projects on GitHub
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
