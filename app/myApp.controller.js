"use strict";

// Controller for 'myApp'
angular
	.module('myApp')
	.controller('AppController', 
	   ['$log', 
		'$q',
		'dataservice', 

	function AppController($log, $q, dataservice){
		
		var vm = this;
		
		vm.title = 'Water quality';
		
		vm.dailyForecast 	 = {};
		vm.dailyForecastDate = {};

		activate();

		function activate() {
			var promises = 
			   [getDailyForecast(),
				getDailyForecastDate() 

			   ];

			return $q.all(promises).then(function (){
				$log.info('Initialized app module');
			});
		}

		function getDailyForecast(){
			return dataservice.getDailyForecast().then(function(data){
				vm.dailyForecast = data;
				return vm.dailyForecast;
			});
		}

		function getDailyForecastDate(){
			return dataservice.getDailyForecastDate().then(function(data){
				vm.dailyForecastDate = data;
				return vm.dailyForecastDate;
			});
		}
	}]);