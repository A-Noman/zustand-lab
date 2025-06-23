import './App.css';
import { BoardGame } from '../src/Features/Common/tic-tac-toe/Components/board.jsx';

function App() {
  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <h1>Zustand Lab</h1>
        <BoardGame />
      </div>
    </>
  );
}

export default App;
