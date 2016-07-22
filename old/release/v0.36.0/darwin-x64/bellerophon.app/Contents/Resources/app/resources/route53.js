'use strict';
var P = require('bluebird');
var Util = require('./util');

var Route53 = function(AWS) {

	var route53 = P.promisifyAll(new AWS.Route53());

	return {
		HealthCheck: {
			call: function() { return route53.listHealthChecksAsync({}) },
			resBlock: 'HealthChecks',
			rName: 'Id',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type' : 'AWS::Route53::HealthCheck',
					'Properties' : {
						'HealthCheckConfig' : {},
						'HealthCheckTags' : []
					}
				}
			}
		},
		HostedZone: {
			call: function() { return route53.listHostedZonesAsync({}) },
			resBlock: 'HostedZones',
			rName: 'Id',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type' : 'AWS::Route53::HostedZone',
					'Properties' : {
						'HostedZoneConfig' : {},
						'HostedZoneTags' : [],
						'Name' : 'String',
						'VPCs' : []
					}
				}
			}
		}
		/*RecordSet: {
		 call: function() { return route53.listResourceRecordSetsAsync({}) },
		 resBlock: '',
		 rName: '',
		 construct: function (name, body) {
		 Util.baseConstruct(this, name, body);
		 this.block =
		 }
		 },
		 RecordSetGroup: {
		 call: function() { return .Async({}) },
		 resBlock: '',
		 rName: '',
		 construct: function (name, body) {
		 Util.baseConstruct(this, name, body);
		 this.block =
		 }
		 }*/
	};
};

module.exports = Route53;
