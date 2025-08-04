import React from 'react';
import { ExternalLink, Github, Code2, Database, Globe, Zap } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Enterprise E-Commerce Platform',
      description: 'Comprehensive e-commerce solution featuring advanced user authentication, secure payment processing, real-time inventory management, and analytics dashboard. Built with modern architecture and scalable design patterns.',
      tech: ['React', 'TypeScript', 'Node.js', 'MongoDB', 'Stripe API', 'JWT'],
      github: 'https://github.com/Arnabjoyantasaha',
      demo: 'https://arnabjoyantasaha.netlify.app',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Globe,
      gradient: 'from-blue-500 to-purple-600'
    },
    {
      title: 'Intelligent Chat Application',
      description: 'Advanced real-time messaging platform with AI-powered responses, natural language processing, conversation analytics, and seamless user experience. Demonstrates expertise in modern web technologies and AI integration.',
      tech: ['React', 'Socket.io', 'OpenAI API', 'Express.js', 'Redis', 'MongoDB'],
      github: 'https://github.com/Arnabjoyantasaha',
      demo: 'https://arnabjoyantasaha.netlify.app',
      image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Zap,
      gradient: 'from-green-500 to-teal-600'
    },
    {
      title: 'Professional Task Management System',
      description: 'Enterprise-grade project management platform featuring intuitive drag-and-drop interfaces, team collaboration tools, real-time synchronization, and comprehensive analytics. Optimized for productivity and scalability.',
      tech: ['TypeScript', 'React', 'Firebase', 'Material-UI', 'Chart.js', 'WebSocket'],
      github: 'https://github.com/Arnabjoyantasaha',
      demo: 'https://arnabjoyantasaha.netlify.app',
      image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Code2,
      gradient: 'from-purple-500 to-pink-600'
    },
    {
      title: 'Advanced Weather Analytics Platform',
      description: 'Sophisticated data visualization platform aggregating meteorological data from multiple sources, featuring predictive analytics, machine learning models, and interactive dashboards for comprehensive weather insights.',
      tech: ['Python', 'Django', 'D3.js', 'PostgreSQL', 'TensorFlow', 'REST API'],
      github: 'https://github.com/Arnabjoyantasaha',
      demo: 'https://arnabjoyantasaha.netlify.app',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Database,
      gradient: 'from-orange-500 to-red-600'
    }
  ];

  return (
    <section id="projects" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="text-white">Featured</span> <span className="tech-gradient">Projects</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 animate-professional-slide-up">
            {projects.map((project, index) => (
              <div
                key={index}
                className="tech-border-animated overflow-hidden tech-card-hover group"
                style={{ animationDelay: `${index * 0.3}s` }}
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-br from-black/80 to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                    <project.icon className="h-20 w-20 text-white animate-tech-pulse" />
                  </div>
                  <div className={`absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r ${project.gradient} text-white text-xs font-bold`}>
                    FEATURED
                  </div>
                </div>

                <div className="p-8">
                  <h3 className="text-2xl font-bold text-white mb-4">{project.title}</h3>
                  <p className="text-gray-300 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-3 mb-6">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-indigo-500/20 text-indigo-300 px-3 py-1 rounded-full text-sm font-medium border border-indigo-400/30"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-6">
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 text-gray-400 hover:text-indigo-400 professional-hover font-medium"
                    >
                      <Github size={20} />
                      <span>Source Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center space-x-2 text-gray-400 hover:text-indigo-400 professional-hover font-medium"
                    >
                      <ExternalLink size={20} />
                      <span>Live Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <a
              href="https://github.com/Arnabjoyantasaha"
              className="inline-flex items-center space-x-3 tech-border-animated text-white px-8 py-4 professional-hover font-semibold animate-professional-fade-in"
            >
              <Github size={24} />
              <span>View All Projects on GitHub</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;