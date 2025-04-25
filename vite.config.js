// vite.config.js
import { defineConfig } from "vite";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: "./src/index.js",
      name: "Generalscroll",
      fileName: (format) => `general-scroll.${format}.js`,
    },
    rollupOptions: {
      // 排除不需要打包的依赖
      external: [],
      output: {
        globals: {},
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // 路径别名
    },
  },
});
