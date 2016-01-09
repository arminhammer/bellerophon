/**
 * Created by arminhammer on 1/6/16.
 */

'use strict';

var _ = require('lodash');

var AvailableResources = {

	availableResourcesTemplate: {
		AutoScaling: {
			AutoScalingGroup: {},
			LaunchConfiguration: {},
			LifecycleHook: {},
			ScalingPolicy: {},
			ScheduledAction: {}
		},
		EC2: {
			CustomerGateway : {},
			DHCPOptions : {},
			EIP : {},
			EIPAssociation : {},
			Instance : {},
			InternetGateway : {},
			NetworkAcl : {},
			NetworkAclEntry : {},
			NetworkInterface : {},
			NetworkInterfaceAttachment : {},
			PlacementGroup : {},
			Route : {},
			RouteTable : {},
			SecurityGroup : {},
			SecurityGroupEgress : {},
			SecurityGroupIngress : {},
			SpotFleet : {},
			Subnet : {},
			SubnetNetworkAclAssociation : {},
			SubnetRouteTableAssociation : {},
			Volume : {},
			VolumeAttachment : {},
			VPC : {},
			VPCDHCPOptionsAssociation : {},
			VPCEndpoint : {},
			VPCGatewayAttachment : {},
			VPCPeeringConnection : {},
			VPNConnection : {},
			VPNConnectionRoute : {},
			VPNGateway : {},
			VPNGatewayRoutePropagation : {}
		}
	},

	getBlankAvailableResources: function() {
		return _.cloneDeep(this.availableResourcesTemplate);
	}

};

module.exports = AvailableResources;
