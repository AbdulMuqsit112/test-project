<template>
  <div class="mainBlock" :style="getMainBlockStyle">
    <div class="mainBlock__split mainBlock__split_v mainBlock__split_left"></div>
    <div class="mainBlock__tabs">
      <div class="mainBlock__tabsItem mainBlock__tabsItem_add">+</div>
    </div>
    <div class="mainBlock__content">
      <div class="mainBlock__tabsEmpty p-0" ref="Modal">
        <ModalComponent v-if="isModalOpen" :currentAsset="currentAsset" :btnVal="btnVal" :bid="bid" :ask="ask" :volume="volume"
          :btnClass="btnClass" :modalDimensions="modalDimensions" @closeModal="closeModal" @handleInput="handleInput" @handleBlur="handleBlur"/>
        <div class="d-flex gap-2 w-100 p-2" :class="{ 'dark-header': isDarkMode, 'light-header': !isDarkMode }"
          v-if="!isModalOpen">
          <select class="category p-1" :class="{ 'dark-header': isDarkMode, 'light-header': !isDarkMode }"
            v-model="selectedCategory">
            <option value="all">All</option>
            <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
          </select>
          <div class="fav-grp d-flex align-items-center gap-1 p-1"
            :class="{ 'dark-header': isDarkMode, 'light-header': !isDarkMode }" @click="toggleShoFav()">
            <input type="checkbox" v-model="showFav">
            <label for="checkbox">favourites</label>
          </div>
          <input type="text" class="w-100" :class="{ 'dark-header': isDarkMode, 'light-header': !isDarkMode }"
            v-model="searchQuery" placeholder="Search...">
        </div>
        <div class="w-100 h-100 overflow-auto" v-if="!isModalOpen">
          <table class="table table-hover">
            <thead class="sticky-top">
              <tr>
                <th class="fw-semibold" :class="{ 'dark-symbol-table text-white': isDarkMode }">Symbol</th>
                <th class="text-end" :class="{ 'dark-symbol-table': isDarkMode }">Last</th>
                <th class="text-end" :class="{ 'dark-symbol-table': isDarkMode }">Change</th>
                <th class="text-end" :class="{ 'dark-symbol-table': isDarkMode }">Change %</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(asset, index) in filteredAssets" :key="asset.id" @click.stop="toggleRowContent(asset)">
                <td :colspan="4" v-if="isSelected(asset)" :class="{ 'dark-symbol-table': isDarkMode }">
                  <div class="buySell d-flex flex-column" :class="{ 'dark-symbol-table': isDarkMode }">
                    <div class="fw-semibold d-flex justify-content-between" :class="{ 'text-white': isDarkMode }">
                      <div class="d-flex gap-2 align-items-center">
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
                        <svg class="info-icon" @click.stop="toggleInfoSection()" xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 125" fill="none" x="0px" y="0px">
                          <path
                            d="M50 41.6667C52.3012 41.6667 54.1666 43.5321 54.1666 45.8333V66.6667C54.1666 68.9678 52.3012 70.8333 50 70.8333C47.6988 70.8333 45.8333 68.9678 45.8333 66.6667V45.8333C45.8333 43.5321 47.6988 41.6667 50 41.6667Z"
                            fill="inherit" />
                          <path
                            d="M50 29.1667C52.3012 29.1667 54.1666 31.0321 54.1666 33.3333C54.1666 35.6345 52.3012 37.5 50 37.5C47.6988 37.5 45.8333 35.6345 45.8333 33.3333C45.8333 31.0321 47.6988 29.1667 50 29.1667Z"
                            fill="inherit" />
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M8.33331 50C8.33331 26.9881 26.9881 8.33333 50 8.33333C73.0118 8.33333 91.6666 26.9881 91.6666 50C91.6666 73.0119 73.0118 91.6667 50 91.6667C26.9881 91.6667 8.33331 73.0119 8.33331 50ZM50 16.6667C31.5905 16.6667 16.6666 31.5905 16.6666 50C16.6666 68.4095 31.5905 83.3333 50 83.3333C68.4095 83.3333 83.3333 68.4095 83.3333 50C83.3333 31.5905 68.4095 16.6667 50 16.6667Z"
                            fill="inherit" />
                        </svg>
                        <svg class="grp-icon" width="36" height="48" viewBox="0 0 36 48" fill="none"
                          xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" clip-rule="evenodd"
                            d="M6 21.748C2.54955 20.8599 0 17.7277 0 14C0 10.2723 2.54955 7.14012 6 6.25203L6 2.00139C6 0.896052 6.88773 0 8 0C9.10457 0 10 0.894938 10 2.00139L10 6.25203C13.4505 7.14012 16 10.2723 16 14C16 17.7277 13.4505 20.8599 10 21.748L10 45.9986C10 47.1039 9.11227 48 8 48C6.89543 48 6 47.1051 6 45.9986L6 21.748ZM26 41.748C22.5495 40.8599 20 37.7277 20 34C20 30.2723 22.5495 27.1401 26 26.252L26 2.00139C26 0.896052 26.8877 0 28 0C29.1046 0 30 0.894938 30 2.00139L30 26.252C33.4505 27.1401 36 30.2723 36 34C36 37.7277 33.4505 40.8599 30 41.748V45.9986C30 47.1039 29.1123 48 28 48C26.8954 48 26 47.1051 26 45.9986V41.748ZM32 34C32 31.7909 30.2091 30 28 30C25.7909 30 24 31.7909 24 34C24 36.2091 25.7909 38 28 38C30.2091 38 32 36.2091 32 34ZM12 14C12 11.7909 10.2091 10 8 10C5.79086 10 4 11.7909 4 14C4 16.2091 5.79086 18 8 18C10.2091 18 12 16.2091 12 14Z"
                            fill="inherit" />
                        </svg>
                        <svg :class="{ 'star-2': isDarkMode, 'light-star-2': !isDarkMode }" @click.stop="addFav(asset)"
                          v-if="isFavorite(asset)" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                          <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                          <g id="SVGRepo_iconCarrier">
                            <path
                              d="M11.2691 4.41115C11.5006 3.89177 11.6164 3.63208 11.7776 3.55211C11.9176 3.48263 12.082 3.48263 12.222 3.55211C12.3832 3.63208 12.499 3.89177 12.7305 4.41115L14.5745 8.54808C14.643 8.70162 14.6772 8.77839 14.7302 8.83718C14.777 8.8892 14.8343 8.93081 14.8982 8.95929C14.9705 8.99149 15.0541 9.00031 15.2213 9.01795L19.7256 9.49336C20.2911 9.55304 20.5738 9.58288 20.6997 9.71147C20.809 9.82316 20.8598 9.97956 20.837 10.1342C20.8108 10.3122 20.5996 10.5025 20.1772 10.8832L16.8125 13.9154C16.6877 14.0279 16.6252 14.0842 16.5857 14.1527C16.5507 14.2134 16.5288 14.2807 16.5215 14.3503C16.5132 14.429 16.5306 14.5112 16.5655 14.6757L17.5053 19.1064C17.6233 19.6627 17.6823 19.9408 17.5989 20.1002C17.5264 20.2388 17.3934 20.3354 17.2393 20.3615C17.0619 20.3915 16.8156 20.2495 16.323 19.9654L12.3995 17.7024C12.2539 17.6184 12.1811 17.5765 12.1037 17.56C12.0352 17.5455 11.9644 17.5455 11.8959 17.56C11.8185 17.5765 11.7457 17.6184 11.6001 17.7024L7.67662 19.9654C7.18404 20.2495 6.93775 20.3915 6.76034 20.3615C6.60623 20.3354 6.47319 20.2388 6.40075 20.1002C6.31736 19.9408 6.37635 19.6627 6.49434 19.1064L7.4341 14.6757C7.46898 14.5112 7.48642 14.429 7.47814 14.3503C7.47081 14.2807 7.44894 14.2134 7.41394 14.1527C7.37439 14.0842 7.31195 14.0279 7.18708 13.9154L3.82246 10.8832C3.40005 10.5025 3.18884 10.3122 3.16258 10.1342C3.13978 9.97956 3.19059 9.82316 3.29993 9.71147C3.42581 9.58288 3.70856 9.55304 4.27406 9.49336L8.77835 9.01795C8.94553 9.00031 9.02911 8.99149 9.10139 8.95929C9.16534 8.93081 9.2226 8.8892 9.26946 8.83718C9.32241 8.77839 9.35663 8.70162 9.42508 8.54808L11.2691 4.41115Z"
                              stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
                          </g>
                        </svg>
                        <svg class="star" @click.stop="addFav(asset)" v-if="!isFavorite(asset)"
                          xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1"
                          x="0px" y="0px" viewBox="0 0 100 125" style="enable-background:new 0 0 100 100;"
                          xml:space="preserve">
                          <title>61 all</title>
                          <path
                            d="M81.8,42.6c-0.4-1.1-1.3-1.8-2.4-2l-18.4-2.8l-8.2-16.7c-0.5-1-1.6-1.7-2.7-1.7l0,0c-1.1,0-2.2,0.6-2.7,1.7l-8.2,16.7  l-18.4,2.7c-1.6,0.2-2.8,1.8-2.5,3.4c0.1,0.7,0.4,1.3,0.9,1.7l13.3,13L29.1,77c-0.3,1.6,0.8,3.2,2.4,3.5c0.7,0.1,1.3,0,1.9-0.3  L50,71.5l16.5,8.7c1.5,0.8,3.3,0.2,4-1.3c0.3-0.6,0.4-1.2,0.3-1.9l-3.1-18.3l13.3-13C81.8,44.9,82.1,43.7,81.8,42.6z M62.4,55.5  c-0.7,0.7-1,1.7-0.9,2.7L63.9,72l-12.5-6.6c-0.9-0.5-1.9-0.5-2.8,0L36.1,72l2.4-13.9c0.2-1-0.2-2-0.9-2.7l-10.1-9.9l14-2  c1-0.1,1.8-0.8,2.3-1.6L50,29.3l6.2,12.7c0.4,0.9,1.3,1.5,2.2,1.6l14,2L62.4,55.5z" />
                        </svg>
                        <svg class="add-icon" xmlns="http://www.w3.org/2000/svg"
                          xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 125"
                          style="enable-background:new 0 0 100 100;" xml:space="preserve">
                          <g>
                            <path :fill="isDarkMode ? 'white' : 'black'" :stroke="isDarkMode ? 'white' : 'black'"
                              stroke-width="4"
                              d="M83,5H17C10.4,5,5,10.4,5,17v66c0,6.6,5.4,12,12,12h66c6.6,0,12-5.4,12-12V17C95,10.4,89.6,5,83,5z M91,83c0,4.4-3.6,8-8,8   H17c-4.4,0-8-3.6-8-8V17c0-4.4,3.6-8,8-8h66c4.4,0,8,3.6,8,8V83z" />
                            <polygon :fill="isDarkMode ? 'white' : 'black'" :stroke="isDarkMode ? 'white' : 'black'"
                              stroke-width="4"
                              points="52,24 48,24 48,48 24,48 24,52 48,52 48,76 52,76 52,52 76,52 76,48 52,48" />
                          </g>
                        </svg>
                      </div>
                    </div>
                    <div class="d-flex text-white">
                      <div class="bg-danger d-flex flex-column gap-3 w-100 p-2" @click="generateOrder(asset, 'sell')">
                        <div class="d-flex justify-content-between">
                          Sell
                          <img src="src/assets/down.png" class="arrowIcon" alt="icon" />
                        </div>
                        <span class="buySellSpan d-flex justify-content-start">{{ assetVal(asset.p, 'low') }}</span>
                      </div>
                      <div class="bg-success d-flex flex-column gap-3 w-100 p-2" @click="generateOrder(asset, 'buy')">
                        <div class="d-flex justify-content-between">
                          <img src="src/assets/up.png" class="arrowIcon" alt="icon" />
                          Buy
                        </div>
                        <span class="buySellSpan d-flex justify-content-end">{{ assetVal(asset.p, 'high') }}</span>
                      </div>
                    </div>
                    <div class="d-flex justify-content-between">
                      <button class="text-danger buySellBtn">
                        Low {{ assetVal(asset.p, 'low') }}
                      </button>
                      <button class="text-success buySellBtn">
                        High {{ assetVal(asset.p, 'high') }}
                      </button>
                    </div>
                    <div class="inpbox" @click.stop>
                      <button @click.stop="handleSum('Decrement')" class="inc-dec-btn rounded-start-1"
                        :class="{ 'inc-dec-dark': isDarkMode }">
                        -
                      </button>
                      <input class="sell-val" :class="{ 'sel-val-dark': isDarkMode }" type="text"
                        @input="handleInput($event, 'sellVal')" @blur="handleBlur('sellVal')" v-model="sellVal" />
                      <button @click.stop="handleSum('Increment')" class="inc-dec-btn rounded-end-1"
                        :class="{ 'inc-dec-dark': isDarkMode }">
                        +
                      </button>
                    </div>
                    <div v-if="isInfoSection"
                      class="d-flex flex-column w-100 align-items-start info-block gap-2 px-2 py-4">
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
                <td v-if="!isSelected(asset)" class="fw-semibold"
                  :class="{ 'dark-symbol-table text-white': isDarkMode }">
                  <div class="d-flex gap-2 align-items-center">
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
                <td v-if="!isSelected(asset)" class="text-end" :class="{ 'dark-symbol-table': isDarkMode }">
                  {{ asset.p }}
                </td>
                <td v-if="!isSelected(asset)" class="text-end" :class="{ 'dark-symbol-table': isDarkMode }">
                  {{ asset.v }}
                </td>
                <td v-if="!isSelected(asset)" class="text-end" :class="{ 'dark-symbol-table': isDarkMode }">
                  {{ asset.changePercentage }}
                </td>
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
import socketMixin from "../../../mixins/socketMixin";
import ModalComponent from "../ModalComponent.vue";
export default {
  mixins: [socketMixin],
  components: {
    ModalComponent
  },
  data() {
    return {
      sellVal: 0.01,
      isModalOpen: false,
      volume: 0.01,
      btnClass: "",
      btnVal: "",
      favArr: [],
      selectedCategory: "all",
      searchQuery: "",
      isInfoSection: false,
      showFav: false,
      currentAsset: null,
    };
  },
  mounted() {
    this.$store.dispatch('fetchAssetCategory');
    this.fetchTableData();
    this.$on("symbolDataUpdated", this.handleDataUpdated);
  },
  methods: {
    fetchTableData() {
      const limits = {
        limit: 1,
        offset: 1
      }
      this.$store.dispatch('fetchSymbolsData', { limits });
    },
    toggleShoFav() {
      this.showFav = !this.showFav
    },
    addFav(asset) {
      const index = this.favArr.findIndex(item => item.s === asset.s);
      if (index !== -1) {
        this.favArr.splice(index, 1);
      } else {
        this.favArr.push(asset);
      }
    },
    isSelected(asset) {
      return this.selectedData.some(selectedAsset => selectedAsset.id === asset.id)
      
    },
    toggleInfoSection() {
      this.isInfoSection = !this.isInfoSection;
    },
    toggleRowContent(asset) {
      this.$store.commit('setSelctedData', asset);
      this.isInfoSection = false;
    },
    handleDataUpdated(data) {
      const processedData = JSON.parse(data).data;
      if (processedData && processedData.length > 0) this.$store.dispatch('updateSymbolsData', { receivedData: processedData });
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
      if (val === "vol") {
        let volume = parseFloat(this.volume);
        if (isNaN(volume) || volume <= 0) {
          this.volume = "0.01";
        } else {
          this.volume = volume.toString();
        }
      } else {
        let sellVal = parseFloat(this.sellVal);
        if (isNaN(sellVal) || sellVal <= 0) {
          this.sellVal = "0.01";
        } else {
          this.sellVal = sellVal.toString();
        }
      }
    },
    handleSum(type) {
      if (type == 'Increment') {
        this.sellVal = (parseFloat(this.sellVal) + 0.01).toFixed(2);
        return;
      }
      if (parseFloat(this.sellVal) > 0.01) {
        this.sellVal = (parseFloat(this.sellVal) - 0.01).toFixed(2);
      }
    },
    generateOrder(asset, type) {
      this.currentAsset = asset;
      if (type == 'buy') {
        this.btnClass = "btn-success";
        this.btnVal = "Buy";
      } else {
        this.btnClass = "btn-danger bg-danger";
        this.btnVal = "Sell";
      }
      this.bid = this.assetVal(asset.p, 'high')
      this.ask = this.assetVal(asset.p, 'low')
      this.isModalOpen = true;
    },
    assetVal(price, type) {
      if (type == 'high') return price + 0.01
      return price - 0.01
    },
    closeModal() {
      this.isModalOpen = false;
      this.volume = 0.01;
      this.$store.commit('setSelctedData', this.currentAsset);
      this.currentAsset = null;
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
          width: '20%',
          height: '100%',
          top: '0%',
          left: '80%',
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
      if (this.showFav) {
        return this.favArr.filter(asset => {
          return (this.selectedCategory === 'all' || asset.category === this.selectedCategory) && asset.s.toLowerCase().includes(lowerCaseQuery);
        });
      } else {
        if (this.selectedCategory === 'all') {
          return this.symbolsData.filter(asset => {
            return asset.s.toLowerCase().includes(lowerCaseQuery);
          });
        } else {
          return this.symbolsData.filter(asset => {
            return asset.symbolId === this.selectedCategory && asset.s.toLowerCase().includes(lowerCaseQuery);
          });
        }
      }
    },
    isFavorite() {
      return (asset) => {
        const index = this.favArr.findIndex((item) => item.s === asset.s);
        return index !== -1;
      };
    },
    selectedData() {
      return this.$store.getters.getSelectedData;
    },
    isDarkMode() {
      return this.$store.getters.getIsDarkMode;
    },
    symbolsData() {
      return this.$store.getters.getSymbolsData;
    },
    categories() {
      return this.$store.getters.getAssetCategories;
    }
  },
};
</script>

<style scoped>
@import url(./mainRight.css);
</style>
