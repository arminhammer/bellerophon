'use strict';

var assert = require('assert');
var Template = require('../src/template');
var Resource = require('../src/resource');

var template = new Template();

var MockResource = function(name, body) {
	var self = this;
	self.id = name;
	self.name = name + 'Resource';
	self.body = body;
	self.block = {
		"Type" : "AWS::Mock::Resource",
		"Properties" : {
			"Description" : "String",
			"PropertyArray" : [],
			"PropertyInteger" : "Integer",
			"MockResource2": "String",
			"Tags" :  []
		}
	};
};

var MockResource2 = function(name, body) {
	var self = this;
	self.id = name;
	self.name = name + 'Resource';
	self.body = body;
	self.block = {
		"Type" : "AWS::Mock::Resource2",
		"Properties" : {
			"Description" : "String",
			"PropertyArray" : [],
			"PropertyInteger" : "Integer",
			"Tags" :  []
		}
	};
};

var mockResource1 = new MockResource('mock1', {
	Description: "Mock Resource 1",
	PropertyInteger: 1,
	"MockResource2": "mock2"
});

var mockResource2 = new MockResource2('mock2', {
	Description: "Mock Resource 2",
	PropertyInteger: 1,
	"PropertyArray": [],
	"Tags": []
});

describe('template', function () {
	it('should have a body', function () {
		assert(true, template.body);
	});

	it('should add a resource', function () {
		template.addResource(mockResource1);
		assert.equal(Object.keys(template.body.Resources).length, 1);
	});

	it('should remove a resource', function () {
		template.removeResource(mockResource1);
		assert.equal(Object.keys(template.body.Resources).length, 0);
	});

	it('should add a parameter', function () {
		template.addResource(mockResource1);
		assert.equal(Object.keys(template.body.Resources).length, 1);
		template.addParam(mockResource1,'Description');
		assert.equal(Object.keys(template.body.Parameters).length, 1);
	});

	it('should remove a parameter', function () {
		template.removeParam(mockResource1,'Description');
		assert.equal(Object.keys(template.body.Parameters).length, 0);
		template.removeResource(mockResource1);
		assert.equal(Object.keys(template.body.Resources).length, 0);
	});

	it('should add two resources and provide a ref', function () {
		template.addResource(mockResource1);
		assert.deepEqual(template.body, {
			"AWSTemplateFormatVersion": "2010-09-09",
			"Parameters": {},
			"Resources": {
				"mock1Resource": {
					"Type": "AWS::Mock::Resource",
					"Properties": {
						"Description": "Mock Resource 1",
						"PropertyInteger": 1,
						"MockResource2": "mock2"
					}
				}
			}
		});
		template.addResource(mockResource2);
		assert.deepEqual(template.body, {
				"AWSTemplateFormatVersion": "2010-09-09",
				"Parameters": {},
				"Resources": {
					"mock1Resource": {
						"Type": "AWS::Mock::Resource",
						"Properties": {
							"Description": "Mock Resource 1",
							"PropertyInteger": 1,
							"MockResource2": { "Ref": "mock2Resource" }
						}
					},
					"mock2Resource": {
						"Type": "AWS::Mock::Resource2",
						"Properties": {
							"Description": "Mock Resource 2",
							"PropertyArray": [],
							"PropertyInteger": 1,
							"Tags": []
						}
					}
				}
			}
		);
	});

	it('should remove the second resource and revert the ref', function () {
		template.removeResource(mockResource2);
		assert.deepEqual(template.body, {
			"AWSTemplateFormatVersion": "2010-09-09",
			"Parameters": {},
			"Resources": {
				"mock1Resource": {
					"Type": "AWS::Mock::Resource",
					"Properties": {
						"Description": "Mock Resource 1",
						"PropertyInteger": 1,
						"MockResource2": "mock2"
					}
				}
			}
		});
	});

});
