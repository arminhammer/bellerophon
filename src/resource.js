/**
 * Created by arminhammer on 11/24/15.
 */

"use strict";
var AWS = require('aws-sdk');
AWS.config.region = 'us-east-1';

var P = require('bluebird');

var ec2 = P.promisifyAll(new AWS.EC2());
var ASG = P.promisifyAll(new AWS.AutoScaling());

var Resource = {
	AutoScaling: {
		AutoScalingGroup: {
			call: ASG.describeAutoScalingGroupsAsync({}),
			resBlock: 'AutoScalingGroups',
			rName: "AutoScalingGroupName",
			construct: function (name, body) {
				this.inTemplate = false;
				this.templateParams = {};
				this.id = name;
				this.name = name + '-resource';
				this.body = body;
				this.block = {
					"Type": "AWS::AutoScaling::AutoScalingGroup",
					"Properties": {
						"AvailabilityZones": [],
						"Cooldown": "String",
						"DesiredCapacity": "String",
						"HealthCheckGracePeriod": "Integer",
						"HealthCheckType": "String",
						"InstanceId": "String",
						"LaunchConfigurationName": "String",
						"LoadBalancerNames": [],
						"MaxSize": "String",
						"MetricsCollection": [],
						"MinSize": "String",
						"NotificationConfigurations": [],
						"PlacementGroup": "String",
						"Tags": [],
						"TerminationPolicies": [],
						"VPCZoneIdentifier": []
					}
				};
			}
		},
		LaunchConfiguration: {
			call: ASG.describeLaunchConfigurationsAsync({}),
			resBlock: 'LaunchConfigurations',
			rName: 'LaunchConfigurationName',
			construct: function(name, body) {
				this.inTemplate = false;
				this.templateParams = {};
				this.id = name;
				this.name = name + '-resource';
				this.body = body;
				this.block = {
					"Type" : "AWS::AutoScaling::LaunchConfiguration",
					"Properties" : {
						"AssociatePublicIpAddress" : "Boolean",
						"BlockDeviceMappings" : [],
						"ClassicLinkVPCId" : "String",
						"ClassicLinkVPCSecurityGroups" : [],
						"EbsOptimized" : "Boolean",
						"IamInstanceProfile" : "String",
						"ImageId" : "String",
						"InstanceId" : "String",
						"InstanceMonitoring" : "Boolean",
						"InstanceType" : "String",
						"KernelId" : "String",
						"KeyName" : "String",
						"PlacementTenancy" : "String",
						"RamDiskId" : "String",
						"SecurityGroups" : [],
						"SpotPrice" : "String",
						"UserData" : "String"
					}
				}
			}
		},
		/*LifecycleHook: {
		 call: ASG.describeLifecycleHooksAsync({}),
		 resBlock: 'LifecycleHooks',
		 name: 'LifecycleHookName',
		 construct: function(name, body) {
		 this.inTemplate = false;
		 this.templateParams = {};
		 this.id = name;
		 this.name = name + '-resource';
		 this.body = body;
		 this.block = {}
		 }
		 },*/
		ScalingPolicy: {
			call: ASG.describePoliciesAsync({}),
			resBlock: 'ScalingPolicies',
			rName: 'PolicyName',
			construct: function(name, body) {
				this.inTemplate = false;
				this.templateParams = {};
				this.id = name;
				this.name = name + '-resource';
				this.body = body;
				this.block = {
					"Type" : "AWS::AutoScaling::ScalingPolicy",
					"Properties" : {
						"AdjustmentType" : "String",
						"AutoScalingGroupName" : "String",
						"Cooldown" : "String",
						"EstimatedInstanceWarmup" : "Integer",
						"MetricAggregationType" : "String",
						"MinAdjustmentMagnitude" : "Integer",
						"PolicyType" : "String",
						"ScalingAdjustment" : "String",
						"StepAdjustments" : []
					}
				}
			}
		},
		ScheduledAction: {
			call: ASG.describeScheduledActionsAsync({}),
			resBlock: 'ScheduledUpdateGroupActions',
			rName: 'ScheduledActionName',
			construct: function(name, body) {
				this.inTemplate = false;
				this.templateParams = {};
				this.id = name;
				this.name = name + '-resource';
				this.body = body;
				this.block = {
					"Type" : "AWS::AutoScaling::ScheduledAction",
					"Properties" : {
						"AutoScalingGroupName" : "String",
						"DesiredCapacity" : "Integer",
						"EndTime" : "Time stamp",
						"MaxSize" : "Integer",
						"MinSize" : "Integer",
						"Recurrence" : "String",
						"StartTime" : "Time stamp"
					}
				}
			}
		}
	},
	EC2: {
		CustomerGateway : {
			call: ec2.describeCustomerGatewaysAsync({}),
			resBlock: 'CustomerGateways',
			rName: 'CustomerGatewayId',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {
					"Type" : "AWS::EC2::CustomerGateway",
					"Properties" : {
						"BgpAsn" : "Number",
						"IpAddress" : "String",
						"Tags" :  [],
						"Type" : "String"
					}
				};
			}
		},
		DHCPOptions : {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		EIP : {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		EIPAssociation : {
			////call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		Instance : {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		InternetGateway : {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		NetworkAcl : {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		NetworkAclEntry : {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		NetworkInterface : {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		NetworkInterfaceAttachment : {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		PlacementGroup : {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		Route: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		RouteTable : {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		SecurityGroup: {
			call: ec2.describeSecurityGroupsAsync({}),
			resBlock: 'SecurityGroups',
			rName: 'GroupId',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {
					"Type": "AWS::EC2::SecurityGroup",
					"Properties": {
						"GroupDescription": "String",
						"SecurityGroupEgress": [],
						"SecurityGroupIngress": [],
						"Tags": [],
						"VpcId": "String"
					}
				};
			}
		},
		SecurityGroupEgress: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		SecurityGroupIngress: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		SpotFleet: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		Subnet: {
			call: ec2.describeSubnetsAsync({}),
			resBlock: 'Subnets',
			rName: 'SubnetId',
			construct: function(name, body) {
				this.inTemplate = false;
				this.templateParams = {};
				this.id = name;
				this.name = name + '-resource';
				this.body = body;
				this.block = {
					"Type" : "AWS::EC2::Subnet",
					"Properties" : {
						"AvailabilityZone": "String",
						"CidrBlock": "String",
						"MapPublicIpOnLaunch": "Boolean",
						"Tags": [],
						"VpcId": {"Ref": "String"}

					}
				};
			}
		},
		SubnetNetworkAclAssociation: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		SubnetRouteTableAssociation: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		Volume: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		VolumeAttachment: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		VPC:{
			call: ec2.describeVpcsAsync({}),
			resBlock: 'Vpcs',
			rName: 'VpcId',
			construct: function(name, body) {
				this.inTemplate = false;
				this.templateParams = {};
				this.id = name;
				this.name = name + '-resource';
				this.body = body;
				this.block = {
					"Type" : "AWS::EC2::VPC",
					"Properties" : {
						"CidrBlock" : "String",
						"EnableDnsSupport" : "Boolean",
						"EnableDnsHostnames" : "Boolean",
						"InstanceTenancy" : "String",
						"Tags" : []
					}
				};
			}
		},
		VPCDHCPOptionsAssociation : {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		VPCEndpoint: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		VPCGatewayAttachment: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		VPCPeeringConnection: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		VPNConnection: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		VPNConnectionRoute: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		VPNGateway: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		},
		VPNGatewayRoutePropagation: {
			//call: ec2.describeAsync({}),
			resBlock: '',
			rName: '',
			construct: function(name, body) {
				this.id = name;
				this.inTemplate = false;
				this.templateParams = {};
				this.name = name + '-resource';
				this.body = body;
				this.block = {

				};
			}
		}
	}
};

