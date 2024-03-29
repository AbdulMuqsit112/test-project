import Vue from "vue";
import Vuex from "vuex";
import AxiosPlugin from "../plugins/axios";
Vue.use(AxiosPlugin);
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    $http: Vue.prototype.$http,
    layoutType: 1,
    selectedData: [],
    userToken: null,
    isAuthenticated: false,
    showAccountBar: false,
    isDarkMode: true,
    symbolsData: [],
    user: {
      loginId: "",
    },
    stocks: [],
    showAlert: false,
    alertColor: "red",
    alertText: "",
    assetCategories: [],
  },
  mutations: {
    changeLayout(state, newLayoutType) {
      state.layoutType = newLayoutType;
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
    setSelctedDataEmpty(state) {
      state.selectedData = [];
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
      this.dispatch("setAppTheme");
    },
    setAppTheme(state, val) {
      state.isDarkMode = val;
      this.dispatch("setAppTheme");
    },
    setSymbolsData(state, data) {
      state.symbolsData = data;
    },
    setSymbolItemVal(state, payload) {
      const { item, index } = payload;
      state.symbolsData[index].p = item.p;
      state.symbolsData[index].v = item.v;
    },
    setUser(state, payload) {
      state.user.loginId = payload;
    },
    setStocks(state, payload) {
      state.stocks = payload;
    },
    toggleShowAlert(state) {
      state.showAlert = !state.showAlert;
    },
    setAlertColor(state, color) {
      state.alertColor = color;
    },
    setAlertText(state, text) {
      state.alertText = text;
    },
    setAssetCategories(state, categories) {
      state.assetCategories = categories;
    },
  },
  actions: {
    setAlertVal({ commit }, { color, text }) {
      commit("setAlertColor", color);
      commit("setAlertText", text);
      commit("toggleShowAlert");
    },
    setAppTheme({ state }) {
      if (state.isDarkMode) {
        document.body.classList.add("dark");
        document.body.classList.remove("light");
      } else {
        document.body.classList.add("light");
        document.body.classList.remove("dark");
      }
      localStorage.setItem("isDarkMode", state.isDarkMode);
    },
    getUserDetails({ commit }) {
      let token = localStorage.getItem("token");
      if (!token) {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get("token");
      }
      if (token != "" && token != null && token != "null") {
        localStorage.setItem("token", token);
        commit("setUserToken", token);
        commit("setIsAuthenticated", true);
        return;
      }
      commit("setIsAuthenticated", false);
    },
    updateSymbolsData({ state, commit }, { receivedData }) {
      if (state.symbolsData.length > 0) {
        for (const item of receivedData) {
          const index = state.symbolsData.findIndex((d) => d.s === item.s);
          if (index !== -1) {
            commit("setSymbolItemVal", { item: item, index: index });
          }
        }
      }
    },
    async loginToServer({ state, commit }, { userObj }) {
      try {
        const response = await state.$http.post("user/login", { ...userObj });
        if (response.status == 200) {
          let data = response.data;
          let token = data.token;
          localStorage.setItem("token", token);
          commit("setUserToken", token);
          commit("setUser", data.login);
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
        const response = await state.$http.get("symbols/history", {
          params: {
            limit: limits.limit,
            offset: limits.offset,
          },
        });
        if (response.status == 200) {
          commit("setSymbolsData", response.data);
        } else {
          console.log("Something went Wrong", response.message);
        }
      } catch (error) {
        console.error("Error fetching symbols data:", error);
      }
    },
    async fetchStockTableData({ state, commit }, { limits }) {
      try {
        const response = await state.$http.get("orders", {
          params: {
            limit: limits.limit,
            offset: limits.offset1,
          },
        });
        if (response.status == 200) {
          commit("setStocks", response.data.orders);
        } else {
          console.log("Something went Wrong", response.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async createOrder({ state, commit }, { asset }) {
      try {
        const response = await state.$http.post("orders", asset);
        if (response.status == 200) {
          const limits = {
            limit: 1,
            offset: 1,
          };
          this.dispatch("fetchStockTableData", { limits });
          this.dispatch("setAlertVal", {
            color: "success",
            text: "Order Placed Successfully",
          });
        } else {
          console.log("Something went Wrong", response.message);
          this.dispatch("setAlertVal", {
            color: "error",
            text: "Could Not Place Order",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.dispatch("setAlertVal", {
          color: "error",
          text: "Could Not Place Order",
        });
      }
    },
    async fetchAssetCategory({ state, commit }) {
      try {
        const response = await state.$http.get("symbols");
        if (response.status == 200) {
          commit("setAssetCategories", response.data);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    },
  },
  getters: {
    getSelectedData: (state) => state.selectedData,
    getUserToken: (state) => state.selectedData,
    getIsAuthenticated: (state) => state.isAuthenticated,
    getShowAccountBar: (state) => state.showAccountBar,
    getIsDarkMode: (state) => state.isDarkMode,
    getSymbolsData: (state) => state.symbolsData,
    getUser: (state) => state.user,
    getStocks: (state) => state.stocks,
    getShowAlert: (state) => state.showAlert,
    getAlertColor: (state) => state.alertColor,
    getAlertText: (state) => state.alertText,
    getAssetCategories: (state) => state.assetCategories,
  },
});

export default store;
