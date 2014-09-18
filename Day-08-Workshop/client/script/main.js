'use strict';
if((localStorage.getItem('role')!=='business')&&(localStorage.getItem('role')!=='admin')&&(localStorage.getItem('role')!=='approver')){
	document.location='/index.html';			/* If someone attempts to go to this page without logging in*/
}

$(document).ready(function() {
	$('#username').text(', ' + localStorage.getItem('name') + '!');
});


