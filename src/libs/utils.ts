import { XmlData } from "iconfont-parser"
import { replaceHexToRgb } from "./replace"
const ATTRIBUTE_FILL_MAP = ['path']

// 生成 iconfont 的svg
export const generateCase = (
  data: XmlData['svg']['symbol'][number],
  config?: {
    hexToRgb: boolean
  }
) => {
  // viewbox 允许指定一个给定的一组图形伸展以适应特定的容器元素
  let template = `<svg viewBox='${data.$.viewBox}' xmlns='http://www.w3.org/2000/svg' width='#$#{svgSize}px' height='#$#{svgSize}px'>`

  for (const domName of Object.keys(data)) {
    if (domName === '$') {
      continue
    }

    const counter = {
      colorIndex: 0,
    }

    if (data[domName].$) {
      template += `<${domName}${addAttribute(
        domName,
        data[domName],
        counter,
        config
      )} />`
    } else if (Array.isArray(data[domName])) {
      data[domName].forEach((sub) => {
        template += `<${domName}${addAttribute(
          domName,
          sub,
          counter,
          config
        )} />`
      })
    }
  }

  template += `</svg>`

  return template.replace(/<|>/g, (matched) => encodeURIComponent(matched))
}

const addAttribute = (
  domName: string,
  sub: XmlData['svg']['symbol'][number]['path'][number],
  counter: { colorIndex: number },
  config?: {
    hexToRgb: boolean
  }
) => {
  let template = ''

  if (sub && sub.$) {
    if (ATTRIBUTE_FILL_MAP.includes(domName)) {
      // Set default color same as in iconfont.cn
      // And create placeholder to inject color by user's behavior
      sub.$.fill = sub.$.fill || '#333333'
    }

    for (const attributeName of Object.keys(sub.$)) {
      if (attributeName === 'fill') {
        let color: string | undefined
        let keyword: string
        if (config?.hexToRgb) {
          color = replaceHexToRgb(sub.$[attributeName])
          keyword = 'colors'
        } else {
          keyword = 'color'
          color = sub.$[attributeName]
        }
        template += ` ${attributeName}='#$#{(isStr ? ${keyword} : ${keyword}[${counter.colorIndex}]) || '${color}'}'`
        counter.colorIndex += 1
      } else {
        template += ` ${attributeName}='${sub.$[attributeName]}'`
      }
    }
  }

  return template
}
