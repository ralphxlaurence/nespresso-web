<script setup>
import { ref } from 'vue';
import { useMasterData } from './composables/useMasterData';
import WelcomeView from './views/WelcomeView.vue';
import CollectionsView from './views/CollectionsView.vue';
import CatalogView from './views/CatalogView.vue';
import AppHeader from './components/AppHeader.vue';
import FilterModal from './components/FilterModal.vue';
import ProductDetailsModal from './components/ProductDetailsModal.vue';

const currentView = ref('welcome');
const { selectedProduct } = useMasterData();

// Handles view switching (e.g. from catalog back to collections)
const handleNavigate = (view) => {
  currentView.value = view;
};

// Handles product click to open modal
const handleSelectProduct = (product) => {
  selectedProduct.value = product;
};
</script>

<template>
  <div class="app-root">
    <!-- Welcome View -->
    <WelcomeView v-if="currentView === 'welcome'" @navigate="handleNavigate" />

    <!-- Main Application Flow -->
    <template v-else>
      <AppHeader @navigate="handleNavigate" />

      <main class="main-content">
        <CollectionsView 
          v-if="currentView === 'collections'" 
          @navigate="handleNavigate" 
        />
        <CatalogView 
          v-if="currentView === 'catalog'" 
          @navigate="handleNavigate" 
          @select-product="handleSelectProduct"
        />
      </main>

      <!-- Global Modals -->
      <FilterModal />
      <ProductDetailsModal />
    </template>
  </div>
</template>

<style scoped>
.app-root {
  min-height: 100vh;
  background-color: #ffffff;
}
</style>