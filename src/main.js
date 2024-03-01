import Vue from 'vue'
import App from './App.vue'
import router from './router/index';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
Vue.config.productionTip = false

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
