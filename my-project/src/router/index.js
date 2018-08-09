import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import transition from '@/view/transition'
import GoodList from '@/view/GoodList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
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
    }
  ]
})
