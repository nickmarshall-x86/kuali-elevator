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
            $scope.numberOfFloors = 0;
            $scope.direction = 0;
            $scope.stops = [];
            $scope.elevatorState = ELEVATORSTATE_GOOD;
            
            $scope.$on('elevatorController:requestCurrentFloor', function(event, data){
                if($scope.numberOfTrips < 100){
                    $scope.numberOfTrips += 1;
                    $scope.$emit('elevator:currentFloorResponse', {
                        "id": $scope.elevatorId, 
                        "floor": $scope.currentFloor, 
                        "state":ELEVATORSTATE_GOOD,
                        "direction": $scope.direction;
                    });
                }else{
                    $scope.$emit('elevator:currentFloorResponse', {
                        "id": $scope.elevatorId,  
                        "state":ELEVATORSTATE_OUTOFSERVICE
                    });
                }
            });
            
            $scope.getQueueItemsForFloorFloorInQueue(floor){
                // TODO Check first element in each array
            }
            
            $scope.$on("elevatorController:tick", function(event, data){
                $scope.currentFloor += $scope.direction;
                if($scope.direction !== 0){ $scope.numberOfFloors += 1; }
                
                $scope.$emit("elevator:message", {
                    "elevatorId": $scope.elevatorId, 
                    "message": "Moved to floor " + $scope.currentFloor
                });
                
                var floorQueue = $scope.getQueueItemForFloor($scope.currentFloor)
                if($scope.stops.indexOf($scope.currentFloor) != -1){
                    $scope.$emit("elevator:message", {
                        "elevatorId": $scope.elevatorId, 
                        "message": "Opened Doors"
                    });
                    $scope.$emit("elevator:message", {
                        "elevatorId": $scope.elevatorId, 
                        "message": "Closed Doors"
                    });
                    
                    // TODO Remove first element of array at current stop if exists otherwise remove whole array
                    $scope.stops.splice($scope.stops.indexOf($scope.currentFloor), 1);
                    
                    
                    if(len($scope.stops == 0)) {
                       $scope.direction = 0; 
                    }else{
                        // TODO: check for floors in direction, if none exist swap directions
                    }
                    
                }
            });

            $scope.$on('elevatorController:addStop', function(event, data){
                if(data.elevatorId === $scope.elevatorId){
                    // Array is [Source Floor, Destination Floor]
                    $scope.stops.push([data.currentFloor, data.requestedFloor]);
                    if(data.requestedFloor >) // initialize movement
                }
            });
        }
    }
});