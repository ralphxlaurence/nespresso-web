<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useMasterData } from '../composables/useMasterData';

const { selectedProduct } = useMasterData();

const closeModal = () => {
  selectedProduct.value = null;
};

const handleKeyDown = (e) => {
  if (e.key === 'Escape' && selectedProduct.value) {
    closeModal();
  }
};

onMounted(() => {
  window.addEventListener('keydown', handleKeyDown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeyDown);
});
</script>

<template>
  <Teleport to="body">
    <div v-if="selectedProduct" class="modal-overlay" @click.self="closeModal">
      <div class="modal-card">
        <button class="close-btn" @click="closeModal">✕</button>

        <div class="modal-body">
          <!-- Left Image Preview -->
          <div class="image-container">
            <img 
              v-if="selectedProduct.image || selectedProduct.imageUrl" 
              :src="selectedProduct.image || selectedProduct.imageUrl" 
              :alt="selectedProduct.name || 'Product Image'" 
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

          <!-- Right Product Details -->
          <div class="details-container">
            <h2 class="title">PRODUCT DETAILS</h2>

            <div class="field-list">
              <div class="field-pill">
                <span class="label">Product ID:</span>
                <span class="value">{{ selectedProduct.id || 'N/A' }}</span>
              </div>

              <div class="field-pill">
                <span class="label">Product name:</span>
                <span class="value">{{ selectedProduct.name || 'N/A' }}</span>
              </div>

              <div class="field-pill">
                <span class="label">Category:</span>
                <span class="value">{{ selectedProduct.category || 'N/A' }}</span>
              </div>

              <div class="field-pill">
                <span class="label">Collection:</span>
                <span class="value">{{ selectedProduct.collection || 'N/A' }}</span>
              </div>

              <div class="field-pill">
                <span class="label">Dimension:</span>
                <span class="value">{{ selectedProduct.dimension || 'N/A' }}</span>
              </div>

              <div class="field-pill">
                <span class="label">Capacity:</span>
                <span class="value">{{ selectedProduct.capacity || 'N/A' }}</span>
              </div>

              <div class="field-pill">
                <span class="label">Color:</span>
                <span class="value">{{ selectedProduct.color || 'N/A' }}</span>
              </div>

              <div class="field-pill">
                <span class="label">View Type:</span>
                <span class="value">{{ selectedProduct.viewType || 'N/A' }}</span>
              </div>

              <div class="field-pill">
                <span class="label">File Type:</span>
                <span class="value">{{ selectedProduct.fileType || '' }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
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

.modal-card {
  background-color: #ffffff;
  width: 100%;
  max-width: 720px;
  border-radius: 8px;
  padding: 32px;
  position: relative;
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 20px;
  background: transparent;
  border: none;
  font-size: 1.25rem;
  color: #8c6e43;
  cursor: pointer;
  padding: 4px;
}

.modal-body {
  display: flex;
  gap: 28px;
  align-items: stretch;
}

/* Left Image Box */
.image-container {
  flex: 1;
  background-color: #faf9f5;
  border: 1px solid #f0eee6;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
  min-height: 320px;
}

.product-image {
  max-width: 100%;
  max-height: 280px;
  object-fit: contain;
}

.placeholder-icon {
  width: 64px;
  height: 64px;
  color: #cccccc;
}

/* Right Details Column */
.details-container {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.title {
  font-size: 1.1rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #8c6e43;
  text-align: center;
  margin: 0 0 16px 0;
}

.field-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

/* Rounded Pill Rows */
.field-pill {
  background-color: #faf9f5;
  border: 1px solid #f0eee6;
  border-radius: 16px;
  padding: 6px 16px;
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.8rem;
  min-height: 28px;
  box-sizing: border-box;
}

.label {
  color: #8c6e43;
  font-weight: 600;
}

.value {
  color: #777777;
  font-weight: 400;
}

@media (max-width: 640px) {
  .modal-body {
    flex-direction: column;
  }
}
</style>