describe('Task Controller', function () {

    'use strict';
    var _controller,
        _taskStorage ,
        _scope;

    beforeEach(function () {
        // Load the app's main module
        module('exercise.angular');

        // Inject the necessary components
        inject(function ($controller, $rootScope) {
            _scope = $rootScope.$new();
            _taskStorage =  { 
                getAll : function(){},
            };
            _controller = function () {
                return $controller('taskController', {$scope: _scope, taskStorage : _taskStorage});
            };

        });
       
    });


    it('should be defined', function () {
        expect(_controller()).toBeDefined();

    });
    it('should populate the tasks from storage during initialization', function () {
        //arrange
        var defaultTaskList = [];
        spyOn(_taskStorage, "getAll").andReturn(defaultTaskList);
        
        //act
        _controller();
        
        //assert
        expect(_taskStorage.getAll).toHaveBeenCalled();
        expect(_scope.tasks).toBe(defaultTaskList);
    });
    it('it should set the sortOrder and default sort to be ascending', function(){
        //arrange
        
        var defaultSortOrder = "col1";
        
        //act
        
        _controller();
        _scope.sortOrder = "col1";
        _scope.reverse = false;
        _scope.sort(defaultSortOrder);
        
        //assert
        expect(_scope.sortOrder).toBe(defaultSortOrder);
        expect(_scope.reverse).toBe(true);
    });
    it('it should reverse the sort order for the same attribute', function(){
        //arrange
        var defaultSortOrder = "col1";
        
        //act
        _controller();
        _scope.sortOrder = defaultSortOrder;
        _scope.reverse = false;
        _scope.sort(defaultSortOrder);
        
        //assert
        expect(_scope.reverse).toBe(true);
    });
    it('it should reverse the sort order for the same attribute', function(){
        //arrange
        var existingSortOrder = "col1";
        var newSortOrder = "col2";
        
        //act
        _controller();
        _scope.sortOrder = existingSortOrder;
        _scope.reverse = true;
        _scope.sort(newSortOrder);
        
        //assert
        expect(_scope.sortOrder).toBe(newSortOrder);
        expect(_scope.reverse).toBe(false);
    });
});