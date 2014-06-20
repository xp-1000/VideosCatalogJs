'use strict';

/* Services */

var videocatServices = angular.module('videocatServices', ['ngResource']);

videocatServices.factory('Video', ['$resource',
  function($resource){
  	console.log($resource);
    return $resource('videos/:videoId.json', {}, {
      query: {method:'GET', params:{videoId:'videos'}, isArray:true}
    });
  }]);
