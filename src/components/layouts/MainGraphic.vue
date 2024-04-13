<template>
  <div class="mainBlock" :style="getMainBlockStyle">
    <div class="mainBlock__tabs">
      <div class="mainBlock__tabsItem mainBlock__tabsItem_add">+</div>
    </div>
    <div class="mainBlock__content">
      <div class="mainBlock__tabsEmpty p-0" ref="Graph">
        <div v-if="selectedData.length > 0" class="d-flex w-100 gap-2" :class="`${multiGraphs}`">
          <div v-for="(asset, index) in selectedData" :key="index" :class="`${graphClass}`">
            <trading-vue :width="setMultiChartWidths()" :height="setMultiChartHeight()" :data="handleData(index + 1)"
              :font="graphFont" :titleTxt="asset.s" :toolbar="true" :color-back="colors.colorBack"
              :color-grid="colors.colorGrid" :color-text="colors.colorText"></trading-vue>
          </div>
        </div>
        <trading-vue v-else :width="width" :height="height" :data="chart1" :toolbar="true" :font="graphFont"
          :color-back="colors.colorBack" :color-grid="colors.colorGrid" :color-text="colors.colorText"
          :title-txt="titleTxt"></trading-vue>
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
      chart1: new DataCube(Data),
      chart2: new DataCube(Data),
      chart3: new DataCube(Data),
      chart4: new DataCube(Data),
      chart5: new DataCube(Data),
      width: 0,
      height: 0,
      multiGraphs: '',
      graphClass: '',
      graphFont: '6px Roboto',
      titleTxt: 'BINANCE:BTCUSDT',
      sampleData: Data.ohlcv,
    };
  },
  mounted() {
    this.setChartDimensions();
    window.addEventListener('resize', this.setChartDimensions);
    this.setGraphTheme();
    this.chart1 = this.setChartData();
    this.chart2 = this.setChartData();
    this.chart3 = this.setChartData();
    this.chart4 = this.setChartData();
    this.chart5 = this.setChartData();
    this.$on("symbolDataUpdated", this.on_trades);
  },

  destroyed() {
    window.removeEventListener('resize', this.setChartDimensions)
  },
  methods: {
    setChartData() {
      return new DataCube({
        chart: {
          type: "Candles",
          data: this.sampleData,
          tf: "1h",
        },
        tools: Data.tools,
        tool: Data.tool,
      })
    },
    on_trades(trade) {
      const processedData = JSON.parse(trade).data;
      let filteredData = [];
      if (processedData && processedData.length > 0) {
        if (this.selectedData.length > 0) {
          this.selectedData.forEach((asset, index) => {
            filteredData = processedData.filter(item => item.s == asset.s);
            this.updateChart(this.handleData(index + 1), filteredData, asset.s);
          })
        } else {
          filteredData = processedData.filter(item => item.s == this.titleTxt);
          this.updateChart(this.chart1, filteredData, this.titleTxt);
        }
      }
    },
    updateChart(chart, filteredData, dataSetTxt) {
      if (filteredData.length > 0) {
        for (const item of filteredData) {
          chart.update({
            price: parseFloat(item.p),
            volume: parseFloat(item.v),
            [`datasets.${dataSetTxt}`]: [
              item.t,
              dataSetTxt,
              filteredData.m ? 0 : 1,
              parseFloat(item.v),
              parseFloat(item.p)
            ],
          })
        }
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
    handleData(index) {
      return this[`chart${index + 1}`];
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
