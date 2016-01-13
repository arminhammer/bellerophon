# ![Bellerophon](https://raw.githubusercontent.com/arminhammer/bellerophon/master/src/icons/bellerophon.svg) Bellerophon

## Installation
1. Make sure you have the awscli installed and configured. Bellerophon assumes that ~/.aws/config and ~/.aws/credentials exist and are configured correctly.
2. Download Belleraphon:
- (Win): https://bellerophon.s3.amazonaws.com/Bellerophon-0.1.0-win32-x64.zip
- (Linux): https://bellerophon.s3.amazonaws.com/Bellerophon-0.1.0-linux-x64.zip
- (OSX): https://bellerophon.s3.amazonaws.com/Bellerophon-0.1.0-darwin-x64.zip
3. Unzip and run.

## Usage
Bellerophon will make AWS SDK calls to get information about the resources in your AWS environment. 
Once the resources are retrieved, you can add them to the CloudFormation template. You can view the template by going to File > Show Template. Once you are
happy with the design of the template, you can choose File > Save Template.

## Supported Resources
One of the goals for Bellerophon is to support all AWS resources that can be defined in CloudFormation. However, at this time only a subset of resources are supported.
This list will be updated as support for more resources is added. Fully supported resources will be marked in **bold**, partially supported resources will be marked in
*italics*, and unsupported resources will be marked in ~~strikethroughs~~.

