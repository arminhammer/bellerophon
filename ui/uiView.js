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

ipcRenderer.send('update-resources', 'AWS_EC2_VPC');
ipcRenderer.send('update-resources', "AWS_EC2_SUBNET");
ipcRenderer.send('update-resources', "AWS_EC2_SECURITYGROUP");

ipcRenderer.on('update-resources', function(event, res) {
	m.startComputation();
	log('Updating resources');
	resources(res);
	console.log('Updating resources');
	console.log(resources());
	m.endComputation();
});

ipcRenderer.on('get-resource-reply', function(event, res) {
	//console.log('Adding resources');
	m.startComputation();
	var params = {};
	switch(res.type) {
		case "AWS::EC2::VPC":
			params = { resBlock: res.Vpcs, constructor: Resource.AWS_EC2_VPC, name: "VpcId", targetBlock: resources.EC2.VPC };
			break;
		case "AWS::EC2::SUBNET":
			params = { resBlock: res.Subnets, constructor: Resource.AWS_EC2_SUBNET, name: "SubnetId", targetBlock: resources.EC2.Subnet };
			break;
		case "AWS::EC2::SECURITYGROUP":
			params = { resBlock: res.SecurityGroups, constructor: Resource.AWS_EC2_SECURITYGROUP, name: "GroupId", targetBlock: resources.EC2.SecurityGroup };
			break;
		default:
			console.log('Resource type not found.');
			break;
	}
	params.resBlock.forEach(function(r) {
		var newResource = new params.constructor(r[params.name], r);
		newResource.toggleInTemplate = function(setting) {
			newResource.inTemplate(setting);
			if(setting) {
				addToTemplate(newResource);
			} else {
				removeFromTemplate(newResource);
			}
		};
		params.targetBlock.push(newResource);
	});
	m.endComputation();
});

function openTemplateWindow() {
	ipcRenderer.send('open-template-window');
}

var uiView = {
	controller: function() {
		this.resources = resources;
		this.openTemplateWindow = openTemplateWindow;
	},
	view: function(controller) {
		return m(".container-fluid", [
			m(".navbar.navbar-fixed-top", [
				m(".container", [
					m(".navbar-header", [
						m("a.navbar-brand[href='#']", "Bellerophon"),
						m("button.btn.btn-success.navbar-btn.navbar-right.pull-right#templateButton", { onclick: controller.openTemplateWindow }, "Show Template")
					])
				])
			]),
			m(".row.MainContent", [
				m("nav.col-xs-3.bs-docs-sidebar", [
					m("ul.nav.nav-stacked.fixed[id='sidebar']", [
						_.map(controller.resources(), function(resource, key) {
							return m("li", [
								m("a[href='#" + key + "']", key),
								m("ul.nav.nav-stacked", [
									_.map(controller.resources()[key], function(subResource, subKey) {
										if(Object.keys(controller.resources()[key][subKey]).length > 0) {
											return m("li", [m("a[href='#" + key + subKey + "']", subKey)])
										}
									})
								])
							])
						})
					])
				]),
				m(".col-xs-9", [
					_.map(controller.resources(), function(group, key) {
						return	m('.row', [
							m(".group[id='" + key + "']", [
								m("h3", key),
								_.map(controller.resources()[key], function(subResource, subKey) {
									if(Object.keys(controller.resources()[key][subKey]).length > 0) {
										return m('.row', [
											m(".col-xs-12", [
												m(".subgroup[id='" + key + subKey + "']", [
													m("h4", subKey),
													_.map(controller.resources()[key][subKey], function (resource) {
														return m('div', [
															m(".col-xs-12.col-md-6.col-lg-4", [
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
																				resource.id
																			])
																		]),
																		m(".panel-body", [
																			m('table.table', [
																				m('tr', [
																					m('th', 'Param.'),
																					m('th', 'Name'),
																					m('th', 'Value')
																				]),
																				_.map(resource.body, function(pVal, pKey) {
																					return m('tr', [
																						m('td', [
																							m("input[type=checkbox]", {
																								checked: resource.templateParams[pKey],
																								//name: resource.id,
																								onclick: m.withAttr("checked", function() {
																									log('Checked ' + resource);
																									toggleParamInTemplate({resource: resource, key: key, subKey: subKey, pKey: pKey });
																									//if(resource.templateParams[pKey]) {} else {
																									//	addParamToTemplate({resource: resource, key: key, subKey: subKey});
																									//}
																								})
																							})
																						]),
																						m('td', [
																							m('b', pKey)
																						]),
																						m('td', [
																							m('i', pVal)
																						])
																					])
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
