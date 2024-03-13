<template>
  <div class="mainBlock" :style="getMainBlockStyle">
    <div class="mainBlock__tabs">
      <div class="mainBlock__tabsItem mainBlock__tabsItem_add">+</div>
    </div>
    <div class="mainBlock__content">
      <div class="mainBlock__tabsEmpty" ref="Graph">
        <trading-vue :width="width" :height="height" :data="chart" :toolbar="true"></trading-vue>
      </div>
    </div>
    <div v-if="layout == 1" class="mainBlock__split mainBlock__split_h mainBlock__split_bottom"
      @mousedown="startResize"></div>
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
      isResizing: false,
      startX: 0,
      startY: 0,
      startWidth: 0,
      startHeight: 0,
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
    startResize(event) {
      this.isResizing = true;
      this.startX = event.clientX;
      this.startY = event.clientY;
      this.startWidth = parseInt(this.getMainBlockStyle.width);
      this.startHeight = parseInt(this.getMainBlockStyle.height);
      document.addEventListener('mousemove', this.resizeGraph);
      document.addEventListener('mouseup', this.stopResize);
    },
    resizeGraph(event) {
      if (!this.isResizing) return;
      const deltaY = event.clientY - this.startY;
      const parentHeight = this.$el.parentElement.offsetHeight;
      let heightPercentageChange = ((this.startHeight / 100 * parentHeight) + deltaY) / parentHeight * 100;
      const heightChange = (deltaY / parentHeight) * 100;
      if (heightPercentageChange > 80) {
        heightPercentageChange = 80;
      }
      this.$store.commit('setGraphHeightChanged', heightChange);
      this.$store.commit('setGraphContHeight', heightPercentageChange);
      this.$store.commit('setIsGraphResized', true);
      this.setChartDimensions();
    },
    stopResize() {
      this.isResizing = false;
      document.removeEventListener('mousemove', this.resizeGraph);
      document.removeEventListener('mouseup', this.stopResize);
    },
  },
  computed: {
    layout() {
      return this.$store.state.layoutType;
    },
    getMainBlockStyle() {
      let layoutType = this.layout;
      if (layoutType == 2) {
        if (!this.isResized) {
          this.$store.commit('setGraphContWidth', 75);
          this.$store.commit('setGraphContHeight', 50);
        }
        return {
          width: `${this.contWidth}%`,
          height: `${this.contHeight}%`,
          top: '50%',
          left: '0%',
        };
      } else if (layoutType == 3) {
        if (!this.isResized) {
          this.$store.commit('setGraphContWidth', 45.6032);
          this.$store.commit('setGraphContHeight', 50);
        }
        return {
          width: `${this.contWidth}%`,
          height: `${this.contHeight}%`,
          top: '50%',
          left: '0%',
        };
      }
      else {
        if (!this.isResized) {
          this.$store.commit('setGraphContWidth', 75);
          this.$store.commit('setGraphContHeight', 65);
        }
        return {
          width: `${this.contWidth}%`,
          height: `${this.contHeight}%`,
          top: '0%',
          left: '0%',
        };
      }
    },
    contWidth() {
      return this.$store.getters.getGraphConWidth;
    },
    contHeight() {
      return this.$store.getters.getGraphConHeight;
    },
    contTop() {
      return this.$store.getters.getGraphConPosTop;
    },
    contLeft() {
      return this.$store.getters.getGraphConPosLeft;
    },
    isResized() {
      return this.$store.getters.getIsGraphResized;
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
