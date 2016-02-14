'use strict';

var m = require('mithril');
var _ = require('lodash');

var SideBarComponent = {
	controller: function(options) {
		this.resources = options.resources;
		this.ipcRenderer = require('electron').ipcRenderer;
		this.changeResource = function(key) {
			//this.resources(null);
			this.ipcRenderer.send('update-resource', { primary: key })
		};
		this.resourceName = options.resourceName;
	},
	view: function(controller) {
		return m('nav.col-xs-3.bs-docs-sidebar .col-md-2 .col-lg-2', [
			m('ul.nav.nav-stacked.fixed[id="sidebar"]', [
				m('li', [
					m('#logoHeader', [
						m('img', { id: 'bellerophonLogo', src: '../icons/bellerophon.svg', height: 50 }),
						m('span', 'Bellerophon')
					])
				]),
				_.map(controller.resources(), function(resource, key) {
					return m('li', {
						onclick: function () {
							controller.changeResource(key)
						}
					}, [
						m('a[href="#' + key + '"]', key),
						m('ul.nav.nav-stacked', [
							_.map(controller.resources()[key].types, function (subResource, subKey) {
								if(key === controller.resourceName()) {

									if (Object.keys(controller.resources()[key].types[subKey]).length > 0) {
										return m('li', [m('a[href="#' + key + subKey + '"]', subKey)])
									}
								}
							})
						])
					])
				})
			])
		])
	}
};

module.exports = SideBarComponent;
