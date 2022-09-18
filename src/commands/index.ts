import { fetchXml } from 'iconfont-parser'
import colors from 'colors'
import { genComponents } from '../libs/genComponents';

fetchXml('http://at.alicdn.com/t/font_1373348_ghk94ooopqr.js')
  .then((result) => {
    genComponents(result)
  })
  .catch((e) => {
    console.error(colors.red(e))
  })
