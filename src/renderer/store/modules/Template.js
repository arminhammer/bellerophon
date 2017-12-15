import {
	FnGetAtt,
	Output,
	Parameter,
	Ref,
	spec,
	Template
} from 'wolkenkratzer';
import { set, isEmpty } from 'lodash';
import { approvedServices, listResources } from '../../aws_utils';
import Vue from 'vue';

let state = {
	template: Template(),
	internal: {}
};

const mutations = {
	ADD_RESOURCE(state, resource) {
		/*set(state.internal, `S3.Bucket.${resource.Name}`, {
      present: true,
      output: false
		});*/
		const changeSet = {
			[`S3.Bucket.${resource.Name}`]: true
		};
		//Vue.set(state.internal, `S3.Bucket.${resource.Name}`, true);
		//state.internal[`S3.Bucket.${resource.Name}`] = true;
		Object.keys(resource.Properties).forEach(p => {
			if (!isEmpty(resource.Properties[p])) {
				changeSet[`S3.Bucket.${resource.Name}.property.${p}`] = true;
			} else {
				changeSet[`S3.Bucket.${resource.Name}.property.${p}`] = false;
			}
		});
		state.internal = { ...state.internal, ...changeSet };
		state.template = state.template.add(resource);
	},
	REMOVE_RESOURCE(state, resource) {
		if (state.internal[`S3.Bucket.${resource.Name}.output`]) {
			state.template = state.template.remove(`${resource.Name}Output`);
		}
		state.template = state.template.remove(resource.Name);
		state.internal[`S3.Bucket.${resource.Name}`] = false;
		state.internal[`S3.Bucket.${resource.Name}.output`] = false;
		Object.keys(resource.Properties).forEach(p => {
			state.internal[`S3.Bucket.${resource.Name}.property.${p}`] = false;
		});
		/*
    set(state.internal, `S3.Bucket.${resource.Name}`, {
      present: false,
      output: false
    });*/
	},
	ADD_OUTPUT_RESOURCE(state, resource) {
		state.template = state.template.add(
			Output(`${resource.Name}Output`, { Value: Ref(resource.Name) })
		);
		state.internal = {
			...state.internal,
			[`S3.Bucket.${resource.Name}.output`]: true
		};
		//set(state.internal, `S3.Bucket.${resource.Name}.output`, true);
	},
	REMOVE_OUTPUT_RESOURCE(state, resource) {
		state.template = state.template.remove(`${resource.Name}Output`);
		state.internal = {
			...state.internal,
			[`S3.Bucket.${resource.Name}.output`]: false
		};
		//set(state.internal, `S3.Bucket.${resource.Name}.output`, false);
	},
	ADD_OUTPUT_RESOURCE_ATTRIBUTE(state, { paramName, resource }) {
		console.log('NAME: ', `${resource.Name}${paramName}Output`);
		state.template = state.template.add(
			Output(`${resource.Name}${paramName}Output`, {
				Value: FnGetAtt(resource.Name, paramName)
			})
		);
		state.internal = {
			...state.internal,
			[`S3.Bucket.${resource.Name}.property.${paramName}.output`]: true
		};
		//set(state.internal, `S3.Bucket.${resource.Name}.output`, true);
	},
	REMOVE_OUTPUT_RESOURCE_ATTRIBUTE(state, { paramName, resource }) {
		state.template = state.template.remove(
			`${resource.Name}${paramName}Output`
		);
		state.internal = {
			...state.internal,
			[`S3.Bucket.${resource.Name}.property.${paramName}.output`]: false
		};
		//set(state.internal, `S3.Bucket.${resource.Name}.output`, false);
	},
	ADD_PARAMETER_RESOURCE_ATTRIBUTE(state, { paramName, resource }) {
		console.log('NAME: ', `${resource.Name}${paramName}Param`);
		state.template = state.template.add(
			Parameter(`${resource.Name}${paramName}Param`, {
				Type: String,
				Default: resource.Properties[paramName]
			})
		);
		state.internal = {
			...state.internal,
			[`S3.Bucket.${resource.Name}.property.${paramName}.param`]: true
		};
	},
	REMOVE_PARAMETER_RESOURCE_ATTRIBUTE(state, { paramName, resource }) {
		state.template = state.template.remove(`${resource.Name}${paramName}Param`);
		state.internal = {
			...state.internal,
			[`S3.Bucket.${resource.Name}.property.${paramName}.param`]: false
		};
	},
	ADD_RESOURCE_ATTRIBUTE(state, { paramName, resource }) {
		console.log('NAME: ', `${resource.Name}${paramName}`);
		state.template = state.template.set(
			`${resource.Name}.${paramName}`,
			resource.Properties[paramName]
		);
		state.internal = {
			...state.internal,
			[`S3.Bucket.${resource.Name}.property.${paramName}`]: true
		};
	},
	REMOVE_RESOURCE_ATTRIBUTE(state, { paramName, resource }) {
		console.log('REMOVING NAME: ', `${resource.Name}${paramName}`);
		state.template = state.template.set(`${resource.Name}.${paramName}`, '');
		state.internal = {
			...state.internal,
			[`S3.Bucket.${resource.Name}.property.${paramName}`]: false
		};
	},
	LINK_RESOURCE_ATTRIBUTE(state, { resource, attribute, linkTarget }) {
		console.log(
			'Linking resource attribute: ',
			`${resource}${attribute} to ${linkTarget}`
		);
		console.log('linkTarget: ', linkTarget);
		let link = linkTarget;
		if (linkTarget === 'N/A') {
			console.log('Got N/A');
			link = undefined;
			state.template = state.template.set(
				`${resource}.${attribute}`,
				state.internal[`S3.Bucket.${resource}.property.${attribute}.original`]
			);
		} else if (state.template.Parameters[linkTarget]) {
			console.log('Param found... ', state.template.Parameters[linkTarget]);
			state.internal = {
				...state.internal,
				[`S3.Bucket.${resource}.property.${attribute}.original`]: state.template
					.Resources[resource].Properties[attribute]
			};
			state.template = state.template.set(
				`${resource}.${attribute}`,
				Ref(linkTarget)
			);
		}
		state.internal = {
			...state.internal,
			[`S3.Bucket.${resource}.property.${attribute}.link`]: link
		};
	}
};

const actions = {};

export default {
	state,
	mutations,
	actions
};
