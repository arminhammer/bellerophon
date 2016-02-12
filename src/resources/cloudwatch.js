'use strict';
var P = require('bluebird');
var Util = require('./util');

var CloudWatch = function(AWS) {

	var cloudwatch = P.promisifyAll(new AWS.CloudWatch());

	return {
		Alarm: {
			call: function() { return cloudwatch.describeAlarmsAsync({}) },
			resBlock: 'MetricAlarms',
			rName: 'AlarmName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type' : 'AWS::CloudWatch::Alarm',
					'Properties' : {
						'ActionsEnabled' : 'Boolean',
						'AlarmActions' : [],
						'AlarmDescription' : 'String',
						'AlarmName' : 'String',
						'ComparisonOperator' : 'String',
						'Dimensions' : [],
						'EvaluationPeriods' : 'String',
						'InsufficientDataActions' : [],
						'MetricName' : 'String',
						'Namespace' : 'String',
						'OKActions' : [],
						'Period' : 'String',
						'Statistic' : 'String',
						'Threshold' : 'String',
						'Unit' : 'String'
					}
				}
			}
		}
	};
};

module.exports = CloudWatch;
