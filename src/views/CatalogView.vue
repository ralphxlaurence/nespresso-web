<script setup>
import { computed } from 'vue';
import { useMasterData } from '../composables/useMasterData';

const emit = defineEmits(['navigate', 'select-product']);
const { filteredProducts, selectedCatalog, appliedSearchQuery, clearSearch } = useMasterData();

// Displays "SEARCH ITEM/S" during a search, otherwise shows the selected catalog name
const displayTitle = computed(() => {
  if (appliedSearchQuery.value) {
    return 'SEARCH ITEM/S';
  }
  return selectedCatalog.value ? selectedCatalog.value.toUpperCase() : 'ALL PRODUCTS';
});

const goBack = () => {
  emit('navigate', 'collections');
};

const openProductModal = (product) => {
  emit('select-product', product);
};
</script>

<template>
  <div class="catalog-page">
    <div class="page-container">
      <!-- Top Title Bar -->
      <div class="catalog-header">
        <h1 class="catalog-title">{{ displayTitle }}</h1>
        <button class="back-btn" @click="goBack" aria-label="Go back to collections">
          <svg viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" stroke-width="2" fill="none"
            stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
        </button>
      </div>

      <!-- Searched Term & Item Count Banner -->
      <div v-if="appliedSearchQuery" class="search-status-bar">
        <div class="search-info">
          <span class="search-count">
            No. of items found: <strong>{{ filteredProducts.length }}</strong>
          </span>
        </div>

        <button class="clear-search-btn" @click="clearSearch">Clear Search ✕</button>
      </div>

      <!-- Products Grid -->
      <div v-if="filteredProducts.length > 0" class="products-grid">
        <div v-for="product in filteredProducts" :key="product.id || product['Product ID']" class="product-card"
          @click="openProductModal(product)">
          <div class="image-container">
            <img :src="product.image || product.imageUrl || product['Image URL']" :alt="product.name || 'Product Image'"
              class="product-image" />
          </div>
        </div>
      </div>

      <!-- Empty Results State -->
      <div v-else class="empty-state">
        <p>No products found matching "<strong>{{ appliedSearchQuery }}</strong>".</p>
        <button class="btn-reset" @click="clearSearch">View All Products</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalog-page {
  background-color: #ffffff;
  min-height: calc(100vh - 64px);
  padding: 40px 32px 60px;
  box-sizing: border-box;
}

.page-container {
  max-width: 1120px;
  margin: 0 auto;
}

.catalog-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
}

.catalog-title {
  font-size: 2.2rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #000000;
  margin: 0;
  text-transform: uppercase;
}

.back-btn {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 1.5px solid #1a1a1a;
  background: transparent;
  color: #1a1a1a;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
}

.back-btn:hover {
  background-color: #1a1a1a;
  color: #ffffff;
}

/* Search Status Bar */
.search-status-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f7f5f0;
  border: 1px solid #e8e4da;
  padding: 12px 20px;
  border-radius: 8px;
  margin-bottom: 28px;
}

.search-label {
  font-size: 0.95rem;
  color: #333333;
}

.search-label strong {
  color: #8c6e43;
}

.clear-search-btn {
  background: transparent;
  border: none;
  color: #8c6e43;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
}

/* Products Grid */
.products-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.product-card {
  background-color: #fbfbfa;
  border: 1px solid #f2f0eb;
  border-radius: 12px;
  padding: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.product-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.06);
}

.image-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.product-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.empty-state {
  text-align: center;
  padding: 60px 0;
  color: #666666;
}

.btn-reset {
  margin-top: 16px;
  background-color: #8c6e43;
  color: #ffffff;
  border: none;
  padding: 8px 20px;
  border-radius: 20px;
  cursor: pointer;
}

@media (max-width: 1024px) {
  .products-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .products-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>