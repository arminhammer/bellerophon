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
		var vpc = new Resource.EC2.VPC.construct('resource-001', {});
		assert.equal(vpc.name, 'resource001Resource');
	});

	describe('AWS::Autoscaling', function() {

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

	describe('AWS::EC2', function() {

		describe('AWS::EC2::CustomerGateway', function() {
			it('AWS::EC2::CustomerGateway\'s call method should work', function(done) {
				return testCall(Resource.EC2.CustomerGateway, done);
			});

			it('AWS::EC2::\'s constructor method should work', function() {
				testConstructor(Resource.EC2.CustomerGateway);
			});
		});

		describe('AWS::EC2::DHCPOptions', function() {
			it('AWS::EC2::DHCPOptions\'s call method should work', function(done) {
				return testCall(Resource.EC2.DHCPOptions, done);
			});

			it('AWS::EC2::DHCPOptions\'s constructor method should work', function() {
				testConstructor(Resource.EC2.DHCPOptions);
			});
		});

		describe('AWS::EC2::EIP', function() {
			it('AWS::EC2::EIP\'s call method should work', function(done) {
				return testCall(Resource.EC2.EIP, done);
			});

			it('AWS::EC2::EIP\'s constructor method should work', function() {
				testConstructor(Resource.EC2.EIP);
			});
		});

		describe('AWS::EC2::EIPAssociation', function() {
			//it('AWS::EC2::EIPAssociation\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.EIPAssociation, done);
			//});

			it('AWS::EC2::EIPAssociation\'s constructor method should work', function() {
				testConstructor(Resource.EC2.EIPAssociation);
			});
		});

		describe('AWS::EC2::Instance', function() {
			it('AWS::EC2::Instance\'s call method should work', function(done) {
				return testCall(Resource.EC2.Instance, done);
			});

			it('AWS::EC2::Instance\'s constructor method should work', function() {
				testConstructor(Resource.EC2.Instance);
			});
		});

		describe('AWS::EC2::InternetGateway', function() {
			it('AWS::EC2::InternetGateway\'s call method should work', function(done) {
				return testCall(Resource.EC2.InternetGateway, done);
			});

			it('AWS::EC2::InternetGateway\'s constructor method should work', function() {
				testConstructor(Resource.EC2.InternetGateway);
			});
		});

		describe('AWS::EC2::NetworkAcl', function() {
			it('AWS::EC2::NetworkAcl\'s call method should work', function(done) {
				return testCall(Resource.EC2.NetworkAcl, done);
			});

			it('AWS::EC2::NetworkAcl\'s constructor method should work', function() {
				testConstructor(Resource.EC2.NetworkAcl);
			});
		});

		describe('AWS::EC2::NetworkAclEntry', function() {
			//it('AWS::EC2::NetworkAclEntry\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.NetworkAclEntry, done);
			//});

			it('AWS::EC2::NetworkAclEntry\'s constructor method should work', function() {
				testConstructor(Resource.EC2.NetworkAclEntry);
			});
		});

		describe('AWS::EC2::NetworkInterface', function() {
			it('AWS::EC2::NetworkInterface\'s call method should work', function(done) {
				return testCall(Resource.EC2.NetworkInterface, done);
			});

			it('AWS::EC2::NetworkInterface\'s constructor method should work', function() {
				testConstructor(Resource.EC2.NetworkInterface);
			});
		});

		describe('AWS::EC2::NetworkInterfaceAttachment', function() {
			//it('AWS::EC2::NetworkInterfaceAttachment\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.NetworkInterfaceAttachment, done);
			//});

			it('AWS::EC2::NetworkInterfaceAttachment\'s constructor method should work', function() {
				testConstructor(Resource.EC2.NetworkInterfaceAttachment);
			});
		});

		describe('AWS::EC2::PlacementGroup', function() {
			it('AWS::EC2::PlacementGroup\'s call method should work', function(done) {
				return testCall(Resource.EC2.PlacementGroup, done);
			});

			it('AWS::EC2::PlacementGroup\'s constructor method should work', function() {
				testConstructor(Resource.EC2.PlacementGroup);
			});
		});

		describe('AWS::EC2::Route', function() {
			//it('AWS::EC2::Route\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.Route, done);
			//});

			it('AWS::EC2::Route\'s constructor method should work', function() {
				testConstructor(Resource.EC2.Route);
			});
		});

		describe('AWS::EC2::RouteTable', function() {
			it('AWS::EC2::RouteTable\'s call method should work', function(done) {
				return testCall(Resource.EC2.RouteTable, done);
			});

			it('AWS::EC2::RouteTable\'s constructor method should work', function() {
				testConstructor(Resource.EC2.RouteTable);
			});
		});

		describe('AWS::EC2::SecurityGroup', function() {
			it('AWS::EC2::SecurityGroup\'s call method should work', function(done) {
				return testCall(Resource.EC2.SecurityGroup, done);
			});

			it('AWS::EC2::SecurityGroup\'s constructor method should work', function() {
				testConstructor(Resource.EC2.SecurityGroup);
			});
		});

		describe('AWS::EC2::SecurityGroupEgress', function() {
			//it('AWS::EC2::SecurityGroupEgress\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.SecurityGroupEgress, done);
			//});

			it('AWS::EC2::SecurityGroupEgress\'s constructor method should work', function() {
				testConstructor(Resource.EC2.SecurityGroupEgress);
			});
		});

		describe('AWS::EC2::SecurityGroupIngress', function() {
			//it('AWS::EC2::SecurityGroupIngress\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.SecurityGroupIngress, done);
			//});

			it('AWS::EC2::SecurityGroupIngress\'s constructor method should work', function() {
				testConstructor(Resource.EC2.SecurityGroupIngress);
			});
		});

		describe('AWS::EC2::SpotFleet', function() {
			it('AWS::EC2::SpotFleet\'s call method should work', function(done) {
				return testCall(Resource.EC2.SpotFleet, done);
			});

			it('AWS::EC2::SpotFleet\'s constructor method should work', function() {
				testConstructor(Resource.EC2.SpotFleet);
			});
		});

		describe('AWS::EC2::Subnet', function() {
			it('AWS::EC2::Subnet\'s call method should work', function(done) {
				return testCall(Resource.EC2.Subnet, done);
			});

			it('AWS::EC2::Subnet\'s constructor method should work', function() {
				testConstructor(Resource.EC2.Subnet);
			});
		});

		describe('AWS::EC2::SubnetNetworkAclAssociation', function() {
			//it('AWS::EC2::SubnetNetworkAclAssociation\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.SubnetNetworkAclAssociation, done);
			//});

			it('AWS::EC2::SubnetNetworkAclAssociation\'s constructor method should work', function() {
				testConstructor(Resource.EC2.SubnetNetworkAclAssociation);
			});
		});

		describe('AWS::EC2::SubnetRouteTableAssociation', function() {
			//it('AWS::EC2::SubnetRouteTableAssociation\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.SubnetRouteTableAssociation, done);
			//});

			it('AWS::EC2::SubnetRouteTableAssociation\'s constructor method should work', function() {
				testConstructor(Resource.EC2.SubnetRouteTableAssociation);
			});
		});

		describe('AWS::EC2::Volume', function() {
			it('AWS::EC2::Volume\'s call method should work', function(done) {
				return testCall(Resource.EC2.Volume, done);
			});

			it('AWS::EC2::Volume\'s constructor method should work', function() {
				testConstructor(Resource.EC2.Volume);
			});
		});

		describe('AWS::EC2::VolumeAttachment', function() {
			//it('AWS::EC2::VolumeAttachment\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.VolumeAttachment, done);
			//});

			it('AWS::EC2::VolumeAttachment\'s constructor method should work', function() {
				testConstructor(Resource.EC2.VolumeAttachment);
			});
		});

		describe('AWS::EC2::VPC', function() {
			it('AWS::EC2::VPC\'s call method should work', function(done) {
				return testCall(Resource.EC2.VPC, done);
			});

			it('AWS::EC2::VPC\'s constructor method should work', function() {
				testConstructor(Resource.EC2.VPC);
			});
		});

		describe('AWS::EC2::VPCDHCPOptionsAssociation', function() {
			//it('AWS::EC2::VPCDHCPOptionsAssociation\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.VPCDHCPOptionsAssociation, done);
			//});

			it('AWS::EC2::VPCDHCPOptionsAssociation\'s constructor method should work', function() {
				testConstructor(Resource.EC2.VPCDHCPOptionsAssociation);
			});
		});

		describe('AWS::EC2::VPCEndpoint', function() {
			it('AWS::EC2::VPCEndpoint\'s call method should work', function(done) {
				return testCall(Resource.EC2.VPCEndpoint, done);
			});

			it('AWS::EC2::VPCEndpoint\'s constructor method should work', function() {
				testConstructor(Resource.EC2.VPCEndpoint);
			});
		});

		describe('AWS::EC2::VPCGatewayAttachment', function() {
			//it('AWS::EC2::VPCGatewayAttachment\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.VPCGatewayAttachment, done);
			//});

			it('AWS::EC2::VPCGatewayAttachment\'s constructor method should work', function() {
				testConstructor(Resource.EC2.VPCGatewayAttachment);
			});
		});

		describe('AWS::EC2::VPCPeeringConnection', function() {
			it('AWS::EC2::VPCPeeringConnection\'s call method should work', function(done) {
				return testCall(Resource.EC2.VPCPeeringConnection, done);
			});

			it('AWS::EC2::VPCPeeringConnection\'s constructor method should work', function() {
				testConstructor(Resource.EC2.VPCPeeringConnection);
			});
		});

		describe('AWS::EC2::VPNConnection', function() {
			it('AWS::EC2::VPNConnection\'s call method should work', function(done) {
				return testCall(Resource.EC2.VPNConnection, done);
			});

			it('AWS::EC2::VPNConnection\'s constructor method should work', function() {
				testConstructor(Resource.EC2.VPNConnection);
			});
		});

		describe('AWS::EC2::VPNConnectionRoute', function() {
			//it('AWS::EC2::VPNConnectionRoute\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.VPNConnectionRoute, done);
			//});

			it('AWS::EC2::VPNConnectionRoute\'s constructor method should work', function() {
				testConstructor(Resource.EC2.VPNConnectionRoute);
			});
		});

		describe('AWS::EC2::VPNGateway', function() {
			it('AWS::EC2::VPNGateway\'s call method should work', function(done) {
				return testCall(Resource.EC2.VPNGateway, done);
			});

			it('AWS::EC2::VPNGateway\'s constructor method should work', function() {
				testConstructor(Resource.EC2.VPNGateway);
			});
		});

		describe('AWS::EC2::VPNGatewayRoutePropagation', function() {
			//it('AWS::EC2::VPNGatewayRoutePropagation\'s call method should work', function(done) {
			//	return testCall(Resource.EC2.VPNGatewayRoutePropagation, done);
			//});

			it('AWS::EC2::VPNGatewayRoutePropagation\'s constructor method should work', function() {
				testConstructor(Resource.EC2.VPNGatewayRoutePropagation);
			});
		});

	});

});

