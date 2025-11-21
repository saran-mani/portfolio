import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Code, Database, Server, Wrench } from 'lucide-react';

const Skills = () => {
  const skillCategories = [
    {
      icon: Code,
      title: 'Languages',
      skills: ['JavaScript/TypeScript', 'Python', 'Java', 'Go'],
    },
    {
      icon: Server,
      title: 'Frameworks',
      skills: ['Node.js', 'Express', 'NestJS', 'FastAPI', 'Spring Boot'],
    },
    {
      icon: Database,
      title: 'Databases',
      skills: ['PostgreSQL', 'MongoDB', 'Redis', 'MySQL', 'Elasticsearch'],
    },
    {
      icon: Wrench,
      title: 'Tools & DevOps',
      skills: ['Docker', 'Kubernetes', 'AWS', 'Git', 'CI/CD', 'RabbitMQ'],
    },
  ];

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Skills & Technologies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{category.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {category.skills.map((skill, skillIndex) => (
                      <li key={skillIndex} className="text-sm text-muted-foreground flex items-center">
                        <span className="w-1.5 h-1.5 bg-accent rounded-full mr-2"></span>
                        {skill}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Skills;
