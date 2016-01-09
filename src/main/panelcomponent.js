/**
 * Created by arming on 1/3/16.
 */
'use strict';

var m = require('mithril');
var _ = require('lodash');

var PanelComponent = {
	controller: function(options) {
		var self = this;
		self.ipcRenderer = require('electron').ipcRenderer;
		self.resource = options.resource;
		self.log = options.log;
		self.key = options.key;
		self.subKey = options.subKey;
		self.addTooltip = function(element, isInitialized) {
			if(isInitialized) {
				return;
			}
			$(element).tooltip();
		};
		self.addToTemplate = function(resourceReq) {
			self.ipcRenderer.send('add-to-template-request', resourceReq);
		};
		self.removeFromTemplate = function(resourceReq) {
			self.ipcRenderer.send('remove-from-template-request', resourceReq);
		};
		self.toggleParamInTemplate = function(paramReq) {
			self.ipcRenderer.send('toggle-param', paramReq);
		};
	},
	view: function(controller) {
		console.log(controller.resource);
		return m('div', { class: 'col-xs-12 col-md-6 col-lg-4' },[
			[m('.panel.panel-warning', [
				m('.panel-heading', [
					m('h3.panel-title', [
						m('input[type=checkbox]', {
							checked: controller.resource.inTemplate,
							name: controller.resource.id,
							onclick: m.withAttr('checked', function(check) {
								controller.log('Checked ' + check);
								if(check) {
									controller.addToTemplate({resource: controller.resource, key: controller.key, subKey: controller.subKey});
								} else {
									controller.removeFromTemplate({resource: controller.resource, key: controller.key, subKey: controller.subKey});
								}
							})
						}),
						m('span[data-toggle="tooltip"][data-placement="left"]', {title: controller.resource.id, config: controller.addTooltip }, _.trunc(controller.resource.id,40))
					])
				]),
				m('.panel-body', [
					m('table.table.table-condensed', [
						m('tr', [
							m('th.col-xs-2', 'Param.'),
							m('th.col-xs-3', 'Name'),
							m('th.col-xs-7', 'Value')
						]),
						_.map(controller.resource.body, function(pVal, pKey) {
							var formattedPVal = pVal;
							if(_.isObject(pVal)) {
								formattedPVal = JSON.stringify(pVal, null, '');
								pVal = JSON.stringify(pVal, null, '');
							}
							var paramCheckbox = m('input[type=checkbox]', {
								checked: controller.resource.templateParams[pKey],
								onclick: m.withAttr('checked', function() {
									controller.log('Checked ' + controller.resource);
									controller.toggleParamInTemplate({resource: controller.resource, key: controller.key, subKey: controller.subKey, pKey: pKey });
								})
							});
							if((controller.resource.block.Properties[pKey]) != 'String') {
								paramCheckbox = m('div')
							}
							return m('tr', [
								m('td.col-xs-2', [
									paramCheckbox
								]),
								m('td.col-xs-3', [
									m('b', {title: pKey, config: controller.addTooltip }, pKey)
								]),
								m('td.col-xs-7', [
									m('span[data-toggle="tooltip"][data-placement="left"]', {title: pVal, config: controller.addTooltip }, formattedPVal)
								])
							])

						})
					])
				])
			])]
		])
	}
};

module.exports = PanelComponent;
