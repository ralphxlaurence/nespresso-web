import { ref, computed } from 'vue';
import { fetchMasterData } from '../services/excelService';

// Module-level shared state
const products = ref([]);
const loading = ref(false);
const error = ref(null);

const searchQuery = ref('');
const appliedSearchQuery = ref('');
const selectedCatalog = ref(null);
const selectedCategory = ref(null);
const selectedProduct = ref(null);
const isFilterOpen = ref(false);

const filterCategories = ref([]);
const filterViewTypes = ref([]);

const loadData = async () => {
  if (products.value.length > 0 || loading.value) return;
  try {
    loading.value = true;
    error.value = null;
    products.value = await fetchMasterData();
    console.log("Master data loaded successfully. Total items:", products.value.length);
  } catch (err) {
    error.value = 'Failed to load master data.';
    console.error(err);
  } finally {
    loading.value = false;
  }
};

// Automatically trigger data load immediately upon module import
loadData();

export function useMasterData() {
  const availableCatalogs = computed(() => {
    const list = products.value.map(p => p.catalog || p.collection || p['Catalog'] || p['Collection']).filter(Boolean);
    return [...new Set(list)];
  });

  const filteredProducts = computed(() => {
    return products.value.filter(p => {
      // 1. Extract values dynamically to handle flexible Excel column headers
      const rawCatalog = p.catalog ?? p.collection ?? p['Catalog'] ?? p['Collection'] ?? p.category ?? '';
      const pCatalog = String(rawCatalog).trim().toLowerCase();

      const rawId = p.id ?? p.productId ?? p['Product ID'] ?? p['PRODUCT ID'] ?? p.articleNumber ?? '';
      const pId = String(rawId).trim().toLowerCase();

      const pName = String(p.name || p['Product Name'] || '').toLowerCase();
      const pCategory = String(p.category || p['Category'] || '').toLowerCase();
      const pCollection = String(p.collection || p['Collection'] || '').toLowerCase();
      const pColor = String(p.color || p['Color'] || '').toLowerCase();

      const pKeywords = Array.isArray(p.keywords) 
        ? p.keywords.map(k => String(k).toLowerCase()) 
        : [String(p.keywords || '').toLowerCase()];

      // 2. Catalog / Collection Filter
      if (selectedCatalog.value) {
        const target = selectedCatalog.value.trim().toLowerCase();
        
        const matchesCatalog = pCatalog.includes(target) || target.includes(pCatalog);
        const matchesCollection = pCollection.includes(target) || target.includes(pCollection);
        const matchesCategory = pCategory.includes(target) || target.includes(pCategory);

        if (!matchesCatalog && !matchesCollection && !matchesCategory) {
          return false;
        }
      }

      // 3. Search Query Filter
      if (appliedSearchQuery.value.trim() !== '') {
        const q = appliedSearchQuery.value.trim().toLowerCase();

        const matchId = pId.includes(q);
        const matchName = pName.includes(q);
        const matchCategory = pCategory.includes(q);
        const matchCatalog = pCatalog.includes(q);
        const matchCollection = pCollection.includes(q);
        const matchColor = pColor.includes(q);
        const matchKeywords = pKeywords.some(k => k.includes(q));

        if (!matchId && !matchName && !matchCategory && !matchCatalog && !matchCollection && !matchColor && !matchKeywords) {
          return false;
        }
      }

      // 4. Modal Tag Filters
      if (filterCategories.value.length > 0) {
        const matchesCat = filterCategories.value.some(cat => {
          const c = cat.toLowerCase();
          return pCategory.includes(c) || pCollection.includes(c) || pKeywords.some(k => k.includes(c));
        });
        if (!matchesCat) return false;
      }

      return true;
    });
  });

  const triggerSearch = () => {
    selectedCatalog.value = null; // Clear catalog filter so search checks ALL products
    appliedSearchQuery.value = searchQuery.value;
  };

  const clearSearch = () => {
    searchQuery.value = '';
    appliedSearchQuery.value = '';
  };

  const clearAllFilters = () => {
    searchQuery.value = '';
    appliedSearchQuery.value = '';
    selectedCatalog.value = null;
    selectedCategory.value = null;
    filterCategories.value = [];
    filterViewTypes.value = [];
  };

  return {
    products,
    loading,
    error,
    searchQuery,
    appliedSearchQuery,
    selectedCatalog,
    selectedCategory,
    selectedProduct,
    isFilterOpen,
    filterCategories,
    filterViewTypes,
    availableCatalogs,
    filteredProducts,
    loadData,
    triggerSearch,
    clearSearch,
    clearAllFilters
  };
}