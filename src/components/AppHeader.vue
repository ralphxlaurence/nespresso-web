<script setup>
import nespressoLogo from '../assets/icons/nespresso-logo.png';
import CatalogDropdown from './CatalogDropdown.vue';
import { useMasterData } from '../composables/useMasterData';

const emit = defineEmits(['navigate']);
const { searchQuery, triggerSearch, isFilterOpen } = useMasterData();

const handleSearchEnter = () => {
  triggerSearch();
  emit('navigate', 'catalog');
};

const goHome = () => {
  emit('navigate', 'collections');
};
</script>

<template>
  <header class="app-header">
    <div class="header-left" @click="goHome">
      <img :src="nespressoLogo" alt="Nespresso" class="header-logo" />
    </div>

    <div class="header-center">
      <div class="search-box">
        <input 
          v-model="searchQuery" 
          type="text" 
          placeholder="Search Product ID, Name, Keyword..." 
          @keyup.enter="handleSearchEnter"
        />
        <span class="search-icon" @click="handleSearchEnter">🔍</span>
      </div>
    </div>

    <div class="header-right">
      <CatalogDropdown @navigate="$emit('navigate', $event)" />
      <button class="filter-btn" @click="isFilterOpen = true">
        FILTER <span class="filter-icon">∇</span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  background-color: #000000;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  box-sizing: border-box;
}

.header-left {
  cursor: pointer;
  display: flex;
  align-items: center;
}

.header-logo {
  height: 28px;
  width: auto;
  object-fit: contain;
}

.header-center {
  flex: 1;
  max-width: 380px;
  margin: 0 24px;
}

.search-box {
  position: relative;
  width: 100%;
}

.search-box input {
  width: 100%;
  padding: 8px 36px 8px 16px;
  border-radius: 4px;
  border: 1px solid #ffffff;
  background: #ffffff;
  color: #333333;
  font-size: 0.85rem;
  box-sizing: border-box;
}

.search-icon {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: #8c6e43;
  cursor: pointer;
}

.header-right {
  display: flex;
  align-items: center;
  gap: 24px;
}

.filter-btn {
  background: transparent;
  border: none;
  color: #ffffff;
  font-weight: 700;
  letter-spacing: 1.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
}
</style>