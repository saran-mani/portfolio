import { useEffect, useState } from "react";
import { ArrowRight, Download, Github, Linkedin } from "lucide-react";
import resumePDF from "@/assets/Saran_Resume.pdf";

const ROLES = [
  "Full Stack Engineer",
  "React & Next.js Dev",
  "Backend Specialist",
  "API Architect",
];

const Hero = () => {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [charIndex, setCharIndex] = useState(0);

  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && charIndex <= current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex));
        setCharIndex((c) => c + 1);
      }, 80);
    } else if (!isDeleting && charIndex > current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, charIndex - 1));
        setCharIndex((c) => c - 1);
      }, 45);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((r) => (r + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  return (
    <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 grid-pattern opacity-60" />

      {/* Gradient orbs */}
      <div
        className="orb w-[500px] h-[500px] top-[-100px] left-[-200px] animate-pulse-glow"
        style={{ background: "hsl(217 100% 62% / 0.12)" }}
      />
      <div
        className="orb w-[400px] h-[400px] bottom-[-100px] right-[-150px] animate-pulse-glow"
        style={{ background: "hsl(270 80% 65% / 0.12)", animationDelay: "1.5s" }}
      />
      <div
        className="orb w-[200px] h-[200px] top-[40%] right-[20%] animate-float"
        style={{ background: "hsl(217 100% 62% / 0.06)" }}
      />

      {/* Content */}
      <div className="relative container mx-auto text-center animate-fade-in-up max-w-5xl">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-primary/20 text-sm text-primary mb-8">
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          Open to new opportunities
        </div>

        {/* Heading */}
        <h1 className="text-5xl sm:text-6xl lg:text-8xl font-extrabold tracking-tight mb-4 leading-[1.1]">
          Hi, I'm{" "}
          <span className="text-gradient">Saran</span>
        </h1>

        {/* Typing role */}
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground mb-6 h-12 flex items-center justify-center gap-1">
          <span>{displayed}</span>
          <span className="w-0.5 h-8 bg-primary animate-blink ml-1" />
        </h2>

        {/* Tagline */}
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          2+ years building end-to-end web applications across telemedicine,
          geospatial, and SaaS verticals — from API design to production deployment.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <a
            href="#contact"
            className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-white bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 hover:shadow-primary/50 transition-all duration-300 hover:-translate-y-0.5"
          >
            Get in Touch
            <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
          </a>
          <a
            href={resumePDF}
            download="Saran_Resume.pdf"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-foreground glass border border-border hover:border-primary/50 hover:text-primary transition-all duration-300 hover:-translate-y-0.5"
          >
            <Download className="h-5 w-5" />
            Download Resume
          </a>
          <a
            href="https://linktr.ee/saranmj"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl font-semibold text-muted-foreground glass border border-border hover:border-accent/50 hover:text-accent transition-all duration-300 hover:-translate-y-0.5"
          >
            Linktr.ee
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mb-12">
          {[
            { value: "2+", label: "Years Experience" },
            { value: "10+", label: "Projects Shipped" },
            { value: "3", label: "Verticals Served" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="glass rounded-xl p-4 border border-border hover:border-primary/30 transition-colors"
            >
              <div className="text-2xl font-bold text-gradient">{stat.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="https://github.com/saran-mani"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass border border-border hover:border-primary/40 hover:text-primary text-muted-foreground transition-all duration-300 hover:-translate-y-0.5"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="https://linkedin.com/in/saranmj"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 rounded-xl glass border border-border hover:border-primary/40 hover:text-primary text-muted-foreground transition-all duration-300 hover:-translate-y-0.5"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-muted-foreground to-transparent" />
      </div>
    </section>
  );
};

export default Hero;
