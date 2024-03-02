<template>
  <div class="s-card mb-4">
    <div class="card-body">
      <trading-vue :width="width" :height="height" :data="chart" :toolbar="true">
        <!-- to change colours use these props :color-back="colors.colorBack" :color-grid="colors.colorGrid" :color-text="colors.colorText" -->
      </trading-vue>
    </div>
  </div>
</template>

<script>
import TradingVue from "trading-vue-js";
import Data from "../assets/data.json";
import { DataCube } from 'trading-vue-js'
export default {
  name: "GraphComponent",
  components: { TradingVue },
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
        this.height = 900;
      } else if (windowWidth >= 1900) {
        this.width = 1200;
        this.height = 600;
      } else if (windowWidth >= 1400) {
        this.width = 900;
        this.height = 440;
      } else if (windowWidth >= 1200) {
        this.width = 800;
        this.height = 400;
      } else if (windowWidth >= 1000) {
        this.width = 900;
        this.height = 490;
      } else if (windowWidth >= 900) {
        this.width = 850;
        this.height = 490;
      } else if (windowWidth >= 700) {
        this.width = 710;
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
};
</script>

<style scoped></style>
