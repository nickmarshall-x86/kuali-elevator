angular.module('app')
.directive('elevatorController', function(){
    return {
        scope: {
            numberOfFloors: '=',
            numberOfElevators: '='
        }
        templateUrl: "/app/directives/views/elevatorController.html",
        controller: function($scope){
            
        }
    }
});