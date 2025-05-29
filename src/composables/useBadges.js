import { ref, reactive } from 'vue'

export default function useBadges() {
  // Cache for badge URLs
  const badgeCache = reactive(new Map())
  // Cache for image blobs
  const blobCache = reactive(new Map())
  const currentBadge = ref(null)
  const loading = ref(false)
  const error = ref(null)
  
  /**
   * Fetch an image as a Blob and create an object URL
   * @param {string} url - The image URL to fetch
   * @returns {Promise<string>} - Object URL for the blob
   */
  const fetchImageAsBlob = async (url) => {
    try {
      // Check if we already have this image in the blob cache
      if (blobCache.has(url)) {
        return blobCache.get(url)
      }
      
      // Fetch the image
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.status}`)
      }
      
      // Convert to blob
      const blob = await response.blob()
      
      // Create an object URL from the blob
      const objectUrl = URL.createObjectURL(blob)
      
      // Store in cache
      blobCache.set(url, objectUrl)
      
      return objectUrl
    } catch (err) {
      console.error('Error fetching image as blob:', err)
      // Return the original URL as fallback
      return url
    }
  }
  
  /**
   * Fetch badge for a league
   * @param {string} leagueId - The ID of the league
   * @returns {Promise<string|null>} - URL of the badge or null if not found
   */
  const fetchBadge = async (leagueId) => {
    // Check if we have the badge URL in cache
    if (badgeCache.has(leagueId)) {
      const badgeUrl = badgeCache.get(leagueId)
      
      // If no badge available, return null
      if (!badgeUrl) {
        currentBadge.value = null
        return null
      }
      
      // If we have a badge URL, try to get it from blob cache or fetch it
      try {
        const blobUrl = await fetchImageAsBlob(badgeUrl)
        currentBadge.value = blobUrl
        return blobUrl
      } catch (err) {
        // Fallback to original URL if blob fetch fails
        currentBadge.value = badgeUrl
        return badgeUrl
      }
    }
    
    // If not in cache, fetch from API
    loading.value = true
    error.value = null
    
    try {
      const response = await fetch(`https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${leagueId}`)
      
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data && data.seasons && data.seasons.length > 0) {
        // Find first season with a badge
        const badgeUrl = data.seasons.find(season => season.strBadge)?.strBadge || null
        
        // Cache the badge URL (even if null)
        badgeCache.set(leagueId, badgeUrl)
        
        // If no badge available, return null
        if (!badgeUrl) {
          currentBadge.value = null
          return null
        }
        
        // Fetch the image as blob and cache it
        try {
          const blobUrl = await fetchImageAsBlob(badgeUrl)
          currentBadge.value = blobUrl
          return blobUrl
        } catch (err) {
          // Fallback to original URL if blob fetch fails
          currentBadge.value = badgeUrl
          return badgeUrl
        }
      } else {
        // Cache null result to avoid repeated API calls
        badgeCache.set(leagueId, null)
        currentBadge.value = null
        return null
      }
    } catch (err) {
      error.value = err.message || 'Failed to fetch badge'
      console.error(error.value)
      return null
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Clear all caches and revoke object URLs
   */
  const clearCache = () => {
    // Revoke all object URLs to prevent memory leaks
    blobCache.forEach(objectUrl => {
      URL.revokeObjectURL(objectUrl)
    })
    
    // Clear caches
    blobCache.clear()
    badgeCache.clear()
    currentBadge.value = null
  }
  
  return {
    currentBadge,
    loading,
    error,
    fetchBadge,
    clearCache,
    badgeCache,
    blobCache
  }
}
