import * as path from 'path';
import * as fs from 'fs';

import { defaultConfig } from './defaultConfig';

export const parseConfig = ():CLI.Config.Defined => {
  
  const rootDir = path.resolve(__dirname, '..', '..','..');
  let config = defaultConfig;

  const allowedExtensions = [
    '.js',
    '.ts',
    '.json'
  ]

  const allowedFileNames = [
    'cli.config',
    'cli-config'
  ]

  const configFiles = allowedFileNames.flatMap((fileName) => {
    return allowedExtensions.map((ext) => {
      return path.join(rootDir, `${fileName}${ext}`);
    });
  });
  const configFile = configFiles.find((file) => fs.existsSync(file));
  if (!configFile) {
    return config;
  }
  const userConfig = require(configFile).default as CLI.Config.Defined;
  console.log('Config file found:', configFile);
  if(userConfig) {
    //check if config is valid
    if(typeof userConfig === 'object' && userConfig !== null) {

      //check lang settings
      if(userConfig.language && (userConfig.language !== 'ja' && userConfig.language !== 'en')) {
        throw new Error('Invalid language setting. Please use "ja" or "en".');
        return config;
      }
      else if (userConfig.language && (userConfig.language === 'ja' || userConfig.language === 'en')) {
        config.language = userConfig.language;
      }

      if(userConfig.srcDir && typeof userConfig.srcDir !== 'string') {
        throw new Error('Invalid srcDir setting. Please use a string value.');
      }
      else if (userConfig.srcDir && typeof userConfig.srcDir === 'string') {
        config.srcDir = userConfig.srcDir;
      }

      if(userConfig.debug && typeof userConfig.debug !== 'boolean') {
        throw new Error('Invalid debug setting. Please use a boolean value.');
      }
      else if (userConfig.debug && typeof userConfig.debug === 'boolean') {
        config.debug = userConfig.debug;
      }
      const allowedOutputLevels = ['none', 'minimal', 'default', 'detailed'];
      if (userConfig.outputLevel && (typeof userConfig.outputLevel !== 'string' || !allowedOutputLevels.includes(userConfig.outputLevel))) {
        throw new Error('Invalid outputLevel setting. Please use "none", "minimal", "default", or "detailed".');
      }
      else if (userConfig.outputLevel && (userConfig.outputLevel === 'none' || userConfig.outputLevel === 'minimal' || userConfig.outputLevel === 'default' || userConfig.outputLevel === 'detailed')) {
        config.outputLevel = userConfig.outputLevel;
      }
    }
  }
  return config;
};
