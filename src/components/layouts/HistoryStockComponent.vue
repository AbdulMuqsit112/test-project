<template>
  <div
    class="s-card"
  >
    <div class="card-body">
      <div class="tab-buttons" :style="{fontSize: btnFontSize}">
        <button @click="activeTab = 'stocks'">Stocks</button>
        <button @click="activeTab = 'history'">History</button>
      </div>
      <div v-show="activeTab === 'stocks'"  :style="{ height: tableContainerHeight }" class="overflow-auto" >
        <table class="w-100 custom-width">
          <thead class="sticky-top">
            <tr :style="{ fontSize: thFontSize }">
              <th>
                Ticker
                <input
                  class="p-1 ml-1 rounded"
                  type="text"
                  v-model="searchTerm"
                  placeholder="Search Ticker"
                  @input="filterStocks"
                />
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
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="stock in filteredStocks"
              :key="stock.ticker"
              :style="{ fontSize: tdFontSize }"
            >
              <td class="px-2">{{ stock.ticker }}</td>
              <td class="px-2">{{ stock.price }}</td>
              <td class="px-2">{{ stock.chg }}</td>
              <td class="px-2">{{ stock.chgPercent }}</td>
              <td class="px-2">{{ stock.technicalRating }}</td>
              <td class="px-2">{{ stock.vol }}</td>
              <td class="px-2">{{ stock.volumePrice }}</td>
              <td class="px-2">{{ stock.mktCap }}</td>
              <td class="px-2">{{ stock.pe }}</td>
              <td class="px-2">{{ stock.eps }}</td>
              <td class="px-2">{{ stock.employees }}</td>
              <td class="px-2">{{ stock.sector }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-show="activeTab === 'history'" :style="{ height: tableContainerHeight }" class="overflow-auto">
        <table class="w-100">
          <thead class="sticky-top">
            <tr :style="{ fontSize: thFontSize }">
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
            <tr v-for="(item, index) in histData" :key="index" :style="{ fontSize: tdFontSize }">
              <td class="px-3">{{ item.positions }}</td>
              <td class="px-3">{{ item.openDate }}</td>
              <td class="px-3">{{ item.type }}</td>
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
</template>

<script>
import stocksData from "../../assets/stocks.json";
import historyData from "../../assets/history.json";
export default {
  name: "HistoryStockComponent",
  props: ["cWidth", "cHeight"],
  data() {
    return {
      activeTab: "stocks",
      runSocket: false,
      searchTerm: "",
      histData: [],
      stocks: [],
    };
  },
  created() {
    if (this.runSocket) {
      this.$on("stocksDataUpdated", this.handleDataUpdated("stocks"));
      this.$on("historyDataUpdated", this.handleDataUpdated("history"));
    } else {
      this.loadDataFromJson();
    }
  },
  methods: {
    handleDataUpdated(data, type) {
      if (type == "history") {
        this.histData = data;
      } else {
        this.stocks = data;
      }
    },
    async loadDataFromJson() {
      try {
        this.stocks = stocksData;
        this.histData = historyData;
      } catch (error) {
        console.error("Error loading data from JSON file:", error);
      }
    },
    filterStocks(event) {
      this.searchTerm = event.target.value;
    },
  },
  computed: {
    filteredStocks() {
      return this.stocks.filter((stock) =>
        stock.ticker.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    },
    containerWidth() {
      const contWidth = document.body.clientWidth;
      let calculatedWidth = (contWidth * 11) / 12;
      calculatedWidth = (calculatedWidth * this.cWidth) / 12;
      return ((calculatedWidth * 90) / 100);
    },
    containerHeight() {
      const contHeight = document.body.clientHeight;
      let calculatedHeight = (contHeight * this.cHeight) / 12;
      return ((calculatedHeight * 70) / 100);
    },
    tableContainerHeight(){
      const contHeight = this.containerHeight;
      const contWidth = this.containerWidth;
      debugger;
      if (contWidth > 2500) return (contHeight *  130 /100).toString() + 'px';
      if (contWidth > 1500) return (contHeight *  120 /100).toString() + 'px';
      if (contWidth > 1300) return (contHeight *  115 /100).toString() + 'px';
      if (contWidth > 1100) return contHeight.toString() + 'px';
      if (contWidth > 900) return (contHeight *  95 /100).toString() + 'px';
      if (contWidth > 800) return (contHeight *  77 /100).toString() + 'px';
      if (contWidth > 700) return (contHeight *  60 /100).toString() + 'px';
      return (contHeight *  70 /100).toString() + 'px';
    },
    thFontSize() {
      const contWidth = this.containerWidth;
      let fontWidth = 0;
      if (this.activeTab === 'stocks'){
        fontWidth = Math.ceil(contWidth + (contWidth * 60) / 100);
      } else {
        fontWidth = Math.ceil(contWidth + (contWidth * 65) / 100);
      }
      fontWidth = ((fontWidth / window.screen.width) * 100).toString() + "%";
      return fontWidth;
    },
    tdFontSize() {
      const contWidth = this.containerWidth;
      let fontWidth = Math.ceil(contWidth + (contWidth * 15) / 100);
      fontWidth = ((fontWidth / window.screen.width) * 100).toString() + "%";
      return fontWidth;
    },
    btnFontSize() {
      const contWidth = this.containerWidth;
      let fontWidth = Math.ceil(contWidth + (contWidth * 40) / 100);
      fontWidth = ((fontWidth / window.screen.width) * 100).toString() + "%";
      return fontWidth;
    },
  },
};
</script>

<style scoped>
.s-card {
  font-size: small;
}
input {
  background-color: #0b0d0e;
  color: #6c7293;
  border: 0.2px solid #39404b;
}

table {
  border-collapse: collapse;
  color: #6c7293;
  overflow-y: scroll;
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
}

tr:hover {
  background-color: #212529;
}

th {
  vertical-align: middle;
  border-bottom: 2px solid #2c2e33 !important;
  color: #6c7293;
  border-bottom-width: 1px;
  background-color: #0b0d0e;
}
.tab-buttons button {
  background-color: #22252e;
  color: #c1c4cd;
  border: none;
  border-radius: 4px 4px 0 0;
  cursor: pointer;
  padding: 8px 16px;
  transition: background-color 0.3s ease;
}

.tab-buttons button:hover {
  background-color: #131722;
}

.tab-buttons button:focus {
  outline: none;
}

.tab-buttons button:active {
  background-color: #131722;
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
@media screen and (max-width: 1000px) {
  .s-card{
    width: 100%;
  }
  .card-body{
    width: 100%
  }
}
</style>
