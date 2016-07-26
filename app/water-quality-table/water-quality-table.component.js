"use strict";

// Constructor for the table component
angular
	.module('waterQualityTable')
	.component('waterQualityTable', {
		templateUrl:'water-quality-table/water-quality-table.html',
		controller:['$log',
					'$q',
					'dataservice',

			function WaterQualityTable($log, $q, dataservice){
				var vm = this;
			
				vm.title               = 'Water quality';
				vm.dailyForecast 	   = {};
				vm.dailyForecastDate   = {};
				vm.intervalStartDate   = {};
				vm.intervalEndDate     = {};
				vm.mostRecentSample    = {};

				vm.compliances = []; 

				activate();

				function activate() {
					var promises = 
					   [getDailyForecast(),
						getDailyForecastDate(),
						getIntervalStartDate(),
						getIntervalEndDate(),
						getMostRecentSample(),
						getCompliances()
					   ];

					return $q.all(promises).then(function (){
						$log.info('Initialized app module');
					});
				}

				function getDailyForecast(){
					return dataservice.getDailyForecast().then(function(data){
						vm.dailyForecast = data;
						return vm.dailyForecast;
					}, function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getDailyForecast()'" );
					});
				}

				function getDailyForecastDate(){
					return dataservice.getDailyForecastDate().then(function(data){
						vm.dailyForecastDate = data;
						return vm.dailyForecastDate;
					}, function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getDailyForecastDate()'");
					});
				}

				function getIntervalStartDate(){
					return dataservice.getIntervalStartDate().then(function(data){
						vm.intervalStartDate = data;
						return vm.intervalStartDate;
					}, function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getIntervalStartDate()'");
					});
				}

				function getIntervalEndDate(){
					return dataservice.getIntervalEndDate().then(function(data){
						vm.intervalEndDate = data;
						return vm.intervalEndDate;
					}, function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getIntervalEndDate()'");
					});
				}
				
				function getMostRecentSample(){
					return dataservice.getMostRecentSample().then(function(data){
						vm.mostRecentSample = data;
						return vm.mostRecentSample
					}, function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getMostRecentSample()'");
					});
				}

				function getCompliances(){
					return dataservice.getCompliances().then(function(data){
						vm.compliances = data;
						return vm.compliances;
					},function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getCompliances()'");
					});
				}
			}
		]
	})