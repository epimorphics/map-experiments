'use strict';

// Component for 'searchFeature'
angular
	.module('searchFeature')
	.component('searchFeature', {
		templateUrl:'search-feature/search-feature.html',
		controller:
		   ['$q',
			'$log',
			'search_dataservice', 

			function SearchFeature($q, $log, search_dataservice){
				var vm = this;

				//Locally initialized
				vm.filtering = "all";
				vm.orderProp = "name";
				
				//Get from dataservice
				vm.searchArray   = [];

				activate();

				function activate(){
					var promises = 
					   [getSearchArray()
					   
					   ];

					return $q.all(promises).then(function (){
						$log.info('Initialized `SearchFeature`');
					});
				}

				// Get the searchable content
				function getSearchArray(){
					return search_dataservice.retrieveSearchArray().then(function(data){
						vm.searchArray = data;
						return vm.searchArray;
					}, function onFailure(message){
						$log.error("Failed at 'SearchFeature.getObjects()'")
					});
				}


				//CONTROLLER FUNCTIONALITY

				/**
				  * Custom search function that returns true if 
				  * query matches name in list items
				  *
				  * @item - item from a list
				  */
				vm.search = function(item) {
			        return (angular.lowercase(item.name).indexOf(angular.lowercase(vm.query) || '') !== -1);
			    };
			}
		]
	});