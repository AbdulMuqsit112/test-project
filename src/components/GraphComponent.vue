<template>
  <div class="graph-container">
    <trading-vue :width="width" :data="chart" :color-back="colors.colorBack" :color-grid="colors.colorGrid"
      :color-text="colors.colorText">
    </trading-vue>
  </div>
</template>

<script>

import TradingVue from 'trading-vue-js';
import Data from '../assets/data.json'

export default {
  name: 'GraphComponent',
  components: { TradingVue },
  data() {
    return {
      colors: {
        colorBack: '#fff',
        colorGrid: '#eee',
        colorText: '#333',
      },
      chart: Data,
      width: 0
    }
  },
  mounted() {
    this.handleWidthChange();
    window.addEventListener('resize', this.handleWidthChange);
  },
  methods: {
    handleWidthChange() {
      let windowWidth = window.innerWidth;
      if (windowWidth >= 1700) {
        this.width = 1420;
      } else if (windowWidth >= 1400) {
        this.width = 1010;
      } else if (windowWidth >= 1200) {
        this.width = 860;
      } else if (windowWidth >= 1000) {
        this.width = 900;
      } else if (windowWidth >= 700) {
        this.width = 750;
      } else {
        this.width = 600;
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWidthChange);
  }
}
</script>

<style scoped></style>
