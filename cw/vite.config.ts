import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:8888', // 后端API地址
                changeOrigin: true, // 是否修改请求头中的Origin
                rewrite: path => path.replace(/^\/api/, ''), // 重写路径
            },
            '/java': {
                target: 'http://localhost:8080/his', // 后端API地址
                changeOrigin: true, // 是否修改请求头中的Origin
                rewrite: path => path.replace(/^\/java/, ''), // 重写路径
            },
        },
    },
    plugins: [vue()],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
        },
    },
});
