<script setup lang="ts">
import BoardMain from './components/BoardMain.vue'
import NewGameButton from './components/NewGameButton.vue'
import NextButton from './components/NextButton.vue'
import StateMessage from './components/StateMessage.vue'
import { useTicTacToeStore } from './stores/tictacvue'
const btnStore = useTicTacToeStore()
</script>

<template>
  <header>
    <a href="/">
      <h1
        class="flex justify-center font-['Press_Start_2P'] text-[2rem] sm:text-[60px] font-bold text-[#F7901A] text-shadow-[0_0_8px_#F7901A,0_0_16px_#F7901A] "
      >
        TIC TAC VUE
      </h1>
    </a>
  </header>

  <main>
    <div class="flex justify-center h-38">
      <StateMessage
        :winner="btnStore.winner"
        :xIsNext="btnStore.xIsNext"
        :board="btnStore.board"
        :onGame="btnStore.onGame"
        :newGameSwitch="btnStore.newGameSwitch"
      />
    </div>
    <div class="flex flex-col items-center font-sans text-gray-800 py-8">
      <BoardMain
        :board="btnStore.board"
        :winner="btnStore.winner"
        :newGameSwitch="btnStore.newGameSwitch"
        @square-click="btnStore.handleSquareClick"
      />
    </div>
    <div class="flex justify-center gap-4 mt-4">
      <NewGameButton @newGame="btnStore.newGame" />
      <NextButton
        v-if="btnStore.onGame && !btnStore.newGameSwitch"
        :disabled="btnStore.onGame && !btnStore.winner && btnStore.winner !== 'draw'"
        @reset="btnStore.resetGame"
      />
    </div>
  </main>
</template>

<style scoped></style>
