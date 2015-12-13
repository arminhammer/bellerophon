'use strict';

var assert = require('assert');
var Resource = require('../src/resource');

var _ = require('lodash');
//var AWS = require('aws-sdk');
//AWS.config.region = 'us-east-1';
//var ASG = P.promisifyAll(new AWS.AutoScaling());

describe('resource', function () {
	it('buildName should return a unique alphanumeric name', function () {
		var vpc = new Resource.EC2.VPC.construct('resource-001', {});
		//var testName = 'resource-001';
		assert.equal(vpc.name, 'resource001Resource');
	});

	it('AWS::AutoScaling::AutoScaling\'s call method should work', function(done) {

		return Resource.AutoScaling.AutoScalingGroup
			.call
			.then(function(data) {
				assert(data.ResponseMetadata.RequestId);
				done();
			})
			.catch(function(e) {
				assert.fail(e);
				done();
			});
	});

	it('AWS::AutoScaling::AutoScaling\'s constructor method should work', function() {

		var name = 'test-001';
		var resource = new Resource.AutoScaling.AutoScalingGroup.construct(name, {});
		assert.equal(resource.inTemplate, false);
		assert(_.isEqual(resource.templateParams, {}));
		assert.equal(resource.id, name);
		assert.equal(resource.name, 'test001Resource');
		assert(_.isEqual(resource.body, {}));
		assert(resource.block);
	});

	it('AWS::AutoScaling::LaunchConfiguration\'s call method should work', function(done) {

		return Resource.AutoScaling.LaunchConfiguration
			.call
			.then(function(data) {
				assert(data.ResponseMetadata.RequestId);
				done();
			})
			.catch(function(e) {
				assert.fail(e);
				done();
			});
	});

	it('AWS::AutoScaling::LaunchConfiguration\'s constructor method should work', function() {

		var name = 'test-001';
		var resource = new Resource.AutoScaling.LaunchConfiguration.construct(name, {});
		assert.equal(resource.inTemplate, false);
		assert(_.isEqual(resource.templateParams, {}));
		assert.equal(resource.id, name);
		assert.equal(resource.name, 'test001Resource');
		assert(_.isEqual(resource.body, {}));
		assert(resource.block);
	});

	it('AWS::AutoScaling::ScalingPolicy\'s call method should work', function(done) {

		return Resource.AutoScaling.ScalingPolicy
			.call
			.then(function(data) {
				assert(data.ResponseMetadata.RequestId);
				done();
			})
			.catch(function(e) {
				assert.fail(e);
				done();
			});
	});

	it('AWS::AutoScaling::ScalingPolicy\'s constructor method should work', function() {

		var name = 'test-001';
		var resource = new Resource.AutoScaling.ScalingPolicy.construct(name, {});
		assert.equal(resource.inTemplate, false);
		assert(_.isEqual(resource.templateParams, {}));
		assert.equal(resource.id, name);
		assert.equal(resource.name, 'test001Resource');
		assert(_.isEqual(resource.body, {}));
		assert(resource.block);
	});

	it('AWS::AutoScaling::ScheduledAction\'s call method should work', function(done) {

		return Resource.AutoScaling.ScheduledAction
			.call
			.then(function(data) {
				assert(data.ResponseMetadata.RequestId);
				done();
			})
			.catch(function(e) {
				assert.fail(e);
				done();
			});
	});

	it('AWS::AutoScaling::ScheduledAction\'s constructor method should work', function() {

		var name = 'test-001';
		var resource = new Resource.AutoScaling.ScheduledAction.construct(name, {});
		assert.equal(resource.inTemplate, false);
		assert(_.isEqual(resource.templateParams, {}));
		assert.equal(resource.id, name);
		assert.equal(resource.name, 'test001Resource');
		assert(_.isEqual(resource.body, {}));
		assert(resource.block);
	});

});

