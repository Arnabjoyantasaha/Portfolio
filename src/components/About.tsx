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
    <section id="about" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            <span className="text-cyan-400">About</span> Me
          </h2>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 mb-8">
                <div className="font-mono text-sm mb-4">
                  <div className="text-slate-400">// Student Profile</div>
                  <div className="text-cyan-400">{'const student = {'}</div>
                  <div className="ml-4 text-slate-300">
                    <div>name: <span className="text-green-400">"Arnab Joyanta Saha"</span>,</div>
                    <div>degree: <span className="text-green-400">"BSc in CSE"</span>,</div>
                    <div>semester: <span className="text-yellow-400">5</span>,</div>
                    <div>university: <span className="text-green-400">"Daffodil International University"</span>,</div>
                    <div>passion: <span className="text-green-400">"Innovation"</span></div>
                  </div>
                  <div className="text-cyan-400">{'};'}</div>
                </div>
              </div>

              <p className="text-slate-300 text-lg leading-relaxed mb-6">
                I'm a 5th semester BSc in Computer Science Engineering student at Daffodil International University with a passion for creating 
                innovative solutions and exploring cutting-edge technologies. My journey in tech 
                began with curiosity about how things work and evolved into a deep appreciation 
                for elegant code and user-centered design.
              </p>

              <p className="text-slate-300 text-lg leading-relaxed">
                When I'm not coding, you can find me contributing to open-source projects, 
                participating in hackathons, or exploring the latest trends in AI and web development.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="bg-gray-900/80 backdrop-blur-sm border border-gray-800 rounded-lg p-6 hover:border-cyan-400/50 transition-all duration-300 transform hover:scale-105"
                >
                  <interest.icon className="h-8 w-8 text-cyan-400 mb-3" />
                  <h3 className="text-white font-semibold mb-2">{interest.title}</h3>
                  <p className="text-slate-400 text-sm">{interest.description}</p>
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