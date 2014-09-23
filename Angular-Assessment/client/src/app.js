(function () {

    'use strict';

    angular.module('assessment.angular.projects',[]);
    angular.module('assessment.angular.common',[]);
    angular.module('assessment.angular.bugs',[]);
    
    angular.module('assessment.angular', [

        'ngRoute',
        'ngResource',
        'ngSanitize',

        'assessment.angular.templates',
        'assessment.angular.projects',
        'assessment.angular.common',
        'assessment.angular.bugs',
    ])
        .run(function ($log) {
            $log.log('Assessment has been loaded.');
        });
})();
