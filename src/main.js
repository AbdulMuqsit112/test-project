import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import store from './store/store';
import AxiosPlugin from './plugins/axios';

Vue.use(AxiosPlugin);


if (MOB_DEBUG) {
    console.log = debug
    console.error = debug
    console.warn = debug
}

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

function debug(...argv) {
    fetch('/debug?argv=' + JSON.stringify(argv))
}
