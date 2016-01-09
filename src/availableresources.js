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
		CloudFormation : {
			//AWS::CloudFormation::Authentication
			//AWS::CloudFormation::CustomResource
			//AWS::CloudFormation::Init
			//AWS::CloudFormation::Interface
			//AWS::CloudFormation::Stack
			//AWS::CloudFormation::WaitCondition
			//AWS::CloudFormation::WaitConditionHandle
		},
		CloudFront: {
			//AWS::CloudFront::Distribution
		},
		CloudTrail: {
			//AWS::CloudTrail::Trail
		},
		CloudWatch: {
			//AWS::CloudWatch::Alarm
		},
		CodeDeploy: {
			//AWS::CodeDeploy::Application
			//AWS::CodeDeploy::DeploymentConfig
			//AWS::CodeDeploy::DeploymentGroup
		},
		CodePipeline: {
			//AWS::CodePipeline::CustomActionType
			//AWS::CodePipeline::Pipeline
		},
		Config: {
			//AWS::Config::ConfigRule
			//AWS::Config::ConfigurationRecorder
			//AWS::Config::DeliveryChannel
		},
		DataPipeline: {
			//AWS::DataPipeline::Pipeline
		},
		DirectoryService: {
			//AWS::DirectoryService::MicrosoftAD
			//AWS::DirectoryService::SimpleAD
		},
		DynamoDB: {
			//AWS::DynamoDB::Table
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
		},
		ECS: {
			//AWS::ECS::Cluster
			//AWS::ECS::Service
			//AWS::ECS::TaskDefinition
		},
		EFS: {
			//AWS::EFS::FileSystem
			//AWS::EFS::MountTarget
		},
		ElastiCache: {
			//AWS::ElastiCache::CacheCluster
			//AWS::ElastiCache::ParameterGroup
			//AWS::ElastiCache::ReplicationGroup
			//AWS::ElastiCache::SecurityGroup
			//AWS::ElastiCache::SecurityGroupIngress
			//AWS::ElastiCache::SubnetGroup
		},
		ElasticBeanstalk: {
			//AWS::ElasticBeanstalk::Application
			//AWS::ElasticBeanstalk::ApplicationVersion
			//AWS::ElasticBeanstalk::ConfigurationTemplate
			//AWS::ElasticBeanstalk::Environment
		},
		ElasticLoadBalancing: {
			//AWS::ElasticLoadBalancing::LoadBalancer
		},
		IAM: {
			//AWS::IAM::AccessKey
			//AWS::IAM::Group
			//AWS::IAM::InstanceProfile
			//AWS::IAM::ManagedPolicy
			//AWS::IAM::Policy
			//AWS::IAM::Role
			//AWS::IAM::User
			//AWS::IAM::UserToGroupAddition
		},
		Kinesis: {
			//AWS::Kinesis::Stream
		},
		KMS: {
			//AWS::KMS::Key
		},
		Lambda: {
			//AWS::Lambda::EventSourceMapping
			//AWS::Lambda::Function
			//AWS::Lambda::Permission
		},
		Logs: {
			//AWS::Logs::Destination
			//AWS::Logs::LogGroup
			//AWS::Logs::LogStream
			//AWS::Logs::MetricFilter
			//AWS::Logs::SubscriptionFilter
		},
		OpsWorks: {
			//AWS::OpsWorks::App
			//AWS::OpsWorks::ElasticLoadBalancerAttachment
			//AWS::OpsWorks::Instance
			//AWS::OpsWorks::Layer
			//AWS::OpsWorks::Stack
		},
		RDS: {
			//AWS::RDS::DBCluster
			//AWS::RDS::DBClusterParameterGroup
			//AWS::RDS::DBInstance
			//AWS::RDS::DBParameterGroup
			//AWS::RDS::DBSecurityGroup
			//AWS::RDS::DBSecurityGroupIngress
			//AWS::RDS::DBSubnetGroup
			//AWS::RDS::EventSubscription
			//AWS::RDS::OptionGroup
		},
		Redshift: {
			//AWS::Redshift::Cluster
			//AWS::Redshift::ClusterParameterGroup
			//AWS::Redshift::ClusterSecurityGroup
			//AWS::Redshift::ClusterSecurityGroupIngress
			//AWS::Redshift::ClusterSubnetGroup
		},
		Route53: {
			//AWS::Route53::HealthCheck
			//AWS::Route53::HostedZone
			//AWS::Route53::RecordSet
			//AWS::Route53::RecordSetGroup
		},
		S3: {
			//AWS::S3::Bucket
			//AWS::S3::BucketPolicy
		},
		SDB: {
			//AWS::SDB::Domain
		},
		SNS: {
			//AWS::SNS::Topic
			//AWS::SNS::TopicPolicy
		},
		SQS: {
			//AWS::SQS::Queue
			//AWS::SQS::QueuePolicy
		},
		SSM: {
			//AWS::SSM::Document
		},
		WAF: {
			//AWS::WAF::ByteMatchSet
			//AWS::WAF::IPSet
			//AWS::WAF::Rule
			//AWS::WAF::SqlInjectionMatchSet
			//AWS::WAF::WebACL
		},
		WorkSpaces: {
			//AWS::WorkSpaces::Workspace
		}
	},

	getBlankAvailableResources: function() {
		return _.cloneDeep(this.availableResourcesTemplate);
	}

};

module.exports = AvailableResources;
