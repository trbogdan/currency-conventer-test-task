import { computed, MaybeRef, toValue } from "vue";
import { useCurrencyQuery } from "../queryFn/useCurrencyQuery";
import { USED_CURRENCIES } from "@/contsants";

export const useCurrencyRates = (currency: MaybeRef<string>) => {
  const { data } = useCurrencyQuery()

  return computed(() => {
    const rates = toValue(data)
    const selectedCurrency = toValue(currency)
    if (!rates) return null

    return Object.entries(rates)
      .filter(([curr]) => {
        const [from, to] = curr.split('-')
        return USED_CURRENCIES.includes(from) && to === selectedCurrency
      })
      .reduce<Record<string, number>>((acc, [curr, rate]) => ({
        ...acc,
        [curr.split('-')[0]]: rate
      }), {})
  })
}
