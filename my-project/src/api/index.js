// import Vue from "vue"
// import apiConfig from '../../config/api.config'

import Axios from 'axios'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = "http://localhost:3000"
Axios.defaults.withCredentials = true//默认的axios请求是不会携带cookie请求的。只有设置withCredentials为true的时候才会携带请求


export const getgoods=params=>{ //获取商品列表
    return Axios.get('/goods',{params:params}).then(res=>{return res})
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
