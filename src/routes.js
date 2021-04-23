
import routeLoading from './components/routeLoading';
import index from './components/index.vue';
import newPage from './components/newPage.vue';


export default {
  /**
   * 阻止 Android 上 Back 键触发页面返回
   * 默认值为 false，就是开启 Back 键返回。
   */
  disableAutoBack: true,

  /**
   * 定义路由
   * 这里偷了个懒直接做了个大数组，跟 Menu.vue 里互相匹配动态加载。
   */
  routes: [
    {
      path: '/',
      component: routeLoading,
    },
    {
      path: '/index',
      component: index,
    },
    {
      path: '/newPage',
      component: newPage,
    },
  ],
};
