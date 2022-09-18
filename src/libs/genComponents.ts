import { XmlData } from 'iconfont-parser'
import colors from 'colors'
import { generateCase } from './utils'
import { Config } from './getConfig'
import path, { basename } from 'path'
import fs from 'fs'
import { getTemplate } from './getTemplate'
import { replaceSVGTemplate } from './replace'
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
      `{/* ${iconId} */}
      { name === '${iconId}' && (<View style="background-image: url({{quot}}data:image/svg+xml, ${generateCase(
        item,
        {
          hexToRgb: true,
        }
      )}{{quot}});` +
        ' width: {{svgSize}}px; height: {{svgSize}}px; " class="icon" />) }'
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
  let tsxFile = getTemplate('index.txs')

  tsxFile = replaceSVGTemplate(tsxFile, svgTemplates)

  console.log(
    `\n${colors.green('√')} All icons have been putted into dir: ${colors.green(
      config.save_dir
    )}\n`
  )
}
