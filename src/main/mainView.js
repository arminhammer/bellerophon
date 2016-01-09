/**
 * Created by arminhammer on 11/18/15.
 */

'use strict';

var m = require('mithril');

var SidebarComponent = require('./sidebarcomponent');
var ResourceComponent = require('./resourcecomponent');

var MainView = {

	controller: function() {
		var self = this;
		self.resourceName = m.prop('AutoScaling');
		self.resources = m.prop();
		self.ipcRenderer = require('electron').ipcRenderer;
		self.log = function(msg, level) {
			if(!level) {
				level = 'info';
			}
			self.ipcRenderer.send('send-log', { from: 'UI:', level: level, msg: msg });
		};
		self.ipcRenderer.on('update-resources', function(event, res) {
			m.startComputation();
			self.log('Updating resources');
			self.resources(res.resources);
			self.resourceName(res.primary);
			self.log('Updated resources');
			m.endComputation();
		});
		self.ipcRenderer.send('update-resource', { primary: self.resourceName() });
	},
	view: function(controller) {
		return m('.container-fluid', [
			m('.row.MainContent', [
				m.component(SidebarComponent, { resources: controller.resources, resourceName: controller.resourceName }),
				m.component(ResourceComponent, { resources: controller.resources, log: controller.log, resourceName: controller.resourceName })
			])
		])
	}
};

m.mount(document.body,MainView);

module.exports = MainView;
