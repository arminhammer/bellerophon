import Vue from 'vue'
import Electron from 'vue-electron'
import Resource from 'vue-resource'
import Router from 'vue-router'

import App from './App'
import routes from './routes'

import '../node_modules/animate.css/animate.css'
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/normalize.css/normalize.css'
import '../node_modules/bootstrap/dist/js/bootstrap'

Vue.use(Electron)
Vue.use(Resource)
Vue.use(Router)
if (process.env.NODE_ENV !== 'production') {
  Vue.config.debug = true
}

Vue.transition('bounce', {
  enterClass: 'bounceIn',
  leaveClass: 'bounceOut'
})

Vue.transition('bounceUp', {
  enterClass: 'bounceInUp',
  leaveClass: 'bounceOutDown'
})

const router = new Router()

router.map(routes)
router.beforeEach(() => {
  window.scrollTo(0, 0)
})
router.redirect({
  '*': '/'
})

router.start(App, 'app')
