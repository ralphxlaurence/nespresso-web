<script setup>
import { useMasterData } from '../composables/useMasterData';
const { isFilterOpen, activeFilterCount } = useMasterData();
</script>

<template>
  <button class="filter-btn" @click="isFilterOpen = true">
    FILTER
    <svg class="filter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
    </svg>
    <span v-if="activeFilterCount > 0" class="badge">{{ activeFilterCount }}</span>
  </button>
</template>

<style scoped>
.filter-btn {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 600;
  letter-spacing: 1px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 8px;
}
.filter-btn:hover {
  opacity: 0.8;
}
.filter-icon {
  width: 16px;
  height: 16px;
}
.badge {
  background: #ffffff;
  color: #000000;
  border-radius: 50%;
  padding: 1px 6px;
  font-size: 0.7rem;
  font-weight: 700;
}
</style>