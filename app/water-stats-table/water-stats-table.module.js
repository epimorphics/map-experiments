'use strict';

// Define the `waterStatsTable` module
angular.module('waterStatsTable', [])
.service('GetTableData', function($http){
	
	// URI to risk prediction data
	var RISK_PREDICTION_DATA_API_CALL = "http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk2206-20900";

	// HTTP request to the API to get the risk prediction information 
	this.getRiskData = function(){
	  $http({
	  method: 'GET',
	  url: 	RISK_PREDICTION_DATA_API_CALL,
	  data: {
	  	_sort     :'-publishedAt',
	  	_pageSize : '1'
	  }
	}).then(function successCallback(response) {
	    // this callback will be called asynchronously
	    // when the response is available
	    console.log("Success!");
	    console.log(response.data.result.items[0]);

	  }, function errorCallback(response) {
	    // called asynchronously if an error occurs
	    // or server returns response with an error status.
	    console.log("Failed!");
	  })
	}
})

.service('SetTableData', function(GetTableData){
	var tableDataObject = {};

	function getYear(year){
		if(year == 1){
			return "2015";
		} else if(year == 2){
			return "2014";
		} else if(year == 3){
			return "2013";
		} else if(year == 4){
			return "2012";
		}
	}


	this.setTableDataObject = function(){
		tableDataObject.dailyForecast 	 = "Good!"
		tableDataObject.samplesTaken 	 = "A lot";
		tableDataObject.mostRecentSample = "Yesterday";
		tableDataObject.year1			 = getYear(1);
		tableDataObject.year2			 = getYear(2);
		tableDataObject.year3			 = getYear(3);
		tableDataObject.year4			 = getYear(4);
	}
	
	this.getTableDataObject = function(){
		this.setTableDataObject()
		
		return tableDataObject;
	}
});