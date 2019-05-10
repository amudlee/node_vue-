import Vue from 'vue'
import Router from 'vue-router'
import transition from '@/view/transition'
import GoodList from '@/view/GoodList'
import address from '@/view/address'
import cart from '@/view/cart'
import orderConfirm from '@/view/orderConfirm.vue'
import orderSuccess from '@/view/orderSuccess.vue'
 
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
      component:cart
    },
    {
      path: '/address',
      name: '地址',
      component:address
    },
    {
      path: '/orderConfirm',
      name: '订单确认',
      component:orderConfirm
    },
    {
      path: '/orderSuccess',
      name: '支付成功',
      component:orderSuccess
    }
  ]
})
