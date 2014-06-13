'use strict';

/* jasmine specs for controllers go here */
describe('weborrent controllers', function() {

  beforeEach(module('weborrent'));
  beforeEach(module('weborrent.controllers'));
  
  beforeEach(inject(function(){
      
  }));

  describe('weborrentCtrller', function(){
    var scope, ctrl, $rootScope;

    beforeEach(inject(function(_$rootScope_, $controller) {
      $rootScope = _$rootScope_;
      scope = $rootScope.$new();
      ctrl = $controller('homeCtrl', {$scope: scope});
    }));


    it('should have correct values for ', function() {
      expect(true).to.equal(true);      
    });    
  });
  
});
