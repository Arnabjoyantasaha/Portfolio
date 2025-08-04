import React from 'react';
import { Code2, Database, Globe, Cpu, Brain, Zap } from 'lucide-react';

const About = () => {
  const interests = [
    { icon: Code2, title: 'Full-Stack Development', description: 'Building scalable web applications with modern frameworks and best practices' },
    { icon: Brain, title: 'Problem Solving', description: 'Algorithmic thinking and creative solutions to complex technical challenges' },
    { icon: Database, title: 'Data Engineering', description: 'Database design, optimization, and data-driven application development' },
    { icon: Zap, title: 'Performance Optimization', description: 'Creating fast, efficient, and user-friendly digital experiences' }
  ];

  return (
    <section id="about" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-16">
            <span className="tech-gradient">About</span> <span className="text-white">Me</span>
          </h2>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-professional-slide-left">
              <div className="tech-border-animated p-8 mb-10 professional-hover">
                <div className="font-mono text-sm mb-4">
                  <div className="text-gray-400 syntax-comment">// Professional Profile</div>
                  <div className="syntax-keyword">const</div> <div className="syntax-variable">developer</div> <div className="syntax-operator">=</div> <div className="syntax-operator">{'{'}</div>
                  <div className="ml-4 text-gray-300">
                    <div><span className="syntax-variable">name</span><span className="syntax-operator">:</span> <span className="syntax-string">"Arnab Joyanta Saha"</span>,</div>
                    <div><span className="syntax-variable">role</span><span className="syntax-operator">:</span> <span className="syntax-string">"Full-Stack Developer"</span>,</div>
                    <div><span className="syntax-variable">education</span><span className="syntax-operator">:</span> <span className="syntax-string">"BSc in Computer Science"</span>,</div>
                    <div><span className="syntax-variable">university</span><span className="syntax-operator">:</span> <span className="syntax-string">"Daffodil International"</span>,</div>
                    <div><span className="syntax-variable">passion</span><span className="syntax-operator">:</span> <span className="syntax-string">"Building the Future"</span>,</div>
                    <div><span className="syntax-variable">status</span><span className="syntax-operator">:</span> <span className="syntax-string">"Ready for Opportunities"</span></div>
                  </div>
                  <div className="syntax-operator">{'};'}</div>
                </div>
              </div>

              <p className="text-gray-300 text-xl leading-relaxed mb-8">
                I'm a passionate Computer Science Engineer with a deep love for technology and innovation. 
                Currently pursuing my degree at Daffodil International University, I specialize in creating 
                robust, scalable applications that solve real-world problems. My approach combines technical 
                excellence with user-centered design principles.
              </p>

              <p className="text-gray-300 text-xl leading-relaxed">
                What drives me is the endless possibility of technology to transform ideas into reality. 
                I'm constantly learning new frameworks, contributing to open-source projects, and building 
                applications that make a difference. I'm actively seeking opportunities to contribute to 
                innovative teams and challenging projects.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 animate-professional-slide-right">
              {interests.map((interest, index) => (
                <div
                  key={index}
                  className="tech-border-animated p-8 tech-card-hover"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <interest.icon className="h-10 w-10 text-indigo-400 mb-4 animate-tech-pulse" />
                  <h3 className="text-white font-bold text-lg mb-3">{interest.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{interest.description}</p>
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