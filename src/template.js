/**
 * Created by arminhammer on 11/24/15.
 */

'use strict';

var _ = require('lodash');

var Template = function() {

	var self = this;

	function recursiveReplace(object, newPattern, oldPattern) {
		_.forIn(object, function (val, key) {
			if(_.isEqual(val, oldPattern)) {
				object[key] = newPattern
			} else if (_.isString(val) && _.isEqual(val.replace(/\W/g, ''), oldPattern)) {
				object[key] = newPattern;
			}
			else if (_.isArray(val)) {
				val.forEach(function(el) {
					if (_.isObject(el)) {
						recursiveReplace(el, newPattern, oldPattern);
					}
				});
			} else if (_.isObject(object[key])) {
				recursiveReplace(object[key], newPattern, oldPattern);
			}
		});
	}

	function populateBlock(block, body) {
		block.Properties = _.reduce(block.Properties, function(result, n, key) {
			if(body[key]) {
				result[key] = body[key];
			}
			return result;
		}, {});
		return block;
	}

	self.addResource = function(resource) {
		recursiveReplace(self.body.Resources, { 'Ref': resource.name }, resource.id);
		var newResource = populateBlock(resource.block, resource.body);
		_.each(self.body.Resources, function(val, key) {
			recursiveReplace(newResource, { 'Ref': key }, key.replace('Resource',''))
		});
		self.body.Resources[resource.name] = newResource;
	};

	self.removeResource = function(resource) {
		recursiveReplace(self.body.Resources, resource.id, { 'Ref': resource.name });
		delete self.body.Resources[resource.name];
	};

	self.addParam = function(resource, pKey) {
		if(self.body.Resources[resource.name]) {
			if(self.body.Resources[resource.name].Properties[pKey]) {
				var oldVal = self.body.Resources[resource.name].Properties[pKey];
				var paramName = resource.name + pKey + 'Param';
				self.body.Resources[resource.name].Properties[pKey] = { 'Ref' : paramName };
				self.body.Parameters[paramName] = {
					'Type' : 'String',
					'Default' : oldVal
				}
			}
		}
	};

	self.removeParam = function(resource, pKey) {
		if(self.body.Resources[resource.name]) {
			if(self.body.Resources[resource.name].Properties[pKey]) {
				var paramName = resource.name + pKey + 'Param';
				self.body.Resources[resource.name].Properties[pKey] = self.body.Parameters[paramName].Default;
				delete self.body.Parameters[paramName];
			}
		}
	};

	self.body = {
		'AWSTemplateFormatVersion' : '2010-09-09',
		'Parameters' : {},
		'Resources' : {}
	};

};

module.exports = Template;
