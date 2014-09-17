angular.module("taskApp").factory('Task', function(){
        function Task(defaults){
            this.id = defaults.id || 0;
            this.name = defaults.name || "";
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
    