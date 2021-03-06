'use strict';
function edit(){

  var x=$('#commodityBox').text();
  $('#inputName').val(x);  
  $.getJSON('http://localhost:3000/api/commodities',function(data){
  $.each(data.commodities,function(){
    if($('#commodityBox').text()===this.name)
        {
          $('#className').val(this.class);
          $('#commodityId').val(this.id);
          $('#startDate').text((new Date(this.startDate)).toLocaleDateString()); //data taken from server and displayed in right format
          $('#endDate').text((new Date(this.endDate)).toLocaleDateString());  //date taken from server and converted in right format
        }
     });
  });
}
function addCommodity(){
    var nameVal=$('#inputName').val();
    var classVal=$('#className').val();
    var id=$('#commodityId').val();
    var jsonobject=JSON.stringify({'commodity':{'name':nameVal,'class':classVal}});

    $.ajax({
        url:'http://localhost:3000/api/commodities/'+id,
        type:'PUT',
        dataType:'json',
        data:jsonobject,
        contentType:'application/json',
        success:function(){
        $(function() {
        $('#dialogBox').dialog();
        });
        }
    });
}
function errorMsgDispName (msg){
  $('#errorMsg').hide().text(msg).clearQueue().fadeIn(200).delay(500).fadeOut(2000);
}

function save(){
  var isDuplicate=false;
  $.getJSON('http://localhost:3000/api/commodities',function(data){
  $.each(data.commodities,function(){
  if($('#inputName').val()===this.name)
    {
      $(function(){      
      errorMsgDispName($('#inputName').val() +' already exists.Please provide a different value.');
      isDuplicate=true;
      });
    }
  });
  if(isDuplicate===false){
    addCommodity();
    }
  });
}

function onNewCommodityNameTxtBoxKeypress (evt) {
  var text = $(evt.currentTarget).val();
  var length = text.length;
  var character = evt.which;
  if (length >= 10) {
    evt.preventDefault();
    errorMsgDispName('Please provide name in valid format');
  }
  if ( text ==='') {
  if ( !(character >= 48 && character <= 57 || character >= 65 && character <= 90 || character >= 97 && character <= 122)) {
    evt.preventDefault();
    errorMsgDispName('Please provide name in valid format');
    }
  }
}

function onNewCommodityNameTxtBoxBlur () {
  var nametextBox = $('#inputName').val();
  var lastChar = nametextBox[nametextBox.length -1];
  lastChar = lastChar.charCodeAt(0);
  if ( !(lastChar >= 48 && lastChar <= 57 || lastChar >= 65 && lastChar <= 90 || lastChar >= 97 && lastChar <= 122)) {
  errorMsgDispName('Please provide name in valid format');
  }
}

$(function() {
  var commodityName=window.location.href.split('?')[1].split('&')[1].split('=')[1];
  $('#commodityBox').text(commodityName);
  $('#dialogBox').hide();
  $('#dialogBoxDuplicate').hide();
  $('#commodityId').hide();
  edit();
  $('#submitData').click(save);
  $('#inputName,#className').on('keypress',onNewCommodityNameTxtBoxKeypress);
  $('#inputName,#className').on('blur',onNewCommodityNameTxtBoxBlur);
  $('#startDate').text('01/01/2004'); //default value
  $.getJSON('http://localhost:3000/api/commodities',function(data){
  $.each(data.commodities,function(){});
  });
});



