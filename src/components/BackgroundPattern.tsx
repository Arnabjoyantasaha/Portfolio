import React from 'react';

const BackgroundPattern = () => {
  return (
    <div className="fixed inset-0 z-0">
      {/* Animated grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(34, 211, 238, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34, 211, 238, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating geometric shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-pulse opacity-60" />
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-green-400 rounded-full animate-pulse opacity-40" />
        <div className="absolute bottom-1/4 left-1/3 w-3 h-3 bg-blue-400 rounded-full animate-pulse opacity-30" />
        <div className="absolute bottom-1/3 right-1/3 w-2 h-2 bg-purple-400 rounded-full animate-pulse opacity-50" />
      </div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-gray-900 opacity-98" />
      <div className="absolute inset-0 bg-gradient-to-tr from-cyan-900/5 via-transparent to-blue-900/5" />
    </div>
  );
};

export default BackgroundPattern;