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
    when('/index', {
      templateUrl: 'partials/partial2',
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
});
