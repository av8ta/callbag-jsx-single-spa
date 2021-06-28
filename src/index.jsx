import singleSpaLogoUrl from '../single-spa-logo.png'
import { expr, filter, interval, map, pipe } from 'callbag-common'
import { makeRenderer } from 'callbag-jsx'
import { state } from 'callbag-state'

const renderer = makeRenderer()
const name = state('pipe function')
const timer = interval(1000)

const format = n => n[0].toUpperCase() + n.substr(1)

const displayNamePipe = pipe(
  name,
  filter(n => n.length > 0),
  map(format)
)

export default function (target) {
  target = target || document.body.appendChild(document.createElement('div'))

  renderer
    .render(
      <>
        <div className="snowpack-test">
          <img
            src={singleSpaLogoUrl}
            alt="single-spa logo"
            style={{ width: '40px' }}
          />
          Hello from your react + snowpack + single-spa application
        </div>
        <div class="snowpack-test">
          Hola, good ol' {displayNamePipe} to make streams with
        </div>
        <input _state={name} type="text" placeholder="name ..." />

        <br />
        <br />

        <div>
          <small>
            You have been here for {expr($ => $(timer, -1) + 1)} seconds!
          </small>
        </div>
      </>
    )
    .on(target)
}
