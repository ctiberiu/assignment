<template>
  <div class="app">
    <header>
      <div class="container">
        <h1>League List Viewer</h1>
        <p>Browse sports leagues from around the world</p>
      </div>
    </header>
    
    <main class="container">
      <div class="filters">
        <SearchBar 
          :search-query="searchQuery" 
          @update-search="updateSearchQuery" 
        />
        <SportFilter 
          :sports="uniqueSports" 
          :selected-sport="selectedSport" 
          @update-sport="updateSelectedSport" 
        />
      </div>
      
      <div v-if="loading" class="loading"></div>
      
      <div v-else-if="error" class="error-message">
        {{ error }}
      </div>
      
      <LeagueList 
        v-else
        :leagues="filteredLeagues" 
        @select-league="selectLeague" 
      />
      
      <BadgeDisplay 
        v-if="showBadge" 
        :badge-url="currentBadge" 
        :loading="badgeLoading" 
        :error="badgeError" 
        :selected-league="selectedLeague"
        @close="closeBadgeDisplay" 
      />
    </main>
    
    <footer>
      <div class="container">
        <p>&copy; {{ currentYear }} League List Viewer</p>
        <p class="developer-info">Developed by <a href="https://www.linkedin.com/in/tiberiucorici/" target="_blank" rel="noopener noreferrer">Tiberiu Corici</a></p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import SearchBar from './components/SearchBar.vue'
import SportFilter from './components/SportFilter.vue'
import LeagueList from './components/LeagueList.vue'
import BadgeDisplay from './components/BadgeDisplay.vue'
import useLeagues from './composables/useLeagues'
import useBadges from './composables/useBadges'

const currentYear = computed(() => new Date().getFullYear())

const { 
  leagues, 
  loading, 
  error, 
  searchQuery, 
  selectedSport, 
  uniqueSports, 
  filteredLeagues, 
  fetchLeagues, 
  updateSearchQuery, 
  updateSelectedSport 
} = useLeagues()

const { 
  currentBadge, 
  loading: badgeLoading, 
  error: badgeError, 
  fetchBadge 
} = useBadges()

const selectedLeague = ref(null)
const showBadge = ref(false)

const selectLeague = async (league) => {
  selectedLeague.value = league
  showBadge.value = true
  await fetchBadge(league.idLeague)
}

const closeBadgeDisplay = () => {
  showBadge.value = false
  selectedLeague.value = null
}

onMounted(async () => {
  await fetchLeagues()
})
</script>

<style lang="scss">
</style>
