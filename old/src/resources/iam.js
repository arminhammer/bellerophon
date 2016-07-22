'use strict';
var P = require('bluebird');
var Util = require('./util');

var IAM = function(AWS) {

	var iam = P.promisifyAll(new AWS.IAM());

	return {
		AccessKey: {
			call: function() { return iam.listAccessKeysAsync({}) },
			resBlock: 'AccessKeyMetadata',
			rName: 'AccessKeyId',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block =
				{
					'Type': 'AWS::IAM::AccessKey',
					'Properties': {
						'Serial': 'Integer',
						'Status': 'String',
						'UserName': 'String'
					}
				}
			}
		},
		Group: {
			call: function() { return iam.listGroupsAsync({}) },
			resBlock: 'Groups',
			rName: 'GroupName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::IAM::Group',
					'Properties': {
						'ManagedPolicyArns': [],
						'Path': 'String',
						'Policies': []
					}
				}
			}
		},
		InstanceProfile: {
			call: function() { return iam.listInstanceProfilesAsync({}) },
			resBlock: 'InstanceProfiles',
			rName: 'InstanceProfileName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::IAM::InstanceProfile',
					'Properties': {
						'Path': 'String',
						'Roles': []
					}
				}
			}
		},
		ManagedPolicy: {
			call: function() { return iam.listPoliciesAsync({}) },
			resBlock: 'Policies',
			rName: 'PolicyName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::IAM::ManagedPolicy',
					'Properties': {
						'Description' : 'String',
						'Groups' : [],
						'Path' : 'String',
						'PolicyDocument' : {},
						'Roles' : [],
						'Users' : []
					}
				}
			}
		},
		/*Policy: {
		 call: function() { return .Async({}) },
		 resBlock: '',
		 rName: '',
		 construct: function (name, body) {
		 Util.baseConstruct(this, name, body);
		 this.block = {
		 'Type': 'AWS::IAM::Policy',
		 'Properties': {
		 'Groups' : [],
		 'PolicyDocument' : {},
		 'PolicyName' : 'String',
		 'Roles' : [],
		 'Users' : []
		 }
		 }
		 }
		 }*/
		Role: {
			call: function() { return iam.listRolesAsync({}) },
			resBlock: 'Roles',
			rName: 'RoleName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::IAM::Role',
					'Properties': {
						'AssumeRolePolicyDocument': {},
						'ManagedPolicyArns': [],
						'Path': 'String',
						'Policies': []
					}
				}
			}
		},
		User: {
			call: function() { return iam.listUsersAsync({}) },
			resBlock: 'Users',
			rName: 'UserName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::IAM::User',
					'Properties': {
						'Groups': [],
						'LoginProfile': 'LoginProfile Type',
						'ManagedPolicyArns': [],
						'Path': 'String',
						'Policies': []
					}
				}
			}
		}
		/*UserToGroupAddition: {
		 call: function() { return .Async({}) },
		 resBlock: '',
		 rName: '',
		 construct: function (name, body) {
		 Util.baseConstruct(this, name, body);
		 this.block = {
		 'Type': 'AWS::IAM::UserToGroupAddition',
		 'Properties': {
		 'GroupName': String,
		 'Users': [ User1, ... ]
		 }
		 }
		 }
		 }*/
	};
};

module.exports = IAM;
