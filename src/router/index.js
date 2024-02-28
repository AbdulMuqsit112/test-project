import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/HomePage.vue'), 
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'), 
  },
];

const router = new VueRouter({
  routes,
  mode: 'history', 
});


export default router;
