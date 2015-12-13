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

log('Initialized UI.');

var resources = m.prop({});

ipcRenderer.send('update-resources', { primary: 'AutoScaling', secondary: 'AutoScalingGroup'});
ipcRenderer.send('update-resources', { primary: 'AutoScaling', secondary: 'LaunchConfiguration'});
ipcRenderer.send('update-resources', { primary: 'AutoScaling', secondary: 'ScalingPolicy'});
ipcRenderer.send('update-resources', { primary: 'AutoScaling', secondary: 'ScheduledAction'});
//ipcRenderer.send('update-resources', { primary: 'AutoScaling', secondary: 'LifecycleHook'});

ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'CustomerGateway'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'DHCPOptions'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'EIP'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'Instance'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'InternetGateway'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'NetworkAcl'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'NetworkInterface'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'PlacementGroup'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'RouteTable'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'SecurityGroup'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'SpotFleet'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'Subnet'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'Volume'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'VPC'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'VPCEndpoint'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'VPCPeeringConnection'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'VPNConnection'});
ipcRenderer.send('update-resources', { primary: 'EC2', secondary: 'VPNGateway'});
/**/

ipcRenderer.on('update-resources', function(event, res) {
	m.startComputation();
	log('Updating resources');
	resources(res);
	log('Updating resources');
	log(resources());
	m.endComputation();
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
