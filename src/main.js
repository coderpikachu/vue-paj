import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import router from './router';

import drag from 'v-drag';
// 引入初始化样式文件
import '@/styles/common.scss';

import cors from 'cors';
import axios from 'axios';
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const app = createApp(App);

//const drag = require('v-drag');

app.use(createPinia().use(piniaPluginPersistedstate));
app.use(router);
app.use(cors);
app.use(drag);

axios.defaults.baseURL = '/api';

app.mount('#app');
