var app = angular.module('app', ['ngRoute']);

app.config(['$routeProvider', function ($routeProvider) {
    //================================================
    // Routes
    //================================================
    $routeProvider.when('/', {
        templateUrl: 'app/views/homeView.html',
        controller: 'homeCtrl'
    });
}]);