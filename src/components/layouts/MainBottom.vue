<template>
  <div class="mainBlock" :style="getMainBlockStyle">
    <ModalComponent v-if="isShowModal" :bid="modalData.bid" :ask="modalData.ask" :currentAsset="modalData.currentAsset"
      :btnVal="modalData.btnVal" :volume="modalData.volume" :btnClass="modalData.btnClass" :sLoss="modalData.stopLoss"
      :tProfit="modalData.takeProfit" :isValuesDisabled="true" @closeModal="closeModal" />
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
      <div class="p-2" v-if="isShowSearchBar">
        <input class="p-1 ml-1 rounded" type="text" v-model="searchTerm" placeholder="Search Ticker"
          @input="filterStocks" />
      </div>
      <div class="mainBlock__tabsEmpty p-0" ref="tableCont">
        <div v-show="activeTab === 'stocks'" class="w-100 h-100 overflow-x-auto">
          <table class="w-100 fixed_header">
            <thead class="sticky-top">
              <tr :class="{ 'dark-header': isDarkMode, 'light-header': !isDarkMode }" class="w-100">
                <th class="header-border" style="width: 16%">
                  <i class="fa fa-search p-0 cursor-pointer"
                    :class="{ 'custom-text-color': isShowSearchBar, 'text-inherit': isDarkMode }"
                    @click="showSearchBar()"></i>
                  POSITIONS
                </th>
                <th class="header-border p-0" style="width: 12%">OPEN DATE</th>
                <th class="header-border">TYPE</th>
                <th class="header-border">VOLUME</th>
                <th class="header-border">SL PRICE</th>
                <th class="header-border">TP PRICE</th>
                <th class="header-border">OPEN PRICE</th>
                <th class="header-border">MARKET PRICE</th>
                <th class="header-border">COMMISION</th>
                <th class="header-border">SWAPS</th>
                <th class="header-border">GROSS PROFIT</th>
                <th>CLOSE ORDER</th>
              </tr>
            </thead>
            <tbody :style="{ 'height': tbodyHeight }">
              <template v-for="(stockCategory, index) in arrangedData">
                <tr class="cursor-pointer w-100" :class="{ 'dark-tr': isDarkMode, 'light-tr': !isDarkMode }"
                  @click="toggleRowContent(stockCategory[0].symbolName)" :key="index">
                  <td style="width: 16%"> {{ stockCategory[0].symbolName }}</td>
                  <td style="width: 12%">
                    {{ formatDate(stockCategory[0].createdOn) }}
                  </td>
                  <td></td>
                  <td>0.01</td>
                  <td>-</td>
                  <td>-</td>
                  <td>
                    <p>Avg</p>
                    11
                  </td>
                  <td></td>
                  <td>11</td>
                  <td>1</td>
                  <td>2</td>
                  <td></td>
                </tr>
                <tr class="sub-row" v-for="stockEntry in stockCategory" :key="stockEntry.id"
                  :class="{ 'dark-tr': isDarkMode, 'light-tr': !isDarkMode }"
                  v-if="stockEntry.symbolName == currentCategory">
                  <td>
                    <div class="d-flex gap-2 justify-content-end">
                      <svg class="note_svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000">
                        <path class="note_svg__st0" d="M409 0h69.1v579H409z"></path>
                        <path class="note_svg__st0" d="M409 509.9h591V579H409z"></path>
                      </svg>
                      <span class="bg-secondary p-1">
                        {{ stockEntry.id }}
                      </span>
                    </div>
                  </td>
                  <td style="width: 12%">{{ formatDate(stockEntry.createdOn) }}</td>
                  <td>{{ stockEntry.type }}</td>
                  <td>{{ stockEntry.volume }}</td>
                  <td>{{ stockEntry.slPrice }}</td>
                  <td>{{ stockEntry.tpPrice }}</td>
                  <td>{{ stockEntry.openPrice }}</td>
                  <td>{{ stockEntry.marketPrice }}</td>
                  <td>{{ stockEntry.commission }}</td>
                  <td>{{ stockEntry.swaps }}</td>
                  <td>{{ stockEntry.grossProfit }}</td>
                  <td class="text-center text-danger">
                    <div class="position-relative d-flex gap-2">
                      <span class="cursor-pointer" title="Modify Order">
                        <svg viewBox="3 3 26 26" xmlns="http://www.w3.org/2000/svg" class="icon-sm"
                          @click="modifyOrder(stockEntry)">
                          <path
                            d="M28.262 5.87a2.666 2.666 0 10-3.199 2.612v18.18h1.066V8.482a2.667 2.667 0 002.133-2.612zm-2.666 1.6c-.882 0-1.599-.717-1.599-1.599s.717-1.599 1.599-1.599 1.599.717 1.599 1.599-.717 1.599-1.599 1.599zM6.937 23.517V5.337H5.871v18.18a2.665 2.665 0 101.067 0zm-.533 4.212c-.882 0-1.599-.717-1.599-1.599s.717-1.599 1.599-1.599 1.599.717 1.599 1.599-.717 1.599-1.599 1.599zM16.533 13.388v-8.05h-1.066v8.05a2.667 2.667 0 000 5.224v8.05h1.066v-8.05a2.667 2.667 0 000-5.224zM16 17.599c-.882 0-1.599-.717-1.599-1.599s.717-1.599 1.599-1.599 1.599.717 1.599 1.599-.717 1.599-1.599 1.599z">
                          </path>
                        </svg>
                      </span>
                      <span class="cursor-pointer" title="Double up position" @click="doubleUpPosition(stockEntry)">
                        <svg viewBox="-21 0 512 512" xmlns="http://www.w3.org/2000/svg" class="icon-sm">
                          <path
                            d="M325.332 512H58.668C26.305 512 0 485.695 0 453.332v-288c0-32.363 26.305-58.664 58.668-58.664h10.664c8.832 0 16 7.168 16 16s-7.168 16-16 16H58.668c-14.7 0-26.668 11.965-26.668 26.664v288C32 468.032 43.969 480 58.668 480h266.664c14.7 0 26.668-11.969 26.668-26.668v-10.664c0-8.832 7.168-16 16-16s16 7.168 16 16v10.664C384 485.695 357.695 512 325.332 512zm0 0">
                          </path>
                          <path
                            d="M410.668 384h-224C154.305 384 128 357.695 128 325.332V58.668C128 26.305 154.305 0 186.668 0h224c32.363 0 58.664 26.305 58.664 58.668v266.664c0 32.363-26.3 58.668-58.664 58.668zm-224-352C171.968 32 160 43.969 160 58.668v266.664c0 14.7 11.969 26.668 26.668 26.668h224c14.7 0 26.664-11.969 26.664-26.668V58.668c0-14.7-11.965-26.668-26.664-26.668zm0 0">
                          </path>
                        </svg>
                      </span>
                      <span class="cursor-pointer" title="Double up position" @click="reversePosition(stockEntry)">
                        <svg viewBox="0 0 551.127 551.127" xmlns="http://www.w3.org/2000/svg" class="icon-sm"><path d="M482.21 378.9h-62.607c-21.882 0-42.754-8.208-58.749-23.143l-85.906-80.179 85.939-80.208c15.978-14.935 36.851-23.143 58.749-23.143h62.601v34.446l68.889-51.668-68.889-51.668v34.446h-62.601c-30.661 0-59.876 11.504-82.262 32.427L138.622 355.723c-16.029 14.935-36.868 23.177-58.716 23.177H.032v34.378l79.74.034h.151c30.577 0 59.758-11.504 82.195-32.427l87.592-81.752 87.63 81.785c22.403 20.923 51.618 32.427 82.262 32.427h62.607v34.446l68.889-51.666-68.889-51.671.001 34.446zM79.908 172.26c21.831 0 42.67 8.208 58.665 23.143l60.652 56.609 25.237-23.553-62.376-58.217c-22.403-20.923-51.584-32.427-82.161-32.427h-.151L0 137.848v34.378h79.79c.051.001.084.034.118.034z"></path></svg>
                      </span>
                      <span class="cursor-pointer" @click="showModal(stockEntry.id)">
                        <i class="fas fa-times"></i>
                      </span>
                      <div v-if="isModalVisible && stockEntry.id === selectedStockSymbol"
                        class="tooltip-content d-flex flex-column gap-1 text-sm"
                        :class="{ 'dark-bg': isDarkMode, 'light-bg': !isDarkMode }">
                        <p>Are you sure?</p>
                        <span class="d-flex gap-2">
                          <button class="btn bg-danger btn-danger text-xs px-2" @click="hideModal">Cancel</button>
                          <button class="btn btn-success text-xs px-3"
                            @click="confirmDelete(stockEntry.id, stockEntry.closePrice)">Ok</button>
                        </span>
                      </div>
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div v-show="activeTab === 'history'" class="w-100 h-100 overflow-x-auto">
          <table class="w-100 fixed_header">
            <thead>
              <tr class="sticky-top" :class="{ 'dark-header': isDarkMode, 'light-header': !isDarkMode }">
                <th class="px-3 header-border">ORDER</th>
                <th class="px-3 header-border">SYMBOL</th>
                <th class="px-3 header-border">Open DATE</th>
                <th class="px-3 header-border">CLOSE DATE</th>
                <th class="px-3 header-border">TYPE</th>
                <th class="px-3 header-border">VOLUME</th>
                <th class="px-3 header-border">OPEN PRICE</th>
                <th class="px-3 header-border">CLOSE PRICE</th>
                <th class="px-3 header-border">TP</th>
                <th class="px-3 header-border">SL</th>
                <th class="px-3 header-border">Commission</th>
                <th class="px-3 header-border">P/L</th>
              </tr>
            </thead>
            <tbody :style="{ 'height': tbodyHeight }">
              <tr :class="{ 'dark-tr': isDarkMode, 'light-tr': !isDarkMode }" v-for="( item, index ) in  histData "
                :key="index">
                <td class="px-3">{{ item.id }}</td>
                <td class="px-3">{{ item.symbolName }}</td>
                <td class="px-3">{{ formatDate(item.createdOn) }}</td>
                <td class="px-3">{{ formatDate(item.closedOn) }}</td>
                <td class="px-3">
                  <span class="text-danger py-1 px-2" v-if="item.type == 2">
                    Sell
                  </span>
                  <span class="text-success py-1 px-2" v-if="item.type == 1">
                    Buy
                  </span>
                </td>
                <td class="px-3">{{ item.volume }}</td>
                <td class="px-3">{{ item.openPrice }}</td>
                <td class="px-3">{{ item.closePrice }}</td>
                <td class="px-3">{{ item.tpPrice }}</td>
                <td class="px-3">{{ item.slPrice }}</td>
                <td class="px-3">{{ item.commission }}</td>
                <td class="px-3">-</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div v-if="layout != 1" class="mainBlock__split mainBlock__split_h mainBlock__split_bottom"
      @mousedown="resizeBottom">
    </div>
  </div>
