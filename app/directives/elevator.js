angular.module('app')
.directive('elevator', function(){
    return {
        scope: {
            numberOfFloors: '=',
            elevatorId: '='
        }
        templateUrl: "/app/directives/views/elevatorController.html",
        controller: function($scope){
            $scope.currentFloor = 1;
            $scope.numberOfTrips = 0;
        
            $scope.$on('elevatorController:requestCurrentFloor', function(event, data){
                if($scope.numberOfTrips < 100){
                    $scope.$emit('elevator:currentFloorResponse', {
                        "id": $scope.elevatorId, 
                        "floor": $scope.currentFloor, 
                        "state":ELEVATORSTATE_GOOD
                    });
                }else{
                    $scope.$emit('elevator:currentFloorResponse', {
                        "id": $scope.elevatorId,  
                        "state":ELEVATORSTATE_OUTOFSERVICE
                    });
                }
            });

            $scope.$on('elevatorController:moveToFloor', function(event, data){
                if(data.elevatorId === $scope.elevatorId){$scope.currentFloor = data.requestedFloor}
            });
        }
    }
});