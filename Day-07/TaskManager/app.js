angular.module("taskApp").config(function($routeProvider){
        $routeProvider.when('/tasks',{
            templateUrl : 'tasks/templates/tasks.tmpl.html',
            controller : 'taskController'
        })
        .when('/tasks/:taskId',{
            templateUrl : 'tasks/templates/details.tmpl.html',
            controller : 'taskDetailsController'
        })
        .otherwise({redirectTo : '/tasks'});
    });