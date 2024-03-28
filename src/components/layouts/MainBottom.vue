<template>
  <div class="mainBlock" :style="getMainBlockStyle">
    <div class="mainBlock__tabs">
      <div class="mainBlock__tabsItem mainBlock__tabsItem_add">+</div>
      <button class="tab-buttons" :class="{ 'dark-theme': isDarkMode, 'text-primary px-4': activeTab == 'stocks' }"
        @click="switchTabs('stocks')">Open
        Positions</button>
      <button class="tab-buttons" :class="{ 'dark-theme': isDarkMode, 'text-primary px-4': activeTab == 'history' }"
        @click="switchTabs('history')">
        History
      </button>
    </div>
    <div class="mainBlock__content">
      <div class="mainBlock__tabsEmpty p-0" ref="tableCont">
        <div v-show="activeTab === 'stocks'" class="w-100 h-100">
          <table class="w-100 fixed_header">
            <thead class="sticky-top">
              <tr :class="{ 'dark-header': isDarkMode, 'light-header': !isDarkMode }" class="w-100">
                <th class="header-border" style="width: 300px !important">
                  Ticker
                  <input class="p-1 ml-1 rounded" type="text" v-model="searchTerm" placeholder="Search Ticker"
                    @input="filterStocks" />
                </th>
                <th class="px-2 header-border">PRICE</th>
                <th class="px-2 header-border">CHG</th>
                <th class="px-2 header-border">CHG%</th>
                <th class="px-2 header-border" style="width: 240px !important">TECHNICAL RATING</th>
                <th class="px-2 header-border">VOL</th>
                <th class="px-2 header-border">VOLUME PRICE</th>
                <th class="px-2 header-border">MKT CAP</th>
                <th class="px-2 header-border">P/E</th>
                <th class="px-2 header-border">EPS (TTM)</th>
                <th class="px-2 header-border">EMPLOYEES</th>
                <th class="px-2 header-border">SECTOR</th>
                <th class="px-2">CLOSE ORDER</th>
              </tr>
            </thead>
            <tbody :style="{'height': tbodyHeight}">
              <tr v-for=" stock  in  filteredStocks " :key=" stock.id "
                :class=" { 'dark-tr': isDarkMode, 'light-tr': !isDarkMode } ">
                <td class="px-2" style="width: 300px !important">{{ stock.symbolName }}</td>
                <td class="px-2">{{ stock.price }}</td>
                <td class="px-2">{{ stock.chg }}</td>
                <td class="px-2">{{ stock.chgPercent }}</td>
                <td class="px-2" style="width: 240px !important">{{ stock.technicalRating }}</td>
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
                    <div v-if=" isModalVisible && stock.id === selectedStockSymbol "
                      class="tooltip-content d-flex flex-column gap-1 text-sm"
                      :class=" { 'dark-bg': isDarkMode, 'light-bg': !isDarkMode } ">
                      <p>Are you sure?</p>
                      <span class="d-flex gap-2">
                        <button class="btn bg-danger btn-danger text-xs px-2" @click=" hideModal ">Cancel</button>
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
        <div v-show=" activeTab === 'history' " class="w-100 h-100">
          <table class="w-100 fixed_header">
            <thead>
              <tr class="sticky-top" :class=" { 'dark-header': isDarkMode, 'light-header': !isDarkMode } ">
                <th class="px-3 header-border">Positions</th>
                <th class="px-3 header-border">Open Date</th>
                <th class="px-3 header-border">Type</th>
                <th class="px-3 header-border">Volume</th>
                <th class="px-3 header-border">SL Price</th>
                <th class="px-3 header-border">TP Price</th>
                <th class="px-3 header-border">Open Price</th>
                <th class="px-3 header-border">Market Price</th>
                <th class="px-3 header-border">Commission</th>
                <th class="px-3 header-border">Swaps</th>
                <th class="px-3">Gross Profit</th>
              </tr>
            </thead>
            <tbody :style="{'height': tbodyHeight}">
              <tr :class=" { 'dark-tr': isDarkMode, 'light-tr': !isDarkMode } " v-for="( item, index ) in  histData "
                :key=" index ">
                <td class="px-3">{{ item.position }}</td>
                <td class="px-3">{{ item.openDate }}</td>
                <td class="px-3">
                  <span class="text-danger py-1 px-2" v-if=" item.type == 2 ">
                    Sell
                  </span>
                  <span class="text-success py-1 px-2" v-if=" item.type == 1 ">
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
    <div v-if=" layout != 1 " class="mainBlock__split mainBlock__split_h mainBlock__split_bottom"></div>
  </div>
</template>

<script>
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
      tbodyHeight: "auto",
    };
  },
  mounted() {
    this.fetchStockTableData();
    this.setTableBodyHeight();
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
          this.$store.dispatch('setAlertVal', { color: 'success', text: 'Order Closed Successfully' });
        } else {
          console.log('something went wrong', response.message);
          this.$store.dispatch('setAlertVal', { color: 'error', text: 'Something went wrong' });
        }
      } catch (error) {
        this.$store.dispatch('setAlertVal', { color: 'error', text: 'Something went wrong' });
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
    setTableBodyHeight() {
      this.$nextTick(() => {
        const tableContainer = this.$refs.tableCont;
        const dimensions = tableContainer.getBoundingClientRect();
        this.tbodyHeight = `${dimensions.height}px`;
      });
    },
  },
  computed: {
    filteredStocks() {
      return this.stocks.filter((stock) =>
        stock.symbolName.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    layout() {
      this.setTableBodyHeight()
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
  font-size: medium;
}
.header-border {
  border-right: 1px solid #2a2e39;
  position: sticky;
  top: 0;
}

.fixed_header thead tr {
  display: block;
}
tbody {
  display: block;
  overflow: auto;
}
th,
td {
  border-bottom: 0.1px ridge;
  border-color: #39404b;
  padding-inline: 8px;
  border-left: none;
  border-right: none;
  text-align: center;
  vertical-align: middle;
  width: 200px;
}
td {
  color: #6c7293;
  font-size: 60%;
  padding-block: 12px;
}
th {
  border-bottom: 2px solid #2c2e33 !important;
  border-bottom-width: 1px;
  font-size: 60%;
  font-weight: 300 !important;
  padding-block: 10px;
}
.dark-tr:hover {
  background-color: #030404;
}
.light-tr:hover {
  background-color: #eff0f1;
}

.tab-buttons {
  border-inline: 0.5px solid #48575e;
  border-bottom: 0.3px solid #48575e;
  border-radius: 3px;
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
