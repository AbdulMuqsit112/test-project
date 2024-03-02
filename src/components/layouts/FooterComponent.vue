<template>
  <div class="s-card">
    <div class="card-body">
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
                <input class="searchbar" type="text" v-model="searchTerm" placeholder="Search Ticker"
                  @input="filterStocks">
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
  </div>
</template>
  
<script>
import stocksData from '../../assets/stocks.json'
import historyData from '../../assets/history.json'
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
input {
  background-color: #191c24;
  color: #6c7293;
  border: 0.2px solid #39404b;
  border-radius: 0.5rem;
}

.searchbar {
  margin-left: 4px;
  padding: 4px;
  border-radius: 4px;
}

table {
  border-collapse: collapse;
  color: #6c7293;
  overflow-y: auto;
  width: 100%;
}

th,
td {
  border-bottom: 0.1px ridge;
  border-color: #39404b;
  text-align: left;
  padding: 8px;
  color: #6c7293;
  font-size: x-small;
}

tr:hover {
  background-color: #212529;
}

th {
  vertical-align: middle;
  border-bottom: 2px solid #2c2e33 !important;
  color: #6c7293;
  font-size: smaller;
  border-bottom-width: 1px;
}



th,
td {
  border-left: none;
  border-right: none;
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

@media screen and (max-width: 1300px) {

  th {
    font-size: x-small;
  }

  td {
    font-size: xx-small;
  }
}


@media screen and (max-width: 1024px) {
  .s-card{
    width: 100%;
  }
  table{

  }
  th {
    font-size: xx-small;
  }
  
  td {
    padding: 2px;
    font-size: xx-small;
  }
  .searchbar {
    margin-left: 2px;
    padding: 2px;
    border-radius: 2px;
    width: 100%;
}
}
</style>
