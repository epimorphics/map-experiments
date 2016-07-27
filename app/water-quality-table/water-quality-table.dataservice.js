/**
 * Service provider for the table component
 */

'use strict';

angular
	.module('waterQualityTable')

	// Service for  customizing the date format
	.factory('timeservice', ['$q', function($q){
		var service = {
			getDaysDifference: getDaysDifference
		}

		return service;

		// Get the days difference between current date and
		// the most recent sample date
		function getDaysDifference(date){
			var formatedDate = new Date(date); 
			var now  = new Date();
			var day  = 1000 * 60 * 60 * 24; 
			
			var diff = Math.ceil((now.getTime()-formatedDate.getTime())/(day));

			return diff;
		}
	}])

	// Service that retrieves data about bathing waters
	.factory('table_dataservice',
	   ['$http',
	    '$log',
		'idservice',
		'apiservice', 
		'timeservice',

		function($http, $log, idservice, apiservice, timeservice){
			
			// Functionality provided by the service
			var service = {
				getDailyForecast:       getDailyForecast,
				getDailyForecastDate:   getDailyForecastDate,
				getIntervalStartDate:   getIntervalStartDate,
				getIntervalEndDate:     getIntervalEndDate,
				getMostRecentSample:    getMostRecentSample,
				getCompliances: 		getCompliances
			};

			return service;
			
			function getDailyForecast(){
				var waterId  = idservice.getWaterId();
				var API_CALL = apiservice.getRiskForecastApi(waterId);

				return $http.get(API_CALL)
			    .then(function onSuccess(response){
					return response.data.result.items[0].comment._value;
				}, function onFailure(response){
					$log.error("Failed http request at 'dataservice.getDailyForecast()':" + response);
					return "Failed http request at 'dataservice.getDailyForecast()'";
				});
			}
			
			function getDailyForecastDate(){
				var waterId  = idservice.getWaterId();
				var API_CALL = apiservice.getRiskForecastApi(waterId);

				return $http.get(API_CALL)
				.then(function onSuccess(response){
					return response.data.result.items[0].predictedAt._value;
				}, function onFailure(response){
					$log.error("Failed http request at 'dataservice.getDailyForecast()':" + response);
					return "Failed http request at 'dataservice.getDailyForecastDate()'";
				});
			}

			function getIntervalStartDate(){
				var waterId  = idservice.getWaterId(); 
				var API_CALL = apiservice.getBWProfileApi(waterId);

				return $http.get(API_CALL)
				.then(function onSuccess(response){
					return response.data.result.primaryTopic.seasonInterval.beginning.inXSDDateTime._value;
				}, function onFailure(response){
					$log.error("Failed http request at 'dataservice.getIntervalStartDate()':" + response);
					return "Failed http request at 'dataservice.getIntervalStartDate()'";
				});

			}

			function getIntervalEndDate(){
				var waterId  = idservice.getWaterId(); 
				var API_CALL = apiservice.getBWProfileApi(waterId);

				return $http.get(API_CALL)
				.then(function onSuccess(response){
					return response.data.result.primaryTopic.seasonInterval.end.inXSDDateTime._value;;
				}, function onFailure(response){
					$log.error("Failed http request at 'dataservice.getIntervalEndDate()':" + response);
					return "Failed http request at 'dataservice.getIntervalEndDate()'";
				});
			}

			function getMostRecentSample(){
				var waterId  = idservice.getWaterId();
				var API_CALL = apiservice.getBWInSeasonApi(waterId);
				
				return $http.get(API_CALL)
				.then(function onSuccess(response){
					var date  = response.data.result.items[0].sampleDateTime.inXSDDateTime._value;
					return timeservice.getDaysDifference(date);
				}, function onFailure(response){
					$log.error("Failed http request at 'dataservice.getMostRecentSample()':" + response);
					return "Failed http request at 'dataservice.getMostRecentSample()'";
				});
		
			}

			function getCompliances(){
				var waterId  = idservice.getWaterId();
				var API_CALL = apiservice.getBWComplianceApi(waterId); 

				return $http.get(API_CALL)
				.then(function onSuccess(response){
					var entries           = response.data.result.items;
					var compliances       = [];
					
					//only get the last 4 classification years
					for(var i = 0; i < 4; i++){
						//break if less than 4 classification years
						if (typeof entries[i] === "undefined"){
							break;
						}
						
						compliances.push(
							{
								year:           entries[i].sampleYear.ordinalYear,
								classification: entries[i].complianceClassification.name._value 
							}
						);
					}
					
					return compliances;
				})
			}
		}
	]);