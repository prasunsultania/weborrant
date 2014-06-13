'use strict';

var ROOT;
if (window.location.href.indexOf('localhost') !== -1) {
    ROOT = "";
} else {
	//Add CDN provider, alternatively
	ROOT = "";
}

/* App Module */
angular.module('weborrent', ['ngRoute', 'weborrent.controllers']).config(['$routeProvider', '$locationProvider', '$sceDelegateProvider',                                                                                               
  function($routeProvider, $locationProvider, $sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
	  // Allow same origin resource loads.
	  'self',
	  // Allow loading from our assets domain.
	  ROOT + '**'
	]);
  $routeProvider.
    when('/', {
      templateUrl: ROOT + '/partials/home.html',
      controller: 'homeCtrl'
    })/*.
    otherwise({
      redirectTo: '/default'
    })*/;
    if (window.history && window.history.pushState) {
       $locationProvider.html5Mode(true);
    }
}]);