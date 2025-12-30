<script setup lang="ts">
import AppFooter from './components/AppFooter.vue'
import BoardMain from './components/BoardMain.vue'
import NewGameButton from './components/NewGameButton.vue'
import NextButton from './components/NextButton.vue'
import StateMessage from './components/StateMessage.vue'
import { useTicTacToeStore } from './stores/tictacvue'
const ticTacToeStore = useTicTacToeStore()
</script>

<template>
  <div class="flex flex-col min-h-screen">
    <header>
      <a href="/">
        <h1
          class="flex justify-center font-['Press_Start_2P'] text-[2rem] sm:text-[60px] font-bold text-[#F7901A] text-shadow-[0_0_8px_#F7901A,0_0_16px_#F7901A] pt-8 pb-8"
        >
          TIC TAC VUE
        </h1>
      </a>
    </header>
    <main class="flex-1">
      <div class="flex justify-center h-38">
        <StateMessage
          :winner="ticTacToeStore.winner"
          :xIsNext="ticTacToeStore.xIsNext"
          :board="ticTacToeStore.board"
          :onGame="ticTacToeStore.onGame"
          :newGameSwitch="ticTacToeStore.newGameSwitch"
        />
      </div>
      <div class="flex flex-col items-center font-sans text-gray-800 py-8">
        <BoardMain
          :board="ticTacToeStore.board"
          :winner="ticTacToeStore.winner"
          :newGameSwitch="ticTacToeStore.newGameSwitch"
          @square-click="ticTacToeStore.handleSquareClick"
        />
      </div>
      <div class="flex justify-center gap-4 mt-4">
        <NewGameButton @newGame="ticTacToeStore.newGame" />
        <NextButton
          v-if="ticTacToeStore.onGame && !ticTacToeStore.newGameSwitch"
          :disabled="ticTacToeStore.onGame && !ticTacToeStore.winner && ticTacToeStore.winner !== 'draw'"
          @reset="ticTacToeStore.resetGame"
        />
      </div>
    </main>
    <footer class="mt-8">
      <AppFooter />
    </footer>
  </div>
</template>

<style scoped></style>
