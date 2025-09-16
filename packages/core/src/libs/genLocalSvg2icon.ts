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
  const failedFiles: string[] = []
  try {
    // 检查传入的路径是否已经包含 glob 模式
    let globPattern: string
    if (fileDir.includes('*') || fileDir.includes('?')) {
      // 如果已经包含 glob 模式，直接使用解析后的路径
      // 将 Windows 路径分隔符转换为 glob 使用的正斜杠
      globPattern = fullSvgDir.replace(/\\/g, '/')
    }
    else {
      // 如果不包含 glob 模式，则添加 **/*.svg
      globPattern = path.join(fullSvgDir, '**/*.svg').replace(/\\/g, '/')
    }

    // 只读svg文件
    const svgPaths = glob.sync(globPattern)
    // 异步
    for await (const path of svgPaths) {
      const iconName = basename(path, '.svg')
      const svgString = fs.readFileSync(path).toString()
      if (svgString) {
        try {
          await callWithAsyncErrorHandling(async() => {
            const optimizedSvg = optimizeSvg(svgString)
            const result: { svg: XmlData['svg']['symbol'][number] } = await parseStringPromise(optimizedSvg, { rootName: 'svg' })
            result.svg.$.id = prefix + iconName
            ++done
            symbols.push(result.svg)
          }, null, `无法解析SVG文件: ${path}`)
        }
        catch (error) {
          // 记录解析失败的文件
          failedFiles.push(path)
          console.error(`解析SVG文件失败: ${path}`, error)
        }
      }
      else {
        throw new Error(`无法读取SVG文件: ${path}`)
      }
    }
    if (svgPaths.length === done) {
      return symbols
    }
    else {
      const failedCount = svgPaths.length - done
      let errorMessage = `解析SVG文件不全，共 ${failedCount} 个文件解析失败`
      if (failedFiles.length > 0) {
        errorMessage += `:\n${failedFiles.join('\n')}`
      }
      throw new Error(errorMessage)
    }
  }
  catch (e) {
    console.error(e)
    process.exit(1)
  }
}
