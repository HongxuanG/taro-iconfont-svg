<h1 align='center'>taro-iconfont-svg</h1> 
<p align='center'>一款针对 taro3x 的 svg 类型iconfont 组件生成器</p>

本仓库源码出自[taro-iconfont-cli](https://github.com/iconfont-cli/taro-iconfont-cli),由于原仓库无人维护合并pr，所以本人基于 taro-iconfont-cli 自己维护这套源码，欢迎大家一起维护，有问题可以提 issue，我会尽快解决。

> 灵感来源：[taro-iconfont-cli](https://github.com/iconfont-cli/taro-iconfont-cli) 

通过 background:url(data:svg+xml....) 的形式 在小程序上把svg显示出来，目前在公司内部开发中得到实际应用。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5265333348ac4044a04175ddca83ea27~tplv-k3u1fbpfcp-watermark.image?)

试验田请访问：[taro-test-iconfont-svg](https://github.com/HongxuanG/taro-test-iconfont-svg)

# 支持平台
- 微信小程序

# 支持框架
- React

# 用法

## npm 安装

```bash
npm install taro-iconfont-svg -D
```

## 也可使用 pnpm 安装

```bash
pnpm install taro-iconfont-svg -D
```

## 初始化 iconfont.json 文件

```bash
执行 npx iconfont-init 初始化配置
```
此时项目根目录会生成一个`iconfont.json`的文件，内容如下：
```json
{
  "symbol_url": "请参考README.md，复制 http://iconfont.cn 官网提供的JS链接",
  "parse_local_svg": false,
  "local_svg_dir": "./src/assert/svg",
  "save_dir": "./src/components/iconfont",
  "default_icon_size": 18,
}
```

填上阿里矢量图标的svg地址（symbol_url） 

### symbol_url
请直接复制[iconfont](http://iconfont.cn)官网提供的项目链接。请务必看清是`.js`后缀而不是.css后缀。如果你现在还没有创建iconfont的仓库，那么可以填入这个链接去测试：`http://at.alicdn.com/t/font_1373348_kk9y3jk2omq.js`

<br />

![](https://github.com/fwh1990/mini-program-iconfont-cli/blob/master/images/symbol-url.png?raw=true)

### save_dir
根据iconfont图标生成的组件存放的位置。每次生成组件之前，该文件夹都会被清空。

<!-- ### use_rpx
是否使用[尺寸单位rpx](https://developers.weixin.qq.com/miniprogram/dev/framework/view/wxss.html#%E5%B0%BA%E5%AF%B8%E5%8D%95%E4%BD%8D)还是普通的像素单位`px`。默认值为true，与Taro保持一致的缩放。您也可以设置为false，强制使用`px` -->

<!-- ### design_width
若 `use_rpx: true` 且当前设计图尺寸不为 750 时，可以通过修改这个字段来修改设计尺寸。 -->

<!-- ### trim_icon_prefix
如果你的图标有通用的前缀，而你在使用的时候又不想重复去写，那么可以通过这种配置这个选项把前缀统一去掉。 -->

### default_icon_size
我们将为每个生成的图标组件加入默认的字体大小，当然，你也可以通过传入props的方式改变这个size值。

### parse_local_svg
是否开启本地svg文件解析

### local_svg_dir
本地svg文件存放文件夹的地址

## 生成自定义组件
```bash
执行 npx iconfont-taro 生成自定义组件iconfont
```
最后在项目中引入新生成的`IconFont`组件即可

##### IconFont 组件

| 参数              | 类型                | 说明                               | 默认值 |
|:----------------|:------------------|:---------------------------------|:----|
| name            | string            | 阿里矢量图标Symbol名称，字段唯一表示，必须唯一       | -   |
| size            | number            | 图标字体大小                           | -   |
| color           | string ｜ string[] | 图标颜色，如果图标有多个色块，请十六进制颜色字符串组成的数组表示 | -   |
| customStyle     | CSSProperty       | 自定义行内样式style                     | -   |
| customClassName | string            | 自定义样式class类名                     | -   |
