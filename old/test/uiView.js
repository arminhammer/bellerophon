/**
 * Created by arminhammer on 12/6/15.
 */

'use strict';

var assert = require('assert');
var rewire = require("rewire");
//var UiView = rewire('../src/ui/uiView');

var ipcRendererMock = {
	send: function (msg, content) {}
};

//UiView.__set__('ipcRenderer', ipcRendererMock);
//UiView.__set__('document', { body: {}});

//var Resource = require('../src/resource');

//describe('uiView', function () {

	//var mockUiView = new UiView();

	//it('should have a controller and a view', function () {
		//assert(true, UiView.controller);
	//});
//});
