angular.module('exercise.angular.home')
    .controller('HomeController', function ($scope, $location) {

        'use strict';

        $scope.gotoDashboard = function(){
            $location.path('/dashboard');
        };
    });