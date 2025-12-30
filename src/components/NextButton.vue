<template>
  <!-- Button to proceed to the next round, uses BaseButton component -->
  <BaseButton :disabled="disabled" @click="onClick">Next</BaseButton>
</template>

<script setup lang="ts">
// Import the game store and BaseButton component
import { useTicTacToeStore } from '../stores/tictacvue';
import BaseButton from './BaseButton.vue';

// Emit 'reset' event to parent when button is clicked
const emit = defineEmits(['reset']);

// Access the TicTacToe store
const ticTacToeStore = useTicTacToeStore()

// Props: 'disabled' controls button state
const props = defineProps<{ disabled?: boolean }>()

// Handler for button click: sets game state and emits event if not disabled
function onClick() {
  if (!props.disabled) {
    ticTacToeStore.onGame = true;
    emit('reset');
  }
}
</script>
