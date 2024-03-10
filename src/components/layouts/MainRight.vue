<template>
  <div class="mainBlock" :style="getMainBlockStyle">
    <div
      class="mainBlock__split mainBlock__split_v mainBlock__split_left"
    ></div>
    <div class="mainBlock__tabs">
      <div class="mainBlock__tabsItem mainBlock__tabsItem_add">+</div>
    </div>
    <div class="mainBlock__content">
      <div class="mainBlock__tabsEmpty p-0" ref="Modal">
        <div class="modal-wrapper" v-if="isModalOpen" :style="modalDimensions">
          <div class="modal-content gap-4">
            <div class="modal-header d-flex">
              <h5 class="modal-title varaible-font d-flex justify-content-start">Trade Pannel</h5>
              <button
                type="button"
                class="btn varaible-font"
                @click="closeModal"
                aria-label="Close"
              >
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
                  <input
                    type="number"
                    step="0.01"
                    @input="handleInput('vol')"
                    @blur="handleBlur('vol')"
                    v-model="volume"
                    class="vol"
                  />
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
                <div
                  class="d-flex justify-content-between align-items-center w-100"
                >
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
              <button
                type="button"
                class="btn p-0 w-100 footer-font"
                :class="`${btnClass}`"
                @click="closeModal"
              >
                {{ btnVal }}
                <br />
                178.8
              </button>
              <!-- Additional buttons or actions -->
            </div>
          </div>
        </div>
        <div class="accordion w-100 h-100" id="accordionExample" v-else>
          <div
            class="accordion-item"
            v-for="(section, index) in symbolRows"
            :key="index"
          >
            <h2 class="accordion-header" :id="'heading' + index">
              <button
                class="accordion-button"
                type="button"
                :data-bs-toggle="'collapse'"
                :data-bs-target="'#collapse' + index"
                :aria-expanded="true"
                :aria-controls="'collapse' + index"
              >
                {{ section.title }}
              </button>
            </h2>
            <div
              :id="'collapse' + index"
              class="accordion-collapse collapse show"
              :class="{ show: index === 0 }"
              :aria-labelledby="'heading' + index"
            >
              <div class="accordion-body overflow-auto">
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
                    <tr
                      v-for="(item, idx) in section.data"
                      :key="idx"
                      @click="toggleRowContent(index, idx, item)"
                    >
                      <td :colspan="4" v-if="selectedRow === `${index}-${idx}`">
                        <div class="buySell d-flex flex-column">
                          <div
                            class="text-white fw-semibold d-flex justify-content-between"
                          >
                            <div
                              class="symGroup d-flex gap-2 align-items-center"
                            >
                              <!-- <img
                              class="symIcon"
                              :src="
                                item.symbolIcon
                                  ? require(`src/assets/${item.symbolIcon}`)
                                  : ''
                              "
                              alt="icon"
                            /> -->
                              {{ item.symbol }}
                            </div>
                            <div class="icon-group">
                              <img src="" alt="i" />
                              <img src="" alt="i" />
                              <img src="" alt="i" />
                              <img src="" alt="i" />
                            </div>
                          </div>
                          <div class="d-flex text-white">
                            <div class="bg-danger d-flex flex-column gap-3 w-100 p-2"
                              @click="sellItem(item)"
                            >
                              <div class="d-flex justify-content-between">
                                Sell
                                <img
                                  src="src/assets/down.png"
                                  class="arrowIcon"
                                  alt="icon"
                                />
                              </div>
                              <span class="buySellSpan">178.95</span>
                            </div>
                            <div
                              class="bg-success d-flex flex-column gap-3 w-100 p-2"
                              @click="buyItem(item)"
                            >
                              <div class="d-flex justify-content-between">
                                <img
                                  src="src/assets/up.png"
                                  class="arrowIcon"
                                  alt="icon"
                                />
                                Buy
                              </div>
                              <span
                                class="buySellSpan d-flex justify-content-end"
                                >179.01</span
                              >
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
                            <button
                              @click="handleDecrement('sellVal')"
                              class="inc-dec-btn rounded-start-1"
                            >
                              -
                            </button>
                            <input
                              class="sell-val"
                              type="text"
                              @input="handleInput('sellVal')"
                              @blur="handleBlur('sellVal')"
                              v-model="sellVal"
                            />
                            <button
                              @click="handleIncrement('sellVal')"
                              class="inc-dec-btn rounded-end-1"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </td>
                      <td
                        v-if="selectedRow != `${index}-${idx}`"
                        class="text-white fw-semibold"
                      >
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
                          {{ item.symbol }}
                        </div>
                      </td>
                      <td
                        v-if="selectedRow != `${index}-${idx}`"
                        class="text-end"
                      >
                        {{ item.last }}
                      </td>
                      <td
                        v-if="selectedRow != `${index}-${idx}`"
                        class="text-end"
                      >
                        {{ item.chg }}
                      </td>
                      <td
                        v-if="selectedRow != `${index}-${idx}`"
                        class="text-end"
                      >
                        {{ item.chgPercent }}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
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
      symbolRows: [],
      runSocket: false,
      selectedRow: null,
      sellVal: 0.01,
      isModalOpen: false,
      volume: 0.01,
      btnClass: "",
      btnVal: "",
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
    toggleRowContent(sectionIndex, itemIndex, item) {
      if (this.selectedRow === `${sectionIndex}-${itemIndex}`) {
        this.$emit("graph-data-change", false);
        this.selectedRow = null;
      } else {
        this.selectedRow = `${sectionIndex}-${itemIndex}`;
        this.$emit("graph-data-change", true);
      }
    },
    handleDataUpdated(data) {
      this.symbolRows = data;
    },
    async loadDataFromJson() {
      try {
        this.symbolRows = Object.entries(symblRow).map(([title, data]) => ({
          title,
          data,
        }));
      } catch (error) {
        console.error("Error loading data from JSON file:", error);
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
    layout(){
      return this.$store.state.layoutType;
    },
    getMainBlockStyle() {
      let layoutType = this.layout;
      if (layoutType === 2) {
        return {
          width: '25%',
          height: '50%',
          top: '50%',
          left: '75%',
        };
      }else if (layoutType === 3){
        return {
          width: '54.3968%',
          height: '50%',
          top: '50%',
          left: '45.6032%',
        };} 
      else {
        return {
          width: '25%',
          height: '100%',
          top: '0%',
          left: '75%',
        };
      }
    },
    modalDimensions(){
      const Modal = this.$refs.Modal;
      const dimensions = Modal.getBoundingClientRect();
      return {
        width: `${dimensions.width}px`,
        maxHeight: `${dimensions.height}px`,
      };
    }
  },
};
</script>