/*
 AWS_EC2_CustomerGateway
 AWS_EC2_DHCPOptions
 AWS_EC2_EIP
 AWS_EC2_EIPAssociation
 AWS_EC2_Instance
 AWS_EC2_InternetGateway
 AWS_EC2_NetworkAcl
 AWS_EC2_NetworkAclEntry
 AWS_EC2_NetworkInterface
 AWS_EC2_NetworkInterfaceAttachment
 AWS_EC2_PlacementGroup
 AWS_EC2_Route
 AWS_EC2_RouteTable
 AWS_EC2_SecurityGroupEgress
 AWS_EC2_SecurityGroupIngress
 AWS_EC2_SpotFleet
 AWS_EC2_SubnetNetworkAclAssociation
 AWS_EC2_SubnetRouteTableAssociation
 AWS_EC2_Volume
 AWS_EC2_VolumeAttachment
 AWS_EC2_VPCDHCPOptionsAssociation
 AWS_EC2_VPCEndpoint
 AWS_EC2_VPCGatewayAttachment
 AWS_EC2_VPCPeeringConnection
 AWS_EC2_VPNConnection
 AWS_EC2_VPNConnectionRoute
 AWS_EC2_VPNGateway
 AWS_EC2_VPNGatewayRoutePropagation
 */

module.exports = Resource;
