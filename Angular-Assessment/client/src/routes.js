angular.module('assessment.angular')
    .config(function ($routeProvider) {
        'use strict';

        $routeProvider
            .when('/projects', {
                templateUrl: 'projects/projectsList.html',
                controller: 'ProjectsListController'
            })
            .when('/projects/:id/bugs',{
                templateUrl : 'bugs/bugsList.html',
                controller : 'BugsListController'
            })
            .when('/bugs/new',{
                templateUrl : '/bugs/new.html',
                controller : 'NewBugController'
            })
            .otherwise({ redirectTo: '/projects' });
    });