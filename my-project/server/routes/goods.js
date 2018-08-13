var express = require('express');
//express的路由
var router = express.Router();
//需要获取mongo的数据库
var mongoose=require('mongoose');

// 第一步获取数据模型
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
    // res.send('恭喜你访问了goodlist');
    //查询数据库，第一步获取数据模型
    Goods.find({},function(err,doc){
        if(err){
            //直接输出Json
            文件
           return res.json({
                status:"1",
                msg:err.message
            })
        }else{
          return res.json({
                status:"0",
                msg:"",
                result:{
                    count:doc.length,//查出来的列表总数
                    list:doc//查出来的数据列表的具体信息集合
                } 
            })
        }
    })
  });

  module.exports = router;
  