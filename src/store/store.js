import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";
Vue.use(Vuex);

const http = axios.create({
  baseURL: 'http://185.177.59.169:8090/',
});

const store = new Vuex.Store({
  state: {
    http,
    layoutType: 1,
    isFakeServer: false,
    selectedData: [],
    userToken: null,
    isAuthenticated: false,
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
    setUserToken(state, token) {
      state.userToken = token;
    },
    setIsAuthenticated(state, val) {
      state.isAuthenticated = val;
    },
  },
  actions: {
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
    async loginToServer({ state, commit }, { userObj }) {
      try {
        const response = await state.http.post("user/login", {...userObj});
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
  },
  getters: {
    getServer(state) {
      return state.isFakeServer;
    },
    getSelectedData: (state) => state.selectedData,
    getUserToken: (state) => state.selectedData,
    getIsAuthenticated: (state) => state.isAuthenticated,
  },
});

export default store;
