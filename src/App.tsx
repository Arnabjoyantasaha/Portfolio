import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Game from './components/Game';
import Contact from './components/Contact';
import BackgroundPattern from './components/BackgroundPattern';
import SmoothScroll from './components/SmoothScroll';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // Fallback to show content after 5 seconds if loading doesn't complete
  useEffect(() => {
    const fallbackTimer = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 5000);

    return () => clearTimeout(fallbackTimer);
  }, [isLoading]);

  return (
    <div className={`min-h-screen bg-black text-white relative overflow-x-hidden font-mono ${isLoading ? 'overflow-hidden' : ''}`}>
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      {!isLoading && (
        <>
          <BackgroundPattern />
          <SmoothScroll />
          <Header />
          <main className="relative z-10">
            <div className="transition-opacity duration-500 opacity-100">
              <Hero />
              <About />
              <Skills />
              <Projects />
              <Game />
              <Contact />
            </div>
          </main>
        </>
      )}
    </div>
  );
}

export default App;