'use strict';
var P = require('bluebird');
var Util = require('./util');

var CloudFront = function(AWS) {

	var cloudfront = P.promisifyAll(new AWS.CloudFront());

	return {
		Distribution: {
			call: function() {
				return cloudfront
					.listDistributionsAsync({})
			},
			resBlock: 'Items',
			rName: 'Id',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type' : 'Distribution',
					'Properties' : {
						'DistributionConfig' : {
							'Aliases' : [],
							'CacheBehaviors' : [],
							'Comment' : 'String',
							'CustomErrorResponses' : [],
							'DefaultCacheBehavior' : 'String',
							'DefaultRootObject' : 'String',
							'Enabled' : 'Boolean',
							'Logging' : 'String',
							'Origins' : [],
							'PriceClass' : 'String',
							'Restrictions' : 'Restriction',
							'ViewerCertificate' : 'ViewerCertificate',
							'WebACLId' : 'String'
						}
					}
				}
			}
		}
	};
};

module.exports = CloudFront;
