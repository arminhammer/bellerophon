import {
	FnGetAtt,
	Output,
	Parameter,
	Ref,
	spec,
	Template
} from 'wolkenkratzer';
import { set, isEmpty } from 'lodash';
import Vue from 'vue';

let state = {
	template: Template(),
	internal: {},
	linkTargetList: [],
	fngetattMap: {}
};

const mutations = {
	ADD_RESOURCE(state, { resource, resourceName, serviceName }) {
		const changeSet = {
			[`${serviceName}.${resourceName}.${resource.Name}`]: true
		};
		Object.keys(resource.Properties).forEach(p => {
			if (!isEmpty(resource.Properties[p])) {
				changeSet[
					`${serviceName}.${resourceName}.${resource.Name}.property.${p}`
				] = true;
			} else {
				changeSet[
					`${serviceName}.${resourceName}.${resource.Name}.property.${p}`
				] = false;
			}
		});
		state.internal = { ...state.internal, ...changeSet };
		state.template = state.template.add(resource);
		state.linkTargetList = _calculateLinkTargetList();
	},
	REMOVE_RESOURCE(state, { resource, resourceName, serviceName }) {
		if (
			state.internal[`${serviceName}.${resourceName}.${resource.Name}.output`]
		) {
			state.template = state.template.remove(`${resource.Name}Output`);
		}
		state.template = state.template.remove(resource.Name);
		state.internal[`${serviceName}.${resourceName}.${resource.Name}`] = false;
		state.internal[
			`${serviceName}.${resourceName}.${resource.Name}.output`
		] = false;
		Object.keys(resource.Properties).forEach(p => {
			state.internal[
				`${serviceName}.${resourceName}.${resource.Name}.property.${p}`
			] = false;
		});
		state.linkTargetList = _calculateLinkTargetList();
	},
	ADD_OUTPUT_RESOURCE(state, { resource, resourceName, serviceName }) {
		state.template = state.template.add(
			Output(`${resource.Name}Output`, { Value: Ref(resource.Name) })
		);
		state.internal = {
			...state.internal,
			[`${serviceName}.${resourceName}.${resource.Name}.output`]: true
		};
		state.linkTargetList = _calculateLinkTargetList();
	},
	REMOVE_OUTPUT_RESOURCE(state, { resource, resourceName, serviceName }) {
		state.template = state.template.remove(`${resource.Name}Output`);
		state.internal = {
			...state.internal,
			[`${serviceName}.${resourceName}.${resource.Name}.output`]: false
		};
		state.linkTargetList = _calculateLinkTargetList();
	},
	ADD_OUTPUT_RESOURCE_ATTRIBUTE(
		state,
		{ attributeName, resource, resourceName, serviceName }
	) {
		state.template = state.template.add(
			Output(`${resource.Name}${attributeName}Output`, {
				Value: FnGetAtt(resource.Name, attributeName)
			})
		);
		state.internal = {
			...state.internal,
			[`${serviceName}.${resourceName}.${
				resource.Name
			}.property.${attributeName}.output`]: true
		};
		state.linkTargetList = _calculateLinkTargetList();
	},
	REMOVE_OUTPUT_RESOURCE_ATTRIBUTE(
		state,
		{ attributeName, resource, resourceName, serviceName }
	) {
		state.template = state.template.remove(
			`${resource.Name}${attributeName}Output`
		);
		state.internal = {
			...state.internal,
			[`${serviceName}.${resourceName}.${
				resource.Name
			}.property.${attributeName}.output`]: false
		};
		state.linkTargetList = _calculateLinkTargetList();
	},
	ADD_PARAMETER_RESOURCE_ATTRIBUTE(
		state,
		{ attributeName, resource, resourceName, serviceName }
	) {
		const newAttributeName = `${resource.Name}${attributeName}Param`;
		state.internal = {
			...state.internal,
			[`${serviceName}.${resourceName}.${
				resource.Name
			}.property.${attributeName}.param`]: true,
			[`${serviceName}.${resourceName}.${
				resource.Name
			}.property.${attributeName}.original`]: state.template.Resources[
				resource.Name
			].Properties[attributeName],
			[`${serviceName}.${resourceName}.${
				resource.Name
			}.property.${attributeName}.link`]: newAttributeName
		};
		state.template = state.template
			.add(
				Parameter(newAttributeName, {
					Type: String,
					Default: resource.Properties[attributeName]
				})
			)
			.set(`${resource.Name}.${attributeName}`, Ref(newAttributeName));
		state.linkTargetList = _calculateLinkTargetList();
	},
	REMOVE_PARAMETER_RESOURCE_ATTRIBUTE(
		state,
		{ attributeName, resource, resourceName, serviceName }
	) {
		state.template = state.template
			.remove(`${resource.Name}${attributeName}Param`)
			.set(
				`${resource.Name}.${attributeName}`,
				state.internal[
					`${serviceName}.${resourceName}.${
						resource.Name
					}.property.${attributeName}.original`
				]
			);
		state.internal = {
			...state.internal,
			[`${serviceName}.${resourceName}.${
				resource.Name
			}.property.${attributeName}.param`]: false,
			[`${serviceName}.${resourceName}.${
				resource.Name
			}.property.${attributeName}.link`]: undefined
		};
		state.linkTargetList = _calculateLinkTargetList();
	},
	ADD_RESOURCE_ATTRIBUTE(
		state,
		{ attributeName, resource, resourceName, serviceName }
	) {
		state.template = state.template.set(
			`${resource.Name}.${attributeName}`,
			resource.Properties[attributeName]
		);
		state.internal = {
			...state.internal,
			[`${serviceName}.${resourceName}.${
				resource.Name
			}.property.${attributeName}`]: true
		};
		state.linkTargetList = _calculateLinkTargetList();
	},
	REMOVE_RESOURCE_ATTRIBUTE(
		state,
		{ attributeName, resource, resourceName, serviceName }
	) {
		state.template = state.template.set(
			`${resource.Name}.${attributeName}`,
			''
		);
		state.internal = {
			...state.internal,
			[`${serviceName}.${resourceName}.${
				resource.Name
			}.property.${attributeName}`]: false
		};
		state.linkTargetList = _calculateLinkTargetList();
	},
	LINK_RESOURCE_ATTRIBUTE(
		state,
		{ resource, attributeName, linkTarget, resourceName, serviceName }
	) {
		let link = linkTarget;
		if (linkTarget === 'N/A') {
			link = undefined;
			state.template = state.template.set(
				`${resource}.${attributeName}`,
				state.internal[
					`${serviceName}.${resourceName}.${resource}.property.${attributeName}.original`
				]
			);
		} else if (state.template.Parameters[linkTarget]) {
			state.internal = {
				...state.internal,
				[`${serviceName}.${resourceName}.${resource}.property.${attributeName}.original`]: state
					.template.Resources[resource].Properties[attributeName]
			};
			state.template = state.template.set(
				`${resource}.${attributeName}`,
				Ref(linkTarget)
			);
		} else if (state.template.Resources[linkTarget]) {
			state.internal = {
				...state.internal,
				[`${serviceName}.${resourceName}.${resource}.property.${attributeName}.original`]: state
					.template.Resources[resource].Properties[attributeName]
			};
			state.template = state.template.set(
				`${resource}.${attributeName}`,
				Ref(linkTarget)
			);
		} else {
			console.log('Where does linkTarget fit?');
			state.internal = {
				...state.internal,
				[`${serviceName}.${resourceName}.${resource}.property.${attributeName}.original`]: state
					.template.Resources[resource].Properties[attributeName]
			};
			state.template = state.template.set(
				`${resource}.${attributeName}`,
				FnGetAtt(
					state.fngetattMap[linkTarget].resource,
					state.fngetattMap[linkTarget].att
				)
			);
		}
		state.internal = {
			...state.internal,
			[`${serviceName}.${resourceName}.${resource}.property.${attributeName}.link`]: link
		};
		state.linkTargetList = _calculateLinkTargetList();
	}
};

const actions = {};

function _calculateLinkTargetList() {
	const list = [{ name: 'N/A' }];
	Object.keys(state.template.Parameters).forEach(x => list.push({ name: x }));
	Object.keys(state.template.Resources).forEach(x => {
		list.push({ name: x });
		console.log('resource: ', state.template.Resources[x]);
		const [, serviceName, resourceName] = state.template.Resources[
			x
		].Type.split('::');
		console.log(serviceName, resourceName);
		if (spec[serviceName].Resources[resourceName].Attributes) {
			Object.keys(spec[serviceName].Resources[resourceName].Attributes).forEach(
				y => {
					const name = `${x}${y}`;
					list.push({ name });
					state.fngetattMap[name] = { resource: x, att: y };
				}
			);
		}
	});
	return list;
}

export default {
	state,
	mutations,
	actions
};
