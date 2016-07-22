'use strict';
var P = require('bluebird');
var Util = require('./util');

var ElasticLoadBalancing = function(AWS) {

	var elb = P.promisifyAll(new AWS.ELB());

	return {
		LoadBalancer: {
			call: function() { return elb.describeLoadBalancersAsync({}) },
			resBlock: 'LoadBalancerDescriptions',
			rName: 'LoadBalancerName',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'AWS::ElasticLoadBalancing::LoadBalancer',
					'Properties': {
						'AccessLoggingPolicy' : 'AccessLoggingPolicy',
						'AppCookieStickinessPolicy' : [],
						'AvailabilityZones' : [],
						'ConnectionDrainingPolicy' : 'ConnectionDrainingPolicy',
						'ConnectionSettings' : 'ConnectionSettings',
						'CrossZone' : 'Boolean',
						'HealthCheck' : 'HealthCheck',
						'Instances' : [],
						'LBCookieStickinessPolicy' : [],
						'LoadBalancerName' : 'String',
						'Listeners' : [],
						'Policies' : [],
						'Scheme' : 'String',
						'SecurityGroups' : [],
						'Subnets' : [],
						'Tags' : []
					}
				}
			}
		}
	};
};

module.exports = ElasticLoadBalancing;
