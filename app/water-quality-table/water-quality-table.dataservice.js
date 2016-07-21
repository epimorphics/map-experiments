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
			var deferred = $q.defer();
    		deferred.resolve(RISK_FORECAST_API_CALL + waterId + "/latest");
    		return deferred.promise;
		}

		function getBWProfileApi(waterId){
			var deferred = $q.defer();
			deferred.resolve(BW_PROFILE_API_CALL + waterId + ":latest");
			return deferred.promise;
		}

		function getBWInSeasonApi(waterId){
			var deferred = $q.defer();
			deferred.resolve(BW_IN_SEASON_API_CALL + waterId + "/latest");
			return deferred.promise;
		}

		function getBWComplianceApi(waterId){
			var deferred = $q.defer();
			deferred.resolve(BW_COMPLIANCE_API_CALL + waterId + "?_page=0&_sort=-sampleYear");
			return deferred.promise;	
		}
	}])

	// Service that returns the bw id
	.factory('idservice', ['$q', function($q){

	    	var service = {
	    		getWaterId: getWaterId
	    	};

	    	return service;

	    	function getWaterId(){
	    		var deferred = $q.defer();
	    		deferred.resolve("2305-35200");
	    		return deferred.promise;
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
				return idservice.getWaterId().then(function(id){
					return apiservice.getRiskForecastApi(id).then(function(API_CALL){
						return $http.get(API_CALL)
					    .then(function onSuccess(response){
							return response.data.result.items[0].comment._value;
						}, function onFailure(response){
							$log.error("Failed http request at 'dataservice.getDailyForecast()':" + response);
							return "Failed http request at 'dataservice.getDailyForecast()'";
						});
					});
				});
			}
			
			function getDailyForecastDate(){
				return idservice.getWaterId().then(function(id){
					return apiservice.getRiskForecastApi(id).then(function(API_CALL){
						return $http.get(API_CALL)
						.then(function onSuccess(response){
							return response.data.result.items[0].predictedAt._value;
						}, function onFailure(response){
							$log.error("Failed http request at 'dataservice.getDailyForecast()':" + response);
							return "Failed http request at 'dataservice.getDailyForecastDate()'";
						});
					});
				});
			}

			function getIntervalStartDate(){
				return idservice.getWaterId().then(function(id){
					return apiservice.getBWProfileApi(id).then(function(API_CALL){
						return $http.get(API_CALL)
						.then(function onSuccess(response){
							return response.data.result.primaryTopic.seasonInterval.beginning.inXSDDateTime._value;
						}, function onFailure(response){
							$log.error("Failed http request at 'dataservice.getIntervalStartDate()':" + response);
							return "Failed http request at 'dataservice.getIntervalStartDate()'";
						});
					});
				});
			}

			function getIntervalEndDate(){
				return idservice.getWaterId().then(function(id){
					return apiservice.getBWProfileApi(id).then(function(API_CALL){
						return $http.get(API_CALL)
						.then(function onSuccess(response){
							return response.data.result.primaryTopic.seasonInterval.end.inXSDDateTime._value;;
						}, function onFailure(response){
							$log.error("Failed http request at 'dataservice.getIntervalEndDate()':" + response);
							return "Failed http request at 'dataservice.getIntervalEndDate()'";
						});
					});
				});
			}

			function getMostRecentSample(){
				return idservice.getWaterId().then(function(id){
					return apiservice.getBWInSeasonApi(id).then(function(API_CALL){
						return $http.get(API_CALL)
						.then(function onSuccess(response){
							var date = response.data.result.items[0].sampleDateTime.inXSDDateTime._value;
							return timeservice.getCorrectDateFormat(date);
						}, function onFailure(response){
							$log.error("Failed http request at 'dataservice.getMostRecentSample()':" + response);
							return "Failed http request at 'dataservice.getMostRecentSample()'";
						});
					});
				});
			}

			function getCompliances(){
				return idservice.getWaterId().then(function(id){
					return apiservice.getBWComplianceApi(id).then(function(API_CALL){
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
					})
				})
			}
		}
	]);