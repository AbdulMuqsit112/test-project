<template>
  <div id="app">
    <div id="root">
      <div class="document" v-if="isAuthenticated">
        <HeaderComponent/>
        <main class="app-main">
          <leftBar />
          <section class="app-section">
            <main class="main">
              <router-view v-if="isAuthenticated"></router-view>
            </main>
          </section>
        </main>
        <FooterComponent/>
      </div>
      <router-view v-if="this.$route.path === '/login'"></router-view>
    </div>
  </div>
</template>

<script>
import HeaderComponent from "./components/layouts/HeaderComponent.vue";
import leftBar from "./components/layouts/leftBar.vue";
import FooterComponent from "./components/layouts/FooterComponent.vue"

export default {
  name: "App",
  components: {
    HeaderComponent,
    leftBar,
    FooterComponent
  },
  async created(){
    this.getUser();
  },
  mounted() {
    this.setLayout();
  },
  methods: {
    getUser(){
      this.$store.dispatch('getUserDetails');
    },
    setLayout() {
      let layout = localStorage.getItem('layout');
      if (layout) {
        this.$store.commit('changeLayout', layout);
        return;
      }
      this.$store.commit('changeLayout', 1);
    },
  },
  computed: {
    isAuthenticated(){
      return this.$store.getters.getIsAuthenticated;
    },
  },
};
</script>

<style>
@import url("../style.css");
@import url('./views/Home/style.css');

#app {
  /* height: 100vh; */
  /* width: 100vh; */
}
</style>
