(function () {
  'use strict';

  var commonModule = angular.module('common', []);

  commonModule.provider('commonConfig', function () {
    this.config = {
      // see papa's course
    };

    this.$get = function () {
      return {
        config: this.config
      };
    };
  });

  commonModule.factory('common',
    ['$q', '$rootScope', '$timeout', 'commonConfig', 'logger', common]);

  function common($q, $rootScope, $timeout, commonConfig, logger) {
    var service = {
      // passthough common angular dependencies
      $broadcast: $broadcast,
      $q: $q,
      $timeout: $timeout,
      // my services
      logger: logger,
      activateController: activateController
    };

    return service;

    function $broadcast() {
      return $rootScope.$broadcast.apply($rootScope, arguments);
    }

    function activateController(promises, controllerId) {
      return $q.all(promises).then(function(eventArgs) {
        var data = { controllerId: controllerId };
        $broadcast(commonConfig.config.controllerActivateSuccessfulEvent, data);
      });
    }
  }
})();