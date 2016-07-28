'use strict';

angular
	.module('searchFeature')

	.factory('search_dataservice', 
		['$q',
		 'apiservice',
		 'requestservice',

		function($q, apiservice, requestservice){
			
			var service = {
				getObjects: getObjects,
			}

			return service;

			//Function to get all search objects
			function getObjects(){
				var API_CALL = apiservice.getBathingWatersApi();
				var objects = [];
				
				return requestservice.requestBathingWaters(API_CALL).then(function onSuccess(bwArray){
					for (var index = 0; index < bwArray.length; index++){
						
						addBahingWater();

						function addBahingWater(){
							var object = {};

							object.type = 'bathing water';
							object.name = bwArray[index].name._value;

							objects.push(object);
						}
					}
					console.log(objects);
					return objects;
				});
			}
		}
	]);