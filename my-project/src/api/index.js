// import Vue from "vue"
// import apiConfig from '../../config/api.config'

import Axios from 'axios'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = "http://localhost:3000"
Axios.defaults.withCredentials = true//默认的axios请求是不会携带cookie请求的。只有设置withCredentials为true的时候才会携带请求

//判断是否已经登录
export const checkLogin=params=>{
    return Axios.get('/users/checklogin').then(res=>{return res}).catch(error=>{return error})
} 
export const getgoods=params=>{ //获取商品列表
    return Axios.get('/goods/list',{params:params}).then(res=>{return res})
}
export const postAddCart=productId=>{//加入购物车
    return Axios.post("/goods/addCar",{"productId":productId}).then(res=>{return res})
}
export const loginUser=params=>{//用户登录                          
    return Axios.post('/users/login',{params:params}).then(res=>{return res})
}
export const logoutUser=params=>{//用户登录
    return Axios.post('/users/logout').then(res=>{return res})
}
export const getCartList=params=>{//获取用户的购物车
    return Axios.get('/users/cartList').then(res=>{return res})
}
export const delCar=params=>{//购物车删除
    return Axios.post('/users/cartDel',{"productId":params}).then(res=>{return res})
}
export const cartEdit=params=>{//购物车单个商品列表数目更改
    return Axios.post('/users/cartEdit',{"params":params}).then(res=>{return res})
}   