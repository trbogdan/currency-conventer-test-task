<template>
  <div v-if="!currencyData">
    No currency rates to show
  </div>
  <div v-else>
    <div
      v-for="(value, curr) in currencyData"
      :key="curr"
      class="list-item"
    >
      <span class="list-item-title">{{ curr.toLocaleUpperCase() }}</span>:
      <span>{{ value }} {{ currency.toLocaleUpperCase() }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCurrencyRates } from '../composables/useCurrencyRates';

const currency = defineModel('currency', {
  required: true,
  type: String
})

const currencyData = useCurrencyRates(currency)
</script>

<style lang="css" scoped>
.list-item {
  font-size: 1.5rem;
  margin: 20px 0;
}
.list-item-title {
  font-size: 1.7rem;
  font-weight: bold;
}
</style>