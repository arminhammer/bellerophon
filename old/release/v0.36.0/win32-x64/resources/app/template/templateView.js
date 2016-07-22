/**
 * Created by arminhammer on 11/18/15.
 */
'use strict';

var m = require('mithril');

var ipcRenderer = require('electron').ipcRenderer;

var log = function(msg, level) {
	if(!level) {
		level = 'info';
	}
	ipcRenderer.send('send-log', { from: 'TEMPLATE:', level: level, msg: msg });
};

log('Initializing template');

var template = m.prop({});

ipcRenderer.send('get-template');

ipcRenderer.on('update-template', function(event, res) {
	m.startComputation();
	log('Updating template!');
	template(res);
	m.endComputation();
});

function resizeEditor(editor) {
	editor.setSize(null, window.innerHeight);
}

var templateView = {

	controller: function() {

		this.template = template;

		var editor = null;

		this.drawEditor = function (element, isInitialized) {

			if (isInitialized) {
				if(editor) {
					editor.setValue(JSON.stringify(template(), undefined, 2));
					editor.refresh();
				}
				return;
			}

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

			log(editor.getValue());

			resizeEditor(editor);

			$(window).resize(function() {
				resizeEditor(editor);
			});
		}
	},
	view: function(controller) {
		return [
			m('#templateView', { config: controller.drawEditor })
		]
	}
};

m.mount(document.body, templateView);
