'use strict';

angular
	.module('myApp')

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
	    	}

	    	return service;

	    	function getWaterId(){
	    		return "2305-35200";
	    	}
	    }
	]);