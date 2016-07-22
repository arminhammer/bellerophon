'use strict';
var _ = require('lodash');
var P = require('bluebird');

var Util = require('./util');

var AutoScaling = function(AWS) {

	var ASG = P.promisifyAll(new AWS.AutoScaling());

	return {
		AutoScalingGroup: {
			call: function () {
				return ASG.describeAutoScalingGroupsAsync({})
			},
			resBlock: 'AutoScalingGroups',
			rName: 'AutoScalingGroupName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::AutoScaling::AutoScalingGroup',
					'Properties': {
						'AvailabilityZones': [],
						'Cooldown': 'String',
						'DesiredCapacity': 'String',
						'HealthCheckGracePeriod': 'Integer',
						'HealthCheckType': 'String',
						'InstanceId': 'String',
						'LaunchConfigurationName': 'String',
						'LoadBalancerNames': [],
						'MaxSize': 'String',
						'MetricsCollection': [],
						'MinSize': 'String',
						'NotificationConfigurations': [],
						'PlacementGroup': 'String',
						'Tags': [],
						'TerminationPolicies': [],
						'VPCZoneIdentifier': []
					}
				};
			}
		},
		LaunchConfiguration: {
			call: function () {
				return ASG
					.describeLaunchConfigurationsAsync({})
					.then(function(launchConfigurations) {
						_.each(launchConfigurations.LaunchConfigurations, function(config) {
							config.UserData = new Buffer(config.UserData, 'base64').toString('ascii');
						});
						return launchConfigurations;
					});
			},
			resBlock: 'LaunchConfigurations',
			rName: 'LaunchConfigurationName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::AutoScaling::LaunchConfiguration',
					'Properties': {
						'AssociatePublicIpAddress': 'Boolean',
						'BlockDeviceMappings': [],
						'ClassicLinkVPCId': 'String',
						'ClassicLinkVPCSecurityGroups': [],
						'EbsOptimized': 'Boolean',
						'IamInstanceProfile': 'String',
						'ImageId': 'String',
						'InstanceId': 'String',
						'InstanceMonitoring': 'Boolean',
						'InstanceType': 'String',
						'KernelId': 'String',
						'KeyName': 'String',
						'PlacementTenancy': 'String',
						'RamDiskId': 'String',
						'SecurityGroups': [],
						'SpotPrice': 'String',
						'UserData': 'String'
					}
				}
			}
		},
		LifecycleHook: {
			call: function () {
				return ASG
					.describeAutoScalingGroupsAsync({})
					.then(function (data) {
						return P.map(data.AutoScalingGroups, function (group) {
							return ASG.describeLifecycleHooksAsync({AutoScalingGroupName: group.AutoScalingGroupName})
						});
					})
			},
			resBlock: 'LifecycleHooks',
			rName: 'LifecycleHookName',
			preHook: function (data) {
				var cycles = [];
				_.each(data, function (hook) {
					cycles = cycles.concat(hook.LifecycleHooks)
				});
				return {LifecycleHooks: cycles};
			},
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::AutoScaling::LifecycleHook',
					'Properties': {
						'AutoScalingGroupName': 'String',
						'DefaultResult': 'String',
						'HeartbeatTimeout': 'Integer',
						'LifecycleTransition': 'String',
						'NotificationMetadata': 'String',
						'NotificationTargetARN': 'String',
						'RoleARN': 'String'
					}
				}
			}
		},
		ScalingPolicy: {
			call: function () {
				return ASG.describePoliciesAsync({})
			},
			resBlock: 'ScalingPolicies',
			rName: 'PolicyName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::AutoScaling::ScalingPolicy',
					'Properties': {
						'AdjustmentType': 'String',
						'AutoScalingGroupName': 'String',
						'Cooldown': 'String',
						'EstimatedInstanceWarmup': 'Integer',
						'MetricAggregationType': 'String',
						'MinAdjustmentMagnitude': 'Integer',
						'PolicyType': 'String',
						'ScalingAdjustment': 'String',
						'StepAdjustments': []
					}
				}
			}
		},
		ScheduledAction: {
			call: function () {
				return ASG.describeScheduledActionsAsync({})
			},
			resBlock: 'ScheduledUpdateGroupActions',
			rName: 'ScheduledActionName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::AutoScaling::ScheduledAction',
					'Properties': {
						'AutoScalingGroupName': 'String',
						'DesiredCapacity': 'Integer',
						'EndTime': 'Time stamp',
						'MaxSize': 'Integer',
						'MinSize': 'Integer',
						'Recurrence': 'String',
						'StartTime': 'Time stamp'
					}
				}
			}
		}
	};
};

module.exports = AutoScaling;
