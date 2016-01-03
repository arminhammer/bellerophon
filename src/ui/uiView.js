/**
 * Created by arminhammer on 11/18/15.
 */

'use strict';

var m = require('mithril');

// In renderer process (web page).
var ipcRenderer = require('electron').ipcRenderer;

var SidebarComponent = require('./sidebarcomponent');
var ResourceComponent = require('./resourcecomponent');

var log = function(msg, level) {
	if(!level) {
		level = 'info';
	}
	ipcRenderer.send('send-log', { from: 'UI:', level: level, msg: msg });
};

log('Initialized UI.');

var resources = m.prop({
	AutoScaling: {}
	//EC2: {}
});

console.log('Redrawing...');
m.redraw(true);

function updateResource(primary, secondary) {
	m.startComputation();
	ipcRenderer.send('update-resource', { primary: primary, secondary: secondary});
}

function updateResources() {
	m.startComputation();
	ipcRenderer.send('update-resources');
}

//updateResources();


//updateResource('AutoScaling','AutoScalingGroup');
//updateResource('AutoScaling','LaunchConfiguration');
//updateResource('AutoScaling','ScalingPolicy');
//updateResource('AutoScaling','ScheduledAction');
/*
//ipcRenderer.send('update-resource', { primary: 'AutoScaling', secondary: 'LaunchConfiguration'});
 ipcRenderer.send('update-resource', { primary: 'AutoScaling', secondary: 'AutoScalingGroup'});
 ipcRenderer.send('update-resource', { primary: 'AutoScaling', secondary: 'LaunchConfiguration'});
 ipcRenderer.send('update-resource', { primary: 'AutoScaling', secondary: 'ScalingPolicy'});
 ipcRenderer.send('update-resource', { primary: 'AutoScaling', secondary: 'ScheduledAction'});


//ipcRenderer.send('update-resource', { primary: 'AutoScaling', secondary: 'LifecycleHook'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'CustomerGateway'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'DHCPOptions'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'EIP'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'Instance'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'InternetGateway'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'NetworkAcl'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'NetworkInterface'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'PlacementGroup'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'RouteTable'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'SecurityGroup'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'SpotFleet'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'Subnet'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'Volume'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'VPC'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'VPCEndpoint'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'VPCPeeringConnection'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'VPNConnection'});
ipcRenderer.send('update-resource', { primary: 'EC2', secondary: 'VPNGateway'});
*/

ipcRenderer.send('update-resources');


ipcRenderer.on('update-resources', function(event, res) {
	//m.startComputation();
	console.log('Updating resources');
	console.log(resources());
	resources(res);
	console.log('Updated resources');
	m.redraw();
	//m.endComputation();
});

var uiView = {
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

m.mount(document.body,uiView);
