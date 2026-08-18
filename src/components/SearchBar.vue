<script setup>
import { useMasterData } from '../composables/useMasterData';
const { searchQuery } = useMasterData();
</script>

<template>
  <div class="search-input-box">
    <input 
      type="text" 
      v-model="searchQuery" 
      placeholder="Search here..." 
    />
    <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="11" cy="11" r="8"></circle>
      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
    </svg>
  </div>
</template>

<style scoped>
.search-input-box {
  position: relative;
  width: 100%;
  display: flex;
  align-items: center;
}

.search-input-box input {
  width: 100%;
  height: 36px;
  background-color: #ffffff;
  border: none;
  border-radius: 2px;
  padding: 0 40px 0 14px;
  font-size: 0.85rem;
  color: #333333;
  outline: none;
}

.search-input-box input::placeholder {
  color: #888888;
}

.search-icon {
  position: absolute;
  right: 12px;
  width: 18px;
  height: 18px;
  color: #886036;
  pointer-events: none;
}
</style>