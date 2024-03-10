import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    layoutType: 1,
  },
  mutations: {
    changeLayout(state, newLayoutType){
      state.layoutType = newLayoutType
    },
  },
  actions: {

  },
  getters: {

  }
})

export default store
