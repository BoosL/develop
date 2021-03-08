import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import { Toast } from 'vant'

//判断是否登录
const isLogin = (to:any, from:any, next:any) => {
  if (window.localStorage.getItem("userInfo")) {
    next();
  } else {
    Toast("未登录，3秒后跳至登录");
    setTimeout(() => {
      next("/login");
    }, 3000);
  }
};
// 解决两次访问相同路由地址报错
const originalPush = createRouter.prototype.push;
createRouter.prototype.push = function push(location:any) {
  return originalPush.call(this, location).catch((err:any) => err);
};

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/login"
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../pages/login/login.vue"),
  },
  {
    path: "/singleProduct",
    name: "singleProduct",
    component: () => import("../pages/aboutIndex/singleProduct.vue"),
    beforeEnter: isLogin
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

export default router;
