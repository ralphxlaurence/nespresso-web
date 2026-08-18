<script setup>
import { useMasterData } from '../composables/useMasterData';
import ProductGrid from '../components/ProductGrid.vue';

const { filteredProducts, loading, error } = useMasterData();
</script>

<template>
  <div class="catalog-view">
    <div class="catalog-container">
      <div v-if="loading" class="status-msg">
        <div class="spinner"></div>
        <p>Loading catalog items...</p>
      </div>

      <div v-else-if="error" class="status-msg error">
        {{ error }}
      </div>

      <ProductGrid v-else :products="filteredProducts" />
    </div>
  </div>
</template>

<style scoped>
.catalog-view {
  background-color: #ffffff;
  min-height: calc(100vh - 64px);
  padding: 32px 24px 60px;
  box-sizing: border-box;
}

.catalog-container {
  max-width: 1080px;
  margin: 0 auto;
}

.status-msg {
  text-align: center;
  padding: 80px 20px;
  color: #666666;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.error {
  color: #c0392b;
}

.spinner {
  width: 32px;
  height: 32px;
  border: 3px solid #e0e0e0;
  border-top-color: #8c6e43;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>