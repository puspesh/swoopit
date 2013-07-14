'use strict';

// Declare app level module which depends on filters, and services

angular.module('myApp', [
  'myApp.controllers',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  '$strap.directives'
]).
config(function ($routeProvider, $locationProvider) {
  $routeProvider.
    when('/login', {
      templateUrl: 'partials/login',
      controller: 'LoginCtrl'
    }).
    when('/index', {
      templateUrl: 'partials/feed',
      controller: 'IndexCtrl'
    }).
    when('/not-yet', {
      templateUrl: 'partials/not-yet',
      controller: 'NotAllowedCtrl'
    }).
    when('/admin', {
      controller: 'AdminCtrl'
    }).
    otherwise({
      redirectTo: '/not-yet'
    });

  $locationProvider.html5Mode(true);
}).
config(function ($httpProvider) {

  var logsOutUserOn401 = function($location, $q, SessionService, FlashService) {
    var success = function(response) {
      return response;
    };

    var error = function(response) {
      if(response.status === 401) {
        SessionService.unset('authenticated');
        $location.path('/login');
        FlashService.show(response.data.flash);
        return $q.reject(response);
      } else {
        return $q.reject(response);
      }
    };

    return function(promise) {
      return promise.then(success, error);
    };
  };

  $httpProvider.responseInterceptors.push(logsOutUserOn401);
}).
run(function($rootScope, $location, AuthenticationService, FlashService) {
  var routesThatRequireAuth = ['/index'];
  $rootScope.$on('$routeChangeStart', function(event, next, current) {
    //if(routesThatRequireAuth.contains($location.path()) && !AuthenticationService.isLoggedIn()) {
    if($location.path() != '/not-yet' && !AuthenticationService.isLoggedIn()) {
      $location.path('/login');
      FlashService.show("Please log in to continue.");
    }
  });
});