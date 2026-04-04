import { GraduationCap, Calendar, MapPin, BookOpen } from "lucide-react";

const Education = () => {
  const courses = [
    "Data Structures & Algorithms",
    "Databases",
    "Operating Systems",
    "Computer Networks",
    "Object-Oriented Programming",
    "Machine Learning",
    "Advanced DSA",
    "Data Mining",
    "Information Retrieval",
    "Image Processing",
  ];

  return (
    <section id="education" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Orb */}
      <div
        className="orb w-[300px] h-[300px] top-0 right-[-80px] animate-pulse-glow opacity-20"
        style={{ background: "hsl(270 80% 65% / 0.15)" }}
      />

      <div className="container mx-auto max-w-4xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Academic background</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Education</h2>
        </div>

        <div className="gradient-border p-8">
          {/* Top row */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-6">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center flex-shrink-0 shadow-lg shadow-primary/20">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">B.Tech – Information Technology</h3>
                <p className="text-base font-semibold text-muted-foreground mt-0.5">
                  CSI College of Engineering (Anna University)
                </p>
              </div>
            </div>

            {/* CGPA badge */}
            <div className="flex-shrink-0">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-primary/10 border border-primary/20">
                <span className="text-xl font-bold text-gradient">7.70</span>
                <span className="text-sm text-muted-foreground">/ 10.0 CGPA</span>
              </div>
            </div>
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
            <span className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              Nov 2021 – May 2025
            </span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              Ooty, Tamil Nadu, India
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-primary/30 via-accent/20 to-transparent mb-6" />

          {/* Relevant coursework */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <BookOpen className="h-4 w-4 text-primary" />
              <h4 className="text-sm font-semibold text-foreground tracking-wide uppercase">Relevant Coursework</h4>
            </div>
            <div className="flex flex-wrap gap-2">
              {courses.map((course) => (
                <span
                  key={course}
                  className="px-3 py-1.5 text-sm rounded-lg bg-background/60 text-muted-foreground border border-border hover:text-foreground hover:border-primary/30 transition-colors cursor-default"
                >
                  {course}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
