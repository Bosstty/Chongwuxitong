import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
    history: createWebHistory(),

    //定义路由表

    routes: [
        {
            path: '/',
            redirect: '/login',
        },
        {
            path: '/login',
            component: () => import('@/views/Login.vue'),
        },
        {
            path: '/home',
            component: () => import('@/views/Home/index.vue'),
            children: [
                {
                    path: '/home/home',
                    component: () => import('@/views/Home/home.vue'),
                },
                {
                    path: '/home/diary/daily',
                    component: () => import('@/views/diary/daily.vue'),
                },
                {
                    path: '/home/diary/motion',
                    component: () => import('@/views/diary/motion.vue'),
                },
                {
                    path: '/home/diary/nurturance',
                    component: () => import('@/views/diary/nurturance.vue'),
                },
                {
                    path: '/home/Bookkeeping',
                    component: () => import('@/views/Bookkeeping/index.vue'),
                },
                {
                    path: '/home/accomplishment',
                    component: () => import('@/views/accomplishment/index.vue'),
                },
                {
                    path: '/home/Personal/UserInfo',
                    component: () => import('@/views/Personal/UserInfo.vue'),
                },
                {
                    path: '/home/Personal/handoff',
                    component: () => import('@/views/Personal/handoff.vue'),
                },
                {
                    path: '/home/concern',
                    component: () => import('@/views/concern/index.vue'),
                },
            ],
        },
    ],
});
/*let whiteList = ["/login"];

//在每次路由切换的时候 需要 做判断
router.beforeEach((to, from, next) => {
  // console.log("路由切换了 ，判断是否登录 ,to.path", to);
  let username = sessionStorage.getItem("username");
  // let success: boolean = ;

  //如果没登录， 1 跳转登录页面、
  if (username || whiteList.indexOf(to.path) != -1) {
    next();
  } else {
    next("/login");
  }

  //如果已经登录 2 放行
});
*/
export default router;
