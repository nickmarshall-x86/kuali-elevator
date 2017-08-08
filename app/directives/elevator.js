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
                    $scope.$emit('elevator:currentFloorResponse', {
                        "id": $scope.elevatorId, 
                        "floor": $scope.currentFloor, 
                        "state":ELEVATORSTATE_GOOD,
                        "direction": $scope.direction
                    });
                }else{
                    $scope.$emit('elevator:currentFloorResponse', {
                        "id": $scope.elevatorId,  
                        "state":ELEVATORSTATE_OUTOFSERVICE
                    });
                }
            });
            
            $scope.getQueueItemsForFloor = function(floor){
                return $scope.stops.filter(function(stop){
                   return stop[0] === floor; 
                });
            }
            
            $scope.$on("elevatorController:tick", function(event, data){
                $scope.currentFloor += $scope.direction;
                if($scope.direction !== 0){ 
                    $scope.numberOfFloors += 1; 
                
                    $scope.$emit("elevator:message", {
                        "elevatorId": $scope.elevatorId, 
                        "message": "Moved to floor " + $scope.currentFloor
                    });
                }
                
                var floorQueue = $scope.getQueueItemsForFloor($scope.currentFloor)
                if(floorQueue.length !== 0){
                    $scope.numberOfTrips += 1;
                    
                    $scope.$emit("elevator:message", {
                        "elevatorId": $scope.elevatorId, 
                        "message": "Opened Doors"
                    });
                    $scope.$emit("elevator:message", {
                        "elevatorId": $scope.elevatorId, 
                        "message": "Closed Doors"
                    });
                    
                    // TODO Remove first element of array at current stop if exists otherwise remove whole array
                    var commandsToRemove = [];
                    $scope.stops.forEach(function(stop){
                        if(stop[0] === $scope.currentFloor){
                            if(stop.length === 1){
                                commandsToRemove.push(stop);
                            }else{
                                stop.shift();
                            }
                        }
                    });
                    commandsToRemove.forEach(function(command){
                        $scope.stops.splice($scope.stops.indexOf(command), 1);
                    });                    
                }

                if($scope.stops.length == 0) {
                   $scope.direction = 0; 
                }else{
                    var swapDirection = true;
                    // Hackish,  but this gets a elevator moving from a stop
                    if($scope.direction === 0){ $scope.direction = 1; }
                    
                    // We only want to swap directions if NO floors are in that direction
                    $scope.stops.forEach(function(stop){
                       if($scope.direction === 1 && stop[0] > $scope.currentFloor){ swapDirection = false; }
                       if($scope.direction === -1 && stop[0] < $scope.currentFloor){ swapDirection = false; }
                    });
                    if(swapDirection){ $scope.direction = $scope.direction * -1; }
                }  
            });

            $scope.$on('elevatorController:addStop', function(event, data){
                if(data.elevatorId === $scope.elevatorId){
                    // Array is [Source Floor, Destination Floor]
                    $scope.$emit('elevator:message', {
                        "elevatorId": $scope.elevatorId,
                        "message": "Recieved request for pickup at " + data.currentFloor + " and dropoff at " + data.requestedFloor
                    });
                    $scope.stops.push([data.currentFloor, data.requestedFloor]);
                }
            });
        }
    }
});