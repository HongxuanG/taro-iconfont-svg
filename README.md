<h1 align='center'>taro-iconfont-svg</h1> 
<p align='center'>一款针对 Taro 3.x 的 SVG 类型 iconfont 组件生成器</p>

<p align='center'>
  <a href='https://www.npmjs.com/package/taro-iconfont-svg'>
    <img src='https://img.shields.io/npm/v/taro-iconfont.svg' alt='npm version'>
  </a>
  <a href='https://www.npmjs.com/package/taro-iconfont-svg'>
    <img src='https://img.shields.io/npm/dt/taro-iconfont.svg' alt='npm downloads'>
  </a>
  <a href='https://github.com/HongxuanG/taro-iconfont-svg/blob/main/LICENSE'>
    <img src='https://img.shields.io/npm/l/taro-iconfont.svg' alt='license'>
  </a>
</p>

本仓库源码出自 [taro-iconfont-cli](https://github.com/iconfont-cli/taro-iconfont-cli)，由于原仓库无人维护合并 PR，所以本人基于 taro-iconfont-cli 自己维护这套源码，欢迎大家一起维护，有问题可以提 issue，我会尽快解决。

> 灵感来源：[taro-iconfont-cli](https://github.com/iconfont-cli/taro-iconfont-cli) 

通过 `background:url(data:svg+xml....)` 的形式在小程序上把 SVG 显示出来，目前在公司内部开发中得到实际应用。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5265333348ac4044a04175ddca83ea27~tplv-k3u1fbpfcp-watermark.image?)

试验田请访问：[taro-test-iconfont-svg](https://github.com/HongxuanG/taro-test-iconfont-svg)

## ✨ 特性

- 🎨 **支持 SVG 图标** - 完美支持阿里矢量图标库的 SVG 图标
- 📦 **本地 SVG 支持** - 支持解析本地 SVG 文件生成图标组件
- 🎯 **TypeScript 支持** - 完整的 TypeScript 类型定义
- 📏 **响应式尺寸** - 支持 rpx 单位，适配不同屏幕尺寸
- 🎨 **多色图标** - 支持多色图标，可为不同色块设置不同颜色
- 🔧 **高度可配置** - 丰富的配置选项，满足不同需求
- 🚀 **零依赖运行时** - 生成的组件无额外依赖

## 📦 安装

### npm 安装

```bash
npm install taro-iconfont-svg -D
```

### pnpm 安装（推荐）

```bash
pnpm install taro-iconfont-svg -D
```

## 🚀 快速开始

### 1. 初始化配置文件

```bash
npx iconfont-init
```

此时项目根目录会生成一个 `iconfont.json` 的文件，内容如下：

```json
{
  "symbol_url": "请参考README.md，复制 http://iconfont.cn 官网提供的JS链接",
  "parse_local_svg": false,
  "local_svg_dir": "./src/assert/svg",
  "save_dir": "./src/components/iconfont",
  "use_typescript": true,
  "use_rpx": true,
  "default_icon_size": 18,
  "design_width": 750,
  "trim_icon_prefix": ""
}
```

### 2. 配置 iconfont.json

#### symbol_url
请直接复制 [iconfont](http://iconfont.cn) 官网提供的项目链接。请务必看清是 `.js` 后缀而不是 `.css` 后缀。如果你现在还没有创建 iconfont 的仓库，那么可以填入这个链接去测试：`http://at.alicdn.com/t/font_1373348_kk9y3jk2omq.js`

<br />

![](https://github.com/fwh1990/mini-program-iconfont-cli/blob/master/images/symbol-url.png?raw=true)

#### parse_local_svg
是否开启本地 SVG 文件解析。设置为 `true` 时，工具会解析指定目录下的 SVG 文件并生成图标组件。

#### local_svg_dir
本地 SVG 文件存放文件夹的地址。当 `parse_local_svg` 为 `true` 时，此配置项必填。

#### save_dir
根据 iconfont 图标生成的组件存放的位置。每次生成组件之前，该文件夹都会被清空。

#### use_typescript
是否生成 TypeScript 组件。设置为 `true` 时，生成的组件将包含 `.tsx` 文件和类型定义。

#### use_rpx
是否使用 [尺寸单位 rpx](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html#%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D) 还是普通的像素单位 `px`。默认值为 `true`，与 Taro 保持一致的缩放。

#### design_width
若 `use_rpx: true` 且当前设计图尺寸不为 750 时，可以通过修改这个字段来修改设计尺寸。

#### trim_icon_prefix
如果你的图标有通用的前缀，而你在使用的时候又不想重复去写，那么可以通过这种配置这个选项把前缀统一去掉。

#### default_icon_size
我们将为每个生成的图标组件加入默认的字体大小，当然，你也可以通过传入 props 的方式改变这个 size 值。

### 3. 生成图标组件

```bash
npx iconfont-taro
```

最后在项目中引入新生成的 `IconFont` 组件即可。

## 💡 使用方法

### 基础使用

```tsx
import IconFont from './src/components/iconfont'

function App() {
  return (
    <View>
      <IconFont name="icon-home" />
      <IconFont name="icon-user" size={24} />
      <IconFont name="icon-star" color="#ff6b6b" />
    </View>
  )
}
```

### 多色图标

如果你的图标有多个色块，可以通过传入颜色数组来分别设置：

```tsx
<IconFont
  name="icon-rainbow"
  color={['#ff0000', '#00ff00', '#0000ff']}
/>
```

### 自定义样式

```tsx
<IconFont
  name="icon-custom"
  size={32}
  color="#333"
  customStyle={{ margin: '10px' }}
  customClassName="custom-icon"
/>
```

## 📁 项目结构

```
taro-iconfont-svg/
├── packages/
│   ├── core/                 # 核心包
│   │   ├── src/
│   │   │   ├── commands/     # 命令行工具
│   │   │   ├── libs/         # 核心库
│   │   │   └── templates/    # 模板文件
│   │   └── package.json
│   └── examples/             # 示例项目
│       ├── src/
│       │   ├── components/   # 生成的图标组件
│       │   ├── assert/       # 本地 SVG 文件
│       │   └── pages/        # 示例页面
│       └── iconfont.json     # 示例配置
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## 🔧 开发指南

### 环境要求

- Node.js >= 16
- pnpm >= 8

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
# 在示例项目中生成图标组件
pnpm iconfont-init

# 生成图标组件
pnpm iconfont-taro

# 运行示例项目
cd packages/examples
pnpm dev
```

### 构建

```bash
# 构建核心包
pnpm build
```

## 🤝 贡献指南

欢迎提交 Issue 和 Pull Request！

### 提交 PR

1. Fork 本仓库
2. 创建你的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交你的改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 创建一个 Pull Request

### 开发规范

- 使用 TypeScript 进行开发
- 遵循 ESLint 规范
- 提交信息请使用 [Conventional Commits](https://www.conventionalcommits.org/) 格式

## 📄 许可证

本项目基于 [MIT](LICENSE) 许可证开源。

## 🙏 致谢

- [taro-iconfont-cli](https://github.com/iconfont-cli/taro-iconfont-cli) - 原始项目
- [iconfont](http://iconfont.cn) - 阿里矢量图标库

---

如果这个项目对你有帮助，请给个 ⭐️ Star 支持一下！
