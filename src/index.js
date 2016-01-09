'use strict';
var electron = require('electron');
var app = electron.app;
var Menu = electron.Menu;
var fs = require('fs');
var Template = require('./template');
var Resource = require('./resource');
var notifier = require('node-notifier');
var _ = require('lodash');
var P = require('bluebird');
var Logger = require('./logger');
var AvailableResources = require('./availableresources');
var os = require('os');

var logger = new Logger();

function showSaveDialog() {
	dialog.showSaveDialog(
		mainWindow, {
			title: 'belleraphon_template.json',
			defaultPath: os.homedir()
		},
		function(filename) {
			if(filename) {
				logger.log('Saving at ' + filename);
				fs.writeFile(filename, JSON.stringify(template.body,null,2),function() {
					logger.log('Saved ' + filename);
				});
			}
		});
}

// prevent window being garbage collected
var mainWindow;
var templateWindow;

logger.log('Initializing Main');

var ipcMain = electron.ipcMain;
var dialog = electron.dialog;

var template = new Template();
var availableResources = AvailableResources.getBlankAvailableResources();

var cleanupAvailableResource = function(available) {
	return available;
};

ipcMain.on('refresh-resources', function(event) {
	availableResources = AvailableResources.getBlankAvailableResources();
	updateResources()
		.then(function() {
			logger.log('REFRESHING');
			event.sender.send('update-resources', cleanupAvailableResource(availableResources));
		});
});

function updateResource(primary, secondary) {
	var resource = Resource.resources[primary][secondary];
	return resource
		.call
		.then(function(data) {
			//logger.log(data);
			if(resource.preHook) {
				data = resource.preHook(data);
			}
			data[resource.resBlock].forEach(function(r) {
				var newResource = new resource.construct(r[resource.rName], r);
				availableResources[primary][secondary][newResource.id] = newResource;
			});
		})
		.catch(function(e) {
			logger.log(e);
			logger.log(e.stack);
			notifier.notify({
				'title': 'Belleraphon error:',
				'message': e
			});
		});
}

function updateResources(primaryKey) {
	var resArray = [];
	logger.log(primaryKey);
	_.each(Resource.resources[primaryKey], function(resource, secondaryKey) {
		resArray.push(updateResource(primaryKey, secondaryKey));
	});
	return P.all(resArray);
}

/*function updateAllResources() {
	var resArray = [];
	_.each(Resource.resources, function(primaryBlock, primaryKey) {
		_.each(Resource.resources[primaryKey], function(resource, secondaryKey) {
			resArray.push(updateResource(primaryKey, secondaryKey));
		});
	});
	return P.all(resArray);
}*/

/*ipcMain.on('update-resource-old', function(event, res) {
	logger.log('Got update-resource-old request');
	updateResources(res.primary, res.secondary);
});*/

ipcMain.on('update-resource', function(event, res) {
	logger.log('Got update-resource request');
	//logger.log(res.primary);
	updateResources(res.primary)
	.then(function() {
		logger.log('SENDING');
		//var resources = AvailableResources.getBlankAvailableResources();
		//resources[res.primary] = availableResources[res.primary];
		event.sender.send('update-resources', { resources: availableResources, primary: res.primary });
	});
});

/*ipcMain.on('update-resources', function(event) {
	logger.log('Got update-resources request');
	updateAllResources()
	.then(function() {
		logger.log('SENDING');
		event.sender.send('update-resources', cleanupAvailableResource(availableResources));
	});
});*/

ipcMain.on('send-log', function(event, arg) {
	logger.log('Received log request');
	logger.log(arg.msg, arg.level, arg.from);
});

ipcMain.on('get-template', function(event) {
	logger.log('Received get template request');
	event.sender.send('update-template', template.body);
});

ipcMain.on('open-template-window', function() {
	logger.log('Received request to open template window.');
	if(!templateWindow) {
		templateWindow = createTemplateWindow();
	}
});

ipcMain.on('open-save-dialog', function() {
	logger.log('Received save request');
	showSaveDialog();
});

ipcMain.on('toggle-param', function(event, res) {
	logger.log('Toggling param in template');
	if(availableResources[res.key][res.subKey][res.resource.id].templateParams[res.pKey]) {
		availableResources[res.key][res.subKey][res.resource.id].templateParams[res.pKey] = false;
		template.removeParam(res.resource, res.pKey);
	} else {
		availableResources[res.key][res.subKey][res.resource.id].templateParams[res.pKey] = true;
		template.addParam(res.resource, res.pKey);
	}
	logger.log('avail');
	//logger.log(availableResources[res.key][res.subKey][res.resource.id].templateParams);
	//addResource(res.resource);
	if(templateWindow) {
		templateWindow.webContents.send('update-template', template.body);
	}
	event.sender.send('update-resources', availableResources);
});

ipcMain.on('add-to-template-request', function(event, res) {
	logger.log('Adding resource to template');
	//logger.log(availableResources);
	availableResources[res.key][res.subKey][res.resource.id].inTemplate = true;
	//logger.log('avail');
	//logger.log(availableResources);
	template.addResource(res.resource);
	if(templateWindow) {
		templateWindow.webContents.send('update-template', template.body);
	}
	var resources = AvailableResources.getBlankAvailableResources();
	resources[res.primary] = availableResources[res.primary];
	event.sender.send('update-resources', { resources: resources, primary: res.key });
});

ipcMain.on('remove-from-template-request', function(event, res) {
	logger.log('Removed resource from template');
	availableResources[res.key][res.subKey][res.resource.id].inTemplate = false;
	logger.log(availableResources[res.key][res.subKey][res.resource.id].inTemplate);
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
		title: 'Bellerophon',
		titleBarStyle: 'hidden-inset'
	});

	win.loadURL('file://' + __dirname + '/main/index.html');
	win.on('closed', onMainClosed, 'main');
	return win;
}

function createTemplateWindow() {
	var win = new electron.BrowserWindow({
		width: 600,
		height: 800,
		title: 'Bellerophon Template'
		//titleBarStyle: 'hidden'
	});

	win.loadURL('file://' + __dirname + '/template/index.html');
	win.on('closed', onTemplateClosed, 'template');
	return win;
}

app.on('window-all-closed', function() {
	app.quit();
});

app.on('activate-with-no-open-windows', function() {
	logger.log('activate-with-no-open-windows');
	if (!mainWindow) {
		mainWindow = createMainWindow();
	}
});

//var appIcon = null;
var menu = null;

app.on('ready', function() {
	logger.log('Ready');

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
				}
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
				}
			]
		},
		{
			label: 'Help',
			role: 'help',
			submenu: [
				{
					label: 'Learn More',
					click: function() { require('electron').shell.openExternal('http://github.com/arminhammer/bellerophon') }
				}
			]
		}
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
					click: function() {
						showSaveDialog();
					}
				},
				{
					type: 'separator'
				},
				{
					label: 'Quit',
					accelerator: 'Command+Q',
					click: function() { app.quit(); }
				}
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
