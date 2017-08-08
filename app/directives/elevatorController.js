angular.module('app')
.directive('elevatorController', function(){
    return {
        scope: {
            numberOfFloors: '=',
            numberOfElevators: '='
        },
        templateUrl: "/app/directives/views/elevatorController.html",
        controller: function($scope){
            $scope.controllerState = CONTROLLERSTATE_WAITING_FOR_INPUT;
            $scope.elevatorResponses = [];
            
            $scope.requestFloor = function(requestedFloor){
                $scope.controllerState = CONTROLLERSTATE_AWAITING_RESPONSE;
                $scope.$broadcast('elevatorController:requestCurrentFloor',{});
            }
            
            $scope.getArray = function(numberOfElements){
                return new Array(numberOfElements);
            }
        }
    }
});