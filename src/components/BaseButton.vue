<template>
  <button
    :class="[
      'mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition text-xl w-55 h-12 cursor-pointer',
      customClass
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
    v-bind="$attrs"
  >
    <slot />
  </button>
</template>

<script setup lang="ts">
defineProps<{
  disabled?: boolean,
  customClass?: string
}>()
</script>
