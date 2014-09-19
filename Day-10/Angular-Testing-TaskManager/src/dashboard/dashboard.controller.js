angular.module('exercise.angular.dashboard')
    .controller('DashboardController', function ($scope, $location) {

        'use strict';

        $scope.goHome = function(){
            $location.path('/');
        };
    })
;