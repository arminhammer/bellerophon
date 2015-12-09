'use strict';

var assert = require('assert');
var Template = require('../src/template');
var Resource = require('../src/resource');

var template = new Template();

var MockResource = function(name, body) {
	var self = this;
	self.id = name;
	self.name = name + '-resource';
	self.body = body;
	self.block = {
		"Type" : "AWS::Mock::Resource",
		"Properties" : {
			"Description" : "String",
			"PropertyArray" : [],
			"PropertyInteger" : "Integer",
			"Tags" :  []
		}
	};
};

var mockResource = new MockResource('mock', {
	Description: "Mock Resource",
	PropertyInteger: 1,
	"PropertyArray": [],
	"Tags": []
});

describe('template', function () {
	it('should have a body', function () {
		assert(true, template.body);
	});

	it('should add a resource', function () {
		template.addResource(mockResource);
		assert.equal(Object.keys(template.body.Resources).length, 1);
	});

	it('should remove a resource', function () {
		template.removeResource(mockResource);
		assert.equal(Object.keys(template.body.Resources).length, 0);
	});

	it('should add a parameter', function () {
		template.addResource(mockResource);
		assert.equal(Object.keys(template.body.Resources).length, 1);
		template.addParam(mockResource,'Description');
		assert.equal(Object.keys(template.body.Parameters).length, 1);
	});

	it('should remove a parameter', function () {
		template.removeParam(mockResource,'Description');
		assert.equal(Object.keys(template.body.Parameters).length, 0);
		template.removeResource(mockResource);
		assert.equal(Object.keys(template.body.Resources).length, 0);
	});
});
