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
				//AWS::CloudFormation::Authentication
				//AWS::CloudFormation::CustomResource
				//AWS::CloudFormation::Init
				//AWS::CloudFormation::Interface
				//AWS::CloudFormation::Stack
				//AWS::CloudFormation::WaitCondition
				//AWS::CloudFormation::WaitConditionHandle
			}
		},
		CloudFront: {
			icon: 'StorageContentDelivery_AmazonCloudFront',
			types: {
				//AWS::CloudFront::Distribution
			}
		},
		CloudTrail: {
			icon: 'ManagementTools_CloudTrail',
			types: {
				//AWS::CloudTrail::Trail
			}
		},
		CloudWatch: {
			icon: 'ManagementTools_CloudWatch',
			types: {
				//AWS::CloudWatch::Alarm
			}
		},
		CodeDeploy: {
			icon: 'DeploymentManagement_CodeDeploy',
			types: {
				//AWS::CodeDeploy::Application
				//AWS::CodeDeploy::DeploymentConfig
				//AWS::CodeDeploy::DeploymentGroup
			}
		},
		CodePipeline: {
			icon: 'DeploymentManagement_CodePipeline',
			types: {
				//AWS::CodePipeline::CustomActionType
				//AWS::CodePipeline::Pipeline
			}
		},
		Config: {
			icon: 'ManagementTools_Config',
			types: {
				//AWS::Config::ConfigRule
				//AWS::Config::ConfigurationRecorder
				//AWS::Config::DeliveryChannel
			}
		},
		DataPipeline: {
			icon: 'Analytics_DataPipeline',
			types: {
				//AWS::DataPipeline::Pipeline
			}
		},
		DirectoryService: {
			icon: 'SecurityIdentity_DirectoryService',
			types: {
				//AWS::DirectoryService::MicrosoftAD
				//AWS::DirectoryService::SimpleAD
			}
		},
		DynamoDB: {
			icon: 'Database_DynamoDB',
			types: {
				//AWS::DynamoDB::Table
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
				//AWS::ECS::Cluster
				//AWS::ECS::Service
				//AWS::ECS::TaskDefinition
			}
		},
		EFS: {
			icon: 'StorageContentDelivery_EFS',
			types: {
				//AWS::EFS::FileSystem
				//AWS::EFS::MountTarget
			}
		},
		ElastiCache: {
			icon: 'Database_AmazonElasticCache',
			types: {
				//AWS::ElastiCache::CacheCluster
				//AWS::ElastiCache::ParameterGroup
				//AWS::ElastiCache::ReplicationGroup
				//AWS::ElastiCache::SecurityGroup
				//AWS::ElastiCache::SecurityGroupIngress
				//AWS::ElastiCache::SubnetGroup
			}
		},
		ElasticBeanstalk: {
			icon: 'Compute_Elastic Beanstalk',
			types: {
				//AWS::ElasticBeanstalk::Application
				//AWS::ElasticBeanstalk::ApplicationVersion
				//AWS::ElasticBeanstalk::ConfigurationTemplate
				//AWS::ElasticBeanstalk::Environment
			}
		},
		ElasticLoadBalancing: {
			icon: 'Compute_ElasticLoadBalancing',
			types: {
				//AWS::ElasticLoadBalancing::LoadBalancer
			}
		},
		IAM: {
			icon: 'SecurityIdentity_IdentityAccessManagement',
			types: {
				//AWS::IAM::AccessKey
				//AWS::IAM::Group
				//AWS::IAM::InstanceProfile
				//AWS::IAM::ManagedPolicy
				//AWS::IAM::Policy
				//AWS::IAM::Role
				//AWS::IAM::User
				//AWS::IAM::UserToGroupAddition
			}
		},
		Kinesis: {
			icon: 'Analytics_Kinesis',
			types: {
				//AWS::Kinesis::Stream
			}
		},
		KMS: {
			icon: 'SecurityIdentity_KeyManagementService',
			types: {
				//AWS::KMS::Key
			}
		},
		Lambda: {
			icon: 'Compute_Lambda',
			types: {
				//AWS::Lambda::EventSourceMapping
				//AWS::Lambda::Function
				//AWS::Lambda::Permission
			}
		},
		Logs: {
			icon: 'Compute_AmazonEC2_CloudWatch',
			types: {
				//AWS::Logs::Destination
				//AWS::Logs::LogGroup
				//AWS::Logs::LogStream
				//AWS::Logs::MetricFilter
				//AWS::Logs::SubscriptionFilter
			}
		},
		OpsWorks: {
			icon: 'ManagementTools_OpsWorks',
			types: {
				//AWS::OpsWorks::App
				//AWS::OpsWorks::ElasticLoadBalancerAttachment
				//AWS::OpsWorks::Instance
				//AWS::OpsWorks::Layer
				//AWS::OpsWorks::Stack
			}
		},
		RDS: {
			icon: 'Database_AmazonRDS',
			types: {
				//AWS::RDS::DBCluster
				//AWS::RDS::DBClusterParameterGroup
				//AWS::RDS::DBInstance
				//AWS::RDS::DBParameterGroup
				//AWS::RDS::DBSecurityGroup
				//AWS::RDS::DBSecurityGroupIngress
				//AWS::RDS::DBSubnetGroup
				//AWS::RDS::EventSubscription
				//AWS::RDS::OptionGroup
			}
		},
		Redshift: {
			icon: 'Database_AmazonRedShift',
			types: {
				//AWS::Redshift::Cluster
				//AWS::Redshift::ClusterParameterGroup
				//AWS::Redshift::ClusterSecurityGroup
				//AWS::Redshift::ClusterSecurityGroupIngress
				//AWS::Redshift::ClusterSubnetGroup
			}
		},
		Route53: {
			icon: 'Networking_Route53',
			types: {
				//AWS::Route53::HealthCheck
				//AWS::Route53::HostedZone
				//AWS::Route53::RecordSet
				//AWS::Route53::RecordSetGroup
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
				//AWS::SDB::Domain
			}
		},
		SNS: {
			icon: 'MobileServices_SNS',
			types: {
				//AWS::SNS::Topic
				//AWS::SNS::TopicPolicy
			}
		},
		SQS: {
			icon: 'ApplicationServices_AmazonSQS',
			types: {
				//AWS::SQS::Queue
				//AWS::SQS::QueuePolicy
			}
		},
		SSM: {
			icon: '',
			types: {
				//AWS::SSM::Document
			}
		},
		WAF: {
			icon: '',
			types: {
				//AWS::WAF::ByteMatchSet
				//AWS::WAF::IPSet
				//AWS::WAF::Rule
				//AWS::WAF::SqlInjectionMatchSet
				//AWS::WAF::WebACL
			}
		},
		WorkSpaces: {
			icon: 'AmazonWorkSpaces',
			types: {
				//AWS::WorkSpaces::Workspace
			}
		}
	},

	getBlankAvailableResources: function() {
		return _.cloneDeep(this.availableResourcesTemplate);
	}

};

module.exports = AvailableResources;
