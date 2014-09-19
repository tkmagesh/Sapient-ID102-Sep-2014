(function () {

    'use strict';

    angular.module('exercise.angular.home',[]);
    angular.module('exercise.angular.dashboard', []);

    angular.module('exercise.angular', [

        'ngRoute',
        'ngResource',
        'ngSanitize',

        'exercise.angular.templates',
        'exercise.angular.home',
        'exercise.angular.dashboard'
    ])
        .run(function ($log) {
            $log.log('Exercise has been loaded.');
        });
})();
