'use strict';
const electron = require('electron');
const app = electron.app;
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const P = require('bluebird');
const _ = require('lodash');
const winston = require('winston');

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

//var ipcMain = P.promisifyAll(require('electron').ipcMain);

var ec2 = P.promisifyAll(new AWS.EC2());
log('ec2');
log('INITIALIZING WINSTON');
log('INITINIT');

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
	//console.log(resource.block);
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

ipcMain.on('send-log', function(event, arg) {
	console.log('Received log request');
	log(arg.msg, arg.level, arg.from);
});

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
			//console.log(data);
			data.type = arg;
			event.sender.send('get-resource-reply', data);
		})
		.catch(function(e) {
			console.log(e);
		});
});

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

ipcMain.on('add-to-template-request', function(event, res) {
	console.log('Added resource to template');
	console.log(res);
	addResource(res);
	event.sender.send('add-to-template-reply');
});

ipcMain.on('remove-from-template-request', function(event, res) {
	console.log('Removed resource from template');
	removeResource(res);
	event.sender.send('remove-from-template-reply');
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
		width: 1200,
		height: 800
	});

	win.loadURL(`file://${__dirname}/ui/index.html`);
	win.on('closed', onMainClosed, 'main');
	return win;
}

function createTemplateWindow() {
	const win = new electron.BrowserWindow({
		width: 1200,
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
