// import { resolve } from "path";
import { PluginOption } from "vite";
// import { VitePWA } from "vite-plugin-pwa";
import { visualizer } from "rollup-plugin-visualizer";
// import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
// import eslintPlugin from "vite-plugin-eslint";
import viteCompression from "vite-plugin-compression";
import simpleHtmlPlugin from "vite-plugin-simple-html";
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";

/**
 * 创建 vite 插件
 * @param viteEnv
 */
export const createVitePlugins = (viteEnv: ViteEnv): (PluginOption | PluginOption[])[] => {
  const { VITE_GLOB_APP_TITLE, VITE_REPORT, VITE_PWA } = viteEnv;
  return [
    vue(),
    // vue 可以使用 jsx/tsx 语法
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
      imports: ["vue", "vue-router"],
      // dirs: ['src/composables'],
      //为true时在项目根目录自动创建
      dts: "src/typings/auto-imports.d.ts"
    }),
    /**
     * dirs 指定组件位置，默认是src/components
     * resolvers:自定义组件的解析器 [ElementPlusResolver()], ui库解析器
     * dts 生成 `components.d.ts` 全局声明,也接受自定义文件名的路径,配置文件生成位置
     * extensions: ['vue'],组件的有效文件扩展名
     * deep: true,搜索子目录
     * directoryAsNamespace: false,允许子目录作为组件的命名空间前缀。
     * globalNamespaces: [],忽略命名空间前缀的子目录路径
     * directives: true,自动导入指令
     * include: [/.vue$/, /.vue?vue/],
     * exclude: [/[\/]node_modules[\/]/, /[\/].git[\/]/, /[\/].nuxt[\/]/],
     */
    Components({
      resolvers: [
        ElementPlusResolver()
        // (componentName) => {
        //   if (componentName.startsWith('Icon')) {
        //     return { name: componentName.slice(4), from: '@icon-park/vue-next' }
        //   }
        // },
      ],
      dirs: ["src/components"],
      //组件名称包含目录，防止同名组件冲突
      directoryAsNamespace: false,
      //指定类型声明文件，为true时在项目根目录创建
      dts: "src/typings/components.d.ts"
    }),
    // esLint 报错信息显示在浏览器界面上
    // eslintPlugin(),
    // name 可以写在 script 标签上
    vueSetupExtend({}),
    // 创建打包压缩配置
    createCompression(viteEnv),
    // 注入变量到 html 文件
    simpleHtmlPlugin({
      minify: true,
      inject: {
        data: { title: VITE_GLOB_APP_TITLE }
      }
    }),
    // 使用 svg 图标
    // createSvgIconsPlugin({
    //   iconDirs: [resolve(process.cwd(), "src/assets/icons")],
    //   symbolId: "icon-[dir]-[name]"
    // }),
    // vitePWA
    // VITE_PWA && createVitePwa(viteEnv),
    // 是否生成包预览，分析依赖包大小做优化处理
    VITE_REPORT && (visualizer({ filename: "stats.html", gzipSize: true, brotliSize: true }) as PluginOption)
  ];
};

/**
 * @description 根据 compress 配置，生成不同的压缩规则
 * @param viteEnv
 */
const createCompression = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
  const { VITE_BUILD_COMPRESS = "none", VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE } = viteEnv;
  const compressList = VITE_BUILD_COMPRESS.split(",");
  const plugins: PluginOption[] = [];
  if (compressList.includes("gzip")) {
    plugins.push(
      viteCompression({
        ext: ".gz",
        algorithm: "gzip",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  if (compressList.includes("brotli")) {
    plugins.push(
      viteCompression({
        ext: ".br",
        algorithm: "brotliCompress",
        deleteOriginFile: VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE
      })
    );
  }
  return plugins;
};

/**
 * @description VitePwa
 * @param viteEnv
 */
// const createVitePwa = (viteEnv: ViteEnv): PluginOption | PluginOption[] => {
//   const { VITE_GLOB_APP_TITLE } = viteEnv;
//   return VitePWA({
//     registerType: "autoUpdate",
//     manifest: {
//       name: VITE_GLOB_APP_TITLE,
//       short_name: VITE_GLOB_APP_TITLE,
//       theme_color: "#ffffff",
//       icons: [
//         {
//           src: "/logo.png",
//           sizes: "192x192",
//           type: "image/png"
//         },
//         {
//           src: "/logo.png",
//           sizes: "512x512",
//           type: "image/png"
//         },
//         {
//           src: "/logo.png",
//           sizes: "512x512",
//           type: "image/png",
//           purpose: "any maskable"
//         }
//       ]
//     }
//   });
// };
