import { createClient, defaultExchanges } from '@urql/core'

export const client = createClient({
  url: 'https://countries.trevorblades.com/',
  exchanges: defaultExchanges

  // fetchOptions: () => {
  //   const token = getToken()
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : '' }
  //   }
  // }
})
