import { List, Wait } from 'callbag-jsx'
import { state } from 'callbag-state'
import {
  interval,
  expr,
  map,
  pipe,
  subscribe,
  tap,
  debounce,
  source,
  flatten,
  filter,
  merge,
  combine
} from 'callbag-common'
import sample from 'callbag-sample'
import latest from 'callbag-latest'
import { createQuery, executeQuery } from './urql'

const QUERY = `query($from: ISO8601DateTime, $till: ISO8601DateTime){
  bitcoin{
    transactions(options: {desc: "date.date"}, 
      date: {since: $from, till: $till}, ) {
			txVolUSD: inputValue(calculate: sum in: USD)      
      date{date}
    }
  }
}`

export function BitcoinVolumes(_, renderer) {
  this.onBind(() => console.log('onBind:BitcoinVolumes'))
  const timer = interval(1000)

  const today = new Date()
  const priorDay = new Date(today.getTime() - 60 * 60 * 24 * 1000)
  const isoDateTimeFrom = state(priorDay.toISOString().split('T')[0])
  const isoDateTimeUntil = state(today.toISOString().split('T')[0])

  const variables = expr($ => ({
    from: $(isoDateTimeFrom),
    till: $(isoDateTimeUntil)
  }))

  const operations = pipe(
    combine(isoDateTimeFrom, isoDateTimeUntil),
    debounce(1500),
    sample(latest(variables)),

    map(variables => {
      const query = createQuery(QUERY, variables, {})
      const operation = executeQuery(query)
      return operation
    }),
    flatten
  )

  const operation = expr($ => $(operations))

  return (
    <>
      <div class="form-control">
        <label class="label">
          <span class="label-text">date from</span>
        </label>
        <input
          _state={isoDateTimeFrom}
          type="text"
          placeholder="enter a start date"
          class="input input-primary input-bordered"
        />
      </div>
      <div class="form-control">
        <label class="label">
          <span class="label-text">date until</span>
        </label>
        <input
          _state={isoDateTimeUntil}
          type="text"
          placeholder="enter an end date"
          class="input input-primary input-bordered"
        />
      </div>

      <Wait
        concurrently
        for={operation}
        with={() => <>Loading {timer}...</>}
        then={() => <BitcoinVolumesList operation={operation} />}
      />
    </>
  )
}

function BitcoinVolumesList({ operation }, renderer) {
  this.onBind(console.log('onBind:BitcoinVolumesList'))

  const transactions = pipe(
    operation,
    map(op => {
      // todo: error handling
      console.log('operation', op)
      const transactions = op?.data.bitcoin.transactions ?? null
      console.log('transactions', transactions)
      return transactions
    })
  )

  return (
    <ul>
      <List
        of={transactions}
        each={txVolUSD => (
          <li>
            <BitcoinVolume volume={txVolUSD}></BitcoinVolume>
          </li>
        )}
      />
    </ul>
  )
}
function BitcoinVolume({ volume }, renderer) {
  this.onBind(console.log('onBind:BitcoinVolume'))

  return (
    <span>
      date: {volume.sub('date').sub('date')} txVolUSD: {volume.sub('txVolUSD')}
    </span>
  )
}

const getData = () => data.bitcoin.transactions
const data = {
  bitcoin: {
    transactions: [
      {
        txVolUSD: 54384768507.072624,
        date: {
          date: '2021-07-02',
          __typename: 'Date'
        },
        __typename: 'BitcoinTransaction'
      },
      {
        txVolUSD: 56084080547.39252,
        date: {
          date: '2021-07-01',
          __typename: 'Date'
        },
        __typename: 'BitcoinTransaction'
      },
      {
        txVolUSD: 42178601414.18408,
        date: {
          date: '2021-06-30',
          __typename: 'Date'
        },
        __typename: 'BitcoinTransaction'
      },
      {
        txVolUSD: 48921895882.93275,
        date: {
          date: '2021-06-29',
          __typename: 'Date'
        },
        __typename: 'BitcoinTransaction'
      },
      {
        txVolUSD: 57518888965.63258,
        date: {
          date: '2021-06-28',
          __typename: 'Date'
        },
        __typename: 'BitcoinTransaction'
      }
    ],
    __typename: 'Bitcoin'
  }
}
