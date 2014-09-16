angular.module("taskApp").service("taskServer", function($http, Task){
        
        this.getAll = function(onCompletion){
            var promise = $http({method :"get", url :'data/tasks.json'});
            //promise.then(onCompletion);
            return promise;
        };
    
    this.addOrUpdate = function(){
        };
    
    this.remove = function(){
        };
    
        this.get = function(){
        };
    });
    
