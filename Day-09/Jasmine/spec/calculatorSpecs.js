describe("A calculator",function(){
    var calculator;
    beforeEach(function(){
        calculator = new Calculator();
    });
    
    it("Should be able to add two numbers",function(){
        //Arrange
        var number1 = 10,
            number2 = 20,
            expectedResult = 30;
        
        //Act
        calculator.add(number1,number2);
        
        //Assert
        expect(calculator.result).toBe(expectedResult);
    });
     it("Should be able to subtract two numbers",function(){
        //Arrange
        var number1 = 10,
            number2 = 20,
            expectedResult = -10;
        
        //Act
        calculator.subtract(number1,number2);
        
        //Assert
        expect(calculator.result).toBe(expectedResult);
    });
});