/**
 * Created by arminhammer on 1/5/16.
 */

'use strict';

var assert = require('assert');
var rewire = require("rewire");

var SideBarComponent = rewire('../src/ui/sidebarcomponent');

var ipcRendererMock = {
	send: function (msg, content) {}
};

SideBarComponent.__set__('ipcRenderer', ipcRendererMock);

describe('SideBarComponent', function () {

	it('should have a controller and view', function () {
		assert(true, SideBarComponent.controller);
		assert(true, SideBarComponent.view);
	});

	it('controller should have accept resources object', function () {
		var options = { resources: {} };
		var controller = SideBarComponent.controller(options);
		assert.equal({}, SideBarComponent.controller.resources);
	});

});
