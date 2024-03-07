<template>
  <div id="app">
    <router-view v-if="user || this.$route.path === '/login'"></router-view>
  </div>
</template>

<script>
import userData from "./assets/user.json";

export default {
  name: "App",
  data() {
    return {
      user: null,
    };
  },
  mounted(){
    this.setUser();
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
</style>
