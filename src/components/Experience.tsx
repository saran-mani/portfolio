import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Briefcase } from "lucide-react";

const Experience = () => {
  const experiences = [
    {
      title: "Full Stack Developer",
      company: "Synapsis Medical Technologies Inc",
      period: "July 2025 - Present",
      description: [
        "Designed and implemented a geospatial analysis algorithm using MongoDB Geo queries and shapefile parsing toidentify affected Indigenous regions.",
        "Developed a browser notification system using service workers and JWT-based authentication for real-time projectalerts.",
        "Integrated multi-provider OAuth (Google, Apple) authentication for secure user onboarding.",
      ],
    },
    {
      title: "Full Stack Developer Intern",
      company: "Synapsis Medical Technologies Inc",
      period: "April 2025 - June 2025",
      description: [
        "Built core modules for Maskwa Tech, a community project management app using GeoJSON and MongoDB for map rendering and site tracking.",
        "Automated data ingestion and visualized construction progress.",
      ],
    },
    {
      title: "Software Engineer Intern",
      company: "MyCLNQ Health",
      period: "July 2024 - April 2025",
      description: [
        "Integrated CrediMax payment gateway and automated PDF invoicing with Puppeteer.",
        "Migrated AWS SDK from v2 → v3 for performance and maintainability improvements.",
        "Integrated Zoom APIs for live teleconsultation; collaborated with Vietnam-based clients for UAT and deployment.",
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">
          Experience
        </h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-lg mt-1">
                    <Briefcase className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-xl">{exp.title}</CardTitle>
                    <CardDescription className="text-base">
                      <span className="font-semibold text-foreground">
                        {exp.company}
                      </span>
                      <span className="mx-2">•</span>
                      <span>{exp.period}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 ml-14">
                  {exp.description.map((item, itemIndex) => (
                    <li
                      key={itemIndex}
                      className="text-muted-foreground flex items-start"
                    >
                      <span className="w-1.5 h-1.5 bg-accent rounded-full mr-3 mt-2 flex-shrink-0"></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
