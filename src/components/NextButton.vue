<template>
  <BaseButton :disabled="disabled" @click="onClick">Next</BaseButton>
</template>

<script setup lang="ts">
import { useBtnStore } from '../stores/counter';
import BaseButton from './BaseButton.vue';
const emit = defineEmits(['reset']);
const btnStore = useBtnStore()
const props = defineProps<{ disabled?: boolean }>()
function onClick() {
  if (!props.disabled) {
    btnStore.onGame = true;
    emit('reset');
  }
}
</script>
