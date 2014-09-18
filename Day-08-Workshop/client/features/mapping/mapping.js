'use strict';

function errorMsgEntity (msg) {
  $('#errMsgEntity').hide().text(msg).clearQueue().fadeIn(200).delay(500).fadeOut(2000);
}
function errMsgString (msg) {
  $('#errMsgString').hide().text(msg).clearQueue().fadeIn(200).delay(500).fadeOut(2000);
}
function errMsgDescript (msg) {
  $('#errMsgDescript').hide().text(msg).clearQueue().fadeIn(200).delay(500).fadeOut(2000);
}
function errMsgDate (msg) {
  $('#errMsgDate').hide().text(msg).clearQueue().fadeIn(200).delay(500).fadeOut(2000);
}
function errMsgSource (msg) {
  $('#errMsgSource').hide().text(msg).clearQueue().fadeIn(200).delay(500).fadeOut(2000);
}


function onsubmitBtnclick(){
	var MapEntityText = $('#mapentity');
	var MapStringText = $('#mapstring');
	var MapDescriptText = $('#mapdescript');
	var MapDate = $('#mapStart');
	var MapSourceText = $('#sourceSys');

	if(MapEntityText.val() === ''){
		errorMsgEntity('This is a required field');
		return false;
	}
	if(MapStringText.val() === ''){
		errMsgString('This is a required field');
		return false;
	}
	if(MapDescriptText.val()=== ''){
		errMsgDescript('This is a required field');
		return false;

	}
	if(MapDate.val()=== ''){
		errMsgDate('This is a required field');
		return false;
	} 
	if(MapSourceText.val()=== ''){
		errMsgSource('This is a required field');
		return false;
	}
	else {
		
		$('#successfullCreationDialogBox').dialog('open');
		return false;

	}
	
}

function init(){
	

	
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
	

	$('#UnsuccessfulCreationDialogBox').dialog({
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
	$('#submitBtn').click(onsubmitBtnclick);
}

$(init);