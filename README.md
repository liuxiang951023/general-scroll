# GeneralScroll

![npm](https://img.shields.io/npm/v/general-scroll)
![gitHub](https://github.com/liuxiang951023/general-scroll)

智能自适应滚动库，支持无缝循环滚动和响应式布局

## 目录

- [特性](#特性-)
- [安装](#安装-)
- [基础用法](#基础用法-)
- [API 文档](#api-文档-)
- [插件开发](#插件开发-)
- [技术要求](#技术要求-)
- [浏览器支持](#浏览器支持-)
- [贡献指南](#贡献指南-)
- [许可证](#许可证-)

## 特性 ✨

- 双向滚动支持（垂直/水平）
- 智能内容克隆实现无缝循环
- 基于 ResizeObserver 的容器尺寸监听
- 高性能 requestAnimationFrame 动画
- 可扩展的插件系统
- 鼠标悬停暂停/继续交互
- 自动内存清理机制

## 安装 📦

```bash
# npm
npm install general-scroll --save

# yarn
yarn add general-scroll

# 需要ResizeObserver polyfill（针对旧浏览器）
npm install resize-observer-polyfill --save

```

## 基础用法 🚀

```bash
# 容器结构
<div id="container"></div>

# 引入插件
import GeneralScroll from "general-scroll";

# 初始化实例
  const scroller = new GeneralScroll("#container", {
    direction: "vertical",
    speed: 2,
  });

# 启动滚动
  scroller.start();

```

## API 📖

```bash
# 构造函数
new GeneralScroll(container, options)
```

| 方法                | 参数      | 类型              | 必填 | 说明                             |
| ------------------- | --------- | ----------------- | ---- | -------------------------------- |
| `new GeneralScroll` | container | Element \| string | 是   | 接收 DOM 元素或 CSS 选择器字符串 |
|                     | options   | Object            | 否   | 配置选项对象（见下方配置表）     |

# 配置选项

| 属性      | 类型    | 默认值     | 说明                                                     |
| --------- | ------- | ---------- | -------------------------------------------------------- |
| speed     | number  | 50         | 滚动速度（单位：像素/秒）                                |
| autoStart | boolean | true       | 是否在初始化后自动开始滚动                               |
| cloneNode | boolean | true       | 是否自动克隆节点实现无缝循环滚动                         |
| direction | string  | 'vertical' | 滚动方向：可选 'vertical'（垂直）或 'horizontal'（水平） |

# 实例方法

| 方法      | 参数     | 返回值 | 说明                                                                                         |
| --------- | -------- | ------ | -------------------------------------------------------------------------------------------- |
| start()   | -        | void   | 手动启动滚动（当 autoStart=false 时使用）                                                    |
| pause()   | -        | void   | 暂停滚动（保持当前位置）                                                                     |
| resume()  | -        | void   | 从暂停状态恢复滚动                                                                           |
| stop()    | -        | void   | 完全停止并复位到起始位置                                                                     |
| destroy() | -        | void   | 销毁实例，执行以下清理：<br>• 停止动画<br>• 移除克隆节点<br>• 断开尺寸监听<br>• 移除事件监听 |
| use()     | Function | this   | 注册插件（支持链式调用）                                                                     |

````

# 插件开发 ⚙️

```bash
# 插件模板
export default function myPlugin(instance) {
# 访问实例配置
console.log('Current speed:', instance.options.speed)

# 添加自定义方法
instance.setSpeed = (newSpeed) => {
instance.options.speed = newSpeed
}

# 添加自定义事件
instance.container.addEventListener('click', () => {
console.log('Container clicked!')
})
}

# 使用插件
import myPlugin from './myPlugin'

new GeneralScroll('.container')
.use(myPlugin)

````

# 技术要求 💻

```bash
现代浏览器支持 ES6+ 语法
需要 ResizeObserver API 支持（IE11 需要 polyfill）
推荐使用 requestAnimationFrame polyfill 兼容旧浏览器

```

# 浏览器支持 🌐

```bash
浏览器 最低版本 备注
Chrome 64+ 原生支持
Firefox 69+ 原生支持
Safari 13.1+ 需要 polyfill
Edge 79+ 原生支持
iOS Safari 13.4+ 需要 polyfill
Android 6.0+ 需要 polyfill

```

# 贡献指南 👥

```bash
Fork 项目仓库
创建特性分支 (git checkout -b feature/your-feature)
提交修改 (git commit -am 'Add some feature')
推送分支 (git push origin feature/your-feature)
创建 Pull Request

```

# 许可证 📜

```bash
MIT License © 2025 芒打酱油 (lx1635116539@163.com)

```
