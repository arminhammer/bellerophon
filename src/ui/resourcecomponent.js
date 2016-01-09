/**
 * Created by arminhammer on 12/13/15.
 */
'use strict';

var m = require('mithril');
var _ = require('lodash');
var PanelComponent = require('./panelcomponent');

function formatTitle(title) {
	if(_.endsWith(title,'ay')) {
		return _.startCase(title + 's');
	} else if(_.endsWith(title,'y')) {
		return _.startCase(title.substring(0, title.length - 1) + 'ies');
	} else if(_.endsWith(title,'s')) {
		return _.startCase(title);
	} else if(title === title.toUpperCase()) {
		return title + 's';
	} else {
		return _.startCase(title + 's');
	}
}

var ResourceComponent = {
	controller: function (options) {
		//console.log(options.resources);
		this.resources = options.resources;
		this.resourceName = options.resourceName;
		this.log = options.log;
	},
	view: function (controller) {
		/*if (!controller.resources) {
			return m('.col-xs-9 .col-md-10 .col-lg-10', [
				m('.group', [
					m('.row', [
						m('.col-xs-12', [
							m('.subgroup', [
								m('p', 'Loading...')
							])
						])
					])
				])
			])
		}
		else {*/
			return m('.col-xs-9 .col-md-10 .col-lg-10', [
				_.map(controller.resources(), function (group, key) {
					//console.log('KEY');
					//console.log(key);
					if(key === controller.resourceName()) {
						return m('.row', [
							m('.group[id="' + key + '"]', [
								m('h3', key),
								_.map(controller.resources()[key], function (subResource, subKey) {
									var subKeySize = Object.keys(controller.resources()[key][subKey]).length;
									if (subKeySize > 0) {
										//console.log(controller.resources()[key][subKey]);
										return m('.row', [
											m('.col-xs-12', [
												m('.subgroup[id="' + key + subKey + '"]', [
													m('h4', formatTitle(subKey)),
													_.map(controller.resources()[key][subKey], function (resource) {
														//console.log('Rendering ' + controller.resources()[key][subKey] + ': ' + resource.id);
														return m.component(PanelComponent, {
															resource: resource,
															log: controller.log,
															key: key,
															subKey: subKey
														})
													})
												])
											])
										])
									}
								})
							])
						])
					}
				})
			])
		//}
	}
};

module.exports = ResourceComponent;
