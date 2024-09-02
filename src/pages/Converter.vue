<template>
  <div>
    <div class="label">From</div>
    <NInputNumber
      v-model:value="fromCurrencyValue"
      :show-button="false"
    >
      <template #prefix>
        <div class="currency-switcher">
          <NSelect v-model:value="fromCurrency" :options="fromCurrencyOptions" />
        </div>
      </template>
    </NInputNumber>
  </div>
  <div class="switch-wrapper">
    <NButton @click="switchCurrencies">Switch</NButton>
  </div>
  <div>
    <div class="label">To</div>
    <NInputNumber
      v-model:value="toCurrencyValue"
      :show-button="false"
    >
      <template #prefix>
        <div class="currency-switcher">
          <NSelect v-model:value="toCurrency" :options="toCurrencyOptions" />
        </div>
      </template>
    </NInputNumber>
  </div>
</template>

<script setup lang="ts">
import { NButton, NInputNumber, NSelect, SelectOption } from 'naive-ui';
import { USED_CURRENCIES } from '@/contsants';
import { ref } from 'vue';
import { useCurrencyRates } from '@/composables/useCurrencyRates';
import { computed } from 'vue';
import { toValue } from 'vue';
import { watch } from 'vue';
import { nextTick } from 'vue';

const props = defineProps({
  currency: {
    type: String,
    required: true,
  },
});

const options: SelectOption[] = USED_CURRENCIES.map((value) => ({
  value,
  label: value.toLocaleUpperCase(),
}));

const fromCurrency = ref(props.currency);
const toCurrency = ref(
  USED_CURRENCIES.filter((curr) => curr !== fromCurrency.value)[0]
);
const fromCurrencyValue = ref(0);
const toCurrencyValue = ref(0);

const [toCurrencyOptions, fromCurrencyOptions] = [fromCurrency, toCurrency].map(
  (currencyRef) =>
    computed(() => options.filter(({ value }) => value !== currencyRef.value))
);

const switchCurrencies = () => {
  [
    fromCurrency.value,
    fromCurrencyValue.value,
    toCurrency.value,
  ] =
  [
    toCurrency.value,
    toCurrencyValue.value,
    fromCurrency.value,
  ]
}

const currencyRates = useCurrencyRates(fromCurrency);

const calculate = (type: 'from'|'to') => {
  const [calcCurr, calcValue] = type === 'from'
    ? [fromCurrency, fromCurrencyValue]
    : [toCurrency, toCurrencyValue]
  const [setCurr, setValue] = type === 'from'
    ? [toCurrency, toCurrencyValue]
    : [fromCurrency, fromCurrencyValue]

  const rates = toValue(currencyRates)
  if (!rates) return

  const newValue = type === 'from'
    ? calcValue.value / rates[setCurr.value]
    : calcValue.value * rates[calcCurr.value]

  const formattedNewValue = Number(newValue.toPrecision(2))

  if (formattedNewValue === setValue.value) return
  setValue.value = formattedNewValue
}


const setFromWatcher = () => watch(
  () => [fromCurrency.value, fromCurrencyValue.value],
  () => {
    toWatcher()
    calculate('from')
    nextTick(() => {
      toWatcher = setToWatcher()
    })
  }
)

const setToWatcher = () => watch(
  () => [toCurrency.value, toCurrencyValue.value],
  () => {
    fromWatcher()
    calculate('to')
    nextTick(() => {
      fromWatcher = setFromWatcher()
    })
  }
)

let fromWatcher = setFromWatcher()
let toWatcher = setToWatcher()



</script>

<style lang="css" scoped>
.label {
  text-align: center;
  font-size: 1.1rem;
}
.switch-wrapper {
  display: flex;
  justify-content: center;
  margin: 20px 0;
}
.currency-switcher {
  width: 100px;
  margin-left: calc(var(--n-padding-left) * -1);
}
</style>
