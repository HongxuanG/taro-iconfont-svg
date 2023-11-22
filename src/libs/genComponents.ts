import path, { basename } from 'path'
import fs from 'fs'
import type { XmlData } from 'iconfont-parser'
import colors from 'colors'
import mkdirp from 'mkdirp'
import glob from 'glob'
import { generateCase } from './utils'
import type { Config } from './getConfig'
import { getTemplate } from './getTemplate'
import { replaceNames, replaceSVGTemplate, replaceSize, replaceStyleName } from './replace'
import { genLocalSvg2Symbols } from './genLocalSvg2icon'
// 生成 taro-iconfont 组件

export const genComponents = async(data: XmlData, config: Config) => {
  let extendSymbols: XmlData['svg']['symbol'] = []
  if (config.parse_local_svg) {
    if (config.local_svg_dir) {
      extendSymbols = await genLocalSvg2Symbols(config.local_svg_dir)
    }
    else {
      console.log(
        `\n${colors.yellow('warn')} "parse_local_svg" Has been set but failed to read into the "local_svg_dir" folder\n`)
    }
  }
  const svgTemplates: string[] = []
  const names: string[] = []
  const saveDir = path.resolve(config.save_dir)
  console.log('saveDir', saveDir)
  const fileName = basename(config.save_dir) || 'index'

  mkdirp.sync(saveDir)
  glob.sync(path.join(saveDir, '*')).forEach(file => fs.unlinkSync(file))

  const symbol = [...data.svg.symbol, ...extendSymbols]
  symbol.forEach((item) => {
    const iconId = item.$.id
    if (iconId === 'icon-address') {
      console.log('symbol', item.path)
    }
    names.push(iconId)
    svgTemplates.push(
      `{/* ${iconId} */}\n
      { name === '${iconId}' && (<View style={{backgroundImage: #que#url(#$#{quot}data:image/svg+xml, ${generateCase(
  item,
  {
    hexToRgb: true,
  },
)}#$#{quot})#que#,`
        + ' width: #que##$#{svgSize}px#que#, height: #que##$#{svgSize}px#que#, ...customStyle}} className={classnames("icon", customClassName)} />) }\n',
    )

    console.log(
      `${colors.green('√')} Generated icon "${colors.yellow(iconId)}"`,
    )
  })
  fs.writeFileSync(
    path.join(saveDir, `${fileName}.scss`),
    getTemplate('index.scss'),
  )
  let tsxFile = getTemplate('index.tsx')

  tsxFile = replaceSize(tsxFile, config.default_icon_size)

  tsxFile = replaceNames(tsxFile, names)

  tsxFile = replaceSVGTemplate(tsxFile, svgTemplates)

  tsxFile = replaceStyleName(tsxFile, fileName)

  fs.writeFileSync(path.join(saveDir, `${fileName}.tsx`), tsxFile)
  console.log(
    `\n${colors.green('√')} All icons have been putted into dir: ${colors.green(
      config.save_dir,
    )}\n`,
  )
}
