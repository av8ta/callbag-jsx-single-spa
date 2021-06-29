import { expr, interval } from 'callbag-common'
import { makeRenderer } from 'callbag-jsx'
// import { Route } from 'callbag-router'
import { Records } from './records'
import { BitcoinVolumes } from './bitcoin-volume'
import { Markdown } from './markdown'

const renderer = makeRenderer()

const timer = interval(1000)

export default function (target) {
  target = target || document.body.appendChild(document.createElement('div'))

  renderer
    .render(
      <div class="container mx-auto px-4">
        <div class="space-y-4">
          <small>
            You have been here for {expr($ => $(timer, -1) + 1)} seconds!
          </small>
          <div>
            <Records />
          </div>
          <div>
            <Markdown />
          </div>
          <div>
            <h1>Bitcoin Daily Volumes</h1>
            <BitcoinVolumes />
          </div>
        </div>
      </div>
    )
    .on(target)
}
