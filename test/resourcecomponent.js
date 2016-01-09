/**
 * Created by arminhammer on 1/5/16.
 */

'use strict';

var assert = require('assert');
var rewire = require("rewire");
var _ = require('lodash');

var ResourceComponent = require('./resourcecomponent');

describe('ResourceComponent', function () {

	it('should have a controller and view', function () {
		assert(true, ResourceComponent.controller);
		assert(true, ResourceComponent.view);
	});

	it('controller should accept resources object', function () {
		var options = { resources: {} };
		var controller = new ResourceComponent.controller(options);
		assert(true, _.isEmpty(controller.resources));
	});

});
