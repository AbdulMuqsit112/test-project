<template>
  <div class="mainBlock" :style="getMainBlockStyle">
    <div class="mainBlock__split mainBlock__split_v mainBlock__split_left"></div>
    <div class="mainBlock__tabs">
      <div class="mainBlock__tabsItem mainBlock__tabsItem_add">+</div>
    </div>
    <div class="mainBlock__content">
      <div class="mainBlock__tabsEmpty p-0" ref="Modal">
        <div class="modal-wrapper" v-if="isModalOpen" :style="modalDimensions">
          <div class="modal-content gap-4">
            <div class="modal-header d-flex">
              <h5 class="modal-title varaible-font d-flex justify-content-start">Trade Pannel</h5>
              <button type="button" class="btn varaible-font" @click="closeModal" aria-label="Close">
                X
              </button>
            </div>
            <div class="modal-body d-flex flex-column gap-5">
              <div class="d-flex flex-column gap-2">
                <div class="d-flex justify-content-between">
                  <span>Bid: 178</span>
                  <span>Ask: 179.02</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span>Volume:</span>
                  <input type="number" step="0.01" @input="handleInput('vol')" @blur="handleBlur('vol')"
                    v-model="volume" class="vol" />
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span>Stop Loss:</span>
                  <input type="checkbox" />
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span>Take Profit:</span>
                  <input type="checkbox" />
                </div>
              </div>
              <div class="d-flex flex-column quantity-grp py-4 gap-1">
                <div class="d-flex justify-content-between align-items-center">
                  <span>Quantity:</span>
                  <span>0.01 Units</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span>Required margin:</span>
                  <span>0.01 Units</span>
                </div>
                <div class="d-flex justify-content-between align-items-center w-100">
                  <div class="d-flex justify-content-between w-50">
                    <span>Spread:</span>
                    <span>-0.00 EUR</span>
                  </div>
                  <span>6.0 pips</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span>Commission:</span>
                  <span>0 pips</span>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <span>Pip value:</span>
                  <span>0.00001 EUR</span>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn p-0 w-100 footer-font" :class="`${btnClass}`" @click="closeModal">
                {{ btnVal }}
                <br />
                178.8
              </button>
              <!-- Additional buttons or actions -->
            </div>
          </div>
        </div>
        <div class="d-flex gap-2 w-100 search-box p-2" v-if="!isModalOpen">
          <select class="category p-1" v-model="selectedCategory">
            <option value="all">All</option>
            <option v-for="category in categories" :value="category">{{ category }}</option>
          </select>
          <input type="text" v-model="searchQuery" placeholder="Search...">
        </div>
        <div class="w-100 h-100 overflow-auto" v-if="!isModalOpen">
          <table class="table table-hover">
            <thead class="sticky-top">
              <tr>
                <th class="text-white fw-semibold">Symbol</th>
                <th class="text-end">Last</th>
                <th class="text-end">Change</th>
                <th class="text-end">Change Percent</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(asset, index) in asssetArr" :key="asset.s" @click="toggleRowContent(index, asset)">
                <td :colspan="4" v-if="selectedRow === index">
                  <div class="buySell d-flex flex-column">
                    <div class="text-white fw-semibold d-flex justify-content-between">
                      <div class="symGroup d-flex gap-2 align-items-center">
                        <!-- <img
                          class="symIcon"
                          :src="
                            item.symbolIcon
                              ? require(`src/assets/${item.symbolIcon}`)
                              : ''
                          "
                          alt="icon"
                        /> -->
                        {{ asset.s }}
                      </div>
                      <div class="icons-group d-flex gap-2 p-2">
                        <svg class="info-icon" @click.stop="toggleInfoSection()" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" fill="none" x="0px"
                          y="0px">
                          <path
                            d="M50 41.6667C52.3012 41.6667 54.1666 43.5321 54.1666 45.8333V66.6667C54.1666 68.9678 52.3012 70.8333 50 70.8333C47.6988 70.8333 45.8333 68.9678 45.8333 66.6667V45.8333C45.8333 43.5321 47.6988 41.6667 50 41.6667Z"
                            fill="white" />
                          <path
                            d="M50 29.1667C52.3012 29.1667 54.1666 31.0321 54.1666 33.3333C54.1666 35.6345 52.3012 37.5 50 37.5C47.6988 37.5 45.8333 35.6345 45.8333 33.3333C45.8333 31.0321 47.6988 29.1667 50 29.1667Z"
                            fill="white" />
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M8.33331 50C8.33331 26.9881 26.9881 8.33333 50 8.33333C73.0118 8.33333 91.6666 26.9881 91.6666 50C91.6666 73.0119 73.0118 91.6667 50 91.6667C26.9881 91.6667 8.33331 73.0119 8.33331 50ZM50 16.6667C31.5905 16.6667 16.6666 31.5905 16.6666 50C16.6666 68.4095 31.5905 83.3333 50 83.3333C68.4095 83.3333 83.3333 68.4095 83.3333 50C83.3333 31.5905 68.4095 16.6667 50 16.6667Z"
                            fill="white" />
                        </svg>
                        <svg class="grp-icon" width="36" height="48" viewBox="0 0 36 48" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M6 21.748C2.54955 20.8599 0 17.7277 0 14C0 10.2723 2.54955 7.14012 6 6.25203L6 2.00139C6 0.896052 6.88773 0 8 0C9.10457 0 10 0.894938 10 2.00139L10 6.25203C13.4505 7.14012 16 10.2723 16 14C16 17.7277 13.4505 20.8599 10 21.748L10 45.9986C10 47.1039 9.11227 48 8 48C6.89543 48 6 47.1051 6 45.9986L6 21.748ZM26 41.748C22.5495 40.8599 20 37.7277 20 34C20 30.2723 22.5495 27.1401 26 26.252L26 2.00139C26 0.896052 26.8877 0 28 0C29.1046 0 30 0.894938 30 2.00139L30 26.252C33.4505 27.1401 36 30.2723 36 34C36 37.7277 33.4505 40.8599 30 41.748V45.9986C30 47.1039 29.1123 48 28 48C26.8954 48 26 47.1051 26 45.9986V41.748ZM32 34C32 31.7909 30.2091 30 28 30C25.7909 30 24 31.7909 24 34C24 36.2091 25.7909 38 28 38C30.2091 38 32 36.2091 32 34ZM12 14C12 11.7909 10.2091 10 8 10C5.79086 10 4 11.7909 4 14C4 16.2091 5.79086 18 8 18C10.2091 18 12 16.2091 12 14Z"
                            fill="white" />
                        </svg>
                        <svg class="star" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                          version="1.1" x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;"
                          xml:space="preserve">
                          <title>61 all</title>
                          <path
                            d="M81.8,42.6c-0.4-1.1-1.3-1.8-2.4-2l-18.4-2.8l-8.2-16.7c-0.5-1-1.6-1.7-2.7-1.7l0,0c-1.1,0-2.2,0.6-2.7,1.7l-8.2,16.7  l-18.4,2.7c-1.6,0.2-2.8,1.8-2.5,3.4c0.1,0.7,0.4,1.3,0.9,1.7l13.3,13L29.1,77c-0.3,1.6,0.8,3.2,2.4,3.5c0.7,0.1,1.3,0,1.9-0.3  L50,71.5l16.5,8.7c1.5,0.8,3.3,0.2,4-1.3c0.3-0.6,0.4-1.2,0.3-1.9l-3.1-18.3l13.3-13C81.8,44.9,82.1,43.7,81.8,42.6z M62.4,55.5  c-0.7,0.7-1,1.7-0.9,2.7L63.9,72l-12.5-6.6c-0.9-0.5-1.9-0.5-2.8,0L36.1,72l2.4-13.9c0.2-1-0.2-2-0.9-2.7l-10.1-9.9l14-2  c1-0.1,1.8-0.8,2.3-1.6L50,29.3l6.2,12.7c0.4,0.9,1.3,1.5,2.2,1.6l14,2L62.4,55.5z" />
                        </svg>
                        <svg class="add-icon" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125"
                          style="enable-background:new 0 0 100 100;" xml:space="preserve">
                        <g>
                          <path fill="white" stroke="white" stroke-width="4" d="M83,5H17C10.4,5,5,10.4,5,17v66c0,6.6,5.4,12,12,12h66c6.6,0,12-5.4,12-12V17C95,10.4,89.6,5,83,5z M91,83c0,4.4-3.6,8-8,8   H17c-4.4,0-8-3.6-8-8V17c0-4.4,3.6-8,8-8h66c4.4,0,8,3.6,8,8V83z" />
                          <polygon fill="white" stroke="white" stroke-width="4" points="52,24 48,24 48,48 24,48 24,52 48,52 48,76 52,76 52,52 76,52 76,48 52,48" />
                        </g>
                      </svg>
                      </div>
                    </div>
                    <div class="d-flex text-white">
                      <div class="bg-danger d-flex flex-column gap-3 w-100 p-2" @click="sellItem(asset)">
                        <div class="d-flex justify-content-between">
                          Sell
                          <img src="src/assets/down.png" class="arrowIcon" alt="icon" />
                        </div>
                        <span class="buySellSpan">178.95</span>
                      </div>
                      <div class="bg-success d-flex flex-column gap-3 w-100 p-2" @click="buyItem(asset)">
                        <div class="d-flex justify-content-between">
                          <img src="src/assets/up.png" class="arrowIcon" alt="icon" />
                          Buy
                        </div>
                        <span class="buySellSpan d-flex justify-content-end">179.01</span>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button class="text-danger buySellBtn">
                        Low 173.20
                      </button>
                      <button class="text-success buySellBtn">
                        High 179.74
                      </button>
                    </div>
                    <div class="inpbox">
                      <button @click="handleDecrement('sellVal')" class="inc-dec-btn rounded-start-1">
                        -
                      </button>
                      <input class="sell-val" type="text" @input="handleInput('sellVal')" @blur="handleBlur('sellVal')"
                        v-model="sellVal" />
                      <button @click="handleIncrement('sellVal')" class="inc-dec-btn rounded-end-1">
                        +
                      </button>
                    </div>
                    <div v-if="isInfoSection" class="d-flex flex-column w-100 align-items-start info-block gap-2 px-2 py-4">
                      <span class="h5">Basic Info:</span>
                      <div class="d-flex justify-content-between w-100">
                        <span>
                          Asset class:
                        </span>
                        <span>{{ asset.category }}</span>
                      </div>
                      <div class="d-flex justify-content-between w-100">
                        <span>
                          Pip Value:
                        </span>
                        <span>0.0914</span>
                      </div>
                      <div class="d-flex justify-content-between w-100">
                        <span>
                          Currency:
                        </span>
                        <span>USD</span>
                      </div>
                      <div class="d-flex justify-content-between w-100">
                        <span>
                          Contract size:
                        </span>
                        <span>1000</span>
                      </div>
                      <div class="d-flex justify-content-between w-100">
                        <span>
                          Min position size:
                        </span>
                        <span>0.01</span>
                      </div>
                      <div class="d-flex justify-content-between w-100">
                        <span>
                          Max position size:
                        </span>
                        <span>1000</span>
                      </div>
                      <div class="d-flex justify-content-between w-100">
                        <span>
                          Daily swap by intrest:
                        </span>
                        <span>Long:-0.056%/Short:-0.028%</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td v-if="selectedRow != index" class="text-white fw-semibold">
                  <div class="symGroup d-flex gap-2 align-items-center">
                    <!-- <img
                      class="symIcon"
                      :src="
                        item.symbolIcon
                          ? require(`src/assets/${item.symbolIcon}`)
                          : ''
                      "
                      alt="icon"
                    /> -->
                    {{ asset.s }}
                  </div>
                </td>
                <td v-if="selectedRow != index" class="text-end">
                  {{ asset.p }}
                </td>
                <td v-if="selectedRow != index" class="text-end">
                  {{ asset.v }}
                </td>
                <!-- <td v-if="selectedRow != index" class="text-end">
                  {{ asset.chgPercent }}
                </td> -->
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
    <div v-if="layout == 2" class="mainBlock__split mainBlock__split_h mainBlock__split_bottom"></div>
  </div>
