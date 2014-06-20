'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('VideoCat App', function() {

  it('should redirect index.html to index.html#/videos', function() {
    browser.get('app/index.html');
    browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/videos');
      });
  });


  describe('Video list view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/videos');
    });


    it('should filter the video list as user types into the search box', function() {

      var videoList = element.all(by.repeater('video in videos'));
      var query = element(by.model('query'));

      expect(videoList.count()).toBe(20);

      query.sendKeys('nexus');
      expect(videoList.count()).toBe(1);

      query.clear();
      query.sendKeys('motorola');
      expect(videoList.count()).toBe(8);
    });


    it('should be possible to control video order via the drop down select box', function() {

      var videoNameColumn = element.all(by.repeater('video in videos').column('{{video.name}}'));
      var query = element(by.model('query'));

      function getNames() {
        return videoNameColumn.map(function(elm) {
          return elm.getText();
        });
      }

      query.sendKeys('tablet'); //let's narrow the dataset to make the test assertions shorter

      expect(getNames()).toEqual([
        "Motorola XOOM\u2122 with Wi-Fi",
        "MOTOROLA XOOM\u2122"
      ]);

      element(by.model('orderProp')).element(by.css('option[value="name"]')).click();

      expect(getNames()).toEqual([
        "MOTOROLA XOOM\u2122",
        "Motorola XOOM\u2122 with Wi-Fi"
      ]);
    });


    it('should render video specific links', function() {
      var query = element(by.model('query'));
      query.sendKeys('nexus');
      element.all(by.css('.videos li a')).first().click();
      browser.getLocationAbsUrl().then(function(url) {
        expect(url.split('#')[1]).toBe('/videos/nexus-s');
      });
    });
  });


  describe('Video detail view', function() {

    beforeEach(function() {
      browser.get('app/index.html#/videos/nexus-s');
    });


    it('should display nexus-s page', function() {
      expect(element(by.binding('video.name')).getText()).toBe('Nexus S');
    });


    it('should display the first video image as the main video image', function() {
      expect(element(by.css('img.video.active')).getAttribute('src')).toMatch(/img\/videos\/nexus-s.0.jpg/);
    });


    it('should swap main image if a thumbnail image is clicked on', function() {
      element(by.css('.video-thumbs li:nth-child(3) img')).click();
      expect(element(by.css('img.video.active')).getAttribute('src')).toMatch(/img\/videos\/nexus-s.2.jpg/);

      element(by.css('.video-thumbs li:nth-child(1) img')).click();
      expect(element(by.css('img.video.active')).getAttribute('src')).toMatch(/img\/videos\/nexus-s.0.jpg/);
    });
  });
});
