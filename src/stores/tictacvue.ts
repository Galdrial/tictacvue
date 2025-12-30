import { defineStore } from 'pinia';
import { ref } from 'vue';

// Pinia store for Tic Tac Toe game state and logic
export const useTicTacToeStore = defineStore( 'tictactoe', () => {
  // Player names
  const playerX = ref('');
  const playerO = ref('');
  // Score tracking for X, O, and draws
  const score = ref( { X: 0, O: 0, draw: 0 } )
  // Controls for new game and game state
  const newGameSwitch = ref( false )
  const onGame = ref( false )
  // Initial board state (used for reset)
  const start = ref( 'XOXOXOXOX'.split( '' ) ) 
  // Current board state (array of 'X', 'O', or null)
  const board = ref<(string | null)[]>([...start.value])
  // Current winner ('X', 'O', 'draw', or null)
  const winner = ref<string | null>( null )
  // True if it's X's turn
  const xIsNext = ref( true );
  // Winning line combinations (rows, columns, diagonals)
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical
    [0, 4, 8], [2, 4, 6]             // Diagonal
  ];

  // Check if there is a winner on the board
  function checkWinner( squares: ( string | null )[] ) {
    for ( let i = 0; i < winningLines.length; i++ ) {
      const line = winningLines[i];
      if ( !line ) continue;
      const [a, b, c] = line;
      if (
        typeof a === 'number' && typeof b === 'number' && typeof c === 'number' &&
        squares[a] && squares[a] === squares[b] && squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  // Reset the board for a new round (keeps scores)
  function resetGame() {
    board.value = Array( 9 ).fill( null );
    /* xIsNext.value = true; */
    winner.value = null;
  };

  // Start a completely new game (resets scores and player names)
  function newGame() {
    // Player names are managed via input form
    playerX.value = '';
    playerO.value = '';
    newGameSwitch.value = true;
    onGame.value = false;
    board.value = Array( 9 ).fill( null );
    winner.value = null;
    xIsNext.value = true;
    score.value = { X: 0, O: 0, draw: 0 }
  }

  // Handle click on a square: update board, check winner, update score for draw
  function handleSquareClick( index: number ) {
    if ( board.value[index] || winner.value ) return;
    board.value[index] = xIsNext.value ? 'X' : 'O';
    xIsNext.value = !xIsNext.value;
    winner.value = checkWinner( board.value );
    // If board is full and no winner, set winner to 'draw' and increment draw score
    if (!board.value.includes(null) && winner.value === null) {
      winner.value = 'draw';
      score.value.draw += 1;
    }
  };

  // Expose state and functions to components
  return { start, board, winner, resetGame, xIsNext, winningLines, checkWinner, handleSquareClick, onGame, newGame, newGameSwitch, playerX, playerO, score}
} )
