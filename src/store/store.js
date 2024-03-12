import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    layoutType: 1,
    isFakeServer: true,
  },
  mutations: {
    changeLayout(state, newLayoutType){
      state.layoutType = newLayoutType
    },
    toggleTestMode(state){
      state.isFakeServer = !state.isFakeServer;
    },
  },
  actions: {

  },
  getters: {
    getServer(state){
      return state.isFakeServer;
    }
  }
})

export default store
