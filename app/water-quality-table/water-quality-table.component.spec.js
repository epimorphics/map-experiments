/**
 * Test cases for the table component
 */
describe('waterQualityTable component', function() {
	// Load the module that contains the `waterQualityTable` component before each test
	beforeEach(module('myApp'));

	// Test suite for the controller
	describe('controller', function() {
    	var $log, $q, $httpBackend, dataservice, ctrl;

    	beforeEach(module('waterQualityTable'), function($provide){
    		dataservice = jasmine.createSpyObj("dataservice", ["getDailyForecast"]);
    		
    		dataservice.getDailyForecast.andReturn({
    			result: "called"
    		})

    		$provide.value("dataservice", dataservice);
    	});
    	
    	beforeEach(inject(function(_$httpBackend_, _$log_, _$q_, $rootScope, $componentController, _dataservice_){ 
		    $httpBackend = _$httpBackend_;
		    $log         = _$log_;
		    $q           = _$q_;
		    dataservice  = _dataservice_;

		    scope = $rootScope.$new();
		    
		    $httpBackend
		    	.when('GET', 'http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk2305-35200/latest')
		    	.respond([{ "format" : "linked-data-api", "version" : "0.2", "result" : {"_about" : "http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk4304-34700/latest.json", "definition" : "http://environment.data.gov.uk/meta/doc/bathing-water-quality/stp-risk-prediction/bathing-water/_eubwid/latest.json", "extendedMetadataVersion" : "http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk4304-34700/latest.json?_metadata=all", "first" : "http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk4304-34700/latest.json?_page=0", "hasPart" : "http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk4304-34700/latest.json", "isPartOf" : "http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk4304-34700/latest.json", "items" : [{"_about" : "http://environment.data.gov.uk/data/bathing-water-quality/stp-risk-prediction/point/34700/date/20160718-083513", "comment" : {"_value" : "No water quality warning issued", "_lang" : "en"}
				      , "dataset" : ["http://environment.data.gov.uk/data/bathing-water-quality/eaew/stp-risk-prediction", "http://environment.data.gov.uk/data/bathing-water-quality/stp-risk-prediction"], "expiresAt" : {"_value" : "2016-07-19T08:29:00", "_datatype" : "dateTime"}
				      , "predictedAt" : {"_value" : "2016-07-18T08:30:00", "_datatype" : "dateTime"}
				      , "predictedOn" : {"_value" : "2016-07-18", "_datatype" : "date"}
				      , "publishedAt" : {"_value" : "2016-07-18T08:35:13", "_datatype" : "dateTime"}
				      , "riskLevel" : "http://environment.data.gov.uk/def/bwq-stp/normal", "source" : "http://environment.data.gov.uk/sources/bwq/eaew/input/forecasts-publishProduction-2016-07-18_08-35-13_687-0230.csv#row=0127", "stp_bathingWater" : "http://environment.data.gov.uk/id/bathing-water/ukk4304-34700", "stp_samplingPoint" : "http://location.data.gov.uk/so/ef/SamplingPoint/bwsp.eaew/34700", "type" : ["http://environment.data.gov.uk/def/bwq-stp/RiskPrediction"]}
				    ], "itemsPerPage" : 10, "page" : 0, "startIndex" : 1, "type" : ["http://purl.org/linked-data/api/vocab#ListEndpoint", "http://purl.org/linked-data/api/vocab#Page"]}
				}]);


		   ctrl = $componentController('waterQualityTable', 
		   	{
		   		'$scope'	  : scope,
		   		'$log'  	  : $log,
		   		'$q'		  : $q,
		   		'dataservice' : dataservice
		   	});
		}));

    	it('should create a controller', function(){
    		spyOn(dataservice, 'getDailyForecast').and.callThrough();
        	expect(ctrl).not.toBeNull();
    	});

    	describe('WaterQualityTable.title', function(){
    		it('should have the title `Water quality`', function(){
    			expect(ctrl.title).toBeDefined();
    			expect(ctrl.title).toBe("Water quality");
    		})
    	})
    	describe('WaterQualityTable.getDailyForecast()', function(){
    		it('should get the correct pollution forecast', function(){
		   		spyOn(dataservice, 'getDailyForecast');
		   		expect(dataservice.getDailyForecast).toHaveBeenCalled();
		   		//expect(ctrl.dailyForecast).toBe("something");
			});
    	});
	});

	// Test suite for the dataservice
	describe('dataservice', function() {

		describe('dataservice.getDailyForecast()', function(){
			var sampleDataservice, $httpBackend;

			beforeEach(inject(function($injector, $controller){
				sampleDataservice = $injector.get('dataservice');
				$httpBackend = $injector.get('$httpBackend');

				$httpBackend
				    .when('GET', 
				    	  'http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk2305-35200/latest')
				    .respond(200, { foo: 'bar' });
			}));

			it('should demonstrate using when (200 status)', function(){
				  /*var salute;

				  salute = sampleDataservice.getDailyForecast();
				  
				  $httpBackend.flush();

				  expect(salute).toBe("hey");*/
			});
		});
	});

	describe('apiservice', function(){
		describe('apiservice.getDailyForecastApi()', function(){
			var sampleApiService;

			beforeEach(inject(function($injector){
				sampleApiService = $injector.get('apiservice');
			}));

			it('should return the end-point for the latest pollution forecast', function(){
				var waterId = "1";
				expect(sampleApiService.getDailyForecastApi(waterId))
					.toBe("http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk1/latest");

				var waterId = "2305-35200"
				expect(sampleApiService.getDailyForecastApi(waterId))
					.toBe("http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk2305-35200/latest");
			});
		});
	});	

	describe('idservice', function(){
		describe('idservice.getWaterId()', function(){
			var sampleIdService;

			beforeEach(inject(function($injector){
				sampleIdService = $injector.get('idservice');
			}));

			it('should return the correct water id', function(){
				expect(sampleIdService.getWaterId()).toBe("2305-35200");
			});
		});
	});	
})