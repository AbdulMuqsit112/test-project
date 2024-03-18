<template>
  <div class="mainBlock" :style="getMainBlockStyle">
    <div class="mainBlock__tabs">
      <div class="mainBlock__tabsItem mainBlock__tabsItem_add">+</div>
    </div>
    <div class="mainBlock__content">
      <div class="mainBlock__tabsEmpty p-0" ref="Graph">
        <div v-if="selectedData.length > 0" class="d-flex w-100 gap-2" :class="`${multiGraphs}`">
          <div v-for="(asset, index) in selectedData" :key="index" :class="`${graphClass}`">
            <trading-vue :width="setMultiChartWidths()" :height="setMultiChartHeight()" :data="handleData(asset)" :font="graphFont" :titleTxt="asset.s"
              :toolbar="true" :color-back="colors.colorBack" :color-grid="colors.colorGrid" :color-text="colors.colorText"></trading-vue>
          </div>
        </div>
        <trading-vue v-else :width="width" :height="height" :data="chart" :toolbar="true" :font="graphFont" :color-back="colors.colorBack" :color-grid="colors.colorGrid" :color-text="colors.colorText"></trading-vue>
      </div>
    </div>
    <div v-if="layout == 1" class="mainBlock__split mainBlock__split_h mainBlock__split_bottom"></div>
    <div v-else class="mainBlock__split mainBlock__split_v mainBlock__split_right"></div>
  </div>
</template>


<script>
import TradingVue from "../../TradingVue.vue";
import Data from "../../../data/data.json";
import updatedData from "../../../data/updatedData.json";
import DataCube from "../../helpers/datacube.js";
export default {
  name: "GraphComponent",
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
      graphFont: '6px Roboto'
    };
  },
  mounted() {
    this.setChartDimensions();
    window.addEventListener('resize', this.setChartDimensions);
    this.setGraphTheme();
  },
  destroyed() {
    window.removeEventListener('resize', this.setChartDimensions)
  },
  methods: {
    setGraphTheme(){
      if(!this.isDarkMode){
        colors = {
          colorBack: "#fff",
          colorGrid: "#eee",
          colorText: "#333",
        };
      } else {
        colors = {
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
        }],}
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
  },
  computed: {
    layout() {
      return this.$store.state.layoutType;
    },
    getMainBlockStyle() {
      let layoutType = this.layout;
      if (layoutType == 2) {
        return {
          width: '75%',
          height: '50%',
          top: '50%',
          left: '0%',
        };
      } else if (layoutType == 3) {
        return {
          width: '45.6032%',
          height: '50%',
          top: '50%',
          left: '0%',
        };

      }
      else {
        return {
          width: '80%',
          height: '75%',
          top: '0%',
          left: '0%',
        };
      }
    },
    selectedData() {
      return this.$store.getters.getSelectedData;
    },
    isDarkMode(){
      return this.$store.getters.getIsDarkMode;
    },
  },
  watch: {
    dataChanged(newValue) {
      if (newValue == true) {
        this.chart = new DataCube(updatedData);
      } else {
        this.chart = new DataCube(Data);
      }
    },
    layout(newVal) {
      this.setChartDimensions();
    },
  },
};
</script>

<style scoped>
.custom-graph {
  border: 0.4px solid #2a2e39;
}
</style>
