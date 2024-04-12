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
    isAuthenticated: false,
    showAccountBar: false,
    isDarkMode: true,
    symbolsData: [],
    user: {
      token: "",
      groupId: 0,
      group: "",
      balance: 0,
      leverage: 0,
      currencyId: 0,
      currency: "",
      id: 0,
      language: "",
      timeZone: "",
      hideAccountBarValue: true,
      multiTradePannel: true,
      restoreDefaultPlatformSettings: true,
    },
    stocks: [],
    showAlert: false,
    alertColor: "red",
    alertText: "",
    assetCategories: [
      "Stock",
      "Currency",
      "Commodity",
      "Bond",
      "Cryptocurrency",
      "Index",
      "Option",
      "Future",
      "ETF",
    ],
    layoutDimensions: {
      graphComponent: {
        width: "",
        height: "",
        top: "",
        left: "",
      },
      bottomComponent: {
        width: "",
        height: "",
        top: "",
        left: "",
      },
      rightComponent: {
        width: "",
        height: "",
        top: "",
        left: "",
      },
      lastComponent: {
        width: "",
        height: "",
        top: "",
        left: "",
      },
    },
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
      state.user = payload;
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
    setLayoutDimensions(state, dimensions) {
      state.layoutDimensions = dimensions;
    },
    setComponentLayout(state, { component, dimensions }) {
      if (dimensions.height)
        state.layoutDimensions[component].height = dimensions.height;
      if (dimensions.width)
        state.layoutDimensions[component].width = dimensions.width;
      if (dimensions.top)
        state.layoutDimensions[component].top = dimensions.top;
      if (dimensions.left)
        state.layoutDimensions[component].left = dimensions.left;
    },
  },
  actions: {
    async setDefaultComonentsDimensions({ commit }) {
      const graphComponentLayout = await this.dispatch(
        "setDefaultGraphDimensions"
      );
      const bottomComponentLayout = await this.dispatch(
        "setDefaultBottomComponentDimensions"
      );
      const rightComponentLayout = await this.dispatch(
        "setDefaultRightComponentDimensions"
      );
      const lastComponentLayout = await this.dispatch(
        "setDefaultLastComponentDimensions"
      );
      const dimensions = {
        graphComponent: graphComponentLayout,
        bottomComponent: bottomComponentLayout,
        rightComponent: rightComponentLayout,
        lastComponent: lastComponentLayout,
      };
      commit("setLayoutDimensions", dimensions);
    },
    setDefaultGraphDimensions({ state }) {
      let layoutType = state.layoutType;
      if (layoutType == 2) {
        return {
          width: "75%",
          height: "50%",
          top: "50%",
          left: "0%",
        };
      } else if (layoutType == 3) {
        return {
          width: "45.6032%",
          height: "50%",
          top: "50%",
          left: "0%",
        };
      } else {
        return {
          width: "80%",
          height: "75%",
          top: "0%",
          left: "0%",
        };
      }
    },
    setDefaultBottomComponentDimensions({ state }) {
      let layoutType = state.layoutType;
      if (layoutType == 2) {
        return {
          width: "75%",
          height: "50%",
          top: "0%",
          left: "25%",
        };
      } else if (layoutType == 3) {
        return {
          width: "54.4532%",
          height: "50%",
          top: "0%",
          left: "45.5468%",
        };
      } else {
        return {
          width: "80%",
          height: "25%",
          top: "75%",
          left: "0%",
        };
      }
    },
    setDefaultRightComponentDimensions({ state }) {
      let layoutType = state.layoutType;
      if (layoutType == 2) {
        return {
          width: "25%",
          height: "50%",
          top: "50%",
          left: "75%",
        };
      } else if (layoutType == 3) {
        return {
          width: "54.3968%",
          height: "50%",
          top: "50%",
          left: "45.6032%",
        };
      } else {
        return {
          width: "20%",
          height: "100%",
          top: "0%",
          left: "80%",
        };
      }
    },
    setDefaultLastComponentDimensions({ state }) {
      let layoutType = state.layoutType;
      if (layoutType == 2) {
        return {
          width: "25%",
          height: "50%",
          top: "0%",
          left: "0%",
        };
      } else {
        return {
          width: "45.5468%",
          height: "50%",
          top: "0%",
          left: "0%",
        };
      }
    },
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
    async getUserDetails({ state, commit }) {
      let token = localStorage.getItem("token");
      if (!token) {
        const urlParams = new URLSearchParams(window.location.search);
        token = urlParams.get("token");
      }
      if (token != "" && token != null && token != "null") {
        localStorage.setItem("token", token);
        try {
          const response = await state.$http.get("user");
          if (response.status == 200) {
            const data = response.data.payload;
            commit("setUser", data);
            commit("setIsAuthenticated", true);
            return;
          } else {
            console.log("Something went Wrong", response.message);
            localStorage.removeItem("token");
          }
        } catch (error) {
          console.log("Something went Wrong");
          localStorage.removeItem("token");
        }
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
          const data = response.data;
          const token = data.token;
          commit("setUser", data);
          localStorage.setItem("token", token);
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
    async fetchSymbolsData({ state, commit }) {
      try {
        const response = await state.$http.get("symbols");
        if (response.status == 200) {
          const data = response.data.payload;
          commit("setSymbolsData", data);
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
          const data = response.data.payload;
          commit("setStocks", data);
        } else {
          console.log("Something went Wrong", response.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    },
    async createOrder({ state }, { asset }) {
      try {
        const response = await state.$http.post("orders", asset);
        if (response.status == 200) {
          const limits = {
            limit: 20,
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
          const data = response.data.payload;
          commit("setAssetCategories", data);
        } else {
          console.log("Something went wrong");
        }
      } catch (error) {
        console.error("Error fetching Categories:", error);
      }
    },
    async modifyOrder({ state }, { asset }) {
      try {
        const response = await state.$http.put(`orders`, asset);
        if (response.status == 200) {
          const limits = {
            limit: 20,
            offset: 1,
          };
          this.dispatch("fetchStockTableData", { limits });
          this.dispatch("setAlertVal", {
            color: "success",
            text: "Order Modified Successfully",
          });
        } else {
          console.log("Something went Wrong", response.message);
          this.dispatch("setAlertVal", {
            color: "error",
            text: "Could Not Modify Order",
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        this.dispatch("setAlertVal", {
          color: "error",
          text: "Could Not Modify Order",
        });
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
    getLayoutDimensions: (state) => state.layoutDimensions,
    getLayoutType: (state) => state.layoutType,
  },
});

export default store;
