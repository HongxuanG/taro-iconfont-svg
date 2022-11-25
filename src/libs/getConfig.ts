import path from 'path'
import fs from 'fs'
import minimist from 'minimist'
import colors from 'colors'
import defaultConfig from './iconfont.json'

export interface Config {
  symbol_url: string
  save_dir: string
  use_rpx: boolean
  design_width: string | number
  trim_icon_prefix: string
  default_icon_size: number
}

let cacheConfig: Config
// 主要是读取config文件的配置，以及格式化url路径
export const getConfig = (argv?: string[]) => {
  if (cacheConfig) {
    return cacheConfig
  }
  const args = minimist<{ config: string }>(argv || process.argv.slice(2))
  let configFilePath = 'iconfont.json'

  if (args.config && typeof args.config === 'string') {
    configFilePath = args.config
  }
  // 输出绝对路径
  const targetFile = path.resolve(configFilePath)

  if (!fs.existsSync(targetFile)) {
    console.warn(
      colors.red(
        `File "${configFilePath}" doesn't exist, did you forget to generate it?`,
      ),
    )
    process.exit(1)
  }

  const config = require(targetFile) as Config
  console.log('config==>', config)

  if (!config.symbol_url || !/^(https?:)?\/\//.test(config.symbol_url)) {
    console.warn(colors.red('You are required to provide symbol_url'))
    process.exit(1)
  }

  if (config.symbol_url.indexOf('//') === 0) {
    config.symbol_url = `http:${config.symbol_url}`
  }

  config.save_dir = config.save_dir || defaultConfig.save_dir
  config.default_icon_size
    = config.default_icon_size || defaultConfig.default_icon_size

  cacheConfig = config

  return config
}
