import React from 'react';

const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Matrix-style grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 255, 65, 0.2) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 255, 65, 0.2) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-mono text-xs opacity-20 animate-matrix"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          >
            {Math.random() > 0.5 ? '1' : '0'}
          </div>
        ))}
      </div>

      {/* Terminal-style gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black opacity-95" />
      <div className="absolute inset-0 bg-gradient-to-tr from-green-900/5 via-transparent to-green-900/10" />
      
      {/* Scanlines effect */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0, 255, 65, 0.1) 2px, rgba(0, 255, 65, 0.1) 4px)',
      }} />
    </div>
  );
};

export default BackgroundPattern;