
    angular.module("taskApp").controller("taskController", function ($scope, taskStorage, Task){
        $scope.tasks = taskStorage.getAll();
        $scope.sortOrder = "",
        $scope.reverse = false;
        
        $scope.setTaskToEdit=function(task){
            $scope.taskToEdit = task;
        }
        $scope.sort = function(attrName){
            if ($scope.sortOrder === attrName) {
                $scope.reverse = !$scope.reverse;
                return;
            }
            $scope.sortOrder = attrName;
            $scope.reverse = false;
        }
        
        $scope.sortStatus = function(name){
            if (name === $scope.sortOrder)
                return $scope.reverse ? "desc" : "asc";
            return "";
        }
        
        $scope.addTask = function(taskName){
            var newTask = new Task({id: new Date().getTime().toString(),name: taskName,isCompleted: false });
            taskStorage.addOrUpdate(newTask);
            $scope.tasks.push(newTask);
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
        };
        $scope.updateTask = function(evt){
            
            if (evt.keyCode === 13){
            
                $scope.taskToEdit = undefined;
            }
        }
    });
        