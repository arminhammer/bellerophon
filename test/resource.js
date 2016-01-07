/**
 * Created by arminhammer on 1/5/16.
 */

'use strict';

var assert = require('assert');
var Resource = require('../src/resource');

var _ = require('lodash');

var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

var P = require('bluebird');

var ec2 = P.promisifyAll(new AWS.EC2());
var ASG = P.promisifyAll(new AWS.AutoScaling());

function testCall(res, cb) {
	return res
		.call
		.then(function(data) {
			if(data.ResponseMetadata) {
				assert(data.ResponseMetadata.RequestId);
			} else if(data) {
				assert(data);
			} else {
				assert.fail(data);
			}
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
		var vpc = new Resource.resources.AutoScaling.AutoScalingGroup.construct('resource-001', {});
		assert.equal(vpc.name, 'resource001Resource');
	});

	describe('AWS::Autoscaling', function () {

		before(function(done) {
			this.timeout(10000);

			var defaultGroupName = '';

			return ASG
				.describeAutoScalingGroupsAsync({})
				.then(function(data) {
					//console.log(data.AutoScalingGroups.length);
					if(data.AutoScalingGroups.length < 1) {
						assert.fail('No Autoscaling group')
					}
					defaultGroupName = data.AutoScalingGroups[0].AutoScalingGroupName
				})
				.then(function() {
					return ASG.describeLaunchConfigurationsAsync({})
				})
				.then(function(data) {
					//console.log(data.LaunchConfigurations.length);
					if(data.LaunchConfigurations.length < 1) {
						assert.fail('No Autoscaling Launch Configurations')
					}
				})
				.then(function() {
					return ASG.describeLifecycleHooksAsync({
						AutoScalingGroupName: defaultGroupName
					})
				})
				.then(function(data) {
					//console.log(data.LifecycleHooks.length);
					if(data.LifecycleHooks.length < 1) {
						//assert.fail('No Autoscaling LifecycleHooks');
						//return ASG.putLifecycleHookAsync({});
					}
				})

				.then(function() {
					return ASG.describePoliciesAsync({})
				})
				.then(function(data) {
					//console.log(data.ScalingPolicies.length);
					if(data.ScalingPolicies.length < 1) {
						assert.fail('No Autoscaling Policies')
					}
				})
				.then(function() {
					return ASG.describeScheduledActionsAsync({})
				})
				.then(function(data) {
					//console.log(data.ScheduledUpdateGroupActions.length);
					if(data.ScheduledUpdateGroupActions.length < 1) {
						//assert.fail('No Autoscaling Scheduled Actions')
					}
				})
				.then(function() {
					//console.log('ASG resources all exist. Continuing test.');
					done();
				})
				.catch(function(e) {
					assert.fail(e);
				});
		});

		describe('AWS::AutoScaling::AutoScaling', function () {
			it('AWS::AutoScaling::AutoScaling\'s call method should work', function (done) {
				return testCall(Resource.resources.AutoScaling.AutoScalingGroup, done);
			});

			it('AWS::AutoScaling::AutoScaling\'s constructor method should work', function () {
				testConstructor(Resource.resources.AutoScaling.AutoScalingGroup);
			});
		});

		describe('AWS::AutoScaling::LaunchConfiguration', function() {
			it('AWS::AutoScaling::LaunchConfiguration\'s call method should work', function(done) {
				return testCall(Resource.resources.AutoScaling.LaunchConfiguration, done);
			});

			it('AWS::AutoScaling::AutoScaling\'s constructor method should work', function() {
				testConstructor(Resource.resources.AutoScaling.LaunchConfiguration);
			});
		});

		describe('AWS::AutoScaling::ScalingPolicy', function() {
			it('AWS::AutoScaling::ScalingPolicy\'s call method should work', function(done) {
				return testCall(Resource.resources.AutoScaling.ScalingPolicy, done);
			});

			it('AWS::AutoScaling::ScalingPolicy\'s constructor method should work', function() {
				testConstructor(Resource.resources.AutoScaling.ScalingPolicy);
			});
		});

		describe('AWS::AutoScaling::ScheduledAction', function() {
			it('AWS::AutoScaling::ScheduledAction\'s call method should work', function(done) {
				return testCall(Resource.resources.AutoScaling.ScheduledAction, done);
			});

			it('AWS::AutoScaling::ScheduledAction\'s constructor method should work', function() {
				testConstructor(Resource.resources.AutoScaling.ScheduledAction);
			});
		});

		after(function() {

		});

	});

});