<style scoped>
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

.accordion-button {
  background-color: #191c24;
  color: #6c7293;
}

.accordion-button:focus {
  z-index: 3;
  outline: 0;
  box-shadow: none;
}

.accordion-button:not(.collapsed) {
  background-color: #191c24;
  color: #fff;
}

.accordion-body {
  background-color: #191c24;
  color: #6c7293;
}

.accordion-item {
  border-color: #39404b;
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

@media screen and (max-width: 4500px) {
  .accordion-body {
    max-height: 250px; 
  }
  .varaible-font{
    font-size: xx-large !important;
  }
  .modal-body {
    font-size: x-large;
  }
  .footer-font{
    font-size: x-large;
  }
}
@media screen and (max-width: 3000px) {
  .accordion-button {
    height: 60px;
    font-size: small;
  }

  .table th {
    font-size: small;
  }

  .table td {
    font-size: small;
  }
}

@media screen and (max-width: 2500px) {
  .accordion-body {
    max-height: 150px; 
  }
  .varaible-font{
    font-size: x-large !important;
  }
  .modal-body {
    font-size: larger;
  }
  .footer-font{
    font-size: larger;
  }
}
@media screen and (max-width: 2000px) {
  .accordion-body {
    max-height: 140px; 
  }
  .varaible-font{
    font-size: larger !important;
  }
  .modal-body {
    font-size: large;
  }
  .footer-font{
    font-size: large;
  }
}

@media screen and (max-width: 1500px) {
  .varaible-font{
    font-size: medium !important;
  }
  .modal-body {
    font-size: small;
  }
  .footer-font{
    font-size:small;
  }
  .accordion-body {
    max-height: 130px; 
  }
  .accordion-button {
    height: 40px;
    font-size: x-small;
  }

  .table th {
    font-size: x-small;
  }

  .table td {
    font-size: x-small;
  }
}

@media screen and (max-width: 1300px) {
  .varaible-font{
    font-size: small !important;
  }
  .modal-body {
    font-size: x-small;
  }
  .footer-font{
    font-size: x-small;
  }
  .accordion-body {
    max-height: 100px; 
  }
  .accordion-button {
    height: 40px;
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
