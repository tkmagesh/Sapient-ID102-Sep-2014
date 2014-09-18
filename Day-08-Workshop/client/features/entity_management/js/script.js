'use strict';

function validateName(evnt){
  var text = $(evnt.currentTarget).val();
  var character = evnt.which;
  if (text === '') {
    if ( !(character >= 48 && character <= 57 || character >= 65 && character <= 90 || character >= 97 && character <= 122)) {
      evnt.preventDefault();
      $('#errMsg').hide().text('Please provide name in valid format').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    }
  }
}

//VALIDATE CURRENCY
function confirmCurrency(){
  $('#currencyDialog').dialog('open');
  $('#currencyNewName').text($('#currencyName').val());
  $('#currencyNewDesc').text($('#currencyDesc').val());
  return false;
}

function validateDuplicateCurrency(){
  var isDuplicate=false;
  $.getJSON('http://localhost:3000/api/currencies',function (data){
    $.each(data.currencies,function(){
      if($('#currencyName').val()===this.name){
        isDuplicate=true;
        $('#errMsg').hide().text($('#currencyName').val() + ' already exists. Please provide a different value.').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
      }
    });
    if(isDuplicate===false){
        confirmCurrency();
    }
  });
}

function validateCurrencyTrailing () {
  var nametextBox = $('#currencyName').val();
  var lastChar = nametextBox[nametextBox.length -1];
  lastChar = lastChar.charCodeAt(0);
  if ( !(lastChar >= 48 && lastChar <= 57 || lastChar >= 65 && lastChar <= 90 || lastChar >= 97 && lastChar <= 122)) {
    $('#errMsg').hide().text('Please provide name in valid format').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    return;
  }
  validateDuplicateCurrency();
}

function checkEmptyCurrency(){
  if($('#currencyName').val()===''){
   $('#errMsg').hide().text('Enter a Currency').clearQueue().fadeIn(200).delay(1000).fadeOut(1000);
    return;
  }
  validateCurrencyTrailing();
}

function createCurrency(){
  var name = $('#currencyName').val();
  var description = $('#currencyDesc').val();
  var jsonObject = JSON.stringify({'currency':{'name':name,'description':description}});
  $.ajax({
      url:'http://localhost:3000/api/currencies',
      type:'POST',
      dataType:'json',
      data:jsonObject,
      contentType:'application/json',
      success: function (){
          $('#currencyDialog').dialog('close');
          $('#successMsg').dialog('open');         
      }
  });
}

//VALIDATE LOCATION
function confirmLocation(){
  $('#locationDialog').dialog('open');
  $('#locationNewName').text($('#locationName').val());
  $('#locationNewDesc').text($('#locationDesc').val());
  return false;
}

function validateDuplicateLocation(){
  var isDuplicate=false;
  var name = $('#locationName').val();
  $.getJSON('http://localhost:3000/api/locations',function (data){
      $.each(data.locations,function(){
          if($('#locationName').val()===this.name){
            isDuplicate=true;
            $('#errMsg').hide().text(name + ' already exists. Please provide a different value.').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
          }
      });
      if(isDuplicate===false){
        confirmLocation();
      }
  });
}

function validateLocationTrailing () {
  var nametextBox = $('#locationName').val();
  var lastChar = nametextBox[nametextBox.length -1];
  lastChar = lastChar.charCodeAt(0);
  if ( !(lastChar >= 48 && lastChar <= 57 || lastChar >= 65 && lastChar <= 90 || lastChar >= 97 && lastChar <= 122)) {
    $('#errMsg').hide().text('Please provide name in valid format').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    return;
  }
  validateDuplicateLocation();
}

function checkEmptyLocation(){
  if($('#locationName').val()===''){
      $('#errMsg').hide().text('Enter a Location').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
      return;
  }
  validateLocationTrailing();
}

function createLocation(){
  var jsonObject = JSON.stringify({'location':{'name': $('#locationName').val() , 'description': $('#locationDesc').val()}});
  $.ajax({
      url:'http://localhost:3000/api/locations',
      type:'POST',
      dataType:'json',
      data:jsonObject,
      contentType:'application/json',
      success: function (){
          $('#locationDialog').dialog('close');
          $('#successMsg').dialog('open');            
      }     
  });
}

//VALIDATE COMMODITY
function confirmCommodity(){
    $('#commodityDialog').dialog('open');
    $('#commodityNewName').text($('#commodityName').val());
    $('#commodityNewClass').text($('#commodityClass').val());
    $('#commodityNewStartDate').text($('#commodityStart').val());
    $('#commodityNewEndDate').text($('#commodityEnd').val());
    return false;
}

