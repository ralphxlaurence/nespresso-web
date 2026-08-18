<script setup>
import { useMasterData } from '../composables/useMasterData';

// Import local images directly from src/assets/img/
import accessoriesImg from '../assets/img/accessories_sample.png';
import olCoffeeImg from '../assets/img/olcoffee_sample.png';
import olMachineImg from '../assets/img/olmachine_sample.png';
import vlCoffeeImg from '../assets/img/vlcoffee_sample.png';
import vlMachineImg from '../assets/img/vlmachine_sample.png';

const emit = defineEmits(['navigate']);
const { selectedCatalog } = useMasterData();

const collectionsList = [
  { id: 'Accessories', name: 'ACCESSORIES', image: accessoriesImg },
  { id: 'OL Coffee', name: 'OL COFFEE', image: olCoffeeImg },
  { id: 'VL Coffee', name: 'VL COFFEE', image: vlCoffeeImg },
  { id: 'OL Machine', name: 'OL MACHINE', image: olMachineImg },
  { id: 'VL Machine', name: 'VL MACHINE', image: vlMachineImg }
];

const selectCollection = (catalogName) => {
  selectedCatalog.value = catalogName;
  emit('navigate', 'catalog');
};
</script>

<template>
  <div class="collections-page">
    <div class="page-container">
      <h1 class="page-title">COLLECTIONS</h1>

      <div class="collections-grid">
        <div 
          v-for="item in collectionsList" 
          :key="item.id" 
          class="collection-card"
          @click="selectCollection(item.id)"
        >
          <div class="image-wrapper">
            <img :src="item.image" :alt="item.name" class="card-image" />
          </div>
          <span class="card-title">{{ item.name }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.collections-page {
  background-color: #fcfbf9;
  min-height: calc(100vh - 64px);
  padding: 40px 32px 60px;
  box-sizing: border-box;
}

.page-container {
  max-width: 1040px;
  margin: 0 auto;
}

.page-title {
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #000000;
  margin: 0 0 32px 0;
}

.collections-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.collection-card {
  background-color: #faf9f5;
  border: 1px solid #f0eee6;
  border-radius: 12px;
  padding: 24px 32px;
  display: flex;
  align-items: center;
  gap: 32px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.collection-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.05);
}

.image-wrapper {
  width: 110px;
  height: 110px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.card-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.card-title {
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #1a1a1a;
}

@media (max-width: 768px) {
  .collections-grid {
    grid-template-columns: 1fr;
  }
}
</style>