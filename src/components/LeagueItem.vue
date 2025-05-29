<template>
  <div class="league-item" @click="$emit('click')">
    <h3 class="league-name">{{ league.strLeague }}</h3>
    
    <div class="league-sport">
      <span class="sport-badge" :style="sportBadgeStyle">{{ league.strSport }}</span>
    </div>
    
    <div v-if="league.strLeagueAlternate" class="league-alternate">
      <span class="alternate-label">Also known as:</span>
      <span class="alternate-value">{{ league.strLeagueAlternate }}</span>
    </div>
    
    <div class="click-hint">
      <span>Click to view badge</span>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  league: {
    type: Object,
    required: true
  }
});

defineEmits(['click']);

// Compute style for sport badge
const sportBadgeStyle = computed(() => {
  const sport = props.league.strSport;
  
  // Get the CSS variable for this sport, or use the default
  // Convert sport name to kebab-case for CSS variable naming
  const sportKey = sport.replace(/\s+/g, '-').toLowerCase();
  const cssVarName = `--sport-color-${sportKey}`;
  
  // Get the computed style to access CSS variables
  const styles = getComputedStyle(document.documentElement);
  
  // Try to get the specific sport color, fall back to default
  let backgroundColor = styles.getPropertyValue(cssVarName).trim();
  if (!backgroundColor) {
    backgroundColor = styles.getPropertyValue('--sport-color-default').trim();
  }
  
  // If still no color (unlikely), use a hardcoded fallback
  if (!backgroundColor) {
    backgroundColor = '#ff6600';
  }
  
  // Calculate text color based on background brightness
  // Using YIQ formula to determine if text should be light or dark
  // First ensure we have a proper hex color (remove any leading spaces)
  if (backgroundColor.startsWith('#')) {
    const r = parseInt(backgroundColor.substring(1, 3), 16);
    const g = parseInt(backgroundColor.substring(3, 5), 16);
    const b = parseInt(backgroundColor.substring(5, 7), 16);
    const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    const textColor = (yiq >= 128) ? '#000000' : '#ffffff';
    
    return {
      backgroundColor,
      color: textColor
    };
  }
  
  // Fallback if we couldn't parse the color
  return {
    backgroundColor,
    color: '#ffffff'
  };
});
</script>

<style lang="scss" scoped>
/* Styles moved to src/assets/styles/components/_league-item.scss */
</style>
