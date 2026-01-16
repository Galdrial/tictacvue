<template>
  <!--
    StateMessage component:
    - Shows player name input form if starting a new game
    - Displays score, winner, draw, turn, or welcome message based on game state
    - Uses BaseButton for actions
    - Input fields restrict spaces and max length
  -->
  <div class="mb-4 text-xl font-bold text-center">
    <template v-if="props.newGameSwitch">
      <!-- Player name input form -->
      <form class="flex flex-col items-center gap-4" @submit.prevent="confirmNames">
        <div class="flex flex-row items-center justify-center gap-4 w-full">
          <span class="text-[#F7901A] text-right">Player X:</span>
          <input type="text" v-model="ticTacToeStore.playerX" placeholder="max4" maxlength="4" class="border border-[#F7901A] rounded px-2 py-1 w-25 text-white" aria-label="Player X name" @input="e => { const target = e.target as HTMLInputElement; if(target) ticTacToeStore.playerX = target.value.replace(/\s/g, '') }" />
        </div>
        <div class="flex flex-row items-center justify-center gap-4 w-full">
          <span class="text-[#00f0ff] text-right">Player O:</span>
          <input type="text" v-model="ticTacToeStore.playerO" placeholder="max4" maxlength="4" class="border border-[#00f0ff] rounded px-2 py-1 w-25 text-white" aria-label="Player O name" @input="e => { const target = e.target as HTMLInputElement; if(target) ticTacToeStore.playerO = target.value.replace(/\s/g, '') }" />
        </div>
        <BaseButton
          type="submit"
          :disabled="!ticTacToeStore.playerX || !ticTacToeStore.playerO"
        >
          Start
        </BaseButton>
      </form>
    </template>
    <template v-else-if="ticTacToeStore.onGame === true && ticTacToeStore.playerX && ticTacToeStore.playerO">
      <!-- Score and game status display -->
      <div class="text-white">
      Score:
      <br><br>
      <span class="text-player-x">{{ `${ticTacToeStore.playerX}:` }}</span>{{ ticTacToeStore.score.X }} <span class="text-player-o">{{ `${ticTacToeStore.playerO}:` }}</span>{{ ticTacToeStore.score.O }} DRAW:{{ ticTacToeStore.score.draw }}
      <br><br>
      <template v-if="status.type === 'winner'">
        <span :class="status.class">{{ status.name }}</span> WINS!
      </template>
      <template v-else-if="status.type === 'draw'">
        {{ status.message }}
      </template>
      <template v-else-if="status.type === 'turn'">
        Turn:<span :class="status.class">{{ status.name }}</span>
      </template>
      </div>
    </template>
    <template v-else>
      <!-- Welcome or status message when not in game -->
      <div>
        <template v-if="status.type === 'winner'">
          <span :class="status.class">{{ status.name }}</span> WINS!
        </template>
        <template v-else-if="status.type === 'draw'">
          {{ status.message }}
        </template>
        <template v-else-if="status.type === 'welcome'">
          <div class="leading-9 text-2xl sm:w-130 sm:text-3xl text-white" v-html="status.message">
          </div>
        </template>
        <template v-else-if="status.type === 'turn'">
          Turn: <span :class="status.class">{{ status.name }}</span>
        </template>
      </div>
    </template>
  </div>
</template>


<script setup lang="ts">
// Import Vue composition API and game store
import { computed, watch } from 'vue';
import { useTicTacToeStore } from '../stores/tictacvue';
import BaseButton from './BaseButton.vue';
const ticTacToeStore = useTicTacToeStore()

// Props:
// - winner: current winner ('X', 'O', 'draw', or null)
// - xIsNext: true if X's turn
// - board: current board state
// - onGame: true if game is active
// - newGameSwitch: true if starting a new game
const props = defineProps<{
  winner: string | null;
  xIsNext: boolean;
  board: (string | null)[];
  onGame: boolean;
  newGameSwitch: boolean;
}>();

// Computed status for UI display (winner, draw, turn, welcome)
const status = computed(() => {
  if (props.winner === 'X') {
    return { type: 'winner', name: ticTacToeStore.playerX, class: 'text-player-x' };
  }
  if (props.winner === 'O') {
    return { type: 'winner', name: ticTacToeStore.playerO, class: 'text-player-o' };
  }
  if (props.winner === 'draw') {
    return { type: 'draw', message: 'DRAW!' };
  }
  // Check for draw if board is full and game is active
  if (!props.board.includes(null) && props.board.includes('X') && props.board.includes('O') && props.onGame === true) {
    return { type: 'draw', message: 'DRAW!' };
  }
  // Show welcome message if game is not active
  if (props.onGame === false) {
    return { type: 'welcome', message: 'Challenge your friends!<br>Play and claim victory!' };
  }
  // Show whose turn it is
  if (props.xIsNext) {
    return { type: 'turn', name: ticTacToeStore.playerX, class: 'text-player-x' };
  } else {
    return { type: 'turn', name: ticTacToeStore.playerO, class: 'text-player-o' };
  }
});

// Watch for winner changes to update score
watch(() => props.winner, (newWinner, oldWinner) => {
  if (newWinner && newWinner !== oldWinner) {
    if (newWinner === 'X') ticTacToeStore.score.X += 1;
    if (newWinner === 'O') ticTacToeStore.score.O += 1;
  }
});

// Confirm player names, convert to uppercase, start game
function confirmNames() {
  if (ticTacToeStore.playerX && ticTacToeStore.playerO) {
    ticTacToeStore.playerX = ticTacToeStore.playerX.toUpperCase();
    ticTacToeStore.playerO = ticTacToeStore.playerO.toUpperCase();
    ticTacToeStore.newGameSwitch = false;
    ticTacToeStore.onGame = true;
  }
}
</script>
<style scoped>
/* Style for Player X name and score */
.text-player-x {
  color: #F7901A;
}
/* Style for Player O name and score */
.text-player-o {
  color: #00f0ff;
}
</style>


