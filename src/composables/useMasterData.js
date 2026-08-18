import { ref, computed, onMounted } from 'vue';
import { fetchMasterData } from '../services/excelService';

const products = ref([]);
const loading = ref(true);
const error = ref(null);

const searchQuery = ref('');
const selectedCatalog = ref(null);
const selectedCategory = ref(null);
const selectedProduct = ref(null);
const isFilterOpen = ref(false);
const filterCategories = ref([]);
const filterViewTypes = ref([]);

export function useMasterData() {
  const loadData = async () => {
    if (products.value.length > 0) return;
    try {
      loading.value = true;
      products.value = await fetchMasterData();
    } catch (err) {
      error.value = 'Failed to load master data.';
      console.error(err);
    } finally {
      loading.value = false;
    }
  };

  onMounted(loadData);

  const availableCatalogs = computed(() => {
    const list = products.value.map(p => p.catalog).filter(Boolean);
    return [...new Set(list)];
  });

  const filteredProducts = computed(() => {
    return products.value.filter(p => {
      // 1. Catalog Filter (Case-insensitive matching)
      if (selectedCatalog.value) {
        const target = selectedCatalog.value.trim().toLowerCase();
        const itemCatalog = (p.catalog || '').trim().toLowerCase();
        if (itemCatalog !== target) return false;
      }

      // 2. Search Query Filter
      if (searchQuery.value) {
        const q = searchQuery.value.toLowerCase().trim();
        const matchName = p.name.toLowerCase().includes(q);
        const matchId = p.id.toLowerCase().includes(q);
        const matchCategory = p.category.toLowerCase().includes(q);
        const matchCatalog = p.catalog.toLowerCase().includes(q);
        const matchKeywords = p.keywords.some(k => k.toLowerCase().includes(q));
        if (!matchName && !matchId && !matchCategory && !matchCatalog && !matchKeywords) return false;
      }

      // 3. Filter Modal Tags
      if (filterCategories.value.length > 0) {
        const matchesCat = filterCategories.value.some(cat => 
          p.category.toLowerCase().includes(cat.toLowerCase()) || 
          p.collection.toLowerCase().includes(cat.toLowerCase()) ||
          p.keywords.some(k => k.toLowerCase().includes(cat.toLowerCase()))
        );
        if (!matchesCat) return false;
      }

      return true;
    });
  });

  const clearAllFilters = () => {
    searchQuery.value = '';
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
    selectedCatalog,
    selectedCategory,
    selectedProduct,
    isFilterOpen,
    filterCategories,
    filterViewTypes,
    availableCatalogs,
    filteredProducts,
    clearAllFilters
  };
}