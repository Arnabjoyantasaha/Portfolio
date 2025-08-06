import React, { useState, useEffect, useRef } from 'react';
import { Gamepad2, RotateCcw, Trophy, Cpu, User, Crown, Shield } from 'lucide-react';

type Player = 'X' | 'O' | null;
type Board = Player[];

type ChessPiece = {
  type: 'king' | 'queen' | 'rook' | 'bishop' | 'knight' | 'pawn';
  color: 'white' | 'black';
} | null;

type ChessBoard = ChessPiece[][];

const Game = () => {
  const [currentGame, setCurrentGame] = useState<'tic-tac-toe' | 'chess'>('tic-tac-toe');
  
  // Tic Tac Toe State
  const [board, setBoard] = useState<Board>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | 'tie' | null>(null);
  const [score, setScore] = useState({ player: 0, ai: 0, ties: 0 });
  const [gameMode, setGameMode] = useState<'easy' | 'hard'>('easy');
  
  // Chess State
  const [chessBoard, setChessBoard] = useState<ChessBoard>([]);
  const [selectedSquare, setSelectedSquare] = useState<[number, number] | null>(null);
  const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white');
  const [chessWinner, setChessWinner] = useState<'white' | 'black' | 'draw' | null>(null);
  const [isChessInitialized, setIsChessInitialized] = useState(false);
  
  const computerRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Initialize Chess Board
  useEffect(() => {
    if (currentGame === 'chess') {
      initializeChessBoard();
    }
  }, [currentGame]);

  const initializeChessBoard = () => {
    const initialBoard: ChessBoard = Array(8).fill(null).map(() => Array(8).fill(null));
    
    // Place pawns
    for (let i = 0; i < 8; i++) {
      initialBoard[1][i] = { type: 'pawn', color: 'black' };
      initialBoard[6][i] = { type: 'pawn', color: 'white' };
    }
    
    // Place other pieces
    const pieceOrder: ('rook' | 'knight' | 'bishop' | 'queen' | 'king' | 'bishop' | 'knight' | 'rook')[] = 
      ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'];
    
    for (let i = 0; i < 8; i++) {
      initialBoard[0][i] = { type: pieceOrder[i], color: 'black' };
      initialBoard[7][i] = { type: pieceOrder[i], color: 'white' };
    }
    
    setChessBoard(initialBoard);
    setCurrentPlayer('white');
    setChessWinner(null);
    setSelectedSquare(null);
    setIsChessInitialized(true);
  };

  const getPieceSymbol = (piece: ChessPiece): string => {
    if (!piece) return '';
    
    const symbols = {
      white: {
        king: '♔', queen: '♕', rook: '♖', bishop: '♗', knight: '♘', pawn: '♙'
      },
      black: {
        king: '♚', queen: '♛', rook: '♜', bishop: '♝', knight: '♞', pawn: '♟'
      }
    };
    
    return symbols[piece.color][piece.type];
  };

  const isValidMove = (fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
    const piece = chessBoard[fromRow][fromCol];
    if (!piece || piece.color !== currentPlayer) return false;
    
    const targetPiece = chessBoard[toRow][toCol];
    if (targetPiece && targetPiece.color === piece.color) return false;
    
    const rowDiff = Math.abs(toRow - fromRow);
    const colDiff = Math.abs(toCol - fromCol);
    
    switch (piece.type) {
      case 'pawn':
        const direction = piece.color === 'white' ? -1 : 1;
        const startRow = piece.color === 'white' ? 6 : 1;
        
        if (fromCol === toCol && !targetPiece) {
          if (toRow === fromRow + direction) return true;
          if (fromRow === startRow && toRow === fromRow + 2 * direction) return true;
        }
        if (colDiff === 1 && toRow === fromRow + direction && targetPiece) return true;
        return false;
        
      case 'rook':
        return (rowDiff === 0 || colDiff === 0) && isPathClear(fromRow, fromCol, toRow, toCol);
        
      case 'bishop':
        return rowDiff === colDiff && isPathClear(fromRow, fromCol, toRow, toCol);
        
      case 'queen':
        return (rowDiff === 0 || colDiff === 0 || rowDiff === colDiff) && isPathClear(fromRow, fromCol, toRow, toCol);
        
      case 'knight':
        return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
        
      case 'king':
        return rowDiff <= 1 && colDiff <= 1;
        
      default:
        return false;
    }
  };

  const isPathClear = (fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
    const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
    const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
    
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;
    
    while (currentRow !== toRow || currentCol !== toCol) {
      if (chessBoard[currentRow][currentCol]) return false;
      currentRow += rowStep;
      currentCol += colStep;
    }
    
    return true;
  };

  const handleChessSquareClick = (row: number, col: number) => {
    if (chessWinner) return;
    
    if (selectedSquare) {
      const [fromRow, fromCol] = selectedSquare;
      
      if (fromRow === row && fromCol === col) {
        setSelectedSquare(null);
        return;
      }
      
      if (isValidMove(fromRow, fromCol, row, col)) {
        const newBoard = chessBoard.map(row => [...row]);
        const piece = newBoard[fromRow][fromCol];
        newBoard[row][col] = piece;
        newBoard[fromRow][fromCol] = null;
        
        setChessBoard(newBoard);
        setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
        setSelectedSquare(null);
        
        // Simple win condition check (capture king)
        if (newBoard[row][col]?.type === 'king') {
          setChessWinner(currentPlayer);
        }
      } else {
        setSelectedSquare([row, col]);
      }
    } else {
      const piece = chessBoard[row][col];
      if (piece && piece.color === currentPlayer) {
        setSelectedSquare([row, col]);
      }
    }
  };

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

  // Tic Tac Toe Logic
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
    if (currentGame === 'tic-tac-toe') {
      setBoard(Array(9).fill(null));
      setWinner(null);
      setIsPlayerTurn(true);
    } else {
      initializeChessBoard();
    }
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
            <span className="text-blue-500">Play Games</span> With Me
          </h2>
          <p className="text-center text-gray-400 mb-12 font-mono">
            Challenge my AI in classic strategy games
          </p>

          {/* Game Selection */}
          <div className="flex justify-center mb-8">
            <div className="sci-fi-border backdrop-blur-sm p-2 flex space-x-2">
              <button
                onClick={() => setCurrentGame('tic-tac-toe')}
                className={`px-6 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                  currentGame === 'tic-tac-toe' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-blue-400 hover:bg-blue-500/20'
                }`}
              >
                Tic Tac Toe
              </button>
              <button
                onClick={() => setCurrentGame('chess')}
                className={`px-6 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                  currentGame === 'chess' 
                    ? 'bg-blue-500 text-white' 
                    : 'text-blue-400 hover:bg-blue-500/20'
                }`}
              >
                Chess
              </button>
            </div>
          </div>

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
                <div className="w-80 h-60 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg shadow-2xl border border-blue-400/30 relative overflow-hidden">
                  {/* Screen */}
                  <div className="absolute inset-4 bg-slate-900 rounded border border-blue-400/50 overflow-hidden">
                    <div className="w-full h-full bg-gradient-to-br from-slate-800/20 to-slate-900 relative">
                      {/* Terminal-like display */}
                      <div className="p-4 font-mono text-xs">
                        <div className="text-blue-400 mb-2">$ ./game_engine.exe</div>
                        <div className="text-gray-300 mb-1">Initializing AI opponent...</div>
                        <div className="text-yellow-400 mb-1">Game: {currentGame.toUpperCase()}</div>
                        {currentGame === 'tic-tac-toe' && (
                          <div className="text-purple-400 mb-1">Difficulty: {gameMode.toUpperCase()}</div>
                        )}
                        <div className="text-emerald-400">Ready to play!</div>
                        <div className="mt-4 text-blue-400 animate-pulse">{'>'} Waiting for your move...</div>
                      </div>
                      
                      {/* Animated cursor */}
                      <div className="absolute bottom-4 right-4 w-2 h-4 bg-blue-400 animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Keyboard */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-72 h-4 bg-slate-700 rounded-b-lg border-t border-blue-400/30">
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

            {/* Game Area */}
            <div className="animate-slide-in-right">
              {currentGame === 'tic-tac-toe' ? (
                <>
                  {/* Tic Tac Toe Controls */}
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => setGameMode('easy')}
                        className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                          gameMode === 'easy' 
                            ? 'bg-blue-500 text-white' 
                            : 'border border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white'
                        }`}
                      >
                        Easy
                      </button>
                      <button
                        onClick={() => setGameMode('hard')}
                        className={`px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300 ${
                          gameMode === 'hard' 
                            ? 'bg-red-500 text-white' 
                            : 'border border-red-400 text-red-400 hover:bg-red-400 hover:text-white'
                        }`}
                      >
                        Hard
                      </button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <button
                        onClick={resetGame}
                        className="p-2 border border-slate-600 text-slate-400 hover:text-blue-400 hover:border-blue-400 rounded-lg transition-all duration-300"
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
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 font-mono"
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
                        className="w-20 h-20 sci-fi-border backdrop-blur-sm flex items-center justify-center text-3xl font-bold transition-all duration-300 hover:border-blue-400/50 hover:scale-105"
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
                      className="border border-slate-600 text-slate-400 hover:text-red-400 hover:border-red-400 font-semibold py-2 px-6 rounded-lg transition-all duration-300 font-mono"
                    >
                      Reset Score
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {/* Chess Game */}
                  {isChessInitialized && (
                    <>
                      <div className="text-center mb-6">
                        <div className="sci-fi-border backdrop-blur-sm p-4">
                          <div className="flex items-center justify-center space-x-4 mb-2">
                            <Crown className="h-6 w-6 text-yellow-400" />
                            <span className="text-lg font-mono">
                              Current Player: <span className={currentPlayer === 'white' ? 'text-gray-200' : 'text-gray-600'}>{currentPlayer}</span>
                            </span>
                            <Shield className="h-6 w-6 text-blue-400" />
                          </div>
                          {chessWinner && (
                            <div className="text-xl font-bold text-yellow-400">
                              {chessWinner} Wins! 👑
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Chess Board */}
                      <div className="max-w-md mx-auto mb-6">
                        <div className="grid grid-cols-8 gap-0 border-2 border-slate-600 rounded-lg overflow-hidden">
                          {chessBoard.map((row, rowIndex) =>
                            row.map((piece, colIndex) => (
                              <button
                                key={`${rowIndex}-${colIndex}`}
                                onClick={() => handleChessSquareClick(rowIndex, colIndex)}
                                className={`w-12 h-12 flex items-center justify-center text-2xl font-bold transition-all duration-200 ${
                                  (rowIndex + colIndex) % 2 === 0 
                                    ? 'bg-slate-200 hover:bg-slate-300' 
                                    : 'bg-slate-600 hover:bg-slate-500'
                                } ${
                                  selectedSquare && selectedSquare[0] === rowIndex && selectedSquare[1] === colIndex
                                    ? 'ring-2 ring-blue-400'
                                    : ''
                                }`}
                                disabled={!!chessWinner}
                              >
                                {getPieceSymbol(piece)}
                              </button>
                            ))
                          )}
                        </div>
                      </div>

                      {/* Chess Controls */}
                      <div className="text-center">
                        <button
                          onClick={resetGame}
                          className="bg-gradient-to-r from-blue-500 to-indigo-500 hover:from-blue-600 hover:to-indigo-600 text-white font-semibold py-2 px-6 rounded-lg transition-all duration-300 font-mono"
                        >
                          New Game
                        </button>
                      </div>
                    </>
                  )}
                  
                  {!isChessInitialized && currentGame === 'chess' && (
                    <div className="sci-fi-border backdrop-blur-sm p-4">
                      <div className="text-center">
                        <div className="text-lg font-mono text-blue-400 mb-2">Initializing Chess Game...</div>
                        <div className="animate-pulse">Setting up the board...</div>
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Game;