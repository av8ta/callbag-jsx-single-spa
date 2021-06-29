import { createClient, createRequest, defaultExchanges } from '@urql/core'
import { devtoolsExchange } from '@urql/devtools'
import { pipe, toCallbag } from 'wonka'
import { state } from 'callbag-state'

export const client = createClient({
  // url: 'https://countries.trevorblades.com/',
  url: 'https://graphql.bitquery.io',
  exchanges: [devtoolsExchange, ...defaultExchanges]
  // createContext

  // fetchOptions: () => {
  //   const token = getToken()
  //   return {
  //     headers: { authorization: token ? `Bearer ${token}` : '' }
  //   }
  // }
})

// function createContext({ operation, context }) {
//   operation.context = { ...operation.context, ...context }
// }

/**
 * urql uses wonka streams so we
 * execute the query in a wonka stream
 * and then convert to a callbag source
 * */
export function executeQuery(request) {
  return pipe(client.executeQuery(request), toCallbag)
}

/**
 * return previous request if the same as current request
 * or return new request
 * */
export function useRequest(query, variables, context) {
  const { previousRequest } = context

  /** create new request */
  const request = createRequest(query, variables)
  request.context = context
  console.log('request', request)

  /**
   * check key: return previous or new request
   * if the key is the same it's the same request
   * "This key is a hash number of the query document
   * and variables and uniquely identifies our GraphQLRequest."
   * https://github.com/FormidableLabs/urql/blob/main/docs/architecture.md#requests-and-operations-on-the-client
   * */
  const prev = previousRequest.get()
  if (prev && prev.key === request.key) {
    return prev
  }
  previousRequest.set(request)

  return request
}

export function createQuery(query, variables, context) {
  const previousRequest = context?.previousRequest ?? state()
  const request = useRequest(query, variables, { ...context, previousRequest })
  return request
}
