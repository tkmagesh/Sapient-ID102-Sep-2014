//angular.module('exercise.angular', []);
    angular.module('exercise.angular').directive('notificationMessage',function(){
       return function(scope,elem,attrs){
                console.dir(attrs);
                scope.$watch("message",function(){
                    console.log("message changed - ", scope.message);
                    elem.fadeIn();
                });
                elem.on("click",function(){
                    $(this).fadeOut();
                    scope.clearMessage();
                });
            };
        
    });
    angular.module('exercise.angular').filter('trimText', function(){
        return function(data,trimLength){
            data = data || '';
            trimLength = trimLength || 10;
            return data.length <= trimLength ? data : data.substr(0,trimLength)+"...";
        }
    });
    angular.module('exercise.angular').factory('Task', function(){
        function Task(defaults){
            this.id = defaults.id || 0;
            this.name = defaults.name || '';
            this.isCompleted = defaults.isCompleted || false;
            this.createdAt = defaults.createdAt || new Date();
            this.completedAt = defaults.completedAt;
        }
        Task.prototype.toggleCompletion = function(){
            this.isCompleted = !this.isCompleted;
            this.completedAt = (this.isCompleted ? new Date() : undefined);
        }
        return Task;
    });
        
    
    angular.module('exercise.angular').service('taskStorage', function(Task){
        
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
        }
        
    });
        
    
    angular.module('exercise.angular')
    .controller('taskController', ["$rootScope", "$scope", "taskStorage", "Task",function ($rootScope, $scope, taskStorage, Task){
        $rootScope.data = { dummy : "some value"};
        $scope.tasks = taskStorage.getAll();
        $scope.sortOrder = '',
        $scope.reverse = false;
        $scope.message = "";
        $scope.clearMessage = function(){
            $scope.message = "";
        };
        $scope.sort = function(attrName){
            if ($scope.sortOrder === attrName) {
                $scope.reverse = !$scope.reverse;
                return;
            }
            $scope.sortOrder = attrName;
            $scope.reverse = false;
        }
        
        $scope.addTask = function(taskName){
            var newTask = new Task({id: new Date().getTime().toString(),name: taskName,isCompleted: false });
            taskStorage.addOrUpdate(newTask);
            $scope.tasks.push(newTask);
            $scope.message = "A new task is added";
        }
        $scope.toggleCompletion = function(task){
            task.toggleCompletion();
            taskStorage.addOrUpdate(task);
        }
        $scope.removeCompleted = function(){
            for(var i=$scope.tasks.length-1;i>=0;i--){
                if ($scope.tasks[i].isCompleted){
                    taskStorage.remove($scope.tasks[i])
                    $scope.tasks.splice(i,1);
                }
            }
            $scope.message = "Zero or more completed tasks are removed";
        }
        $scope.getTotalCount = function(){
            return $scope.tasks.length;
        };
        $scope.getCompletedCount = function(){
            var completedCount = 0;
            angular.forEach($scope.tasks, function(value){
                if (value.isCompleted)
                    ++completedCount;
            });
            return completedCount;
        }
    }]);
        
    