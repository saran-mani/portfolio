import { ArrowRight, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="container mx-auto text-center animate-fade-in-up">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground">
            Hi, I'm <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Saran</span>
          </h1>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-muted-foreground">
            Backend Developer
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
            Building scalable, high-performance backend systems and APIs that power modern applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button size="lg" className="group" asChild>
              <a href="#contact">
                Get in Touch
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#" download>
                <Download className="mr-2 h-5 w-5" />
                View Resume
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
