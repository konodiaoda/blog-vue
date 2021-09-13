import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

 const routes =[
    {
      path: "/",
      component: resolve=> require (['../views/home/Home'],resolve),
      meta: {
        title: "个人博客"
      }
    },
    {
      path: "/tags",
      component: resolve => require(["../views/tag/Tag"], resolve),
      meta: {
        title: "标签"
      }
    },
  ]



const router = new VueRouter({
  mode: "history",
  routes
});

export default router;
