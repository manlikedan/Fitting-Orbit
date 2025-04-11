<template>
  <input
      v-model="internalSearch"
      @input="onInput"
      class="w-full p-4 rounded-full border-2 border-brand focus:outline-none focus:ring-2 focus:ring-brand shadow-sm bg-white placeholder-gray-400 mb-6"
      placeholder="🔎 Search for products..."
  />
</template>

<script setup>
import { ref, watch } from 'vue'

const emit = defineEmits(['update:searchTerm', 'search'])

const props = defineProps({
  searchTerm: String
})

const internalSearch = ref(props.searchTerm || '')

watch(() => props.searchTerm, (newVal) => {
  internalSearch.value = newVal
})

let debounceTimer

const onInput = () => {
  emit('update:searchTerm', internalSearch.value)
  clearTimeout(debounceTimer)
  debounceTimer = setTimeout(() => {
    emit('search')
  }, 500)
}
</script>