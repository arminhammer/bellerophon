import { spec, Template } from 'wolkenkratzer';
import { approvedServices, listResources } from '../../aws_utils';

const state = {
	activeService: 'S3',
	activeResource: 'Bucket',
	loading: false,
	resources: approvedServices.reduce((acc, curr) => {
		acc[curr] = Object.keys(spec[curr].Resources).reduce((acc0, curr0) => {
			acc0[curr0] = {
				to: `/service/${curr}/${curr0}`,
				lastUpdated: null,
				items: []
			};
			return acc0;
		}, {});
		return acc;
	}, {})
};

const mutations = {
	SET_ACTIVE_RESOURCE(state, payload) {
		console.log('mutating');
		state.activeResource = payload;
	},
	SET_ACTIVE_SERVICE(state, payload) {
		console.log('mutating');
		state.activeService = payload;
	},
	SET_LOADING(state) {
		console.log('set loading to true');
		state.loading = true;
	},
	SET_RESOURCES_FROM_AWS(state, { Service, Resource, Result }) {
		console.log('mutating AWS', Result);
		state.resources[Service][Resource] = Result;
		state.loading = false;
	}
};

const actions = {
	async updateAWSResource({ commit }, { Service, Resource }) {
		console.log('payload: ', Service, ' ', Resource);
		commit('SET_LOADING');
		let Result;
		if (listResources[Service] && listResources[Service][Resource]) {
			Result = await listResources[Service][Resource]();
		} else {
			Result = await new Promise(res =>
				res({
					to: `/service/${Service}/${Resource}`,
					items: [],
					lastUpdated: new Date()
				})
			);
		}
		console.log('update result:');
		console.log(Result);
		commit('SET_RESOURCES_FROM_AWS', { Service, Resource, Result });
	}
};

export default {
	state,
	mutations,
	actions
};
