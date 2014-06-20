'use strict';

/* jasmine specs for controllers go here */
describe('VideoCat controllers', function() {

  beforeEach(function(){
    this.addMatchers({
      toEqualData: function(expected) {
        return angular.equals(this.actual, expected);
      }
    });
  });

  beforeEach(module('videocatApp'));
  beforeEach(module('videocatServices'));

  describe('VideoListCtrl', function(){
    var scope, ctrl, $httpBackend;

    beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('videos/videos.json').
          respond([{name: 'Nexus S'}, {name: 'Motorola DROID'}]);

      scope = $rootScope.$new();
      ctrl = $controller('VideoListCtrl', {$scope: scope});
    }));


    it('should create "videos" model with 2 videos fetched from xhr', function() {
      expect(scope.videos).toEqualData([]);
      $httpBackend.flush();

      expect(scope.videos).toEqualData(
          [{name: 'Nexus S'}, {name: 'Motorola DROID'}]);
    });


    it('should set the default value of orderProp model', function() {
      expect(scope.orderProp).toBe('age');
    });
  });


  describe('VideoDetailCtrl', function(){
    var scope, $httpBackend, ctrl,
        xyzVideoData = function() {
          return {
            name: 'video xyz',
                images: ['image/url1.png', 'image/url2.png']
          }
        };


    beforeEach(inject(function(_$httpBackend_, $rootScope, $routeParams, $controller) {
      $httpBackend = _$httpBackend_;
      $httpBackend.expectGET('videos/xyz.json').respond(xyzVideoData());

      $routeParams.videoId = 'xyz';
      scope = $rootScope.$new();
      ctrl = $controller('VideoDetailCtrl', {$scope: scope});
    }));


    it('should fetch video detail', function() {
      expect(scope.video).toEqualData({});
      $httpBackend.flush();

      expect(scope.video).toEqualData(xyzVideoData());
    });
  });
});
