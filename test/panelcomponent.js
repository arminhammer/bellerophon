/**
 * Created by arminhammer on 1/5/16.
 */

'use strict';

var assert = require('assert');
var rewire = require("rewire");

var PanelComponent = rewire('../src/main/panelcomponent');

var ipcRendererMock = {
	send: function (msg, content) {}
};

//PanelComponent.__set__('ipcRenderer', ipcRendererMock);

describe('PanelComponent', function () {

	it('should have a controller and view', function () {
		assert(true, PanelComponent.controller);
		assert(true, PanelComponent.view);
	});

	it('controller should have accept resources object', function () {
		var options = {
			resource: {},
			log: 'log',
			key: 'key',
			subKey: 'subKey'
		};
		var controller = new PanelComponent.controller(options);
		assert.equal(options.resource, controller.resource);
		assert.equal(options.log, controller.log);
		assert.equal(options.key, controller.key);
		assert.equal(options.subKey, controller.subKey);
	});

});
