/**
 * Test cases for the table component
 */
describe('component: searchFeature', function() {
	// Load the module that contains the `waterQualityTable` component before each test
	beforeEach(module('myApp'));  
	beforeEach(module('searchFeature'));

	//Test suite for SearchFeature controller
	describe('controller: SearchFeature', function(){
		var $componentController;
		
		beforeEach(inject(function(_$componentController_){
			$componentController = _$componentController_;
		}));

		it('should create a SearchFeature controller', function(){
			var ctrl = $componentController('searchFeature');

			expect(ctrl).toBeDefined();
		});

		it('should set "filtering" model variable to "all"', function(){
			var ctrl = $componentController('searchFeature');

			expect(ctrl.filtering).toBe('all');
		});

		it('shoult set a default a default value for the "orderProp" model', function(){
			var ctrl = $componentController('searchFeature');

			expect(ctrl.orderProp).toBe('name');
		})

		describe('SearchFeature.search()', function(){
			it('should return true if search matches, and false otherwise', function(){
				var ctrl = $componentController('searchFeature');
				var item = {};

				ctrl.query = 'TEST';
				item.name  = 'TEST';
				expect(ctrl.search(item)).toBe(true);

				ctrl.query = 'test';
				item.name  = 'TEST';
				expect(ctrl.search(item)).toBe(true);

				ctrl.query = 'st';
				item.name  = 'test';
				expect(ctrl.search(item)).toBe(true);

				ctrl.query = 'stx';
				item.name  = 'test';
				expect(ctrl.search(item)).toBe(false);

				ctrl.query = '';
				item.name  = 'test';
				expect(ctrl.search(item)).toBe(true);
			});
		});
	});

	/*//Test suite for search_dataservice
	describe('search_dataservice', function(){
		var search_dataservice;
		var	$q;
	 	var	requestBathingWatersDeferred;
	 	var	mockedRequestService = function(){
			return {
				requestBathingWaters: jasmine.createSpy()
			}
		};

		beforeEach(function(){
			module(function($provide){
		    	$provide.service('requestservice', mockedRequestService);
		    });

		    inject(function(_search_dataservice_, _$q_){
		      search_dataservice = _search_dataservice_;
		      $q = _$q_;
		    });
		})

		describe('getObjects()', function(){
			it('should call requestservice.requestBathingWaters()', function(){
				var dummyData = ['bw1', 'bw2'];
				expectRequestBathingWaters();
				
				search_dataservice.getObjects();
				flushRequestBathingWaters();

				expect(mockedRequestService.requestBathingWaters()).toHaveBeenCalled();
			});
		});

		function expectRequestBathingWaters() {
			requestBathingWatersDeferred = $q.defer();
			console.log(mockedRequestService.requestBathingWaters);
			mockedRequestService.requestBathingWaters.and.returnValue(requestBathingWatersDeferred.promise);
		}

		function flushRequestBathingWaters(data) {
			requestBathingWatersDeferred.resolve(data);
		}
	});*/	
});