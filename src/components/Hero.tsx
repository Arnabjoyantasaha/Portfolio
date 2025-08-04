import React from 'react';
import { ChevronDown, Github, Linkedin, Mail, Terminal, Code2, Cpu, Database } from 'lucide-react';

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
    <section className="min-h-screen flex items-center justify-center relative pt-16 overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-5xl mx-auto scroll-animate">
          {/* Terminal-style greeting */}
          <div className="inline-block tech-border-animated p-6 mb-12 font-mono text-sm professional-hover animate-professional-fade-in">
            <div className="flex items-center space-x-2 mb-2">
              <Terminal className="h-5 w-5 text-indigo-400" />
              <span className="text-gray-400">arnab@tech-workspace:~$</span>
              <span className="text-indigo-400">whoami</span>
            </div>
            <div className="text-indigo-400">Computer Science Engineer & Full-Stack Developer</div>
            <div className="flex items-center space-x-2 mt-2">
              <span className="text-gray-400">arnab@tech-workspace:~$</span>
              <span className="text-indigo-400">cat expertise.json</span>
            </div>
            <div className="text-purple-400">{"{ \"languages\": [\"JavaScript\", \"TypeScript\", \"Python\", \"Java\"], \"frameworks\": [\"React\", \"Node.js\", \"Next.js\"] }"}</div>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold mb-8 animate-professional-slide-up">
            <span className="text-white">Hi, I'm </span>
            <span className="tech-gradient">
              Arnab Joyanta Saha
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed animate-professional-slide-left">
            <span className="text-indigo-400 font-mono">{'// '}</span>
            Passionate Computer Science Engineer crafting innovative digital solutions with modern technologies. 
            I transform complex problems into elegant, scalable applications that make a difference.
          </p>

          {/* Tech passion indicators */}
          <div className="flex justify-center space-x-8 mb-12 animate-professional-slide-right">
            <div className="flex flex-col items-center space-y-2 professional-hover">
              <Code2 className="h-8 w-8 text-indigo-400 animate-subtle-float" />
              <span className="text-sm text-gray-400 font-mono">Clean Code</span>
            </div>
            <div className="flex flex-col items-center space-y-2 professional-hover" style={{ animationDelay: '0.2s' }}>
              <Cpu className="h-8 w-8 text-purple-400 animate-subtle-float" />
              <span className="text-sm text-gray-400 font-mono">Performance</span>
            </div>
            <div className="flex flex-col items-center space-y-2 professional-hover" style={{ animationDelay: '0.4s' }}>
              <Database className="h-8 w-8 text-pink-400 animate-subtle-float" />
              <span className="text-sm text-gray-400 font-mono">Scalability</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16 animate-professional-fade-in">
            <button
              onClick={() => scrollToSection('projects')}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold py-4 px-8 rounded-lg button-tech-hover professional-shadow font-mono"
            >
              <span className="flex items-center space-x-2">
                <Code2 className="h-5 w-5" />
                <span>View My Work</span>
              </span>
            </button>
            <button
              onClick={() => scrollToSection('game')}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-4 px-8 rounded-lg button-tech-hover professional-shadow font-mono"
            >
              <span className="flex items-center space-x-2">
                <Cpu className="h-5 w-5" />
                <span>Play Game</span>
              </span>
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="border-2 border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white font-semibold py-4 px-8 rounded-lg button-tech-hover backdrop-blur-sm font-mono"
            >
              <span className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <span>Let's Connect</span>
              </span>
            </button>
          </div>

          <div className="flex justify-center space-x-8 animate-professional-fade-in">
            <a href="https://github.com/Arnabjoyantasaha" className="text-gray-400 hover:text-indigo-400 professional-hover">
              <Github size={28} />
            </a>
            <a href="https://www.linkedin.com/in/arnab-joyanta-saha-3b2435301" className="text-gray-400 hover:text-indigo-400 professional-hover">
              <Linkedin size={28} />
            </a>
            <a href="mailto:arnabjoyantasaha@gmail.com" className="text-gray-400 hover:text-indigo-400 professional-hover">
              <Mail size={28} />
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection('about')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-gray-400 hover:text-indigo-400 professional-hover animate-subtle-float"
        >
          <ChevronDown size={32} />
        </button>
      </div>
      
      {/* Subtle tech particles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/30 rounded-full animate-subtle-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;