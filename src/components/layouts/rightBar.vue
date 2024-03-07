<template>
  <div class="wrapper">
    <div
      class="modal-wrapper"
      v-if="isModalOpen"
      :style="{ height: accordionHeight, width: accordionWidth }"
    >
      <div
        class="modal-content gap-4"
        :style="{ height: accordionHeight, width: modalWidth }"
      >
        <div class="modal-header d-flex justify-content-between">
          <span class="modal-title" :style="{ fontSize: modalTitleFont }"
            >Trade Pannel</span
          >
          <button
            type="button"
            class="btn"
            @click="closeModal"
            aria-label="Close"
            :style="{ fontSize: modalTitleFont }"
          >
            X
          </button>
        </div>
        <div
          class="modal-body d-flex flex-column"
          :style="{
            fontSize: modalBodyFont,
            height: modalHeight,
            gap: innerGap,
          }"
        >
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
            class="btn p-0"
            :class="`${btnClass}`"
            @click="closeModal"
            :style="{ width: modalWidth }"
          >
            {{ btnVal }}
            <br />
            178.8
          </button>
        </div>
      </div>
    </div>
    <div
      class="accordion"
      id="accordionExample"
      v-else
      :style="{ width: accordionWidth, height: accordionHeight }"
    >
      <div
        class="accordion-item"
        v-for="(section, index) in symbolRows"
        :key="index"
      >
        <h2 class="accordion-header" :id="'heading' + index">
          <button
            class="accordion-button rounded-0"
            type="button"
            :data-bs-toggle="'collapse'"
            :data-bs-target="'#collapse' + index"
            :aria-expanded="true"
            :aria-controls="'collapse' + index"
            :style="{
              fontSize: accordianButtonFont,
              height: accordionButtonHeight,
            }"
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
          <div
            class="accordion-body p-2 overflow-auto"
            :style="{ width: accordianItemWidth, height: accordianItemHeight }"
          >
            <table class="table table-hover">
              <thead class="sticky-top">
                <tr :style="{ fontSize: accordianThFont }">
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
                  :style="{
                    fontSize: accordianTableFont,
                    height: tableRowHeight,
                  }"
                >
                  <td
                    :colspan="4"
                    v-if="selectedRow === `${index}-${idx}`"
                    :style="{ height: buySellHeight }"
                  >
                    <div class="buySell">
                      <div
                        class="text-white fw-semibold d-flex justify-content-between"
                      >
                        <div class="symGroup">
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
                        <div
                          class="bg-danger d-flex flex-column gap-2 w-100 px-2 pt-1"
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
                          class="bg-success d-flex flex-column gap-2 w-100 px-2 pt-1"
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
                          <span class="buySellSpan d-flex justify-content-end"
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
                    <div class="symGroup">
                      {{ item.symbol }}
                    </div>
                  </td>
                  <td v-if="selectedRow != `${index}-${idx}`" class="text-end">
                    {{ item.last }}
                  </td>
                  <td v-if="selectedRow != `${index}-${idx}`" class="text-end">
                    {{ item.chg }}
                  </td>
                  <td v-if="selectedRow != `${index}-${idx}`" class="text-end">
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
</template>

