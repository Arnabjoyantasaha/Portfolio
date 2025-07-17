import React from 'react';
import { ChevronDown, Github, Linkedin, Mail, Terminal } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Terminal-style greeting */}
          <div className="inline-block bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-4 mb-8 font-mono text-sm">
            <div className="flex items-center space-x-2 mb-2">
              <Terminal className="h-4 w-4 text-green-400" />
              <span className="text-slate-400">user@portfolio:~$</span>
              <span className="text-green-400">whoami</span>
            </div>
            <div className="text-cyan-400">CSE Student & Future Software Devoloper</div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">Hi, I'm </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 animate-pulse">
              Arnab Joyanta Saha
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 mb-8 max-w-2xl mx-auto leading-relaxed">
            Computer Science Engineering student passionate about building innovative solutions 
            and exploring the frontiers of technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              Get In Touch
            </button>
          </div>

          <div className="flex justify-center space-x-6">
            <a href="https://github.com/Arnabjoyantasaha" className="text-slate-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/arnab-joyanta-saha-3b2435301" className="text-slate-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="mailto:arnabjoyantasaha@gmail.com" className="text-slate-400 hover:text-white transition-colors duration-200 transform hover:scale-110">
              <Mail size={24} />
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-slate-400 hover:text-cyan-400 transition-colors duration-200 animate-bounce"
        >
          <ChevronDown size={32} />
        </button>
      </div>
    </section>
  );
};

export default Hero;