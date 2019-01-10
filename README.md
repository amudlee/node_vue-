# node_vue-
联系目标01希望在8月中旬前完成这个项目的

#启动mongodb
在电脑的windows图标的地方点击右键以管理员身份运行命令窗口
$ net start mongodb打开mongodb数据库的服务器

#如何利用工具构建node.js中的express框架
>$ npm i express-generator -g 类似与vue-cli的脚手架
查看express -version

#如何启动内嵌入的server
npm i nodemon
>$ nodemon server/bin/www启动起来node，，利用express脚手架搭建的express文件的所有配置都在www.js文件中，因此要启动这个文件

#安装mongose插件
>$ npm i mongoose --save

#在server文件夹下创建moudels文件夹，创建goodlist.js用于定义goodlist数据表的表结构，并进行模块输出
>var mongose = require('mongoose')
var Schema=mongose.Schema;//获取一个表模型  
var productSchema = new Schema({    
    "productId":String, 
    "productName":String,   
    "salePrice":Number, 
    "productImage":String,  
})
//node中匿名输出    
module.exports=mongoose.model("Good",productSchema) 
//##这里定义Good它会自动的和mongodb里面的good后面加s的数据表进行关联，因此就找到对应的表##  
// 如果数据库中没有注意命名可以指定module.exports=mongoose.model("Good",productSchema,"goods")  

##在routes中新建goods路由，记住每一个路由文件最终一定要暴露出module.exports = router##

##在app.js中引入商品路由##
var goodsRouter = require('./routes/goods');
app.use('/goods', goodsRouter);

#在路由文件goods中链接monggodb数据库，进行监听是否连接成功#
>//需要获取mongo的数据库    
var mongoose=require('mongoose');   
// 链接mongose数据库    
var Goods=require('../models/goodslist');   
//链接mongodb的dumall数据库 
mongoose.connect('mongodb://127.0.0.1:27017/dumall')    
//验证是否成功,监听链接成功 
mongoose.connection.on("connected",function(){ console.log("连接成功")})    
//验证是否成功,监听链接失败 
mongoose.connection.on("error",function(){ console.log("连接失败")})    
//验证是否成功,监听链接断开 
mongoose.connection.on("disconnected",function(){ console.log("连接断开")})     
//设置二级路由  
router.get('/', function(req, res, next) {  
    res.send('恭喜你访问了goodlist');
  });   
 module.exports = router;   


##开启服务后，在前端页面中获取后端数据##
 ###第一步，前端接口是1024，后端接口是3000因此需要解决axios跨域的问题###
 >** config>index.js文件中找到dev:属性进行设置
  >proxyTable: {//代理
      'api/':{
        target:'http://localhost:3000',
        changeOrigin: true,
        pathRewrite:{
          '^/api':'/'
      }
      }
    },

##axios请求默认是不带cookie，如何解决前后端分离跨域并且携带cookie请求。##   
##前端界面的axios模块文件中设置。##
>Axios.defaults.withCredentials = true//默认的axios请求是不会携带cookie请求的。只有设置withCredentials为true的时候才会携带请求

##后端的服务文档app.js中设置cors()跨域。（一定要写在返回头方法app.all()前）
>app.use(cors({credentials:true,origin:true})); 

>app.all('*',function (req, res, next) {  
	// 允许的请求主机名及端口号 也可以用通配符*， 表示允许所有主机请求  
    res.header('Access-Control-Allow-Origin','http://localhost:1024');  
	// 允许请求携带cookie  
  // res.Header('Access-Control-Allow-Credentials', true);  
  // 允许的请求头  
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');  
  //允许的请求方式  
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');    
  res.header("X-Powered-By",' 3.2.1')   
  res.header("Content-Type", "application/json;charset=utf-8"); 
  if (req.method == 'OPTIONS') {    
    res.send(200); //让options请求快速返回  
  }
  else {    
    next();
  }

##后端，当一个请求有两个返回信息时，就会报错。因此要注意中间件的使用。一个请求只有一个响应结果
>app.js中在判断是否已经登录，是根据前端在发送请求的时候是否携带cookie,如果有cookieid那么就直接next()，服务器端相应对应的路由做出响应。如果这个时候中间件也做出了返回数据，则会报错。因为相当于同一个请求响应了两个结果

##模态框的组件编写，父子组件的相互影响
>``<template><div id="father"> 这是父组件 ``  
>``<son :sonvalue="fatherdata" v-on:close="closepannel"> 父组件的值传到子组件</son>``
>``</div></template>``
>
>``<script>``  
&#8194;&#8194;&#8194;export default{  
&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;data():{return {  
&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;atherdata:1} //父组件中的值},  
&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;methods:{  
&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;closepannel(){XXXX}//子组件中通过this.emit触发父组件的自定义close事件
    }}
>
>``</script>``

>``<template><div id="son"> 这是子组件 </div></template>``    
>
>``<script>``  
&#8194;&#8194;&#8194;export default{  
&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;props:[sonvalue],//子组件中接受父组件传递过来的值  
&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;methods:{  closemodal() {//触发父组件的close事件  
&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;&#8194;this.$emit("close");}  }}
>
>``</script>`` 

##模态框在父组件中的应用，一个父组件中可以插入n个相同的子组件。在浏览器的父组件单页面中会n次绘画子组件模块。在子组件中设置的卡槽这个时候就起到了在父组件中插入相同的子组件模块但是根据不同的场景显示不同的模态框内容。。详见goodlist.vue中的购物车失败成功的模态框,子组件modal.vue。  
  
##购物车的登录或退出重新优化刷新当前界面   
>在app.vue中绑定全局``<router-view v-if="isRouterAlive"></router-view>``isRouterAlive来控制指定路由的显示和隐藏 
可以 router-view 当做是一个容器，它渲染的组件是你使用 vue-router 指定的.  
>详情看app.vue中注册的全局方法  
>在子组件中首先引入全局reload方法，export default {inject: ['reload']},
>在子组件的某个方法中调用，methods：{reload(){this.reload}}//优雅刷新当前页面  
  
##全选，取消全选。结合computed计算属性


##价格的总和，结合computed计算属性

##引入价格格式化插件，利用自定义过滤器进行全局或者局部的价格格式化
