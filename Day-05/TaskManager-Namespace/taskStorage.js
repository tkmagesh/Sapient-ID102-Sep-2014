/*Module pattern*/
    /*var taskStorage = (function(){
        var ts = {};
        var storage = window.localStorage;
        
        ts.getAll = function(){
            var result = [];
            for(var i=0;i<storage.length;i++){
                var key = storage.key(i);
                var dataAsString = storage.getItem(key);
                var data = window.JSON.parse(dataAsString);
                var task = new Task(data.id, data.name, data.isCompleted);
                result.push(task);
            }
            return result;
        };
        ts.add = function (task){
             storage.setItem(task.id, window.JSON.stringify(task));
        };
        ts.remove = function (task){
            storage.removeItem(task.id);
        }
        return ts;
    })();*/
    
    //Revealing Module Pattern
window.taskApp = window.taskApp || {};

(function(taskApp){
        
        var storage = window.localStorage;
        
        function getAll(){
            var result = [];
            for(var i=0;i<storage.length;i++){
                var key = storage.key(i);
                var dataAsString = storage.getItem(key);
                var data = window.JSON.parse(dataAsString);
                var task = new taskApp.Task(data.id, data.name, data.isCompleted);
                result.push(task);
            }
            return result;
        };
        function add(task){
             storage.setItem(task.id, window.JSON.stringify(task));
        };
        function remove(task){
            storage.removeItem(task.id);
        }
        taskApp.taskStorage = {
            add : add,
            remove : remove,
            getAll : getAll
        }
    })(window.taskApp);
    