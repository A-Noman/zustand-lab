import { Square } from './square';
import { create } from 'zustand';

const useGameStore = create((set) => ({
  squares: Array(9).fill(null),
  xIsNext: true,
  winner: null,
  tie: false,
  setSquares: (newSquares) =>
    set({
      squares: newSquares,
    }),
  resetGameState: () =>
    set({
      squares: Array(9).fill(null),
      xIsNext: true,
      winner: null,
      tie: false,
    }),
  setXIsNext: (bool) =>
    set({
      xIsNext: bool,
    }),
  setWinner: (winningPlayer) => set({ winner: winningPlayer }),
  gotATie: () => set({ tie: true }),
}));

export const BoardGame = () => {
  const squares = useGameStore((state) => state.squares);
  const setSquares = useGameStore((state) => state.setSquares);
  const resetGameState = useGameStore((state) => state.resetGameState);
  const xIsNext = useGameStore((state) => state.xIsNext);
  const setXIsNext = useGameStore((state) => state.setXIsNext);
  const winner = useGameStore((state) => state.winner);
  const setWinner = useGameStore((state) => state.setWinner);
  const tie = useGameStore((state) => state.tie);
  const gotATie = useGameStore((state) => state.gotATie);
  const currentPlayer = xIsNext ? 'X' : 'O';

  function calculateWinner(squares) {
    let winner = null;
    const winningLines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [6, 4, 2],
    ];

    winningLines.forEach((line) => {
      const [a, b, c] = [line[0], line[1], line[2]];

      if (squares[a]) {
        if (squares[a] == squares[b] && squares[b] == squares[c]) {
          winner = squares[a];
        }
      }
    });

    return winner;
  }

  function squareClickHandler(index) {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = currentPlayer;
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    const theWinner = calculateWinner(newSquares);

    if (theWinner) {
      setWinner(theWinner);
      return;
    }

    if (!newSquares.some((element) => element === null) && !winner) {
      gotATie();
    }
  }

  return (
    <>
      <p>Next player is: {currentPlayer}</p>
      {winner && <p>Winner is: {winner}</p>}
      {tie && <p>Got a tie</p>}

      <div style={{ margin: '3px' }}>
        {(winner || tie) && (
          <button onClick={() => resetGameState()}>Reset</button>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          width: 'calc(3 * 2.5rem)',
          height: 'calc(3 * 2.5rem)',
          border: '1px solid #999',
        }}
      >
        {squares.map((square, squareIndex) => (
          <Square
            key={squareIndex}
            index={squareIndex}
            value={square}
            onSquareClick={() => squareClickHandler(squareIndex)}
          />
        ))}
      </div>
    </>
  );
};
