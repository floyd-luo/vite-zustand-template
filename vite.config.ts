import { defineConfig } from "vite";
import * as path from "path";
import externalGlobals from "rollup-plugin-external-globals";
import { createHtmlPlugin } from "vite-plugin-html";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { apiAddress, proxyApi } from "./src/utils/host";
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      [proxyApi]: {
        target: apiAddress[process.argv[3]],
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  esbuild: {
    drop: process.argv[3] === "prod" ? ["console", "debugger"] : [],
  },
  build: {
    target: "es2020",
    minify: "esbuild",
    rollupOptions: {
      output: {
        chunkFileNames: "js/[name]-[hash].js", // 引入文件名的名称
        entryFileNames: "js/[name]-[hash].js", // 包的入口文件名称
        assetFileNames: "[ext]/[name]-[hash].[ext]", // 资源文件像 字体，图片等
      },
      external: ["react", "react-dom", "axios"],
      plugins: [
        externalGlobals({
          // "在项目中引入的变量名称"："CDN包导出的名称，一般在CDN包中都是可见的"
          react: "React",
          axios: "axios",
          "react-dom": "ReactDOM",
        }),
      ],
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
    extensions: [".js", ".jsx", ".ts", ".tsx"],
  },
  css: {
    preprocessorOptions: {
      scss: {
        javascriptEnabled: true,
        additionalData: `$injectedColor: orange;`,
      },
    },
    modules: {
      // 是对css模块化的默认行为进行覆盖
      localsConvention: "camelCase", // 修改生成的配置对象的key的展示形式(驼峰还是中划线形式)
      scopeBehaviour: "local", // 配置当前的模块化行为是模块化还是全局化 (有hash就是开启了模块化的一个标志, 因为他可以保证产生不同的hash值来控制我们的样式类名不被覆盖)
      generateScopedName: "[name]_[local]_[hash:5]",
      // generateScopedName: (name, filename, css) => {
      //     // name -> 代表的是你此刻css文件中的类名
      //     // filename -> 是你当前css文件的绝对路径
      //     // css -> 给的就是你当前样式
      //     console.log('name', name, 'filename', filename, 'css', css) // 这一行会输出在哪？？？ 输出在node
      //     // 配置成函数以后, 返回值就决定了他最终显示的类型
      //     return `${name}_${Math.random().toString(36).substr(3, 8)}`
      // },
      hashPrefix: "dreamer_rossi", // 生成hash会根据类名 + 一些其他的字符串(文件名 + 他内部随机生成一个字符串)去进行生成, 如果想要生成hash更加的独特一点, 可以配置hashPrefix, 配置的这个字符串会参与到最终的hash生成, （hash: 只要字符串有一个字不一样, 那么生成的hash就完全不一样, 但是只要字符串完全一样, 生成的hash就会一样）
    },
  },
  define: {},
  plugins: [
    reactRefresh(),
    createHtmlPlugin({
      minify: true,
      inject: {
        data: {
          reactscript:
            '<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react/18.2.0/umd/react.production.min.js"></script>',
          reactdomscript:
            '<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/react-dom/18.2.0/umd/react-dom.production.min.js"></script>',
          axiosscript:
            '<script crossorigin src="https://cdnjs.cloudflare.com/ajax/libs/axios/1.6.2/axios.min.js"></script>',
        },
      },
    }),
  ],
});
