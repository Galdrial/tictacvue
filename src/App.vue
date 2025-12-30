<script setup lang="ts">
// Import main components for layout and game logic
import AppFooter from './components/AppFooter.vue'
import BoardMain from './components/BoardMain.vue'
import NewGameButton from './components/NewGameButton.vue'
import NextButton from './components/NextButton.vue'
import StateMessage from './components/StateMessage.vue'
import { useTicTacToeStore } from './stores/tictacvue'
// Initialize the Pinia store for game state
const ticTacToeStore = useTicTacToeStore()
</script>

<template>
  <!-- Main app container: flex column, fills viewport height -->
  <div class="flex flex-col min-h-screen">
    <header>
      <router-link to="/">
        <!-- App title: retro font, orange color, glowing text shadow, responsive size -->
        <h1
          class="flex justify-center font-['Press_Start_2P'] text-[2rem] sm:text-[60px] font-bold text-[#F7901A] text-shadow-[0_0_8px_#F7901A,0_0_16px_#F7901A] pt-8 pb-8"
          style="cursor:pointer"
          @click.prevent="ticTacToeStore.fullReset()"
        >
          TIC TAC VUE
        </h1>
      </router-link>
    </header>
    <main class="flex-1">
      <!-- StateMessage: shows game status, player names, score, and messages -->
      <div class="flex justify-center h-38">
        <StateMessage
          :winner="ticTacToeStore.winner"
          :xIsNext="ticTacToeStore.xIsNext"
          :board="ticTacToeStore.board"
          :onGame="ticTacToeStore.onGame"
          :newGameSwitch="ticTacToeStore.newGameSwitch"
        />
      </div>
      <!-- BoardMain: main Tic Tac Toe board OR instructions -->
      <div class="flex flex-col items-center font-sans text-gray-800 py-8">
        <template v-if="!ticTacToeStore.newGameSwitch">
          <BoardMain
            :board="ticTacToeStore.board"
            :winner="ticTacToeStore.winner"
            :newGameSwitch="ticTacToeStore.newGameSwitch"
            @square-click="ticTacToeStore.handleSquareClick"
          />
        </template>
        <template v-else>
          <div class="grid grid-cols-3 grid-rows-3 gap-2 bg-[rgba(11,8,25,0.9)] border-8 border-[#00f0ff] shadow-[0_0_8px_#00f0ff,0_0_16px_#00f0ff] p-4 rounded-lg aspect-square mx-auto w-[90vw] max-w-100">
              <div class="col-span-3 row-span-3 w-full h-full flex flex-col items-start justify-center text-white text-base font-['Press_Start_2P'] text-left">
              Instructions:<br /><br />
              Enter the player names (max 4 characters, no spaces) and press Start to begin the game.<br /><br />
              After starting, take turns and try to win!
            </div>
          </div>
        </template>
      </div>
      <!-- Game control buttons: New Game and Next (for new round) -->
      <div class="flex justify-center gap-4 mt-4">
        <NewGameButton @newGame="ticTacToeStore.newGame" />
        <NextButton
          v-if="ticTacToeStore.onGame && !ticTacToeStore.newGameSwitch"
          :disabled="ticTacToeStore.onGame && !ticTacToeStore.winner && ticTacToeStore.winner !== 'draw'"
          @reset="ticTacToeStore.resetGame"
        />
      </div>
    </main>
    <!-- Footer: social links and copyright -->
    <footer class="mt-8">
      <AppFooter />
    </footer>
  </div>
</template>

<style scoped>
/* No additional styles here; all layout and design handled by Tailwind utility classes and component styles */
</style>
