'use strict';
const electron = require('electron');
const app = electron.app;
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const P = require('bluebird');
const _ = require('lodash');
const winston = require('winston');

var Resource = new require('./resource')();

var logger = new winston.Logger({
	level: 'info',
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: 'bellerophon.log' })
	]
});

var log = function(msg, level, from) {
	if(!level) {
		level = 'info';
	}
	if(!from) {
		from = 'SERVER:'
	}
	logger.log(level, from, msg);
};

// prevent window being garbage collected
let mainWindow;
let templateWindow;

var ec2 = P.promisifyAll(new AWS.EC2());
log('Initializing Main');

const ipcMain = require('electron').ipcMain;

var template = {
	"AWSTemplateFormatVersion" : "version date",
	"Description" : "",
	"Metadata" : {},
	"Parameters" : {},
	"Mappings" : {},
	"Conditions" : {},
	"Resources" : {},
	"Outputs" : {}
};

var availableResources = {
	/*Autoscaling: {
		AutoScalingGroup: [],
		LaunchConfiguration: [],
		LifecycleHook: [],
		ScalingPolicy: [],
		ScheduledAction: []
	},*/
	EC2: {
		CustomerGateway : {},
		DHCPOptions : {},
		EIP : {},
		EIPAssociation : {},
		Instance : {},
		InternetGateway : {},
		NetworkAcl : {},
		NetworkAclEntry : {},
		NetworkInterface : {},
		NetworkInterfaceAttachment : {},
		PlacementGroup : {},
		Route : {},
		RouteTable : {},

		SecurityGroup : {},
		/*
		 SecurityGroupEgress : {},
		 SecurityGroupIngress : {},
		 SpotFleet : {},
		 */
		Subnet : {},
		/*
		 SubnetNetworkAclAssociation : {},
		 SubnetRouteTableAssociation : {},
		 Volume : {},
		 VolumeAttachment : {},
		 */
		VPC : {}
		/*
		 VPCDHCPOptionsAssociation : {},
		 VPCEndpoint : {},
		 VPCGatewayAttachment : {},
		 VPCPeeringConnection : {},
		 VPNConnection : {},
		 VPNConnectionRoute : {},
		 VPNGateway : {},
		 VPNGatewayRoutePropagation : {}
		 */
	}
};

function populateBlock(block, body) {
	block.Properties = _.reduce(block.Properties, function(result, n, key) {
		result[key] = body[key];
		return result;
	}, {});
	return block;
}

function recursiveReplace(object, newPattern, oldPattern) {
	_.forIn(object, function (val, key) {
		//console.log('Recursive Run');
		if(val === oldPattern) {
			//console.log('Replacing at ' + val);
			object[key] = newPattern
		}
		//console.log(key);
		if (_.isArray(val)) {
			//console.log('Recursing on an array ' + val);
			val.forEach(function(el) {
				if (_.isObject(el)) {
					recursiveReplace(el, newPattern, oldPattern);
				}
			});
		}
		if (_.isObject(object[key])) {
			//console.log('Recursing on an object ' + key);
			recursiveReplace(object[key], newPattern, oldPattern);
		}
	});
}

function addResource(resource) {
	console.log('block');
	console.log('Recursive rename');
	recursiveReplace(template.Resources, '{ Ref: ' + resource.name + ' }', resource.id);
	var newResource = populateBlock(resource.block, resource.body);
	_.each(template.Resources, function(val, key) {
		console.log('Checking ' + key);
		console.log('Match: ' + key.replace('-resource',''));
		recursiveReplace(newResource, '{ Ref: ' + key + ' }', key.replace('-resource',''))
	});
	template.Resources[resource.name] = newResource;
	if(templateWindow) {
		templateWindow.webContents.send('update-template', template);
	}
}

function removeResource(resource) {
	console.log('block');
	console.log(resource.block);
	recursiveReplace(template.Resources, resource.id, '{ Ref: ' + resource.name + ' }');
	delete template.Resources[resource.name];
	if(templateWindow) {
		templateWindow.webContents.send('update-template', template);
	}
}

function addParam(resource, pKey) {
	if(template.Resources[resource.name]) {
		if(template.Resources[resource.name].Properties[pKey]) {
			var oldVal = template.Resources[resource.name].Properties[pKey];
			var paramName = resource.name + '-' + pKey + '-param';
			template.Resources[resource.name].Properties[pKey] = '{ Ref: ' + paramName + ' }';
			template.Parameters[paramName] = {
				"Type" : "String",
				"Default" : oldVal
			}
		}
	}
	if(templateWindow) {
		templateWindow.webContents.send('update-template', template);
	}
}

function removeParam(resource, pKey) {
	if(template.Resources[resource.name]) {
		if(template.Resources[resource.name].Properties[pKey]) {
			var paramName = resource.name + '-' + pKey + '-param';
			template.Resources[resource.name].Properties[pKey] = template.Parameters[paramName].Default;
			delete template.Parameters[paramName];
		}
	}
	if(templateWindow) {
		templateWindow.webContents.send('update-template', template);
	}
}


