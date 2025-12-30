<template>
  <BaseButton @click="onClick">New Game</BaseButton>
</template>

<script setup lang="ts">
import { useTicTacToeStore } from '../stores/tictacvue';
import BaseButton from './BaseButton.vue';
const emit = defineEmits(['newGame']);
const btnStore = useTicTacToeStore()
function onClick() {
  btnStore.onGame = true;
  emit('newGame');
}
</script>
