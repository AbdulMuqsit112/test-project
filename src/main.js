import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import AxiosPlugin from './plugins/axios'
import store from './store/store'
import VueI18n from 'vue-i18n'
import en from './locales/en.json'
import es from './locales/es.json'
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


Vue.use(AxiosPlugin);
Vue.use(VueI18n);

if (MOB_DEBUG) {
    console.log = debug
    console.error = debug
    console.warn = debug
}

const i18n = new VueI18n({
  legacy: false,
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    es
  }
});

const app = new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App),
});

app.$mount('#app');

function debug(...argv) {
    fetch('/debug?argv=' + JSON.stringify(argv))
}
