angular.module('app')
.directive('elevator', function(){
    return {
        scope: {
            elevatorId: '='
        },
        templateUrl: "/app/directives/views/elevator.html",
        controller: function($scope){
            $scope.currentFloor = 1;
            $scope.numberOfTrips = 0;
            $scope.direction = 0;
            $scope.stops = [];
            
            $scope.$on('elevatorController:requestCurrentFloor', function(event, data){
                if($scope.numberOfTrips < 100){
                    $scope.numberOfTrips += 1;
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
            
            $scope.$on("elevatorController:tick", function(event, data){
                $scope.currentFloor += $scope.direction;
                $scope.$emit("elevator:message", {
                    "elevatorId": $scope.elevatorId, 
                    "message": "Moved to floor " + $scope.currentFloor
                });
                if($scope.stops.indexOf($scope.currentFloor) != -1){
                    $scope.$emit("elevator:message", {
                        "elevatorId": $scope.elevatorId, 
                        "message": "Opened Doors"
                    });
                    $scope.$emit("elevator:message", {
                        "elevatorId": $scope.elevatorId, 
                        "message": "Closed Doors"
                    });
                    $scope.stops.splice($scope.stops.indexOf($scope.currentFloor), 1);
                    
                    if(len($scope.stops == 0) {$scope.direction = 0; });
                }
            });

            $scope.$on('elevatorController:addStop', function(event, data){
                if(data.elevatorId === $scope.elevatorId){
                    $scope.currentFloor = data.requestedFloor;
                    $scope.$emit('elevator:moveConfirmed', {
                        "elevatorId": $scope.elevatorId,
                        "floor": data.requestedFloor
                    });
                }
            });
        }
    }
});