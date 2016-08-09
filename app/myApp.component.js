'use strict';

angular
	.module('myApp')

	.component('myApp', {
		templateUrl:'myApp.html',
		controller:
		   ['$scope',
		   	'$http',
		   	'dataservice',

			function MyApp($scope, $http, dataservice){
				var vm = this;

				vm.geoJson = {
				 	"type": "FeatureCollection",
				 	"features": [
				 		{	"type": "Feature",
	         				"geometry": {
	           					"type": "Polygon",
			           			"coordinates": [
		             				[ 
		             				  	[100.0, 0.0], [101.0, 0.0], [101.0, 1.0],
		              				  	[100.0, 1.0], [100.0, 0.0] 
		              				]
		             			]
							}
						},
						
						{	"type": "Feature",
							"geometry": {
								"type": "Polygon",
								"coordinates": [
									[
										[101, 1], [103, 2], [104, 2], [101, 1]
									]
								]
							}
						}
				 	]
				}

				angular.extend($scope, {
		        	geojson: {
		        		data: vm.geoJson	
		        	}
			    });
			}
		]
	});