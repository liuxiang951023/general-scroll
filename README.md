# GeneralScroll

![npm](https://img.shields.io/npm/v/general-scroll)
![License](https://img.shields.io/badge/license-MIT-green)

智能自适应滚动库，支持无缝循环滚动和响应式布局

## 目录

- [特性](#特性-)
- [安装](#安装-)
- [基础用法](#基础用法-)
- [高级配置](#高级配置-)
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
