'use strict';

angular
	.module('searchFeature')
	/*.factory('constructservice',

		function(){
			var service = {
				constructSearchArray: constructSearchArray,

			}
		}
	)\*/
	
	.factory('search_dataservice', 
		['$q',
		 'apiservice',
		 'requestservice',

		function($q, apiservice, requestservice){
			
			var service = {
				getSearchArray: 	 getSearchArray, 
				retrieveSearchArray: retrieveSearchArray	 
			};

			var searchArray = [];

			return service;

			// Function to get the search array after
			// page has already loaded
			function getSearchArray(){
				var deferred = $q.defer();
				deferred.resolve(searchArray);
				return deferred.promise;
			}

			// Function to retrieve all search objects
			function retrieveSearchArray(){
				
				if(searchArray.length == 0){
					return loadDataFromApi()
				} else {
					return this.getSearchArray();
				}
			}

			
			// PRIVATE FUNCTIONS
			
			// Function to load the bathing waters array
			// from the api end-point
			function loadDataFromApi(){
				var API_CALL = apiservice.getBathingWatersApi();

				return requestservice.requestBathingWaters(API_CALL).then(function onSuccess(bwArray){
					constructSearchArray(bwArray);
					return searchArray;
				}, function onFailure(error){
					return "Failed at `loadDataFromApi()`" + error;
				});
			}

			// FUNCTIONS TO CONSTRUCT SEARCH ARRAY

			/**
			  * 
			  */
			function constructSearchArray(bwArray){
				var hasWaterCompany = [],
					hasDistrict     = [],
					hasCounty		= [],
					hasCountry		= [];

				hasWaterCompany = initializeWaterCompanies(bwArray, hasWaterCompany);
				hasDistrict     = initializeDistricts(bwArray, hasDistrict)
				hasCounty   	= initializeCounties(bwArray, hasCounty);
				hasCountry		= initializeCountries(bwArray, hasCountry);

				for(var index = 0; index < bwArray.length; index++){
					addBathingWater(bwArray[index]);
					hasWaterCompany = addWaterCompany(bwArray[index], hasWaterCompany);
					hasDistrict		= addDistrict(bwArray[index], hasDistrict);
					hasCounty		= addCounty(bwArray[index], hasCounty);
					hasCountry		= addCountry(bwArray[index], hasCountry);
				}
			}

			function initializeWaterCompanies(bwArray, boolArray){
				for(var index = 0; index < bwArray.length; index++){
					var bw = bwArray[index],
						waterCompany = bw.appointedSewerageUndertaker.name._value;
					
					boolArray[waterCompany] = 0;
				}

				return boolArray;
			}

			function initializeDistricts(bwArray, boolArray){
				for(var index = 0; index < bwArray.length; index++){
					var bw = bwArray[index],
						district = bw.district[0].name._value;
					
					boolArray[district] = 0;
				}

				return boolArray;
			}

			function initializeCounties(bwArray, boolArray){
				for(var index = 0; index < bwArray.length; index++){
					var bw = bwArray[index],
						county = bw.latestProfile.countyName._value;
					
					boolArray[county] = 0;
				}

				return boolArray;
			}

			function initializeCountries(bwArray, boolArray){
				for(var index = 0; index < bwArray.length; index++){
					var bw = bwArray[index],
						country = bw.country.name._value;
					
					boolArray[country] = 0;
				}

				return boolArray;
			}
			

			function addBathingWater(bw){
				var object = {};

				object.type = 'bathing water';
				object.name =  bw.name._value;

				searchArray.push(object);
			}

			function addWaterCompany(bw, boolArray){
				var object  = {};
				var waterCompany = bw.appointedSewerageUndertaker.name._value;

				if(boolArray[waterCompany] == 0){
					object.type = 'water company';
					object.name =  waterCompany;
					object.bws  =  1;
					
					searchArray.push(object);
					boolArray[waterCompany] = 1;
				} else {
					for (var index = 0; index < searchArray.length; index++){
						if(searchArray[index].type == 'water company'){
							if(searchArray[index].name == waterCompany){
								searchArray[index].bws++;
								break;
							}
						}
					}
				}
				
				return boolArray;				 
			}

			function addDistrict(bw, boolArray){
				var object  = {};
				var district = bw.district[0].name._value;

				if(boolArray[district] == 0){
					object.type = 'district';
					object.name =  district;
					object.bws  =  1;
					
					searchArray.push(object);
					boolArray[district] = 1;
				} else {
					for (var index = 0; index < searchArray.length; index++){
						if(searchArray[index].type == 'district'){
							if(searchArray[index].name == district){
								searchArray[index].bws++;
								break;
							}
						}
					}
				}
				
				return boolArray;
			}
			
			function addCounty(bw, boolArray){
				var object  = {};
				var county = bw.latestProfile.countyName._value;

				if(boolArray[county] == 0){
					object.type = 'county';
					object.name =  county;
					object.bws  =  1;
					
					searchArray.push(object);
					boolArray[county] = 1;
				} else {
					for (var index = 0; index < searchArray.length; index++){
						if(searchArray[index].type == 'county'){
							if(searchArray[index].name == county){
								searchArray[index].bws++;
								break;
							}
						}
					}
				}
				
				return boolArray;
			}
			
			function addCountry(bw, boolArray){
				var object  = {};
				var country = bw.country.name._value;

				if(boolArray[country] == 0){
					object.type = 'country';
					object.name =  country;
					object.bws  =  1;
					
					searchArray.push(object);
					boolArray[country] = 1;
				} else {
					for (var index = 0; index < searchArray.length; index++){
						if(searchArray[index].type == 'country'){
							if(searchArray[index].name == country){
								searchArray[index].bws++;
								break;
							}
						}
					}
				}
				
				return boolArray;
			}
		}
	]);