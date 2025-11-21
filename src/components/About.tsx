const About = () => {
  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl sm:text-4xl font-bold text-center mb-12">About Me</h2>
        <div className="bg-card rounded-xl p-8 shadow-md">
          <p className="text-lg text-muted-foreground leading-relaxed">
            I'm a passionate backend developer with a strong interest in building robust, scalable systems. 
            My expertise lies in designing and implementing efficient APIs, optimizing database performance, 
            and architecting distributed systems. I love working with technologies like Node.js, PostgreSQL, 
            Redis, and Docker to create high-performance backend solutions.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mt-4">
            I'm constantly exploring new technologies and best practices in backend engineering, including 
            microservices architecture, caching strategies, message queues, and performance optimization. 
            I believe in writing clean, maintainable code and following industry best practices to deliver 
            reliable software solutions.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
