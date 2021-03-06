const MiniCssExtractPlugin = require('mini-css-extract-plugin')

/**
 * Common Development Config
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
                ...require('../lib/minicss')(options, {
                    hmr: true,
                    reloadAll: true,
                })
            }, {
                loader: require.resolve('css-loader'),
                options: {
                    sourceMap: true,
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
                ...require('../lib/minicss')(options, {
                    hmr: true,
                    reloadAll: true,
                })
            }, {
                loader: require.resolve('css-loader'),
                options: {
                    sourceMap: true,
                    importLoaders: 3,
                    module: true,
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
            ignoreOrder: false,
        }),
    ]
})
