describe('GreetController', function () {

    'use strict';
    var _controller,
        _scope;

    beforeEach(function () {
        // Load the app's main module
        module('greetApp');

        // Inject the necessary components
        inject(function ($controller, $rootScope) {
            _scope = $rootScope.$new();
            _controller = function () {
                return $controller('greetController', {$scope: _scope});
            };

        });
    });


    it('should be defined', function () {
        expect(_controller()).toBeDefined();
    });
    
    it('should generate the greetMsg during greet action', function () {
        //arrange
        _scope.firstName = "Magesh";
        _scope.lastName = "K";
        
        //act
        _controller();
        _scope.greet();
        
        //assert
        expect(_scope.greetMsg).toBe('Hi Magesh K');
    });

    it('should track the number of times a greet msg is generated', function () {
        //arrange
        _scope.firstName = "Magesh";
        _scope.lastName = "K";
        
        //act
        _controller();
        _scope.greet();
        _scope.greet();
        _scope.greet();
        
        //assert
        expect(_scope.getGreetCount()).toBe(3);
    });

});