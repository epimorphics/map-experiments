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

				vm.zoneOfInfluence = {};

				//proj4.defs("urn:ogc:def:crs:EPSG::27594", "+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +datum=OSGB36 +units=m +no_defs");

				angular.extend($scope, $http, {
	                uk: {
	                    lat: 55.505,
	                    lng: -4,
	                    zoom:5
	                },

	                defaults: {
	                    scrollWheelZoom: true
                	},
	            }),

				getZoneOfInfluence();

				function getZoneOfInfluence(){
					return dataservice.getGmlData().then(function onSuccess(data){
						vm.zoneOfInfluence = data;
						return vm.zoneOfInfluence;
					}, function onFailure(message){
						return "Failed at MyApp.getZoneOfInfluence()" + message;
					});
				}
	            
	            
	            // Get the countries geojson data from a JSON
			    $http.get("example.geo.json").success(function(data, status) {
			        angular.extend($scope, {
			            geojson: {
			                data: data
			            }
			        });
			    });
			}
		]
	});