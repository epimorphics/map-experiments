'use strict';

function waterStatsTable(SetTableData) {}
waterStatsTable.$inject = ['SetTableData'];

// Register `waterStatsTable` component, along with its associated controller and template
angular.
  module('waterStatsTable').
  component('waterStatsTable', {
    templateUrl: 'water-stats-table/water-stats-table.template.html',
    controller: function waterStatsTablele(SetTableData) {
      
      // Object to hold the info in the table
      var tableDataObject = {};
      // Get the table data from the 'TableData' service
      tableDataObject = SetTableData.getTableDataObject();

      this.tableTitle = "Water Quality";
      
      this.rows = [
        {
          title: 'Daily pollution forecast',
          value: tableDataObject.dailyForecast
        }, {
          title: 'Samples taken',
          value: tableDataObject.samplesTaken
        }, {
          title: 'Most recent sample',
          value: tableDataObject.mostRecentSample
        }, {
          title: tableDataObject.year1 + 'classification',
          value: tableDataObject.year1
        }, {
          title: tableDataObject.year2 + 'classification',
          value: tableDataObject.year2
        }, {
          title: tableDataObject.year3 + 'classification',
          value: tableDataObject.year3
        }, {
          title: tableDataObject.year4 + 'classification',
          value: tableDataObject.year4
        }
      ];

      this.test = function() {
        console.log(tableDataObject.dailyForecast);
      }
    }
  });
