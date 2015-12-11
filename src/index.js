'use strict';
var electron = require('electron');
var app = electron.app;
var Menu = electron.Menu;
var Tray = electron.Tray;

var winston = require('winston');
var Template = require('./template');
var Resource = require('./resource');
var os = require('os');

var logger = new winston.Logger({
	level: 'info',
	transports: [
		new (winston.transports.Console)(),
		new (winston.transports.File)({ filename: os.homedir() + '/.bellerophon.log' })
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
var mainWindow;
var templateWindow;

log('Initializing Main');

var ipcMain = require('electron').ipcMain;

var template = new Template();

var availableResources = {
	AutoScaling: {
	 AutoScalingGroup: {},
	 LaunchConfiguration: {},
	 LifecycleHook: {},
	 ScalingPolicy: {},
	 ScheduledAction: {}
	 },
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

ipcMain.on('update-resources', function(event, res) {
	log('Got update-resources request');
	log(res.primary);
	log(res.secondary);
	var resource = Resource[res.primary][res.secondary];
	resource
		.call
		.then(function(data) {
			log(data);
			data[resource.resBlock].forEach(function(r) {
				var newResource = new resource.construct(r[resource.rName], r);
				availableResources[res.primary][res.secondary][newResource.id] = newResource;
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

ipcMain.on('get-template', function(event, arg) {
	console.log('Received get template request');
	event.sender.send('update-template', template.body);
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
		template.removeParam(res.resource, res.pKey);
	} else {
		availableResources[res.key][res.subKey][res.resource.id].templateParams[res.pKey] = true;
		template.addParam(res.resource, res.pKey);
	}
	log('avail');
	log(availableResources[res.key][res.subKey][res.resource.id].templateParams);
	//addResource(res.resource);
	if(templateWindow) {
		templateWindow.webContents.send('update-template', template.body);
	}
	event.sender.send('update-resources', availableResources);
});

ipcMain.on('add-to-template-request', function(event, res) {
	log('Adding resource to template');
	availableResources[res.key][res.subKey][res.resource.id].inTemplate = true;
	log('avail');
	log(availableResources);
	template.addResource(res.resource);
	if(templateWindow) {
		templateWindow.webContents.send('update-template', template.body);
	}
	event.sender.send('update-resources', availableResources);
});

ipcMain.on('remove-from-template-request', function(event, res) {
	console.log('Removed resource from template');
	availableResources[res.key][res.subKey][res.resource.id].inTemplate = false;
	template.removeResource(res.resource);
	if(templateWindow) {
		templateWindow.webContents.send('update-template', template.body);
	}
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
	var win = new electron.BrowserWindow({
		width: 850,
		height: 800,
		minWidth: 850,
		minHeight: 500,
		title: 'Bellerophon'
	});

	win.loadURL('file://' + __dirname + '/ui/index.html');
	win.on('closed', onMainClosed, 'main');
	return win;
}

function createTemplateWindow() {
	var win = new electron.BrowserWindow({
		width: 600,
		height: 800,
		title: 'Bellerophon Template'
	});

	win.loadURL('file://' + __dirname + '/template/index.html');
	win.on('closed', onTemplateClosed, 'template');
	return win;
}

app.on('window-all-closed', function() {
	app.quit();
});

app.on('activate-with-no-open-windows', function() {
	console.log('activate-with-no-open-windows');
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

var appIcon = null;
var menu = null;

app.on('ready', function() {
	console.log('Ready');

	var menuTemplate = [
		{
			label: 'View',
			submenu: [
				{
					label: 'Reload',
					accelerator: 'CmdOrCtrl+R',
					click: function(item, focusedWindow) {
						if (focusedWindow)
							focusedWindow.reload();
					}
				},
				{
					label: 'Toggle Full Screen',
					accelerator: (function() {
						if (process.platform == 'darwin')
							return 'Ctrl+Command+F';
						else
							return 'F11';
					})(),
					click: function(item, focusedWindow) {
						if (focusedWindow)
							focusedWindow.setFullScreen(!focusedWindow.isFullScreen());
					}
				},
				{
					label: 'Toggle Developer Tools',
					accelerator: (function() {
						if (process.platform == 'darwin')
							return 'Alt+Command+I';
						else
							return 'Ctrl+Shift+I';
					})(),
					click: function(item, focusedWindow) {
						if (focusedWindow)
							focusedWindow.toggleDevTools();
					}
				},
			]
		},
		{
			label: 'Window',
			role: 'window',
			submenu: [
				{
					label: 'Minimize',
					accelerator: 'CmdOrCtrl+M',
					role: 'minimize'
				},
				{
					label: 'Close',
					accelerator: 'CmdOrCtrl+W',
					role: 'close'
				},
			]
		},
		{
			label: 'Help',
			role: 'help',
			submenu: [
				{
					label: 'Learn More',
					click: function() { require('electron').shell.openExternal('http://github.com/arminhammer/bellerophon') }
				},
			]
		},
	];

	if (process.platform == 'darwin') {
		var name = require('electron').app.getName();
		menuTemplate.unshift({
			label: name,
			submenu: [
				{
					label: 'About ' + name,
					role: 'about'
				},
				{
					type: 'separator'
				},
				{
					label: 'Show Template',
					accelerator: 'Command + T',
					click: function() {
						if(!templateWindow) {
							templateWindow = createTemplateWindow();
						}
					}
				},
				{
					label: 'Save Template',
					accelerator: 'Command + S',
					role: 'hide'
				},
				{
					type: 'separator'
				},
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: function() { app.quit(); }
				},
			]
		});
		menuTemplate[3].submenu.push(
			{
				type: 'separator'
			},
			{
				label: 'Bring All to Front',
				role: 'front'
			}
		);
	}

	menu = Menu.buildFromTemplate(menuTemplate);
	Menu.setApplicationMenu(menu);

	mainWindow = createMainWindow();
});
