/**
 * Created by arminhammer on 11/18/15.
 */
console.log('Loaded!');
var P = require('bluebird');

var $ = jQuery = require('jquery');
window.$ = $;
require('bootstrap');
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
	vpcs: []
};

console.log('Resources before');
console.log(resources.vpcs);

ipcRenderer.on('vpc-reply', function(event, res) {
	m.startComputation();
	res.Vpcs.forEach(function(vpc) {
		resources.vpcs.push(new Resource(vpc.VpcId, vpc));
	});
	m.endComputation();
});

ipcRenderer.send('vpc-request');

var ui = {
	controller: function() {
		this.resources = resources;
	},
	view: function(controller) {
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
		])
	}
};

m.mount(document.body,ui);
