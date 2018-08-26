// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
Vue.use(ElementUI);
Vue.use(VueLazyload)
Vue.use(infiniteScroll)
Vue.config.productionTip = false

// 引入组件样式文件
import "./assets/css/base.css"
import "./assets/css/checkout.css"
import "./assets/css/login.css"
import "./assets/css/product.css"


/* eslint-disable no-new */
Vue.use(VueLazyload, {
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: './@/static/loading-svg/loading-bubbles.svg',
  attempt: 1
})
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>' 
})
