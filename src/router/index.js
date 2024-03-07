import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('../views/Home/HomePage.vue'), 
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/LoginPage.vue'), 
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('../views/ProfilePage.vue'), 
  },
];

const router = new VueRouter({
  routes,
  mode: 'history', 
});


export default router;
