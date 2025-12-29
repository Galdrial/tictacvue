<template>
  <div class="prompt-input flex items-center" @click="focusInput">
    <div class="input-wrapper" style="position:relative;display:inline-block;">
      <input
        ref="inputRef"
        :value="modelValue"
        @input="onInput"
        @blur="onBlur"
        @focus="onFocus"
        class="prompt-real-input"
        autocomplete="off"
        spellcheck="false"
      />
      <span v-if="showCursor" class="cursor-overlay">|</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue';
defineProps<{ modelValue: string }>()
const emit = defineEmits(['update:modelValue'])
const inputRef = ref<HTMLInputElement | null>(null)
const showCursor = ref(true)
let cursorInterval: number | undefined

function focusInput() {
  inputRef.value?.focus()
}
function onFocus() {
  cursorInterval = window.setInterval(() => {
    showCursor.value = !showCursor.value
  }, 500)
}
function onBlur() {
  showCursor.value = true
  if (cursorInterval) clearInterval(cursorInterval)
}
function onInput(e: Event) {
  const target = e.target as HTMLInputElement
  emit('update:modelValue', target.value)
}
// Autofocus on mount
nextTick(() => {
  inputRef.value?.focus()
})
</script>

<style scoped>
.prompt-input {
  position: relative;
  display: flex;
  align-items: center;
  cursor: text;
  font-family: 'Press Start 2P', monospace;
  font-size: 1.2em;
  min-width: 1ch;
  background: #fff;
  color: #222;
  padding: 8px 12px;
  margin: 8px 0;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}
.prompt-real-input {
  background: #fff;
  border: 2px solid #00f0ff;
  outline: none;
  color: #222;
  font-family: 'Press Start 2P', monospace !important;
  font-size: inherit;
  width: 100%;
  min-width: 6ch;
  margin: 0;
  caret-color: auto;
  position: relative;
  z-index: 1;
  padding: 4px 8px;
  border-radius: 6px;
}
.cursor-overlay {
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  color: inherit;
  font-family: 'Press Start 2P', monospace;
  font-size: 1.2em;
  pointer-events: none;
  animation: blink 1s steps(1) infinite;
  z-index: 2;
}
@keyframes blink {
  0%, 50% { opacity: 1; }
  51%, 100% { opacity: 0; }
}
</style>
