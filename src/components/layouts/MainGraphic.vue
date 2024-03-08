<template>
  <div class="mainBlock" style="width: 75%; height: 65%; top: 0%; left: 0%">
    <div class="mainBlock__tabs">
      <div class="mainBlock__tabsItem mainBlock__tabsItem_add">+</div>
    </div>
    <div class="mainBlock__content">
      <div class="mainBlock__tabsEmpty">
        <trading-vue
          :width="width"
          :height="height"
          :data="chart"
          :toolbar="true"
        ></trading-vue>
      </div>
    </div>
    <div
      class="mainBlock__split mainBlock__split_h mainBlock__split_bottom"
    ></div>
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
      const contWidth = this.containerWidth;
      const containerHeight = this.containerHeight;
      let baseWidth = contWidth * (11 / 12);
      let baseHeight = containerHeight * (7.1 / 12);
      baseWidth = (baseWidth * 9.8) / 12;
      baseWidth = (baseWidth * 95) / 100;

      if (contWidth > 4000) {
        baseWidth *= 1.035;
        baseHeight *= 1.019;
      } else if (contWidth > 2500) {
        baseWidth *= 1.025;
        baseHeight *= 0.977;
      } else if (contWidth > 2000) {
        baseWidth *= 1.02;
        baseHeight *= 0.935;
      } else if (contWidth > 1800) {
        baseWidth *= 1.009;
        baseHeight *= 0.915;
      } else if (contWidth > 1700) {
        baseWidth *= 1.017;
        baseHeight *= 0.902;
      } else if (contWidth > 1500) {
        baseWidth *= 1.009;
        baseHeight *= 0.878;
      } else if (contWidth > 1400) {
        baseWidth *= 0.994;
        baseHeight *= 0.853;
      } else if (contWidth > 1200) {
        baseWidth *= 0.987;
        baseHeight *= 0.829;
      } else if (contWidth > 1000) {
        baseWidth *= 0.978;
        baseHeight *= 0.791;
      } else if (contWidth > 880) {
        baseWidth *= 0.964;
        baseHeight *= 0.732;
      } else {
        baseWidth *= 0.948;
        baseHeight *= 0.802;
      }
      this.width = baseWidth;
      this.height = baseHeight;
    },
  },
  computed: {
    containerWidth(){
      return document.body.clientWidth;
    },
    containerHeight(){
      return document.body.clientHeight;
    }
  },
  watch: {
    dataChanged(newValue) {
      if (newValue == true) {
        this.chart = new DataCube(updatedData);
      } else {
        this.chart = new DataCube(Data);
      }
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
