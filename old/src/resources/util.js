'use strict';

function buildName(name) {
	name = name.replace( /\W/g , '');
	return name + 'Resource';
}

var Util = {

	baseConstruct: function(obj, name, body) {
		obj.inTemplate = false;
		obj.templateParams = {};
		obj.id = name;
		obj.name = buildName(name);
		obj.body = body;
	}

};

module.exports = Util;
