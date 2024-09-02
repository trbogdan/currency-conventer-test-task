<template>
  <NConfigProvider :theme="darkTheme" class="app" >
    <header>
      <RouterLink :to="{ name: 'main' }">Home</RouterLink>
      <RouterLink :to="{ name: 'converter' }">Converter</RouterLink>
      <div>
        <CurrencySelector v-model:model-value="selectedCurrency" />
      </div>
    </header>
    <NCard class="content">
      <RouterView v-model:currency="selectedCurrency" />
    </NCard>
  </NConfigProvider>
</template>


<script setup lang="ts">
import { darkTheme, NConfigProvider, NCard } from 'naive-ui'
import CurrencySelector from './components/CurrencySelector.vue';
import { useSelectedCurrency } from './composables/useSelectedCurrency';

const selectedCurrency = useSelectedCurrency()
</script>

<style scoped>
.app {
  min-height: 100vh;
}
.app header {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  padding: 0px 15px;
  box-shadow: 0px 0px 10px 0px rgb(160 160 160 / 20%);
}
.app header>* {
  flex: 200px 0 1;
  margin: 10px 5px;
}
.content {
  width: 100%;
  max-width: 600px;
  margin: 5vh auto 0;
}
</style>
