import {} from '../mutation-types'

const state = {
  /*
   ApiGateway: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Account: {},
   ApiKey: {},
   Authorizer: {},
   BasePathMapping: {},
   ClientCertificate: {},
   Deployment: {},
   Method: {},
   Model: {},
   Resource: {},
   RestApi: {},
   Stage: {}
   }
   },
   AutoScaling: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   AutoScalingGroup: {},
   LaunchConfiguration: {},
   LifecycleHook: {},
   ScalingPolicy: {},
   ScheduledAction: {}
   }
   },
   CloudFormation: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
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
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Distribution: {}
   }
   },
   CloudTrail: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Trail: {}
   }
   },
   CloudWatch: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Alarm: {}
   }
   },
   CodeDeploy: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Application: {},
   DeploymentConfig: {},
   DeploymentGroup: {}
   }
   },
   CodePipeline: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   CustomActionType: {},
   Pipeline: {}
   }
   },
   Config: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   ConfigRule: {},
   ConfigurationRecorder: {},
   DeliveryChannel: {}
   }
   },
   DataPipeline: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Pipeline: {}
   }
   },
   DirectoryService: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   MicrosoftAD: {},
   SimpleAD: {}
   }
   },
   DynamoDB: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Table: {}
   }
   },
   EC2: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   CustomerGateway: {},
   DHCPOptions: {},
   EIP: {},
   EIPAssociation: {},
   FlowLog: {},
   Host: {},
   Instance: {},
   InternetGateway: {},
   NatGateway: {},
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
   ECR: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Repository: {}
   }
   },
   ECS: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Cluster: {},
   Service: {},
   TaskDefinition: {}
   }
   },
   EFS: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   FileSystem: {},
   MountTarget: {}
   }
   },
   ElastiCache: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   CacheCluster: {},
   ParameterGroup: {},
   ReplicationGroup: {},
   SecurityGroup: {},
   SecurityGroupIngress: {},
   SubnetGroup: {}
   }
   },
   ElasticBeanstalk: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Application: {},
   ApplicationVersion: {},
   ConfigurationTemplate: {},
   Environment: {}
   }
   },
   ElasticLoadBalancing: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   LoadBalancer: {}
   }
   },
   Elasticsearch: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Domain: {}
   }
   },
   EMR: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Cluster: {},
   InstanceGroupConfig: {},
   Step: {}
   }
   },
   Events: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Rule: {}
   }
   },
   GameLift: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Alias: {},
   Build: {},
   Fleet: {}
   }
   },
   IAM: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
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
   IoT: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Certificate: {},
   Policy: {},
   PolicyPrincipalAttachment: {},
   Thing: {},
   ThingPrincipalAttachment: {},
   TopicRule: {}
   }
   },
   Kinesis: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Stream: {},
   DeliveryStream: {}
   }
   },
   KMS: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Key: {}
   }
   },
   Lambda: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   EventSourceMapping: {},
   Alias: {},
   Function: {},
   Permission: {},
   Version: {}
   }
   },
   Logs: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Destination: {},
   LogGroup: {},
   LogStream: {},
   MetricFilter: {},
   SubscriptionFilter: {}
   }
   },
   OpsWorks: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   App: {},
   ElasticLoadBalancerAttachment: {},
   Instance: {},
   Layer: {},
   Stack: {}
   }
   },
   RDS: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
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
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   Cluster: {},
   ClusterParameterGroup: {},
   ClusterSecurityGroup: {},
   ClusterSecurityGroupIngress: {},
   ClusterSubnetGroup: {}
   }
   },
   Route53: {
   image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
   properties: {
   HealthCheck: {},
   HostedZone: {},
   RecordSet: {},
   RecordSetGroup: {}
   }
   },
   */
  S3: {
    image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
    properties: {
      Bucket: {},
      BucketPolicy: {}
    }
  },
  SDB: {
    image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
    properties: {
      Domain: {}
    }
  },
  SNS: {
    image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
    properties: {
      Topic: {},
      TopicPolicy: {}
    }
  },
  SQS: {
    image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
    properties: {
      Queue: {},
      QueuePolicy: {}
    }
  },
  SSM: {
    image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
    properties: {
      Document: {}
    }
  },
  WAF: {
    image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
    properties: {
      ByteMatchSet: {},
      IPSet: {},
      Rule: {},
      SizeConstraintSet: {},
      SqlInjectionMatchSet: {},
      WebACL: {},
      XssMatchSet: {}
    }
  },
  WorkSpaces: {
    image: 'Compute/Compute_AmazonEC2_AutoScaling.svg',
    properties: {
      Workspace: {}
    }
  }
}

const mutations = {

}

export default {
  state,
  mutations
}
