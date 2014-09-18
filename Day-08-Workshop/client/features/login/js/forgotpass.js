'use strict';

function onsubmitBtnclick(){
	if ($('#username').val().length > 0){
		$('#dialogSent').dialog('open');
		return false;
	} else{
		$('#dialogNeedInfo').dialog('open');
	}

	
}

function init(){
	$('#dialogSent').dialog({
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

	$('#dialogNeedInfo').dialog({
		autoOpen: false,
		modal: true,
		show: {
		        effect: 'blind',
		        duration: 1000
	      },
	      buttons:{
		      	'OK':{ id:'ok',
		      	       text:'OK',
		      		click: function(){
		      		$(this).dialog( 'close');
		      		$('#username').val('Enter Valid Username');
	              	}        
	            }
	      }
	});
	$('#Notify').click(onsubmitBtnclick);
}

$(init);