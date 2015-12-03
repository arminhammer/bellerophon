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

var log = function(msg, level) {
	if(!level) {
		level = 'info';
	}
	ipcRenderer.send('send-log', { from: 'TEMPLATE:', level: level, msg: msg });
};

log('Initializing template');

var template = m.prop({});

ipcRenderer.on('get-template-reply', function(event, res) {
	m.startComputation();
	console.log('Template');
	console.log(res);
	template(res);
	m.endComputation();
});

ipcRenderer.send('get-template-request');

ipcRenderer.on('update-template', function(event, message) {
	console.log('Updating template!');
});

/**
 * Created by arminhammer on 7/9/15.
 */

'use strict';

function resizeEditor(editor) {
	editor.setSize(null, window.innerHeight);
}

var templateView = {

	controller: function() {

		this.template = template;

		var editor = null;

		this.drawEditor = function (element, isInitialized, context) {

			//var editorValue = template();
			//var newEditorValue = null;

			console.log('now');

			if (isInitialized) {
				console.log('Initialized');
				//newEditorValue = template();
				//console.log('new edi');
				//console.log(newEditorValue);
				console.log('old edi');
				console.log(editor);
				//console.log(editorValue);

				if(editor) {
					console.log('Setting new edi value');
					editor.setValue(JSON.stringify(template(), undefined, 2));
					//if(editorValue != newEditorValue) {
					//	console.log('templates are different!');
					//	editor.setValue(JSON.stringify(newEditorValue, undefined, 2));
					//}
					editor.refresh();
				}
				return;
			}

			console.log('New editor');
			editor = CodeMirror(element, {
				value: JSON.stringify(template(), undefined, 2),
				lineNumbers: true,
				mode: 'application/json',
				gutters: ['CodeMirror-lint-markers'],
				lint: true,
				styleActiveLine: true,
				autoCloseBrackets: true,
				matchBrackets: true,
				theme: 'zenburn'
			});

			console.log(editor.getValue());

			resizeEditor(editor);

			$(window).resize(function() {
				resizeEditor(editor);
			});

			//editor.on('change', function(editor) {
			 //m.startComputation();
			 //template(JSON.parse(editor.getValue()));
			 //m.endComputation();
			//});

		}
	},
	view: function(controller) {
		return [
			m('#templateView', { config: controller.drawEditor })
		]
	}
};

/*
 module.exports = SourceEditor;

 var templateView = {
 controller: function() {
 this.template = template;
 },
 view: function(controller) {
 return m(".container", [
 m('p', JSON.stringify(controller.template()))
 ])
 }
 };
 */

m.mount(document.body, templateView);
