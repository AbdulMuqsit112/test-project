<template>
  <div id="root">
    <div class="document">
      <header class="app-header">
        <div class="app-header-section">
          <div class="app-header-box">
            <div class="favoriteAssets"></div>
          </div>
        </div>
        <div class="app-header-section">
          <div class="app-header-box">
            <div class="header-balances">
              <div class="header-wrap">
                <span class="header-balances-item"
                  ><div class="">Balance:</div>
                  <span class="balance">0.00</span></span
                ><span class="header-balances-item"
                  ><div class="">Credit:</div>
                  <span class="balance">0.00</span></span
                ><span class="header-balances-item"
                  ><div class="">Equity:</div>
                  <span class="balance">0.00</span></span
                >
                <div class="header-margin">
                  <span class="header-balances-item"
                    ><div class="">Margin</div>
                    <div class="ml-sm">Free margin</div></span
                  >
                  <div class="margin-bar">
                    <div class="margin-bar-inner"></div>
                  </div>
                  <span class="header-balances-item"
                    ><span class="balance">0.00</span
                    ><span class="balance">0.00</span></span
                  >
                </div>
                <span
                  class="header-balances-item header-balances-item__margin-level"
                  ><div class="">Margin level:</div>
                  <span class="balance">0.00%</span></span
                >
              </div>
              <div class="header-profit">
                P/L: &nbsp;<span class="">€ 0.00</span>
              </div>
            </div>
          </div>
          <div class="header-account-real header-account">
            <img src="" class="icon-xlg icon-round mr-sm" alt="" /><b
              >User - &nbsp; </b
            ><span class="header-account-id">460187473</span>
          </div>
          <div class="app-header-box">
            <div class="header-menu">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 384.97 384.97"
              >
                <path
                  d="M12.03 84.212h360.909c6.641 0 12.03-5.39 12.03-12.03 0-6.641-5.39-12.03-12.03-12.03H12.03C5.39 60.152 0 65.541 0 72.182c0 6.641 5.39 12.03 12.03 12.03zM372.939 180.455H12.03c-6.641 0-12.03 5.39-12.03 12.03s5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03s-5.389-12.03-12.03-12.03zM372.939 300.758H12.03c-6.641 0-12.03 5.39-12.03 12.03 0 6.641 5.39 12.03 12.03 12.03h360.909c6.641 0 12.03-5.39 12.03-12.03.001-6.641-5.389-12.03-12.03-12.03z"
                ></path>
              </svg>
            </div>
          </div>
        </div>
      </header>
      <main class="app-main">
        <leftBar />
        <section class="app-section">
          <main class="main">
            <div class="main__grid">
              <div
                class="mainBlock"
                style="width: 75%; height: 65%; top: 0%; left: 0%"
              >
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
                  class="mainBlock__split mainBlock__split_h mainBlock__split_bottom"
                ></div>
              </div>
              <div
                class="mainBlock"
                style="width: 75%; height: 35%; top: 65%; left: 0%"
              >
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
export default {
  name: "HomePage2",
  components: {
    FooterComponent,
    leftBar,
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

.margin-bar {
  padding: 1px;
}
h3 {
  margin: 0;
}
</style>
