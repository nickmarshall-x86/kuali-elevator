angular.module('app')
.controller("homeCtrl", ["$scope", "$rootScope", function homeCtrl($scope, $rootScope) {
    $scope.initializeSimulation = function(){
        $rootScope.numberOfElevators = $scope.numberOfElevators;
        $rootScope.numberOfFloors = $scope.numberOfFloors;
    }
}]);