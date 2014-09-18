describe("Task Collection",function(){
    var taskCollection = undefined;
    var taskStorageMock = undefined;
    var taskFactoryMock = undefined;
    
    beforeEach(function(){
        taskFactoryMock = {
            create :function(){
            }
        }
        taskStorageMock = {
            getAll : function(){
            },
            add : function(){
            }
        };
        
    });
    it("should populate the tasks from storage during initialization", function(){
        //Arrage
        spyOn(taskStorageMock, "getAll")
        //Act
        
        taskCollection = new TaskCollection(taskStorageMock);
        //var initialCount = taskCollection.length();
        //Assert
        expect(taskStorageMock.getAll).toHaveBeenCalled();
    });
    it("when added a new task, should the persist the new task in storage", function(){
        //Arrage
        var newTask = {id : 100, name : "test Task", isCompleted : false};
        spyOn(taskFactoryMock,"create").and.returnValue(newTask);
        spyOn(taskStorageMock, "getAll").and.returnValue([]);
        spyOn(taskStorageMock, "add");
        taskCollection = new TaskCollection(taskStorageMock, taskFactoryMock);
        //Act
        
        taskCollection.add("test Task", false);
        //var initialCount = taskCollection.length();
        //Assert
        expect(taskFactoryMock.create).toHaveBeenCalledWith("test Task",false);
        expect(taskStorageMock.add).toHaveBeenCalledWith(newTask);
    });
    
});