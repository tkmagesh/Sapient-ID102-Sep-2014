var HomePage = function(){

    this.launch = function(){
        browser.get('/#');
        browser.sleep(1000); // Just to show the browser
    };

    this.goToDashboard = function(){
        element(by.css('button')).click();
    };

    this.expectToBeOnDashboard = function(){
        var elt = element(by.css('.dashboard h2'));
        expect(elt).toBeDefined();
    };
};

describe('Home', function(){

    var page;

    beforeEach(function(){
        page = new HomePage();
        page.launch();
    });

    it('should go to Dashboard page', function(){
        page.goToDashboard();
        page.expectToBeOnDashboard();
    });
});