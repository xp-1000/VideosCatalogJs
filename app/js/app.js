'use strict';

/* App Module */

var videocatApp = angular.module('videocatApp', [
  'ngRoute',
  'videocatAnimations',
  'videocatControllers',
  'videocatFilters',
  'videocatServices'
]);

console.log('hhh');

videocatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/videos', {
        templateUrl: 'partials/video-list.html',
        controller: 'VideoListCtrl'
      }).
      when('/videos/:videoId', {
        templateUrl: 'partials/video-detail.html',
        controller: 'VideoDetailCtrl'
      }).
      otherwise({
        redirectTo: '/videos'
      });
  }]);
