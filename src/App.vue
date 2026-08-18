<script setup>
import { ref } from 'vue';
import AppHeader from './components/AppHeader.vue';
import FilterModal from './components/FilterModal.vue';
import ProductDetailsModal from './components/ProductDetailsModal.vue';

import WelcomeView from './views/WelcomeView.vue';
import CollectionsView from './views/CollectionsView.vue';
import CatalogView from './views/CatalogView.vue';

const currentView = ref('welcome');
</script>

<template>
  <div id="app">
    <!-- Render AppHeader ONLY when NOT on the welcome page -->
    <AppHeader v-if="currentView !== 'welcome'" @navigate="currentView = $event" />
    
    <main>
      <WelcomeView v-if="currentView === 'welcome'" @navigate="currentView = $event" />
      <CollectionsView v-else-if="currentView === 'collections'" @navigate="currentView = $event" />
      <CatalogView v-else-if="currentView === 'catalog'" />
    </main>

    <FilterModal />
    <ProductDetailsModal />
  </div>
</template>