</template>

<script>
import symblRow from "../../assets/symbolRow.json";
import socketMixin from "../../mixins/socketMixin";
export default {
  mixins: [socketMixin],
  data() {
    return {
      asssetArr: [],
      runSocket: true,
      selectedRow: null,
      sellVal: 0.01,
      isModalOpen: false,
      volume: 0.01,
      btnClass: "",
      btnVal: "",
      categories: [],
      selectedCategory: "all",
      searchQuery: "",
      isInfoSection: false,
    };
  },
  created() {
    if (this.runSocket) {
      this.$on("symbolDataUpdated", this.handleDataUpdated);
    } else {
      this.loadDataFromJson();
    }
  },
  methods: {
    toggleInfoSection(){
      this.isInfoSection = !this.isInfoSection;
    },
    toggleRowContent(index) {
      if (this.selectedRow === index) {
        this.$emit("graph-data-change", false);
        this.selectedRow = null;
      } else {
        this.selectedRow = index;
        this.$emit("graph-data-change", true);
      }
      this.isInfoSection = false;
    },
    handleDataUpdated(data) {
      this.updateData(JSON.parse(data).data);
    },
    loadDataFromJson() {
      try {
        this.assets = symblRow.assets;
        this.categories = [...new Set(this.assets.map(asset => asset.category))];
      } catch (error) {
        console.error("Error loading data from JSON file:", error);
      }
    },
    updateData(receivedData) {
      for (const item of receivedData) {
        const index = this.asssetArr.findIndex(d => d.s === item.s);
        if (index !== -1) {
          this.$set(this.asssetArr, index, item);
        } else {
          this.asssetArr.push(item);
        }
      }
    },
    handleInput(event, val) {
      let value = event.target.value;
      value = value.replace(/[^\d.]/g, "");
      const decimalCount = (value.match(/\./g) || []).length;
      if (decimalCount > 1) {
        value = value.substr(0, value.lastIndexOf("."));
      }
      event.target.value = value;
      if (val == "vol") {
        this.volume = value;
      } else {
        this.sellVal = value;
      }
    },
    handleBlur(val) {
      if (val == "vol") {
        if (!this.volume.trim()) {
          this.volume = "0.01";
        }
      } else {
        if (!this.sellVal.trim()) {
          this.sellVal = "0.01";
        }
      }
    },
    handleIncrement() {
      this.sellVal = (parseFloat(this.sellVal) + 0.01).toFixed(2);
    },
    handleDecrement() {
      if (parseFloat(this.sellVal) > 0.01) {
        this.sellVal = (parseFloat(this.sellVal) - 0.01).toFixed(2);
      }
    },
    buyItem(item) {
      this.isModalOpen = true;
      this.btnClass = "btn-success";
      this.btnVal = "Buy";
    },
    sellItem(item) {
      this.btnClass = "btn-danger bg-danger";
      this.isModalOpen = true;
      this.btnVal = "Sell";
    },
    closeModal() {
      this.$emit("graph-data-change", false);
      this.selectedRow = null;
      this.isModalOpen = !this.isModalOpen;
    },
  },
  computed: {
    layout() {
      return this.$store.state.layoutType;
    },
    getMainBlockStyle() {
      let layoutType = this.layout;
      if (layoutType == 2) {
        return {
          width: '25%',
          height: '50%',
          top: '50%',
          left: '75%',
        };
      } else if (layoutType == 3) {
        return {
          width: '54.3968%',
          height: '50%',
          top: '50%',
          left: '45.6032%',
        };
      }
      else {
        return {
          width: '25%',
          height: '100%',
          top: '0%',
          left: '75%',
        };
      }
    },
    modalDimensions() {
      const Modal = this.$refs.Modal;
      const dimensions = Modal.getBoundingClientRect();
      return {
        width: `${dimensions.width}px`,
        maxHeight: `${dimensions.height}px`,
      };
    },
    filteredAssets() {
      const lowerCaseQuery = this.searchQuery.toLowerCase();
      if (this.selectedCategory === 'all') {
        return this.assets.filter(asset => {
          return asset.symbol.toLowerCase().includes(lowerCaseQuery);
        });
      } else {
        return this.assets.filter(asset => {
          return asset.category === this.selectedCategory && asset.symbol.toLowerCase().includes(lowerCaseQuery);
        });
      }
    },
  },
};
</script>

