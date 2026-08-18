<script setup>
import SearchBar from './SearchBar.vue';
import CatalogDropdown from './CatalogDropdown.vue';
import FilterButton from './FilterButton.vue';

defineEmits(['navigate']);
</script>

<template>
  <header class="app-header">
    <div class="header-container">
      <!-- Nespresso N Icon -->
      <div class="brand-logo" @click="$emit('navigate', 'welcome')" title="Return to Welcome">
        <svg class="logo-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
        </svg>
      </div>

      <!-- Search Bar -->
      <div class="search-wrapper">
        <SearchBar />
      </div>

      <!-- Header Actions -->
      <div class="header-actions">
        <CatalogDropdown @navigate="$emit('navigate', $event)" />
        <FilterButton />
      </div>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #000000;
  height: 64px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 0 32px;
}

.header-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.brand-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.logo-icon {
  width: 32px;
  height: 32px;
  color: #ffffff;
}

.search-wrapper {
  flex: 1;
  max-width: 420px;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 24px;
}
</style>