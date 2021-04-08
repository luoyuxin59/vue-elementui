import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Home,
    meta: {title: '首页'},
    children: [  
      {
        path: '/form',
        component: () => import ('../views/From.vue'),
        meta: {title: '表单'}
      },
      {
        path: '/table',
        component: () => import ('../views/Table.vue'),
        meta: {title: '表格'}
      },
      {
        path: '/upload',
        component: () => import ('../views/Upload.vue'),
        meta: {title: '文件上传下载'}
      },
    ]
  },
  {
    path: '/home',
    // name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Home.vue'),
    meta: {title: '首页'}
  },

]

const router = new VueRouter({
  routes
})

export default router
