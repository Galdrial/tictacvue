<template>
  <div class="mb-4 text-xl font-bold text-center">
    <template v-if="props.newGameSwitch">
      <form class="flex flex-col items-center gap-4" @submit.prevent="confirmNames">
        <div class="flex flex-row items-center justify-center gap-4 w-full">
          <span class="text-[#F7901A] text-right">Player X:</span>
          <input type="text" v-model="ticTacToeStore.playerX" placeholder="max4" maxlength="4" class="border border-[#F7901A] rounded px-2 py-1 w-25 text-white" @input="e => { const target = e.target as HTMLInputElement; if(target) ticTacToeStore.playerX = target.value.replace(/\s/g, '') }" />
        </div>
        <div class="flex flex-row items-center justify-center gap-4 w-full">
          <span class="text-[#00f0ff] text-right">Player O:</span>
          <input type="text" v-model="ticTacToeStore.playerO" placeholder="max4" maxlength="4" class="border border-[#00f0ff] rounded px-2 py-1 w-25 text-white" @input="e => { const target = e.target as HTMLInputElement; if(target) ticTacToeStore.playerO = target.value.replace(/\s/g, '') }" />
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
      <div class="text-white">
      Score:
      <br><br>
      <span class="text-player-x">{{ `${ticTacToeStore.playerX}:` }}</span>{{ ticTacToeStore.score.X }} <span class="text-player-o">{{ `${ticTacToeStore.playerO}:` }}</span>{{ ticTacToeStore.score.O }} DRAW:{{ ticTacToeStore.score.draw }}
      <br><br>
      <template v-if="status.type === 'winner'">
        <span :class="status.class">{{ status.name }}</span> ha vinto!
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
      <div>
        <template v-if="status.type === 'winner'">
          <span :class="status.class">{{ status.name }}</span> ha vinto!
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
import { computed, watch } from 'vue';
import { useTicTacToeStore } from '../stores/tictacvue';
import BaseButton from './BaseButton.vue';
const ticTacToeStore = useTicTacToeStore()

const props = defineProps<{
  winner: string | null;
  xIsNext: boolean;
  board: (string | null)[];
  onGame: boolean;
  newGameSwitch: boolean;
}>();

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
  if (!props.board.includes(null) && props.board.includes('X') && props.board.includes('O') && props.onGame === true) {
    return { type: 'draw', message: 'DRAW!' };
  }
  if (props.onGame === false) {
    return { type: 'welcome', message: 'Challenge your friends!<br>Play and claim victory!' };
  }
  if (props.xIsNext) {
    return { type: 'turn', name: ticTacToeStore.playerX, class: 'text-player-x' };
  } else {
    return { type: 'turn', name: ticTacToeStore.playerO, class: 'text-player-o' };
  }
});

// Aggiorna il punteggio solo quando cambia il winner
watch(() => props.winner, (newWinner, oldWinner) => {
  if (newWinner && newWinner !== oldWinner) {
    if (newWinner === 'X') ticTacToeStore.score.X += 1;
    if (newWinner === 'O') ticTacToeStore.score.O += 1;
  }
});


function confirmNames() {
  // Avvia la partita solo se entrambi i nomi sono compilati
  if (ticTacToeStore.playerX && ticTacToeStore.playerO) {
    ticTacToeStore.playerX = ticTacToeStore.playerX.toUpperCase();
    ticTacToeStore.playerO = ticTacToeStore.playerO.toUpperCase();
    ticTacToeStore.newGameSwitch = false;
    ticTacToeStore.onGame = true;
  }
}
</script>
<style scoped>
.text-player-x {
  color: #F7901A;
}
.text-player-o {
  color: #00f0ff;
}
</style>


