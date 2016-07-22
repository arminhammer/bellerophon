'use strict';
var P = require('bluebird');
var Util = require('./util');

var SNS = function(AWS) {

	var sns = P.promisifyAll(new AWS.SNS());

	return {
		Topic: {
			call: function() { return sns.listTopicsAsync({}) },
			resBlock: 'Topics',
			rName: 'TopicArn',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type' : 'AWS::SNS::Topic',
					'Properties' : {
						'DisplayName' : 'String',
						'Subscription' : [],
						'TopicName' : 'String'
					}
				}
			}
		}
		//TopicPolicy
	};
};

module.exports = SNS;
