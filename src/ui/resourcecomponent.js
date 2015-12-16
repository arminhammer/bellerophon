/**
 * Created by arminhammer on 12/13/15.
 */
'use strict';

var m = require('mithril');
var _ = require('lodash');
var ipcRenderer = require('electron').ipcRenderer;

function addToTemplate(resourceReq) {
	ipcRenderer.send('add-to-template-request', resourceReq);
}

function removeFromTemplate(resourceReq) {
	ipcRenderer.send('remove-from-template-request', resourceReq);
}

function toggleParamInTemplate(paramReq) {
	ipcRenderer.send('toggle-param', paramReq);
}

function addTooltip(element, isInitialized) {
	if(isInitialized) {
		return;
	}
	$(element).tooltip();
}

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
		this.resources = options.resources;
		this.addTooltip = addTooltip;
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
												var colSizeString = 'col-xs-12 col-md-6 col-lg-4';
												return m('div', { class: colSizeString },[
													[m('.panel.panel-warning', [
														m('.panel-heading', [
															m('h3.panel-title', [
																m('input[type=checkbox]', {
																	checked: resource.inTemplate,
																	name: resource.id,
																	onclick: m.withAttr('checked', function() {
																		controller.log('Checked ' + resource);
																		if(resource.inTemplate) {
																			removeFromTemplate({resource: resource, key: key, subKey: subKey});
																		} else {
																			addToTemplate({resource: resource, key: key, subKey: subKey});
																		}
																	})
																}),
																m('span[data-toggle="tooltip"][data-placement="left"]', {title: resource.id, config: controller.addTooltip }, _.trunc(resource.id,40))
															])
														]),
														m('.panel-body', [
															m('table.table.table-condensed', [
																m('tr', [
																	m('th.col-xs-2', 'Param.'),
																	m('th.col-xs-3', 'Name'),
																	m('th.col-xs-7', 'Value')
																]),
																_.map(resource.body, function(pVal, pKey) {
																	if(_.isObject(pVal)) {
																		pVal = JSON.stringify(pVal, null, 2);
																	}
																	var paramCheckbox = m('input[type=checkbox]', {
																		checked: resource.templateParams[pKey],
																		//name: resource.id,
																		onclick: m.withAttr('checked', function() {
																			controller.log('Checked ' + resource);
																			toggleParamInTemplate({resource: resource, key: key, subKey: subKey, pKey: pKey });
																		})
																	});
																	if((resource.block.Properties[pKey]) != 'String') {
																		paramCheckbox = m('div')
																	}
																	return m('tr', [
																		m('td.col-xs-2', [
																			paramCheckbox
																		]),
																		m('td.col-xs-3', [
																			//m('b', {title: pKey, config: controller.addTooltip }, _.trunc(pKey,15))
																			m('b', {title: pKey, config: controller.addTooltip }, pKey)
																		]),
																		m('td.col-xs-7', [
																			//m('span[data-toggle="tooltip"][data-placement="top"]', {title: pVal, config: controller.addTooltip }, _.trunc(pVal, 30))
																			m('span[data-toggle="tooltip"][data-placement="left"]', {title: pVal, config: controller.addTooltip }, pVal)
																		])
																	])
																})
															])
														])
													])]
												])
											})
										])
									])
								])
							}
						})
					])
				])
			})
		])
	}
};

module.exports = ResourceComponent;
