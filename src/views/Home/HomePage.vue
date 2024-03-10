<template>
  <div id="root">
    <div class="document">
      <HeaderComponent />
      <main class="app-main">
        <leftBar />
        <section class="app-section">
          <main class="main">
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
                  <div
                    class="mainBlock__split mainBlock__split_v mainBlock__split_right"
                  ></div>
                  <div
                    class="mainBlock__split mainBlock__split_h mainBlock__split_bottom"
                  >
                </div>
                </div>
              <MainGraphic />
              <MainBottom />
              <MainRight />
            </div>
          </main>
        </section>
      </main>
      <FooterComponent />
    </div>
  </div>
</template>

<script>
import FooterComponent from "../../components/layouts/FooterComponent.vue";
import leftBar from "../../components/layouts/leftBar.vue";
import HeaderComponent from "../../components/layouts/HeaderComponent.vue";
import MainGraphic from "../../components/layouts/MainGraphic.vue";
import MainBottom from "../../components/layouts/MainBottom.vue";
import MainRight from "../../components/layouts/MainRight.vue";
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
  data() {
    return {
      isGraphDataChanged: false,
    };
  },
  methods: {
    handleGraphData(val) {
      this.isGraphDataChanged = val;
    },
  },
  computed: {
    layout() {
      return this.$store.state.layoutType;
    },
    getMainBlockStyle() {
      let layoutType = this.layout;
      if (layoutType === 2) {
        return {
          width: '25%',
          height: '50%',
          top: '0%',
          left: '0%',
        };
      } else {
        return {
          width: '45.5468%',
          height: '50%',
          top: '0%',
          left: '0%',
        };
      }
    },
  }
};
</script>

<style scoped>
@import url(./style.css);


h3 {
  margin: 0;
}
</style>
