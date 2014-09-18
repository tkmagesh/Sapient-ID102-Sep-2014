'use strict';

function errorMsgDispName (msg) {
    $('#errorMsg').hide().text(msg).clearQueue().fadeIn(200).delay(500).fadeOut(2000);
}


function modifyCurrency() {
    var selectedCurrency = $('#currencyBox').text();
    $.getJSON('http://localhost:3000/api/currencies',function(data){     
      $.each(data.currencies,function(){
        if( ($('#currNameTxt').val()) === this.name){
            errorMsgDispName($('#currNameTxt').val()+' already exists. Please provide a different value.');
        }
        
        else {
            var newCurr = $('#currNameTxt').val();
            if(  (this.name === selectedCurrency) && ( newCurr === '')){
              errorMsgDispName('Please supply a valid currency.');
            }

            else if(this.name === selectedCurrency){
                var newId = this.id;
                var newDescription = $('#currDescriptionText').val();

                var jsonobject = JSON.stringify({'currency':{'name': newCurr,'description': newDescription}});

                $.ajax({
                  url:'http://localhost:3000/api/currencies/' + newId,
                  type:'PUT',
                  dataType:'json',
                  data:jsonobject,
                  contentType:'application/json',
                  success: function () {
                    $(function() {
                      $('#dialogBox').dialog('open');
                    });  
                  }  
                });
              }
          }
      });  
    });                   
}


function submitCurrencyClick() {
    var oldCurrencyValue = $('#currencyBox').text();
    var newCurrencyValue  = $('#currNameTxt').val();

    if(oldCurrencyValue === newCurrencyValue) {
      errorMsgDispName($('#currencyBox').text()+' already exists. Please provide a different value.');
    }
    else {
      $(modifyCurrency);
   }
} 

function onNewCurrencyNameTxtBoxKeypress (evt) {
    var text = $('#currNameTxt').val();
    var length = text.length;
    var character = evt.which;
    if (length >= 100){
      evt.preventDefault();
      errorMsgDispName('Please provide length less than 100');
    }

   if ( text === ''){
      if ( !(character >= 48 && character <= 57 || character >= 65 && character <= 90 || character >= 97 && character <= 122)) {
        evt.preventDefault();
        errorMsgDispName('Please provide currency in valid format');
      }
   }
}


function  onNewCurrencyNameTxtBoxBlur() {
    var nametextBox = $('#currNameTxt').val();
    var lastChar = nametextBox[nametextBox.length -1];
    
    lastChar = lastChar.charCodeAt(0);
    if ( !(lastChar >= 48 && lastChar <= 57 || lastChar >= 65 && lastChar <= 90 || lastChar >= 97 && lastChar <= 122)) {
      errorMsgDispName('Please provide name in valid format');
    }
}


function init() {

  var currenyName=window.location.href.split('?')[1].split('&')[1].split('=')[1];
    $('#currencyBox').text(currenyName);
     $('#dialogBox').dialog({
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

    $('#successfullCreationDialogBox').hide();
    $('#currNameTxt').on('keypress',onNewCurrencyNameTxtBoxKeypress);
    $('#currNameTxt').on('blur',onNewCurrencyNameTxtBoxBlur);
    $('#submitCurrency').click(submitCurrencyClick);
}

$(init);

