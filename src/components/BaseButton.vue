<template>
  <!--
    Reusable button component:
    - Applies default styling and allows custom classes
    - Supports disabled state
    - Emits click event to parent
    - Passes through additional attributes
  -->
  <button
    :class="[
      'mt-4 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-800 transition text-xl w-55 h-12 cursor-pointer',
      customClass
    ]"
    :disabled="disabled"
    @click="$emit('click', $event)"
    v-bind="$attrs"
  >
    <!-- Slot for button content -->
    <slot />
  </button>
</template>

<script setup lang="ts">
// Define props for button: 'disabled' for state, 'customClass' for extra styling
defineProps<{
  disabled?: boolean,
  customClass?: string
}>()
</script>
