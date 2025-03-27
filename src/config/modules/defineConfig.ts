/**
 * 
 * @param language - `'ja'` | `'en'` default: `'en'`
 * @param srcDir - Source Directory default: `'cli-src'`
 * @param outputLevel - Output Level default: `'default'`
 * @param debug - Debug mode default: `false`
 * @returns 
 */
export const defineConfig = (config: CLI.Config.Args) => {
    const definedConfig: CLI.Config.Defined = {
      language: config.language || 'en',
      srcDir: config.srcDir || 'cli-src',
      debug: config.debug || false,
      outputLevel: config.outputLevel || 'default',
    };
    return definedConfig;
}