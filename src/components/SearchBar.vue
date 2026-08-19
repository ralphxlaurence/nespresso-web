<script setup>
import { useMasterData } from '../composables/useMasterData';

const { searchQuery, triggerSearch } = useMasterData();

const handleSearch = () => {
  if (searchQuery.value && searchQuery.value.trim() !== '') {
    triggerSearch();
  }
};

const handleKeyDown = (e) => {
  if (e.key === 'Enter') {
    handleSearch();
  }
};
</script>

<template>
  <div class="search-bar-wrapper">
    <input
      v-model="searchQuery"
      type="text"
      placeholder="Search Product ID, Name, Keyword..."
      class="search-input"
      @keydown="handleKeyDown"
    />
    
    <!-- Active, Clickable Search Button (Only renders when user typed text) -->
    <button
      v-if="searchQuery && searchQuery.trim().length > 0"
      type="button"
      class="search-btn active"
      @click="handleSearch"
      aria-label="Search"
    >
      <span class="search-icon">🔍</span>
    </button>

    <!-- Disabled Static Icon (Renders when input is empty; non-clickable span) -->
    <span v-else class="search-btn disabled" aria-hidden="true">
      <span class="search-icon">🔍</span>
    </span>
  </div>
</template>

<style scoped>
.search-bar-wrapper {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 480px;
}

.search-input {
  width: 100%;
  padding: 8px 40px 8px 16px;
  border: 1.5px solid #ffffff;
  border-radius: 6px;
  background-color: #ffffff;
  font-size: 0.95rem;
  color: #1a1a1a;
  outline: none;
}

/* Base style for icon wrapper position */
.search-btn {
  position: absolute;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  background: transparent;
  border: none;
  line-height: 1;
}

/* Disabled state - fully neutralizes interactions */
.search-btn.disabled {
  opacity: 0.35;
  cursor: default !important;
  pointer-events: none !important;
  user-select: none;
}

/* Active state - interactive */
.search-btn.active {
  cursor: pointer !important;
  opacity: 1;
  pointer-events: auto !important;
  transition: transform 0.15s ease;
}

.search-btn.active:hover {
  transform: scale(1.15);
}

.search-icon {
  font-size: 1rem;
  pointer-events: none; /* Prevents child element from capturing clicks/hovers */
}
</style>