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
              <MainRight/>
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
};
</script>
<style scoped>
@import url(./style.css);


h3 {
  margin: 0;
}
</style>
