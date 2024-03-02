import Vue from 'vue'
import App from './App.vue'
import router from './router/index';


if (MOB_DEBUG) {
    console.log = debug
    console.error = debug
    console.warn = debug
}

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

function debug(...argv) {
    fetch('/debug?argv=' + JSON.stringify(argv))
}
