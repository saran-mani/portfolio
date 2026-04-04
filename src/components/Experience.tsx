import { MapPin, Calendar } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Software Engineer",
      company: "Synapsis Medical Technologies",
      period: "Jul 2025 – Present",
      location: "Bengaluru, India",
      type: "Full-time",
      description: [
        "Led full stack development of an indigenous community geospatial platform — architected Next.js frontend with SSR, dynamic map rendering, and NestJS backend APIs, processing shapefile ingestion pipelines handling 500+ geospatial records per import cycle.",
        "Owned end-to-end development of the oLo Eye Care desktop application — built React.js + Electron frontend, designed REST APIs, and integrated Supabase Auth for session management, reducing authentication-related support issues by ~60% post-launch.",
        "Architected and deployed event-driven serverless backend on AWS Lambda with auto-scaling, cutting provisioning overhead by ~70% and supporting variable patient workloads with zero manual intervention.",
        "Established GitHub Actions CI/CD pipelines covering build, test, and deployment — reducing release cycle from 2-hour manual deploys to under 12 minutes, enabling daily production releases.",
        "Owned cross-platform desktop distribution pipelines (macOS + Windows) with automated signing and notarization, ensuring zero-downtime delivery across 3 clinical environments.",
      ],
      gradient: "from-blue-500 to-violet-500",
      current: true,
    },
    {
      title: "Software Engineer Intern",
      company: "Synapsis Medical Technologies",
      period: "Apr 2025 – Jun 2025",
      location: "Bengaluru, India",
      type: "Internship",
      description: [
        "Designed and built React.js UI components for the geospatial platform dashboard and contributed to NestJS/PostGIS backend APIs for shapefile ingestion with async processing via BullMQ queue workers.",
        "Defined REST API contracts and PostgreSQL data models across 4 cross-functional teams, accelerating feature delivery for the oLo Eye Care product by an estimated 2-sprint cycle.",
      ],
      gradient: "from-violet-500 to-pink-500",
      current: false,
    },
    {
      title: "Software Engineer Intern",
      company: "MyCLNQ Health",
      period: "Jul 2024 – Mar 2025",
      location: "Remote",
      type: "Internship",
      description: [
        "Designed and implemented real-time consulting APIs for FV Home Hospital (Vietnam) supporting concurrent doctor-patient sessions with under 200ms average response latency, contributing to a platform serving 10,000+ patients across South-East Asia.",
        "Integrated 3 payment gateway providers with multi-currency support, enabling secure in-app transactions — handled edge cases including partial failures, refunds, and currency conversion.",
        "Engineered a personalised diet plan algorithm generating patient-specific nutrition recommendations from 15+ health profile parameters, improving patient engagement by ~35%.",
        "Shipped production features across 6 agile sprints with zero critical post-deploy incidents, collaborating closely with product and design to ship full stack features end-to-end.",
      ],
      gradient: "from-emerald-500 to-blue-500",
      current: false,
    },
  ];

  return (
    <section id="experience" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Orb */}
      <div
        className="orb w-[300px] h-[300px] top-1/4 left-[-100px] animate-pulse-glow opacity-20"
        style={{ background: "hsl(217 100% 62% / 0.2)" }}
      />

      <div className="container mx-auto max-w-4xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">My journey</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Experience</h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-8 top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 via-accent/40 to-transparent" />

          <div className="space-y-10">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-12 sm:pl-20">
                {/* Timeline dot */}
                <div className="absolute left-0 sm:left-4 top-5 flex items-center justify-center">
                  <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${exp.gradient} flex items-center justify-center shadow-lg`}>
                    <div className="w-2 h-2 rounded-full bg-white" />
                  </div>
                  {exp.current && (
                    <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${exp.gradient} animate-ping opacity-30`} />
                  )}
                </div>

                {/* Card */}
                <div className="glass rounded-2xl border border-border hover:border-primary/30 p-6 group hover:-translate-y-0.5 transition-all duration-300">
                  {/* Top section */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <h3 className="text-lg font-bold text-foreground">{exp.title}</h3>
                        {exp.current && (
                          <span className="px-2 py-0.5 rounded-full bg-green-500/10 text-green-400 text-xs font-medium border border-green-500/20">
                            Current
                          </span>
                        )}
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20">
                          {exp.type}
                        </span>
                      </div>
                      <p className="text-base font-semibold text-muted-foreground">{exp.company}</p>
                    </div>
                    <div className="flex flex-col sm:items-end gap-1.5 text-sm text-muted-foreground flex-shrink-0">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {exp.period}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {exp.location}
                      </span>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className={`h-px w-full bg-gradient-to-r ${exp.gradient} opacity-20 mb-4`} />

                  {/* Description */}
                  <ul className="space-y-2.5">
                    {exp.description.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground leading-relaxed">
                        <span className={`mt-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${exp.gradient} flex-shrink-0`} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
