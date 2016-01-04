/**
 * Created by arming on 1/3/16.
 */
'use strict';

var m = require('mithril');
var _ = require('lodash');

var PanelComponent = {
	controller: function(options) {
		resource: options.resource
	},
	view: function(controller) {
		return m('div', { class: colSizeString },[
			[m('.panel.panel-warning', [
				m('.panel-heading', [
					m('h3.panel-title', [
						m('input[type=checkbox]', {
							checked: controller.resource.inTemplate,
							name: controller.resource.id,
							onclick: m.withAttr('checked', function() {
								controller.log('Checked ' + controller.resource);
								if(controller.resource.inTemplate) {
									removeFromTemplate({resource: controller.resource, key: key, subKey: subKey});
								} else {
									addToTemplate({resource: controller.resource, key: key, subKey: subKey});
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
								//name: controller.resource.id,
								onclick: m.withAttr('checked', function() {
									controller.log('Checked ' + controller.resource);
									toggleParamInTemplate({resource: controller.resource, key: key, subKey: subKey, pKey: pKey });
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
									//m('b', {title: pKey, config: controller.addTooltip }, _.trunc(pKey,15))
									m('b', {title: pKey, config: controller.addTooltip }, pKey)
								]),
								m('td.col-xs-7', [
									//m('span[data-toggle="tooltip"][data-placement="top"]', {title: pVal, config: controller.addTooltip }, _.trunc(pVal, 30))
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
