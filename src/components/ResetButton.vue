<template>
  <button
    class="mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-xl w-55"
    @click="onClick"
  >
    Next
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(['reset']);
import { useBtnStore } from '../stores/counter'
const btnStore = useBtnStore()
function onClick() {
  btnStore.onGame = true;
  emit('reset');
}
</script>
