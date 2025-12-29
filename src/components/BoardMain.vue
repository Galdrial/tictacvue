<template>
  <div class="grid grid-cols-3 grid-rows-3 gap-2 bg-[rgba(11,8,25,0.9)] border-8 border-[#00f0ff] shadow-[0_0_8px_#00f0ff,0_0_16px_#00f0ff] p-4 rounded-lg aspect-square mx-auto w-[90vw] max-w-100">
    <SquareBoard
      v-for="(square, i) in board"
      :key="i"
      :value="square"
      :index="i"
      :disabled="newGameSwitch"
      :onSquare-click="onSquareClick"
    />
  </div>
</template>

<script setup lang="ts">
import SquareBoard from './SquareBoard.vue';


defineProps<{
  board: (string | null)[];
  winner: string | null;
  newGameSwitch: boolean;
}>();
const emit = defineEmits(['square-click']);

function onSquareClick(index: number) {
  emit('square-click', index);
}
</script>