<script>
import symblRow from "../../assets/symbolRow.json";
import socketMixin from "../../mixins/socketMixin";
export default {
  mixins: [socketMixin],
  props: ["cWidth", "cHeight"],
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
      this.btnClass = "btn-danger";
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
    containerWidth() {
      const contWidth = document.body.clientWidth;
      let calculatedWidth = (contWidth * 11) / 12;
      calculatedWidth = (calculatedWidth * this.cWidth) / 12;
      return (calculatedWidth * 97) / 100;
    },
    containerHeight() {
      const contHeight = document.body.clientHeight;
      let calculatedHeight = (contHeight * this.cHeight) / 12;
      return (calculatedHeight * 90) / 100;
    },
    accordionWidth() {
      const contWidth = this.containerWidth;
      debugger;
      if (contWidth > 800 ) return ((contWidth * 110.5) / 100).toString() + "px";
      if (contWidth > 600 ) return ((contWidth * 109) / 100).toString() + "px";
    },
    accordionHeight() {
      const contHeight = this.containerHeight;
      return ((contHeight * 53) / 100).toString() + "px";
    },
    accordianItemWidth() {
      let accWidth = this.containerWidth;
      if (accWidth > 800 ) return ((accWidth * 110.2) / 100).toString() + "px";
      if (accWidth > 600 ) return ((accWidth * 109) / 100).toString() + "px";
    },
    accordianItemHeight() {
      let accHeight = this.containerHeight;
      const contWidth = this.containerWidth;
      if (contWidth > 800 ) return ((accHeight * 30.2) / 100).toString() + "px";
      if (contWidth > 600 ) return ((accHeight * 29.2) / 100).toString() + "px";
      if (contWidth > 400 ) return ((accHeight * 27.9) / 100).toString() + "px";
      if (contWidth > 300 ) return ((accHeight * 26.2) / 100).toString() + "px";
      if (contWidth > 200 ) return ((accHeight * 22.2) / 100).toString() + "px";
    },
    tableRowHeight() {
      let accHeight = this.containerHeight;
      return ((accHeight * 8) / 100).toString() + "px";
    },
    accordionButtonHeight() {
      const contHeight = this.containerHeight;
      return ((contHeight * 12) / 100).toString() + "px";
    },
    buySellHeight() {
      const contHeight = this.containerHeight;
      return ((contHeight * 3) / 100).toString() + "px";
    },
    accordianButtonFont() {
      const contWidth = this.containerWidth;
      let fontWidth = Math.ceil(contWidth + (contWidth * 15) / 100);
      fontWidth = ((fontWidth / window.screen.width) * 100).toString() + "%";
      return fontWidth;
    },
    accordianThFont() {
      const contWidth = this.containerWidth;
      let fontWidth = Math.ceil(contWidth + (contWidth * 79) / 100);
      fontWidth = ((fontWidth / window.screen.width) * 100).toString() + "%";
      return fontWidth;
    },
    accordianTableFont() {
      const contWidth = this.containerWidth;
      let fontWidth = Math.ceil(contWidth + (contWidth * 39) / 100);
      fontWidth = ((fontWidth / window.screen.width) * 100).toString() + "%";
      return fontWidth;
    },
    modalWidth() {
      const contWidth = this.containerWidth;
      return ((contWidth * 100) / 100).toString() + "px";
    },
    modalHeight() {
      const contHeight = this.containerHeight;
      return ((contHeight * 78) / 100).toString() + "px";
    },
    modalTitleFont() {
      const contWidth = this.containerWidth;
      let fontWidth = Math.ceil(contWidth + (contWidth * 320) / 100);
      fontWidth = ((fontWidth / window.screen.width) * 100).toString() + "%";
      return fontWidth;
    },
    modalBodyFont() {
      const contWidth = this.containerWidth;
      let fontWidth = Math.ceil(contWidth + (contWidth * 180) / 100);
      fontWidth = ((fontWidth / window.screen.width) * 100).toString() + "%";
      return fontWidth;
    },
    innerGap() {
      const maxGapRem = 1.25;
      const gapRatio = 0.05;
      let gapSize = this.containerHeight * gapRatio;
      gapSize = Math.min(
        gapSize,
        maxGapRem *
          parseFloat(getComputedStyle(document.documentElement).fontSize)
      );
      return gapSize + "px";
    },
  },
};
</script>

<style scoped>
.wrapper {
  font-size: medium;
}
.buySell {
  background-color: #191c24;
  font-size: smaller;
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
  top: -32px;
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
  padding: 3px 5px;
}

.arrowIcon {
  width: 9px;
  height: 10px;
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
  background-color: #131722;
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
  padding: 15px;
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

</style>
