describe('trimText Filter', function () {

    'use strict';
    var _filter;

    beforeEach(function () {
        // Load the app's main module
        module('exercise.angular');

        // Inject the necessary components
        inject(function ($filter) {
            _filter = function () {
                return $filter('trimText');
            };

        });
    }); 


    it('should be defined', function () {
        expect(_filter()).toBeDefined();
    });
    it('should not trim text that are <= 10 characters length', function () {
        //arrange
        var filter = _filter();
        var data  = "short Text";
        
        //act
        var result = filter(data);
        
        //assert
        expect(result).toBe(data);
    });
    it('should trim text that are > 10 characters length', function () {
        //arrange
        var filter = _filter();
        var data  = "A real long text";
        var expectedResult = "A real lon...";
        //act
        var result = filter(data);
        
        //assert
        expect(result).toBe(expectedResult);
    });

});