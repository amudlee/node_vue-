import axios from "axios"
const baseURL = 'http://localhost:1024/api/'
axios.defaults.baseURL = baseURL

export const getgoods=params=>{ 
    return axios.get('goods').then(res=>{return res.data})}
