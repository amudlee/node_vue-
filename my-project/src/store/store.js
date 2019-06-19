import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex)

  const state = {
    smallPage: true, // 菜单是否显示
    breadcumb: {},// 面包屑
    userName:"",
    cartCountx:0
  }
  const mutations = {
    changePage (state, value) {
      state.smallPage = value
    },
    changeBreadcumb (state, value) {
      state.breadcumb = value
    },
    changeUserName(state,value){
      state.userName= value
    },
    cartCount(state,value){
      state.cartCountx= value
    },
    addCount(state){
      state.cartCountx++
    },
    reduce(state){
      state.cartCountx--
    }
  }
  export default new Vuex.Store({
    state,
    mutations
  })