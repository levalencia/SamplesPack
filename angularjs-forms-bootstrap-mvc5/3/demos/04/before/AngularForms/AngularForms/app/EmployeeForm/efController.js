
angularFormsApp.controller('efController',
    function efController($scope, $window, DataService) {

        $scope.employee = DataService.employee;

        $scope.departments = [
            "Engineering",
            "Marketing",
            "Finance",
            "Administration"
        ];

        $scope.submitForm = function () {

        };

        $scope.cancelForm = function () {

        };

    });