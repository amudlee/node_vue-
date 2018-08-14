// import Vue from "vue"
// import apiConfig from '../../config/api.config'

import Axios from 'axios'
// import VueAxios from 'vue-axios'

// Vue.use(VueAxios, Axios)
Axios.defaults.baseURL = "http://localhost:3000"

export const getgoods=params=>{ 
    return Axios.get('/goods').then(res=>{return res})}
