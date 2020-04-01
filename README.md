# sass-config-webpack-plugin
Preset for Dart Sass webpack configuration

Basically does the same as ⚙️**[scss-config-webpack-plugin](https://github.com/namics/webpack-config-plugins/tree/master/packages/scss-config-webpack-plugin)** but uses **[Dart Sass](https://www.npmjs.com/package/sass)** as primary compiler.

## Installation
```bash
npm i -D @peterek/sass-config-webpack-plugin
```

## Application

```js
const SassWebpackPlugin = require('@peterek/sass-config-webpack-plugin')

module.exports = {
    plugins: [
        new SassWebpackPlugin()
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
