'use strict';

/* Controllers */

var videocatControllers = angular.module('videocatControllers', []);

videocatControllers.controller('VideoListCtrl', ['$scope', 'Video',
  function($scope, Video) {
    console.log(Video);
    $scope.videos = Video.query();
    $scope.orderProp = 'name';
  }]);

videocatControllers.controller('VideoDetailCtrl', ['$scope', '$routeParams', 'Video',
  function($scope, $routeParams, Video) {
    $scope.video = Video.get({videoId: $routeParams.videoId}, function(video) {
      $scope.mainImageUrl = video.images[0];
    });

    $scope.setImage = function(imageUrl) {
      $scope.mainImageUrl = imageUrl;
    }
  }]);
