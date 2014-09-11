define(['Task'], function(Task){
        var storage = window.localStorage;
        function getAll(){
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
        function add(task){
             storage.setItem(task.id, window.JSON.stringify(task));
        };
        function remove(task){
            storage.removeItem(task.id);
        }
        return {
            add : add,
            remove : remove,
            getAll : getAll
        };
    });
    