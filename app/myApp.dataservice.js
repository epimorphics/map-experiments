"use strict";

angular
	.module('myApp')
	.factory('dataservice',['$http', function($http){
		var service = {
			getDailyForecast:     getDailyForecast,
			getDailyForecastDate: getDailyForecastDate
		};

		return service;
		
		function getDailyForecast(){
			var LATEST_FORECAST_API_CALL = 
			    "http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk4304-34700/latest"
			
			return $http.get(LATEST_FORECAST_API_CALL)
				.then(function onSuccess(response){
					return response.data.result.items[0].comment._value;
				}, function onFailure(response){
					$log.info("HTTP request failed for 'getDailyForecast'");
					return "Forecast"
				});
		}

		function getDailyForecastDate(){
			var LATEST_FORECAST_API_CALL = 
			    "http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk4304-34700/latest"
			
			return $http.get(LATEST_FORECAST_API_CALL)
				.then(function onSuccess(response){
					return response.data.result.items[0].predictedAt._value;
				}, function onFailure(response){
					$log.info("HTTP request failed for 'getDailyForecastDate'");
					return "date"
				});		
		}
	}]);