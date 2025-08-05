import React from 'react';
import { Code, Database, Globe, Cpu } from 'lucide-react';

const About = () => {
  const interests = [
    { icon: Code, title: 'Software Development', description: 'Full-stack web development with modern frameworks' },
    { icon: Database, title: 'Data Science', description: 'Machine learning and data analysis' },
    { icon: Globe, title: 'Web Technologies', description: 'Frontend and backend web development' },
    { icon: Cpu, title: 'System Design', description: 'Scalable architecture and distributed systems' }
  ];

  return (
    <section id="about" className="py-20 bg-black scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="text-blue-500">About</span> Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-in-left">
              <div className="sci-fi-border backdrop-blur-sm p-6 mb-8 hover-lift">
                <div className="font-mono text-sm mb-4">
                  <div className="text-gray-400">// Student Profile</div>
                  <div className="text-blue-400">{'const student = {'}</div>
                  <div className="ml-4 text-gray-300">
                    <div>name: <span className="text-blue-400">"Arnab Joyanta Saha"</span>,</div>
                    <div>degree: <span className="text-blue-400">"BSc in CSE"</span>,</div>
                    <div>semester: <span className="text-yellow-400">5</span>,</div>
                    <div>university: <span className="text-purple-400">"Daffodil International University"</span>,</div>
                    <div>passion: <span className="text-red-400">"Innovation"</span>,</div>
                    <div>status: <span className="text-blue-400">"Coding..."</span></div>
                  </div>
                  <div className="text-blue-400">{'};'}</div>
                </div>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                I'm a dedicated Computer Science Engineering student at Daffodil International University with a passion for creating 
                innovative solutions and exploring cutting-edge technologies. My expertise spans full-stack development, 
                AI implementation, and system design. I combine technical proficiency with creative problem-solving 
                to build scalable, user-centered applications.
              </p>

              <p className="text-gray-300 text-lg leading-relaxed">
                I actively contribute to open-source projects, participate in competitive programming, 
                and stay current with emerging technologies. My goal is to leverage technology 
                to solve real-world problems and create meaningful digital experiences.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 animate-slide-in-right">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="sci-fi-border backdrop-blur-sm p-6 hover:border-blue-400/50 transition-all duration-300 transform hover:scale-105 hover-lift"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <interest.icon className="h-8 w-8 text-blue-400 mb-3 transition-all duration-300 hover:scale-110" />
                  <h3 className="text-white font-semibold mb-2">{interest.title}</h3>
                  <p className="text-gray-400 text-sm font-mono">{interest.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;