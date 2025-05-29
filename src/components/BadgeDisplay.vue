<template>
  <div class="badge-overlay" @click.self="$emit('close')">
    <div class="badge-modal">
      <button class="close-button" @click="$emit('close')">&times;</button>
      
      <h2 v-if="selectedLeague" class="league-title">
        {{ selectedLeague.strLeague }}
      </h2>
      
      <div v-if="loading" class="loading"></div>
      
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      
      <div v-else-if="badgeUrl" class="badge-container">
        <img :src="badgeUrl" :alt="`${selectedLeague?.strLeague} badge`" class="badge-image" />
      </div>
      
      <div v-else class="no-badge">
        <p>No badge available for this league</p>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  badgeUrl: {
    type: String,
    default: null
  },
  loading: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: null
  },
  selectedLeague: {
    type: Object,
    default: null
  }
})

defineEmits(['close'])
</script>

<style lang="scss" scoped>
/* Styles moved to src/assets/styles/components/_badge-display.scss */
</style>
