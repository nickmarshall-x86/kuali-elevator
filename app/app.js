var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    //================================================
    // Routes
    //================================================
    $routeProvider.when('/', {
        templateUrl: 'app/views/homeView.html',
        controller: 'homeCtrl'
    });
    $routeProvider.when('/simulate', {
        templateUrl: "app/views/simulationView.html",
        controller: "simulationCtrl"
    });
}]);