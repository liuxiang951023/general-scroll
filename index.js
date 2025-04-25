// 核心类导出
export { GeneralScroll } from "./core/generalScroll";

// 插件统一导出
export * as Plugins from "./plugins/index";

// 可选：默认插件自动加载
import { touchPlugin, resizePlugin } from "./plugins/index";
export const defaultPlugins = [touchPlugin, resizePlugin];

// 快捷初始化方法（可选）
export function createScroller(container, options = {}) {
  const scroller = new GeneralScroll(container, options);
  defaultPlugins.forEach((plugin) => scroller.use(plugin));
  return scroller;
}
