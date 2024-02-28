<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
import userData from './assets/user.json';

export default {
  name: 'App',
  mounted() {
    const tokenFromLocalStorage = localStorage.getItem('token');
    if (tokenFromLocalStorage) {
      const user = userData.find(user => user.token === tokenFromLocalStorage);
      if (user) {
        this.$router.push('/dashboard');
        return;
      }
    }

    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromURL = urlParams.get('token');
    if (tokenFromURL) {
      const user = userData.find(user => user.token === tokenFromURL);
      if (user) {
        this.$router.push('/dashboard');
        return;
      }
    }
    this.$router.push('/login');
  }
}
</script>


<style>
body {
  box-sizing: border-box;
  background-color: #131722;
  color: #fff !important;
}
</style>