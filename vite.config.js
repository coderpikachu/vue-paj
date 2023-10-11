import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// elementPlus按需导入
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import * as requireTransform from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // requireTransform.default({
    //   fileRegex: /.js$|.vue$/,
    // }),
    // ...
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [
        // 1. 配置elementPlus采用sass样式配色系统
        ElementPlusResolver({ importStyle: 'sass' }),
      ],
    }),
  ],
  resolve: {
    // 实际的路径转换  @  -> src
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  // server: {
  //   port: 3000,
  //   proxy: {
  //     '/api0': 'https://x1-6833.native.qq.com/x1/6833',
  //   },
  // },
  server: {
    //主要是加上这段代码
    host: 'localhost',
    port: 8002,
    proxy: {
      '/api': {
        target: 'https://comp-sync.webapp.163.com', //实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      '/go': {
        target: 'http://101.43.168.151:8004', //实际请求地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/go/, ''),
      },
    },
  },
  // server: {
  //   //主要是加上这段代码
  //   host: '127.0.0.1',
  //   port: 5173,
  //   proxy: {
  //     '/api': {
  //       target: 'https://x1-6833.native.qq.com/x1/6833', //实际请求地址
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //     '/lol': {
  //       target: 'https://lol.qq.com', //实际请求地址
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/lol/, ''),
  //     },
  //   },
  // },
  build: {
    chunkSizeWarningLimit: 1500,
  },
  css: {
    preprocessorOptions: {
      scss: {
        // 2. 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
          @use "@/styles/var.scss" as *;
        `,
      },
    },
  },
});
