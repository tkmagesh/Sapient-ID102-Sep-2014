/*
create an object that exhibits the following behavior
Let us assume that the object is referenced in a variable "spinner"

*/

var spinner = /* fill in the blanks with code to create the object */
spinner.up() //=> 1
spinner.up() //=> 2
spinner.up() //=> 3
spinner.up() //=> 4

spinner.down() // => 3
spinner.down() // => 2
spinner.down() // => 1
spinner.down() // => 0
spinner.down() // => -1

//that variable that tracks the value should not be accessible from outside.

var spinner = (function(){
  var counter = 0;
  var obj = {
      up : function(){ return ++counter; }
      down : function(){ return --counter; }
  }
  return obj;
})();

