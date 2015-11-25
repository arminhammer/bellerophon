/**
 * Created by arminhammer on 11/24/15.
 */

var m = require('mithril');

var Resource = function() {

	var ResourceBase = function() {
		var self = this;
		self.inTemplate = m.prop(false);

	};

	var VPC = function(name, body) {
		ResourceBase.call(this);
		var self = this;
		self.id = name;
		self.name = name + '-resource';
		self.body = body;
		self.block = {
			"Type" : "AWS::EC2::VPC",
			"Properties" : {
				"CidrBlock" : "String",
				"EnableDnsSupport" : "Boolean",
				"EnableDnsHostnames" : "Boolean",
				"InstanceTenancy" : "String",
				"Tags" : []
			}
		};
	};
	VPC.prototype = Object.create(ResourceBase.prototype);

	return {
		VPC: VPC
	}

};

module.exports = Resource;
