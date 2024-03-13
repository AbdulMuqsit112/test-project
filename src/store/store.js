import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    layoutType: 1,
    isFakeServer: true,
    isGraphResized: false,
    graphContWidth: 0,
    graphConHeight: 0,
    graphConPosTop: 0,
    graphConPosLeft: 0,
    bottomContWidth: 0,
    bottomConHeight: 0,
    bottomConPosTop: 0,
    bottomConPosLeft: 0,
    graphHeightChanged: 0
  },
  mutations: {
    changeLayout(state, newLayoutType){
      state.layoutType = newLayoutType
    },
    toggleTestMode(state){
      state.isFakeServer = !state.isFakeServer;
    },
    setIsGraphResized(state, val){
      state.isGraphResized = val;
    },
    setGraphContWidth(state, width){
      state.graphContWidth = width;
    },
    setGraphContHeight(state, height){
      state.graphConHeight = height;
    },
    setGraphConPosTop(state, top){
      state.graphConPosTop = top;
    },
    setGraphConPosLeft(state, left){
      state.graphConPosLeft = left;
    },
    setGraphHeightChanged(state, height){
      state.graphHeightChanged = height;
    },
    setBottomContWidth(state, width){
      state.bottomContWidth = width;
    },
    setBottomContHeight(state, height){
      state.bottomConHeight = height;
    },
    setBottomConPosTop(state, top){
      state.bottomConPosTop = top;
    },
    setBottomConPosLeft(state, left){
      state.bottomConPosLeft = left;
    },
  },
  actions: {

  },
  getters: {
    getServer: (state) =>  state.isFakeServer,
    getIsGraphResized: (state) => state.isGraphResized,
    getGraphConWidth: (state) => state.graphContWidth,
    getGraphConHeight: (state) => state.graphConHeight,
    getGraphConPosTop: (state) => state.graphConPosTop,
    getGraphConPosLeft: (state) => state.graphConPosLeft,
    getGraphHeightChanged: (state) => state.graphHeightChanged,
    getBottomConWidth: (state) => state.bottomContWidth,
    getBottomConHeight: (state) => state.bottomConHeight,
    getBottomConPosTop: (state) => state.bottomConPosTop,
    getBottomConPosLeft: (state) => state.bottomConPosLeft,
  }
})

export default store
