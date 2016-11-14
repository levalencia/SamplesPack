(function() {
  'use strict';

  // define controller
  var controllerId = "learningPaths";
  angular.module('app').controller(controllerId,
    ['common', learningPaths]);

  // create controller
  function learningPaths(common) {
    var vm = this;
    var logger = common.logger;

    // init controller
    init();

    // init controller
    function init() {
      logger.log("controller loaded", null, controllerId);
      common.activateController([], controllerId);
    }

  };
})();