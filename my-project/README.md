#vue+node.js仿写商城

> A Vue.js project

## Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

##网页总思路
>1.vue实例挂载到<div id="app">上，设置好路由文件中的组件关系，确认模板元素
>new Vue({ 
>    el:"#app",
>    router,
>    components:{App}
>    template:"<App/>"
> })
>

