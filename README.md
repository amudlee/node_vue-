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

#在server问加价下创建moudels文件夹，创建goodlist.js用于定义goodlist数据表的表结构，并进行模块输出
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