import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      // eslint-disable-next-line no-useless-escape
      component: () => import('../views/Home.vue'),
    },
  ]
});

export default router;
