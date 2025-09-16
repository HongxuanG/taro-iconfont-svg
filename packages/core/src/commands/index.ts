#!/usr/bin/env node

import { fetchXml } from 'iconfont-parser'
import colors from 'colors'
import type { XmlData } from 'iconfont-parser'
import { getConfig } from '../libs/getConfig'
import { genComponents } from '../libs/genComponents'

const config = getConfig()

// 如果是纯本地 SVG 模式
if (config.parse_local_svg && !config.symbol_url) {
  // 创建空的 XmlData 结构
  const emptyData: XmlData = {
    svg: {
      symbol: [],
    },
  }
  genComponents(emptyData, config)
}
else {
  // 原有的远程获取逻辑
  fetchXml(config.symbol_url)
    .then((result) => {
      genComponents(result, config)
    })
    .catch((e) => {
      console.error(colors.red(e))
      process.exit(1)
    })
}
