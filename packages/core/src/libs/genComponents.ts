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

  // 添加模式提示
  if (config.parse_local_svg && !config.symbol_url) {
    console.log(`${colors.green('√')} Running in local SVG only mode`)
  }

  if (config.parse_local_svg) {
    if (config.local_svg_dir) {
      console.log(`${colors.green('√')} Parsing local SVG files...`)
      extendSymbols = await genLocalSvg2Symbols(config.local_svg_dir)
      console.log(`${colors.green('√')} Found ${extendSymbols.length} local SVG icons`)
    }
    else {
      console.log(
        `\n${colors.yellow('warn')} "parse_local_svg" Has been set but failed to read into the "local_svg_dir" folder\n`)
    }
  }
  const svgTemplates: string[] = []
  const names: string[] = []
  const saveDir = path.resolve(config.save_dir)
  const fileName = basename(config.save_dir) || 'index'

  mkdirp.sync(saveDir)
  glob.sync(path.join(saveDir, '*')).forEach(file => fs.unlinkSync(file))

  const symbol = [...data.svg.symbol, ...extendSymbols]

  // 检查是否有图标需要处理
  if (symbol.length === 0) {
    if (config.parse_local_svg && !config.symbol_url) {
      console.log(`${colors.yellow('warn')} No local SVG files found in the specified directory`)
      console.log(`${colors.yellow('warn')} Please check your local_svg_dir configuration`)
    }
    else {
      console.log(`${colors.yellow('warn')} No icons found to process`)
    }
    return
  }

  symbol.forEach((item) => {
    const iconId = item.$.id

    names.push(iconId)
    const svgContent = generateCase(
      item,
      {
        hexToRgb: true,
      },
    )
    svgTemplates.push(
      `{/* ${iconId} */}\n
      { name === '${iconId}' && (<View style={{backgroundImage: #que#url(#$#{quot}data:image/svg+xml, ${svgContent}#$#{quot})#que#,`
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
