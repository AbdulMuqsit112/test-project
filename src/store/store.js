import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    layoutType: 1,
    isFakeServer: true,
    selectedData: [],
  },
  mutations: {
    changeLayout(state, newLayoutType) {
      state.layoutType = newLayoutType;
    },
    toggleTestMode(state) {
      state.isFakeServer = !state.isFakeServer;
    },
    setSelctedDate(state, asset) {
      const selectedIndex = state.selectedData.findIndex(
        (selectedAsset) => selectedAsset.s == asset.s
      );
      if (selectedIndex !== -1) {
        state.selectedData.splice(selectedIndex, 1);
      } else {
        if (state.selectedData.length < 4) {
          state.selectedData.push(asset);
        } else {
          console.log("You can only select up to 4 assets.");
        }
      }
    },
  },
  actions: {},
  getters: {
    getServer(state) {
      return state.isFakeServer;
    },
    getSelectedData: (state) => state.selectedData,
  },
});

export default store;
