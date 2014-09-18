'use strict';

function errorMsgDispName (msg) {
    $('#errorMsg').hide().text(msg).clearQueue().fadeIn(200).delay(500).fadeOut(2000);
}


function modifyLocation() {
    
    var newLocation = $('#locNameTxt').val();
    if(( newLocation === '')){
          errorMsgDispName('Please supply a valid location.');
          return false;
    }

    $.getJSON('http://localhost:3000/api/locations',function(data) {  
        $.each(data.locations,function() {
        var newLocation = $('#locNameTxt').val();
        if( newLocation === this.name){
              errorMsgDispName('Location already exists. Please provide a different value.');
              return false;
          }
        });
      });

      $.getJSON('http://localhost:3000/api/locations',function(data) {  
        $.each(data.locations,function() {
             var selectedLocation = window.location.href.split('?')[1].split('&')[1].split('=')[1];
             var newLocation = $('#locNameTxt').val();
             var newId = this.id;
             var newDescription = $('#locDescriptionText').val();

             if(selectedLocation === this.name){
                var jsonobject = JSON.stringify({'location':{'name': newLocation,'description': newDescription}});

                $.ajax({
                    url:'http://localhost:3000/api/locations/' + newId,
                    type:'PUT',
                    dataType:'json',
                    data:jsonobject,
                    contentType:'application/json',
                    success: function () {
                      $(function() {
                        $('#successfullCreationDialogBox').dialog('open');
                      });  
                    }  
                });
             }
        });
      });               
}


function submitLocationClick() {

      $(modifyLocation);
} 

function onNewLocationNameTxtBoxKeypress (evt) {
    var text = $('#locNameTxt').val();
    var length = text.length;
    var character = evt.which;
    if (length >= 100){
      evt.preventDefault();
      errorMsgDispName('Please provide length less than 100');
    }

    if ( text === ''){
      if ( !(character >= 48 && character <= 57 || character >= 65 && character <= 90 || character >= 97 && character <= 122)) {
        evt.preventDefault();
        errorMsgDispName('Please provide location in valid format.');
      }
    }
}


function onNewLocationNameTxtBoxBlur () {
  var nametextBox = $('#locNameTxt').val();
  var lastChar = nametextBox[nametextBox.length -1];
  
  lastChar = lastChar.charCodeAt(0);
  if ( !(lastChar >= 48 && lastChar <= 57 || lastChar >= 65 && lastChar <= 90 || lastChar >= 97 && lastChar <= 122)) {
    errorMsgDispName('Please provide location in valid format.');
    
  }
}


function init() {
    var locName=window.location.href.split('?')[1].split('&')[1].split('=')[1];
    $('#locNameTxt').val(locName);

    $('#successfullCreationDialogBox').dialog({
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
    $('#locNameTxt').on('keypress',onNewLocationNameTxtBoxKeypress);
    $('#locNameTxt').on('blur',onNewLocationNameTxtBoxBlur);
    $('#submitLocation').click(submitLocationClick);
}

$(init);

