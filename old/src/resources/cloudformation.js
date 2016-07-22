'use strict';
var P = require('bluebird');
var Util = require('./util');

var CloudFormation = function(AWS) {

	var cloudformation = P.promisifyAll(new AWS.CloudFormation());

	return {
		//Authentication
		//CustomResource
		//Init
		//Interface
		Stack: {
			call: function() { return cloudformation.describeStacksAsync({}) },
			resBlock: 'Stacks',
			rName: 'StackName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type' : 'AWS::CloudFormation::Stack',
					'Properties' : {
						'NotificationARNs' : [],
						'Parameters' : {},
						'TemplateURL' : 'String',
						'TimeoutInMinutes' : 'String'
					}
				}
			}
		}
		//WaitCondition
		//WaitConditionHandle
	};
};

module.exports = CloudFormation;
