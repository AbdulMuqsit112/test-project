<template>
  <div class="mainBlock" :style="getMainBlockStyle">
    <div class="mainBlock__tabs">
      <div class="mainBlock__tabsItem mainBlock__tabsItem_add">+</div>
      <button class="tab-buttons" :class="{ 'dark-theme': isDarkMode }" @click="switchTabs('stocks')">Open
        Positions</button>
      <button class="tab-buttons" :class="{ 'dark-theme': isDarkMode }" @click="switchTabs('history')">
        History
      </button>
    </div>
    <div class="mainBlock__content">
      <div class="mainBlock__tabsEmpty p-0">
        <div v-show="activeTab === 'stocks'" class="overflow-auto w-100 h-100">
          <table class="w-100">
            <thead class="sticky-top">
              <tr :class="{ 'dark-header': isDarkMode, 'light-header': !isDarkMode }">
                <th>
                  Ticker
                  <input class="p-1 ml-1 rounded" type="text" v-model="searchTerm" placeholder="Search Ticker"
                    @input="filterStocks" />
                </th>
                <th class="px-2">Price</th>
                <th class="px-2">Chg</th>
                <th class="px-2">Chg%</th>
                <th class="px-2">Technical Rating</th>
                <th class="px-2">Vol</th>
                <th class="px-2">Volume Price</th>
                <th class="px-2">Mkt Cap</th>
                <th class="px-2">P/E</th>
                <th class="px-2">EPS (TTM)</th>
                <th class="px-2">Employees</th>
                <th class="px-2">Sector</th>
                <th class="px-2">close Order</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="stock in filteredStocks" :key="stock.id"
                :class="{ 'dark-tr': isDarkMode, 'light-tr': !isDarkMode }">
                <td class="px-2">{{ stock.symbolName }}</td>
                <td class="px-2">{{ stock.price }}</td>
                <td class="px-2">{{ stock.chg }}</td>
                <td class="px-2">{{ stock.chgPercent }}</td>
                <td class="px-2">{{ stock.technicalRating }}</td>
                <td class="px-2">{{ stock.vol }}</td>
                <td class="px-2">{{ stock.volumePrice }}</td>
                <td class="px-2">{{ stock.mktCap }}</td>
                <td class="px-2">{{ stock.pe }}</td>
                <td class="px-2">{{ stock.epsTim }}</td>
                <td class="px-2">{{ stock.employees }}</td>
                <td class="px-2">{{ stock.sector }}</td>
                <td class="px-2 text-center text-danger">
                  <div class="position-relative">
                    <span class="cursor-pointer" @click="showModal(stock.id)">
                      <i class="fas fa-times"></i>
                    </span>
                    <div v-if="isModalVisible && stock.id === selectedStockSymbol"
                      class="tooltip-content d-flex flex-column gap-1 text-sm"
                      :class="{ 'dark-bg': isDarkMode, 'light-bg': !isDarkMode }">
                      <p>Are you sure?</p>
                      <span class="d-flex gap-2">
                        <button class="btn bg-danger btn-danger text-xs px-2" @click="hideModal">Cancel</button>
                        <button class="btn btn-success text-xs px-3"
                          @click="confirmDelete(stock.id, stock.closePrice)">Ok</button>
                      </span>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-show="activeTab === 'history'" class="overflow-auto  w-100 h-100">
          <table class="w-100">
            <thead class="sticky-top">
              <tr :class="{ 'dark-header': isDarkMode, 'light-header': !isDarkMode }">
                <th class="px-3">Positions</th>
                <th class="px-3">Open Date</th>
                <th class="px-3">Type</th>
                <th class="px-3">Volume</th>
                <th class="px-3">SL Price</th>
                <th class="px-3">TP Price</th>
                <th class="px-3">Open Price</th>
                <th class="px-3">Market Price</th>
                <th class="px-3">Commission</th>
                <th class="px-3">Swaps</th>
                <th class="px-3">Gross Profit</th>
              </tr>
            </thead>
            <tbody>
              <tr :class="{ 'dark-tr': isDarkMode, 'light-tr': !isDarkMode }" v-for="(item, index) in histData"
                :key="index">
                <td class="px-3">{{ item.position }}</td>
                <td class="px-3">{{ item.openDate }}</td>
                <td class="px-3">
                  <span class="text-danger py-1 px-2" v-if="item.type == 2">
                    Sell
                  </span>
                  <span class="text-success py-1 px-2" v-if="item.type == 1">
                    Buy
                  </span>
                </td>
                <td class="px-3">{{ item.volume }}</td>
                <td class="px-3">{{ item.slPrice }}</td>
                <td class="px-3">{{ item.tpPrice }}</td>
                <td class="px-3">{{ item.openPrice }}</td>
                <td class="px-3">{{ item.marketPrice }}</td>
                <td class="px-3">{{ item.commission }}</td>
                <td class="px-3">{{ item.swaps }}</td>
                <td class="px-3">{{ item.grossProfit }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="layout != 1" class="mainBlock__split mainBlock__split_h mainBlock__split_bottom"></div>
  </div>
</template>

<script>
import stocksData from "../../assets/stocks.json";
import historyData from "../../assets/history.json";
export default {
  name: "MainBottom",
  data() {
    return {
      activeTab: "stocks",
      runSocket: false,
      searchTerm: "",
      histData: [],
      selectedStockSymbol: null,
      isModalVisible: false,
    };
  },
  mounted() {
    if (this.isFakeServer) {
      this.loadDataFromJson();
    } else {
      this.fetchStockTableData();
    }
  },
  methods: {
    showModal(symbolName) {
      this.selectedStockSymbol = symbolName;
      this.isModalVisible = true;
    },
    hideModal() {
      this.isModalVisible = false;
    },
    async confirmDelete(id, price) {
      try {
        const response = await this.$http.delete('orders/close', {
          params: {
            closePrice: price,
            orderId: id,
          }
        });
        if (response.status == 200) {
          this.fetchStockTableData()
          this.fetchHistoryData();
        } else {
          console.log('something went wrong', response.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      this.hideModal();
    },
    fetchStockTableData() {
      const limits = {
        limit: 1,
        offset: 1
      }
      this.$store.dispatch('fetchStockTableData', { limits });
    },
    async fetchHistoryData() {
      try {
        const response = await this.$http.get('orders/history');
        if (response.status == 200) this.histData = response.data.orders;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    async loadDataFromJson() {
      try {
        this.$store.commit('setStocks', stocksData);
        this.histData = historyData;
      } catch (error) {
        console.error("Error loading data from JSON file:", error);
      }
    },
    filterStocks(event) {
      this.searchTerm = event.target.value;
    },
    switchTabs(tab) {
      if (tab == 'stocks') {
        this.fetchStockTableData();
      } else {
        this.fetchHistoryData();
      }
      this.activeTab = tab;
    },
  },
  computed: {
    isFakeServer() {
      return this.$store.getters.getServer;
    },
    filteredStocks() {
      return this.stocks.filter((stock) =>
        stock.symbolName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    layout() {
      return this.$store.state.layoutType;
    },
    getMainBlockStyle() {
      let layoutType = this.layout;
      if (layoutType == 2) {
        return {
          width: '75%',
          height: '50%',
          top: '0%',
          left: '25%',
        };
      } else if (layoutType == 3) {
        return {
          width: '54.4532%',
          height: '50%',
          top: '0%',
          left: '45.5468%',
        };
      }
      else {
        return {
          width: '80%',
          height: '25%',
          top: '75%',
          left: '0%',
        };
      }
    },
    isDarkMode() {
      return this.$store.getters.getIsDarkMode;
    },
    stocks() {
      return this.$store.getters.getStocks;
    }
  },
};
</script>

<style scoped>
.tooltip-content {
  position: absolute;
  top: -35%;
  left: -90%;
  border-radius: 4px;
  padding: 8px;
  z-index: 1;
}


input {
  border: 0.2px solid #39404b;
}

.dark-bg {
  background-color: #2a2e39;
}

.light-bg {
  background-color: #dde2e5;
}

table {
  border-collapse: collapse;
  color: #6c7293;
  overflow-y: scroll;
  font-size: medium;
}

th,
td {
  border-bottom: 0.1px ridge;
  border-color: #39404b;
  text-align: left;
  padding: 8px;
  color: #6c7293;
  border-left: none;
  border-right: none;
  font-size: 60%;
}

.dark-tr:hover {
  background-color: #212529;
}

.light-tr:hover {
  background-color: #eff0f1;
}

th {
  vertical-align: middle;
  border-bottom: 2px solid #2c2e33 !important;
  border-bottom-width: 1px;
  font-size: 75%
}

.tab-buttons {
  border-inline: 0.5px solid #48575e;
  border-bottom: 0.3px solid #48575e;
  border-radius: 4px;
  cursor: pointer;
  padding: 0px 10px;
  transition: background-color 0.3s ease;
}

@media screen and (max-width: 1024px) {
  td {
    padding: 2px;
  }

  input {
    margin-left: 2px !important;
    padding: 2px !important;
    border-radius: 2px !important;
  }
}
</style>
