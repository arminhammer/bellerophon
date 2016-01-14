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
			//icon: '',
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
			//icon: '',
			types: {
				//AWS::CloudFront::Distribution
			}
		},
		CloudTrail: {
			//icon: '',
			types: {
				//AWS::CloudTrail::Trail
			}
		},
		CloudWatch: {
			//icon: '',
			types: {
				//AWS::CloudWatch::Alarm
			}
		},
		CodeDeploy: {
			//icon: '',
			types: {
				//AWS::CodeDeploy::Application
				//AWS::CodeDeploy::DeploymentConfig
				//AWS::CodeDeploy::DeploymentGroup
			}
		},
		CodePipeline: {
			//icon: '',
			types: {
				//AWS::CodePipeline::CustomActionType
				//AWS::CodePipeline::Pipeline
			}
		},
		Config: {
			//icon: '',
			types: {
				//AWS::Config::ConfigRule
				//AWS::Config::ConfigurationRecorder
				//AWS::Config::DeliveryChannel
			}
		},
		DataPipeline: {
			//icon: '',
			types: {
				//AWS::DataPipeline::Pipeline
			}
		},
		DirectoryService: {
			//icon: '',
			types: {
				//AWS::DirectoryService::MicrosoftAD
				//AWS::DirectoryService::SimpleAD
			}
		},
		DynamoDB: {
			//icon: '',
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
			//icon: '',
			types: {
				//AWS::ECS::Cluster
				//AWS::ECS::Service
				//AWS::ECS::TaskDefinition
			}
		},
		EFS: {
			//icon: '',
			types: {
				//AWS::EFS::FileSystem
				//AWS::EFS::MountTarget
			}
		},
		ElastiCache: {
			//icon: '',
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
			//icon: '',
			types: {
				//AWS::ElasticBeanstalk::Application
				//AWS::ElasticBeanstalk::ApplicationVersion
				//AWS::ElasticBeanstalk::ConfigurationTemplate
				//AWS::ElasticBeanstalk::Environment
			}
		},
		ElasticLoadBalancing: {
			//icon: '',
			types: {
				//AWS::ElasticLoadBalancing::LoadBalancer
			}
		},
		IAM: {
			//icon: '',
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
			//icon: '',
			types: {
				//AWS::Kinesis::Stream
			}
		},
		KMS: {
			//icon: '',
			types: {
				//AWS::KMS::Key
			}
		},
		Lambda: {
			//icon: '',
			types: {
				//AWS::Lambda::EventSourceMapping
				//AWS::Lambda::Function
				//AWS::Lambda::Permission
			}
		},
		Logs: {
			//icon: '',
			types: {
				//AWS::Logs::Destination
				//AWS::Logs::LogGroup
				//AWS::Logs::LogStream
				//AWS::Logs::MetricFilter
				//AWS::Logs::SubscriptionFilter
			}
		},
		OpsWorks: {
			//icon: '',
			types: {
				//AWS::OpsWorks::App
				//AWS::OpsWorks::ElasticLoadBalancerAttachment
				//AWS::OpsWorks::Instance
				//AWS::OpsWorks::Layer
				//AWS::OpsWorks::Stack
			}
		},
		RDS: {
			//icon: '',
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
			//icon: '',
			types: {
				//AWS::Redshift::Cluster
				//AWS::Redshift::ClusterParameterGroup
				//AWS::Redshift::ClusterSecurityGroup
				//AWS::Redshift::ClusterSecurityGroupIngress
				//AWS::Redshift::ClusterSubnetGroup
			}
		},
		Route53: {
			//icon: '',
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
			//icon: '',
			types: {
				//AWS::SDB::Domain
			}
		},
		SNS: {
			//icon: '',
			types: {
				//AWS::SNS::Topic
				//AWS::SNS::TopicPolicy
			}
		},
		SQS: {
			//icon: '',
			types: {
				//AWS::SQS::Queue
				//AWS::SQS::QueuePolicy
			}
		},
		SSM: {
			//icon: '',
			types: {
				//AWS::SSM::Document
			}
		},
		WAF: {
			//icon: '',
			types: {
				//AWS::WAF::ByteMatchSet
				//AWS::WAF::IPSet
				//AWS::WAF::Rule
				//AWS::WAF::SqlInjectionMatchSet
				//AWS::WAF::WebACL
			}
		},
		WorkSpaces: {
			//icon: '',
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
