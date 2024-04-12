<template>
  <div class="mainBlock" :style="getMainBlockStyle">
    <div class="mainBlock__tabs">
      <div class="mainBlock__tabsItem mainBlock__tabsItem_add">+</div>
    </div>
    <div class="mainBlock__content">
      <div class="mainBlock__tabsEmpty p-0" ref="Graph">
        <div v-if="selectedData.length > 0" class="d-flex w-100 gap-2" :class="`${multiGraphs}`">
          <div v-for="(asset, index) in selectedData" :key="index" :class="`${graphClass}`">
            <trading-vue :width="setMultiChartWidths()" :height="setMultiChartHeight()" :data="handleData(asset)"
              :font="graphFont" :titleTxt="asset.s" :toolbar="true" :color-back="colors.colorBack"
              :color-grid="colors.colorGrid" :color-text="colors.colorText"></trading-vue>
          </div>
        </div>
        <trading-vue v-else :width="width" :height="height" :data="chart" :toolbar="true" :font="graphFont"
          :color-back="colors.colorBack" :color-grid="colors.colorGrid" :color-text="colors.colorText" :title-txt="titleTxt"></trading-vue>
      </div>
    </div>
    <div v-if="layout == 1" class="mainBlock__split mainBlock__split_h mainBlock__split_bottom"
      @mousedown="resizeGraph"></div>
    <div v-else class="mainBlock__split mainBlock__split_v mainBlock__split_right" @mousedown="resizeGraph"></div>
  </div>
</template>


<script>
import TradingVue from "../../TradingVue.vue";
import Data from "../../../data/data.json";
import updatedData from "../../../data/updatedData.json";
import DataCube from "../../helpers/datacube.js";
import resizeMixin from '../../mixins/resizeMixin';
import socketMixin from "../../mixins/socketMixin";
export default {
  name: "GraphComponent",
  mixins: [resizeMixin, socketMixin],
  components: { TradingVue },
  data() {
    return {
      colors: {
        colorBack: "",
        colorGrid: "",
        colorText: "",
      },
      chart: new DataCube(Data),
      chart2: new DataCube(updatedData),
      width: 0,
      height: 0,
      multiGraphs: '',
      graphClass: '',
      graphFont: '6px Roboto',
      titleTxt: 'BINANCE:BTCUSDT'
    };
  },
  async mounted() {
    this.setChartDimensions();
    window.addEventListener('resize', this.setChartDimensions);
    this.setGraphTheme();
    await this.setChartData();
    this.$on("symbolDataUpdated", this.on_trades);
  },

  destroyed() {
    window.removeEventListener('resize', this.setChartDimensions)
  },
  methods: {
    async setChartData() {
      this.chart = new DataCube({
        chart:{
          type: "Candles",
          data: [
            [1712872000008, 41239.4, 41239.6, 40791.6, 40719.63478779, 29930],
            [1712872000008, 41082.2, 41082.2, 40201.2, 40313.5, 32165],
            [1712872000008, 41035.6, 41072.78348726, 39165, 40155.6, 21571],
            [1712872000008, 41055.6, 41100, 40135, 40159.1719252, 16609],
            [1712872000001, 41059.1, 41076.6, 41014.1, 41060, 10707]
          ],
          tf: 300000,
        },

        tools: Data.tools,
        tool: Data.tool,
      })
    },
    on_trades(trade) {
      const processedData = JSON.parse(trade).data;
      let filteredData = [];
      if (processedData && processedData.length > 0) {
        filteredData = processedData.filter(item => item.s == this.titleTxt);
      }
      if (filteredData.length > 0) {
        filteredData.forEach(item => {
          this.chart.update({
            price: parseFloat(item.p),
            volume: parseFloat(item.v),
            [`datasets.${this.titleTxt}`]: [
              item.t,
              trade.m ? 0 : 1,
              parseFloat(item.v),
              parseFloat(item.p)
            ],
          })
      })
      }
    },
    setGraphTheme() {
      if (!this.isDarkMode) {
        this.colors = {
          colorBack: "#fff",
          colorGrid: "#eee",
          colorText: "#333",
        };
      } else {
        this.colors = {
          colorBack: "",
          colorGrid: "",
          colorText: "",
        };
      }
    },
    handleData(asset) {
      let chartData =
      {
        ...updatedData,
        onchart: [{
          type: asset.category,
          name: asset.s,
          data: []
        }],
      }
      chartData = new DataCube(chartData);
      return chartData;
    },
    setChartDimensions() {
      this.$nextTick(() => {
        const graphContainer = this.$refs.Graph;
        let dimensions = graphContainer.getBoundingClientRect();
        this.width = dimensions.width;
        this.height = dimensions.height;
      });
    },
    setMultiChartWidths() {
      let selectedArr = this.selectedData;
      if (selectedArr.length >= 2) {
        this.graphClass = 'custom-graph';
        0.4
      }
      if (selectedArr.length == 2) {
        return this.width / 2.1;
      }
      if (selectedArr.length >= 3) {
        this.multiGraphs = 'flex-wrap'
        return this.width / 2.1;
      }
      return this.width;
    },
    setMultiChartHeight() {
      let selectedArr = this.selectedData;
      if (selectedArr.length >= 3) {
        return this.height / 2.1
      }
      return this.height;
    },
    resizeGraph(event) {
      this.initResize(event, 'graph');
    }
  },
  computed: {
    layout() {
      return this.$store.getters.getLayoutType;
    },
    getMainBlockStyle() {
      return this.$store.getters.getLayoutDimensions.graphComponent;
    },
    selectedData() {
      return this.$store.getters.getSelectedData;
    },
    isDarkMode() {
      return this.$store.getters.getIsDarkMode;
    },
  },
  watch: {
    getMainBlockStyle: {
      handler(newVal) {
        this.setChartDimensions();
      },
      deep: true
    }
  },
};
</script>

<style scoped>
.custom-graph {
  border: 0.4px solid #2a2e39;
}
</style>
