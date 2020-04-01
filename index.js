// @ts-check
// webpack compiler options properties are marked as optional
// although most of them are not optional
// as a temporary work around this this is fixed with
// `import('ts-essentials').DeepRequired`
/** @typedef {import('ts-essentials').DeepRequired<import("webpack").Compiler>} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{ mode?: 'production' | 'development'; implementation?: any; filename?: string; chunkFilename?: string; }} SassConfigWebpackPluginOptions
 */
const defaultOptions = {}
/**
 * Use compiler.options.output configuration also for css
 * Replace folder names called js and extends called js to css
 * E.g. 'js/x.[id].js' -> 'css/x.[id].css'
 *
 * @see https://github.com/namics/webpack-config-plugins/blob/a48a609a0d730bfbe16f493e207562bfa540aed0/packages/scss-config-webpack-plugin/src/ScssConfigWebpackPlugin.js#L38-L44
 *
 * @param {WebpackCompiler['options']['output']} output
 * @returns {{ filename: string; chunkFilename: string; }}
 */
function fixFileNames (output)
{
    const search = /(^|\/|\\|\.)js($|\/|\\)/g
    const replace = '$1css$2'

    const filename = typeof output.filename === 'string'
        ? output.filename.replace(search, replace)
        : '[id].css'
    const chunkFilename = output.chunkFilename.replace(search, replace)

    return {
        filename,
        chunkFilename
    }
}

class SassWebpackPlugin
{
    /**
     * @param {Partial<SassConfigWebpackPluginOptions>} [options]
     */
    constructor (options = {})
    {
        this.options = Object.assign({}, defaultOptions, options)
    }

    /**
     * @param {WebpackCompiler} compiler
     */
    apply (compiler)
    {
        const modeProduction = [
            this.options.mode,
            compiler.options.mode
        ].some(mode => mode === 'production')

        const { filename, chunkFilename } = fixFileNames(compiler.options.output)

        /**
         * @type {Required<SassConfigWebpackPluginOptions>}
         */
        const options = {
            filename,
            chunkFilename,
            mode: modeProduction ? 'production' : 'development',
            implementation: void 0,
            ...this.options,
        }

        const config = modeProduction
            ? require('./config/production.config')(options)
            : require('./config/development.config')(options)

        // Merge config
        compiler.options.plugins.push(...config.plugins)
        compiler.hooks.afterEnvironment.tap('SassWebpackPlugin', () =>
        {
            compiler.options.module.rules.push(...config.module.rules)
        })
    }
}

exports = module.exports = SassWebpackPlugin
