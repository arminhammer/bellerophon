import { app, BrowserWindow, dialog, ipcMain, Menu, shell } from 'electron';
const defaultMenu = require('electron-default-menu');
import { template } from './menu';
import { homedir } from 'os';
import { resolve } from 'path';

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
	global.__static = require('path')
		.join(__dirname, '/static')
		.replace(/\\/g, '\\\\');
}

let mainWindow;
let templateWindow;

global.vuexState = null;

ipcMain.on('save', (e, payload) => {
	//global.vuexState = state;
	console.log('Save received: ', payload);

	dialog.showSaveDialog(
		mainWindow,
		{
			title: `template.${payload.format}`,
			defaultPath: resolve(homedir(), 'template.json')
		},
		function(result) {
			console.log('Saving as ', result);
			e.sender.send('select-file', { fileName: result, body: payload.body });
			//mainWindow.webContents.send('save', result);
		}
	);
	//console.log(global.vuexState);
	// => { Counter: { main: 0 } }
});

const winURL =
	process.env.NODE_ENV === 'development'
		? `http://localhost:9080`
		: `file://${__dirname}/index.html`;

function createWindow() {
	/**
	 * Initial window options
	 */
	mainWindow = new BrowserWindow({
		height: 563,
		useContentSize: true,
		width: 1000
	});

	mainWindow.loadURL(winURL);

	mainWindow.on('closed', () => {
		mainWindow = null;
	});
}

app.on('ready', () => {
	//const menu = Menu.buildFromTemplate(template);
	//Menu.setApplicationMenu(menu);
	const menu = defaultMenu(app, shell);

	menu.unshift({
		label: 'File',
		submenu: [
			{
				label: 'Save As',
				click: (item, focusedWindow) => {
					console.log('Saving template as!');
					dialog.showSaveDialog(
						mainWindow,
						{
							title: 'template.json',
							defaultPath: resolve(homedir(), 'template.json')
						},
						function(result) {
							console.log('Saving as ', result);
							mainWindow.webContents.send('save', result);
						}
					);
				}
			},
			{ role: 'quit' }
		]
	});
	// Add custom menu
	menu.splice(4, 0, {
		label: 'Custom',
		submenu: [
			{
				label: 'Do something',
				click: (item, focusedWindow) => {
					dialog.showMessageBox({ message: 'Do something', buttons: ['OK'] });
				}
			}
		]
	});

	// Set top-level application menu, using modified template
	Menu.setApplicationMenu(Menu.buildFromTemplate(menu));

	createWindow();
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	if (mainWindow === null) {
		createWindow();
	}
});

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */
