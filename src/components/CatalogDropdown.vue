<script setup>
import { ref } from 'vue';
import { useMasterData } from '../composables/useMasterData';

const emit = defineEmits(['navigate']);
const { selectedCatalog } = useMasterData();
const isOpen = ref(false);

const catalogItems = [
  'Accessories',
  'B2B Coffee',
  'B2B Machine',
  'OL Coffee',
  'VL Coffee',
  'OL Machine',
  'VL Machine'
];

const selectItem = (item) => {
  selectedCatalog.value = item;
  isOpen.value = false;
  emit('navigate', 'catalog');
};
</script>

<template>
  <div class="dropdown-wrapper" @mouseleave="isOpen = false">
    <button class="dropdown-trigger" @click="isOpen = !isOpen">
      CATALOG 
      <span class="arrow">{{ isOpen ? '▲' : '∨' }}</span>
    </button>

    <div v-if="isOpen" class="dropdown-menu">
      <div 
        v-for="item in catalogItems" 
        :key="item" 
        class="dropdown-item" 
        @click="selectItem(item)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.dropdown-wrapper { position: relative; }

.dropdown-trigger {
  background: transparent;
  border: none;
  color: #ffffff;
  font-size: 0.85rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px;
}

.dropdown-trigger:hover { opacity: 0.85; }

.dropdown-menu {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #000000;
  border-top: 1px solid #1a1a1a;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.4);
  min-width: 160px;
  padding: 6px 0;
  z-index: 1000;
}

.dropdown-item {
  padding: 10px 16px;
  font-size: 0.85rem;
  color: #ffffff;
  cursor: pointer;
  font-weight: 400;
  transition: background-color 0.15s ease;
}

.dropdown-item:hover {
  background-color: #8c6e43;
  color: #ffffff;
}
</style>