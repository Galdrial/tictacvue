<template>
  <BaseButton @click="onClick">New Game</BaseButton>
</template>

<script setup lang="ts">
import { useTicTacToeStore } from '../stores/tictacvue';
import BaseButton from './BaseButton.vue';
const emit = defineEmits(['newGame']);
const ticTacToeStore = useTicTacToeStore()
function onClick() {
  ticTacToeStore.onGame = true;
  emit('newGame');
}
</script>
