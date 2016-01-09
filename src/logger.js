/**
 * Created by arminhammer on 1/6/16.
 */
'use strict';
var winston = require('winston');
var os = require('os');

var Logger = function() {
	var self = this;
	self.logger = new winston.Logger({
		level: 'info',
		transports: [
			new (winston.transports.Console)(),
			new (winston.transports.File)({ filename: os.homedir() + '/.bellerophon.log' })
		]
	});

	self.log = function(msg, level, from) {
		if(!level) {
			level = 'info';
		}
		if(!from) {
			from = 'SERVER:'
		}
		self.logger.log(level, from, msg);
	};
};

module.exports = Logger;
