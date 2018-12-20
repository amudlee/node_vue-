var express = require('express');
var router = express.Router();
var User=require('./../models/user')//导入用户数据库模型
/* GET users listing.学习笔记 */
// router.get('/', function(req, res, next) {
//   res.send('恭喜你访问了用户路由');
// });
// router.get('/test', function(req, res, next) {
//   res.send('恭喜你访问了用户路由下面的二级路由test');
// });
//登录接口
router.post('/login', function(req, res, next) {
  var param={
    userName:req.body.params.userName,
    userPwd:req.body.params.userPwd
  }
  User.findOne(param,function(err,doc){
    if(err){
      res.json({
        status:"1",
        msg:err.message
      })
    }else{
      if(doc){
        //         cookie名称，cookie的值，设定的参数
        res.cookie("userId",doc.userId,{
          path:'/',//将cookie放到哪里，服务器的根目录里面,判定了所有请求目录主目录下的子目录都可以享用
          maxAge:1000*60*60*24 //cookie的有效期
        });
        // req.session[user]=doc;
        res.json({
          status:"0",
          msg:"",
          result:{
            userName:doc.userName
          }
        })
      }
    }
  })
});
//登出接口
router.post('/logout',function(req, res, next){
    res.cookie("userId","",{
      path:'/',//将cookie放到哪里，服务器的根目录里面,判定了所有请求目录主目录下的子目录都可以享用
      maxAge:0 //cookie的有效期
    });
    res.json({
      status:"0",
      msg:"",
      result:""
    })
})
module.exports = router;
