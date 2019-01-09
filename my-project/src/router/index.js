import Vue from 'vue'
import Router from 'vue-router'
import transition from '@/view/transition'
import GoodList from '@/view/GoodList'
import cart from '@/view/cart'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      // name: 'HelloWorld',
      // component: HelloWorld,
      redirect: '/goodlist'//路由重定向
    },
    {
      path: '/transition',
      name: 'transition',
      component: transition
    },
    {
      path: '/goodlist',
      name: '商品页',
      component: GoodList
    },
    {
      path: '/cart',
      name: '购物车',
      component: cart
    }
  ]
})
