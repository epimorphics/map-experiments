'use strict';

// Define the module for 'myApp'
angular
	.module('myApp', 
		[
			'ngRoute',
			'waterQualityTable',
			'searchFeature'
		])

	.config(['$locationProvider', '$routeProvider', function($locationProvider, $routeProvider) {
	  $locationProvider.html5Mode(true);

	  $routeProvider.
        when('/table', {
          template: '<water-quality-table></water-quality-table>'
        }).
        when('/search-feature', {
          template: '<search-feature></search-feature>'
        }).
        otherwise('/table');
	}]);