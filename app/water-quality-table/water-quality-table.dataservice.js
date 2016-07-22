/**
 * Service provider for the table component
 */

'use strict';

angular
	.module('myApp')

	// Service for  customizing the date format
	.factory('timeservice', ['$q', function($q){
		var service = {
			getCorrectDateFormat: getCorrectDateFormat
		}

		return service

		function getCorrectDateFormat(date){
			date = new Date(date)
			return date;
		}
	}])

	// Service to build the URIs for the API calls
	.factory('apiservice', ['$q', function($q){

		var service = {
			getRiskForecastApi:     getRiskForecastApi,
			getBWProfileApi:        getBWProfileApi,
			getBWInSeasonApi:       getBWInSeasonApi,
			getBWComplianceApi:     getBWComplianceApi
		}

		// APIs
		var RISK_FORECAST_API_CALL = 
			"http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk";
		var BW_PROFILE_API_CALL    =
			"http://environment.data.gov.uk/doc/bathing-water-profile/ukk";
		var BW_IN_SEASON_API_CALL  =
			"http://environment.data.gov.uk/doc/bathing-water-quality/in-season/bathing-water/ukk";
		var BW_COMPLIANCE_API_CALL =
			"http://environment.data.gov.uk/doc/bathing-water-quality/compliance-rBWD/bathing-water/ukk";

		return service;

		function getRiskForecastApi(waterId){
    		return RISK_FORECAST_API_CALL + waterId + "/latest";
		}

		function getBWProfileApi(waterId){
			return BW_PROFILE_API_CALL + waterId + ":latest";
		}

		function getBWInSeasonApi(waterId){
			return BW_IN_SEASON_API_CALL + waterId + "/latest";
		}

		function getBWComplianceApi(waterId){
			return BW_COMPLIANCE_API_CALL + waterId + "?_page=0&_sort=-sampleYear";	
		}
	}])

	// Service that returns the bw id
	.factory('idservice', ['$q', function($q){

	    	var service = {
	    		getWaterId: getWaterId
	    	};

	    	return service;

	    	function getWaterId(){
	    		return "2305-35200";
	    	}
	    }
	])

	// Service that retrieves data about bathing waters
	.factory('dataservice',
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
					var date = response.data.result.items[0].sampleDateTime.inXSDDateTime._value;
					return timeservice.getCorrectDateFormat(date);
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