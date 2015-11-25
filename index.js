'use strict';
const electron = require('electron');
const app = electron.app;
const AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';
const P = require('bluebird');
const _ = require('lodash');

//var ipcMain = P.promisifyAll(require('electron').ipcMain);

var ec2 = P.promisifyAll(new AWS.EC2());
console.log('ec2');

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

function addResource(resource) {
	console.log('block');
	console.log(resource.block);
	template.Resources[resource.name] = populateBlock(resource.block, resource.body);
}

ipcMain.on('vpc-request', function(event, arg) {
	ec2
		.describeVpcsAsync({})
		.then(function(data) {
			console.log('Sending data');
			event.sender.send('vpc-reply', data);
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
	event.sender.send('remove-from-template-reply');
});

//ipcMain.on('synchronous-message', function(event, arg) {
//console.log(arg);  // prints "ping"
//event.returnValue = 'pong';
//});

/*
 ipcMain
 .onAsync('vpc')
 .then(function(data) {
 console.log('VPC');
 console.log(data);
 event.sender.send('vpc', 'pong');
 })
 .catch(function(event) {
 "use strict";
 console.log('VPC-E');
 //console.log(e);

 });
 */


// report crashes to the Electron project
require('crash-reporter').start();

// adds debug features like hotkeys for triggering dev tools and reload
require('electron-debug')();

// prevent window being garbage collected
let mainWindow;
let templateWindow;

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
