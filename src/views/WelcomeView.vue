<script setup>
import nespressoLogo from '../assets/icons/nespresso-logo.png';

defineEmits(['navigate']);
</script>

<template>
  <div class="welcome-container">
    <!-- Top Nespresso Logo Icon -->
    <div class="logo-header">
      <img :src="nespressoLogo" alt="Nespresso Logo" class="nespresso-icon" />
    </div>

    <!-- Main White Card -->
    <div class="welcome-card">
      <h1 class="heading-welcome">WELCOME</h1>
      <span class="subheading-to">TO</span>
      
      <!-- Brand Title with Vertical Divider -->
      <div class="brand-title">
        <span class="brand-nespresso">NESPRESSO</span>
        <span class="brand-divider">|</span>
        <span class="brand-vault">THE VAULT</span>
      </div>

      <!-- Description Text -->
      <p class="description">
        Everything you need to discover, organize, and curate Nespresso<br />
        products for impactful creative execution, all in one place.
      </p>

      <!-- Sub-categories line -->
      <div class="category-pills">
        Accessories <span>|</span> Coffee <span>|</span> Machines
      </div>

      <!-- Action Button -->
      <button class="btn-get-started" @click="$emit('navigate', 'collections')">
        Get started
      </button>
    </div>
  </div>
</template>

<style scoped>
.welcome-container {
  min-height: 100vh;
  background-color: #000000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  box-sizing: border-box;
}

.logo-header {
  margin-bottom: 24px;
  display: flex;
  justify-content: center;
}

.nespresso-icon {
  width: 32px;
  height: 32px;
  color: #ffffff;
}

.welcome-card {
  background-color: #f9f8f6;
  width: 100%;
  max-width: 680px;
  border-radius: 16px;
  padding: 56px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
  box-sizing: border-box;
}

.heading-welcome {
  font-size: 2.8rem;
  font-weight: 700;
  letter-spacing: 4px;
  color: #000000;
  margin: 0;
  line-height: 1.1;
}

.subheading-to {
  font-size: 0.9rem;
  font-weight: 600;
  letter-spacing: 3px;
  color: #000000;
  margin: 16px 0;
}

.brand-title {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 28px;
}

.brand-nespresso {
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 2px;
  color: #000000;
}

.brand-divider {
  font-size: 1.8rem;
  font-weight: 300;
  color: #000000;
}

.brand-vault {
  font-size: 1.8rem;
  font-weight: 800;
  letter-spacing: 2px;
  color: #000000;
}

.description {
  font-size: 0.9rem;
  color: #555555;
  line-height: 1.5;
  max-width: 480px;
  margin: 0 0 24px 0;
  font-weight: 400;
}

.category-pills {
  font-size: 0.85rem;
  color: #444444;
  margin-bottom: 32px;
  font-weight: 400;
}

.category-pills span {
  margin: 0 8px;
  color: #888888;
}

.btn-get-started {
  background-color: #000000;
  color: #ffffff;
  padding: 12px 36px;
  border-radius: 24px;
  font-size: 0.9rem;
  font-weight: 400;
  letter-spacing: 0.5px;
  transition: opacity 0.2s ease, transform 0.1s ease;
}

.btn-get-started:hover {
  opacity: 0.88;
  transform: translateY(-1px);
}
</style>