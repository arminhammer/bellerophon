/**
 * Created by arminhammer on 11/24/15.
 */

'use strict';

var AWS = require('aws-sdk');
if(!AWS.config.region) {
	AWS.config.region = 'us-east-1';
}

var Resource = {
	resources: {
		AutoScaling: require('./resources/autoscaling')(AWS),
		CloudFormation: require('./resources/cloudformation')(AWS),
		CloudFront: require('./resources/cloudfront')(AWS),
		CloudTrail: require('./resources/cloudtrail')(AWS),
		CloudWatch: require('./resources/cloudwatch')(AWS),
		CodeDeploy: {
			//Application
			//DeploymentConfig
			//DeploymentGroup
		},
		CodePipeline: {
			//CustomActionType
			//Pipeline
		},
		Config: {
			//ConfigRule
			//ConfigurationRecorder
			//DeliveryChannel
		},
		DataPipeline: {
			//Pipeline
		},
		DirectoryService: {
			//MicrosoftAD
			//SimpleAD
		},
		DynamoDB: {
			/*Table: {
			 call: function() { return dynamodb.listTablesAsync({}) },
			 resBlock: 'TableNames',
			 rName: '',
			 construct: function (name, body) {
			 baseConstruct(this, name, body);
			 this.block = {
			 'Type' : 'AWS::DynamoDB::Table',
			 'Properties' : {
			 'AttributeDefinitions' : [ AttributeDefinitions, ... ],
			 'GlobalSecondaryIndexes' : [ GlobalSecondaryIndexes, ... ],
			 'KeySchema' : [ KeySchema, ... ],
			 'LocalSecondaryIndexes' : [ LocalSecondaryIndexes, ... ],
			 'ProvisionedThroughput' : ProvisionedThroughput,
			 'StreamSpecification' : ProvisionedThroughput,
			 'TableName' : String
			 }
			 }
			 }
			 }*/
		},
		EC2: require('./resources/ec2')(AWS),
		ECS: {
			//Cluster
			//Service
			//TaskDefinition
		},
		EFS: {
			//FileSystem
			//MountTarget
		},
		ElastiCache: {
			//CacheCluster
			//ParameterGroup
			//ReplicationGroup
			//SecurityGroup
			//SecurityGroupIngress
			//SubnetGroup
		},
		ElasticBeanstalk: {
			//Application
			//ApplicationVersion
			//ConfigurationTemplate
			//Environment
		},
		ElasticLoadBalancing: require('./resources/elasticloadbalancing')(AWS),
		IAM: require('./resources/iam')(AWS),
		Kinesis: {
			//Stream
		},
		KMS: {
			//Key
		},
		Lambda: {
			//EventSourceMapping
			//Function
			//Permission
		},
		Logs: {
			//Destination
			//LogGroup
			//LogStream
			//MetricFilter
			//SubscriptionFilter
		},
		OpsWorks: {
			//App
			//ElasticLoadBalancerAttachment
			//Instance
			//Layer
			//Stack
		},
		RDS: {
			//DBCluster
			//DBClusterParameterGroup
			//DBInstance
			//DBParameterGroup
			//DBSecurityGroup
			//DBSecurityGroupIngress
			//DBSubnetGroup
			//EventSubscription
			//OptionGroup
		},
		Redshift: {
			//Cluster
			//ClusterParameterGroup
			//ClusterSecurityGroup
			//ClusterSecurityGroupIngress
			//ClusterSubnetGroup
		},
		Route53: require('./resources/route53')(AWS),
		S3: require('./resources/s3')(AWS),
		SDB: {
			//Domain
		},
		SNS: require('./resources/sns')(AWS),
		SQS: require('./resources/sqs')(AWS),
		SSM: {
			//Document
		},
		WAF: {
			//ByteMatchSet
			//IPSet
			//Rule
			//SqlInjectionMatchSet
			//WebACL
		},
		WorkSpaces: {
			//Workspace
		}
	}
};

module.exports = Resource;
