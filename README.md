# [callbag-jsx-single-spa](https://github.com/av8ta/callbag-jsx-single-spa)

This project shows how to create a [callbag-jsx](https://github.com/loreanvictor/callbag-jsx/) [single-spa](https://single-spa.js.org/) application built with [Snowpack](https://www.snowpack.dev/)

### Standalone Mode

```sh
yarn start
```

Runs the app in standalone development mode.
Open http://localhost:8080 to view it in the browser.

The page will reload if you make edits.
You will also see any lint errors in the console.

### Integrated Mode

```sh
yarn start

open 'http://single-spa-playground.org/playground/instant-test?name=callbag-jsx-single-spa&framework=other&useNativeModules=true&url=http%3A%2F%2Flocalhost%3A8080%2Findex.js'
```

You can load this application into a single-spa root config via import-map-overrides. See more at https://single-spa.js.org/docs/recommended-setup#local-development

The URL to use for import-map-overrides is http://localhost:8080/index.js

### Building

```sh
yarn build
```

This produces a `build` directory. Note the changes in the `snowpack.config.js`, which alter the output bundle to work as a SystemJS module.
