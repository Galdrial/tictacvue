<template>
  <button
    class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xl w-55 h-12 cursor-pointer"
    @click="onClick"
    :disabled="disabled"
  >
    Next
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['reset']);
import { useBtnStore } from '../stores/counter';
const btnStore = useBtnStore()
const props = defineProps<{ disabled?: boolean }>()
function onClick() {
  if (!props.disabled) {
    btnStore.onGame = true;
    emit('reset');
  }
}
</script>
