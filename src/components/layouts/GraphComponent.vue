<template>
  <div class="s-card">
    <div class="card-body">
      <trading-vue :width="width" :height="height" :data="chart" :toolbar="true">
      </trading-vue>
    </div>
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
  props: ['dataChanged', 'cWidth', 'cHeight'],
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
  mounted(){
    this.setChartDimensions();
  },
  methods: {
    setChartDimensions() {
      const containerWidth = window.screen.width;
      const calculatedWidth = containerWidth * 11/ 12
      const containerHeight = window.screen.height;
      this.width = calculatedWidth * this.cWidth / 12;
      this.width = this.width * 95/100;
      this.height = containerHeight * this.cHeight / 12;
      this.height = this.height * 58/100
    },
    handleWidthChange() {
      let windowWidth = window.innerWidth;
      if (windowWidth >= 2500) {
        this.width = 1550;
        this.height = 965;
      } else if (windowWidth >= 1900) {
        this.width = 1200;
        this.height = 630;
      } else if (windowWidth >= 1400) {
        this.width = 400;
        this.height = 240;
      } else if (windowWidth >= 1200) {
        this.width = 800;
        this.height = 598;
      } else if (windowWidth >= 1024) {
        this.width = 620;
        this.height = 396;
      } else if (windowWidth >= 900) {
        this.width = 850;
        this.height = 490;
      } else if (windowWidth >= 800) {
        this.width = 810;
        this.height = 490;
      } else if (windowWidth >= 700) {
        this.width = 690;
        this.height = 490;
      } else {
        this.width = 600;
        this.height = 490;
      }
    },
  },
  watch: {
    dataChanged(newValue, oldValue) {
      if (newValue == true) {
        this.chart = new DataCube(updatedData);
      } else {
        this.chart = new DataCube(Data);
      }
    },
    cWidth() {
      this.setChartDimensions();
    },
    cHeight() {
      this.setChartDimensions();
    }
  }
};
</script>

<style scoped>
.s-card{
  width: fit-content;
  height: fit-content;
}
</style>
