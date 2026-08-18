<script setup>
import ProductCard from './ProductCard.vue';

defineProps({
  products: {
    type: Array,
    required: true
  }
});
</script>

<template>
  <div v-if="products.length > 0" class="product-grid">
    <ProductCard 
      v-for="(prod, index) in products" 
      :key="prod.id || index" 
      :product="prod" 
    />
  </div>
  <div v-else class="empty-state">
    <p>No matching items found.</p>
  </div>
</template>

<style scoped>
.product-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}

.empty-state {
  text-align: center;
  padding: 80px 20px;
  color: #888888;
  font-size: 0.95rem;
}

@media (max-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 640px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: 12px;
  }
}
</style>