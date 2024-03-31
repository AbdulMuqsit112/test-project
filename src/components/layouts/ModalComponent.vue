<template>
  <div class="modal-wrapper w-25 p-4" :class="{ 'dark-theme': isDarkMode, 'bg-white': !isDarkMode }">
    <div class="modal-content gap-4" :class="{ 'dark-mode-text': isDarkMode, 'light-mode-text': !isDarkMode }">
      <div class="modal-header d-flex justify-content-between">
        <h5 class="varaible-font">Trade Pannel</h5>
        <button type="button" class="btn varaible-font" @click="closeModal()" aria-label="Close">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div class="modal-body d-flex flex-column gap-5">
        <div class="d-flex flex-column gap-2">
          <div class="d-flex justify-content-between">
            <span>Bid: {{ bid }}</span>
            <span>Ask: {{ ask }}</span>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <span>Volume:</span>
            <input type="number" step="0.01" @input="handleInput($event, 'vol')" @blur="handleBlur" v-model="vol"
              class="vol" :class="{ 'dark-vol': isDarkMode }" :disabled="isValuesDisabled" />
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <span>Stop Loss:</span>
            <input type="checkbox" v-model="stopLoss" />
          </div>
          <div v-if="stopLoss" class="d-flex flex-column gap-2">
            <div class="d-flex justify-content-between align-items-center">
              <select v-model="stopLossType" class="vol custom-styles" :class="{ 'dark-vol': isDarkMode }">
                <option value="price" selected>Price</option>
                <option value="points">Points</option>
                <option value="loss">Loss</option>
              </select>
              <input v-if="stopLossType === 'price'" type="number" step="0.01" @input="handleInput($event, 'stPrice')"
                @blur="handleBlur" v-model="stPrice" class="vol" :class="{ 'dark-vol': isDarkMode }" />
              <input v-else-if="stopLossType === 'loss'" type="number" step="0.01"
                @input="handleInput($event, 'stLoss')" @blur="handleBlur" v-model="stLoss" class="vol"
                :class="{ 'dark-vol': isDarkMode }" />
              <input v-else-if="stopLossType === 'points'" type="number" step="1"
                @input="handleInput($event, 'stPoints')" @blur="handleBlur" v-model="stPoints" class="vol"
                :class="{ 'dark-vol': isDarkMode }" />
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <template v-if="stopLossType === 'price'">
                <span>Loss: {{ stLoss }}</span>
                <span>Points: {{ stPoints }}</span>
              </template>
              <template v-else-if="stopLossType === 'points'">
                <span>Price: {{ stPrice }}</span>
                <span>Loss: {{ stLoss }}</span>
              </template>
              <template v-else-if="stopLossType === 'loss'">
                <span>Price: {{ stPrice }}</span>
                <span>Points: {{ stLoss }}</span>
              </template>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <span>Take Profit:</span>
            <input type="checkbox" v-model="takeProfit" />
          </div>
          <div v-if="takeProfit" class="d-flex flex-column gap-2">
            <div class="d-flex justify-content-between align-items-center">
              <select v-model="takeProfitType" class="vol custom-styles" :class="{ 'dark-vol': isDarkMode }">
                <option value="price" selected>Price</option>
                <option value="points">Points</option>
                <option value="profit">Profit</option>
              </select>
              <input v-if="takeProfitType === 'price'" type="number" step="0.01" @input="handleInput($event, 'tpPrice')"
                @blur="handleBlur" v-model="tpPrice" class="vol" :class="{ 'dark-vol': isDarkMode }" />
              <input v-else-if="takeProfitType === 'profit'" type="number" step="0.01"
                @input="handleInput($event, 'tpProfit')" @blur="handleBlur" v-model="tpProfit" class="vol"
                :class="{ 'dark-vol': isDarkMode }" />
              <input v-else-if="takeProfitType === 'points'" type="number" step="1"
                @input="handleInput($event, 'tpPoints')" @blur="handleBlur" v-model="tpPoints" class="vol"
                :class="{ 'dark-vol': isDarkMode }" />
            </div>
            <div class="d-flex justify-content-between align-items-center">
              <template v-if="takeProfitType === 'price'">
                <span>Profit: {{ tpProfit }}</span>
                <span>Points: {{ tpPoints }}</span>
              </template>
              <template v-else-if="takeProfitType === 'points'">
                <span>Price: {{ tpPrice }}</span>
                <span>Profit: {{ tpProfit }}</span>
              </template>
              <template v-else-if="takeProfitType === 'profit'">
                <span>Price: {{ tpPrice }}</span>
                <span>Points: {{ tpProfit }}</span>
              </template>
            </div>
          </div>
        </div>
        <div class="d-flex flex-column quantity-grp py-4 gap-1">
          <div class="d-flex justify-content-between align-items-center">
            <span>Quantity:</span>
            <span>{{ vol }} Units</span>
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
        <button type="button" class="btn p-0 w-100 footer-font" :class="`${btnClass}`" @click="createOrder">
          {{ btnVal }}
          <br />
          {{ bid }}
        </button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: [
    "currentAsset",
    "btnVal",
    "btnClass",
    "bid",
    "ask",
    "volume",
    "isValuesDisabled",
    "sLoss",
    "tProfit",
  ],
  data() {
    return {
      takeProfit: this.tProfit,
      stopLoss: this.sLoss,
      vol: this.volume,
      stopLossType: "price",
      stPrice: this.bid,
      stLoss: 0.01,
      stPoints: 1,
      takeProfitType: "price",
      tpPrice: this.ask,
      tpProfit: 0.01,
      tpPoints: 1,
    };
  },
  methods: {
    async createOrder() {
      if (this.btnVal == "Modify Buy" || this.btnVal == "Modify Sell") {
        this.closeModal();
        return;
      }
      const asset = this.generateOrderPayload();
      this.$store.dispatch("createOrder", { asset });
      this.closeModal();
    },
    generateOrderPayload() {
      const { change, changePercentage, p, symbolId } = this.currentAsset;
      const percentageNumber = parseFloat(changePercentage.replace("%", ""));
      const orderType = this.btnVal == "Buy" ? 1 : 2;
      const matchingObject = this.categories.find((obj) => obj.id === symbolId);
      let name = "";
      if (matchingObject) name = matchingObject.name;
      return {
        price: p,
        chg: change,
        chgPercentage: percentageNumber,
        type: orderType,
        volume: this.vol,
        volumePrice: 0,
        mktCap: 0,
        pe: 0,
        epsTim: 0,
        employees: 0,
        sector: "someSector",
        position: 0,
        slPrice: this.stPrice,
        tpPrice: this.tpPrice,
        openPrice: 0,
        marketPrice: 0,
        commission: 0,
        swaps: 0,
        grossProfit: 0,
        bid: this.bid,
        ask: this.ask,
        stopLoss: this.stopLoss,
        takeProfit: this.takeProfit,
        spread: 0,
        spread_Pips: 0,
        pipValue: 0,
        symbolId: symbolId,
        symbolName: name,
      };
    },
    closeModal() {
      this.$emit("closeModal");
    },
    handleInput(e, type) {
      if (type == "vol") {
        this.$emit("handleInput", e, type);
      }
      if (type == 'stPrice') {
        this.stLoss = this.setStopLoss('loss');
        this.stPoints = this.setStopLoss('points');
      } else if (type == 'stLoss') {
        this.stPoints = this.setStopLoss('points');
        this.stPrice = this.setStopLoss('price');
      } else if (type == 'stPoints') {
        this.stLoss = this.setStopLoss('loss');
        this.stPrice = this.setStopLoss('price');
      } else if (type == 'tpPrice') {
        this.tpProfit = this.setTakeProfit('profit');
        this.tpPoints = this.setTakeProfit('points');
      } else if (type == 'tpProfit') {
        this.tpPoints = this.setTakeProfit('points');
        this.tpPrice = this.setTakeProfit('price');
      } else if (type == 'tpPoints') {
        this.tpProfit = this.setTakeProfit('profit');
        this.tpPrice = this.setTakeProfit('price');
      }
    },
    handleBlur(e) {
      this.$emit("handleBlur", e);
    },
    setTakeProfit(type) {
      if (type == "profit") {
        return (parseFloat(this.ask) + parseFloat(this.tpPrice)).toFixed(2);
      } else if (type == "price") {
        return (parseFloat(this.bid) + parseFloat((this.tpPoints - this.tpPoints * 0.30) / 10)).toFixed(2);
      } else {
        return (parseFloat(this.tpPrice) * 10).toFixed(2);
      }
    },
    setStopLoss(type) {
      if (type == "loss") {
        return (parseFloat(this.ask) - parseFloat(this.stPrice)).toFixed(2);
      } else if (type == "price") {
        return (parseFloat(this.bid) - parseFloat((this.stPoints - this.stPoints * 0.30) / 10)).toFixed(2);
      } else {
        return (parseFloat(this.stPrice) * 10).toFixed(2);
      }
    },
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.getIsDarkMode;
    },
    categories() {
      return this.$store.getters.getAssetCategories;
    },
  },
  watch: {
    vol(newVal) {
      if (newVal <= 0) this.vol = 0.01;
    },
  },
};
</script>
<style>
.modal-wrapper {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid;
  border-color: #39404b;
  z-index: 4000;
}

.modal-header {
  border: none;
}

.modal-header button {
  color: inherit;
  border: none;
}

.modal-footer {
  justify-content: center;
  border: none;
}

.custom-styles {
  height: 27px;
  width: 42%;
}
</style>
