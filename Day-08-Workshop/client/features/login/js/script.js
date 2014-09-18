'use strict';
$(document).ready(function(){																	
	if(localStorage.getItem('role') !== null){
		document.location='../search/index.html';										/* So that a user who has already logged in is directed to the home page*/
	} else{
		$('#error').hide();
		$('#login').click(function(){
				var user = $('#user').val();
				var password = $('#password').val();
				var error = true;
				var userCred={ 'role':0 ,'userName':0};
				$.get('http://localhost:3000/api/users', function( data ){
					$.each(data.users, function(key, value){
						if(user === value.username && password === value.password){
							userCred.userName=value.username;
							userCred.role=value.role;
							error = false;
							if (typeof(Storage) !== 'undefined'){
								localStorage.setItem('name',userCred.userName);	
 				   				localStorage.setItem('role',userCred.role);				/* Loads the Name & Role of the User on to the browser's local storage*/
							}
						}
					});
					if(error === false){
						document.location='../search/index.html';
					} else{
						$('#error').show();
					}
				});
				return false;
		});
	}
});