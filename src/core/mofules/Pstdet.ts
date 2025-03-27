import { style } from '@cli/style';

/**
 * CLI-Parser in Sequier
 */
export class Parser {
  private readonly version: string = '1.0.0';
  private readonly name: string = 'CLI-Utils';

  private readonly language: 'ja' | 'en';
  private readonly srcDir: string;
  private debugMode: boolean;
  private readonly outputLevel: 'none' | 'minimal' | 'default' | 'detailed';
  private readonly outputLevelNums: {
    none: 0,
    minimal: 1,
    default: 2,
    detailed: 3
  }

  private showAllOptions = () => {
    console.log(style(['blue', 'bold'], 'INFO: ') + 'Available options:');
    for (const option of this.options) {
      console.log(style(['blue', 'bold'], 'INFO: ') + `${option.long} (${option.short}): ${option.description}`);
    }
  }

  option(option: CLI.Option) {
    this.options.push(option);
    return this;
  }

  private readonly level: 0 | 1 | 2 | 3;
  private options: Array<CLI.Option> = [
    {
      long: '--help',
      short: '-h',
      effect: this.showAllOptions,
      description: 'Show help message.'
    },
    {
      long: '--debug',
      short: '-d',
      effect: () => {
        this.debugMode = true;
      },
      description: 'Enable debug mode.'
    }];


  private parseArgs(args: string[]) {
    console.log(args);
    if (args.length === 0) {
      return;
    }
    for (const arg of args) {
      for (const option of this.options) {
        if (arg === option.long || arg === option.short) {
          option.effect();
        }
      }

    }

    return args;
  }

  constructor(config: CLI.Config.Defined) {
    const args = process.argv.slice(2);
    this.parseArgs(args);

    this.language = config.language;
    this.srcDir = config.srcDir;
    this.debugMode = config.debug;
    this.outputLevel = config.outputLevel;
    this.outputLevelNums = {
      none: 0,
      minimal: 1,
      default: 2,
      detailed: 3
    };
    this.level = this.outputLevelNums[this.outputLevel];
    if (this.debugMode) {
      console.log(style(['green', 'bold'], 'CLI-Utils initialization complete🚀'));
      console.log(this.getDebugInfo());
    }
  }

  private getDebugInfo(): string {
    return `${style(['gray', 'bold'], 'Debug Info\n')}` +
      style(['gray'], `Version: ${this.version}\nName: ${this.name}\nLanguage: ${this.language}\nSource Directory: ./${this.srcDir}\nDebug Mode: ${this.debugMode}\nOutput Level: ${this.outputLevel}`);
  }

  /**
   * Sequence
   */
}