function checkCommodityDate(){
  var start = $('#commodityStart').val();
  var end = $('#commodityEndDate').val();
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var today = d.getFullYear() + '-' + ((''+month).length<2 ? '0' : '') + month + '-' + ((''+day).length<2 ? '0' : '') + day;

  if(start === ''){
    $('#dateErrCommodity').hide().text('Please provide date in valid format').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    return;
  }

  else if(today>start){
    $('#dateErrCommodity').hide().text(' The Start Date can only be set to a future Date.').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    return;
  }

  else if(end !== ''){
    if(today>end){
      $('#dateErrMarket').hide().text(' The End Date can only be set to a future Date.').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
      return;
    }
  }
  confirmCommodity();
}

function validateDuplicateCommodity(){
  var isDuplicate=false;
  $.getJSON('http://localhost:3000/api/commodities',function (data){
    $.each(data.commodities,function(){
      if($('#commodityName').val()===this.name){
        isDuplicate=true;
        $('#errMsg').hide().text($('#commodityName').val() + ' already exists. Please provide a different value.').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
      }
    });
    if(isDuplicate===false){
       checkCommodityDate();
    }
  });
}

function validateCommodityTrailing() {
  var nametextBox = $('#commodityName').val();
  var lastChar = nametextBox[nametextBox.length -1];
  lastChar = lastChar.charCodeAt(0);
  if ( !(lastChar >= 48 && lastChar <= 57 || lastChar >= 65 && lastChar <= 90 || lastChar >= 97 && lastChar <= 122)) {
    $('#errMsg').hide().text('Please provide name in valid format').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    return;
  }
  validateDuplicateCommodity();
}

function checkEmptyCommodity() {
  if($('#commodityName').val()===''){
    $('#errMsg').hide().text('Enter a Commodity').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    return;
  }
    validateCommodityTrailing();
}

function createCommodity() {
  var start = $('#commodityStart').val();
  var selectTime = new Date(start);
  var end = $('#commodityEnd').val();
  var endDate = new Date(end);
  var jsonObject = JSON.stringify({'commodity':{'name': $('#commodityName').val() , 'class': $('#commodityClass').val(), 'startDate':selectTime,'endDate':endDate}});  
  $.ajax({
      url : 'http://localhost:3000/api/commodities',
      type: 'POST',
      dataType:'json',
      data:jsonObject,
      contentType:'application/json',
      success: function () {
        $('#commodityDialog').dialog('close');
        $('#successMsg').dialog('open');
      }
  });
}

//VALIDATE MARKET
function confirmMarket(){
  $('#marketDialog').dialog('open');
  $('#marketNewName').text($('#marketName').val());
  $('#marketNewLocation').text($('#marketLocation option:selected').text());
  $('#marketNewCommodity').text($('#marketCommodity option:selected').text());
  $('#marketNewCurrency').text($('#marketCurrency option:selected').text());
  $('#marketNewStartDate').text($('#marketStartDate').val());
  $('#marketNewEndDate').text($('#marketEndDate').val());
  return false;
}

function checkMarketDate(){
  var start = $('#marketStartDate').val();
  var end = $('#marketEndDate').val();
  var d = new Date();
  var month = d.getMonth()+1;
  var day = d.getDate();
  var today = d.getFullYear() + '-' + ((''+month).length<2 ? '0' : '') + month + '-' + ((''+day).length<2 ? '0' : '') + day;

  if(start===''){
    $('#dateErrMarket').hide().text('Please provide date in valid format').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    return;
  }

  else if(today>start){
    $('#dateErrMarket').hide().text(' The Start Date can only be set to a future Date.').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    return;
  }
  if(end !== ''){
    if(today>end){
    $('#dateErrMarket').hide().text(' The End Date can only be set to a future Date.').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    return;
    }
  }
  confirmMarket();
}

function validateDuplicateMarket(){
  var isDuplicate=false;
  $.getJSON('http://localhost:3000/api/markets',function (data){
    $.each(data.markets,function(){
      if($('#marketName').val()===this.name){
        isDuplicate=true;
        $('#errMsg').hide().text($('#marketName').val() + ' already exists. Please provide a different value.').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
      }
    });
    if(isDuplicate===false){
     checkMarketDate();
    }
  });
}

function validateMarketTrailing() {
  var nametextBox = $('#marketName').val();
  var lastChar = nametextBox[nametextBox.length -1];
  lastChar = lastChar.charCodeAt(0);
  if ( !(lastChar >= 48 && lastChar <= 57 || lastChar >= 65 && lastChar <= 90 || lastChar >= 97 && lastChar <= 122)) {
    $('#errMsg').hide().text('Please provide name in valid format').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    return;
  }
  validateDuplicateMarket();
}

