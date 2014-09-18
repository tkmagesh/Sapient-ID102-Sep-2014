'use strict';

function userRequestId1Click(){
	$('#userRequestPopUpBox1').dialog('open');
}

function userRequestId2Click(){
	$('#userRequestPopUpBox2').dialog('open');
}

function userRequestId3Click(){
	$('#userRequestPopUpBox3').dialog('open');
}

function userRequestId4Click(){
	$('#userRequestPopUpBox4').dialog('open');
}

function removeApproved(){
	$('.approved').parents('tr').remove();
}

function removeRejected(){
	$('.rejected').parents('tr').remove();
}

function init () {
	var dialogOptions = {
		autoOpen: false,
		modal:true,
		show: {
		        effect: 'blind',
		        duration: 1000
	      }
	};

	$('#userRequestPopUpBox1').dialog(dialogOptions);
	$('#userRequestPopUpBox1').dialog( 'option', 'buttons', [ { text: 'APPROVED', 
		click: function() { 
			$('#userRequestStatusId1').removeClass().addClass('approved').text('Approved').show();
			$( this ).dialog( 'close' ); 
		} },
		{ text: 'REJECTED', 
		click: function() { 
			$('#userRequestStatusId1').removeClass('approved').addClass('rejected').text('Rejected').show();
			$( this ).dialog( 'close' ); 
		} } ] );

	$('#userRequestPopUpBox2').dialog(dialogOptions);
	$('#userRequestPopUpBox2').dialog( 'option', 'buttons', [ { text: 'APPROVED', 
		click: function() { 
			$('#userRequestStatusId2').removeClass('rejected').addClass('approved').text('Approved').show();
			$( this ).dialog( 'close' ); 
		} },
		{ text: 'REJECTED', 
		click: function() { 
			$('#userRequestStatusId2').removeClass('approved').addClass('rejected').text('Rejected').show();
			$( this ).dialog( 'close' ); 
		} } ] );

	$('#userRequestPopUpBox3').dialog(dialogOptions);
	$('#userRequestPopUpBox3').dialog( 'option', 'buttons', [ { text: 'APPROVED', 
		click: function() { 
			$('#userRequestStatusId3').removeClass('rejected').addClass('approved').text('Approved').show();
			$( this ).dialog( 'close' ); 
		} },
		{ text: 'REJECTED', 
		click: function() { 
			$('#userRequestStatusId3').removeClass('approved').addClass('rejected').text('Rejected').show();
			$( this ).dialog( 'close' ); 
		} } ] );

	$('#userRequestPopUpBox4').dialog(dialogOptions);
	$('#userRequestPopUpBox4').dialog( 'option', 'buttons', [ { text: 'APPROVED', 
		click: function() { 
			$('#userRequestStatusId4').removeClass('rejected').addClass('approved').text('Approved').show();
			$( this ).dialog( 'close' ); 
		} },
		{ text: 'REJECTED', 
		click: function() { 
			$('#userRequestStatusId4').removeClass('approved').addClass('rejected').text('Rejected').show();
			$( this ).dialog( 'close' ); 
		} } ] );

	$('#userRequestId1').click(userRequestId1Click);
	$('#userRequestId2').click(userRequestId2Click);
	$('#userRequestId3').click(userRequestId3Click);
	$('#userRequestId4').click(userRequestId4Click);
	$('#removeApprovedBtn').click(removeApproved);
	$('#removeRejectedBtn').click(removeRejected);
}

$(init);