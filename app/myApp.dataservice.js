'use strict';

angular
	.module('myApp')

	// Service for making requests to the API end-points
	.factory('requestservice', 
		['$http',
		
		function($http){
			var service = {
				requestBathingWaters: requestBathingWaters	
			}
			
			return service;

			// Get all bathing waters
			function requestBathingWaters(API_CALL){
				return $http.get(API_CALL)
			    .then(function onSuccess(response){
					return response.data.result.items;
				}, function onFailure(response){
					$log.error("Failed http request at 'requestservice.getBathingWaters()':" + response);
					return "Failed http request at 'requestservice.getBathingWaters()'";
				});
			}
	}])

	// Service to build the URIs for the API calls
	.factory('apiservice', [ function($q){

		var service = {
			getRiskForecastApi:     getRiskForecastApi,
			getBWProfileApi:        getBWProfileApi,
			getBWInSeasonApi:       getBWInSeasonApi,
			getBWComplianceApi:     getBWComplianceApi,
			getBathingWatersApi:    getBathingWatersApi
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
		var BATHING_WATERS_API_CALL = 
			"http://environment.data.gov.uk/doc/bathing-water";

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

		function getBathingWatersApi(){
			return BATHING_WATERS_API_CALL + "?_pageSize=1000" + "&" + "_properties=latestProfile.countyName";
		}
	}])

	// Service that returns the bw id
	.factory('idservice', [ function($q){

	    	var service = {
	    		getWaterId: getWaterId
	    	}

	    	return service;

	    	function getWaterId(){
	    		return "2305-35200";
	    	}
	    }
	]);