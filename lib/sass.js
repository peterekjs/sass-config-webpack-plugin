/**
* @param {Required<import("../index.js").SassWebpackPluginOptions>} options
*/
exports = module.exports = options => ({
    loader: require.resolve('sass-loader'),
    options: {
        implementation: options.implementation || require('sass'),
        sourceMap: true,
    },
})
