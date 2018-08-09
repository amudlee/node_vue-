import Vue from "vue"
import Vuex from 'vuex'
Vue.use(Vuex)

const state = {
    smallPage: true, // 菜单是否显示
    breadcumb: {}// 面包屑
  }
  const mutations = {
    changePage (state, value) {
      state.smallPage = value
    },
    changeBreadcumb (state, value) {
      state.breadcumb = value
    }
  }
  export default new Vuex.Store({
    state,
    mutations
  })