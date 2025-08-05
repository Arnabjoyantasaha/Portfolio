import React from 'react';
import { ChevronDown, Github, Linkedin, Mail, Terminal } from 'lucide-react';

const Hero = () => {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const targetPosition = element.offsetTop - 80;
      const startPosition = window.pageYOffset;
      const distance = targetPosition - startPosition;
      const duration = 1200;
      let startTime: number | null = null;

      const animation = (currentTime: number) => {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = easeInOutCubic(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
      };

      const easeInOutCubic = (t: number, b: number, c: number, d: number) => {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t * t + b;
        t -= 2;
        return c / 2 * (t * t * t + 2) + b;
      };

      requestAnimationFrame(animation);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto scroll-animate">
          {/* Terminal-style greeting */}
          <div className="inline-block sci-fi-border backdrop-blur-sm p-4 mb-8 font-mono text-sm hover-lift">
            <div className="flex items-center space-x-2 mb-2">
              <Terminal className="h-4 w-4 text-green-400" />
              <span className="text-gray-400">arnab@dev-machine:~$</span>
              <span className="text-green-400">whoami</span>
            </div>
            <div className="text-green-400">CSE Student & Future Software Developer</div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-gray-400">arnab@dev-machine:~$</span>
              <span className="text-green-400">cat skills.txt</span>
            </div>
            <div className="text-yellow-400">JavaScript | Python | Java | C++ | React</div>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-slide-in-up">
            <span className="text-white">Hi, I'm </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-600">
              Arnab Joyanta Saha
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed font-mono animate-slide-in-left">
            <span className="text-blue-400">{'// '}</span>
            Computer Science Engineering student passionate about building innovative solutions 
            and exploring the frontiers of technology.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-slide-in-right">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 font-mono"
            >
              ./view_projects.sh
            </button>
            <button
              onClick={() => scrollToSection('game')}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg shadow-purple-500/25 font-mono"
            >
              ./play_game.sh
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 backdrop-blur-sm font-mono"
            >
              ./contact.sh
            </button>
          </div>

          <div className="flex justify-center space-x-6 animate-fade-in">
            <a href="https://github.com/Arnabjoyantasaha" className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
              <Github size={24} />
            </a>
            <a href="https://www.linkedin.com/in/arnab-joyanta-saha-3b2435301" className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
              <Linkedin size={24} />
            </a>
            <a href="mailto:arnabjoyantasaha@gmail.com" className="text-gray-400 hover:text-blue-400 transition-all duration-300 transform hover:scale-110">
              <Mail size={24} />
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-blue-400 transition-all duration-300 animate-bounce hover:scale-110"
        >
          <ChevronDown size={32} />
        </button>
      </div>
      
      {/* Data streams for sci-fi effect */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-px h-20 bg-gradient-to-b from-transparent via-blue-400 to-transparent data-stream"
            style={{
              left: `${20 + i * 20}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;