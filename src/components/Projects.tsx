import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Projects = () => {
  const projects = [
    {
      title: 'E-Commerce API',
      description: 'Scalable REST API for an e-commerce platform with payment integration, inventory management, and order processing.',
      tech: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Stripe API'],
      features: ['JWT Authentication', 'Rate Limiting', 'Caching Strategy', 'Payment Gateway'],
      github: '#',
      live: '#',
    },
    {
      title: 'Real-Time Chat System',
      description: 'High-performance chat application supporting multiple rooms, private messaging, and real-time notifications.',
      tech: ['Socket.io', 'Node.js', 'MongoDB', 'Redis Pub/Sub'],
      features: ['WebSocket Connections', 'Message Queue', 'Presence System', 'File Uploads'],
      github: '#',
      live: '#',
    },
    {
      title: 'Task Management API',
      description: 'RESTful API for project and task management with team collaboration features and deadline tracking.',
      tech: ['NestJS', 'TypeScript', 'PostgreSQL', 'Docker'],
      features: ['RBAC', 'Real-time Updates', 'File Storage', 'Email Notifications'],
      github: '#',
      live: '#',
    },
    {
      title: 'Microservices Platform',
      description: 'Distributed microservices architecture with service discovery, API gateway, and centralized logging.',
      tech: ['Node.js', 'RabbitMQ', 'Docker', 'Kubernetes', 'Nginx'],
      features: ['Service Mesh', 'Load Balancing', 'Monitoring', 'Auto-scaling'],
      github: '#',
      live: '#',
    },
    {
      title: 'Authentication Service',
      description: 'Centralized authentication and authorization service supporting OAuth, JWT, and multi-factor authentication.',
      tech: ['Express', 'PostgreSQL', 'Redis', 'Passport.js'],
      features: ['OAuth 2.0', '2FA', 'Session Management', 'Password Reset'],
      github: '#',
      live: '#',
    },
    {
      title: 'Analytics Pipeline',
      description: 'Data processing pipeline for collecting, processing, and visualizing application metrics and user analytics.',
      tech: ['Python', 'FastAPI', 'Elasticsearch', 'Kafka', 'PostgreSQL'],
      features: ['Real-time Processing', 'Data Aggregation', 'Custom Dashboards', 'Alert System'],
      github: '#',
      live: '#',
    },
  ];

  return (
    <section id="projects" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">Featured Projects</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl">{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="space-y-4 flex-1">
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-foreground">Tech Stack:</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, techIndex) => (
                        <Badge key={techIndex} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold mb-2 text-foreground">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="text-sm text-muted-foreground flex items-start">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 mt-1.5 flex-shrink-0"></span>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4 mr-1" />
                      Code
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1" asChild>
                    <a href={project.live} target="_blank" rel="noopener noreferrer">
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
