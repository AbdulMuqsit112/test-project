<template>
    <div class="graph-container">
      <trading-vue
        :width="width"
        :height="height"
        :data="chart"
        :color-back="colors.colorBack" :color-grid="colors.colorGrid"
      :color-text="colors.colorText"
      >
      </trading-vue>
    </div>
</template>

<script>
import TradingVue from "trading-vue-js";
import Data from "../assets/data.json";

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
      chart: Data,
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
        this.width = 1900;
        this.height = 900;
      } else if (windowWidth >= 1900) {
        this.width = 1300;
        this.height = 700;
      } else if (windowWidth >= 1400) {
        this.width = 1010;
        this.height = 550;
      } else if (windowWidth >= 1200) {
        this.width = 860;
        this.height = 490;
      } else if (windowWidth >= 1000) {
        this.width = 900;
        this.height = 490;
      } else if (windowWidth >= 900) {
        this.width = 850;
        this.height = 490;
      } else if (windowWidth >= 700) {
        this.width = 810;
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

<style scoped>
.graph-container{
  margin-left: 4px;
}
</style>
