import Vue from 'vue'

export default {
  '/': {
    component: Vue.component('main-page', require('./components/MainPageView')),
    name: 'main-page'
  },
  '/resource/:resourceName': {
    component: Vue.component('resource-page', require('./components/ResourcePageView')),
    name: 'resource-page'
  }
}
