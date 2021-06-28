import singleSpaLogoUrl from '../single-spa-logo.png'
import {
  expr,
  filter,
  interval,
  map,
  pipe,
  subscribe,
  tap
} from 'callbag-common'
import { makeRenderer } from 'callbag-jsx'
import { state } from 'callbag-state'
import { client } from './urql'
import {
  pipe as wonkaPipe,
  subscribe as wonkaSubscribe,
  toCallbag,
  fromCallbag
} from 'wonka'

const renderer = makeRenderer()
const name = state('pipe')
const continentCode = state('AS')

const timer = interval(1000)

const format = n => n[0].toUpperCase() + n.substr(1)

const displayNamePipe = pipe(
  name,
  filter(n => n.length > 0),
  map(format)
)

const displayNamePipelineOperator =
  name |> filter(n => n.length > 0) |> map(format)

const QUERY = `
  query($code:ID!){
  continent(code: $code){
    code
    name
    countries{
      name
      emoji
      emojiU
    }
  }
}
`

// const code = pipe(
//   continentCode,
//   tap(c => console.log(c)),
//   fromCallbag
// )

const wonkaCode = wonkaPipe(
  fromCallbag(continentCode),
  wonkaSubscribe(e => console.log('callbag to wonka', e))
)

const continentQuery = wonkaPipe(
  client.query(QUERY, { code: 'AS' }),
  // wonkaSubscribe(result => {
  //   console.log(result) // { data: ... }
  // })
  toCallbag
)

const continent = continentQuery |> map(({ data }) => data?.continent?.name)

// const continent = pipe(
//   continentQuery,
//   // tap(({ data }) => console.log(data.continent.name)),
//   map(({ data }) => data?.continent?.name)
// )

export default function (target) {
  target = target || document.body.appendChild(document.createElement('div'))

  renderer
    .render(
      <>
        <div class="snowpack-test">
          <img
            src={singleSpaLogoUrl}
            alt="single-spa logo"
            style={{ width: '40px' }}
          />
          Hello from your react + snowpack + single-spa application
        </div>
        <div class="snowpack-test">
          <p>Hola, good ol' {displayNamePipe} function to make streams with</p>
          <p>
            or use babel to compile the fancy new {displayNamePipelineOperator}
            line operator
          </p>
        </div>
        <input _state={name} type="text" placeholder="name ..." />

        <br />
        <br />

        <div>
          <small>
            You have been here for {expr($ => $(timer, -1) + 1)} seconds!
          </small>
        </div>
        <div>
          <input
            _state={continentCode}
            type="text"
            placeholder="continent code e.g. AF for Africa ..."
          />

          <p> {continent}</p>
        </div>
      </>
    )
    .on(target)
}
