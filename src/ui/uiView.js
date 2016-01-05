/**
 * Created by arminhammer on 11/18/15.
 */

'use strict';

var m = require('mithril');
var ipcRenderer = require('electron').ipcRenderer;

var SidebarComponent = require('./sidebarcomponent');
var ResourceComponent = require('./resourcecomponent');

var log = function(msg, level) {
	if(!level) {
		level = 'info';
	}
	ipcRenderer.send('send-log', { from: 'UI:', level: level, msg: msg });
};

//log('Initialized UI.');

var resources = m.prop();

ipcRenderer.send('update-resources');

ipcRenderer.on('update-resources', function(event, res) {
	//m.startComputation();
	log('Updating resources');
	log(resources());
	resources(res);
	log('Updated resources');
	m.redraw();
	//m.endComputation();
});

var UiView = {
	controller: function() {
		this.resources = resources;
		this.log = log;
	},
	view: function(controller) {
		return m('.container-fluid', [
			m('.row.MainContent', [
				m.component(SidebarComponent, { resources: controller.resources }),
				m.component(ResourceComponent, { resources: controller.resources, log: controller.log })
			])
		])
	}
};

m.mount(document.body,UiView);

module.exports = UiView;
