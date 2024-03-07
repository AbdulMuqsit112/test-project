<template>
  <div class="h-100">
    <header class="header">
      <HeaderComponent />
    </header>
    <div class="row main-grid">
      <div class="col custom-width no-display">
        <leftBar />
      </div>
      <div class="col-sm-11 p-0 grid-width">
        <grid-layout
          :layout.sync="layout"
          :col-num="12"
          :max-rows="12"
          :cols="customCol"
          :row-height="rowHeight"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :auto-size="true"
          :vertical-compact="true"
          :use-css-transforms="true"
          :responsive="true"
          :margin="[2, 2]"
          :responsive-layouts="allLayouts"
          :breakpoints="breakpoints"
          @breakpoint-changed="breakpointChangedEvent"
        >
          <grid-item
            v-for="item in layout"
            :x="item.x"
            :y="item.y"
            :w="item.w"
            :h="item.h"
            :i="item.i"
            :key="item.i"
            :min-w="item.minW"
            :min-h="item.minH"
            drag-allow-from=".vue-draggable-handle"
            class="grid-item"
          >
            <component
              :is="item.component"
              :dataChanged="isGraphDataChanged"
              :cWidth="item.w"
              :cHeight="item.h"
            >
            </component>
            <div class="text">
              <div class="vue-draggable-handle"></div>
            </div>
          </grid-item>
        </grid-layout>
      </div>
    </div>
    <div class="row p-1 no-display">
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import VueGridLayout from "vue-grid-layout";
import HeaderComponent from "../../components/layouts/HeaderComponent.vue";
import leftBar from "../../components/layouts/leftBar.vue";
import GraphComponent from "../../components/layouts/GraphComponent.vue";
import rightBar from "../../components/layouts/rightBar.vue";
import HistoryStockComponent from "../../components/layouts/HistoryStockComponent.vue";
import FooterComponent from "../../components/layouts/FooterComponent.vue";
export default {
  name: "HomePage",
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem,
    HeaderComponent,
    leftBar,
    GraphComponent,
    rightBar,
    HistoryStockComponent,
    FooterComponent,
  },
  
  data() {
    return {
      isGraphDataChanged: false,
      allLayouts: {
        lg: [
          { x: 0, y: 0, w: 9, h: 6, i: "b", component: "GraphComponent", static: false, minW: 5, minH: 3},
          { x: 0, y: 7, w: 9, h: 4, i: "d", component: "HistoryStockComponent", static: false, minW: 6, minH: 4},
          { x: 9, y: 0, w: 3, h: 8, i: "c", component: "rightBar", static: false, minW: 1, minH: 6}
        ],
        md: [
          { x: 0, y: 0, w: 9, h: 6, i: "b", component: "GraphComponent", static: false, minW: 5, minH: 3},
          { x: 0, y: 7, w: 9, h: 4, i: "d", component: "HistoryStockComponent", static: false, minW: 6, minH: 4},
          { x: 9, y: 0, w: 3, h: 8, i: "c", component: "rightBar", static: false, minW: 1, minH: 6}
        ],
        sm: [
          { x: 0, y: 0, w: 9, h: 6, i: "b", component: "GraphComponent", static: false, minW: 5, minH: 3},
          { x: 0, y: 7, w: 9, h: 5, i: "d", component: "HistoryStockComponent", static: false, minW: 6, minH: 4},
          { x: 9, y: 0, w: 3, h: 8, i: "c", component: "rightBar", static: false, minW: 1, minH: 6}
        ],
        xs: [
          { x: 0, y: 0, w: 12, h: 3, i: "b", component: "GraphComponent", static: false, minW: 5, minH: 3},
          { x: 0, y: 3, w: 12, h: 3, i: "d", component: "HistoryStockComponent", static: false, minW: 6, minH: 4},
          { x: 9, y: 6, w: 12, h: 6, i: "c", component: "rightBar", static: false, minW: 1, minH: 6}
        ],
        xxs: [
          { x: 0, y: 0, w: 12, h: 4, i: "b", component: "GraphComponent", static: false, minW: 5, minH: 3},
          { x: 0, y: 4, w: 12, h: 4, i: "d", component: "HistoryStockComponent", static: false, minW: 6, minH: 4},
          { x: 9, y: 9, w: 12, h: 4, i: "c", component: "rightBar", static: false, minW: 1, minH: 6}
        ]
      },
      layout: [],
      breakpoints: { lg: 2000, md: 1300, sm: 1000, xs: 900, xxs: 800 },
      customCol: { lg: 12, md: 12, sm: 12, xs: 12, xxs: 12 }
    };
  },
  methods: {
    handleGraphData(val) {
      this.isGraphDataChanged = val;
    },
  },
  computed: {
    rowHeight() {
      const screenHeight = document.body.clientHeight;
      const screenWidth = document.body.clientWidth;
      if (screenWidth > 4000) return screenHeight /10.58;
      if (screenWidth > 2500) return screenHeight /10.91;
      if (screenWidth > 2000) return screenHeight /11.25;
      if (screenWidth > 1600) return screenHeight /11.42;
      if (screenWidth > 1500) return screenHeight /11.726;
      if (screenWidth > 1400) return screenHeight /11.92;
      if (screenWidth > 1300) return screenHeight /13.5;
      if (screenWidth > 1100) return screenHeight /13.89;
      if (screenWidth > 900) return screenHeight /16.5;
      return screenHeight / 10.92;
    },
  },
};
</script>

