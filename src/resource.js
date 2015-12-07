/**
 * Created by arminhammer on 11/24/15.
 */

"use strict";

var Resource = function() {

	var ResourceBase = function() {
		var self = this;
		self.inTemplate = false;
		self.templateParams = {};
	};

	var AWS_AutoScaling_AutoScalingGroup = function(name, body) {
		ResourceBase.call(this);
		var self = this;
		self.id = name;
		self.name = name + '-resource';
		self.body = body;
		self.block = {
			"Type" : "AWS::AutoScaling::AutoScalingGroup",
			"Properties" : {
				"AvailabilityZones" : [],
				"Cooldown" : "String",
				"DesiredCapacity" : "String",
				"HealthCheckGracePeriod" : "Integer",
				"HealthCheckType" : "String",
				"InstanceId" : "String",
				"LaunchConfigurationName" : "String",
				"LoadBalancerNames" : [],
				"MaxSize" : "String",
				"MetricsCollection" : [],
				"MinSize" : "String",
				"NotificationConfigurations" : [],
				"PlacementGroup" : "String",
				"Tags" : [],
				"TerminationPolicies" : [],
				"VPCZoneIdentifier" : []
			}
		};
	};
	AWS_AutoScaling_AutoScalingGroup.prototype = Object.create(ResourceBase.prototype);

	var AWS_AutoScaling_LaunchConfiguration = function(name, body) {
		ResourceBase.call(this);
		var self = this;
		self.id = name;
		self.name = name + '-resource';
		self.body = body;
		self.block = {
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

	};
	AWS_AutoScaling_LaunchConfiguration.prototype = Object.create(ResourceBase.prototype);

	var AWS_AutoScaling_LifecycleHook = function(name, body) {
		ResourceBase.call(this);
		var self = this;
		self.id = name;
		self.name = name + '-resource';
		self.body = body;
		self.block = {}
	};
	AWS_AutoScaling_LifecycleHook.prototype = Object.create(ResourceBase.prototype);

	var AWS_AutoScaling_ScalingPolicy = function(name, body) {
		ResourceBase.call(this);
		var self = this;
		self.id = name;
		self.name = name + '-resource';
		self.body = body;
		self.block = {}
	};
	AWS_AutoScaling_ScalingPolicy.prototype = Object.create(ResourceBase.prototype);

	var AWS_AutoScaling_ScheduledAction = function(name, body) {
		ResourceBase.call(this);
		var self = this;
		self.id = name;
		self.name = name + '-resource';
		self.body = body;
		self.block = {}
	};
	AWS_AutoScaling_ScheduledAction.prototype = Object.create(ResourceBase.prototype);


	/*

	 var  = function(name, body) {
	 ResourceBase.call(this);
	 var self = this;
	 self.id = name;
	 self.name = name + '-resource';
	 self.body = body;
	 self.block = {}
	 };
	 };
	 .prototype = Object.create(ResourceBase.prototype);

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

	var AWS_EC2_VPC = function(name, body) {
		ResourceBase.call(this);
		var self = this;
		self.id = name;
		self.name = name + '-resource';
		self.body = body;
		self.block = {
			"Type" : "AWS::EC2::VPC",
			"Properties" : {
				"CidrBlock" : "String",
				"EnableDnsSupport" : "Boolean",
				"EnableDnsHostnames" : "Boolean",
				"InstanceTenancy" : "String",
				"Tags" : []
			}
		};
	};
	AWS_EC2_VPC.prototype = Object.create(ResourceBase.prototype);

	var AWS_EC2_SUBNET = function(name, body) {
		ResourceBase.call(this);
		var self = this;
		self.id = name;
		self.name = name + '-resource';
		self.body = body;
		self.block = {
			"Type" : "AWS::EC2::Subnet",
			"Properties" : {
				"AvailabilityZone": "String",
				"CidrBlock": "String",
				"MapPublicIpOnLaunch": "Boolean",
				"Tags": [],
				"VpcId": {"Ref": "String"}

			}
		};
	};
	AWS_EC2_SUBNET.prototype = Object.create(ResourceBase.prototype);

	var AWS_EC2_SECURITYGROUP = function(name, body) {
		ResourceBase.call(this);
		var self = this;
		self.id = name;
		self.name = name + '-resource';
		self.body = body;
		self.block = {
			"Type" : "AWS::EC2::SecurityGroup",
			"Properties" : {
				"GroupDescription" : "String",
				"SecurityGroupEgress" : [],
				"SecurityGroupIngress" : [],
				"Tags" :  [],
				"VpcId" : "String"
			}
		};
	};
	AWS_EC2_SECURITYGROUP.prototype = Object.create(ResourceBase.prototype);

	return {
		ResourceBase: ResourceBase,
		AWS_AutoScaling_AutoScalingGroup: AWS_AutoScaling_AutoScalingGroup,
		AWS_AutoScaling_LaunchConfiguration: AWS_AutoScaling_LaunchConfiguration,
		AWS_AutoScaling_LifecycleHook: AWS_AutoScaling_LifecycleHook,
		AWS_AutoScaling_ScalingPolicy: AWS_AutoScaling_ScalingPolicy,
		AWS_AutoScaling_ScheduledAction: AWS_AutoScaling_ScheduledAction,
		AWS_EC2_VPC: AWS_EC2_VPC,
		AWS_EC2_SUBNET: AWS_EC2_SUBNET,
		AWS_EC2_SECURITYGROUP: AWS_EC2_SECURITYGROUP
	}

};

module.exports = Resource;
