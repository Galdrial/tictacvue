<template>
  <div class="mb-4 text-xl font-bold text-center ">
    <template v-if="props.newGameSwitch">
      <form class="flex flex-col items-center gap-4" @submit.prevent="confirmNames">
        <div class="flex flex-row items-center justify-center gap-4 w-full">
          <span class="text-[#F7901A] text-right">Player X:</span>
          <input type="text" v-model="btnStore.playerX" placeholder="Name" class="border border-[#F7901A] rounded px-2 py-1 w-48 text-white" />
        </div>
        <div class="flex flex-row items-center justify-center gap-4 w-full">
          <span class="text-[#00f0ff] text-right">Player O:</span>
          <input type="text" v-model="btnStore.playerO" placeholder="Name" class="border border-[#00f0ff] rounded px-2 py-1 w-48 text-white" />
        </div>
        <button
          class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition w-55"
          type="submit"
          :disabled="!btnStore.playerX || !btnStore.playerO"
        >
          Start
        </button>
      </form>
    </template>
    <template v-else-if="btnStore.onGame === true && btnStore.playerX && btnStore.playerO">
      <div class="text-white">
      Score:
      <br><br>
      <span class="text-player-x">{{ `${btnStore.playerX}:` }}</span>{{ btnStore.score.X }}  <span class="text-player-o">{{ `${btnStore.playerO}:` }}</span>{{ btnStore.score.O }}  DRAW:{{ btnStore.score.draw }}
      <br><br>
      <template v-if="status.type === 'winner'">
        <span :class="status.class">{{ status.name }}</span> ha vinto!
      </template>
      <template v-else-if="status.type === 'draw'">
        {{ status.message }}
      </template>
      <template v-else-if="status.type === 'turn'">
        Tocca a:<span :class="status.class">{{ status.name }}</span>
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
          <div class="w-130 text-3xl text-white" v-html="status.message">
          </div>
        </template>
        <template v-else-if="status.type === 'turn'">
          Tocca a: <span :class="status.class">{{ status.name }}</span>
        </template>
      </div>
    </template>
  </div>
</template>


<script setup lang="ts">
import { computed, watch } from 'vue';
import { useBtnStore } from '../stores/counter';
const btnStore = useBtnStore()

const props = defineProps<{
  winner: string | null;
  xIsNext: boolean;
  board: (string | null)[];
  onGame: boolean;
  newGameSwitch: boolean;
}>();

const status = computed(() => {
  if (props.winner === 'X') {
    return { type: 'winner', name: btnStore.playerX, class: 'text-player-x' };
  }
  if (props.winner === 'O') {
    return { type: 'winner', name: btnStore.playerO, class: 'text-player-o' };
  }
  if (!props.board.includes(null) && props.board.includes('X') && props.board.includes('O') && props.onGame === true) {
    return { type: 'draw', message: 'DRAW!' };
  }
    if (props.onGame === false) {
      return { type: 'welcome', message: 'Challenge your friends!<br>Play and claim victory!' };
  }
  if (props.xIsNext) {
    return { type: 'turn', name: btnStore.playerX, class: 'text-player-x' };
  } else {
    return { type: 'turn', name: btnStore.playerO, class: 'text-player-o' };
  }
});

// Aggiorna il punteggio solo quando cambia il winner
watch(() => props.winner, (newWinner, oldWinner) => {
  if (newWinner && newWinner !== oldWinner) {
    if (newWinner === 'X') btnStore.score.X += 1;
    if (newWinner === 'O') btnStore.score.O += 1;
  }
});


function confirmNames() {
  // Avvia la partita solo se entrambi i nomi sono compilati
  if (btnStore.playerX && btnStore.playerO) {
    btnStore.playerX = btnStore.playerX.toUpperCase();
    btnStore.playerO = btnStore.playerO.toUpperCase();
    btnStore.newGameSwitch = false;
    btnStore.onGame = true;
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


