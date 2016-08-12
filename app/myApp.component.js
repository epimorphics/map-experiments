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

				//Define the used coordinate reference systems
				proj4.defs("EPSG:27700","+proj=tmerc +lat_0=49 +lon_0=-2 +k=0.9996012717 +x_0=400000 +y_0=-100000 +ellps=airy +towgs84=446.448,-125.157,542.06,0.15,0.247,0.842,-20.489 +units=m +no_defs");

				//Store the defined projections in variables
				var firstProjection  = "EPSG:27700";
				var secondProjection = "EPSG:4326";
				
				//Create a point by converting it from the first
				//crs to the second
				var point = proj4(firstProjection,secondProjection,[358835.572679,173560.671328]);
				
				//Display point values
				// console.log(point[0]);
				// console.log(point[1]);

				vm.zoiGeoJson = {};

				getZoiGeoJson();

				//start
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
				
				// vm.geoJson.features.push(vm.pointToAdd);
				

				function getZoiGeoJson(){
					return dataservice.getZoiGeoJson().then(function onSuccess(data){
						vm.zoiGeoJson = data;
						//console.log(vm.zoiGeoJson);
						angular.extend($scope, {
				        	geojson: {
				        		data: vm.zoiGeoJson	
				        	},

				        	defaults: {
					            scrollWheelZoom: true
					        }
					    });
						return vm.zoiGeoJson;
					}, function onFailure(message){
						$log.error("Failed at `MyApp.getZoiGeoJson()` " + message);
					})
				}
			}
		]
	});