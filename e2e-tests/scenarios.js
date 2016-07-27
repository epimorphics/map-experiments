'use strict';

// Angular E2E Testing Guide:
// https://docs.angularjs.org/guide/e2e-testing

describe('My app', function() {

	beforeEach(function() {
	browser.get('index.html');
	}); 
	
	it('should modify `filtering` value in model by radio button check', function(){
		/*//var radioButtons = element.all(by.name('selection-name-type'));
		//var filtering = element(by.model('$ctrl.filtering'));

		input('filtering').select('all');
		//expect(element('input[name="selection-name-type"]:checked').val()).toBe('all');
		element(by.id('radiogrp1')).all(by.tagName('md-radio-button')).get(0).click();
		element(by.css('input[name="selection-name-type"]:checked')).getAttribute('value').toBe('all');
	//	radioButtons.get(0).click();*/
	});
});
