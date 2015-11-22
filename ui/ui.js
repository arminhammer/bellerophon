/**
 * Created by arminhammer on 11/18/15.
 */
console.log('Loaded!');
var P = require('bluebird');

//var $ = jQuery= require('jquery');
//window.$ = $;
//var bootstrap = require('bootstrap');

//require('../node_modules/bootstrap/js/affix');
//require('../node_modules/bootstrap/js/scrollspy');

var m = require('mithril');
var _ = require('lodash');


//var ipcRenderer = P.promisifyAll(require('electron').ipcRenderer);

// In renderer process (web page).
var ipcRenderer = require('electron').ipcRenderer;
//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

var vpcs = m.prop([]);

var Resource = function(name, body) {
	var self = this;
	self.name = name;
	self.body = body;
	self.inTemplate = m.prop(false);
	self.toggleInTemplate = function(setting) {
		console.log('toggled ' + setting);
		self.inTemplate(setting);
	}
};

var resources = {
	Autoscaling: {
		AutoScalingGroup: [],
		LaunchConfiguration: [],
		LifecycleHook: [],
		ScalingPolicy: [],
		ScheduledAction: []
	},
	EC2: {
		/*
		CustomerGateway : [],
		DHCPOptions : [],
		EIP : [],
		EIPAssociation : [],
		Instance : [],
		InternetGateway : [],
		NetworkAcl : [],
		NetworkAclEntry : [],
		NetworkInterface : [],
		NetworkInterfaceAttachment : [],
		PlacementGroup : [],
		Route : [],
		RouteTable : [],
		*/
		SecurityGroup : [],
		/*
		SecurityGroupEgress : [],
		SecurityGroupIngress : [],
		SpotFleet : [],
		*/
		Subnet : [],
		/*
		SubnetNetworkAclAssociation : [],
		SubnetRouteTableAssociation : [],
		Volume : [],
		VolumeAttachment : [],
		*/
		VPC : []
		/*
		VPCDHCPOptionsAssociation : [],
		VPCEndpoint : [],
		VPCGatewayAttachment : [],
		VPCPeeringConnection : [],
		VPNConnection : [],
		VPNConnectionRoute : [],
		VPNGateway : [],
		VPNGatewayRoutePropagation : []
		*/
	}
	//vpcs: []
};

//console.log('Resources before');
//console.log(resources.vpcs);

ipcRenderer.on('vpc-reply', function(event, res) {
	m.startComputation();
	res.Vpcs.forEach(function(vpc) {
		resources.EC2.VPC.push(new Resource(vpc.VpcId, vpc));
	});
	m.endComputation();
	console.log('Added VPCs!');
	console.log(resources.EC2.VPC);
});

ipcRenderer.send('vpc-request');

var ui = {
	controller: function() {
		this.resources = resources;
	},
	view: function(controller) {
		return m(".container", [
			m(".navbar.navbar-fixed-top", [
				m(".container", [
					m(".navbar-header", [
						m("a.navbar-brand[href='#']", "Bellerophon")
					])
				])
			]),
			m(".row.MainContent", [
				m("nav.col-xs-3.bs-docs-sidebar", [
					m("ul.nav.nav-stacked.fixed[id='sidebar']", [
						_.map(controller.resources, function(resource, key) {
							return m("li", [
								m("a[href='#" + key + "']", key),
								m("ul.nav.nav-stacked", [
									_.map(controller.resources[key], function(subResource, subKey) {
										return m("li", [m("a[href='#" + key + subKey + "']", subKey)])
									})
								])
							])
						})
					])
				]),
				m(".col-xs-9", [
					_.map(controller.resources, function(group, key) {
						return m("section.group[id='" + key + "']", [
							m("h3", key),
							_.map(controller.resources[key], function(subResource, subKey) {
								return m(".subgroup[id='" + key + subKey + "']", [
									m("h4", subKey),
									_.map(controller.resources[key][subKey], function(resource) {
										return m('div', [
											m("input[type=checkbox]", { checked: resource.inTemplate(), name: resource.name, onclick: m.withAttr("checked", resource.toggleInTemplate ) }),
											resource.name
										])
									})
								])
							})
						])
					})
				])
			]),
			"\n"
		])
		/*
		 return ('div', [
		 m('p', 'VPCs'),
		 m('div', [
		 controller.resources.vpcs.map(function(vpc) {
		 console.log(vpc.name);
		 console.log(vpc.inTemplate());
		 //console.log(vpc);
		 return m('div', [
		 m('p', [
		 m("input[type=checkbox]", { checked: vpc.inTemplate(), name: vpc.name, onclick: m.withAttr("checked", vpc.toggleInTemplate ) }),
		 vpc.name
		 ])
		 ])
		 })
		 ])
		 ])*/
	}
};

m.mount(document.body,ui);