</template>

<script>
import resizeMixin from '../../mixins/resizeMixin'
import ModalComponent from './ModalComponent.vue';
export default {
  name: "MainBottom",
  components: { ModalComponent },
  mixins: [resizeMixin],
  data() {
    return {
      activeTab: "stocks",
      runSocket: false,
      searchTerm: "",
      histData: [],
      selectedStockSymbol: null,
      isModalVisible: false,
      tbodyHeight: "auto",
      isShowSearchBar: false,
      categorizedData: {},
      currentCategory: '',
      isShowModal: false,
      modalData: {
        currentAsset: null,
        btnVal: '',
        btnClass: '',
        bid: 0,
        ask: 0,
        volume: 0.01,
        stopLoss: false,
        takeProfit: false
      }
    };
  },
  created() {
    this.$on("BottomComponentUpdated", this.setTableBodyHeight);
  },
  mounted() {
    this.fetchStockTableData();
    this.setTableBodyHeight();
  },
  methods: {
    generateOrderPayload(currentAsset, type) {
      const {
        chg,
        chgPercentage,
        volume,
        volumePrice,
        mktCap,
        pe,
        epsTim,
        employees,
        sector,
        position,
        symbolId,
        symbolName,
        commission,
        swaps,
        grossProfit,
        stopLoss,
        takeProfit,
        spread,
        spread_Pips,
        pipValue,
      } = currentAsset;
      const price = this.getAssetCurrentPrice(symbolId);
      return {
        price,
        chg,
        chgPercentage,
        type,
        volume,
        volumePrice,
        mktCap,
        pe,
        epsTim,
        employees,
        sector,
        position,
        slPrice: price,
        tpPrice: price,
        openPrice: price,
        marketPrice: price,
        commission,
        swaps,
        grossProfit,
        bid: price,
        ask: price,
        stopLoss,
        takeProfit,
        spread,
        spread_Pips,
        pipValue,
        symbolId,
        symbolName,
      };
    },
    getAssetCurrentPrice(idToMatch) {
      const matchedObject = this.symbolsData.find(obj => obj.id === idToMatch);
      const price = matchedObject ? matchedObject.p : null;
      return price;
    },
    reversePosition(orderDetails) {
      
    },
    doubleUpPosition(orderDetails) {
      const asset = this.generateOrderPayload(orderDetails, 1);
      this.$store.dispatch('createOrder', { asset });
    },
    modifyOrder(orderDetails) {
      const { bid, ask, type, volume, stopLoss, takeProfit } = orderDetails;
      this.modalData = {
        currentAsset: orderDetails,
        btnVal: `Modify ${type == 1 ? 'Buy' : 'Sell'}`,
        btnClass: type == 1 ? 'btn-success' : 'btn-danger bg-danger',
        bid: bid,
        ask: ask,
        stopLoss: stopLoss,
        takeProfit: takeProfit,
        volume: volume,
      }
      this.isShowModal = true;
    },
    closeModal() {
      this.isShowModal = false;
    },
    toggleRowContent(name) {
      if (this.currentCategory === name) {
        this.currentCategory = ''
        return;
      }
      this.currentCategory = name;
    },
    showSearchBar() {
      this.isShowSearchBar = !this.isShowSearchBar
    },
    formatDate(dateString) {
      const options = { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' };
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', options).replace(/([AaPp]M)$/, '');
    },

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
        this.tbodyHeight = `${dimensions.height - 50}px`;
      });
    },
    resizeBottom(event) {
      this.initResize(event, 'bottomComponent');
    }
  },
  computed: {
    symbolsData() {
      return this.$store.getters.getSymbolsData;
    },
    arrangedData() {
      if (!this.stocks) return [];
      this.categorizedData = {};
      this.stocks.forEach(entry => {
        if (this.categorizedData.hasOwnProperty(entry.symbolName)) {
          this.categorizedData[entry.symbolName].push(entry);
        } else {
          this.categorizedData[entry.symbolName] = [entry];
        }
      });
      return this.categorizedData;
    },
    layout() {
      return this.$store.getters.getLayoutType;
    },
    getMainBlockStyle() {
      return this.$store.getters.getLayoutDimensions.bottomComponent;
    },
    isDarkMode() {
      return this.$store.getters.getIsDarkMode;
    },
    stocks() {
      return this.$store.getters.getStocks;
    }
  },
  watch: {
    getMainBlockStyle: {
      handler(newVal) {
        this.setTableBodyHeight();
      },
      deep: true
    }
  }
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
  vertical-align: middle;
  padding: 12px 6px;
  text-align: center;
  border-left: none;
  border-right: none;
  width: 10%;
  min-width: 80px;
}
td {
  border-bottom: 0.1px ridge;
  border-color: #39404b;
  font-size: 60%;
  font-weight: 400;
}
th {
  border-bottom: 1px solid #2c2e33 !important;
  border-bottom-width: 1px;
  font-size: 70%;
  font-weight: 300 !important;
  padding-block: 8px;
}
.sub-row td {
  padding: 8px 6px;
}
.note_svg {
  width: 14px;
}

.icon-sm {
  width: 10px;
  height: 8px
}

.dark-tr {
  color: #dde2e5;
}

.dark-tr:hover {
  background-color: #1c2222;
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
</style>
