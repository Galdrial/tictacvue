<template>
  <div
    class="pl-3 pt-3 font-['Press_Start_2P'] w-36 h-36 flex justify-center items-center text-8xl font-bold cursor-pointer border-8 border-[#00f0ff] shadow-[0_0_2px_#00f0ff,0_0_14px_#00f0ff] transition hover:bg-[rgba(0,240,255,0.3)] select-none rounded "
    :class="value === 'X' ? 'text-[#F7901A] text-shadow-[0_0_8px_#F7901A,0_0_16px_#F7901A] pointer-events-none' : value === 'O' ? 'text-[#00f0ff] text-shadow-[0_0_2px_#00f0ff,0_0_14px_#00f0ff]  pointer-events-none' : ''"
    @click="handleClick"
    :disabled="disabled"
  >
    {{ value }}
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  value: string | null;
  index: number;
  disabled: boolean;
}>();
const emit = defineEmits(['square-click']);

function handleClick() {
  if (!props.value && !props.disabled) {
    emit('square-click', props.index);
  }
}
</script>
