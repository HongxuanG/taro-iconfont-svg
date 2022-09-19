#!/usr/bin/env node

import { fetchXml } from 'iconfont-parser'
import { getConfig } from '../libs/getConfig'
import colors from 'colors'
import { genComponents } from '../libs/genComponents'

const config = getConfig()

fetchXml(config.symbol_url)
  .then((result) => {
    genComponents(result, config)
  })
  .catch((e) => {
    console.error(colors.red(e))
    process.exit(1)
  })
