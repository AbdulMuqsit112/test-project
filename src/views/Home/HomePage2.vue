<template>
  <div id="root">
    <div class="document">
      <HeaderComponent/>
      <main class="app-main">
        <leftBar />
        <section class="app-section">
          <main class="main">
            <div class="main__grid">
              <MainGraphic/>
              <MainBottom/>
              <div
                class="mainBlock"
                style="width: 25%; height: 100%; top: 0%; left: 75%"
              >
                <div
                  class="mainBlock__split mainBlock__split_v mainBlock__split_left"
                ></div>
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
              </div>
            </div>
          </main>
        </section>
      </main>
      <FooterComponent />
    </div>
  </div>
  <!-- <div id="modals-root"></div>
  <div id="dropdowns-root"></div>
  <div id="tooltips-root"></div>
  <div id="loop-root"></div>
  <span></span><span></span><span></span><span></span><span></span><span></span
  ><span></span><span></span><span></span><span></span><span></span><span></span
  ><span></span>
  <div class="_92545"></div> -->
</template>
<script>
import FooterComponent from "../../components/layouts/FooterComponent.vue";
import leftBar from "../../components/layouts/leftBar.vue";
import HeaderComponent from "../../components/layouts/HeaderComponent.vue";
import MainGraphic from "../../components/layouts/MainGraphic.vue";
import MainBottom from "../../components/layouts/MainBottom.vue";
export default {
  name: "HomePage2",
  components: {
    FooterComponent,
    leftBar,
    HeaderComponent,
    MainGraphic,
    MainBottom
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
};
</script>
<style scoped>
@import url(./style.css);


h3 {
  margin: 0;
}
</style>
