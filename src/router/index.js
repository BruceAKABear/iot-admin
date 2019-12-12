import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login'
import Home from '../views/home/Home'
import WeixinMicroCheckInIn from '../views/WeixinMicroCheckIn'
import WeixinMicroUpdate from '../views/WeixinMicroUpdate'
import WeixinMicroModifyBankInfo from '../views/WeixinMicroModifyBankInfo'
import WeixinMicroModifyContactInfo from '../views/WeixinMicroModifyContactInfo'
import GoodsList from '../views/goods/GoodsList'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/',
    name: 'home',
    component: Home,
    children: [
      {
        path: 'goodslist',
        name: 'goodslist',
        component: GoodsList
      }

    ]
  },
  {
    path: '/weixinMicroCheckInIn',
    name: 'weixinMicroCheckInIn',
    component: WeixinMicroCheckInIn
  },
  {
    path: '/weixinMicroUpdate',
    name: 'weixinMicroUpdate',
    component: WeixinMicroUpdate
  },
  {
    path: '/weixinMicroModifyBankInfo',
    name: 'weixinMicroModifyBankInfo',
    component: WeixinMicroModifyBankInfo
  },
  {
    path: '/weixinMicroModifyContactInfo',
    name: 'weixinMicroModifyContactInfo',
    component: WeixinMicroModifyContactInfo
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
