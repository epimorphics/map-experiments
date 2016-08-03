'use strict';

angular
	.module('myApp')

	.component('myApp', {
		templateUrl:'myApp.html',
		controller:
		   ['$scope',

			function MyApp($scope){
				angular.extend($scope, {
	                uk: {
	                    lat: 55.505,
	                    lng: -4,
	                    zoom:5
	                },

	                defaults: {
	                    scrollWheelZoom: true
                	},
	            })
			}
		]
	});