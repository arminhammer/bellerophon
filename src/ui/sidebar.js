'use strict';

var m = require('mithril');
var _ = require('lodash');

var SideBarComponent = {
	controller: function(options) {
		this.resources = options.resources;
		this.openTemplateWindow = options.openTemplateWindow;
		this.openSaveDialog = options.openSaveDialog;
	},
	view: function(controller) {
		return m('nav.col-xs-3.bs-docs-sidebar .col-md-2 .col-lg-2', [
			m('ul.nav.nav-stacked.fixed[id="sidebar"]', [
				_.map(controller.resources(), function(resource, key) {
					return m('li', [
						m('a[href="#' + key + '"]', key),
						m('ul.nav.nav-stacked', [
							_.map(controller.resources()[key], function(subResource, subKey) {
								if(Object.keys(controller.resources()[key][subKey]).length > 0) {
									return m('li', [m('a[href="#' + key + subKey + '"]', subKey)])
								}
							})
						])
					])
				}),
				m('div', [
					m('button.btn.btn-warning#templateButton', { onclick: controller.openTemplateWindow }, 'Show Template')
				]),
				m('div', [
					m('button.btn.btn-warning#templateButton', { onclick: controller.openSaveDialog }, 'Save Template')
				])
			])
		])
	}
};

module.exports = SideBarComponent;
