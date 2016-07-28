"use strict";

// Constructor for the table component
angular
	.module('waterQualityTable')
	.component('waterQualityTable', {
		templateUrl:'water-quality-table/water-quality-table.html',
		controller:['$log',
					'$q',
					'table_dataservice',

			function WaterQualityTable($log, $q, table_dataservice){
				var vm = this;
			
				vm.title               	= 'Water quality';
				vm.dailyForecast 	   	= {};
				vm.dailyForecastDate   	= {};
				vm.intervalStartDate   	= {};
				vm.intervalEndDate     	= {};
				vm.mostRecentSample    	= {};
				vm.mostRecentSampleDiff = {};

				vm.compliances = []; 

				activate();

				function activate() {
					var promises = 
					   [getDailyForecast(),
						getDailyForecastDate(),
						getIntervalStartDate(),
						getIntervalEndDate(),
						getMostRecentSample(),
						getMostRecentSampleDiff(),
						getCompliances(),
					   ];

					return $q.all(promises).then(function (){
						$log.info('Initialized `WaterQualityTable`');
					});
				}

				function getDailyForecast(){
					return table_dataservice.getDailyForecast().then(function(data){
						vm.dailyForecast = data;
						return vm.dailyForecast;
					}, function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getDailyForecast()'" );
					});
				}

				function getDailyForecastDate(){
					return table_dataservice.getDailyForecastDate().then(function(data){
						vm.dailyForecastDate = data;
						return vm.dailyForecastDate;
					}, function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getDailyForecastDate()'");
					});
				}

				function getIntervalStartDate(){
					return table_dataservice.getIntervalStartDate().then(function(data){
						vm.intervalStartDate = data;
						return vm.intervalStartDate;
					}, function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getIntervalStartDate()'");
					});
				}

				function getIntervalEndDate(){
					return table_dataservice.getIntervalEndDate().then(function(data){
						vm.intervalEndDate = data;
						return vm.intervalEndDate;
					}, function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getIntervalEndDate()'");
					});
				}
				
				function getMostRecentSample(){
					return table_dataservice.getMostRecentSample().then(function(data){
						vm.mostRecentSample = data;
						return vm.mostRecentSample;
					}, function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getMostRecentSample()'");
					});
				}

				function getMostRecentSampleDiff(){
					return table_dataservice.getMostRecentSampleDiff().then(function(data){
						vm.mostRecentSampleDiff = data;
						return vm.mostRecentSampleDiff;
					}, function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getMostRecentSampleDiff()'");
					});
				}

				function getCompliances(){
					return table_dataservice.getCompliances().then(function(data){
						vm.compliances = data;
						return vm.compliances;
					},function onFailure(message){
						$log.error("Failed at 'WaterQualityTable.getCompliances()'");
					});
				}
			}
		]
	})