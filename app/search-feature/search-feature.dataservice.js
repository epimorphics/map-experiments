'use strict';

angular
	.module('searchFeature')

	.factory('search_dataservice', ['$q',

		function($q){
			
			var service = {
				getObjects: getObjects,
			}

			return service;

			function getObjects(){
				var deferred = $q.defer();
				deferred.resolve([
					{
						type: 'county',
						name: 'Bvon',
						bws:  '2'
					},

					{
						type: 'county',
						name: 'Avon',
						bws:  '5'
					},

					{
						type: 'bathing water',
						name: 'Spittal',
					},

					{
						type:'water company',
						name:'A Company',
						bws: '50'
					},

					{
						type: 'district',
						name: 'Test District',
						bws: '21'
					},

					{
						type: 'country',
						name: 'England',
						bws: '415',
					}
				]);
				return deferred.promise;
			}
		}
	]);