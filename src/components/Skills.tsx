import { Code, Globe, Server, Database, Cloud, Lock, Layers, Wrench, Cpu } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: "Languages",
      color: "from-blue-500/10 to-blue-600/10 border-blue-500/20",
      iconColor: "text-blue-400",
      skills: ["TypeScript", "JavaScript (Node.js)", "SQL", "HTML5", "CSS3", "Bash"],
    },
    {
      icon: Globe,
      title: "Frontend",
      color: "from-cyan-500/10 to-cyan-600/10 border-cyan-500/20",
      iconColor: "text-cyan-400",
      skills: ["React.js", "Next.js", "React Native", "Tailwind CSS", "shadcn/ui", "SSR / SSG / App Router", "Server Actions"],
    },
    {
      icon: Server,
      title: "Backend",
      color: "from-violet-500/10 to-violet-600/10 border-violet-500/20",
      iconColor: "text-violet-400",
      skills: ["NestJS", "Express.js", "GraphQL", "REST API Design", "Serverless (AWS Lambda)"],
    },
    {
      icon: Database,
      title: "Databases",
      color: "from-emerald-500/10 to-emerald-600/10 border-emerald-500/20",
      iconColor: "text-emerald-400",
      skills: ["PostgreSQL (PostGIS)", "MongoDB", "Redis", "Supabase"],
    },
    {
      icon: Cpu,
      title: "Queue & Async",
      color: "from-orange-500/10 to-orange-600/10 border-orange-500/20",
      iconColor: "text-orange-400",
      skills: ["BullMQ", "Event-driven Architecture", "Webhook Processing", "HMAC Verification", "Distributed Locking"],
    },
    {
      icon: Cloud,
      title: "Cloud & DevOps",
      color: "from-sky-500/10 to-sky-600/10 border-sky-500/20",
      iconColor: "text-sky-400",
      skills: ["AWS (Lambda, EC2, S3)", "Docker", "Kubernetes", "GitHub Actions CI/CD", "nginx", "Certbot SSL"],
    },
    {
      icon: Lock,
      title: "Auth & Security",
      color: "from-rose-500/10 to-rose-600/10 border-rose-500/20",
      iconColor: "text-rose-400",
      skills: ["JWT", "OAuth 2.0", "Supabase Auth", "Better Auth", "Rate Limiting", "Multi-tenant Architecture"],
    },
    {
      icon: Layers,
      title: "Architecture",
      color: "from-pink-500/10 to-pink-600/10 border-pink-500/20",
      iconColor: "text-pink-400",
      skills: ["Full Stack SaaS", "Microservices", "Distributed Systems", "API Gateway", "Monorepo (Turborepo)"],
    },
    {
      icon: Wrench,
      title: "Tools",
      color: "from-amber-500/10 to-amber-600/10 border-amber-500/20",
      iconColor: "text-amber-400",
      skills: ["Git", "Postman", "Figma", "Agile / Scrum", "pnpm", "Geospatial (PostGIS, Shapefiles)"],
    },
  ];

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Orb */}
      <div
        className="orb w-[350px] h-[350px] bottom-0 left-[-100px] animate-pulse-glow opacity-20"
        style={{ background: "hsl(217 100% 62% / 0.2)" }}
      />

      <div className="container mx-auto max-w-6xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">What I work with</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Skills & Technologies</h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <div
                key={index}
                className={`glass rounded-2xl p-5 border bg-gradient-to-br ${category.color} hover:-translate-y-1 transition-all duration-300 group`}
              >
                {/* Category header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-background/50 flex items-center justify-center">
                    <Icon className={`h-4.5 w-4.5 ${category.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-base text-foreground">{category.title}</h3>
                </div>

                {/* Skills as pills */}
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="px-2.5 py-1 text-xs font-medium rounded-lg bg-background/60 text-muted-foreground hover:text-foreground hover:bg-background/80 transition-colors cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}

          {/* Currently learning card */}
          <div className="glass rounded-2xl p-5 border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-background/50 flex items-center justify-center">
                <span className="text-base">🚀</span>
              </div>
              <h3 className="font-bold text-base text-foreground">Exploring</h3>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Go", "gRPC", "System Design", "Kafka", "Rust"].map((skill) => (
                <span
                  key={skill}
                  className="px-2.5 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
