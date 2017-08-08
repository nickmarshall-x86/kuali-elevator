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
            
            $scope.requestFloor = function(){
                if($scope.requestedFloor <= $scope.numberOfFloors){
                    $scope.controllerState = CONTROLLERSTATE_AWAITING_RESPONSE;
                    $scope.$broadcast('elevatorController:requestCurrentFloor',{});
                }
            }
            
            $scope.$on('elevator:currentFloorResponse', function(event, data){
                $scope.elevatorResponses.push(data);
                if($scope.elevatorResponses.length === $scope.numberOfElevators){
                    var closestElevator = $scope.findClosestElevator();
                    if(closestElevator){
                        $scope.controllerState = CONTROLLERSTATE_WAITING_FOR_MOVE;
                        $scope.$broadcast('elevatorController:moveToFloor',{
                            "elevatorId": closestElevator.id,
                            "requestedFloor": $scope.requestedFloor
                        });
                    }else{
                        // Alert all elevators out of service
                    }
                }
            });
            
            $scope.$on('elevator:moveConfirmed', function(event, data){
                $scope.controllerState = CONTROLLERSTATE_WAITING_FOR_INPUT;
                $scope.elevatorResponses = [];
            });
            
            $scope.findClosestElevator = function(){
                var closestFloor = null;
                var currentDistance = 0;
                $scope.elevatorResponses.forEach(function(response){
                    if(closestFloor){
                        if(response.state = ELEVATORSTATE_GOOD){
                            var difference = Math.abs(response.floor - $scope.requestedFloor);
                            if(difference < currentDistance){
                                closestFloor = response;
                            }
                        }
                    }else{
                        if(response.state = ELEVATORSTATE_GOOD){
                            closestFloor = response;
                            currentDistance = Math.abs(closestFloor.floor - $scope.requestedFloor);
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