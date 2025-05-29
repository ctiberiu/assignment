import { ref, computed } from 'vue'

export default function useLeagues() {
  const leagues = ref([])
  const loading = ref(false)
  const error = ref(null)
  const searchQuery = ref('')
  const selectedSport = ref('')
  
  // Get unique sports from leagues
  const uniqueSports = computed(() => {
    if (!leagues.value.length) return []
    
    const sportsSet = new Set(leagues.value.map(league => league.strSport))
    return Array.from(sportsSet).sort()
  })
  
  // Filtered leagues based on search query and selected sport
  const filteredLeagues = computed(() => {
    if (!leagues.value.length) return []
    
    return leagues.value.filter(league => {
      const matchesSearch = !searchQuery.value || 
        league.strLeague.toLowerCase().includes(searchQuery.value.toLowerCase())
      
      const matchesSport = !selectedSport.value || 
        league.strSport === selectedSport.value
      
      return matchesSearch && matchesSport
    })
  })
  
  // Fetch all leagues
  const fetchLeagues = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch('https://www.thesportsdb.com/api/v1/json/3/all_leagues.php')
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data && data.leagues) {
        leagues.value = data.leagues
      } else {
        throw new Error('Invalid API response format')
      }
    } catch (err) {
      error.value = err.message || 'Failed to fetch leagues'
      console.error(error.value)
    } finally {
      loading.value = false
    }
  }
  
  // Update search query
  const updateSearchQuery = (query) => {
    searchQuery.value = query
  }
  
  // Update selected sport
  const updateSelectedSport = (sport) => {
    selectedSport.value = sport
  }
  
  return {
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
  }
}
