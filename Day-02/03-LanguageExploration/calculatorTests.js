window.addEventListener("DOMContentLoaded", function(){
	test("Should be able to add two numbers", function(){
		//Arrange
		var number1 = 10,
			number2 = 20,
			expectedResult = 30;

		//Act
		var result = add(number1, number2);

		//Assert
		return result === expectedResult;
	});
	test("Should be able to add two numbers in string format", function(){
		//Arrange
		var number1 = "10",
			number2 = "20",
			expectedResult = 30;

		//Act
		var result = add(number1, number2);

		//Assert
		return result === expectedResult;
	});
	test("Should be able to treat non numeric strings as zero", function(){
		//Arrange
		var number1 = "10",
			number2 = "xyz",
			expectedResult = 10;

		//Act
		var result = add(number1, number2);

		//Assert
		return result === expectedResult;
	});
	test("Should be able to add functions returing numbers", function(){
		//Arrange
		var f1 = function(){ return 10;},
			f2 = function(){ return 20;},
			expectedResult = 30;

		//Act
		var result = add(f1, f2);

		//Assert
		return result === expectedResult;
	});
	test("Should be able to add functions returing numbers in string format", function(){
		//Arrange
		var f1 = function(){ return "10";},
			f2 = function(){ return "20";},
			expectedResult = 30;

		//Act
		var result = add(f1, f2);

		//Assert
		return result === expectedResult;
	});
	test("Should be able to process only one number", function(){
		//Arrange
		var number1 = 10,
			expectedResult = 10;

		//Act
		var result = add(number1);

		//Assert
		return result === expectedResult;
	});
	test("Should be able to process only one numeric string", function(){
		//Arrange
		var number1 = "10",
			expectedResult = 10;

		//Act
		var result = add(number1);

		//Assert
		return result === expectedResult;
	});
	test("Should return zero when no arguments are passed", function(){
		//Arrange
		var	expectedResult = 0;

		//Act
		var result = add();

		//Assert
		return result === expectedResult;
	});
	test("Should be able to handle more than 2 values", function(){
		//Arrange
		var	expectedResult = 150;

		//Act
		var result = add(10,20,"30",40,"50");

		//Assert
		return result === expectedResult;
	});
	test("Should be able to add array of numbers", function(){
		//Arrange
		var numbers1 = [10,20],
			numbers2 = [30,40],
			expectedResult = 100;

		//Act
		var result = add(numbers1, numbers2);

		//Assert
		return result === expectedResult;
	});
	test("Should be able to add nested array of numbers", function(){
		//Arrange
		var numbers = [10,[20,[30,[40]]]],
			expectedResult = 100;

		//Act
		var result = add(numbers);

		//Assert
		return result === expectedResult;
	});
	test("Should be able to add functions returing array of numbers and numbers in string format", function(){
		//Arrange
		var f1 = function(){ return ["10",30];},
			f2 = function(){ return ["20",40];},
			expectedResult = 100;

		//Act
		var result = add(f1, f2);

		//Assert
		return result === expectedResult;
	});
	test("Should be able to add array of functions returing array of numbers and numbers in string format", function(){
		//Arrange
		var f1 = function(){ return ["10",30];},
			f2 = function(){ return ["20",40];},
			expectedResult = 100;

		//Act
		var result = add([f1, f2]);

		//Assert
		return result === expectedResult;
	});
});