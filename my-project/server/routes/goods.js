var express = require('express');
//express的路由
var router = express.Router();
//需要获取mongo的数据库
var mongoose=require('mongoose');

// 第一步获取数据模型
var Goods=require('../models/goodslist');

//链接mongodb的dumall数据库
mongoose.connect('mongodb://127.0.0.1:27017/dumall',{ useNewUrlParser: true })
//验证是否成功,监听链接成功
mongoose.connection.on("connected",function(){ console.log("连接成功")}) 
//验证是否成功,监听链接失败
mongoose.connection.on("error",function(){ console.log("连接失败")}) 
//验证是否成功,监听链接断开
mongoose.connection.on("disconnected",function(){ console.log("连接断开")}) 

//设置二级路由，查询商品信息
router.get('/list', function(req, res, next) {
    // res.send('恭喜你访问了goodlist');
    //获取前段传过来的参数并且排序y
    let page=parseInt(req.param("page"));//分页
    let pagesize=parseInt(req.param("pagesize"));//一页多少条
    let sort=req.param("sort");//使用排序sort=1是升序，sort=0是降序列
    let priceLevel=req.param("priceLevel");
    let skip=(page-1)*pagesize;//当前第几页，跳过了多少条数据之后显示在页面上  
    var priceGt="",priceLte='';//设定价格区间的最大值,最小值
    let params={};
    if(priceLevel !=='all'){
        switch(priceLevel){
            case "0":priceGt=0;priceLte=100;break;
            case "1":priceGt=100;priceLte=500;break;
            case "2":priceGt=500;priceLte=1000;break;
            case "3":priceGt=1000;priceLte=5000;break;    
        }
        params={
            salePrice:{
                $gt:priceGt,//大于最小值
                $lte:priceLte//小于等于最大值
            }
        };
    }
    
    let goodsModel=Goods.find(params).skip(skip).limit(pagesize);//find里面有链式的排序
    //查询mongodb中的salePrice进行查询
    goodsModel.sort({'salePrice':sort});
    //查询数据库，第一步获取数据模型,find是可以返回一个模型
    goodsModel.exec(function(err,doc){
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
//加入购物车
router.post('/addCar',function(req, res, next){
    var userId="100000077";
    var productId=req.body.productId;
    var User=require('../models/user')//拿到用户数据模型
    User.findOne({userId:userId},function(err,userDoc){
    //根据条件查询的第一个数据,第一个参数为查询条件
    if(err){
        res.json({
            status:"1",
            msg:err.message
        })
    }else{
        if(userDoc){
        let goodsItem=""
            userDoc.cartList.forEach(item => {
                if(item.productId==productId) {
                    goodsItem=item
                    console.log("item.productNum",item.productNum)
                    item.productNum++
                   
                }
            });
            if(goodsItem){
                userDoc.save(function(err3,doc3){
                    if(err3){
                        res.json({
                            status:"1",
                            msg:err3.message
                        })
                    }else{
                       res.json({
                           status:"0",
                           msg:"",
                           result:"suc"
                       }) 
                    }
                }); 
            }else{
                 Goods.findOne({productId:productId},function(err1,doc){
                if(err1){
                    res.json({
                        status:"1",
                        msg:err1.messagey
                    })
                }else{
                   if(doc){
                    doc.productNum="1";
                    doc.checked="1";
                    console.log("doc",doc)
                    userDoc.cartList.push(doc);
                    userDoc.save(function(err2,doc2){
                        if(err2){
                            res.json({
                                status:"1",
                                msg:err2.message
                            })
                        }else{
                           res.json({
                               status:"0",
                               msg:"",
                               result:"suc"
                           }) 
                        }
                    });
                   } 
                }  
            }) 
            }
          
        }
    }
    })
});
  module.exports = router;
  