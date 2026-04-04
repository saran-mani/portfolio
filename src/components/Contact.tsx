import { Github, Linkedin, Mail, Phone, MapPin, ArrowUpRight } from "lucide-react";

const Contact = () => {
  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/saran-mani",
      username: "@saran-mani",
      description: "Check out my open source work",
      gradient: "from-slate-500 to-slate-700",
      hoverColor: "hover:border-slate-500/50 hover:text-slate-300",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://linkedin.com/in/saranmj",
      username: "/in/saranmj",
      description: "Connect with me professionally",
      gradient: "from-blue-500 to-blue-700",
      hoverColor: "hover:border-blue-500/50 hover:text-blue-400",
    },
    {
      icon: Mail,
      label: "Email",
      href: "mailto:saranmvdm@gmail.com",
      username: "saranmvdm@gmail.com",
      description: "Drop me a message anytime",
      gradient: "from-red-500 to-rose-700",
      hoverColor: "hover:border-red-500/50 hover:text-red-400",
    },
    {
      icon: Phone,
      label: "Phone",
      href: "tel:+916379710438",
      username: "+91 6379710438",
      description: "Available for quick calls",
      gradient: "from-green-500 to-emerald-700",
      hoverColor: "hover:border-green-500/50 hover:text-green-400",
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Orbs */}
      <div
        className="orb w-[400px] h-[400px] bottom-[-100px] right-[-100px] animate-pulse-glow opacity-20"
        style={{ background: "hsl(217 100% 62% / 0.2)" }}
      />
      <div
        className="orb w-[300px] h-[300px] top-0 left-[-80px] animate-pulse-glow opacity-15"
        style={{ background: "hsl(270 80% 65% / 0.15)", animationDelay: "1s" }}
      />

      <div className="container mx-auto max-w-5xl relative">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold text-primary tracking-widest uppercase mb-3">Let's collaborate</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Get In Touch</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Open to new opportunities, collaborations, and interesting conversations.
            Feel free to reach out through any of the channels below.
          </p>
        </div>

        {/* Social links grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          {socialLinks.map((link, index) => {
            const Icon = link.icon;
            return (
              <a
                key={index}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`group glass rounded-2xl p-5 border border-border ${link.hoverColor} transition-all duration-300 hover:-translate-y-1 flex items-center gap-4`}
              >
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${link.gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
                  <Icon className="h-5 w-5 text-white" />
                </div>

                {/* Text */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground">{link.label}</span>
                    <ArrowUpRight className="h-4 w-4 text-muted-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                  <p className="text-sm font-medium text-muted-foreground truncate">{link.username}</p>
                  <p className="text-xs text-muted-foreground/70 mt-0.5">{link.description}</p>
                </div>
              </a>
            );
          })}
        </div>

        {/* Location & availability */}
        <div className="gradient-border p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MapPin className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Bengaluru, Karnataka, India</p>
                <p className="text-sm text-muted-foreground">IST (UTC +5:30)</p>
              </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-500/10 border border-green-500/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              <span className="text-sm font-medium text-green-400">Available for remote opportunities worldwide</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
