<template>
  <div id="app">
    <div id="root" v-if="user && this.$route.path != '/login'">
      <div class="document">
        <HeaderComponent/>
        <main class="app-main">
          <leftBar />
          <section class="app-section">
            <main class="main">
              <router-view></router-view>
            </main>
          </section>
        </main>
        <FooterComponent/>
      </div>
    </div>
    <router-view v-else-if="this.$route.path === '/login'"></router-view>
  </div>
</template>

<script>
import userData from "./assets/user.json";
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
  data() {
    return {
      user: null,
    };
  },
  mounted() {
    this.setUser();
    this.setLayout();
  },
  methods: {
    setUser() {
      const tokenFromLocalStorage = localStorage.getItem("token");
      if (tokenFromLocalStorage) {
        const user = userData.find(
          (user) => user.token === tokenFromLocalStorage
        );
        if (user) {
          this.user = user;
          return;
        }
      }
      const urlParams = new URLSearchParams(window.location.search);
      const tokenFromURL = urlParams.get("token");
      if (tokenFromURL) {
        const user = userData.find((user) => user.token === tokenFromURL);
        if (user) {
          this.user = user;
          return;
        }
      }
      this.$router.push("/login");
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
  watch: {
    $route(to, from) {
      if (to.path == '/dashboard') {
        this.setUser();
      }
    },
  }
};
</script>

<style>
@import url("../style.css");
@import url('./views/Home/style.css');

#app {
  height: 100vh;
  ;
}
</style>