ipcMain.on('update-resources', function(event, res) {
	log('Got update-resources request');
	var params = {};
	switch(res) {
		case "AWS_EC2_VPC":
			params = {
				call: ec2.describeVpcsAsync({}),
				resBlock: 'Vpcs',
				constructor: Resource.AWS_EC2_VPC,
				name: "VpcId",
				targetBlock: availableResources.EC2.VPC
			};
			break;
		case "AWS_EC2_SUBNET":
			params = {
				call: ec2.describeSubnetsAsync({}),
				resBlock: 'Subnets',
				constructor: Resource.AWS_EC2_SUBNET,
				name: "SubnetId",
				targetBlock: availableResources.EC2.Subnet
			};
			break;
		case "AWS_EC2_SECURITYGROUP":
			params = {
				call: ec2.describeSecurityGroupsAsync({}),
				resBlock: 'SecurityGroups',
				constructor: Resource.AWS_EC2_SECURITYGROUP,
				name: "GroupId",
				targetBlock: availableResources.EC2.SecurityGroup
			};
			break;
	};
	params
		.call
		.then(function(data) {
			log('Sending data');
			//log(Resource);
			console.log(res);
			log(Resource[res].blockGroup);

			data[params.resBlock].forEach(function(r) {
				var newResource = new params.constructor(r[params.name], r);
				params.targetBlock[newResource.id] = newResource;
			});
			event.sender.send('update-resources', availableResources);
		})
		.catch(function(e) {
			console.log(e);
		});
});

ipcMain.on('send-log', function(event, arg) {
	console.log('Received log request');
	log(arg.msg, arg.level, arg.from);
});

/*
ipcMain.on('get-resource-request', function(event, arg) {
	console.log('Got resource request');
	console.log(arg);
	var params = {};
	switch(arg) {
		case "AWS::EC2::VPC":
			params = { call: ec2.describeVpcsAsync({}) };
			break;
		case "AWS::EC2::SUBNET":
			params = { call: ec2.describeSubnetsAsync({}) };
			break;
		case "AWS::EC2::SECURITYGROUP":
			params = { call: ec2.describeSecurityGroupsAsync({}) };
			break;
	};
	params
		.call
		.then(function(data) {
			console.log('Sending data');
			//data.type = arg;
			event.sender.send('get-resource-reply', data);
		})
		.catch(function(e) {
			console.log(e);
		});
});
*/

ipcMain.on('get-template-request', function(event, arg) {
	console.log('Received get template request');
	event.sender.send('get-template-reply', template);
});

ipcMain.on('open-template-window', function(event) {
	console.log('Received request to open template window.');
	if(!templateWindow) {
		templateWindow = createTemplateWindow();
	}
});

ipcMain.on('toggle-param', function(event, res) {
	log('Toggling param in template');
	if(availableResources[res.key][res.subKey][res.resource.id].templateParams[res.pKey]) {
		availableResources[res.key][res.subKey][res.resource.id].templateParams[res.pKey] = false;
		removeParam(res.resource, res.pKey);
	} else {
		availableResources[res.key][res.subKey][res.resource.id].templateParams[res.pKey] = true;
		addParam(res.resource, res.pKey);
	}
	log('avail');
	log(availableResources[res.key][res.subKey][res.resource.id].templateParams);
	//addResource(res.resource);
	event.sender.send('update-resources', availableResources);
});

ipcMain.on('add-to-template-request', function(event, res) {
	log('Adding resource to template');
	availableResources[res.key][res.subKey][res.resource.id].inTemplate = true;
	log('avail');
	log(availableResources);
	addResource(res.resource);
	event.sender.send('update-resources', availableResources);
});

ipcMain.on('remove-from-template-request', function(event, res) {
	console.log('Removed resource from template');
	availableResources[res.key][res.subKey][res.resource.id].inTemplate = false;
	removeResource(res.resource);
	event.sender.send('update-resources', availableResources);
});

// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

function onMainClosed() {
	mainWindow = null;
}

function onTemplateClosed() {
	templateWindow = null;
}

function createMainWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 800
	});

	win.loadURL(`file://${__dirname}/ui/index.html`);
	win.on('closed', onMainClosed, 'main');
	return win;
}

function createTemplateWindow() {
	const win = new electron.BrowserWindow({
		width: 600,
		height: 800
	});

	win.loadURL(`file://${__dirname}/template/index.html`);
	win.on('closed', onTemplateClosed, 'template');
	return win;
}

app.on('window-all-closed', () => {
	app.quit();
});

app.on('activate-with-no-open-windows', () => {
	console.log('activate-with-no-open-windows');
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

app.on('ready', () => {
	console.log('Ready');
	mainWindow = createMainWindow();
});
