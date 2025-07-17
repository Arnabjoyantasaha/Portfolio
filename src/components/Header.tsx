import React, { useState, useEffect } from 'react';
import { Menu, X, Code, Terminal } from 'lucide-react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-black/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="relative">
              <Code className="h-8 w-8 text-cyan-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            </div>
            <span className="text-xl font-bold font-mono">
              <span className="text-cyan-400">{'<'}</span>
              <span className="text-white">Arnab</span>
              <span className="text-cyan-400">{'/>'}</span>
            </span>
          </div>

          <nav className="hidden md:flex space-x-8">
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="relative text-slate-300 hover:text-cyan-400 transition-colors duration-200 capitalize font-medium"
              >
                {item}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 transition-all duration-300 hover:w-full"></span>
              </button>
            ))}
          </nav>

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-cyan-400 transition-colors"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        } overflow-hidden`}>
          <nav className="pt-4 pb-2 space-y-2">
            {['about', 'skills', 'projects', 'contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="block w-full text-left px-4 py-2 text-slate-300 hover:text-cyan-400 hover:bg-slate-800/50 rounded-lg transition-all duration-200 capitalize"
              >
                {item}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;