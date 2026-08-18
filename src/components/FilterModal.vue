<script setup>
import { ref } from 'vue';
import { useMasterData } from '../composables/useMasterData';

const { isFilterOpen, filterCategories } = useMasterData();

// Collection / category options matching your design
const filterOptions = [
  'Vertuo Collection',
  'Signature Collection',
  'Barista Collection',
  'Display Collection',
  'Loop Collection',
  'Origin Collection',
  'Lume Collection',
  'Pixie Collection',
  'Reveal Collection',
  'Recipes',
  'Travel Collection',
  'Sustainability Collection',
  'GWP Collection',
  'Descaling Kit',
  'Food & Bites',
  'View Spoons Collections',
  'Milk Frothers',
  'B2B Collection'
];

// Temporary selection array while modal is open
const localSelected = ref([...filterCategories.value]);

const toggleFilter = (option) => {
  const index = localSelected.value.indexOf(option);
  if (index > -1) {
    localSelected.value.splice(index, 1);
  } else {
    localSelected.value.push(option);
  }
};

const isSelected = (option) => {
  return localSelected.value.includes(option);
};

const saveFilters = () => {
  filterCategories.value = [...localSelected.value];
  isFilterOpen.value = false;
};

const closeModal = () => {
  // Revert local changes if closed without saving
  localSelected.value = [...filterCategories.value];
  isFilterOpen.value = false;
};
</script>

<template>
  <div v-if="isFilterOpen" class="modal-overlay" @click.self="closeModal">
    <div class="filter-modal-card">
      <!-- Header -->
      <div class="modal-header">
        <h2>FILTER</h2>
        <button class="close-btn" @click="closeModal">✕</button>
      </div>

      <!-- Tag Options -->
      <div class="tags-container">
        <button 
          v-for="option in filterOptions" 
          :key="option"
          class="filter-pill"
          :class="{ active: isSelected(option) }"
          @click="toggleFilter(option)"
        >
          {{ option }}
        </button>
      </div>

      <!-- Footer Button -->
      <div class="modal-footer">
        <button class="btn-save" @click="saveFilters">
          SAVE FILTER
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(2px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.filter-modal-card {
  background-color: #f6f3ee;
  width: 100%;
  max-width: 580px;
  border-radius: 8px;
  padding: 32px;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
}

.modal-header h2 {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #8c6e43;
  margin: 0;
}

.close-btn {
  background: transparent;
  border: none;
  font-size: 1.1rem;
  color: #8c6e43;
  cursor: pointer;
  padding: 4px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin-bottom: 28px;
}

.filter-pill {
  background-color: #ffffff;
  border: 1px solid #e2ded7;
  color: #666666;
  padding: 8px 18px;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 400;
  cursor: pointer;
  transition: all 0.15s ease;
}

.filter-pill:hover {
  border-color: #8c6e43;
  color: #333333;
}

.filter-pill.active {
  background-color: #8c6e43;
  border-color: #8c6e43;
  color: #ffffff;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
}

.btn-save {
  background-color: #8c6e43;
  color: #ffffff;
  border: none;
  border-radius: 18px;
  padding: 10px 24px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1px;
  cursor: pointer;
  transition: opacity 0.15s ease;
}

.btn-save:hover {
  opacity: 0.9;
}
</style>