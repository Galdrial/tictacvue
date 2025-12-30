<template>
  <!-- Button to start a new game, uses BaseButton component -->
  <BaseButton @click="onClick" aria-label="Start a new game">New Game</BaseButton>
</template>

<script setup lang="ts">
// Import the game store and BaseButton component
import { useTicTacToeStore } from '../stores/tictacvue';
import BaseButton from './BaseButton.vue';

// Emit 'newGame' event to parent when button is clicked
const emit = defineEmits(['newGame']);

// Access the TicTacToe store
const ticTacToeStore = useTicTacToeStore()

// Handler for button click: sets game state and emits event
function onClick() {
  ticTacToeStore.onGame = true;
  emit('newGame');
}
</script>
