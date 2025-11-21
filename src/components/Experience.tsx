import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

const Experience = () => {
  const experiences = [
    {
      title: 'Backend Developer Intern',
      company: 'Tech Solutions Inc.',
      period: 'Jun 2023 - Aug 2023',
      description: [
        'Developed and maintained RESTful APIs using Node.js and Express',
        'Optimized database queries resulting in 40% performance improvement',
        'Implemented caching strategies using Redis for frequently accessed data',
        'Collaborated with frontend team to integrate APIs and resolve issues',
      ],
    },
    {
      title: 'Software Engineering Intern',
      company: 'Innovation Labs',
      period: 'Jan 2023 - May 2023',
      description: [
        'Built microservices architecture for distributed application',
        'Implemented authentication and authorization using JWT',
        'Designed database schemas for PostgreSQL and MongoDB',
        'Wrote comprehensive unit and integration tests',
      ],
    },
    {
      title: 'Backend Development Project',
      company: 'Personal Project',
      period: '2022 - Present',
      description: [
        'Developed full-stack applications with focus on backend architecture',
        'Implemented CI/CD pipelines using Docker and GitHub Actions',
        'Created scalable APIs handling thousands of requests per minute',
        'Experimented with various backend technologies and design patterns',
      ],
    },
  ];

  return (
    <section id="experience" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Experience</h2>
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
                      <span className="font-semibold text-foreground">{exp.company}</span>
                      <span className="mx-2">•</span>
                      <span>{exp.period}</span>
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 ml-14">
                  {exp.description.map((item, itemIndex) => (
                    <li key={itemIndex} className="text-muted-foreground flex items-start">
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
