<template>
  <div class="league-list">
    <div v-if="leagues.length === 0" class="empty-state">
      <p>No leagues found matching your criteria.</p>
    </div>
    
    <div v-else class="leagues-grid">
      <LeagueItem 
        v-for="league in leagues" 
        :key="league.idLeague" 
        :league="league"
        @click="selectLeague(league)" 
      />
    </div>
  </div>
</template>

<script setup>
import LeagueItem from './LeagueItem.vue'

const props = defineProps({
  leagues: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['select-league'])

const selectLeague = (league) => {
  emit('select-league', league)
}
</script>

<style lang="scss" scoped>
/* Styles moved to src/assets/styles/components/_league-list.scss */
</style>
