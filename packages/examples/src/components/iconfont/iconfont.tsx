import React, { useState, useEffect, FC } from "react";
import { Block, View } from "@tarojs/components";
import "./iconfont.scss";
import Taro from "@tarojs/taro";
import classnames from "classnames";

const SystemWidth = Taro.getSystemInfoSync().windowWidth
const quot = '"'

function hex2rgb(hex) {
  const rgb: number[] = [];

  hex = hex.substr(1);

  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  hex.replace(/../g, function(color: string) {
    rgb.push(parseInt(color, 0x10));
    return color;
  });

  return "rgb(" + rgb.join(",") + ")";
}

export type IconNames = 'icon-colorCard' | 'icon-custom-icon' | 'icon-take' | 'icon-write';

type PropsType = {
  name: IconNames;
  size?: number;
  color?: string | string[];
  customStyle?: React.CSSProperties;
  customClassName?: string;
};

const IconFont:FC<PropsType> = ({
  name,
  size = 18,
  color,
  customStyle = {},
  customClassName = ""
}) => {
  const [colors, setColors] = useState<PropsType['color']>()
  const [isStr, setIsStr] = useState(true)
  const [svgSize, setSvgSize] = useState(() => (size / 750) * SystemWidth)

  useEffect(() => {
    setIsStr(typeof color === 'string')
    if (typeof color === 'string') {
      setColors(color.indexOf('#') === 0 ? hex2rgb(color) : color)
    } else {
      setColors(
        color?.map(function (item) {
          return item.indexOf('#') === 0 ? hex2rgb(item) : item
        })
      )
    }
    return () => {}
  }, [color])

  useEffect(() => {
    setSvgSize((size / 750) * SystemWidth)
  }, [size])

  // 也可以使用 if (name === 'xxx') { return <view> } 来渲染，但是测试发现在ios下会有问题，报错 Maximum call stack啥的。下面这个写法没问题
  return (
    <Block>
      {/* icon-colorCard  本地svg */ }
      {/* { name === 'icon-colorCard' && (<View style={{backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px' viewBox='0 0 72 72'><defs><linearGradient id='a' x1='56.049%' x2='45.965%' y1='85.384%' y2='36.243%'><stop offset='0%' stop-color='${(isStr ? colors : colors?.[0]) || '%233667EF'}' stop-opacity='.572'/><stop offset='100%' stop-color='${(isStr ? colors : colors?.[1]) || '%233591FD'}' stop-opacity='.551'/></linearGradient><linearGradient id='b' x1='100%' x2='16.645%' y1='85.384%' y2='36.243%'><stop offset='0%' stop-color='${(isStr ? colors : colors?.[2]) || '%233667EF'}' stop-opacity='.572'/><stop offset='100%' stop-color='${(isStr ? colors : colors?.[3]) || '%233591FD'}' stop-opacity='.551'/></linearGradient><linearGradient id='c' x1='18.906%' x2='80.404%' y1='44.444%' y2='55.556%'><stop offset='0%' stop-color='${(isStr ? colors : colors?.[4]) || '%233591FD'}'/><stop offset='100%' stop-color='${(isStr ? colors : colors?.[5]) || '%233667EF'}'/></linearGradient></defs><g fill='none' fill-rule='nonzero'><path fill='url(%23a)' d='M24.75 11.25A2.25 2.25 0 0 1 27 13.5v47.25A2.25 2.25 0 0 1 24.75 63h-13.5A2.25 2.25 0 0 1 9 60.75V13.5a2.25 2.25 0 0 1 2.25-2.25h13.5ZM18 50.625a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75Z'/><path fill='url(%23b)' d='m45.593 16.216 9.546 9.546a2.25 2.25 0 0 1 0 3.182l-31.82 31.82a2.25 2.25 0 0 1-3.182 0L16.273 56.9a3.375 3.375 0 1 0-1.174-1.174l-4.508-4.508a2.25 2.25 0 0 1 0-3.182l31.82-31.82a2.25 2.25 0 0 1 3.182 0Z'/><path fill='url(%23c)' d='M60.75 45A2.25 2.25 0 0 1 63 47.25v13.5A2.25 2.25 0 0 1 60.75 63h-49.5A2.25 2.25 0 0 1 9 60.75v-13.5A2.25 2.25 0 0 1 11.25 45h49.5ZM18 50.625a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75Z' opacity='.95'/></g></svg%3E${quot})`, width: `${svgSize}px`, height: `${svgSize}px`, ...customStyle}} className={classnames("icon", customClassName)} />) } */}
      {/* icon-alipay */}
      {/* {name === "icon-alipay" && (
        <View
          style={{
            backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath d='M192 692.736c0-69.632 51.2-106.496 88.064-111.104 111.104-18.432 264.192 74.24 264.192 74.24-69.632 88.064-166.912 134.144-241.152 134.144-65.024-4.608-111.104-41.472-111.104-97.28z' fill='${(isStr
              ? colors
              : colors[0]) ||
              "rgb(91,139,212)"}' /%3E%3Cpath d='M979.456 729.6c-13.824-4.608-329.216-101.888-319.488-111.104 46.592-55.808 78.848-185.344 78.848-185.344v-27.648h-185.344V335.872h226.816v-41.472h-226.816V192.512H460.8v97.28H257.024v41.472H460.8v69.632H298.496v27.648h333.824c0 13.824-23.04 106.496-46.08 148.48-4.608-9.216-153.088-60.416-236.544-65.024-88.064 4.608-157.696 32.256-189.952 97.28-46.592 120.32 27.648 241.152 194.56 241.152 27.648 0 162.304-13.824 264.192-153.088 27.648 13.824 185.344 92.672 282.624 143.872-92.672 111.104-231.936 180.736-389.12 180.736-280.576 1.024-508.928-226.304-509.44-506.88v-3.072C1.024 231.424 227.84 3.072 508.928 2.56h3.072c280.576-1.024 508.928 226.304 509.44 506.88v3.072c4.608 82.944-13.824 152.576-41.984 217.088z' fill='${(isStr
              ? colors
              : colors[1]) ||
              "rgb(91,139,212)"}' /%3E%3C/svg%3E${quot})`, width: `${svgSize}px`, height: `${svgSize}px`,
            ...customStyle
          }}
          className={classnames(icon, customClassName)}
        />
      )} */}
      {/* icon-colorCard */}

      { name === 'icon-colorCard' && (<View style={{backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 72 72' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cdefs%3E%3ClinearGradient id='a' x1='56.049%' x2='45.965%' y1='85.384%' y2='36.243%'%3E%3Cstop offset='0%' stop-color='${(isStr ? colors : colors?.[0]) || 'rgb(54,103,239)'}' stop-opacity='.572'/%3E%3Cstop offset='100%' stop-color='${(isStr ? colors : colors?.[1]) || 'rgb(53,145,253)'}' stop-opacity='.551'/%3E%3C/linearGradient%3E%3ClinearGradient id='b' x1='100%' x2='16.645%' y1='85.384%' y2='36.243%'%3E%3Cstop offset='0%' stop-color='${(isStr ? colors : colors?.[0]) || 'rgb(54,103,239)'}' stop-opacity='.572'/%3E%3Cstop offset='100%' stop-color='${(isStr ? colors : colors?.[1]) || 'rgb(53,145,253)'}' stop-opacity='.551'/%3E%3C/linearGradient%3E%3ClinearGradient id='c' x1='18.906%' x2='80.404%' y1='44.444%' y2='55.556%'%3E%3Cstop offset='0%' stop-color='${(isStr ? colors : colors?.[0]) || 'rgb(53,145,253)'}'/%3E%3Cstop offset='100%' stop-color='${(isStr ? colors : colors?.[1]) || 'rgb(54,103,239)'}'/%3E%3C/linearGradient%3E%3C/defs%3E%3Cg fill='none' fill-rule='nonzero'%3E%3Cpath fill='url(%23a)' d='M24.75 11.25A2.25 2.25 0 0 1 27 13.5v47.25A2.25 2.25 0 0 1 24.75 63h-13.5A2.25 2.25 0 0 1 9 60.75V13.5a2.25 2.25 0 0 1 2.25-2.25zM18 50.625a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75'/%3E%3Cpath fill='url(%23b)' d='m45.593 16.216 9.546 9.546a2.25 2.25 0 0 1 0 3.182l-31.82 31.82a2.25 2.25 0 0 1-3.182 0L16.273 56.9a3.375 3.375 0 1 0-1.174-1.174l-4.508-4.508a2.25 2.25 0 0 1 0-3.182l31.82-31.82a2.25 2.25 0 0 1 3.182 0'/%3E%3Cpath fill='url(%23c)' d='M60.75 45A2.25 2.25 0 0 1 63 47.25v13.5A2.25 2.25 0 0 1 60.75 63h-49.5A2.25 2.25 0 0 1 9 60.75v-13.5A2.25 2.25 0 0 1 11.25 45zM18 50.625a3.375 3.375 0 1 0 0 6.75 3.375 3.375 0 0 0 0-6.75' opacity='.95'/%3E%3C/g%3E%3C/svg%3E${quot})`, width: `${svgSize}px`, height: `${svgSize}px`, ...customStyle}} className={classnames("icon", customClassName)} />) }
{/* icon-custom-icon */}

      { name === 'icon-custom-icon' && (<View style={{backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath fill='${(isStr ? colors : colors?.[0]) || 'rgb(NaN,NaN,NaN,12,NaN)'}' d='M19 10c0 1.38-2.12 2.5-3.5 2.5s-2.75-1.12-2.75-2.5h-1.5c0 1.38-1.37 2.5-2.75 2.5S5 11.38 5 10h-.75c-.16.64-.25 1.31-.25 2a8 8 0 0 0 8 8 8 8 0 0 0 8-8c0-.69-.09-1.36-.25-2zm-7-6C9.04 4 6.45 5.61 5.07 8h13.86C17.55 5.61 14.96 4 12 4m10 8a10 10 0 0 1-10 10A10 10 0 0 1 2 12 10 10 0 0 1 12 2a10 10 0 0 1 10 10m-10 5.23c-1.75 0-3.29-.73-4.19-1.81L9.23 14c.45.72 1.52 1.23 2.77 1.23s2.32-.51 2.77-1.23l1.42 1.42c-.9 1.08-2.44 1.81-4.19 1.81'/%3E%3C/svg%3E${quot})`, width: `${svgSize}px`, height: `${svgSize}px`, ...customStyle}} className={classnames("icon", customClassName)} />) }
{/* icon-take */}

      { name === 'icon-take' && (<View style={{backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 1024 1024' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cpath fill='${(isStr ? colors : colors?.[0]) || 'rgb(0,199,96)'}' d='M0 512a512 512 0 1 0 1024 0A512 512 0 1 0 0 512'/%3E%3Cpath fill='${(isStr ? colors : colors?.[1]) || 'rgb(255,255,255)'}' d='M663.058 282.002a40.01 40.01 0 0 1 34.469 19.694L802.65 480.201c11.648 11.721 11.703 27.538 3.968 43.904a20.01 20.01 0 0 1-18.102 11.465h-34.122l.019 193.006c0 23.278-18.286 42.277-41.29 43.374l-2.102.055H313.198a43.41 43.41 0 0 1-43.392-43.429V535.552h-34.048a19.98 19.98 0 0 1-17.353-10.057l-.768-1.463c-7.48-15.982-8.302-30.811 2.066-43.429l1.792-1.956 103.588-176.86a39.99 39.99 0 0 1 34.524-19.785H663.04zM532.005 581.998h-40.01a29.99 29.99 0 0 0-29.988 29.988v130.012h99.986V611.986a29.99 29.99 0 0 0-29.988-29.988'/%3E%3C/svg%3E${quot})`, width: `${svgSize}px`, height: `${svgSize}px`, ...customStyle}} className={classnames("icon", customClassName)} />) }
{/* icon-write */}

      { name === 'icon-write' && (<View style={{backgroundImage: `url(${quot}data:image/svg+xml, %3Csvg viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg' width='${svgSize}px' height='${svgSize}px'%3E%3Cg fill='none' fill-rule='evenodd' opacity='.8'%3E%3Crect width='2.5' height='30' x='18.75' y='18.75' fill='${(isStr ? colors : colors?.[0]) || 'rgb(51,51,51)'}' rx='1.25' transform='rotate(90 20 33.75)'/%3E%3Cpath stroke='${(isStr ? colors : colors?.[0]) || 'rgb(51,51,51)'}' stroke-width='2.5' d='M29.799 9.47a1.246 1.246 0 0 1 0 1.767L12.943 28.093a1.25 1.25 0 0 1-.859.366l-3.105.063.062-3.106a1.25 1.25 0 0 1 .366-.859L26.263 7.701a1.246 1.246 0 0 1 1.768 0ZM22.743 11.241l3.985 3.923' fill='${(isStr ? colors : colors?.[1]) || 'rgb(51,51,51)'}'/%3E%3C/g%3E%3C/svg%3E${quot})`, width: `${svgSize}px`, height: `${svgSize}px`, ...customStyle}} className={classnames("icon", customClassName)} />) }

    </Block>
  )
}

export default IconFont
