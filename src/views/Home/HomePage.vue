<template>
  <div class="h-100">
    <header class="header">
      <HeaderComponent />
    </header>
    <div class="row p-0">
      <div class="col-md-1 custom-width">
        <leftBar/>
      </div>
      <div class="col-md-11 p-0 grid-width">
        <grid-layout
          :layout="layout"
          :col-num="12"
          :max-rows="12"
          :row-height="rowHeight"
          :is-draggable="true"
          :is-resizable="true"
          :is-mirrored="false"
          :auto-size="true"
          :vertical-compact="true"
          :use-css-transforms="true"
          :responsive="false"

          :margin="[1,3]"
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
            ></component>
            <div class="text">
              <div class="vue-draggable-handle"></div>
            </div>
          </grid-item>
        </grid-layout>
      </div>

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
  },
  data() {
    return {
      isGraphDataChanged: false,
      layout: [
        {
          x: 0,
          y: 0,
          w: 9,
          h: 5,
          i: "b",
          component: "GraphComponent",
          static: false,
          minW: 5,
          minH: 3
        },
        {
          x: 0,
          y: 6,
          w: 9,
          h: 6,
          i: "d",
          component: "HistoryStockComponent",
          static: false,
          minW: 6,
          minH: 4
        },
        {
          x: 9,
          y: 0,
          w: 3,
          h: 8,
          i: "c",
          component: "rightBar",
          static: false,
          minW: 1,
          minH: 6
        },
        
      ],
    };
  },
  methods: {
    handleGraphData(val) {
      this.isGraphDataChanged = val;
    },
  },
  computed: {
    rowHeight(){
      let screenHeight = window.screen.height;
      screenHeight = screenHeight * 71 /100;
      return screenHeight/ 12;
    }
  }
};
</script>

<style scoped>
.custom-width{
  width: 5%;
  padding: 0;
  padding-left: 10px;
  padding-right: 2px;
  margin: 0;
}
.grid-width{
  width: 94%;
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

@media screen and (max-width: 1600px) {
  .c-width {
    width: 5.65%;
  }
}

@media screen and (max-width: 1500px) {
  .c-width {
    width: 5%;
  }
}

@media screen and (max-width: 1024px) {
  .c-width {
    padding-inline: 1.9rem;
  }
}

@media screen and (max-width: 1000px) {
  .c-width {
    display: none;
  }

  .custom-width {
    display: none;
  }

  .header {
    width: 100%;
  }

  .wrapper {
    margin: 2px;
  }
}

@media screen and (min-width: 1000px) {
  .gutter-width {
    --bs-gutter-x: 0rem;
  }

  .sidebar {
    width: 27.5%;
  }
}
</style>../../components/layouts/HistoryStockComponent.vue
