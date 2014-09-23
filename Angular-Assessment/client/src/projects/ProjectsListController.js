'use strict';
angular.module('assessment.angular.projects')
    .controller('ProjectsListController', ['$scope','ProjectsService',function ($scope,ProjectsService) {
        
        $scope.projects = ProjectsService.query();
    }]);