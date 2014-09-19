describe('Tasks Page', function(){

    //var page;

    beforeEach(function(){
        browser.get('/#');
        browser.sleep(1000); // Just to show the browser
    });

    it('should display 0 completed count', function(){
        var completedCountElement = element(by.css('.completedCount'));
        expect(completedCountElement.getText()).toBe('0');
    });
    
    it('should disable the "Add Task" button by default', function(){
        var addButtonElement = element(by.buttonText('Add Task'));
        expect(addButtonElement.isEnabled()).toBe(false);
    });
    
    it('should enable the "Add Task" button when the new task textbox is not empty', function(){
        var newTaskTextBox = element(by.model('newTask'));
        newTaskTextBox.sendKeys('abc');
        var addButtonElement = element(by.buttonText('Add Task'));
        expect(addButtonElement.isEnabled()).toBe(true);
    });
});
