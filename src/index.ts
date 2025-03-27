import { parseConfig } from '@cli/config'
import { CLIUtils } from '@cli/core'
import { style } from '@cli/style'

const run = () => {
  const config = parseConfig();
  const cli = new CLIUtils(config);
}

run()