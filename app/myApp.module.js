'use strict';

// Define the module for 'myApp'
angular
	.module('myApp', [
		//...which depends on the modules:
		'waterQualityTable',
		'angularMoment'
	])
	
	.run(function(amMoment) {
    	amMoment.changeLocale('de');
	});