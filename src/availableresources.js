/**
 * Created by arminhammer on 1/6/16.
 */

'use strict';

var _ = require('lodash');

var AvailableResources = {

	availableResourcesTemplate: {
		AutoScaling: {
			icon: 'Compute_AmazonEC2_Instances',
			types: {
				AutoScalingGroup: {},
				LaunchConfiguration: {},
				LifecycleHook: {},
				ScalingPolicy: {},
				ScheduledAction: {}
			}
		},
		CloudFormation : {
			icon: 'ManagementTools_CloudFormation',
			types: {
				Authentication: {},
				CustomResource: {},
				Init: {},
				Interface: {},
				Stack: {},
				WaitCondition: {},
				WaitConditionHandle: {}
			}
		},
		CloudFront: {
			icon: 'StorageContentDelivery_AmazonCloudFront',
			types: {
				Distribution: {}
			}
		},
		CloudTrail: {
			icon: 'ManagementTools_CloudTrail',
			types: {
				Trail: {}
			}
		},
		CloudWatch: {
			icon: 'ManagementTools_CloudWatch',
			types: {
				Alarm: {}
			}
		},
		CodeDeploy: {
			icon: 'DeploymentManagement_CodeDeploy',
			types: {
				Application: {},
				DeploymentConfig: {},
				DeploymentGroup: {}
			}
		},
		CodePipeline: {
			icon: 'DeploymentManagement_CodePipeline',
			types: {
				CustomActionType: {},
				Pipeline: {}
			}
		},
		Config: {
			icon: 'ManagementTools_Config',
			types: {
				ConfigRule: {},
				ConfigurationRecorder: {},
				DeliveryChannel: {}
			}
		},
		DataPipeline: {
			icon: 'Analytics_DataPipeline',
			types: {
				Pipeline: {}
			}
		},
		DirectoryService: {
			icon: 'SecurityIdentity_DirectoryService',
			types: {
				MicrosoftAD: {},
				SimpleAD: {}
			}
		},
		DynamoDB: {
			icon: 'Database_DynamoDB',
			types: {
				Table: {}
			}
		},
		EC2: {
			icon: 'Compute_AmazonEC2_Instance',
			types: {
				CustomerGateway: {},
				DHCPOptions: {},
				EIP: {},
				EIPAssociation: {},
				Instance: {},
				InternetGateway: {},
				NetworkAcl: {},
				NetworkAclEntry: {},
				NetworkInterface: {},
				NetworkInterfaceAttachment: {},
				PlacementGroup: {},
				Route: {},
				RouteTable: {},
				SecurityGroup: {},
				SecurityGroupEgress: {},
				SecurityGroupIngress: {},
				SpotFleet: {},
				Subnet: {},
				SubnetNetworkAclAssociation: {},
				SubnetRouteTableAssociation: {},
				Volume: {},
				VolumeAttachment: {},
				VPC: {},
				VPCDHCPOptionsAssociation: {},
				VPCEndpoint: {},
				VPCGatewayAttachment: {},
				VPCPeeringConnection: {},
				VPNConnection: {},
				VPNConnectionRoute: {},
				VPNGateway: {},
				VPNGatewayRoutePropagation: {}
			}
		},
		ECS: {
			icon: 'Compute_AmazonEC2ContainerService',
			types: {
				Cluster: {},
				Service: {},
				TaskDefinition: {}
			}
		},
		EFS: {
			icon: 'StorageContentDelivery_EFS',
			types: {
				FileSystem: {},
				MountTarget: {}
			}
		},
		ElastiCache: {
			icon: 'Database_AmazonElasticCache',
			types: {
				CacheCluster: {},
				ParameterGroup: {},
				ReplicationGroup: {},
				SecurityGroup: {},
				SecurityGroupIngress: {},
				SubnetGroup: {}
			}
		},
		ElasticBeanstalk: {
			icon: 'Compute_Elastic Beanstalk',
			types: {
				Application: {},
				ApplicationVersion: {},
				ConfigurationTemplate: {},
				Environment: {}
			}
		},
		ElasticLoadBalancing: {
			icon: 'Compute_ElasticLoadBalancing',
			types: {
				LoadBalancer: {}
			}
		},
		IAM: {
			icon: 'SecurityIdentity_IdentityAccessManagement',
			types: {
				AccessKey: {},
				Group: {},
				InstanceProfile: {},
				ManagedPolicy: {},
				Policy: {},
				Role: {},
				User: {},
				UserToGroupAddition: {}
			}
		},
		Kinesis: {
			icon: 'Analytics_Kinesis',
			types: {
				Stream: {}
			}
		},
		KMS: {
			icon: 'SecurityIdentity_KeyManagementService',
			types: {
				Key: {}
			}
		},
		Lambda: {
			icon: 'Compute_Lambda',
			types: {
				EventSourceMapping: {},
				Function: {},
				Permission: {}
			}
		},
		Logs: {
			icon: 'Compute_AmazonEC2_CloudWatch',
			types: {
				Destination: {},
				LogGroup: {},
				LogStream: {},
				MetricFilter: {},
				SubscriptionFilter: {}
			}
		},
		OpsWorks: {
			icon: 'ManagementTools_OpsWorks',
			types: {
				App: {},
				ElasticLoadBalancerAttachment: {},
				Instance: {},
				Layer: {},
				Stack: {}
			}
		},
		RDS: {
			icon: 'Database_AmazonRDS',
			types: {
				DBCluster: {},
				DBClusterParameterGroup: {},
				DBInstance: {},
				DBParameterGroup: {},
				DBSecurityGroup: {},
				DBSecurityGroupIngress: {},
				DBSubnetGroup: {},
				EventSubscription: {},
				OptionGroup: {}
			}
		},
		Redshift: {
			icon: 'Database_AmazonRedShift',
			types: {
				Cluster: {},
				ClusterParameterGroup: {},
				ClusterSecurityGroup: {},
				ClusterSecurityGroupIngress: {},
				ClusterSubnetGroup: {}
			}
		},
		Route53: {
			icon: 'Networking_Route53',
			types: {
				HealthCheck: {},
				HostedZone: {},
				RecordSet: {},
				RecordSetGroup: {}
			}
		},
		S3: {
			icon: 'StorageContentDelivery_AmazonS3',
			types: {
				Bucket: {},
				BucketPolicy: {}
			}
		},
		SDB: {
			icon: '',
			types: {
				Domain: {}
			}
		},
		SNS: {
			icon: 'MobileServices_SNS',
			types: {
				Topic: {},
				TopicPolicy: {}
			}
		},
		SQS: {
			icon: 'ApplicationServices_AmazonSQS',
			types: {
				Queue: {},
				QueuePolicy: {}
			}
		},
		SSM: {
			icon: '',
			types: {
				Document: {}
			}
		},
		WAF: {
			icon: '',
			types: {
				ByteMatchSet: {},
				IPSet: {},
				Rule: {},
				SqlInjectionMatchSet: {},
				WebACL: {}
			}
		},
		WorkSpaces: {
			icon: 'AmazonWorkSpaces',
			types: {
				Workspace: {}
			}
		}
	},

	getBlankAvailableResources: function() {
		return _.cloneDeep(this.availableResourcesTemplate);
	}

};

module.exports = AvailableResources;
