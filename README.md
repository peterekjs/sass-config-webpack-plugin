# sass-config-webpack-plugin
Preset for Dart Sass webpack configuration

## Installation
```bash
npm i -D @peterek/sass-config-webpack-plugin
```

## Application

```js
const SassWebpackPlugin = require('@peterek/sass-config-webpack-plugin')

module.exports = {
    plugins: [
        new SassWebpackPlugin(/* options */)
    ]
}

```

## Options

### implementation
The special implementation option determines which implementation of Sass to use.

By default the loader resolves into using Dart Sass. If you prefer to use different package you can specify it with following setup:

```js
module.exports = {
    plugins: [
        new SassWebpackPlugin({
            implementation: require('node-sass'),
        })
    ]
}
```