<style scoped>
.info-block {
  border-top: 1px solid;
  font-weight: 400;
}
.star {
  margin-block: -4.5px;
  width: 28px;
  height: 31px;
}

.info-icon {
  width: 23px;
  height: 20px;
}
.add-icon{
  width: 20px;
  height: 18px
}
.grp-icon {
  width: 20px;
  height: 16px;
}

.buySell {
  background-color: #191c24;
  padding-block: 8px;
  font-size: small;
  font-weight: 800;
}

.buySellSpan {
  font-size: x-small;
  font-weight: 400;
}

.buySellBtn {
  background-color: #191c24;
  border: 1px solid;
  padding: 4px 8px;
  border-radius: 4px;
}

.inpbox {
  position: relative;
  bottom: 48px;
  display: flex;
  justify-content: center;
}

.sell-val {
  width: 15%;
  text-align: center;
  background-color: #22252e;
  color: #6c7293;
  border: none;
}

.vol {
  padding: 4px;
  background-color: #22252e;
  color: white;
  text-align: center;
  border: none;
}

.inc-dec-btn {
  background-color: #3d4353;
  border-color: transparent;

  color: #c5c3c1;
  padding: 6px 10px;
}

.arrowIcon {
  width: 15px;
  height: 15px;
}

.text-white {
  color: #fff;
}

