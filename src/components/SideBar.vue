<template>
  <table class="symbol-table">
    <thead>
      <tr>
        <th>SYMBOL</th>
        <th>BID</th>
        <th>ASK</th>
        <th>SPREAD</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(symbolGroup, category) in symbolRows">
        <tr :key="category" class="category-row">
          <td colspan="4" class="category-header" @click="toggleCategory(category)">
            {{ category }}
            <span v-if="categoryExpanded[category]"><img src="../assets/arrow-down.png" class="arrow" alt=""></span>
            <span v-else><img src="../assets/right-arrow.png" class="arrow" alt="arrow"></span>
          </td>
        </tr>
        <template v-if="categoryExpanded[category]">
          <tr v-for="(symbol, index) in symbolGroup" :key="index" class="category-row">
            <td @click="toggleExpand(symbol)" :class="{ 'expanded': symbolExpanded[symbol.symbol] }">
              <div class="sym-group">
                <img class="symIcon" :src="symbol.symbolIcon ? require(`../assets/${symbol.symbolIcon}`) : ''" alt="icon">
                <span>{{ symbol.symbol }}</span>
              </div>
            </td>
            <td>{{ symbol.last }}</td>
            <td>{{ symbol.chg }}</td>
            <td>{{ symbol.chgPercent }}</td>
          </tr>
        </template>
      </template>
    </tbody>
  </table>
</template>

<script>
import io from 'socket.io-client';
import symblRow from '../assets/symbolRow.json'; // Import JSON file

export default {
  data() {
    return {
      symbolRows: {},
      categoryExpanded: {},
      symbolExpanded: {},
      runSocket: false
    };
  },
  created() {
    if (this.runSocket){
      const socket = io('http://localhost:3000'); // Connect to server
      socket.on('connect', () => {
        console.log('Connected to server');
      });
      socket.on('dataUpdate', (data) => {
        this.symbolRows = data; // Update data when received from server
      });
      // Initially try connecting to server
      socket.connect();
    } else {
      this.loadDataFromJson();
    }
  },
  computed: {
    filteredSymbolRows() {
      const filteredRows = {};
      for (const category in this.symbolRows) {
        if (this.categoryExpanded[category]) {
          filteredRows[category] = this.symbolRows[category];
        }
      }
      return filteredRows;
    }
  },
  methods: {
    async loadDataFromJson() {
      try {
        // Fetch data from JSON file
        this.symbolRows = symblRow; // Assign the imported JSON data
      } catch (error) {
        console.error('Error loading data from JSON file:', error);
      }
    },
    toggleCategory(category) {
      this.$set(this.categoryExpanded, category, !this.categoryExpanded[category]);
    },
    toggleExpand(symbol) {
      this.$set(this.symbolExpanded, symbol.symbol, !this.symbolExpanded[symbol.symbol]);
    }
  }
};
</script>

<style scoped>
.symbol-table {
  width: 320px;
  border-collapse: collapse;
  font-size: small;
  background-color: #131722;
}


.symbol-table th,
.symbol-table td {
  padding: 12px;
  border: 1px solid #eae9e9dd;
  text-align: left;
  border: none;
}

.symbol-table th {
  background-color: #22252e;
  font-weight: 700;
  color: #5f6578;
}

.symbol-table td {
  font-size: smaller;
  cursor: pointer;
  transition: background-color 0.3s ease;
  border-bottom: 0.5px solid #5f6578;
}

.symbol-table td:hover {
  background-color: #1f6f6c;
}

.symbol-table th:nth-child(1) {
  width: 60%;
}

.category-row {
  background-color: #131722;
  color: #d7d8d6;

}

.category-header {
  font-size: small;
  cursor: pointer;
  padding: 12px;
  font-weight: 200;
  background-color: #131722;
  color: #5f6578;
}

.category-header:hover {
  background-color: #e0e0e0;
}

.expanded {
  font-weight: bold;
}

.symbol-table td span {
  margin-left: 4px;
}

.arrow {
  width: 6px;
  height: 6px;
}
.sym-group{
  display: flex;
  align-items: center;
  gap: 2px;
}
.symIcon{
  width: 12px;
  height: 12px;
}
</style>