var mongoose = require('mongoose')
var userSchema = new mongoose.Schema({
    "userId":String,
    "userName":String,
    "userPwd":String,
    "orderList":Array,
    "cartList":[
      {
        "productId":String,
        "productName":String,
        "salePrice":String,
        "productImage":String,
        "checked":String,
        "productNum":String
      }
    ],
    "addressList":[
      {
        "addressId": String,
        "userName": String,
        "streetName": String,
        "postCode": Number,
        "tel": Number,
        "isDefault": Boolean
      }
    ]
  });
//node中匿名输出
module.exports=mongoose.model("User",userSchema,'users')
//mongodb里面的集合名字最好后面逗加名字，要是没加就添加第三个参数指定集合的名字9-6