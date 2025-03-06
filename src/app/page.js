'use client'; // Add this line at the top for Next.js App Router

import { useState } from 'react';

export default function TicTacToe() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [player1, setPlayer1] = useState('');
  const [player2, setPlayer2] = useState('');
  const [gameStarted, setGameStarted] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6], // Diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (index) => {
    if (board[index] || calculateWinner(board)) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const winner = calculateWinner(board);
  const status = winner
    ? `Player ${winner === 'X' ? player1 : player2} won!`
    : board.every((square) => square)
    ? 'Draw!'
    : `Next player: ${isXNext ? player1 : player2}`;

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  const startGame = () => {
    if (player1 && player2) {
      setGameStarted(true);
    } else {
      alert('Please enter both players\' names!');
    }
  };

  return (
    <div style={{ 
      textAlign: 'center', 
      marginTop: '50px', 
      fontFamily: 'Arial, sans-serif', 
      backgroundColor: '#87CEEB', // Sky blue background
      minHeight: '100vh', 
      padding: '20px'
    }}>
      <h1 style={{ color: '#FFFFFF', fontSize: '48px', marginBottom: '20px' }}>Tic Tac Toe</h1>

      {!gameStarted ? (
        <div style={{ 
          backgroundColor: '#FFFFFF', 
          padding: '20px', 
          borderRadius: '10px', 
          display: 'inline-block', 
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
        }}>
          <h2 style={{ color: '#87CEEB', marginBottom: '20px' }}>Enter Player Names</h2>
          <div style={{ marginBottom: '10px' }}>
            <input
              type="text"
              placeholder="Player 1 (X)"
              value={player1}
              onChange={(e) => setPlayer1(e.target.value)}
              style={{ 
                padding: '10px', 
                fontSize: '16px', 
                color: '#404040',
                borderRadius: '5px', 
                border: '2px solid #87CEEB', 
                width: '200px'
              }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="text"
              placeholder="Player 2 (O)"
              value={player2}
              onChange={(e) => setPlayer2(e.target.value)}
              style={{ 
                padding: '10px', 
                fontSize: '16px', 
                color: '#404040',
                borderRadius: '5px', 
                border: '2px solid #87CEEB', 
                width: '200px'
              }}
            />
          </div>
          <button
            onClick={startGame}
            style={{ 
              padding: '10px 20px', 
              fontSize: '16px', 
              backgroundColor: '#87CEEB', 
              color: '#FFFFFF', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer',
              transition: 'background-color 0.3s ease',
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#6CA6CD'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#87CEEB'}
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(3, 100px)', 
            gap: '10px', 
            justifyContent: 'center', 
            backgroundColor: '#FFFFFF', // White background for the board
            padding: '20px', 
            borderRadius: '10px', 
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)'
          }}>
            {board.map((value, index) => (
              <button
                key={index}
                onClick={() => handleClick(index)}
                style={{ 
                  width: '100px', 
                  height: '100px', 
                  fontSize: '32px', 
                  fontWeight: 'bold', 
                  backgroundColor: '#87CEEB', // Sky blue buttons
                  color: '#FFFFFF', // White text
                  border: '2px solid #FFFFFF', 
                  borderRadius: '10px', 
                  cursor: 'pointer',
                  transition: 'background-color 0.3s ease',
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#6CA6CD'} // Darker sky blue on hover
                onMouseLeave={(e) => e.target.style.backgroundColor = '#87CEEB'} // Back to sky blue
              >
                {value}
              </button>
            ))}
          </div>
          <p style={{ 
            color: '#FFFFFF', 
            fontSize: '24px', 
            marginTop: '20px' 
          }}>
            {status}
          </p>
          <button 
            onClick={resetGame} 
            style={{ 
              marginTop: '20px', 
              padding: '10px 20px', 
              fontSize: '16px', 
              backgroundColor: '#FFFFFF', // White button
              color: '#87CEEB', // Sky blue text
              border: '2px solid #FFFFFF', 
              borderRadius: '5px', 
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#87CEEB'; // Sky blue background on hover
              e.target.style.color = '#FFFFFF'; // White text on hover
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#FFFFFF'; // Back to white
              e.target.style.color = '#87CEEB'; // Back to sky blue
            }}
          >
            Reset Game
          </button>
        </>
      )}
    </div>
  );
}