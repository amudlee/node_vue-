import axios from "axios"
const baseURL = 'http://localhost:1024/'
axios.defaults.baseURL = baseURL

export const getgoods=params=>{ 
    return axios.get('api/goods').then(res=>{ res.data.result})}
