<template>
  <BaseButton :disabled="disabled" @click="onClick">Next</BaseButton>
</template>

<script setup lang="ts">
import { useTicTacToeStore } from '../stores/tictacvue';
import BaseButton from './BaseButton.vue';
const emit = defineEmits(['reset']);
const ticTacToeStore = useTicTacToeStore()
const props = defineProps<{ disabled?: boolean }>()
function onClick() {
  if (!props.disabled) {
    ticTacToeStore.onGame = true;
    emit('reset');
  }
}
</script>
