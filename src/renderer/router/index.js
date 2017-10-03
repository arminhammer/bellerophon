import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main-page',
      component: require('@/components/Main')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
