'use strict';
function deleteUser()
{
    var flag1=0,flag2=0;  // Flag 1 is used for checking if the user already exists and Flag 2 is used to check if the text box is empty
    var userToDelete = $('#userNameTxtBox').val();
    if( userToDelete === ''){
              flag2=1;
              $('#error').text('This field cannot be left blank');
    } 
    if( userToDelete === localStorage.getItem('name')){
              flag2=1;
              $('#error').text('You cannot delete youself');
    } 
    else{
        $.get('http://localhost:3000/api/users', function( data ){
        $.each(data.users, function(key, value) {
          if(userToDelete === value.username && userToDelete !== localStorage.getItem('name')){
            flag1=1;
            var id=this.id;
            
                $.ajax({
                        url:'http://localhost:3000/api/users/' + id,
                        type:'DELETE',
                        dataType:'json',
                        contentType:'application/json',
                        success: function () 
                        {                     
                            $('#successfullDeletionDialogBox').dialog('open');
                        }  
                });
          }
          if(flag1===0 && flag2===0){
            $('#error').text('This user does not exist');
          }
          else{
            $('#error').text('');
          }
        });
      });
    }
}

$(function(){
    //$('#successfullDeletionDialogBox').hide();
    $('#successfullDeletionDialogBox').dialog({
      autoOpen: false,
      modal: true,
      show: {
            effect: 'blind',
            duration: 1000,
      },
      buttons:{
          'OK':{ id:'ok',
                 text:'OK',
                 click: function(){
                    $(this).dialog( 'close');
                    $('#username').val('');
                 }        
            }
      }
    });
    $('#deleteBtn').click(deleteUser);
});