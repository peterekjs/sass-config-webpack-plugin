const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')

/**
 * Common Production Config
 *
 * @param {Required<import("../index.js").SassConfigWebpackPluginOptions>} options
 * @returns {{ module: { rules : Array<any> }, plugins: Array<(new (): any)> }}
 */
exports = module.exports = options => ({
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            exclude: /\.module\.(sa|sc|c)ss$/,
            resolve: {
                extensions: ['.scss', '.sass', '.css']
            },
            use: [{
                ...require('../lib/minicss')(options)
            }, {
                loader: require.resolve('css-loader'),
                options: {
                    importLoaders: 3,
                },
            }, {
                ...require('../lib/postcss')
            }, {
                loader: require.resolve('resolve-url-loader'),
            }, {
                ...require('../lib/sass')(options)
            }],
        }, {
            test: /\.module\.(sa|sc|c)ss$/,
            resolve: {
                extensions: ['.scss', '.sass', '.css']
            },
            use: [{
                ...require('../lib/minicss')(options)
            }, {
                loader: require.resolve('css-loader'),
                options: {
                    importLoaders: 3,
                    modules: true,
                },
            }, {
                ...require('../lib/postcss')
            }, {
                loader: require.resolve('resolve-url-loader'),
            }, {
                ...require('../lib/sass')(options)
            }],
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: options.filename,
            chunkFilename: options.chunkFilename,
        }),
        // Minify css - but use only safe css-nano transformations
        // https://github.com/facebook/create-react-app/pull/4706
        new OptimizeCSSAssetsPlugin({
            cssProcessorOptions: {
                parser: require('postcss-safe-parser'),
                safe: true,
            },
        }),
    ],
})