.table {
  margin-bottom: 0;
  color: #6c7293;
}

.table thead th {
  border-top: 0;
  border-bottom-width: 1px;
  font-weight: 500;
  color: #6c7293;
  background-color: #191c24;
}

.table tbody td {
  background-color: #191c24;
  color: #6c7293;
  font-weight: 300;
}

.table thead th {
  vertical-align: middle;
  border-bottom: 2px solid #2c2e33;
}

.table tr {
  border-color: #39404b;
  cursor: pointer;
}

.table tr:hover {
  background-color: #212529;
}

.table th {
  vertical-align: middle;
  line-height: 1;
  white-space: nowrap;
  cursor: auto;
}

.table td {
  vertical-align: middle;
  line-height: 1;
  white-space: nowrap;
}

.symGroup {
  background-color: #191c24;
}

.symIcon {
  width: 8px;
  height: 8px;
}

.modal-wrapper {
  overflow-y: auto;
  padding: 15px;
  border: 1px solid;
  border-color: #39404b;
  background-color: #191c24;
}

.modal-header {
  border: none;
}

.modal-header button {
  color: #fff;
  background-color: transparent;
  border: none;
}

.modal-footer {
  justify-content: center;
  border: none;
}

.quantity-grp {
  border-block: 2px solid #39404b;
  color: #6c7293;
}

