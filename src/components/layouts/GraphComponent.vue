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
      const containerWidth = document.body.clientWidth;
      const calculatedWidth = containerWidth * 11/ 12
      const containerHeight = document.body.clientHeight;
      this.width = calculatedWidth * this.cWidth / 12;
      this.width = this.width * 95/100;
      this.height = containerHeight * this.cHeight / 12;
      if (containerWidth > 4000){
        this.height = this.height * 105/100
        this.width = this.width * 110/100;
      } else if(containerWidth > 2500){
        this.height = this.height * 100/100
        this.width = this.width * 105/100;
      } else if(containerWidth > 2000){
        this.height = this.height * 94/100
        this.width = this.width * 105/100;
      } else if(containerWidth > 1700){
        this.height = this.height * 90/100
        this.width = this.width * 102.9/100;
      } else if(containerWidth > 1500){
        this.height = this.height * 90/100
      } else if(containerWidth > 1400){
        this.height = this.height * 86/100
      } else if(containerWidth > 1200){
        this.height = this.height * 75/100
        this.width = this.width * 98/100;
      } else if(containerWidth > 1000){
        this.height = this.height * 67/100
        this.width = this.width * 94/100;
      } else if(containerWidth > 880){
        this.height = this.height * 50/100
        this.width = this.width * 93/100;
      } else {
        this.height = this.height * 80/100
        this.width = this.width * 93/100;
      }
      // if (containerWidth < 1285){
      //   this.height = this.height * 75/100
      // } else if (containerWidth < 1300){
      //   this.height = this.height * 77/100
      // } else if (containerWidth < 1500){
      //   this.height = this.height * 75/100
      // } else {
      //   this.height = this.height * 80/100
      // }
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
