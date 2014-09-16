angular.module('taskApp')
    .controller('taskDetailsController',function($scope,$routeParams,taskStorage){
        $scope.task = taskStorage.get($routeParams.taskId);
    });