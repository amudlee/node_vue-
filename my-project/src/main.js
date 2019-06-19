// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'//引入根组件
import router from './router'//引入路由配置文件,index.js可以省略不写
import store from './store/store.js'//引入vuex配置文件
import ElementUI from 'element-ui'
import infiniteScroll from 'vue-infinite-scroll'
import '../node_modules/element-ui/lib/theme-chalk/index.css';
import VueLazyload from 'vue-lazyload'
//全局导入价格过滤器插件
import {currency} from "./util/currency.js";//引入现金保留小数点位数以及按照位数加点的插件，来自尤玉溪的github

Vue.use(ElementUI);
Vue.use(VueLazyload)
Vue.use(infiniteScroll)
Vue.config.productionTip = false;//阻止启动时打印消息，打印console.log中的内容

// 引入组件样式文件
import "./assets/css/base.css"
import "./assets/css/checkout.css"
import "./assets/css/login.css"
import "./assets/css/product.css"


Vue.filter("currency",currency)//这样在全局都可以{value|currency(符号，保留小数点)}}使用价格过滤器了


/* eslint-disable no-new */
Vue.use(VueLazyload, {//懒加载
  preLoad: 1.3,
  // error: 'dist/error.png',
  loading: './@/static/loading-svg/loading-bubbles.svg',
  attempt: 1
})

 /*new Vue一旦开始，首先会调用_init函数进行初始化，init过程中会初始化data,生命周期函数,methods,computed,props，watch等。
  其中最重要的是利用Object.defineProperty设置setter和getter（存储器属性）函数，用来实现响应式和依赖收集。
  */
new Vue({
  el: '#app',//指是index.html中的<div id="app">，提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTMLElement 实例。如果在实例化的时候，存在这个选项，则会立即进入编译过程，否则会进入$.mount手动开启编译
  router,//挂载路由
  store,//挂载vux数据管理
  components: { App },
  /*初始化之后调用$mount会挂载组件，如果是运行时编译,即不存在render Function 
  但是存在template的情况，需要进行【编译】步骤*/
  template: '<App/>'//一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素,如果值以 # 开始，则它将被用作选择符，并使用匹配元素的 innerHTML 作为模板。
  /* compile编译可以分成 parse、optimize 与 generate 三个阶段，最终需要得到 render function。*/ 
  /**parse(转译)：parse 会用正则等方式解析 template 模板中的指令、class、style等数据，形成AST。 */
  /*optimize 的主要作用是标记static静态资源，这是vue在编译过程中的优化，
            后面当update页面时，会有一个patch过程。diff算法会直接跳过静态节点，从而跳过比较的过程*/
  /**generate是将AST转化成render Function字符串的过程，得到的记过是render的字符串以及staticRender function */
}) 
