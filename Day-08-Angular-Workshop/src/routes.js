angular.module('exercise.angular')
    .config(function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/', {
                templateUrl: 'home/home.html',
                controller: 'HomeController'
            })
            .when('/dashboard', {
                templateUrl: 'dashboard/dashboard.html',
                controller: 'DashboardController'
            })
            .otherwise({ redirectTo: '/' });
    });