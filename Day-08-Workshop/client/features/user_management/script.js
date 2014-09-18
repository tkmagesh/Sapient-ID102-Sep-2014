'use strict';

function onSubmitBtnClick () {
	  if($('#firstNameTxtBox').val() === ''){
	  $('#errMsgFirstName').hide().text('Please provide First name').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
	  return false;
	}else if($('#lastNameTxtBox').val() === ''){
	  $('#errMsgLastName').hide().text('Please provide Last name ').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
	  return false;
	}else if($('#userNameTxtBox').val() === ''){
	  $('#errMsgUserName').hide().text('Please provide Username').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
	  return false;
	 }else if($('#passwordTxtbox').val() === ''){
	  $('#errMsgPassword').hide().text('Please provide Password').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
	  return false;
	 }else{
	var username = $('#userNameTxtBox').val();
	var role = $('#roleSelect').val();
	var password = $('#passwordTxtbox').val();
	var jsonobject = JSON.stringify({'user':{'username':username, 'password':password, 'role':role, 'approved':true}});
	
	$.ajax({

        url:'http://localhost:3000/api/users',
        type:'POST',
        dataType:'json',
        data:jsonobject,
        contentType:'application/json'
    });

	$( '#successfullCreationDialogBox').dialog('open');
	return false;
	}
}

function init () {
	var dialogOptions = {
     	autoOpen: false, 
     	height: 300,
     	width: 500,
     	modal: true,
     	dialogClass: 'noclose',
     	show: {
            effect: 'blind',
            duration: 1000
     	}
 	};
	$('#adminOnlyDialog').dialog(dialogOptions);

 	$('#userLinks').delegate('a', 'click', function(evt) {
    	if((localStorage.getItem('role')!=='admin')&&(localStorage.getItem('role')!=='approver')) {
      		evt.preventDefault();
      		$('#adminOnlyDialog').dialog('open');
    	}
 	});

	$( '#successfullCreationDialogBox').dialog({
	      autoOpen: false,
	      modal:true,
	      show: {
		        effect: 'blind',
		        duration: 1000
	      },
	      buttons:{
		      	'OK':{ id:'ok',
		      	       text:'OK',
		      		click: function(){
		      		$(this).dialog( 'close');

	              	}        
	            }
	      }	    
  });
	$('#submitBtn').on('click',onSubmitBtnClick);
}

$(init);
