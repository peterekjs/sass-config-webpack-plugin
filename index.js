// @ts-check
// webpack compiler options properties are marked as optional
// although most of them are not optional
// as a temporary work around this this is fixed with
// `import('ts-essentials').DeepRequired`
/** @typedef {import('ts-essentials').DeepRequired<import("webpack").Compiler>} WebpackCompiler */
/**
 * Plugin Options
 * @typedef {{ mode?: 'production' | 'development'; implementation?: any; }} SassWebpackPluginOptions
 */
const defaultOptions = {
    mode: 'production',
    implementation: void 0,
}
/**
 * Use compiler.options.output configuration also for css
 * Replace folder names called js and extends called js to css
 * E.g. 'js/x.[id].js' -> 'css/x.[id].css'
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
     * @param {Partial<SassWebpackPluginOptions>} [options]
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

        const options = {
            filename,
            chunkFilename,
            mode: modeProduction ? 'production' : 'development',
            ...this.options
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
