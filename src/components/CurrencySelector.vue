<template>
  <n-select v-model:value="value" :options="options" />
</template>

<script setup lang="ts">
import { USED_CURRENCIES } from '@/contsants';
import { NSelect, SelectOption } from 'naive-ui'

const value = defineModel({
  type: String,
})

const options: SelectOption[] = USED_CURRENCIES.map(value => ({
  value,
  label: value.toLocaleUpperCase()
}))

</script>