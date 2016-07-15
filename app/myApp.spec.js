describe('AppController', function() {

  beforeEach(module('myApp'));

  it('sets the table title to "Water quality"', inject(function($controller) {
    var ctrl = $controller('AppController');

    expect(ctrl.title).toBe('Water quality');
  }));
});