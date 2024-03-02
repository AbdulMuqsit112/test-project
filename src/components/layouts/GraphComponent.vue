<template>
  <div class="s-card mb-4">
    <div class="card-body">
      <trading-vue
        :width="width"
        :height="height"
        :data="chart"
        :toolbar="true"
      >
        <!-- to change colours use these props :color-back="colors.colorBack" :color-grid="colors.colorGrid" :color-text="colors.colorText" -->
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
  props: ['dataChanged'],
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
    this.handleWidthChange();
    window.addEventListener("resize", this.handleWidthChange);
  },
  methods: {
    handleWidthChange() {
      let windowWidth = window.innerWidth;
      if (windowWidth >= 2500) {
        this.width = 1550;
        this.height = 965;
      } else if (windowWidth >= 1900) {
        this.width = 1200;
        this.height = 630;
      } else if (windowWidth >= 1400) {
        this.width = 900;
        this.height = 440;
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
  beforeDestroy() {
    window.removeEventListener("resize", this.handleWidthChange);
  },
  watch: {
    dataChanged(newValue, oldValue) {
      if (newValue == true){
        this.chart = new DataCube(updatedData);
      } else {
        this.chart = new DataCube(Data);
      }
    }
  }
};
</script>

<style scoped></style>
