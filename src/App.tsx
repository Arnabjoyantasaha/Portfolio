import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import BackgroundPattern from './components/BackgroundPattern';
import SmoothScroll from './components/SmoothScroll';
import LoadingScreen from './components/LoadingScreen';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-x-hidden font-mono">
      {isLoading && <LoadingScreen onLoadingComplete={handleLoadingComplete} />}
      <BackgroundPattern />
      <SmoothScroll />
      {!isLoading && <Header />}
      <main className="relative z-10">
        {!isLoading && (
          <>
            <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
          </>
        )}
      </main>
    </div>
  );
}

export default App;