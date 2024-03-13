<template>
  <div class="mainBlock" :style="getMainBlockStyle">
    <div class="mainBlock__tabs">
      <div class="mainBlock__tabsItem mainBlock__tabsItem_add">+</div>
    </div>
    <div class="mainBlock__content">
      <div class="mainBlock__tabsEmpty" ref="Graph">
        <div class="d-flex">
          <trading-vue :width="width" :height="height" :data="chart" :toolbar="true"></trading-vue>
        </div>
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
  props: ["dataChanged"],
  data() {
    return {
      colors: {
        colorBack: "#fff",
        colorGrid: "#eee",
        colorText: "#333",
      },
      chart: new DataCube(Data),
      width: 0,
      height: 0,
    };
  },
  mounted() {
    this.setChartDimensions();
    window.addEventListener('resize', this.setChartDimensions);
  },
  destroyed() {
    window.removeEventListener('resize', this.setChartDimensions)
  },
  methods: {
    setChartDimensions() {
      this.$nextTick(() => {
        const graphContainer = this.$refs.Graph;
        let dimensions = graphContainer.getBoundingClientRect();
        this.width = dimensions.width;
        this.height = dimensions.height;
      });
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
          width: '75%',
          height: '65%',
          top: '0%',
          left: '0%',
        };
      }
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
.s-card {
  width: fit-content;
  height: fit-content;
}
</style>