- **AWS::AutoScaling::AutoScalingGroup**
- **AWS::AutoScaling::LaunchConfiguration**
- **AWS::AutoScaling::LifecycleHook**
- **AWS::AutoScaling::ScalingPolicy**
- **AWS::AutoScaling::ScheduledAction**
- ~~AWS::CloudFormation::Authentication~~
- ~~AWS::CloudFormation::CustomResource~~
- ~~AWS::CloudFormation::Init~~
- ~~AWS::CloudFormation::Interface~~
- ~~AWS::CloudFormation::Stack~~
- ~~AWS::CloudFormation::WaitCondition~~
- ~~AWS::CloudFormation::WaitConditionHandle~~
- ~~AWS::CloudFront::Distribution~~
- ~~AWS::CloudTrail::Trail~~
- ~~AWS::CloudWatch::Alarm~~
- ~~AWS::CodeDeploy::Application~~
- ~~AWS::CodeDeploy::DeploymentConfig~~
- ~~AWS::CodeDeploy::DeploymentGroup~~
- ~~AWS::CodePipeline::CustomActionType~~
- ~~AWS::CodePipeline::Pipeline~~
- ~~AWS::Config::ConfigRule~~
- ~~AWS::Config::ConfigurationRecorder~~
- ~~AWS::Config::DeliveryChannel~~
- ~~AWS::DataPipeline::Pipeline~~
- ~~AWS::DirectoryService::MicrosoftAD~~
- ~~AWS::DirectoryService::SimpleAD~~
- ~~AWS::DynamoDB::Table~~
- *AWS::EC2::CustomerGateway*
- *AWS::EC2::DHCPOptions*
- *AWS::EC2::EIP*
- ~~AWS::EC2::EIPAssociation~~
- *AWS::EC2::Instance*
- *AWS::EC2::InternetGateway*
- *AWS::EC2::NetworkAcl*
- ~~AWS::EC2::NetworkAclEntry~~
- *AWS::EC2::NetworkInterface*
- ~~AWS::EC2::NetworkInterfaceAttachment~~
- *AWS::EC2::PlacementGroup*
- ~~AWS::EC2::Route~~
- *AWS::EC2::RouteTable*
- *AWS::EC2::SecurityGroup*
- ~~AWS::EC2::SecurityGroupEgress~~
- ~~AWS::EC2::SecurityGroupIngress~~
- *AWS::EC2::SpotFleet*
- *AWS::EC2::Subnet*
- ~~AWS::EC2::SubnetNetworkAclAssociation~~
- ~~AWS::EC2::SubnetRouteTableAssociation~~
- *AWS::EC2::Volume*
- ~~AWS::EC2::VolumeAttachment~~
- *AWS::EC2::VPC*
- ~~AWS::EC2::VPCDHCPOptionsAssociation~~
- *AWS::EC2::VPCEndpoint*
- ~~AWS::EC2::VPCGatewayAttachment~~
- *AWS::EC2::VPCPeeringConnection*
- *AWS::EC2::VPNConnection*
- ~~AWS::EC2::VPNConnectionRoute~~
- *AWS::EC2::VPNGateway*
- ~~AWS::EC2::VPNGatewayRoutePropagation~~
- ~~AWS::ECS::Cluster~~
- ~~AWS::ECS::Service~~
- ~~AWS::ECS::TaskDefinition~~
- ~~AWS::EFS::FileSystem~~
- ~~AWS::EFS::MountTarget~~
- ~~AWS::ElastiCache::CacheCluster~~
- ~~AWS::ElastiCache::ParameterGroup~~
- ~~AWS::ElastiCache::ReplicationGroup~~
- ~~AWS::ElastiCache::SecurityGroup~~
- ~~AWS::ElastiCache::SecurityGroupIngress~~
- ~~AWS::ElastiCache::SubnetGroup~~
- ~~AWS::ElasticBeanstalk::Application~~
- ~~AWS::ElasticBeanstalk::ApplicationVersion~~
- ~~AWS::ElasticBeanstalk::ConfigurationTemplate~~
- ~~AWS::ElasticBeanstalk::Environment~~
- ~~AWS::ElasticLoadBalancing::LoadBalancer~~
- ~~AWS::IAM::AccessKey~~
- ~~AWS::IAM::Group~~
- ~~AWS::IAM::InstanceProfile~~
- ~~AWS::IAM::ManagedPolicy~~
- ~~AWS::IAM::Policy~~
- ~~AWS::IAM::Role~~
- ~~AWS::IAM::User~~
- ~~AWS::IAM::UserToGroupAddition~~
- ~~AWS::Kinesis::Stream~~
- ~~AWS::KMS::Key~~
- ~~AWS::Lambda::EventSourceMapping~~
- ~~AWS::Lambda::Function~~
- ~~AWS::Lambda::Permission~~
- ~~AWS::Logs::Destination~~
- ~~AWS::Logs::LogGroup~~
- ~~AWS::Logs::LogStream~~
- ~~AWS::Logs::MetricFilter~~
- ~~AWS::Logs::SubscriptionFilter~~
- ~~AWS::OpsWorks::App~~
- ~~AWS::OpsWorks::ElasticLoadBalancerAttachment~~
- ~~AWS::OpsWorks::Instance~~
- ~~AWS::OpsWorks::Layer~~
- ~~AWS::OpsWorks::Stack~~
- ~~AWS::RDS::DBCluster~~
- ~~AWS::RDS::DBClusterParameterGroup~~
- ~~AWS::RDS::DBInstance~~
- ~~AWS::RDS::DBParameterGroup~~
- ~~AWS::RDS::DBSecurityGroup~~
- ~~AWS::RDS::DBSecurityGroupIngress~~
- ~~AWS::RDS::DBSubnetGroup~~
- ~~AWS::RDS::EventSubscription~~
- ~~AWS::RDS::OptionGroup~~
- ~~AWS::Redshift::Cluster~~
- ~~AWS::Redshift::ClusterParameterGroup~~
- ~~AWS::Redshift::ClusterSecurityGroup~~
- ~~AWS::Redshift::ClusterSecurityGroupIngress~~
- ~~AWS::Redshift::ClusterSubnetGroup~~
- ~~AWS::Route53::HealthCheck~~
- ~~AWS::Route53::HostedZone~~
- ~~AWS::Route53::RecordSet~~
- ~~AWS::Route53::RecordSetGroup~~
- ~~AWS::S3::Bucket~~
- ~~AWS::S3::BucketPolicy~~
- ~~AWS::SDB::Domain~~
- ~~AWS::SNS::Topic~~
- ~~AWS::SNS::TopicPolicy~~
- ~~AWS::SQS::Queue~~
- ~~AWS::SQS::QueuePolicy~~
- ~~AWS::SSM::Document~~
- ~~AWS::WAF::ByteMatchSet~~
- ~~AWS::WAF::IPSet~~
- ~~AWS::WAF::Rule~~
- ~~AWS::WAF::SqlInjectionMatchSet~~
- ~~AWS::WAF::WebACL~~
- ~~AWS::WorkSpaces::Workspace~~

## Underlying tools
Bellerophon uses the following to work:
- Electron (to package the app as a desktop application): http://electron.atom.io/
- MithrilJS (for the UI): http://mithril.js.org/

