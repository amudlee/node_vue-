var mongoose = require('mongoose')
var Schema=mongoose.Schema;//获取一个表模型
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