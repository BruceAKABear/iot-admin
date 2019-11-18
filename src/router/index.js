import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/Home'
import WeixinMicroIn from '../views/WeixinMicroIn'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    redirect: 'weixinMicroIn'

  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/weixinMicroIn',
    name: 'weixinMicroIn',
    component: WeixinMicroIn
  }
  // 需要设置配置404及500
]

const router = new VueRouter({
  routes
})
// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    // const tokenstr = window.sessionStorage.getItem('token')
    // if (!tokenstr) {
    //   return next('/login')
    // }
    next()
  }
})

export default router
