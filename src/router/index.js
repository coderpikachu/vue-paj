// createRouter：创建router实例对象
// createWebHistory：创建history模式的路由

import { createRouter, createWebHistory } from 'vue-router';
import Layout from '@/views/Layout/index.vue';
import Home from '@/views/Home/index.vue';
import Detail from '@/views/Detail/index.vue';
import Draggable from '@/views/Home/components/draggable.vue';
import Transfer_counter from '@/views/Detail/components/transfer_counter.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和component对应关系的位置
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        {
          path: '',
          component: Home,
        },
      ],
    },
    { path: '/detail/:id', component: Detail },
    // { path: '/test', component: Draggable },
    { path: '/test', component: Transfer_counter },
  ],
  // 路由滚动行为定制
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;
