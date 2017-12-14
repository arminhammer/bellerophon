import Vue from 'vue';
import Vuex from 'vuex';

import modules from './modules';
import broadcaster from './broadcaster';

Vue.use(Vuex);

export default new Vuex.Store({
	modules,
	plugins: [broadcaster],
	strict: process.env.NODE_ENV !== 'production'
});
