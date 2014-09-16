angular.module("taskApp").service("taskStorage", function(Task){
        
        var storage = window.localStorage;
        
        this.getAll = function(){
            var result = [];
            for(var i=0;i<storage.length;i++){
                var key = storage.key(i);
                var dataAsString = storage.getItem(key);
                var data = window.JSON.parse(dataAsString);
                var task = new Task(data);
                result.push(task);
            }
            return result;
        };
        this.addOrUpdate = function(task){
             storage.setItem(task.id, window.JSON.stringify(task));
        };
        this.remove = function(task){
            storage.removeItem(task.id);
        };
        this.get = function(id){
            return new Task(window.JSON.parse(window.localStorage.getItem(id)));
        }
        
    });
    