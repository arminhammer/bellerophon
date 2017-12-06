import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'template',
      component: require('@/components/Template')
    },
    {
      path: '/settings',
      name: 'settings',
      component: require('@/components/Settings')
    },
    {
      path: '/service/:serviceName/:resourceName',
      name: 'service',
      component: require('@/components/Service') //,
      // props: route => ({ query: route.query.name })
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
});
