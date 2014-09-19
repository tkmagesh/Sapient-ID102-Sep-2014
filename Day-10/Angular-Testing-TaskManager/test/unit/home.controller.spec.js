describe('HomeController', function () {

    'use strict';
    var _controller,
        _scope;

    beforeEach(function () {
        // Load the app's main module
        module('exercise.angular');

        // Inject the necessary components
        inject(function ($controller, $rootScope) {
            _scope = $rootScope.$new();
            _controller = function () {
                return $controller('HomeController', {$scope: _scope});
            };

        });
    });


    it('should be defined', function () {
        expect(_controller()).toBeDefined();

    });

});