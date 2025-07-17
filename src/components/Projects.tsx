import React from 'react';
import { ExternalLink, Github, Code, Database, Globe } from 'lucide-react';

const Projects = () => {
  const projects = [
    {
      title: 'Library Management System',
      description: 'A comprehensive library management system built in C programming language. Features include book cataloging, member registration, issue/return tracking, and fine calculation.',
      tech: ['C Programming', 'File Handling', 'Data Structures', 'Algorithms'],
      github: 'https://github.com',
      demo: 'https://example.com',
      image: 'https://images.pexels.com/photos/481516/pexels-photo-481516.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Database
    },
    {
      title: 'Gym Management System',
      description: 'Object-oriented gym management system developed in Java. Includes member management, trainer scheduling, equipment tracking, and membership billing with OOP principles.',
      tech: ['Java', 'OOP', 'Inheritance', 'Polymorphism'],
      github: 'https://github.com',
      demo: 'https://example.com',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=800',
      icon: Code
    }
  ];

  return (
    <section id="projects" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            My <span className="text-cyan-400">Projects</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {projects.map((project, index) => (
              <div
                key={index}
                className="bg-gray-900/90 backdrop-blur-sm border border-gray-800 rounded-lg overflow-hidden hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105 group"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <project.icon className="h-16 w-16 text-cyan-400" />
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-white mb-3">{project.title}</h3>
                  <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="bg-slate-700 text-cyan-400 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="flex space-x-4">
                    <a
                      href={project.github}
                      className="flex items-center space-x-2 text-slate-400 hover:text-white transition-colors duration-200"
                    >
                      <Github size={18} />
                      <span className="text-sm">Code</span>
                    </a>
                    <a
                      href={project.demo}
                      className="flex items-center space-x-2 text-slate-400 hover:text-cyan-400 transition-colors duration-200"
                    >
                      <ExternalLink size={18} />
                      <span className="text-sm">Demo</span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://github.com/Arnabjoyantasaha"
              className="inline-flex items-center space-x-2 bg-gray-900/80 backdrop-blur-sm border border-gray-800 hover:border-cyan-400/50 text-white px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <Github size={20} />
              <span>View More Projects</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;