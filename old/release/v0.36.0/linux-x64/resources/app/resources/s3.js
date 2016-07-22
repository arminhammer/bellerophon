'use strict';
var P = require('bluebird');
var Util = require('./util');

var S3 = function(AWS) {

	var s3Client = P.promisifyAll(new AWS.S3());

	return {
		Bucket: {
			call: function () {
				return s3Client
					.listBucketsAsync({})
					.then(function (data) {
						var finalBuckets = [];
						return P
							.map(data.Buckets, function(bucket) {
								return s3Client
									.getBucketVersioningAsync({ Bucket: bucket.Name })
									.then(function(versionData) {
										bucket.VersioningConfiguration = versionData;
									})
									.then(function() {
										return s3Client.getBucketAclAsync({ Bucket: bucket.Name });
									})
									.then(function(aclData) {
										bucket.AccessControl = aclData;
									})
									.then(function() {
										return s3Client.getBucketCorsAsync({ Bucket: bucket.Name });
									})
									.then(function(corsData) {
										bucket.CorsConfiguration = corsData;
									})
									.catch(function() {
										//Silently catch the NoSuchCORSConfiguration
										return;
									})
									.then(function() {
										return s3Client.getBucketLifecycleConfigurationAsync({ Bucket: bucket.Name });
									})
									.then(function(lifeData) {
										bucket.LifecycleConfiguration = lifeData;
									})
									.catch(function() {
										//Silently catch the NoSuchLifecycleConfiguration
										return;
									})
									.then(function() {
										return s3Client.getBucketLoggingAsync({ Bucket: bucket.Name });
									})
									.then(function(data) {
										bucket.LoggingConfiguration = data;
									})
									.then(function() {
										return s3Client.getBucketNotificationAsync({ Bucket: bucket.Name });
									})
									.then(function(data) {
										bucket.NotificationConfiguration = data;
									})
									.then(function() {
										return s3Client.getBucketReplicationAsync({ Bucket: bucket.Name });
									})
									.then(function(data) {
										bucket.ReplicationConfiguration = data;
									})
									.then(function() {
										return s3Client.getBucketTaggingAsync({ Bucket: bucket.Name });
									})
									.then(function(data) {
										bucket.Tags = data;
									})
									.catch(function() {
										//Silently catch the NoSuchTagSet
										return;
									})
									.then(function() {
										return s3Client.getBucketWebsiteAsync({ Bucket: bucket.Name });
									})
									.then(function(data) {
										bucket.WebsiteConfiguration = data;
									})
									.catch(function() {
										//Silently catch the NoSuchWebsiteConfiguration
										return;
									})
									.then(function() {
										finalBuckets.push(bucket);
									})
							})
							.then(function() {
								return { Buckets: finalBuckets };
							});
					})
			},
			resBlock: 'Buckets',
			rName: 'Name',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'Bucket',
					'Properties': {
						'AccessControl': 'String',
						'BucketName': 'String',
						'CorsConfiguration': 'CORS Configuration',
						'LifecycleConfiguration': 'Lifecycle Configuration',
						'LoggingConfiguration': 'Logging Configuration',
						'NotificationConfiguration' : 'Notification Configuration',
						'ReplicationConfiguration' : 'Replication Configuration',
						'Tags': [],
						'VersioningConfiguration': 'Versioning Configuration',
						'WebsiteConfiguration': 'Website Configuration Type'
					}
				};
			}
		},
		BucketPolicy: {
			call: function() {
				return s3Client
					.listBucketsAsync({})
					.then(function (data) {
						var finalPolicies = [];
						return P
							.map(data.Buckets, function(bucket) {
								return s3Client
									.getBucketPolicyAsync({ Bucket: bucket.Name })
									.then(function(policy) {
										finalPolicies.push({ Bucket: bucket.Name, PolicyDocument: policy });
									})
									.catch(function() {
										//Silently catch the NoSuchPolicyException
										return;
									})
							})
							.then(function() {
								return { Policies: finalPolicies };
							});
					})
			},
			resBlock: 'Policies',
			rName: 'Bucket',
			construct: function (name, body) {
				Util.baseConstruct(this, name, body);
				this.block = {
					'Type': 'BucketPolicy',
					'Properties': {
						'Bucket': 'String',
						'PolicyDocument': 'JSON'
					}
				};
			}
		}
	};
};

module.exports = S3;
