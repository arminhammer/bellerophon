'use strict';
var P = require('bluebird');

var Util = require('./util');

var EC2 = function(AWS) {

	var ec2 = P.promisifyAll(new AWS.EC2());

	return {
		CustomerGateway: {
			call: function() { return ec2.describeCustomerGatewaysAsync({}) },
			resBlock: 'CustomerGateways',
			rName: 'CustomerGatewayId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::CustomerGateway',
					'Properties': {
						'BgpAsn': 'Number',
						'IpAddress': 'String',
						'Tags': [],
						'Type': 'String'
					}
				};
			}
		},
		DHCPOptions: {
			call: function() { return ec2.describeDhcpOptionsAsync({}) },
			resBlock: 'DhcpOptions',
			rName: 'DhcpOptionsId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::DHCPOptions',
					'Properties': {
						'DomainName': 'String',
						'DomainNameServers': [],
						'NetbiosNameServers': [],
						'NetbiosNodeType': 'Number',
						'NtpServers': [],
						'Tags': []
					}
				};
			}
		},
		EIP: {
			call: function() { return ec2.describeAddressesAsync({}) },
			resBlock: 'Addresses',
			rName: 'PublicIp',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::EIP',
					'Properties': {
						'InstanceId': 'String',
						'Domain': 'String'
					}
				};
			}
		},
		//EIPAssociation : {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		//}
		//},
		Instance: {
			call: function() {
				return ec2
					.describeInstancesAsync({})
					.then(function (data) {
						var returnInstances = [];
						return P
							.map(data.Reservations, function(reservation) {
								return P
									.map(reservation.Instances, function (instance) {
										return ec2
											.describeInstanceAttributeAsync({ Attribute: 'userData', InstanceId: instance.InstanceId})
											.then(function(userData) {
												if(userData.UserData.Value) {
													instance.UserData = new Buffer(userData.UserData.Value, 'base64').toString('ascii');
												}
											})
											/*.then(function() {
												return ec2.describeInstanceAttributeAsync({ Attribute: 'kernel', InstanceId: instance.InstanceId})
											})
											.then(function(kernel) {
												instance.UserData = kernel.KernelId.Value;
											})*/
											//"ramdisk"
											//"disableApiTermination"
											//"instanceInitiatedShutdownBehavior"
											//"groupSet"
											//"sriovNetSupport"
											.then(function() {
												returnInstances.push(instance);
											})
									})
							})
							.then(function() {
								return { Instances: returnInstances };
							});
					})
			},
			resBlock: 'Instances',
			rName: 'InstanceId',
			/*preHook: function (data) {
			 var returnInstances = [];
			 _.each(data.Reservations, function (reservation) {
			 _.each(reservation.Instances, function (instance) {
			 returnInstances.push(instance);
			 });
			 });
			 return {Instances: returnInstances};
			 },*/
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::Instance',
					'Properties': {
						'AvailabilityZone': 'String',
						'BlockDeviceMappings': [],
						'DisableApiTermination': 'Boolean',
						'EbsOptimized': 'Boolean',
						'IamInstanceProfile': 'String',
						'ImageId': 'String',
						'InstanceInitiatedShutdownBehavior': 'String',
						'InstanceType': 'String',
						'KernelId': 'String',
						'KeyName': 'String',
						'Monitoring': 'Boolean',
						'NetworkInterfaces': [],
						'PlacementGroupName': 'String',
						'PrivateIpAddress': 'String',
						'RamdiskId': 'String',
						'SecurityGroupIds': ['String'],
						'SecurityGroups': ['String'],
						'SourceDestCheck': 'Boolean',
						'SsmAssociations': [],
						'SubnetId': 'String',
						'Tags': [],
						'Tenancy': 'String',
						'UserData': 'String',
						'Volumes': [],
						'AdditionalInfo': 'String'
					}
				};
			}
		},
		InternetGateway: {
			call: function() { return ec2.describeInternetGatewaysAsync({}) },
			resBlock: 'InternetGateways',
			rName: 'InternetGatewayId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::InternetGateway',
					'Properties': {
						'Tags': []
					}
				};
			}
		},
		NetworkAcl: {
			call: function() { return ec2.describeNetworkAclsAsync({}) },
			resBlock: 'NetworkAcls',
			rName: 'NetworkAclId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::NetworkAcl',
					'Properties': {
						'Tags': [],
						'VpcId': 'String'
					}
				};
			}
		},
		//NetworkAclEntry : {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		//}
		//},
		NetworkInterface: {
			call: function() { return ec2.describeNetworkInterfacesAsync({}) },
			resBlock: 'NetworkInterfaces',
			rName: 'NetworkInterfaceId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::NetworkInterface',
					'Properties': {
						'Description': 'String',
						'GroupSet': ['String'],
						'PrivateIpAddress': 'String',
						'PrivateIpAddresses': [],
						'SecondaryPrivateIpAddressCount': 'Integer',
						'SourceDestCheck': 'Boolean',
						'SubnetId': 'String',
						'Tags': []
					}
				};
			}
		},
		//NetworkInterfaceAttachment : {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {
		//};
		//}
		//},
		PlacementGroup: {
			call: function() { return ec2.describePlacementGroupsAsync({}) },
			resBlock: 'PlacementGroups',
			rName: 'GroupName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::PlacementGroup',
					'Properties': {
						'Strategy': 'String'
					}
				};
			}
		},
		//Route: {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		//}
		//},
		RouteTable: {
			call: function() { return ec2.describeRouteTablesAsync({}) },
			resBlock: 'RouteTables',
			rName: 'RouteTableId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::RouteTable',
					'Properties': {
						'VpcId': 'String',
						'Tags': []
					}
				};
			}
		},
		SecurityGroup: {
			call: function() { return ec2.describeSecurityGroupsAsync({}) },
			resBlock: 'SecurityGroups',
			rName: 'GroupId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::SecurityGroup',
					'Properties': {
						'GroupDescription': 'String',
						'SecurityGroupEgress': [],
						'SecurityGroupIngress': [],
						'Tags': [],
						'VpcId': 'String'
					}
				};
			}
		},
		//SecurityGroupEgress: {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		// }
		//},
		//SecurityGroupIngress: {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		//}
		//},
		SpotFleet: {
			call: function() { return ec2.describeSpotFleetRequestsAsync({}) },
			resBlock: 'SpotFleetRequestConfigs',
			rName: 'SpotFleetRequestId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::SpotFleet',
					'Properties': {
						'SpotFleetRequestConfigData': 'SpotFleetRequestConfigData'
					}
				};
			}
		},
		Subnet: {
			call: function() { return ec2.describeSubnetsAsync({}) },
			resBlock: 'Subnets',
			rName: 'SubnetId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::Subnet',
					'Properties': {
						'AvailabilityZone': 'String',
						'CidrBlock': 'String',
						'MapPublicIpOnLaunch': 'Boolean',
						'Tags': [],
						'VpcId': {'Ref': 'String'}

					}
				};
			}
		},
		//SubnetNetworkAclAssociation: {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		//}
		//},
		//SubnetRouteTableAssociation: {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		//}
		//},
		Volume: {
			call: function() { return ec2.describeVolumesAsync({}) },
			resBlock: 'Volumes',
			rName: 'VolumeId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::Volume',
					'Properties': {
						'AutoEnableIO': 'Boolean',
						'AvailabilityZone': 'String',
						'Encrypted': 'Boolean',
						'Iops': 'Number',
						'KmsKeyId': 'String',
						'Size': 'String',
						'SnapshotId': 'String',
						'Tags': [],
						'VolumeType': 'String'
					}
				};
			}
		},
		//VolumeAttachment: {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		//}
		//},
		VPC: {
			call: function() { return ec2.describeVpcsAsync({}) },
			resBlock: 'Vpcs',
			rName: 'VpcId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::VPC',
					'Properties': {
						'CidrBlock': 'String',
						'EnableDnsSupport': 'Boolean',
						'EnableDnsHostnames': 'Boolean',
						'InstanceTenancy': 'String',
						'Tags': []
					}
				};
			}
		},
		//VPCDHCPOptionsAssociation : {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		//}
		//},
		VPCEndpoint: {
			call: function() { return ec2.describeVpcEndpointsAsync({}) },
			resBlock: 'VpcEndpoints',
			rName: 'VpcEndpointId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::VPCEndpoint',
					'Properties': {
						'PolicyDocument': {},
						'RouteTableIds': [],
						'ServiceName': 'String',
						'VpcId': 'String'
					}
				};
			}
		},
		//VPCGatewayAttachment: {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		//}
		//},
		VPCPeeringConnection: {
			call: function() { return ec2.describeVpcPeeringConnectionsAsync({}) },
			resBlock: 'VpcPeeringConnections',
			rName: 'VpcPeeringConnectionId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::VPCPeeringConnection',
					'Properties': {
						'PeerVpcId': 'String',
						'Tags': [],
						'VpcId': 'String'
					}
				};
			}
		},
		VPNConnection: {
			call: function() { return ec2.describeVpnConnectionsAsync({}) },
			resBlock: 'VpnConnections',
			rName: 'VpnConnectionId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::VPNConnection',
					'Properties': {
						'Type': 'String',
						'CustomerGatewayId': 'GatewayID',
						'StaticRoutesOnly': 'Boolean',
						'Tags': [],
						'VpnGatewayId': 'GatewayID'
					}
				};
			}
		},
		//VPNConnectionRoute: {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		//}
		//},
		VPNGateway: {
			call: function() { return ec2.describeVpnGatewaysAsync({}) },
			resBlock: 'VpnGateways',
			rName: 'VpnGatewayId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::EC2::VPNGateway',
					'Properties': {
						'Type': 'String',
						'Tags': []
					}
				};
			}
		}
		//VPNGatewayRoutePropagation: {
		//call: ec2.describeAsync({}),
		//resBlock: '',
		//rName: '',
		//construct: function(name, body) {
		//Util.baseConstruct(this, name, body);
		//this.block = {};
		//}
		//}
	};
};

module.exports = EC2;
