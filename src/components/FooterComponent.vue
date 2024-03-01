<template>
  <div class="footer">
    <div class="tab-buttons">
      <button @click="activeTab = 'stocks'">Stocks</button>
      <button @click="activeTab = 'history'">History</button>
    </div>
    <div v-show="activeTab === 'stocks'">
      <table>
        <thead>
          <tr>
            <th>
              Ticker
              <input class="searchbar" type="text" v-model="searchTerm" placeholder="Search Ticker" @input="filterStocks">
            </th>
            <th>Price</th>
            <th>Chg</th>
            <th>Chg%</th>
            <th>Technical Rating</th>
            <th>Vol</th>
            <th>Volume Price</th>
            <th>Mkt Cap</th>
            <th>P/E</th>
            <th>EPS (TTM)</th>
            <th>Employees</th>
            <th>Sector</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="stock in filteredStocks" :key="stock.ticker">
            <td>{{ stock.ticker }}</td>
            <td>{{ stock.price }}</td>
            <td>{{ stock.chg }}</td>
            <td>{{ stock.chgPercent }}</td>
            <td>{{ stock.technicalRating }}</td>
            <td>{{ stock.vol }}</td>
            <td>{{ stock.volumePrice }}</td>
            <td>{{ stock.mktCap }}</td>
            <td>{{ stock.pe }}</td>
            <td>{{ stock.eps }}</td>
            <td>{{ stock.employees }}</td>
            <td>{{ stock.sector }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-show="activeTab === 'history'">
      <table>
        <thead>
          <tr>
            <th>Positions</th>
            <th>Open Date</th>
            <th>Type</th>
            <th>Volume</th>
            <th>SL Price</th>
            <th>TP Price</th>
            <th>Open Price</th>
            <th>Market Price</th>
            <th>Commission</th>
            <th>Swaps</th>
            <th>Gross Profit</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in histData" :key="index">
            <td>{{ item.positions }}</td>
            <td>{{ item.openDate }}</td>
            <td>{{ item.type }}</td>
            <td>{{ item.volume }}</td>
            <td>{{ item.slPrice }}</td>
            <td>{{ item.tpPrice }}</td>
            <td>{{ item.openPrice }}</td>
            <td>{{ item.marketPrice }}</td>
            <td>{{ item.commission }}</td>
            <td>{{ item.swaps }}</td>
            <td>{{ item.grossProfit }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
  
<script>
import stocksData from '../assets/stocks.json'
import historyData from '../assets/history.json'
export default {
  name: 'FooterComponent',
  data() {
    return {
      activeTab: 'stocks',
      runSocket: false,
      searchTerm: '',
      histData: [],
      stocks: []
    };
  },
  created() {
    if (this.runSocket) {
      this.$on('stocksDataUpdated', this.handleDataUpdated('stocks'));
      this.$on('historyDataUpdated', this.handleDataUpdated('history'));
    } else {
      this.loadDataFromJson();
    }
  },
  computed: {
    filteredStocks() {
      return this.stocks.filter(stock => stock.ticker.toLowerCase().includes(this.searchTerm.toLowerCase()));
    }
  },
  methods: {
    handleDataUpdated(data, type) {
      if (type == 'history') {
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
        console.error('Error loading data from JSON file:', error);
      }
    },
    filterStocks(event) {
      this.searchTerm = event.target.value;
    }
  }
};
</script>
  
<style scoped>
.footer{
  margin-left: 4px;
}
.searchbar {
  margin-left: 4px;
  padding: 4px;
  border-radius: 4px;
}

table {
  width: 1010px;
  border-collapse: collapse;
}

th,
td {
  background-color: #131722;
  border-bottom: 0.1px ridge #d7d8d6;
  text-align: left;
  padding: 8px;
  color: #d7d8d6;
  font-size: x-small;
}

th {
  background-color: #22252e;
  color: #c1c4cd;
  font-size: smaller;

}



tbody tr:hover {
  background-color: #e0e0e0;
}

th,
td {
  border-left: none;
  border-right: none;
}

th:last-child,
td:last-child {
  border-right: 0.1px ridge #d7d8d6;
}

.tab-buttons {
  margin-bottom: 10px;
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

.tab-buttons button.active {
  background-color: #131722;
}
@media screen and (max-width: 3000px) {
    table {
        width: 1900px;
        height: 350px;
    }
}
@media screen and (max-width: 2000px) {
  table {
        width: 1300px;
        height: 220px;
    }
}
@media screen and (max-width: 1500px) {
    table {
        width: 1010px;
        height: 140px;
    }
}
@media screen and (max-width: 1300px) {
    table {
        width: 840px;
    }
}

@media screen and (max-width: 1000px) {
  table {
    width: 840px;
  }
}

@media screen and (max-width: 900px) {
  table {
    width: 750px;
  }

  th {
    font-size: small;
  }

  td {
    padding: 6px;
    font-size: xx-small;
  }
}</style>
