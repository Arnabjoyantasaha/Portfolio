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
    <section id="game" className="py-20 scroll-animate">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
            <span className="text-green-400">Play Game</span> With Me
          </h2>
          <p className="text-center text-gray-400 mb-12 font-mono">
            Challenge my AI in a classic game of Tic Tac Toe
          </p>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 3D Computer Animation */}
            <div className="flex justify-center animate-slide-in-left">
              <div 
                ref={computerRef}
                className="relative perspective-1000"
                style={{
                  transform: `rotateX(${mousePosition.y}deg) rotateY(${mousePosition.x}deg)`,
                  transition: 'transform 0.1s ease-out'
                }}
              >
                <div className="w-80 h-60 bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg shadow-2xl border border-green-400/30 relative overflow-hidden">
                  {/* Screen */}
                  <div className="absolute inset-4 bg-black rounded border border-green-400/50 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-green-900/20 to-black relative">
                      {/* Terminal-like display */}
                      <div className="p-4 font-mono text-xs">
                        <div className="text-green-400 mb-2">$ ./tic_tac_toe.exe</div>
                        <div className="text-gray-300 mb-1">Initializing AI opponent...</div>
                        <div className="text-yellow-400 mb-1">Difficulty: {gameMode.toUpperCase()}</div>
                        <div className="text-blue-400">Ready to play!</div>
                        <div className="mt-4 text-green-400 animate-pulse">{'>'} Waiting for your move...</div>
                      </div>
                      
                      {/* Animated cursor */}
                      <div className="absolute bottom-4 right-4 w-2 h-4 bg-green-400 animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Keyboard */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-72 h-4 bg-gray-700 rounded-b-lg border-t border-green-400/30">
                    <div className="flex justify-center space-x-1 pt-1">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-4 h-2 bg-gray-600 rounded-sm"></div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Stand */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-20 h-8 bg-gray-700 rounded-b-lg"></div>
                </div>
              </div>
            </div>

            {/* Game Board */}
            <div className="animate-slide-in-right">
              {/* Game Controls */}
              <div className="flex justify-between items-center mb-6">
                <div className="flex space-x-4">
                  <button
                    onClick={() => setGameMode('easy')}
                    className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                      gameMode === 'easy' 
                        ? 'bg-green-500 text-black' 
                        : 'border border-green-400 text-green-400 hover:bg-green-400 hover:text-black'
                    }`}
                  >
                    Easy
                  </button>
                  <button
                    onClick={() => setGameMode('hard')}
                    className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                      gameMode === 'hard' 
                        ? 'bg-red-500 text-black' 
                        : 'border border-red-400 text-red-400 hover:bg-red-400 hover:text-black'
                    }`}
                  >
                    Hard
                  </button>
                </div>
                
                <div className="flex space-x-2">
                  <button
                    onClick={resetGame}
                    className="p-2 border border-gray-600 text-gray-400 hover:text-green-400 hover:border-green-400 rounded-lg transition-all duration-300"
                  >
                    <RotateCcw size={18} />
                  </button>
                </div>
              </div>

              {/* Score Board */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="sci-fi-border backdrop-blur-sm p-3 text-center">
                  <User className="h-5 w-5 text-blue-400 mx-auto mb-1" />
                  <div className="text-sm text-gray-400 font-mono">You</div>
                  <div className="text-xl font-bold text-blue-400">{score.player}</div>
                </div>
                <div className="sci-fi-border backdrop-blur-sm p-3 text-center">
                  <Trophy className="h-5 w-5 text-yellow-400 mx-auto mb-1" />
                  <div className="text-sm text-gray-400 font-mono">Ties</div>
                  <div className="text-xl font-bold text-yellow-400">{score.ties}</div>
                </div>
                <div className="sci-fi-border backdrop-blur-sm p-3 text-center">
                  <Cpu className="h-5 w-5 text-red-400 mx-auto mb-1" />
                  <div className="text-sm text-gray-400 font-mono">AI</div>
                  <div className="text-xl font-bold text-red-400">{score.ai}</div>
                </div>
              </div>

              {/* Game Status */}
              <div className="text-center mb-6">
                {winner ? (
                  <div className="sci-fi-border backdrop-blur-sm p-4">
                    <div className="text-2xl font-bold mb-2">
                      {winner === 'X' && <span className="text-blue-400">You Win! 🎉</span>}
                      {winner === 'O' && <span className="text-red-400">AI Wins! 🤖</span>}
                      {winner === 'tie' && <span className="text-yellow-400">It's a Tie! 🤝</span>}
                    </div>
                    <button
                      onClick={resetGame}
                      className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-black font-semibold py-2 px-6 rounded-lg transition-all duration-300 font-mono"
                    >
                      Play Again
                    </button>
                  </div>
                ) : (
                  <div className="sci-fi-border backdrop-blur-sm p-4">
                    <div className="text-lg font-mono">
                      {isPlayerTurn ? (
                        <span className="text-blue-400">Your Turn (X)</span>
                      ) : (
                        <span className="text-red-400">AI Thinking... 🤔</span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Tic Tac Toe Board */}
              <div className="grid grid-cols-3 gap-2 max-w-xs mx-auto mb-6">
                {board.map((cell, index) => (
                  <button
                    key={index}
                    onClick={() => handleCellClick(index)}
                    className="w-20 h-20 sci-fi-border backdrop-blur-sm flex items-center justify-center text-3xl font-bold transition-all duration-300 hover:border-green-400/50 hover:scale-105"
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
                  className="border border-gray-600 text-gray-400 hover:text-red-400 hover:border-red-400 font-semibold py-2 px-6 rounded-lg transition-all duration-300 font-mono"
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