<template>
  <BaseButton @click="onClick">New Game</BaseButton>
</template>

<script setup lang="ts">
import { useBtnStore } from '../stores/counter';
import BaseButton from './BaseButton.vue';
const emit = defineEmits(['newGame']);
const btnStore = useBtnStore()
function onClick() {
  btnStore.onGame = true;
  emit('newGame');
}
</script>
