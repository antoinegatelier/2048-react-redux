import './App.css';
import { Board } from '../../features/board/Board';
import { useDispatch } from 'react-redux';
import { clearBoard, generateNewGame, moveToLeft, moveToRight, moveDown, moveUp } from '../../features/board/boardSlice';

function App() {

  const dispatch = useDispatch();

  const handleNewGame = () => {
    dispatch(clearBoard())
    dispatch(generateNewGame());
    document.querySelector('.gameover').classList.add('hidden');
  }

  const keyboardCommands = (event) => {
    switch (event.code) {
      case 'ArrowDown':
        dispatch(moveDown());
        break;
      case 'ArrowUp':
        dispatch(moveUp());
        break;
      case 'ArrowLeft':
        dispatch(moveToLeft());
        break;
      case 'ArrowRight':
        dispatch(moveToRight());
        break;
      default:
        return;
    }
  }

  document.addEventListener('keyup', event => keyboardCommands(event));
  //document.addEventListener()

  return (
    <div className="App">
      <button onClick={handleNewGame} >Start new game</button>
      <Board />
      <p className='gameover hidden'>Game Over !</p>
    </div>
  );
}

export default App;
