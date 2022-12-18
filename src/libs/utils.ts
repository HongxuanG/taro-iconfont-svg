import type { XmlData } from 'iconfont-parser'
import { replaceHexToRgb } from './replace'

const ATTRIBUTE_FILL_MAP = ['path']
const COLOR_ATTRIBUTE = ['fill', 'stroke', 'stop-color']
const COLOR_ATTRIBUTE_IGNORE = ['none', 'url(']
const SINGLE_TAG = ['circle', 'ellipse', 'line', 'path', 'polygon', 'polyline', 'rect', 'use', 'stop']
const addAttribute = (
  domName: string,
  sub: XmlData['svg']['symbol'][number]['path'][number],
  counter: { colorIndex: number },
  config?: {
    hexToRgb: boolean
  },
) => {
  let template = ''

  if (sub && sub.$) {
    if (ATTRIBUTE_FILL_MAP.includes(domName)) {
      // Set default color same as in iconfont.cn
      // And create placeholder to inject color by user's behavior
      sub.$.fill = sub.$.fill || '#333333'
    }
    for (const attributeName of Object.keys(sub.$)) {
      const attributeValue = sub.$[attributeName]
      // 处理属性值为颜色的情况
      if (COLOR_ATTRIBUTE.includes(attributeName)) {
        if (COLOR_ATTRIBUTE_IGNORE.some(value => attributeValue.includes(value))) {
          if (attributeValue.includes('url(#')) {
            // # 一定要转成 %23
            template += ` ${attributeName}='${encodeURIComponent(attributeValue)}'`
          }
          else {
            template += ` ${attributeName}='${attributeValue}'`
          }
          continue
        }
        let color: string | undefined
        let keyword: string
        if (config?.hexToRgb) {
          color = replaceHexToRgb(attributeValue)
          keyword = 'colors'
        }
        else {
          keyword = 'color'
          color = attributeValue
        }
        template += ` ${attributeName}='#$#{(isStr ? ${keyword} : ${keyword}?.[${counter.colorIndex}]) || '${color}'}'`
        counter.colorIndex += 1
      }
      else {
        template += ` ${attributeName}='${attributeValue}'`
      }
    }
  }

  return template
}

const generateXML = (data: XmlData['svg']['symbol'][number],
  config?: {
    hexToRgb: boolean
  }) => {
  let template = ''
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
        config,
      )} />`
    }
    else if (Array.isArray(data[domName])) {
      data[domName].forEach((sub) => {
        if (SINGLE_TAG.includes(domName)) {
          // 开标签
          template += `<${domName}${addAttribute(
            domName,
            sub,
            counter,
            config,
          )}/>`
        }
        else {
          // 开标签
          template += `<${domName}${addAttribute(
            domName,
            sub,
            counter,
            config,
          )}>`
          // 递归子标签
          template += generateXML(sub, config)
          // 闭标签
          template += `</${domName}>`
        }
      })
    }
  }
  return template
}

// 生成 iconfont 的svg
export const generateCase = (
  data: XmlData['svg']['symbol'][number],
  config?: {
    hexToRgb: boolean
  },
) => {
  // viewbox 允许指定一个给定的一组图形伸展以适应特定的容器元素
  let template = `<svg viewBox='${data.$.viewBox}' xmlns='http://www.w3.org/2000/svg' width='#$#{svgSize}px' height='#$#{svgSize}px'>`

  template += generateXML(data, config)

  template += '</svg>'
  return template.replace(/<|>/g, matched => encodeURIComponent(matched))
}
