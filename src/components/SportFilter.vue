<template>
  <div class="sport-filter">
    <select v-model="selectedSportValue" @change="emitUpdate">
      <option value="">All Sports</option>
      <option v-for="sport in sports" :key="sport" :value="sport">
        {{ sport }}
      </option>
    </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  sports: {
    type: Array,
    default: () => []
  },
  selectedSport: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['update-sport'])

const selectedSportValue = ref(props.selectedSport)

// Watch for prop changes
watch(() => props.selectedSport, (newValue) => {
  selectedSportValue.value = newValue
})

// Emit sport update
const emitUpdate = () => {
  emit('update-sport', selectedSportValue.value)
}
</script>

<style lang="scss" scoped>
/* Styles moved to src/assets/styles/components/_sport-filter.scss */
</style>
