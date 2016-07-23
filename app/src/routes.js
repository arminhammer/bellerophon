import Vue from 'vue'

export default {
  '/': {
    component: Vue.component('main-page', require('./components/MainPageView')),
    name: 'main-page'
  },
  '/landing': {
    component: Vue.component('landing-page', require('./components/LandingPageView')),
    name: 'landing-page'
  }
}
