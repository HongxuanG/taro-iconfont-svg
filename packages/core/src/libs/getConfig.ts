import path from 'path'
import fs from 'fs'
import minimist from 'minimist'
import colors from 'colors'
import defaultConfig from './iconfont.json'

export interface Config {
  symbol_url: string
  parse_local_svg: boolean // 是否读取本地 svg 文件，再iconfont组件中追加svg
  local_svg_dir: string // 本地 svg 文件存放路径
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

  if (!config.parse_local_svg && (!config.symbol_url || !/^(https?:)?\/\//.test(config.symbol_url))) {
    console.warn(colors.red('You are required to provide symbol_url when parse_local_svg is false'))
    process.exit(1)
  }

  // 添加本地 SVG 模式的验证
  if (config.parse_local_svg && !config.local_svg_dir) {
    console.warn(colors.red('You are required to provide local_svg_dir when parse_local_svg is true'))
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
