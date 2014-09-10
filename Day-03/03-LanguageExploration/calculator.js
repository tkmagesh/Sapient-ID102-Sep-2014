function add(x,y){
	function parseArg(n){
		if (typeof n === "function") return parseArg(n());
		if (n instanceof Array) return add.apply(this, n); // todo : n (array) has to converted to an argument list
		return isNaN(n) ? 0 : parseInt(n,10);
	}
	return arguments.length <= 1 ? parseArg(arguments[0]) : parseArg(arguments[0]) + add([].slice.call(arguments,1));
}

	/*
	var result = 0;
	for(var i=0;i<arguments.length;i++)
		result += parseArg(arguments[i]);
	return result;
	*/

	
/*
	arguments -> array like object containing all the values passed to the function during invocation
	this

*/
/*
sum(10,20,30,40)
	-> 10 + sum(20,30,40)
			-> 20 + sum(30,40)
					-> 30 + sum(40)
							-> 40
							*/