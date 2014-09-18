angular.module("taskApp").service("taskServer", function($resource, $http, $q, Task){
        var resource = $resource("data/tasks.json");
        
        this.getAll = function(onCompletion){
            
            var defered = $q.defer();
            resource.query(function(tasks){
                setTimeout(function(){
                    var result = [];
                    for(var i=0;i<tasks.length;i++)
                        result.push(new Task(tasks[i]));
                    defered.resolve(result);
                },1000);
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
    
