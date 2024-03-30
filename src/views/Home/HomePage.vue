<template>
  <div class="main__grid">
    <div v-if="layout != 1" class="mainBlock" :style="getMainBlockStyle">
      <div class="mainBlock__tabs">
        <div class="mainBlock__tabsItem mainBlock__tabsItem_add">
          +
        </div>
      </div>
      <div class="mainBlock__content">
        <div class="mainBlock__tabsEmpty">
          <h3>Area is empty.</h3>
          <p>Please add a module by pressing "+".</p>
        </div>
      </div>
      <div class="mainBlock__split mainBlock__split_v mainBlock__split_right"  @mousedown="resizeLastComponentRight"></div>
      <div class="mainBlock__split mainBlock__split_h mainBlock__split_bottom" @mousedown="resizeLastComponentBottom"></div>
    </div>
    <MainGraphic />
    <MainBottom />
    <MainRight />
  </div>
</template>

<script>
import FooterComponent from "../../components/layouts/FooterComponent.vue";
import leftBar from "../../components/layouts/leftBar.vue";
import HeaderComponent from "../../components/layouts/HeaderComponent.vue";
import MainGraphic from "../../components/layouts/MainGraphic.vue";
import MainBottom from "../../components/layouts/MainBottom.vue";
import MainRight from "../../components/layouts/MainRight/MainRight.vue";
import resizeMixin from "../../mixins/resizeMixin";
export default {
  name: "HomePage2",
  components: {
    FooterComponent,
    leftBar,
    HeaderComponent,
    MainGraphic,
    MainBottom,
    MainRight
  },
  mixins: [resizeMixin],
  methods: {
    resizeLastComponentBottom(event) {
      this.initResize(event, "lastComponentBottom");
    },
    resizeLastComponentRight(event) {
      this.initResize(event, "lastComponentRight");
    },
  },
  computed: {
    layout() {
      return this.$store.getters.getLayoutType;
    },
    getMainBlockStyle() {
      return this.$store.getters.getLayoutDimensions.lastComponent;
    },
  }
};
</script>

<style scoped>
h3 {
  margin: 0;
}
</style>
