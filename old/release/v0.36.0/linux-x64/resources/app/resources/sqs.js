'use strict';
var _ = require('lodash');
var P = require('bluebird');

var Util = require('./util');

var SQS = function(AWS) {

	var sqs = P.promisifyAll(new AWS.SQS());

	return {
		Queue: {
			call: function() { return sqs
				.listQueuesAsync({})
				.then(function(data) {
					var finalQueueList = { QueueUrls: [] };
					_.each(data.QueueUrls, function(queue) {
						finalQueueList.QueueUrls.push({ QueueName: queue });
					});
					return finalQueueList;
				})},
			resBlock: 'QueueUrls',
			rName: 'QueueName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::SQS::Queue',
					'Properties': {
						'DelaySeconds': 'Integer',
						'MaximumMessageSize': 'Integer',
						'MessageRetentionPeriod': 'Integer',
						'QueueName': 'String',
						'ReceiveMessageWaitTimeSeconds': 'Integer',
						'RedrivePolicy': 'RedrivePolicy',
						'VisibilityTimeout': 'Integer'
					}
				}
			}
		}
		//QueuePolicy
	};
};

module.exports = SQS;
