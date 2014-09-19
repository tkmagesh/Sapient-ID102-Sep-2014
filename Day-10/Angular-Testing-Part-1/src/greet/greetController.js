angular.module('greetApp',[]).controller('greetController', function greetController($scope){
    'use strict';
    var greetCount = 0;
    
    $scope.greet = function(){
        $scope.greetMsg = 'Hi ' + $scope.firstName + ' ' + $scope.lastName;
        ++greetCount;
    };
    $scope.getGreetCount = function(){
        return greetCount;
    }
});