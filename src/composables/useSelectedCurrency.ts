import { ref, watch } from "vue"
import { DEFAULT_CURRENCY, USED_CURRENCIES } from "../contsants"

export const useSelectedCurrency = () => {
  const storageValue = localStorage.getItem('selectedCurrency')
  const defaultValue = storageValue && USED_CURRENCIES.includes(storageValue) ? storageValue : DEFAULT_CURRENCY

  const value = ref(defaultValue)

  watch(
    () => value,
    current => localStorage.setItem('selectedCurrency', current.value)
  )

  return value
}