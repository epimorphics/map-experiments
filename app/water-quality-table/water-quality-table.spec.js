/**
 * Test cases for the table component
 */
describe('component: waterQualityTable', function() {
	// Load the module that contains the `waterQualityTable` component before each test
	beforeEach(module('myApp'));  
	beforeEach(module('waterQualityTable'));

	// Test suite for the dataservice
	describe('dataservice', function(){
	});

	describe('apiservice', function(){
		var sampleApiService;
		
		beforeEach(inject(function($injector){
			sampleApiService = $injector.get('apiservice');
		}));

		describe('apiservice.getRiskForecastApi()', function(){
			it('should return the end-point to the latest pollution forecast', function(){
				var waterId = "123";
			
				expect(sampleApiService.getRiskForecastApi(waterId))
					.toBe("http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk123/latest");
			});
		});

		describe('apiservice.getBWProfileApi()', function(){
			it('should return the end-point to the latest profile of a bw', function(){
				var waterId = "123";

				expect(sampleApiService.getBWProfileApi(waterId))
					.toBe("http://environment.data.gov.uk/doc/bathing-water-profile/ukk123:latest");
			});
		});

		describe('apiservice.getBWInSeasonApi()', function(){
			it('should return the end-point to the latest sample', function(){
				var waterId = "123";

				expect(sampleApiService.getBWInSeasonApi(waterId))
					.toBe("http://environment.data.gov.uk/doc/bathing-water-quality/in-season/bathing-water/ukk123/latest");
			});
		});

		describe('apiservice.getBWComplianceApi()', function(){
			it('should return the end-point to the last compliance', function(){
				var waterId = "123";

				expect(sampleApiService.getBWComplianceApi(waterId))
					.toBe("http://environment.data.gov.uk/doc/bathing-water-quality/compliance-rBWD/bathing-water/ukk123?_page=0&_sort=-sampleYear");
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

	//Unfinished - problem: cannot access promise objects
	describe('dataservice', function(){
		var sampleDataService,
			apiservice,
			idservice,
			$httpBackend;

		beforeEach(inject(function($injector){
			sampleDataService = $injector.get('dataservice');
			$httpBackend      = $injector.get('$httpBackend');

			apiservice        = $injector.get('apiservice');
			idservice         = $injector.get('idservice'); 

			 authRequestHandler = $httpBackend.when('GET',
			 	"http://environment.data.gov.uk/doc/bathing-water-quality/stp-risk-prediction/bathing-water/ukk2305")
                .respond({userId: 'userX'}, {token: 'token'});
		}));

		describe('dataservice.getDailyForecast()', function(){

			it('should get the correct forecast', function(){
				spyOn(apiservice, 'getRiskForecastApi').and.callThrough();
				spyOn(idservice, 'getWaterId').and.callThrough();
			});
		});
	});
})