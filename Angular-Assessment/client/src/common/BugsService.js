'use strict';
angular.module('assessment.angular.common')
    .factory('BugsService', function($resource){
        var Bugs = $resource('http://localhost:3000/api/projects/:projectId/bugs/:id',{projectId : '@projectId', id : '@id'},{
            'update' : {method : 'put'}
        });
        return Bugs;
    });