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
            <input type="number" step="0.01" @input="handleInput($event, 'vol')" @blur="handleBlur('vol')"
              v-model="vol" class="vol" :class="{ 'dark-vol': isDarkMode }" />
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <span>Stop Loss:</span>
            <input type="checkbox" v-model="stopLoss" />
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <span>Take Profit:</span>
            <input type="checkbox" v-model="takeProfit" />
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
  props: ['currentAsset', 'btnVal', 'btnClass', 'bid', 'ask', 'volume'],
  data() {
    return {
      takeProfit: false,
      stopLoss: false,
      vol: this.volume
    }
  },
  methods: {
    async createOrder() {
      const asset = this.generateOrderPayload();
      this.$store.dispatch('createOrder', { asset });
      this.closeModal();
    },
    generateOrderPayload() {
      const { change, changePercentage, p, symbolId } = this.currentAsset;
      const percentageNumber = parseFloat(changePercentage.replace('%', ''));
      const orderType = this.btnVal == 'Buy' ? 1 : 2;
      const matchingObject = this.categories.find(obj => obj.id === symbolId);
      let name = '';
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
        sector: 'someSector',
        position: 0,
        slPrice: 0,
        tpPrice: 0,
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
        symbolName: name
      }
    },
    closeModal() {
      this.$emit('closeModal');
    },
    handleInput(e, type) {
      this.$emit('handleInput', e, type);
    },
    handleBlur(e, type) {
      this.$emit('handleBlur', type);
    }
  },
  computed: {
    isDarkMode() {
      return this.$store.getters.getIsDarkMode;
    },
    categories() {
      return this.$store.getters.getAssetCategories;
    }
  }
}
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
</style>