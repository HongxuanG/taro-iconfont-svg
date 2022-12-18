import fs from 'fs'
import path, { basename } from 'path'
import type { XmlData } from 'iconfont-parser'
import { parseStringPromise } from 'xml2js'
import { optimize } from 'svgo'
import { callWithAsyncErrorHandling, callWithErrorHandling } from './utils'

const prefix = 'icon-'
// 优化svg
export const optimizeSvg = (svgString: string) => {
  const result = optimize(svgString, {
    plugins: [
      {
        name: 'preset-default',
        params: {
          overrides: {
            removeViewBox: false, // 默认是去除ViewBox属性的，现在禁止去除
          },
        },
      },
    ],
  })
  const optimizedSvgString = result.data
  return optimizedSvgString
}

export const genLocalSvg2Symbols = async(fileDir: string): Promise<XmlData['svg']['symbol']> => {
  const fullSvgDir = path.resolve(fileDir)
  let files: string[] = []
  files = callWithErrorHandling(fs.readdirSync, [fullSvgDir], '读取 SVG 文件夹失败')
  let done = 0
  const symbols: XmlData['svg']['symbol'] = []
  try {
    // 只读svg文件
    const filtered = files.filter(item => path.extname(item) === '.svg')
    // 异步
    for await (const file of filtered) {
      const iconName = basename(file, '.svg')
      const fullSvgPath = `${`${fullSvgDir}\\${iconName}`}.svg`
      const svgString = fs.readFileSync(fullSvgPath).toString()
      if (svgString) {
        callWithAsyncErrorHandling(async() => {
          const optimizedSvg = optimizeSvg(svgString)
          const result: { svg: XmlData['svg']['symbol'][number] } = await parseStringPromise(optimizedSvg, { rootName: 'svg' })
          result.svg.$.id = prefix + iconName
          done++
          symbols.push(result.svg)
        }, null, `无法解析SVG文件: ${fullSvgPath}`)
      }
      else {
        throw new Error(`无法读取SVG文件: ${fullSvgPath}`)
      }
    }
    if (files.length === done) {
      return symbols
    }
    else {
      throw new Error('解析SVG文件不全')
    }
  }
  catch (e) {
    console.error(e)
    process.exit(1)
  }
}
