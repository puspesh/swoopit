'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('AppCtrl', function ($scope, $http) {
    $http({
      method: 'GET',
      url: '/api/name'
    }).
    success(function (data, status, headers, config) {
      $scope.name = data.name;
    }).
    error(function (data, status, headers, config) {
      $scope.name = 'Error!'
    });

  }).
  controller('NotAllowedCtrl', function ($scope) {
    $scope.notAllowed = false;	
  }).
  controller('AdminCtrl', function ($scope) {
    // write Ctrl here
    console.log('on Admin page');
  }).
  controller('IndexCtrl', function ($scope) {
    // write Ctrl here

  });
