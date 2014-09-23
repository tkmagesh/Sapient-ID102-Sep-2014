'use strict';
angular.module('assessment.angular.bugs')
    .controller('BugsListController', function ($scope,BugsService,ProjectsService,$routeParams) {
        $scope.project = ProjectsService.get({id : $routeParams.id});
        $scope.bugs = BugsService.query({projectId : $routeParams.id});
        $scope.closeBug = function(bug){
            bug.closeDate = new Date();
            BugsService.update({id : bug.id},bug);
        };
    });