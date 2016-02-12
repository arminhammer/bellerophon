'use strict';
var P = require('bluebird');
var Util = require('./util');

var CloudTrail = function(AWS) {

	var cloudtrail = P.promisifyAll(new AWS.CloudTrail());

	return {
		/*: {
		 call: function() { return .Async({}) },
		 resBlock: '',
		 rName: '',
		 construct: function (name, body) {
		 baseConstruct(this, name, body);
		 this.block =
		 }
		 }*/
		Trail: {
			call: function() { return cloudtrail.describeTrailsAsync({}) },
			resBlock: 'trailList',
			rName: 'Name',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type' : 'AWS::CloudTrail::Trail',
					'Properties' : {
						'CloudWatchLogsLogGroupArn' : 'String',
						'CloudWatchLogsRoleArn' : 'String',
						'EnableLogFileValidation' : 'Boolean',
						'IncludeGlobalServiceEvents' : 'Boolean',
						'IsLogging' : 'Boolean',
						'KMSKeyId' : 'String',
						'S3BucketName' : 'String',
						'S3KeyPrefix' : 'String',
						'SnsTopicName' : 'String',
						'Tags' : []
					}
				}
			}
		}
	};
};

module.exports = CloudTrail;
