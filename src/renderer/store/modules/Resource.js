import AWS from 'aws-sdk';
import { Transform } from 'wolkenkratzer';
import { spec, Template } from 'wolkenkratzer';

const approvedServices = ['CloudTrail', 'EC2', 'S3'];
const unapprovedResources = new Set([
	'CustomerGateway',
	'DHCPOptions',
	'EgressOnlyInternetGateway',
	'EIP',
	'EIPAssociation',
	'FlowLog',
	'Host',
	'Instance',
	'InternetGateway',
	'NatGateway',
	'NetworkAcl',
	'NetworkAclEntry',
	'NetworkInterface',
	'NetworkInterfaceAttachment',
	'NetworkInterfacePermission',
	'PlacementGroup',
	'Route',
	'RouteTable',
	'SecurityGroupEgress',
	'SecurityGroupIngress',
	'SpotFleet',
	'Subnet',
	'SubnetCidrBlock',
	'SubnetNetworkAclAssociation',
	'SubnetRouteTableAssociation',
	'TrunkInterfaceAssociation',
	'Volume',
	'VolumeAttachment',
	'VPC',
	'VPCCidrBlock',
	'VPCDHCPOptionsAssociation',
	'VPCEndpoint',
	'VPCGatewayAttachment',
	'VPCPeeringConnection',
	'VPNConnection',
	'VPNConnectionRoute',
	'VPNGateway',
	'VPNGatewayRoutePropagation'
]);

const state = {
	approvedServices: approvedServices,
	activeService: '',
	activeResource: '',
	loading: false,
	resources: approvedServices.reduce((acc, curr) => {
		acc[curr] = Object.keys(spec[curr].Resources).reduce((acc0, curr0) => {
			if (!unapprovedResources.has(curr0)) {
				acc0[curr0] = {
					to: `/service/${curr}/${curr0}`,
					lastUpdated: null,
					items: []
				};
			}
			return acc0;
		}, {});
		return acc;
	}, {})
};

const mutations = {
	SET_ACTIVE_RESOURCE(state, payload) {
		state.activeResource = payload;
	},
	SET_ACTIVE_SERVICE(state, payload) {
		state.activeService = payload;
	},
	SET_LOADING(state) {
		state.loading = true;
	},
	SET_RESOURCES_FROM_AWS(state, { Service, Resource, Result }) {
		state.resources[Service][Resource] = Result;
		state.loading = false;
	}
};

const actions = {
	async updateAWSResource({ commit }, { Service, Resource }) {
		commit('SET_LOADING');
		const Result = await listResources(Service, Resource);
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
	return {
		to: `/service/${service}/${resource}`,
		items: resources,
		lastUpdated: new Date()
	};
};
