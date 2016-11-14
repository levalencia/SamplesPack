(function () {
  'use strict';

  // define controller
  var controllerId = "learningItems";
  angular.module('app').controller(controllerId,
    ['common', learningItems]);

  // create controller
  function learningItems(common) {
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