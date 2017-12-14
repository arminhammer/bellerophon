import Vue from 'vue';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';

import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.css';
import VueHighlightJS from 'vue-highlightjs';
import highlightcss from 'highlight.js/styles/tomorrow-night-eighties.css';

if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;
Vue.use(Vuetify);
Vue.use(VueHighlightJS);

/* eslint-disable no-new */
new Vue({
	components: { App },
	router,
	store,
	template: '<App/>'
}).$mount('#app');
