/**
 * Created by arminhammer on 11/18/15.
 */

'use strict';

var m = require('mithril');

var SidebarComponent = require('./sidebarcomponent');
var ResourceComponent = require('./resourcecomponent');

//log('Initialized UI.');

var resources = m.prop();

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

var ipcRenderer = null;

function getIPCRenderer() {
	if(!ipcRenderer) {
		console.log('No ipcRenderer');
		ipcRenderer = require('electron').ipcRenderer;
		ipcRenderer.on('update-resources', function(event, res) {
			m.startComputation();
			log('Updating resources');
			//log(resources());
			resources(res);
			console.log('Updated resources');
			log('Updated resources');
			console.log(resources());
			m.endComputation();
			m.redraw();
		});
	}
	return ipcRenderer;
}

var log = function(msg, level) {
	if(!level) {
		level = 'info';
	}
	getIPCRenderer().send('send-log', { from: 'UI:', level: level, msg: msg });
};

var PageView = {

	controller: function() {
		this.resourceName = m.route.param('resourceName');
		console.log('Hit ' + this.resourceName);
		console.log('RESOURCES');
		console.log(resources());
		if(resources()) {
			console.log('YES RES');
			this.resources = resources;
		} else {
			console.log('NO RES');
			if(!this.resourceName) this.resourceName = 'AutoScaling';
			getIPCRenderer().send('update-resource', { primary: this.resourceName });
			this.resources = resources;
		}
		/*if(resources()) {
			console.log('resources() found');
			if(resourceName) {
				this.resources = resources()[resourceName]
			} else {
				this.resources = resources()['AutoScaling'];
			}
		} else {
			this.resources = resources();
		}*/
		this.log = log;
	},
	view: function(controller) {
		//console.log('Hitting PageView view');
		return m('.container-fluid', [
			m('.row.MainContent', [
				m.component(SidebarComponent, { resources: controller.resources }),
				m.component(ResourceComponent, { resources: controller.resources, log: controller.log, resourceName: controller.resourceName })
			])
		])
	}
};

m.route(document.body, '/', {
	'/': PageView,
	'/:resourceName': PageView
});
//m.mount(document.body,UiView);

module.exports = PageView;