function checkEmptyMarket(){
  if($('#marketName').val()===''){
    $('#errMsg').hide().text('Enter a Market').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
    return;
  }
    validateMarketTrailing();
}

function createMarket(){
  var name = $('#marketName').val();
  var location = $('#marketLocation').val();
  var commodity = $('#marketCommodity').val();
  var commodityIdArray = [];
  $.each(commodity, function() {
    commodityIdArray.push(parseInt(this, 10));
  });
  var currency = $('#marketCurrency').val();
  var start = $('#marketStartDate').val();
  var selectTime = new Date(start);
  var end = $('#marketEndDate').val();
  var endDate = new Date(end);
  var jsonObject = JSON.stringify({'market':{'name':name, 'locationId':location, 'currencyId':currency, 'commodityIds':commodityIdArray, 'startDate':selectTime,'endDate':endDate}});
  $.ajax({
          url:'http://localhost:3000/api/markets',
          type:'POST',
          dataType:'json',
          data:jsonObject,
          contentType:'application/json',
          success: function () {
            $('#marketDialog').dialog('close');
            $('#successMsg').dialog('open');
          }
  });      
}

//INIT
function init(){
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

  $('#Currency').delegate('a', 'click', function(evt) {
    if((localStorage.getItem('role')!=='admin')&&(localStorage.getItem('role')!=='approver')) {
      evt.preventDefault();
      $('#adminOnlyDialog').dialog('open');
    }
  });

  $('#Location').delegate('a', 'click', function(evt) {
    if((localStorage.getItem('role')!=='admin')&&(localStorage.getItem('role')!=='approver')) {
      evt.preventDefault();
      $('#adminOnlyDialog').dialog('open');
    }
  });

  $('#marketEndDate').change(function(){
    $('#submitMarket').removeAttr('disabled');
    var start = $('#marketStartDate').val();
    var selectTime = new Date(start);
    var end = $('#marketEndDate').val();
    var endDate = new Date(end);
    if ((Date.parse(endDate) <= Date.parse(selectTime))){
        $('#dateErrMarket').hide().text('Start date should be earlier than end date').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
        $('#submitMarket').attr('disabled','disabled');
        return;
    }
  });

  $('#commodityEnd').change(function(){
    $('#submitCommodity').removeAttr('disabled');
    var start = $('#commodityStart').val();
    var selectTime = new Date(start);
    var end = $('#commodityEnd').val();
    var endDate = new Date(end);
    if ((Date.parse(endDate) <= Date.parse(selectTime))){
        $('#dateErrCommodity').hide().text('Start date should be earlier than end date').clearQueue().fadeIn(100).delay(1000).fadeOut(1000);
        $('#submitCommodity').attr('disabled','disabled');
        return;
    }
  });
  

  $('#commodityDialog').dialog(dialogOptions);
  $('#marketDialog').dialog(dialogOptions);
  $('#locationDialog').dialog(dialogOptions);
  $('#currencyDialog').dialog(dialogOptions);
  $('#successMsg').dialog({
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
            $('#successMsg').dialog('close');
          }
        }
      }
  });

  $('#marketName').keypress(validateName);
  $('#confirmMarket').click(createMarket);
  $('#submitMarket').click(checkEmptyMarket);

  $('#currencyName').keypress(validateName);
  $('#confirmCurrency').click(createCurrency);
  $('#submitCurrency').click(checkEmptyCurrency);

  $('#locationName').keypress(validateName);
  $('#confirmLocation').click(createLocation);
  $('#submitLocation').click(checkEmptyLocation);

  $('#commodityName').keypress(validateName);
  $('#confirmCommodity').click(createCommodity);
  $('#submitCommodity').click(checkEmptyCommodity);
  
  //GET MARKET LOCATIONS OPTIONS
  $.getJSON('http://localhost:3000/api/locations',function(data){
    $.each(data.locations,function(){
      $('#marketLocation').append('<option value=' + this.id + '>' + this.name + '</option>');
    });
  });

  //GET MARKET COMMODITIES OPTIONS
  $.getJSON('http://localhost:3000/api/commodities',function(data){
    $.each(data.commodities,function(){
      $('#marketCommodity').append('<option value=' + this.id + '>' + this.name + '</option>');
    });
  });

  //GET MARKET CURRENCIES OPTIONS
  $.getJSON('http://localhost:3000/api/currencies',function(data){
    $.each(data.currencies,function(){
      $('#marketCurrency').append('<option value=' + this.id + '>' + this.name + '</option>');
    });
  });
}
$(init);