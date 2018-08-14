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
    //获取前段传过来的参数并且排序
    let page=req.param("page");//分页
    let pagesize=req.param("pagesize")//一页多少条
    let sort=req.param("sort");//使用排序sort=1是升序，sort=0是降序列
    let skip=(page-1)*pagesize;//当前第几页，跳过了多少条数据之后显示再页面上
    let params={};
    let goodsModel=Goods.find(params).skip(skip).limit(pagesize);//find里面有链式的排序
    //查询mongodb中的salePrice进行查询
    goodsModel.sort({'salePrice':sort});

    //查询数据库，第一步获取数据模型,find是可以返回一个模型
    Goods.find({},function(err,doc){
        if(err){
            //直接输出Json文件
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
  