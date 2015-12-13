'use strict';

var assert = require('assert');
var Resource = require('../src/resource');

describe('resource', function () {
	it('buildName should return a unique alphanumeric name', function () {
		var vpc = new Resource.EC2.VPC.construct('resource-001', {});
		//var testName = 'resource-001';
		assert.equal(vpc.name, 'resource001Resource');
	});
});
