declare namespace CLI.Config {

  interface Defined {
    language: 'ja' | 'en';
    srcDir: string;
    debug: boolean;
    outputLevel: 'none' | 'minimal' | 'default' | 'detailed';
  }


  interface Args {
    /**
     * - Language Settings.
     * - 言語設定。
     * - `ja`: 日本語
     * - `en`: English
     * @default `en`
     */
    language?: 'ja' | 'en';
    /**
     * - Source Directory.
     * - 作業ディレクトリ。
     * @default `cli-src`
     */
    srcDir?: string;
    debug?: boolean;
    /**
     * - Output Level
     * - 出力レベル
     * - `none`: No output DEPRECATED
     * - `minimal`: Minimal output
     * - `default`: Default output
     * - `detailed`: Verbose output
     * @default `default`
     */
    outputLevel?: 'none' | 'minimal' | 'default' | 'detailed';
  }

}