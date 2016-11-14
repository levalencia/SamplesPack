(function () {
  'use strict';

  var app = angular.module('app');

  var events = {
    controllerActivateSuccess: 'controller.activateSuccess'
  };

  var config = {
    // config the exceptionHandler decorator
    appErrorPrefix: '[SYSERR] ',
    // app events
    events: events,
    // app version
    version: '1.0.0.0',
    // debug notification settings
    showDebugNotiSetting: true
  };

  // create a global variable on app called 'config'
  app.value('config', config);

  // configure the angular logging service before startup
  app.config(['$logProvider', function ($logProvider) {
    // turn debugging off/on (no info or warn)
    if ($logProvider.debugEnabled) {
      $logProvider.debugEnabled(true);
    }
  }]);

  // configure the common configuration
  app.config(['commonConfigProvider', function (cfg) {
    cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
  }]);
})();