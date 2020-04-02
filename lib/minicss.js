const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

/**
* @param {Required<import("../index.js").SassConfigWebpackPluginOptions>} options
*/
exports = module.exports = (options, extend = {}) => ({
    loader: MiniCssExtractPlugin.loader,
    options: {
        // The css file will be probably be placed in a sub directory.
        // To prevent invalid ressource urls this additional sub folder
        // has to be taken into account for the relative path calculation
        // eslint-disable-next-line no-useless-escape
        publicPath: (path.relative(path.dirname(options.filename), '.') + path.sep).replace(/^[\\\/]$/, ''),
        ...extend
    },
})
