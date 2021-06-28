import singleSpaCss from 'single-spa-css'
import singleSpaCallbag from './lib/single-spa-callbag-jsx'
import App from './src/index.jsx'
import pkg from './package.json'

const staticBase =
  typeof __webpack_public_path__ !== 'undefined'
    ? __webpack_public_path__
    : import.meta.url.slice(0, import.meta.url.lastIndexOf('/') + 1)

const cssLifecycles = singleSpaCss({
  cssUrls: [staticBase + 'index.css']
})

const el = document.createElement('div')
const id = `single-spa-application:${pkg.name}`
el.setAttribute('id', id)

const lifecycles = singleSpaCallbag({
  target: document.body.appendChild(el),
  rootComponent: App
})

export const bootstrap = [cssLifecycles.bootstrap, lifecycles.bootstrap]
export const mount = [cssLifecycles.mount, lifecycles.mount]
export const unmount = [lifecycles.unmount]