<style scoped>

.custom-width {
  padding: 0;
  padding-left: 10px;
  padding-right: 2px;
  margin: 0;
}

.grid-item {
  background-color: #131722;
  cursor: pointer;
}

.vue-draggable-handle {
  position: absolute;
  width: 20px;
  height: 20px;
  top: 0;
  right: 0;
  padding: 0 8px 8px 0;
  background-origin: content-box;
  background-color: greenyellow;
  box-sizing: border-box;
  border-radius: 10px;
  cursor: pointer;
}

@media screen and (max-width: 4500px) {
  
  .main-grid {
  height: 95.5%;
  }
  .grid-width{
    margin-right: 8px;
    width: 97.6%
  }
  .custom-width{
    width: 2%;
  }
}
@media screen and (max-width: 3000px) {
  
  .main-grid {
  height: 93.2%;
  }
  .grid-width{
    width: 96.8%
  }
  .custom-width{
    width: 2.7%;
  }
}
@media screen and (max-width: 2400px) {
  
  .main-grid {
  height: 91%;
  }
  .grid-width{
    width: 96%
  }
  .custom-width{
    width: 3.7%;
  }
}
@media screen and (max-width: 2000px) {
  
  .main-grid {
  height: 90%;
  }
  .grid-width{
    width: 95%
  }
  .custom-width{
    width: 4.2%;
  }
}
@media screen and (max-width: 1700px) {
  
  .main-grid {
  height: 87.9%;
  }
  .grid-width{
    width: 94.2%
  }
  .custom-width{
    width: 5%;
  }
}
@media screen and (max-width: 1500px) {
  
  .main-grid {
    height: 87%;
  }
  .grid-width{
    width: 94.5%
  }
  .custom-width {
    width: 4%;
  }
}
@media screen and (max-width: 1400px) {
  
  .main-grid {
  height: 85%;
  }
  .grid-width{
    width: 93.6%
  }
  .custom-width{
    width: 6%;
  }
}
@media screen and (max-width: 1200px) {  
  .main-grid {
  height: 84%;
  }
  .grid-width{
    width: 94%
  }
  .custom-width{
    width: 5.4%;
  }
}


@media screen and (max-width: 1024px) {
  .main-grid {
    height: 81%;
  }
  .grid-width{
    width: 93%
  }
  .custom-width{
    width: 6.8%;
  }
}

@media screen and (max-width: 960px) {
  .main-grid {
    justify-content: center;
  }
  .no-display {
    display: none;
  }

  .header {
    width: 100%;
  }

  .wrapper {
    margin: 2px;
  }
}

</style>
