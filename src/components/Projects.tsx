import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Projects = () => {
  const projects = [
    {
      title:
        "A Smart Attendance System using bleutooth Low Energy and geofencing technologies",
      description:
        "An innovative attendance system leveraging Bluetooth Low Energy (BLE) and geofencing to accurately track and manage attendance in real-time.",
      tech: [
        "React",
        "React Native",
        "Node.js",
        "Express",
        "MongoDB",
        "TypeScript",
      ],
      features: [
        "Bluetooth Low Energy Integration",
        "Geofencing Capabilities",
        "Real-time Attendance Tracking",
        "User-friendly Interface",
      ],
      github: "https://github.com/orgs/GeoAttendance-project/repositories",
      live: "https://irjaeh.com/index.php/journal/article/view/686",
    },
    {
      title: "Web to Pdf Converter Web Service",
      description:
        "A robust web service that converts web pages to PDF format, featuring URL validation, customizable settings, and high-quality output generation.",
      tech: ["Node.js", "Express.js", "Angular", "Puppeteer", "TypeScript"],
      features: [
        "URL Validation",
        "Customizable PDF Settings",
        "High-Quality Rendering",
        "Error Handling",
      ],
      github: "https://github.com/saran-mani/web2pdf-frontend",
      live: "https://webtopdf-saran.netlify.app/",
    },
    {
      title: "Countries Info Web App",
      description:
        "A responsive web application that provides detailed information about countries worldwide, including demographics, geography, and cultural insights.",
      tech: ["Angular", "TypeScript", "REST API", "CSS"],
      features: [
        "Search and Filter",
        "Detailed Country Profiles",
        "Responsive Design",
        "Geograpical Data",
      ],
      github: "https://github.com/saran-mani/countries-info",
      live: "https://country-info-detail.netlify.app/",
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Featured Projects
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow flex flex-col"
            >
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-foreground">
                      Tech Stack:
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-foreground">
                      Key Features:
                    </h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="text-sm text-muted-foreground flex items-start"
                        >
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1"
                    asChild
                  >
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Demo
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
