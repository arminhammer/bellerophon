const settings = require('electron').remote.require('electron-settings');
import { isEmpty } from 'lodash';

const bootSettings = settings.getAll();

if (isEmpty(bootSettings)) {
	settings.set('proxy', false);
	settings.set('proxyString', '');
	settings.set('profile', 'default');
	settings.set('region', 'us-east-1');
	settings.set('maxRetries', 10);
}

const state = {
	settings: settings.getAll()
};

const mutations = {
	SET_SETTING(state, { key, value }) {
		settings.set(key, value);
		state.settings = settings.getAll();
	}
};

const actions = {};

export default {
	state,
	mutations,
	actions
};
