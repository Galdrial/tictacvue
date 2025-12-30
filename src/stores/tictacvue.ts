import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useTicTacToeStore = defineStore( 'tictactoe', () => {
  const playerX = ref('');
  const playerO = ref('');
  const score = ref( { X: 0, O: 0, draw: 0 } )
  const newGameSwitch = ref( false )
  const onGame = ref( false )
  const inizio = ref( 'XOXOXOXOX'.split( '' ) ) 
  const board = ref<(string | null)[]>([...inizio.value])
  const winner = ref<string | null>( null )
  const xIsNext = ref( true );
  const winningLines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Orizzontali
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticali
    [0, 4, 8], [2, 4, 6]             // Diagonali
  ];

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

  function resetGame() {
    board.value = Array( 9 ).fill( null );
    /* xIsNext.value = true; */
    winner.value = null;
  };

  function newGame() {
    // I nomi dei giocatori vengono gestiti tramite PromptInput
    playerX.value = '';
    playerO.value = '';
    newGameSwitch.value = true;
    onGame.value = false;
    board.value = Array( 9 ).fill( null );
    winner.value = null;
    xIsNext.value = true;
    score.value = { X: 0, O: 0, draw: 0 }
  }

  function handleSquareClick( index: number ) {
    if ( board.value[index] || winner.value ) return;
    board.value[index] = xIsNext.value ? 'X' : 'O';
    xIsNext.value = !xIsNext.value;
    winner.value = checkWinner( board.value );
    // Se la board è piena e non c'è vincitore, imposta winner su 'draw' e incrementa il punteggio draw
    if (!board.value.includes(null) && winner.value === null) {
      winner.value = 'draw';
      score.value.draw += 1;
    }
  };

  return { inizio, board, winner, resetGame, xIsNext, winningLines, checkWinner, handleSquareClick, onGame, newGame, newGameSwitch, playerX, playerO, score}
} )
