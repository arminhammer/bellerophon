'use strict';

var m = require('mithril');
var _ = require('lodash');
var ipcRenderer = require('electron').ipcRenderer;

function openTemplateWindow() {
	ipcRenderer.send('open-template-window');
}

function openSaveDialog() {
	ipcRenderer.send('open-save-dialog');
}

function refreshResources() {
	ipcRenderer.send('refresh-resources');
}

var SideBarComponent = {
	controller: function(options) {
		this.resources = options.resources;
		this.openTemplateWindow = openTemplateWindow;
		this.openSaveDialog = openSaveDialog;
		this.refreshResources = refreshResources;
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
				})
				/*m('div', [
					m('select', { class: 'form-control' }, [
						m('option', 'us-east-1'),
						m('option', 'us-west-1')
					])
				])*/
			])
		])
	}
};

module.exports = SideBarComponent;
