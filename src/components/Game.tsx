import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, RotateCcw, Trophy, Cpu, User } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = Player[];

const Game = () => {
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | 'tie' | null>(null);
  const [score, setScore] = useState({ player: 0, ai: 0, ties: 0 });
  const [gameMode, setGameMode] = useState<'easy' | 'hard'>('easy');
  const computerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // 3D Computer mouse tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const rect = computerRef.current?.getBoundingClientRect();
      if (rect) {
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const x = (e.clientX - centerX) / 20;
        const y = (e.clientY - centerY) / 20;
        setMousePosition({ x: Math.max(-15, Math.min(15, x)), y: Math.max(-15, Math.min(15, y)) });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const checkWinner = (board: Board): Player | 'tie' | null => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }

    return board.every(cell => cell !== null) ? 'tie' : null;
  };

  const minimax = (board: Board, depth: number, isMaximizing: boolean): number => {
    const result = checkWinner(board);
    
    if (result === 'O') return 10 - depth;
    if (result === 'X') return depth - 10;
    if (result === 'tie') return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'O';
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = 'X';
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const getBestMove = (board: Board): number => {
    if (gameMode === 'easy' && Math.random() < 0.3) {
      // 30% chance of random move in easy mode
      const availableMoves = board.map((cell, index) => cell === null ? index : null).filter(val => val !== null) as number[];
      return availableMoves[Math.floor(Math.random() * availableMoves.length)];
    }

    let bestScore = -Infinity;
    let bestMove = 0;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = 'O';
        const score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }
    return bestMove;
  };

  const handleCellClick = (index: number) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      updateScore(gameResult);
      return;
    }

    // AI move
    setTimeout(() => {
      const aiMove = getBestMove(newBoard);
      newBoard[aiMove] = 'O';
      setBoard(newBoard);
      
      const finalResult = checkWinner(newBoard);
      if (finalResult) {
        setWinner(finalResult);
        updateScore(finalResult);
      } else {
        setIsPlayerTurn(true);
      }
    }, 500);
  };

  const updateScore = (result: Player | 'tie') => {
    setScore(prev => ({
      ...prev,
      player: result === 'X' ? prev.player + 1 : prev.player,
      ai: result === 'O' ? prev.ai + 1 : prev.ai,
      ties: result === 'tie' ? prev.ties + 1 : prev.ties
    }));
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  const resetScore = () => {
    setScore({ player: 0, ai: 0, ties: 0 });
    resetGame();
  };

  return (
    <section id="game" className="py-24 bg-gradient-to-b from-slate-900 to-slate-800 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-5xl md:text-6xl font-bold text-center mb-6">
            <span className="text-white">Challenge My</span> <span className="tech-gradient">AI</span>
          </h2>
          <p className="text-center text-gray-300 text-xl mb-16">
            Test your strategy against my intelligent Tic Tac Toe AI algorithm
          </p>

          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* 3D Computer Animation */}
            <div className="flex justify-center animate-professional-slide-left">
              <div 
                ref={computerRef}
                className="relative perspective-1000"
                style={{
                  transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <div className="w-80 h-60 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg professional-shadow border border-indigo-400/30 relative overflow-hidden">
                  {/* Screen */}
                  <div className="absolute inset-4 bg-black rounded border border-indigo-400/50 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-indigo-900/20 to-black relative">
                      {/* Terminal-like display */}
                      <div className="p-4 font-mono text-sm">
                        <div className="text-indigo-400 mb-2">$ ./ai_game_engine.exe</div>
                        <div className="text-gray-300 mb-1">Initializing AI opponent...</div>
                        <div className="text-purple-400 mb-1">Mode: {gameMode.toUpperCase()}</div>
                        <div className="text-cyan-400">AI Status: READY</div>
                        <div className="mt-4 text-indigo-400 animate-tech-pulse">{'>'} Your turn...</div>
                      </div>
                      
                      {/* Animated cursor */}
                      <div className="absolute bottom-4 right-4 w-2 h-4 bg-indigo-400 animate-tech-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Keyboard */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-72 h-4 bg-slate-700 rounded-b-lg border-t border-indigo-400/30">
                    <div className="flex justify-center space-x-1 pt-1">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-4 h-2 bg-slate-600 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stand */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-slate-700 rounded-b-lg"></div>
                </div>
              </div>
            </div>

            {/* Game Board */}
            <div className="animate-professional-slide-right">
              {/* Game Controls */}
              <div className="flex justify-between items-center mb-8">
                <div className="flex space-x-6">
                  <button
                    onClick={() => setGameMode('easy')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      gameMode === 'easy' 
                        ? 'bg-gradient-to-r from-green-500 to-green-600 text-white professional-shadow' 
                        : 'border-2 border-green-400 text-green-400 hover:bg-green-400 hover:text-white'
                    }`}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => setGameMode('hard')}
                    className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                      gameMode === 'hard' 
                        ? 'bg-gradient-to-r from-red-500 to-red-600 text-white professional-shadow' 
                        : 'border-2 border-red-400 text-red-400 hover:bg-red-400 hover:text-white'
                    }`}
                  >
                    Hard
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={resetGame}
                    className="p-3 border-2 border-gray-600 text-gray-400 hover:text-indigo-400 hover:border-indigo-400 rounded-lg professional-hover"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>

              {/* Score Board */}
              <div className="grid grid-cols-3 gap-6 mb-8">
                <div className="tech-border-animated p-6 text-center professional-hover">
                  <User className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400 font-semibold">Player</div>
                  <div className="text-3xl font-bold text-blue-400">{score.player}</div>
                </div>
                <div className="tech-border-animated p-6 text-center professional-hover">
                  <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400 font-semibold">Draws</div>
                  <div className="text-3xl font-bold text-yellow-400">{score.ties}</div>
                </div>
                <div className="tech-border-animated p-6 text-center professional-hover">
                  <Cpu className="h-8 w-8 text-red-400 mx-auto mb-2" />
                  <div className="text-sm text-gray-400 font-semibold">AI</div>
                  <div className="text-3xl font-bold text-red-400">{score.ai}</div>
                </div>
              </div>

              {/* Game Status */}
              <div className="text-center mb-8">
                {winner ? (
                  <div className="tech-border-animated p-8">
                    <div className="text-3xl font-bold mb-4">
                      {winner === 'X' && <span className="text-blue-400">You Win! 🎉</span>}
                      {winner === 'O' && <span className="text-red-400">AI Wins! 🤖</span>}
                      {winner === 'tie' && <span className="text-yellow-400">It's a Tie! 🤝</span>}
                    </div>
                    <button
                      onClick={resetGame}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg button-tech-hover professional-shadow"
                    >
                      Play Again
                    </button>
                  </div>
                ) : (
                  <div className="tech-border-animated p-6">
                    <div className="text-xl font-semibold">
                      {isPlayerTurn ? (
                        <span className="text-blue-400">Your Turn (X)</span>
                      ) : (
                        <span className="text-red-400 animate-tech-pulse">AI Processing... 🤔</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Tic Tac Toe Board */}
              <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-8">
                {board.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    className="w-24 h-24 tech-border-animated flex items-center justify-center text-4xl font-bold professional-hover hover:border-indigo-400/50"
                    disabled={!!cell || !!winner || !isPlayerTurn}
                  >
                    {cell === 'X' && <span className="text-blue-400">X</span>}
                    {cell === 'O' && <span className="text-red-400">O</span>}
                  </button>
                ))}
              </div>

              {/* Reset Score Button */}
              <div className="text-center">
                <button
                  onClick={resetScore}
                  className="border-2 border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-400 font-semibold py-3 px-8 rounded-lg professional-hover"
                >
                  Reset Score
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;