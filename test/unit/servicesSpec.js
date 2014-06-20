'use strict';

describe('service', function() {

  // load modules
  beforeEach(module('videocatApp'));

  // Test service availability
  it('check the existence of Video factory', inject(function(Video) {
      expect(Video).toBeDefined();
    }));
});