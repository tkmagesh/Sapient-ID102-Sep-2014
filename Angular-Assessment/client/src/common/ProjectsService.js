'use strict';
angular.module('assessment.angular.common')
    .factory('ProjectsService', function($resource){
        return $resource('http://localhost:3000/api/projects/:id',{id : '@id'});
    });