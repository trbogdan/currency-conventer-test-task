import { useQuery } from "@tanstack/vue-query"

type CurrencyApiResp = Record<`${string}-${string}`, number>

export const useCurrencyQuery = () => useQuery<CurrencyApiResp>({
    queryKey: ['currency', 'all'],
    queryFn: async () => {
      const resp = await fetch('https://status.neuralgeneration.com/api/currency')
      if (!resp.ok) {
        throw new Error("Error with getting api");
      }
      return resp.json()
    },
    staleTime: 30 * 1000
  })
