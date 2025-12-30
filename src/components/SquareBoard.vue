<template>
  <!--
    Single square for the Tic Tac Toe board:
    - Uses custom font and styles for retro look
    - Shows X or O with color and shadow effects
    - Disables click if already filled or board is disabled
    - Emits 'square-click' event with index when clicked
  -->
  <div
    class="pl-2.5 pt-2.5 font-['Press_Start_2P'] w-full h-full aspect-square flex justify-center items-center text-7xl font-bold cursor-pointer border-8 border-[#00f0ff] shadow-[0_0_2px_#00f0ff,0_0_14px_#00f0ff] transition hover:bg-[rgba(0,240,255,0.3)] select-none rounded "
    :class="value === 'X' ? 'text-[#F7901A] text-shadow-[0_0_8px_#F7901A,0_0_16px_#F7901A] pointer-events-none' : value === 'O' ? 'text-[#00f0ff] text-shadow-[0_0_2px_#00f0ff,0_0_14px_#00f0ff]  pointer-events-none' : ''"
    @click="handleClick"
    :aria-label="value ? `Square ${index + 1}, ${value}` : `Square ${index + 1}, empty`"
    role="button"
    tabindex="0"
    @keydown.enter.space="handleClick"
  >
    {{ value }}
  </div>
</template>

<script setup lang="ts">
// Props:
// - value: current value of the square ('X', 'O', or null)
// - index: position of the square in the board
// - disabled: disables interaction if true
const props = defineProps<{
  value: string | null;
  index: number;
  disabled: boolean;
}>();

// Emit event when square is clicked
const emit = defineEmits(['square-click']);

// Handler for click: only emits if square is empty and not disabled
function handleClick() {
  if (!props.value && !props.disabled) {
    emit('square-click', props.index);
  }
}
</script>
