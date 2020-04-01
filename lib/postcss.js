exports = module.exports = {
    loader: require.resolve('postcss-loader'),
    options: {
        plugins: loader => [
            require('postcss-flexbugs-fixes'),
            require('autoprefixer')({
                // flexbox: "no-2009" will add prefixes only for final and IE versions of specification.
                // @see https://github.com/postcss/autoprefixer#disabling
                flexbox: 'no-2009',
            }),
            require('iconfont-webpack-plugin')({
                resolve: loader.resolve,
            }),
        ],
        sourceMap: true,
    },
}
