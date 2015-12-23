var expect = require('chai').expect,
    mop = require('../index')
    Browser = require('zombie');

Feature('Structure', function() {

  Scenario('Creating groups', function() {

    Given('a new group with "Keyboard" title', function() {
      mop.group('keyboard', 'Keyboard');
    });

    Then('it becomes a object with "Keyboard" title', function() {
      expect(mop.group('keyboard').title).to.equal('Keyboard');
    });

    When('is created a subgroup with "Numbers" title', function() {
      mop.group('keyboard').group('numbers', 'Numbers');
    });

    Then('it becomes a object with a subgroup "Numbers" title', function() {
      expect(mop.group('keyboard').group('numbers').title).to.equal('Numbers');
    });

  });

  Scenario('Creating puppets', function() {

    Given('a new puppet with "Light" name', function() {
      mop.puppet('light', 'Light');
    });

    Then('it becomes a puppet with "Light" name', function() {
      expect(mop.puppet('light').name).to.equal('Light');
    });

  });

});

Feature('WebServer', function() {

  Scenario('Creating groups', function() {

    Given('a request to start web server', function() {
      mop.startWebServer();
    });

    When('the user goes to site', function() {
      this.browser = new Browser({site: 'http://localhost:' + mop.settings().web.port});
    });

    Then('it gonna be accessible', function(done) {
      this.browser.visit('/', done);
    });

  });

});