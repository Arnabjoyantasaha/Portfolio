import React, { useState, useEffect } from 'react';
import { Terminal, Code, Database, Globe, Cpu } from 'lucide-react';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const loadingSteps = [
    { icon: Terminal, text: 'Initializing terminal...', duration: 800 },
    { icon: Code, text: 'Loading components...', duration: 600 },
    { icon: Database, text: 'Connecting to database...', duration: 700 },
    { icon: Globe, text: 'Establishing network...', duration: 500 },
    { icon: Cpu, text: 'Optimizing performance...', duration: 600 }
  ];

  const codeLines = [
    'import React from "react";',
    'import Portfolio from "./Portfolio";',
    'const App = () => {',
    '  return <Portfolio />;',
    '};',
    'export default App;'
  ];

  useEffect(() => {
    let progressInterval: NodeJS.Timeout;
    let stepTimeout: NodeJS.Timeout;

    const startLoading = () => {
      progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            setTimeout(() => {
              setIsComplete(true);
              setTimeout(onLoadingComplete, 500);
            }, 500);
            return 100;
          }
          return prev + 2;
        });
      }, 60);

      // Step progression
      const progressSteps = () => {
        if (currentStep < loadingSteps.length - 1) {
          stepTimeout = setTimeout(() => {
            setCurrentStep(prev => prev + 1);
            progressSteps();
          }, loadingSteps[currentStep].duration);
        }
      };
      progressSteps();
    };

    startLoading();

    return () => {
      clearInterval(progressInterval);
      clearTimeout(stepTimeout);
    };
  }, [currentStep, onLoadingComplete]);

  return (
    <div className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-500 ${
      isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
    }`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-black to-gray-900" />
        
        {/* Subtle grid */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0, 255, 65, 0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0, 255, 65, 0.3) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px'
          }}
        />

        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logo */}
        <div className="mb-8 loading-fade-in">
          <div className="inline-flex items-center justify-center w-20 h-20 border-2 border-green-400/30 rounded-lg bg-black/50 backdrop-blur-sm loading-pulse">
            <Terminal className="w-10 h-10 text-green-400" />
          </div>
        </div>

        {/* Main Title */}
        <div className="mb-8 loading-fade-in" style={{ animationDelay: '0.2s' }}>
          <h1 className="text-2xl font-bold text-white mb-2 font-mono">
            <span className="text-green-400">{'<'}</span>
            Arnab Joyanta Saha
            <span className="text-green-400">{'/>'}</span>
          </h1>
          <p className="text-gray-400 text-sm font-mono">CSE Student & Developer</p>
        </div>

        {/* Code Block */}
        <div className="mb-8 loading-fade-in" style={{ animationDelay: '0.4s' }}>
          <div className="bg-gray-900/80 border border-green-400/20 rounded-lg p-4 text-left backdrop-blur-sm">
            <div className="flex items-center mb-3">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <span className="ml-3 text-gray-400 text-xs font-mono">portfolio.jsx</span>
            </div>
            <div className="space-y-1">
              {codeLines.map((line, index) => (
                <div
                  key={index}
                  className="text-sm font-mono text-gray-300 overflow-hidden whitespace-nowrap"
                  style={{
                    animation: `codeTyping 0.8s steps(${line.length}, end) forwards`,
                    animationDelay: `${0.6 + index * 0.3}s`,
                    width: '0'
                  }}
                >
                  <span className="text-purple-400">
                    {line.includes('import') || line.includes('export') ? line.split(' ')[0] + ' ' : ''}
                  </span>
                  <span className="text-blue-400">
                    {line.includes('React') ? 'React' : ''}
                    {line.includes('Portfolio') ? 'Portfolio' : ''}
                    {line.includes('App') && !line.includes('export') ? 'App' : ''}
                  </span>
                  <span className="text-gray-300">
                    {line.replace(/import|export|React|Portfolio|App/g, '').trim()}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Loading Status */}
        <div className="mb-6 loading-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex items-center justify-center space-x-3 mb-3">
            {React.createElement(loadingSteps[currentStep].icon, { className: "w-5 h-5 text-green-400 loading-pulse" })}
            <span className="text-gray-300 font-mono text-sm">
              {loadingSteps[currentStep].text}
            </span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-4 loading-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-emerald-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between mt-2">
            <span className="text-gray-400 text-xs font-mono">Loading...</span>
            <span className="text-green-400 text-xs font-mono">{progress}%</span>
          </div>
        </div>

        {/* Loading Steps Indicator */}
        <div className="flex justify-center space-x-2 loading-fade-in" style={{ animationDelay: '1s' }}>
          {loadingSteps.map((_, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index <= currentStep ? 'bg-green-400' : 'bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;