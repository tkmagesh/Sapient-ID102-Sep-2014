'use strict';

$(function() {
	var markets, commodities, locations, currencies, searchStringType;
	var commNames = [];
	var currNames = [];
	var locNames = [];
	var mktNames = [];

	function loadEntities(){
		$.getJSON( 'http://localhost:3000/api/commodities', function( data ) {
			var comms = data.commodities;
			commodities=comms;
			for(var i=0;i<comms.length;i++){
				$('#commodity').append('<option value="'+comms[i].name+'">'+comms[i].name+'</option>');
				commNames.push(comms[i].name.toLowerCase());	  
		  	}
		});

		$.getJSON( 'http://localhost:3000/api/locations', function( data ) {
		  var locs = data.locations;
		  locations=locs;
		  for(var i=0;i<locs.length;i++){
		  	$('#location').append('<option value="'+locs[i].name+'">'+locs[i].name+'</option>');
		  	locNames.push(locs[i].name.toLowerCase());
		  }
		  
		});

		$.getJSON( 'http://localhost:3000/api/currencies', function( data ) {
		  var currs = data.currencies;
		  currencies=currs;
		  for(var i=0;i<currs.length;i++){
		  	$('#currency').append('<option value="'+currs[i].name+'">'+currs[i].name+'</option>');
		  currNames.push(currs[i].name.toLowerCase());
		  }

		});

		$.getJSON( 'http://localhost:3000/api/markets', function( data ) {
		  var mkts = data.markets;
		  markets=mkts;
		  for(var i=0;i<mkts.length;i++) {
		  	$('#markets').append('<option value="'+mkts[i].name+'">'+mkts[i].name+'</option>');
		  mktNames.push(mkts[i].name.toLowerCase());
		  }

		});
	}

	function getLocations(locID){
		var locObj;
		for(var i=0;i<locations.length;i++){
		  	if(locations[i].id===locID){
		  		locObj=locations[i];
		  		return locObj;
		  	}
		}
	}

	function getCommodities(commIDs){
		var commObjArr=[];
		for(var i=0;i<commodities.length;i++){
		  	if($.inArray(commodities[i].id,commIDs)>=0){
		  		commObjArr.push(commodities[i]);
		  	}
		  }
		  return commObjArr;
	}

	function getCurrencies(currID){
		var currObj;
		for(var i=0;i<currencies.length;i++){
		  	if(currencies[i].id===currID){
		  		currObj=currencies[i];
		  		return currObj;
		  	}
		}
	}
	function getMarkets(mktID){
		var mktObj;
		for(var i=0;i<markets.length;i++){
		  	if(markets[i].id===mktID){
		  		mktObj=markets[i];
		  		return mktObj;
		  	}
		}
	}

	function searchByMkt(marketName){
		var marketSearched;
		var commObjs=[];
		var currencyObj;
		//var locationObj;
		
	  	for(var i=0;i<markets.length;i++){
	  		if(markets[i].name===marketName.toUpperCase()){
	  			marketSearched=markets[i];
	  		}
	  	}

		commObjs=getCommodities($(marketSearched.commodityIds).toArray());

		currencyObj=getCurrencies(marketSearched.currencyId);

		var locObj=getLocations(marketSearched.locationId);
		
		$.each(commObjs,function(){
			var str='<tr class="rows '+this.name;
			str+=' '+marketSearched.name;
			str+=' '+currencyObj.name;
			str+=' '+locObj.name+'">';
			str+= '<td class="entities market">'+marketSearched.name+'</td>';
			str+= '<td class="entities commodity">'+this.name+'</td>';
			str+= '<td class="entities location">'+locObj.name+'</td>';
			str+= '<td class="entities currency">'+currencyObj.name+'</td>';
			str+= '<td><input type="checkbox"></td>';
			str+= '<td><input type="button" value="Delete" class="delete delbtn"/></td></tr>';
			$('#searchResults').append(str);
		});

		if(localStorage.getItem('role').toLowerCase()==='business'){
			$('.delete').hide();
		}
	}


	function searchByLoc(str){
		var locationId;
		$.each(locations,function(){
			if(this.name.toLowerCase().indexOf(str) > -1){
				locationId=this.id;
			}
		});
		$.each(markets,function(){
			if(this.locationId===locationId){

				searchByMkt(this.name);
			}
		});
		noResults();
	}

	function noResults(){
		if($('.rows').length===0 || $('.rows').length===$('.hide').length){
			var str='<tr class="rows noResults"><td colspan="5">No Results Found</td></tr>';
			$('#searchResults').append(str);
		}
	}

	function searchByCurr(str){
		var currencyId;
		$.each(currencies,function(){
			if(this.name.toLowerCase().indexOf(str) > -1){
				currencyId=this.id;
			}
		});
		$.each(markets,function(){
			if(this.currencyId===currencyId){
				searchByMkt(this.name);
			}
		});
		noResults();
	}

	function searchByComm(str){
		var commodityId;
		$.each(commodities,function(){
			if(this.name.toLowerCase().indexOf(str) > -1){
				commodityId=this.id;
			}
		});
		$.each(markets,function(){
			if($.inArray(commodityId,this.commodityIds)>=0){
				
		  		// if(markets[i].name===this.name.toUpperCase()){
		  		// 	var marketSearched=this;
		  		// 	break;
		  		// }
		  		var commArr=[];
		  		commArr.push(commodityId);
		  		var commObjs=getCommodities(commArr);

		  		var currencyObj=getCurrencies(this.currencyId);

				var locObj=getLocations(this.locationId);

				var str='<tr class="rows '+commObjs[0].name;
				str+=' '+this.name;
				str+=' '+currencyObj.name;
				str+=' '+locObj.name+'">';
				str+= '<td class="entities market">'+this.name+'</td>';
				str+= '<td class="entities commodity">'+commObjs[0].name+'</td>';
				str+= '<td class="entities location">'+locObj.name+'</td>';
				str+= '<td class="entities currency">'+currencyObj.name+'</td>';
				str+= '<td><input type="checkbox"></td>';
				str+= '<td><input type="button" value="Delete" class="delete delbtn"/></td></tr>';
				$('#searchResults').append(str);
			}
		});
		if(localStorage.getItem('role').toLowerCase()==='business'){
			$('.delete').hide();
		}

	}

	function onBtnFlagClick(){
		var $checkedBoxes = $(':checkbox:checked');
		if ($checkedBoxes.length > 0){
			displayFlagMessage($checkedBoxes.length + ' entities flagged for review.');
		}
	}

	function displayFlagMessage(msg) {
		$('<div></div>').hide().text(msg).addClass('flagAlert').appendTo('#flagMsgs').slideDown().delay(2000).fadeOut(function(){
				$(this).remove();
		});
	}

	function search(searchStr){
		switch(searchStringType){
			case 'market':
				searchByMkt(searchStr);
				break;
			case 'location':
				searchByLoc(searchStr);
				break;
			case 'commodity':
				searchByComm(searchStr);
				break;
			case 'currency':
				searchByCurr(searchStr);
				break;
		}
		$('#searchDisplay').show();
	}


	function clearSearch() {
	    $('#searchContainer').find('input:text').val('');
	    $('.rows').remove();
	    $('.deleteHeader').remove();
	    $('select option').removeAttr('selected');
	    $('#searchDisplay').hide();
	}


	function displayErrorMsg(msg){
		$('span.error').replaceWith($('<span></span>').hide().html(msg).addClass('error').appendTo('#errorMessage').show().delay(2000).fadeOut(function(){
			$(this);
		}));
	}

	function searchText(){
		$('.rows').remove();
	    $('.deleteHeader').remove();
		var searchStr=$('#searchText').val().toLowerCase();
		searchStringType = ''; // reset type of search

		if($.inArray(searchStr,commNames)>=0){
			//check if search is a commodity
			searchStringType='commodity';
		}else
		if($.inArray(searchStr,locNames)>=0){
			//check if search is a location
			searchStringType='location';
		}else
		if($.inArray(searchStr,currNames)>=0){
			//check if search is a currency
			searchStringType='currency';
		}else
		if($.inArray(searchStr,mktNames)>=0){
			//check if search is a market
			searchStringType='market';
		}
		search(searchStr);

		//set filters
		$('tbody tr').addClass('hide');
		var flag=0;
		var filter=[];
		$(':selected').each(function() {
	        filter.push($(this).text());
		});
		if(filter.length===0){
			$('tr').removeClass('hide');
		}else{

			$.each($('.rows'),function(){

				for(var i=0;i<filter.length;i++){
					if($(this).hasClass(filter[i])){
						//$(this).removeClass('hide');
						flag++;
					}

					if(flag===filter.length){

						$(this).removeClass('hide');
					}
				}
				flag=0;
			});
		}
		noResults();
		
		//validate search
		var arr = [];
		$.merge(arr, currNames);
		$.merge(arr, commNames);
		$.merge(arr,locNames);
		$.merge(arr,mktNames);

		if($.inArray(searchStr, arr) === -1){
			displayErrorMsg('Entity not found');
		}
	}

	function showPopup(evt){
		if($('#dialog').length){
			$('#dialog').empty();
			$('#dialog').remove();
		}
		$( 'body' ).append('<div id="dialog" title="Entity Details"></div>');
		$(function() {
		    $( '#dialog' ).dialog();
		});

		var entityId;
		var entity;
		var entityName=$(evt.currentTarget).text().toLowerCase();
		if($.inArray(entityName,commNames)>=0){
			//check if search is a commodity
			entityId=commNames.indexOf(entityName)+1;
			var commIds=[];
			commIds.push(entityId);
			entity=(getCommodities(commIds))[0];
			$('#dialog').append('<a href="../entity_management/Commodity/edit.html?id='+entity.id+'&name='+entity.name+'" id="editBtn" class="btn" >EDIT</a>');
		}else
		if($.inArray(entityName,locNames)>=0){
			//check if search is a location
			entityId=locNames.indexOf(entityName)+1;
			entity=getLocations(entityId);
			$('#dialog').append('<a href="../entity_management/Location/edit.html?id='+entity.id+'&name='+entity.name+'" id="editBtn" class="btn" >EDIT</a>');
		}else
		if($.inArray(entityName,currNames)>=0){
			//check if search is a currency
			entityId=currNames.indexOf(entityName)+1;
			entity=getCurrencies(entityId);
			$('#dialog').append('<a href="../entity_management/Currency/edit.html?id='+entity.id+'&name='+entity.name+'" id="editBtn" class="btn" >EDIT</a>');
		}else
		if($.inArray(entityName,mktNames)>=0){
			//check if search is a market
			entityId=mktNames.indexOf(entityName)+1;
			entity=getMarkets(entityId);
			$('#dialog').append('<a href="../entity_management/Market/edit.html?id='+entity.id+'&name='+entity.name+'" id="editBtn" class="btn" >EDIT</a>');
			//entity;
		}
		
		//get entity details
		var str='';
		$.each(entity,function(key,value){
			if(key !== 'id'){
				str+='<p>'+key+' : '+value+'</p></br>';
			}
		});
		$('#editBtn').before(str);
	}

	function confirmDelete(evt){
		var target=evt.currentTarget;
		$( 'body').append('<div id="deleteDialog" title="Confirmation"></div>');
		$( '#deleteDialog' ).empty();
	    $( '#deleteDialog' ).dialog();
	    $('#deleteDialog').append('<p>Are you sure you want to delete?</p></br><input type="button" id="yes" value="YES" /> <input type="button" id="no" value="NO" />');
	    $('#yes').click(function(){
	    	$('#deleteDialog').html('<p>Entry Deleted</p></br><input type="button" id="ok" value="OK" />');
	    	deleteEntity(target);
	    });
	    $('#no').click(function(){
	    	$( '#deleteDialog' ).remove();
	    });
	    $('#deleteDialog').on('click','#ok',function(){
	    	location.reload(true);
	    });
	}

	function deleteEntity(target){
		var deleteRow = $($(target).parent()).parent();
		var marketName = $(deleteRow.children()[0]).text();
		var commName = $(deleteRow.children()[1]).text();
		var commId;
		$.each(commodities,function(){
			if(this.name === commName){
				commId=this.id;
			}
		});
		$.getJSON('http://localhost:3000/api/markets',function(data){       
            $.each(data.markets,function(){                    
            	if(this.name === marketName){
               		var commArr=this.commodityIds;
               		var updatedArr = $.grep( commArr, function(n) {
					  	return n !== commId;
					});
               		//put a new commodity array
               		updateCommodities(updatedArr,this.id);
               		if(updatedArr.length===0){
               			deleteMarket(this.id);
               		}
                }           
            });
     	});
	}

	function deleteMarket(marketId){
		//market has no commodities left
		var jsonobject=JSON.stringify({'market':{'id':marketId}});
		var url = 'http://localhost:3000/api/markets/'+marketId;

	    $.ajax({   
		    url:url,
		    type:'DELETE',
		    dataType:'json',
		    data:jsonobject,
		    contentType:'application/json',
		    success: function() {  
		    }                    
	    });
	}


	function updateCommodities(updatedArr,marketId){
		var jsonobject=JSON.stringify({'market':{'commodityIds':updatedArr}});
		var url = 'http://localhost:3000/api/markets/'+marketId;

	    $.ajax({   
		    url:url,
		    type:'PUT',
		    dataType:'json',
		    data:jsonobject,
		    contentType:'application/json',
		    success: function() { 
		    }                    
	  	});
	}

	function onBtnEmailClick() {
		window.location.href = 'mailto:?subject=Search Results from MDM';
	}

	function onBtnExcelClick() {
		//export to excel using tableExport.js plugin
		$('#searchResults').tableExport({type:'excel',escape:'false'});
	}

	function init() {
		$('#searchText').on('input', function(){
			if ($('#searchText').val() === '') { 
				$('#enterAssist').css('visibility','hidden');
			} else {
				$('#enterAssist').css('visibility','visible');
			}
		});

		loadEntities();
		$('#enterAssist').css('visibility','hidden');
		$('#searchBlock').on('submit',function() {
			searchText();
			return false;
		});
		$('#searchButton').click(function(){
			searchText();
		});
		$('#clearButton').click(clearSearch);
		$('#btnFlag').click(onBtnFlagClick);
		$('#searchResults').on('click','.delbtn',confirmDelete);
		$('#searchResults').on('click','.entities',showPopup);
		$('#btnEmail').click(onBtnEmailClick);
		$('#btnExcel').click(onBtnExcelClick);
		$('#searchDisplay').hide();
	 }
	
	init();
});
