'use strict';

angular
	.module('myApp')

	.component('myApp', {
		templateUrl:'myApp.html',
		controller:
		   ['$scope',
		   	'$http',
		   	'$log',
		   	'dataservice',

			function MyApp($scope, $http, $log, dataservice){
				var vm = this;

				vm.zoiGeoJson = {};

				
				//Define the EPSG:27700 coordinate system
					proj4.defs("EPSG:27700","+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");
				//

				
				// Function calls for the model
				
				getZoiGeoJson();				

				function getZoiGeoJson(){
					return dataservice.getZoiGeoJson().then(function onSuccess(data){
						vm.zoiGeoJson = data;
						generateMap();
						return vm.zoiGeoJson;
					}, function onFailure(message){
						$log.error("Failed at `MyApp.getZoiGeoJson()` " + message);
					})
				}
			
				// Auxiliar functions

				function generateMap(){
					angular.extend($scope, {
			        	geojson: {
			        		data: vm.zoiGeoJson	
			        	},

			        	defaults: {
				            scrollWheelZoom: true
				        }
				    });
				}
			}
		]
	});