/**
 * Created by arminhammer on 11/18/15.
 */

"use strict";

console.log('Loaded!');
//var P = require('bluebird');

var m = require('mithril');
var _ = require('lodash');

// In renderer process (web page).
var ipcRenderer = require('electron').ipcRenderer;

var SidebarComponent = require('./sidebar');

var log = function(msg, level) {
	if(!level) {
		level = 'info';
	}
	ipcRenderer.send('send-log', { from: 'UI:', level: level, msg: msg });
};

log('Initialized UI.');

function addToTemplate(resourceReq) {
	ipcRenderer.send('add-to-template-request', resourceReq);
}

function removeFromTemplate(resourceReq) {
	ipcRenderer.send('remove-from-template-request', resourceReq);
}

function toggleParamInTemplate(paramReq) {
	ipcRenderer.send('toggle-param', paramReq);
}

var resources = m.prop({});

ipcRenderer.send('update-resources', { primary: 'AutoScaling', secondary: 'AutoScalingGroup'});
ipcRenderer.send('update-resources', { primary: 'AutoScaling', secondary: 'LaunchConfiguration'});
ipcRenderer.send('update-resources', { primary: 'AutoScaling', secondary: 'ScalingPolicy'});
ipcRenderer.send('update-resources', { primary: 'AutoScaling', secondary: 'ScheduledAction'});
//ipcRenderer.send('update-resources', { primary: 'AutoScaling', secondary: 'LifecycleHook'});

ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'CustomerGateway'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'DHCPOptions'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'EIP'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'Instance'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'InternetGateway'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'NetworkAcl'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'NetworkInterface'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'PlacementGroup'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'RouteTable'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'SecurityGroup'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'SpotFleet'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'Subnet'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'Volume'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'VPC'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'VPCEndpoint'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'VPCPeeringConnection'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'VPNConnection'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'VPNGateway'});
/**/

ipcRenderer.on('update-resources', function(event, res) {
	m.startComputation();
	log('Updating resources');
	resources(res);
	console.log('Updating resources');
	console.log(resources());
	m.endComputation();
});

function openTemplateWindow() {
	ipcRenderer.send('open-template-window');
}

function openSaveDialog() {
	ipcRenderer.send('open-save-dialog');
}

var uiView = {
	controller: function() {
		this.resources = resources;
		this.openTemplateWindow = openTemplateWindow;
		this.openSaveDialog = openSaveDialog;
		this.addTooltip = function(element, isInitialized, context) {
			if(isInitialized) {
				return;
			}
			$(element).tooltip();
		}
	},
	view: function(controller) {
		return m(".container-fluid", [
			m(".row.MainContent", [
				m.component(SidebarComponent, { resources: controller.resources, openTemplateWindow: controller.openTemplateWindow, openSaveDialog: controller.openSaveDialog }),
				m(".col-xs-9 .col-md-10 .col-lg-10", [
					_.map(controller.resources(), function(group, key) {
						return	m('.row', [
							m(".group[id='" + key + "']", [
								m("h3", key),
								_.map(controller.resources()[key], function(subResource, subKey) {
									var subKeySize = Object.keys(controller.resources()[key][subKey]).length;
									if(subKeySize > 0) {
										return m('.row', [
											m(".col-xs-12", [
												m(".subgroup[id='" + key + subKey + "']", [
													m("h4", subKey + 's'),
													_.map(controller.resources()[key][subKey], function (resource) {
														var colSizes = { xs: 12, md: 6, lg: 4};
														var colSizeString = 'col-xs-' + colSizes.xs + ' col-md-' + colSizes.md + ' col-lg-' + colSizes.lg;
														return m('div', [
															m("div", { class: colSizeString },[
																m('div', [
																	[m(".panel.panel-warning", [
																		m(".panel-heading", [
																			m("h3.panel-title", [
																				m("input[type=checkbox]", {
																					checked: resource.inTemplate,
																					name: resource.id,
																					onclick: m.withAttr("checked", function() {
																						log('Checked ' + resource);
																						if(resource.inTemplate) {
																							removeFromTemplate({resource: resource, key: key, subKey: subKey});
																						} else {
																							addToTemplate({resource: resource, key: key, subKey: subKey});
																						}
																					})
																				}),
																				m("span[data-toggle='tooltip'][data-placement='top']", {title: resource.id, config: controller.addTooltip }, _.trunc(resource.id,40))
																			])
																		]),
																		m(".panel-body", [
																			m('table.table.table-condensed', [
																				m('tr', [
																					m('th.col-xs-1', 'Param.'),
																					m('th.col-xs-3', 'Name'),
																					m('th.col-xs-8', 'Value')
																				]),
																				_.map(resource.body, function(pVal, pKey) {
																					if(_.isObject(pVal)) {
																						pVal = JSON.stringify(pVal, null, 2);
																					}
																					var paramCheckbox = m("input[type=checkbox]", {
																						checked: resource.templateParams[pKey],
																						//name: resource.id,
																						onclick: m.withAttr("checked", function() {
																							log('Checked ' + resource);
																							toggleParamInTemplate({resource: resource, key: key, subKey: subKey, pKey: pKey });
																							//if(resource.templateParams[pKey]) {} else {
																							//	addParamToTemplate({resource: resource, key: key, subKey: subKey});
																							//}
																						})
																					});
																					if((resource.block.Properties[pKey]) != "String") {
																						paramCheckbox = m('div')
																					}
																					if(pVal != '') {
																						return m('tr', [
																							m('td.col-xs-1', [
																								paramCheckbox
																							]),
																							m('td.col-xs-3', [
																								m('b', {title: pKey, config: controller.addTooltip }, _.trunc(pKey,15))
																							]),
																							m('td.col-xs-8', [
																								m("i[data-toggle='tooltip'][data-placement='top']", {title: pVal, config: controller.addTooltip }, _.trunc(pVal,20))
																							])
																						])
																					}
																				})
																			])
																		])
																	])]
																])
															])
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
			])
		])
	}
};

m.mount(document.body,uiView);
