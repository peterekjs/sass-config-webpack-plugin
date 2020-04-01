/**
* @param {Required<import("../index.js").SassConfigWebpackPluginOptions>} options
*/
exports = module.exports = options => ({
    loader: require.resolve('sass-loader'),
    options: {
        implementation: options.implementation || require('sass'),
        sourceMap: true,
    },
})
