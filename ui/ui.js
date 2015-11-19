/**
 * Created by arminhammer on 11/18/15.
 */
console.log('Loaded!');
const P = require('bluebird');
//var ipcRenderer = P.promisifyAll(require('electron').ipcRenderer);

console.log('Sending');

// In renderer process (web page).
const ipcRenderer = require('electron').ipcRenderer;
console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

ipcRenderer.on('asynchronous-reply', function(event, arg) {
	console.log(arg); // prints "pong"
});
ipcRenderer.send('asynchronous-message', 'ping');

/*
ipcRenderer
	.sendAsync('vpc', 'get')
	.then(function(msg) {
		"use strict";
		console.log('MSG');
		console.log(msg);
	})
	.catch(function(e) {
		"use strict";
		console.log('MSG-E');
		console.log(e);
	});

ipcRenderer
	.onAsync('vpc')
	.then(function(event, data) {
		"use strict";
		console.log('Event');
		console.log(event);
		console.log('Data');
		console.log(data);

	})
	.catch(function(e, data) {
		"use strict";
		console.log('ERROR');
		console.log(e);
		console.log('Data');
		console.log(data);
	});
*/
