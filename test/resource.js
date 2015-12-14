'use strict';

var assert = require('assert');
var Resource = require('../src/resource');

var _ = require('lodash');
//var AWS = require('aws-sdk');
//AWS.config.region = 'us-east-1';
//var ASG = P.promisifyAll(new AWS.AutoScaling());

function testCall(res, cb) {
	return res
		.call
		.then(function(data) {
			assert(data.ResponseMetadata.RequestId);
			cb();
		})
		.catch(function(e) {
			assert.fail(e);
			cb();
		});
};

function testConstructor(res) {
	var name = 'test-001';
	var resource = new res.construct(name, {});
	assert.equal(resource.inTemplate, false);
	assert(_.isEqual(resource.templateParams, {}));
	assert.equal(resource.id, name);
	assert.equal(resource.name, 'test001Resource');
	assert(_.isEqual(resource.body, {}));
	assert(resource.block);
}

describe('resource', function () {
	it('buildName should return a unique alphanumeric name', function () {
		var vpc = new Resource.EC2.VPC.construct('resource-001', {});
		assert.equal(vpc.name, 'resource001Resource');
	});

	describe('AWS::AutoScaling::AutoScaling', function() {
		it('AWS::AutoScaling::AutoScaling\'s call method should work', function(done) {
			return testCall(Resource.AutoScaling.AutoScalingGroup, done);
		});

		it('AWS::AutoScaling::AutoScaling\'s constructor method should work', function() {
			testConstructor(Resource.AutoScaling.AutoScalingGroup);
		});
	});

	describe('AWS::AutoScaling::LaunchConfiguration', function() {
		it('AWS::AutoScaling::LaunchConfiguration\'s call method should work', function(done) {
			return testCall(Resource.AutoScaling.LaunchConfiguration, done);
		});

		it('AWS::AutoScaling::AutoScaling\'s constructor method should work', function() {
			testConstructor(Resource.AutoScaling.LaunchConfiguration);
		});
	});

	describe('AWS::AutoScaling::ScalingPolicy', function() {
		it('AWS::AutoScaling::ScalingPolicy\'s call method should work', function(done) {
			return testCall(Resource.AutoScaling.ScalingPolicy, done);
		});

		it('AWS::AutoScaling::ScalingPolicy\'s constructor method should work', function() {
			testConstructor(Resource.AutoScaling.ScalingPolicy);
		});
	});

	describe('AWS::AutoScaling::ScheduledAction', function() {
		it('AWS::AutoScaling::ScheduledAction\'s call method should work', function(done) {
			return testCall(Resource.AutoScaling.ScheduledAction, done);
		});

		it('AWS::AutoScaling::ScheduledAction\'s constructor method should work', function() {
			testConstructor(Resource.AutoScaling.ScheduledAction);
		});
	});

});

