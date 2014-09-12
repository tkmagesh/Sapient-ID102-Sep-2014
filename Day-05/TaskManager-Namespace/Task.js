/*Model - Task*/
window.taskApp = window.taskApp || {};
(function(taskApp){
	function Task(id,taskName,isCompleted){
		this.id = id;
		this.name = taskName;
		this.isCompleted = isCompleted || false;
	
	}
    Task.prototype.toggleCompletion = function(){
        this.isCompleted = !this.isCompleted;
    }
   taskApp.Task = Task;
})(window.taskApp);