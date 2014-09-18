'use strict';

var marketId;

function setCommodityById(id) {
    $.getJSON('http://localhost:3000/api/commodities/'+id,function(data){
          //obj.name = data.commodity.name;
          var t = $('#commodityBox').text();
          $('#commodityBox').text(t + data.commodity.name + ' | ');
    });
}

function setCommodityNamesByIds(ids) {

  for (var i = 0; i < ids.length; i++) {
    setCommodityById(ids[i]);
  }
}

function setLocationNameById(id) {
    $.getJSON('http://localhost:3000/api/locations/'+id,function(data){
          $('#locationBox').text(data.location.name);
    });
}

function setCurrencyById(id) {
    $.getJSON('http://localhost:3000/api/currencies/'+id,function(data){
          $('#currencyBox').text(data.currency.name);
    });
}

function send(){

  var nameVal=$('#marketName').val();
  var jsonobject=JSON.stringify({'market':{'name':nameVal}});
  var url = 'http://localhost:3000/api/markets/'+marketId;

  $.ajax({   
      url:url,
      type:'PUT',
      dataType:'json',
      data:jsonobject,
      contentType:'application/json',
      success: function() {
        $('#dialogBox').dialog('open');
       
      }                    
  });
}   


function onSaveBtnClick (evt) { 
  evt.preventDefault();
 send();
}

function errorMsgDispName (msg) {
  $('#errorMsg').hide().text(msg).clearQueue().fadeIn(200).delay(500).fadeOut(2000);
}


function onNewMarketNameTxtBoxKeypress(evt){
    var text = $(evt.currentTarget).val();
    var length = text.length;   
    if(length>=100){
    evt.preventDefault();
    errorMsgDispName('Please provide name less than 100 char');
    }


    
}

function validate(evt){

      var marketText = $('#marketName').val();
      var length = marketText.length;

      var leading = marketText[0].charCodeAt(0);
      var trailing = marketText[length-1].charCodeAt(0);


      if(( leading<65 || leading>90)&&( leading<97||leading>122)&&( leading<48||leading>57)&&( leading!==32)){             
            evt.preventDefault();
            errorMsgDispName('FIRST AND LAST CHAR CAN ONLY BE ALPHANUMERIC !!!');
      }


      if(( trailing<65 || trailing>90)&&( trailing<97||trailing>122)&&( trailing<48||trailing>57)&&( trailing!==32)){               
              evt.preventDefault();
              errorMsgDispName('FIRST AND LAST CHAR CAN ONLY BE ALPHANUMERIC !!!');
      }  

 }

function setMarketFields(id) {
  $.getJSON('http://localhost:3000/api/markets/'+id,function(data){

        var market = data.market;
        $('#marketName').val(market.name);
         setLocationNameById(market.locationId);
         setCommodityNamesByIds(market.commodityIds);
         setCurrencyById(market.currencyId);
         $('#startDate').text((new Date(market.startDate)).toLocaleDateString());
     });
}

function initializeDialogBox() {
  $('#dialogBox').dialog({
     autoOpen: false, 
      height: 200,
      width: 350,
      modal: true,
      dialogClass: 'noclose',
      show: {
            effect: 'blind',
            duration: 1000
      },
      buttons:{
        'OK':{
          id: 'ok',
          text: 'OK',
          click: function(){
            $('#dialogBox').dialog('close');
          }
        }
      }
  });
}

$(function init(){
  initializeDialogBox();

  marketId=window.location.href.split('?')[1].split('&')[0].split('=')[1];
  setMarketFields(marketId);
  $('#submitButton').on('click',onSaveBtnClick);
  $('#marketName').keypress(onNewMarketNameTxtBoxKeypress);    
  $('#marketName').focusout(validate);


});