.search-box {
  background-color: #0b0d0e;
}

.category {
  background-color: #0b0d0e;
  color: #6c7293;
  border: 0.2px solid #39404b;
  border-radius: 4px;
}

@media screen and (max-width: 4500px) {
  .varaible-font {
    font-size: xx-large !important;
  }

  .modal-body {
    font-size: x-large;
  }

  .footer-font {
    font-size: x-large;
  }
}

@media screen and (max-width: 3000px) {
  .table th {
    font-size: small;
  }

  .table td {
    font-size: small;
  }
}

@media screen and (max-width: 2500px) {
  .varaible-font {
    font-size: x-large !important;
  }

  .modal-body {
    font-size: larger;
  }

  .footer-font {
    font-size: larger;
  }
}

@media screen and (max-width: 2000px) {
  .varaible-font {
    font-size: larger !important;
  }

  .modal-body {
    font-size: large;
  }

  .footer-font {
    font-size: large;
  }
}

@media screen and (max-width: 1500px) {
  .varaible-font {
    font-size: medium !important;
  }

  .modal-body {
    font-size: small;
  }

  .footer-font {
    font-size: small;
  }

  .table th {
    font-size: x-small;
  }

  .table td {
    font-size: x-small;
  }
}

@media screen and (max-width: 1300px) {
  .varaible-font {
    font-size: small !important;
  }

  .modal-body {
    font-size: x-small;
  }

  .footer-font {
    font-size: x-small;
  }

  .table th {
    font-size: x-small;
  }

  .table td {
    font-size: x-small;
  }
}
</style>
