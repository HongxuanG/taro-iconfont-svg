import fs from 'fs'
import path, { basename } from 'path'
import type { XmlData } from 'iconfont-parser'
import { parseStringPromise } from 'xml2js'
import { optimize } from 'svgo'
import glob from 'glob'
import { callWithAsyncErrorHandling } from './utils'

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
  let done = 0
  const symbols: XmlData['svg']['symbol'] = []
  try {
    // 只读svg文件
    const svgPaths = glob.sync(path.join(fullSvgDir, '**/*.svg'))
    // 异步
    for await (const path of svgPaths) {
      const iconName = basename(path, '.svg')
      const svgString = fs.readFileSync(path).toString()
      if (svgString) {
        callWithAsyncErrorHandling(async() => {
          const optimizedSvg = optimizeSvg(svgString)
          const result: { svg: XmlData['svg']['symbol'][number] } = await parseStringPromise(optimizedSvg, { rootName: 'svg' })
          result.svg.$.id = prefix + iconName
          done++
          symbols.push(result.svg)
        }, null, `无法解析SVG文件: ${path}`)
      }
      else {
        throw new Error(`无法读取SVG文件: ${path}`)
      }
    }
    if (svgPaths.length === done) {
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
