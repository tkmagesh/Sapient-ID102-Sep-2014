angular.module("taskApp").service("taskServer", function($http, $q, Task){
        
        this.getAll = function(onCompletion){
            var defered = $q.defer();
            
            var httpPromise = $http({method :"get", url :'data/tasks.json'});
            httpPromise.then(function(response){
                setTimeout(function(){
                    var result = [];
                    for(var i=0;i<response.data.length;i++)
                        result.push(new Task(response.data[i]));
                    defered.resolve(result);
                },10000);
            });
            
            return defered.promise;
        };
    
    this.addOrUpdate = function(){
        };
    
    this.remove = function(){
        };
    
        this.get = function(){
        };
    });
    
