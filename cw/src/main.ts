import { createApp } from 'vue';
import App from './App.vue';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
// import router from "./router/index";
//导入 文件夹,相当于是导入的文件夹下下的  index.ts  js  index.vue
import router from './router';

/*1  引入createPinia，用于创建pinia */

/*2 创建pinia */

let app = createApp(App);

//注册路由表
app.use(router);

//注册全局组件
app.use(ElementPlus);

/*3 使用插件 */
app.mount('#app');
