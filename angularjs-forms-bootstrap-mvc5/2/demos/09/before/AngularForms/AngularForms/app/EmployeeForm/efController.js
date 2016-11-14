
angularFormsApp.controller('efController',
    function efController($scope, efService) {
        $scope.employee = efService.employee;
    });