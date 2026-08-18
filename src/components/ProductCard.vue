<script setup>
import { useMasterData } from '../composables/useMasterData';

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
});

const { selectedProduct } = useMasterData();
</script>

<template>
  <div class="product-card" @click="selectedProduct = product">
    <div class="image-wrapper">
      <img 
        v-if="product.image || product.imageUrl" 
        :src="product.image || product.imageUrl" 
        :alt="product.name || 'Nespresso Product'" 
        class="product-image"
      />
      <div v-else class="placeholder-icon">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
          <circle cx="8.5" cy="8.5" r="1.5"></circle>
          <polyline points="21 15 16 10 5 21"></polyline>
        </svg>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  background-color: #faf9f5;
  border: 1px solid #f0eee6;
  border-radius: 12px;
  aspect-ratio: 1 / 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-sizing: border-box;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.06);
  border-color: #e5e2d8;
}

.image-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  max-width: 90%;
  max-height: 90%;
  object-fit: contain;
}

.placeholder-icon {
  width: 48px;
  height: 48px;
  color: #cccccc;
}
</style>