[![Maintainability](https://api.codeclimate.com/v1/badges/524571d17dba6b0c5daa/maintainability)](https://codeclimate.com/github/arminhammer/bellerophon/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/524571d17dba6b0c5daa/test_coverage)](https://codeclimate.com/github/arminhammer/bellerophon/test_coverage)
[![DeepScan Grade](https://deepscan.io/api/projects/1497/branches/4810/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&pid=1497&bid=4810)

# bellerophon

> Desktop utility for generating AWS CloudFormation templates from existing AWS resources

# Supported Resource Types

AWS::S3::Bucket
AWS::S3::BucketPolicy

# In progress resource types

AWS::CloudTrail::Trail

AWS::CloudFront::Distribution
AWS::CloudFront::CloudFrontOriginAccessIdentity
AWS::CloudFront::StreamingDistribution

AWS::DynamoDB::Table

AWS::EC2::Instance
AWS::EC2::Route
AWS::EC2::RouteTable
AWS::EC2::Subnet
AWS::EC2::SubnetCidrBlock
AWS::EC2::SubnetNetworkAclAssociation
AWS::EC2::SubnetRouteTableAssociation
AWS::EC2::Volume
AWS::EC2::VolumeAttachment
AWS::EC2::VPC
AWS::EC2::SecurityGroup
AWS::EC2::SecurityGroupEgress
AWS::EC2::SecurityGroupIngress

AWS::ECR::Repository

AWS::ECS::Cluster
AWS::ECS::Service
AWS::ECS::TaskDefinition

AWS::ElasticLoadBalancingV2::Listener
AWS::ElasticLoadBalancingV2::ListenerCertificate
AWS::ElasticLoadBalancingV2::ListenerRule
AWS::ElasticLoadBalancingV2::LoadBalancer
AWS::ElasticLoadBalancingV2::TargetGroup

AWS::IAM::AccessKey
AWS::IAM::Group
AWS::IAM::InstanceProfile
AWS::IAM::ManagedPolicy
AWS::IAM::Policy
AWS::IAM::Role
AWS::IAM::User
AWS::IAM::UserToGroupAddition

AWS::Kinesis::Stream

AWS::Lambda::EventSourceMapping
AWS::Lambda::Alias
AWS::Lambda::Function
AWS::Lambda::Permission
AWS::Lambda::Version

AWS::Route53::HealthCheck
AWS::Route53::HostedZone
AWS::Route53::RecordSet
AWS::Route53::RecordSetGroup

AWS::SNS::Subscription
AWS::SNS::Topic
AWS::SNS::TopicPolicy

AWS::SQS::Queue
AWS::SQS::QueuePolicy

## Unsupported resource types

    AWS::ApiGateway::Account
    AWS::ApiGateway::ApiKey
    AWS::ApiGateway::Authorizer
    AWS::ApiGateway::BasePathMapping
    AWS::ApiGateway::ClientCertificate
    AWS::ApiGateway::Deployment
    AWS::ApiGateway::DocumentationPart
    AWS::ApiGateway::DocumentationVersion
    AWS::ApiGateway::DomainName
    AWS::ApiGateway::GatewayResponse
    AWS::ApiGateway::Method
    AWS::ApiGateway::Model
    AWS::ApiGateway::RequestValidator
    AWS::ApiGateway::Resource
    AWS::ApiGateway::RestApi
    AWS::ApiGateway::Stage
    AWS::ApiGateway::UsagePlan
    AWS::ApiGateway::UsagePlanKey

    AWS::ApplicationAutoScaling::ScalableTarget
    AWS::ApplicationAutoScaling::ScalingPolicy

    AWS::Athena::NamedQuery

    AWS::AutoScaling::AutoScalingGroup
    AWS::AutoScaling::LaunchConfiguration
    AWS::AutoScaling::LifecycleHook
    AWS::AutoScaling::ScalingPolicy
    AWS::AutoScaling::ScheduledAction

    AWS::Batch::ComputeEnvironment
    AWS::Batch::JobDefinition
    AWS::Batch::JobQueue

    AWS::CertificateManager::Certificate

    AWS::Cloud9::EnvironmentEC2

    AWS::CloudFormation::Authentication
    AWS::CloudFormation::CustomResource
    AWS::CloudFormation::Init
    AWS::CloudFormation::Interface
    AWS::CloudFormation::Stack
    AWS::CloudFormation::WaitCondition
    AWS::CloudFormation::WaitConditionHandle

    AWS::CloudWatch::Alarm
    AWS::CloudWatch::Dashboard

    AWS::CodeBuild::Project

    AWS::CodeCommit::Repository

    AWS::CodeDeploy::Application
    AWS::CodeDeploy::DeploymentConfig
    AWS::CodeDeploy::DeploymentGroup

    AWS::CodePipeline::CustomActionType
    AWS::CodePipeline::Pipeline

    AWS::Cognito::IdentityPool
    AWS::Cognito::IdentityPoolRoleAttachment
    AWS::Cognito::UserPool
    AWS::Cognito::UserPoolClient
    AWS::Cognito::UserPoolGroup
    AWS::Cognito::UserPoolUser
    AWS::Cognito::UserPoolUserToGroupAttachment

    AWS::Config::ConfigRule
    AWS::Config::ConfigurationRecorder
    AWS::Config::DeliveryChannel

    AWS::DataPipeline::Pipeline

    AWS::DAX::Cluster
    AWS::DAX::ParameterGroup
    AWS::DAX::SubnetGroup

    AWS::DirectoryService::MicrosoftAD
    AWS::DirectoryService::SimpleAD

    AWS::DMS::Certificate
    AWS::DMS::Endpoint
    AWS::DMS::EventSubscription
    AWS::DMS::ReplicationInstance
    AWS::DMS::ReplicationSubnetGroup
    AWS::DMS::ReplicationTask

    AWS::EC2::CustomerGateway
    AWS::EC2::DHCPOptions
    AWS::EC2::EgressOnlyInternetGateway
    AWS::EC2::EIP
    AWS::EC2::EIPAssociation
    AWS::EC2::FlowLog
    AWS::EC2::Host
    AWS::EC2::InternetGateway
    AWS::EC2::NatGateway
    AWS::EC2::NetworkAcl
    AWS::EC2::NetworkAclEntry
    AWS::EC2::NetworkInterface
    AWS::EC2::NetworkInterfaceAttachment
    AWS::EC2::NetworkInterfacePermission
    AWS::EC2::PlacementGroup
    AWS::EC2::SpotFleet
    AWS::EC2::VPCCidrBlock
    AWS::EC2::VPCDHCPOptionsAssociation
    AWS::EC2::VPCEndpoint
    AWS::EC2::VPCGatewayAttachment
    AWS::EC2::VPCPeeringConnection
    AWS::EC2::VPNConnection
    AWS::EC2::VPNConnectionRoute
    AWS::EC2::VPNGateway
    AWS::EC2::VPNGatewayRoutePropagation

    AWS::EFS::FileSystem
    AWS::EFS::MountTarget

    AWS::ElastiCache::CacheCluster
    AWS::ElastiCache::ParameterGroup
    AWS::ElastiCache::ReplicationGroup
    AWS::ElastiCache::SecurityGroup
    AWS::ElastiCache::SecurityGroupIngress
    AWS::ElastiCache::SubnetGroup

    AWS::ElasticBeanstalk::Application
    AWS::ElasticBeanstalk::ApplicationVersion
    AWS::ElasticBeanstalk::ConfigurationTemplate
    AWS::ElasticBeanstalk::Environment

    AWS::ElasticLoadBalancing::LoadBalancer

    AWS::Elasticsearch::Domain

    AWS::EMR::Cluster
    AWS::EMR::InstanceFleetConfig
    AWS::EMR::InstanceGroupConfig
    AWS::EMR::SecurityConfiguration
    AWS::EMR::Step

    AWS::Events::Rule

    AWS::GameLift::Alias
    AWS::GameLift::Build
    AWS::GameLift::Fleet

    AWS::Glue::Classifier
    AWS::Glue::Connection
    AWS::Glue::Crawler
    AWS::Glue::Database
    AWS::Glue::DevEndpoint
    AWS::Glue::Job
    AWS::Glue::Partition
    AWS::Glue::Table
    AWS::Glue::Trigger

    AWS::GuardDuty::Detector
    AWS::GuardDuty::IPSet
    AWS::GuardDuty::ThreatIntelSet

    AWS::Inspector::AssessmentTarget
    AWS::Inspector::AssessmentTemplate
    AWS::Inspector::ResourceGroup

    AWS::IoT::Certificate
    AWS::IoT::Policy
    AWS::IoT::PolicyPrincipalAttachment
    AWS::IoT::Thing
    AWS::IoT::ThingPrincipalAttachment
    AWS::IoT::TopicRule

    AWS::KinesisAnalytics::Application
    AWS::KinesisAnalytics::ApplicationOutput
    AWS::KinesisAnalytics::ApplicationReferenceDataSource

    AWS::KinesisFirehose::DeliveryStream

    AWS::KMS::Alias
    AWS::KMS::Key

    AWS::Logs::Destination
    AWS::Logs::LogGroup
    AWS::Logs::LogStream
    AWS::Logs::MetricFilter
    AWS::Logs::SubscriptionFilter

    AWS::OpsWorks::App
    AWS::OpsWorks::ElasticLoadBalancerAttachment
    AWS::OpsWorks::Instance
    AWS::OpsWorks::Layer
    AWS::OpsWorks::Stack
    AWS::OpsWorks::UserProfile
    AWS::OpsWorks::Volume

    AWS::RDS::DBCluster
    AWS::RDS::DBClusterParameterGroup
    AWS::RDS::DBInstance
    AWS::RDS::DBParameterGroup
    AWS::RDS::DBSecurityGroup
    AWS::RDS::DBSecurityGroupIngress
    AWS::RDS::DBSubnetGroup
    AWS::RDS::EventSubscription
    AWS::RDS::OptionGroup

    AWS::Redshift::Cluster
    AWS::Redshift::ClusterParameterGroup
    AWS::Redshift::ClusterSecurityGroup
    AWS::Redshift::ClusterSecurityGroupIngress
    AWS::Redshift::ClusterSubnetGroup

    AWS::SDB::Domain

    AWS::ServiceDiscovery::Instance
    AWS::ServiceDiscovery::PrivateDnsNamespace
    AWS::ServiceDiscovery::PublicDnsNamespace
    AWS::ServiceDiscovery::Service

    AWS::SSM::Association
    AWS::SSM::Document
    AWS::SSM::MaintenanceWindow
    AWS::SSM::MaintenanceWindowTarget
    AWS::SSM::MaintenanceWindowTask
    AWS::SSM::Parameter
    AWS::SSM::PatchBaseline

    AWS::StepFunctions::Activity
    AWS::StepFunctions::StateMachine

    AWS::WAF::ByteMatchSet
    AWS::WAF::IPSet
    AWS::WAF::Rule
    AWS::WAF::SizeConstraintSet
    AWS::WAF::SqlInjectionMatchSet
    AWS::WAF::WebACL
    AWS::WAF::XssMatchSet

    AWS::WAFRegional::ByteMatchSet
    AWS::WAFRegional::IPSet
    AWS::WAFRegional::Rule
    AWS::WAFRegional::SizeConstraintSet
    AWS::WAFRegional::SqlInjectionMatchSet
    AWS::WAFRegional::WebACL
    AWS::WAFRegional::WebACLAssociation
    AWS::WAFRegional::XssMatchSet

    AWS::WorkSpaces::Workspace

#### Build Setup

```bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build

# run unit & end-to-end tests
npm test


# lint all JS/Vue component files in `src/`
npm run lint
```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
