/**
 * Created by arminhammer on 11/18/15.
 */
console.log('Loaded!');
var P = require('bluebird');

var $ = jQuery = require('jquery');
window.$ = $;
require('bootstrap');
var m = require('mithril');

//var ipcRenderer = P.promisifyAll(require('electron').ipcRenderer);

console.log('Sending');

// In renderer process (web page).
var ipcRenderer = require('electron').ipcRenderer;
//console.log(ipcRenderer.sendSync('synchronous-message', 'ping')); // prints "pong"

ipcRenderer.on('asynchronous-reply', function(event, arg) {
	console.log(arg); // prints "pong"
});
ipcRenderer.send('asynchronous-message', 'ping');

var vpcs = m.prop("Original");

ipcRenderer.on('vpc-reply', function(event, arg) {
	m.startComputation();
	console.log('vpc-reply');
	console.log(arg);
	vpcs(arg);
	console.log('vpcs is now');
	console.log(vpcs());
	m.endComputation();
});

ipcRenderer.send('vpc-request');


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


var ui = {
	controller: function() {
		this.vpcs = vpcs;
	},
	view: function(controller) {
		return ('div', [
			m('p', 'VPCs'),
			m('p', controller.vpcs())
		])
	}
};

m.mount(document.body,ui);
