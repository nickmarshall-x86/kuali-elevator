angular.module('app')
.directive('elevatorController', function(){
    return {
        scope: {
            numberOfFloors: '=',
            numberOfElevators: '='
        },
        templateUrl: "/app/directives/views/elevatorController.html",
        controller: function($scope, $timeout){
            $scope.elevatorResponses = [];
            $scope.elevatorMessages = [];
            $scope.tickTime = 0;
            
            $scope.requestFloor = function(){
                if($scope.requestedFloor <= $scope.numberOfFloors && $scope.requestedFloor >= 1){
                    $scope.$broadcast('elevatorController:requestCurrentFloor',{});
                }else{
                    alert("Floors outside of range [1," + $scope.numberOfFloors + "]")
                }
            }
            
            $scope.onTick = function(){
                $scope.tickTime += 1;
                $scope.$broadcast("elevatorController:tick")
                $timeout($scope.onTick, TIMEOUT_MS);
            }
            $timeout($scope.onTick, TIMEOUT_MS);
            
            $scope.$on('elevator:currentFloorResponse', function(event, data){
                $scope.elevatorResponses.push(data);
                if($scope.elevatorResponses.length === $scope.numberOfElevators){
                    var closestElevator = $scope.findClosestElevator();
                    if(closestElevator){
                        $scope.$broadcast('elevatorController:addStop',{
                            "elevatorId": closestElevator.id,
                            "currentFloor": $scope.currentFloor,
                            "requestedFloor": $scope.requestedFloor
                        });
                    }else{
                        alert("All Elevators are out of service")
                    }
                }
            });
            
            $scope.$on('elevator:message', function(event, data){
                $scope.elevatorResponses = [];
                $scope.elevatorMessages.unshift("[" + $scope.tickTime + "] Elevator: " + data.elevatorId + " " + data.message);
            });
            
            $scope.findClosestElevator = function(){
                var closestFloor = null;
                var currentDistance = 0;
                $scope.elevatorResponses.forEach(function(response){
                    if(closestFloor){
                        if(response.state = ELEVATORSTATE_GOOD){
                            var difference = Math.abs(response.floor - $scope.currentFloor);
                            if(difference == 0){ 
                                closestFloor = response;
                                currentDistance = difference;
                            } else if (
                                difference < currentDistance &&
                                ((response.direction === 1 && $scope.currentFloor < response.floor) ||          (response.direction === -1 && $scope.currentFloor > response.floor))){
                                    closestFloor = response;
                                    currentDistance = difference;
                            }else if (difference < currentDistance && response.direction === 0 && currentFloor.direction != 0){
                                closestFloor = response;
                                currentDistance = difference;
                            }
                        }
                    }else{
                        if(
                            response.state = ELEVATORSTATE_GOOD &&
                            (response.direction === 0 ||
                            (response.direction === 1 && $scope.currentFloor > response.floor) ||          
                            (response.direction === -1 && $scope.currentFloor < response.floor))
                        ){
                            closestFloor = response;
                            currentDistance = Math.abs(closestFloor.floor - $scope.currentFloor);
                        }
                    }
                });
                
                return closestFloor;
            }
            
            $scope.getArray = function(numberOfElements){
                return new Array(numberOfElements);
            }
        }
    }
});