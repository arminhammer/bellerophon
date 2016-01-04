/**
 * Created by arminhammer on 12/13/15.
 */
'use strict';

var m = require('mithril');
var _ = require('lodash');
var PanelComponent = require('./panelcomponent');

function formatTitle(title) {
	console.log('formatTitle');
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
		this.resources = options.resources;
		this.log = options.log;
	},
	view: function (controller) {
		return m('.col-xs-9 .col-md-10 .col-lg-10', [
			_.map(controller.resources(), function(group, key) {
				return	m('.row', [
					m('.group[id="' + key + '"]', [
						m('h3', key),
						_.map(controller.resources()[key], function(subResource, subKey) {
							var subKeySize = Object.keys(controller.resources()[key][subKey]).length;
							if(subKeySize > 0) {
								return m('.row', [
									m('.col-xs-12', [
										m('.subgroup[id="' + key + subKey + '"]', [
											m('h4', formatTitle(subKey)),
											_.map(controller.resources()[key][subKey], function (resource) {
												return m.component(PanelComponent, { resource: resource })
											})
										])
									])
								])
							}
						})
					]),
				])
			})
		])
	}
};

module.exports = ResourceComponent;
