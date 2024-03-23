import Vue from "vue";
import Vuex from "vuex";
import AxiosPlugin from '../plugins/axios'
Vue.use(AxiosPlugin)
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    $http: Vue.prototype.$http,
    layoutType: 1,
    isFakeServer: false,
    selectedData: [],
    userToken: null,
    isAuthenticated: false,
    showAccountBar: true,
    isDarkMode: true,
    symbolsData: [],
  },
  mutations: {
    changeLayout(state, newLayoutType) {
      state.layoutType = newLayoutType;
    },
    toggleTestMode(state) {
      state.isFakeServer = !state.isFakeServer;
    },
    setSelctedData(state, asset) {
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
    setUserToken(state, token) {
      state.userToken = token;
    },
    setIsAuthenticated(state, val) {
      state.isAuthenticated = val;
    },
    toggleShowAccountBar(state) {
      state.showAccountBar = !state.showAccountBar;
    },
    toggleIsDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
      this.dispatch('setAppTheme');
    },
    setSymbolsData(state, data){
      state.symbolsData = data;
    },
    setSymbolItemVal(state, payload) {
      const { item, index } = payload;
      state.symbolsData[index].p = item.p;
      state.symbolsData[index].v = item.v;
    },
  },
  actions: {
    setAppTheme({ state }) {
      if (state.isDarkMode) {
        document.body.classList.add('dark');
        document.body.classList.remove('light');
      } else {
        document.body.classList.add('light');
        document.body.classList.remove('dark');
      }
    },
    getUserDetails({ commit }) {
      let token = localStorage.getItem("token");
      if (!token) {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get("token");
      }
      if (token != "" && token != null && token != 'null') {
        localStorage.setItem("token", token);
        commit("setUserToken", token);
        commit("setIsAuthenticated", true);
        return;
      }
      commit("setIsAuthenticated", false);
    },
    updateSymbolsData({state, commit}, {receivedData}){
      if (state.symbolsData.length > 0){
        for (const item of receivedData) {
          const index = state.symbolsData.findIndex(d => d.s === item.s);
          if (index !== -1) {
            commit("setSymbolItemVal", { item: item, index: index });
          }
        }
      }
    },
    async loginToServer({ state, commit }, { userObj }) {
      try {
        const response = await state.$http.post("user/login", {...userObj});
        if (response.status == 200) {
          let data = response.data;
          let token = data.token;
          localStorage.setItem("token", token);
          commit("setUserToken", token);
          commit("setIsAuthenticated", true);
          return { success: true, token: token };
        } else {
          commit("setIsAuthenticated", false);
          return {
            success: false,
            error: "Invalid email or password. Please try again.",
          };
        }
      } catch (error) {
        console.error(error);
        commit("setIsAuthenticated", false);
        return {
          success: false,
          error: "An error occurred. Please try again later.",
        };
      }
    },
    async fetchSymbolsData({ state, commit }, { limits }) {
      try {
        const response = await state.$http.get('symbols/history', {
          params: {
            limit: limits.limit,
            offset: limits.offset
          }
        });
        if (response.status == 200){
          commit("setSymbolsData", response.data);
        } else {
          console.log("Something went Wrong", response.message);
        }
      } catch (error) {
        console.error('Error fetching symbols data:', error);
      }
    }
    
  },
  getters: {
    getServer: (state) => state.isFakeServer,
    getSelectedData: (state) => state.selectedData,
    getUserToken: (state) => state.selectedData,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getShowAccountBar: (state) => state.showAccountBar,
    getIsDarkMode: (state) => state.isDarkMode,
    getSymbolsData: (state) => state.symbolsData,
  },
});

export default store;
