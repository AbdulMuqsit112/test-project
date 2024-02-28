<template>
  <div class="graph-container">
    <trading-vue :width="1010" :data="chart" :color-back="colors.colorBack"
    :color-grid="colors.colorGrid" :color-text="colors.colorText">
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
      
    }
  }
}

</script>


<style scoped>

</style>
