'use strict';

angular
	.module('myApp')

	.factory('apiservice', 
		[ 

		function(){
			var service = {
				getZoneOfInfluence: getZoneOfInfluence
			}

			var BATHING_WATERS_API_CALL = 
				"http://environment.data.gov.uk/doc/bathing-water";

			return service;

			function getZoneOfInfluence(){
				return BATHING_WATERS_API_CALL + "?_pageSize=10&_properties=zoneOfInfluence.extent.asGML";
			}
		
	}])
	
	.factory('dataservice', 
		['$http',
		 'apiservice', 

		function($http, apiservice){
			var service = {
				getGmlData: getGmlData
			}

			return service;

			function getGmlData(){
				var API_CALL = apiservice.getZoneOfInfluence();
				

				return $http.get(API_CALL).then(function onSuccess(data){
					console.log(data);
				})
			}
	}]);