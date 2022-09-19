import { XmlData } from 'iconfont-parser'
import colors from 'colors'
import { generateCase } from './utils'
import { Config } from './getConfig'
import path, { basename } from 'path'
import fs from 'fs'
import { getTemplate } from './getTemplate'
import { replaceNames, replaceSize, replaceStyleName, replaceSVGTemplate } from './replace'
import mkdirp from 'mkdirp'
import glob from 'glob'

export const genComponents = (data: XmlData, config: Config) => {
  console.log(data)
  const svgTemplates: string[] = []
  const names: string[] = []
  const saveDir = path.resolve(config.save_dir)
  const fileName = basename(config.save_dir) || 'index'

  mkdirp.sync(saveDir)
  glob.sync(path.join(saveDir, '*')).forEach((file) => fs.unlinkSync(file))

  data.svg.symbol.forEach((item) => {
    const iconId = item.$.id

    names.push(iconId)
    svgTemplates.push(
      `{/* ${iconId} */}\n
      { name === '${iconId}' && (<View style={{backgroundImage: #que#url(#$#{quot}data:image/svg+xml, ${generateCase(
        item,
        {
          hexToRgb: true,
        }
      )}#$#{quot});` +
        ' width: #$#{svgSize}px; height: #$#{svgSize}px; #que#, ...customStyle}} className={classnames("icon", customClassName)} />) }\n'
    )

    console.log(
      `${colors.green('√')} Generated icon "${colors.yellow(iconId)}"`
    )
  })
  console.log('svgTemplates==>', svgTemplates)
  fs.writeFileSync(
    path.join(saveDir, fileName + '.scss'),
    getTemplate('index.scss')
  )
  let tsxFile = getTemplate('index.tsx')

  tsxFile = replaceSize(tsxFile, config.default_icon_size)

  tsxFile = replaceNames(tsxFile, names)

  tsxFile = replaceSVGTemplate(tsxFile, svgTemplates)

  tsxFile = replaceStyleName(tsxFile, fileName)
  
  fs.writeFileSync(path.join(saveDir, fileName + '.tsx'), tsxFile)
  console.log(
    `\n${colors.green('√')} All icons have been putted into dir: ${colors.green(
      config.save_dir
    )}\n`
  )
}
