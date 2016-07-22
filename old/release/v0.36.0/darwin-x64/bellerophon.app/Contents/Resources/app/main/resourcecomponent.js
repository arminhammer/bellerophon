/**
 * Created by arminhammer on 12/13/15.
 */
'use strict';

var m = require('mithril');
var _ = require('lodash');
var Spinner = require('spin.js');
var PanelComponent = require('./panelcomponent');

function formatTitle(title) {
	if(_.endsWith(title,'ay')) {
		return _.startCase(title + 's');
	} else if(_.endsWith(title,'y')) {
		return _.startCase(title.substring(0, title.length - 1) + 'ies');
	} else if(_.endsWith(title,'s')) {
		return _.startCase(title);
	} else if(title === title.toUpperCase()) {
		return title + 's';
	} else {
		return _.startCase(title + 's');
	}
}

var ResourceComponent = {
	controller: function (options) {
		this.resources = options.resources;
		this.resourceName = options.resourceName;
		this.log = options.log;
		this.addSpinner = function(element, isInitialized) {
			if(isInitialized) {
				return;
			}
			var opts = {
				lines: 13 // The number of lines to draw
				, length: 28 // The length of each line
				, width: 14 // The line thickness
				, radius: 60 // The radius of the inner circle
				, scale: 1 // Scales overall size of the spinner
				, corners: 1 // Corner roundness (0..1)
				, color: '#000' // #rgb or #rrggbb or array of colors
				, opacity: 0.25 // Opacity of the lines
				, rotate: 0 // The rotation offset
				, direction: 1 // 1: clockwise, -1: counterclockwise
				, speed: 1 // Rounds per second
				, trail: 60 // Afterglow percentage
				, fps: 20 // Frames per second when using setTimeout() as a fallback for CSS
				, zIndex: 2e9 // The z-index (defaults to 2000000000)
				, className: 'spinner' // The CSS class to assign to the spinner
				, top: '50%' // Top position relative to parent
				, left: '50%' // Left position relative to parent
				, shadow: false // Whether to render a shadow
				, hwaccel: false // Whether to use hardware acceleration
				, position: 'relative' // Element positioning
			};
			new Spinner(opts).spin(element);
			//$(element).tooltip();
		};
		this.spinner = new Spinner();
	},
	view: function (controller) {
		var count = 0;
		if(controller.resources()) {
			_.each(controller.resources()[controller.resourceName()].types, function (group, key) {
				count = count + _.size(group);
			});
		}
		if (!controller.resources()) {
			return m('.col-xs-9 .col-md-10 .col-lg-10', [
				m('.group', [
					m('.row', [
						m('.col-xs-12', [
							m('.subgroup', [
								m('#spinnerDiv', { config: controller.addSpinner })
							])
						])
					])
				])
			])
		} else if(controller.resources() && count == 0) {

			return m('.col-xs-9 .col-md-10 .col-lg-10', [
				_.map(controller.resources(), function (group, key) {
					if (key === controller.resourceName()) {
						return m('.row', [
							m('.group[id="' + key + '"]', [
								m('h3', [
									m('img', {
										src: '../icons/' + controller.resources()[key].icon + '.svg',
										height: 40
									}),
									key
								]),
								m('.row', [
									m('.col-xs-12', [
										m('h5', 'No ' + key + ' resources found.')
									])
								])
							])
						])
					}
				})
			])

		} else {
			return m('.col-xs-9 .col-md-10 .col-lg-10', [
				_.map(controller.resources(), function (group, key) {
					if (key === controller.resourceName()) {
						return m('.row', [
							m('.group[id="' + key + '"]', [
								m('h3', [
									m('img', {
										src: '../icons/' + controller.resources()[key].icon + '.svg',
										height: 40
									}),
									key
								]),
								_.map(controller.resources()[key].types, function (subResource, subKey) {
									var subKeySize = Object.keys(controller.resources()[key].types[subKey]).length;
									if (subKeySize > 0) {
										return m('.row', [
											m('.col-xs-12', [
												m('.subgroup[id="' + key + subKey + '"]', [
													m('h4', formatTitle(subKey)),
													_.map(controller.resources()[key].types[subKey], function (resource) {
														return m.component(PanelComponent, {
															resource: resource,
															log: controller.log,
															key: key,
															subKey: subKey
														})
													})
												])
											])
										])
									} /*else {
									 return m('.row', [
									 m('.col-xs-12', [
									 m('.subgroup[id="' + key + subKey + '"]', [
									 m('h4', formatTitle(subKey)),
									 m('div', 'No ' + formatTitle(subKey) + ' found.')
									 ])
									 ])
									 ])
									 }*/
								})
							])
						])
					}
				})
			])
		}
	}
}

module.exports = ResourceComponent;
