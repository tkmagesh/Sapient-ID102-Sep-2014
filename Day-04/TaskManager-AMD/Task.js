/*Model - Task*/
define([],function(){
	function Task(id,taskName,isCompleted){
		this.id = id;
		this.name = taskName;
		this.isCompleted = isCompleted || false;
	
	}
    Task.prototype.toggleCompletion = function(){
        this.isCompleted = !this.isCompleted;
    }
    return Task;
})