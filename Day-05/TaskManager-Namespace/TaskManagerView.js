window.taskApp = window.taskApp || {};
(function(taskApp){
    function TaskManagerView(){
		window.taskCollection = new taskApp.TaskCollection();
        
        taskCollection.onTaskListUpdate = renderTaskList;
        
		var template = Handlebars.compile($("#taskListTemplate").html());
        this.init = function(){
            $("#btnAddTask").click(function(){
                var taskName = $("#txtTask").val();
                taskCollection.add(taskName);
               // renderTaskList();
            });

            $("#ulTaskList").on("click","li",function(){
                var id = $(this).attr("taskId");
                var task = taskCollection.get(id);
                task.toggleCompletion();
                renderTaskList();
            });

            $("#btnRemoveCompleted").click(function(){
                taskCollection.removeCompleted();
                
            });
            
            renderTaskList();
        }
		function renderTaskList(){
			var data = {list : taskCollection.getAll()};
			var html = template(data);
			$("#ulTaskList").html(html);
		}
	}
    taskApp.TaskManagerView = TaskManagerView;
})(window.taskApp);