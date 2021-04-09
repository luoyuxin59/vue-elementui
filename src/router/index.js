import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    component: () => import ('../views/Login.vue'),
    meta: {title: '表单'}
  },
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
      {
        path: '/import',
        component: () => import ('../views/ImprotExcel.vue'),
        meta: {title: '导入导出'}
      }
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

// router.beforeEach((to,from,next) => {
//   if (to.meta.title) {
//     document.title = to.meta.title
//   }
//   if(to.path === '/login') return next()
//   // 获取token
//   const tokenStr = window.sessionStorage.getItem('token')
//   if(!tokenStr) return next('/login')
//   next() 
  
//   // const role = window.sessionStorage.getItem('role')
//   // let editList = ['/editMobileCommunication']
//   // editList.map(item => {
//   //   if(to.path ===  item) {
//   //     if(role == 3) {
//   //       // next('/login')
//   //     }
//   //   }
//   // })
// })
export default router
