import AWS from 'aws-sdk';
import { Transform } from 'wolkenkratzer';
import { spec, Template } from 'wolkenkratzer';

const approvedServices = ['EC2', 'S3'];

const state = {
	approvedServices: approvedServices,
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
		const Result = await listResources(Service, Resource);
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

const listResources = async (service, resource) => {
	const client = new AWS[service]();
	const resources = await Transform[service][`${resource}List`](client);
	console.log('resourceBlock: ', resources);
	return {
		to: `/service/${service}/${resource}`,
		items: resources,
		lastUpdated: new Date()
	};
};

/*
{
	S3: {
		Bucket: async () => {
			const client = new AWS.S3();
			const resourceBlocks = await Transform.S3.BucketList(client);
			console.log('resourceBlock: ', resourceBlocks);
			return {
				to: '/service/S3/Bucket',
				items: resourceBlocks,
				lastUpdated: new Date()
			};
		},
		BucketPolicy: async () => {
			const client = new AWS.S3();
			const resourceBlocks = await Transform.S3.BucketPolicyList(client);
			console.log('resourceBlock: ', resourceBlocks);
			return {
				to: '/service/S3/BucketPolicy',
				items: resourceBlocks,
				lastUpdated: new Date()
			};
		}
	}
};
*/
