<template>
  <div class="search-bar">
    <input
      type="text"
      v-model="query"
      placeholder="Search leagues..."
      @input="emitUpdate"
    />
    <button v-if="query" @click="clearSearch" class="clear-button">
      &times;
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  searchQuery: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update-search'])

const query = ref(props.searchQuery)

// Watch for prop changes
watch(() => props.searchQuery, (newValue) => {
  query.value = newValue
})

// Emit search update
const emitUpdate = () => {
  emit('update-search', query.value)
}

// Clear search
const clearSearch = () => {
  query.value = ''
  emit('update-search', '')
}
</script>

<style lang="scss" scoped>
/* Styles moved to src/assets/styles/components/_search-bar.scss */
</style>
