// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
//全局导入价格过滤器插件
import {currency} from "./util/currency.js";//引入现金保留小数点位数以及按照位数加点的插件，来自尤玉溪的github

Vue.use(ElementUI);
Vue.use(VueLazyload)
Vue.use(infiniteScroll)
Vue.config.productionTip = false

// 引入组件样式文件
import "./assets/css/base.css"
import "./assets/css/checkout.css"
import "./assets/css/login.css"
import "./assets/css/product.css"


Vue.filter("currency",currency)//这样在全局都可以{value|currency(符号，保留小数点)}}使用价格过滤器了


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
