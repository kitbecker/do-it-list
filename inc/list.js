

/* group functions*/

/* Add group */
$("body").on( "click", ".addGroup", function(){
	window.totalGroups += 1;
    $("#group-container").append("<div class='group dark' id='group-" + window.totalGroups + "'><input type='text' placeholder='Name this grouping...' /><button class='saveGroup'>+</button></div>");
});

/* Save group */
$("body").on( "click", ".saveGroup", function(){
	var itemId = $(this).parent().attr('id');
	var parentId = "#" + itemId ;	
	var descText  = document.body.querySelector( parentId + " input[type='text']" ).value;

	var strId = itemId.replace("group-", "");
    var str =  "inc/actions.php?action=add&type=group&name=" + descText; ;


    $.post( "inc/actions.php",{   
	action : 'add',
	type : 'group',  
	name : descText
	 } , 
	 function(response){ 
 			$(parentId  + " input[type='text']").remove();
			$(parentId  + " .saveGroup").remove();
			$(parentId).append("<h2>"+ descText +"</h2><div id='item-buttons'><button class='addItem'>+</button></div>");
	} ); 
} );






/* item functions*/


/* mark items as done once clicked */
$("body").on( "click", ".itemDone", function(){
	var itemId = $(this).parent().attr('id');


	if ( itemId.match(/item/g)){
		var parentId = "#" + itemId ;
		var strId = itemId.replace("item-", "");
		var type = 'item';
	}


	if ( itemId.match(/group/g)){
		var parentId = "#" + itemId ;
		var strId = itemId.replace("group-", "");
		var type = 'group';
	}

    $.post( "inc/actions.php",{   
	action : 'done',
	id : strId,
	type : type  
	 } , 
	 function(response){ 
 			$(parentId).animate({ width: "70%" }, 100 ).animate({ opacity: 0.0 }, 100 ).animate({ height: 0, padding: 0 }, 200 );
			$(parentId).queue(function() {
			$( parentId ).remove();
			$( parentId ).dequeue(); });
	} ); 
}); 


/* Add Item */
$("body").on( "click", ".addItem", function(){
	window.totalItems += 1;

  $(this).parent().parent().children(".items").append("<div class='item light' id='item-" + window.totalItems + "'><input type='text' placeholder='What do you want to do?' /><button class='saveItem' >+</button></div>");
});



/* Save New Item */
$("body").on( "click", ".saveItem", function(){
	var itemId = $(this).parent().attr('id');
	var parentId = "#" + itemId ;	

	var descText  = document.body.querySelector( parentId + " input[type='text']" ).value;

	//construct string for ajax request 
    var groupId = $(this).parent().parent().parent().attr('id');
    
	groupId = groupId.replace("group-", "");
    groupId.replace('group-','');


    $.post( "inc/actions.php",{   
	action : 'add',
	group : groupId,
	type : 'item',  
	name : descText
	 } , 
	 function(response){ 
  $(parentId  + " input[type='text']").remove();
		$(parentId  + " .saveItem").remove();
		$(parentId).append("<div class='item-title'>"+ descText +"</div>");
		$(parentId).append("<button type='button' class='itemDone' onclick='itemDone(" + itemId + ")'></button><div class='item-description hide'></div><div class='button-area hide'><button class='addDesc show'>add Description</button><button class='saveDesc hide'>save Description</button><button class='editDesc hide'>Edit Description</button><button class='deleteDesc hide'>X</button></div>");
	} ); 

} );


/* Save Item On Enter Press*/

$("body").on( "keyup", ".item > input[type='text']", function(e){
	if(e.keyCode == 13)
	{

	var itemId = $(this).parent().attr('id');
	var parentId = "#" + itemId ;	
	var descText  = document.body.querySelector( parentId + " input[type='text']" ).value;

	//construct string for ajax request 
    var groupId = $(this).parent().parent().parent().attr('id');
	groupId = groupId.replace("group-", "");
    groupId.replace('group-','');

	    $.post( "inc/actions.php",{   
		action : 'add',
		group : groupId,
		type : 'item',  
		name : descText
		 } , 
		 function(response){ 
	  $(parentId  + " input[type='text']").remove();
			$(parentId  + " .saveItem").remove();
			$(parentId).append("<div class='item-title'>"+ descText +"</div>");
			$(parentId).append("<button type='button' class='itemDone' onclick='itemDone(" + itemId + ")'></button><div class='item-description hide'></div><div class='button-area hide'><button class='addDesc show'>add Description</button><button class='saveDesc hide'>save Description</button><button class='editDesc hide'>Edit Description</button><button class='deleteDesc hide'>X</button></div>");
		} ); 

	} //end key up if
	
});






/* Description Actions */

/* See Item Description and edit options*/
$("body").on( "click", ".item-title", function(){
	$(this).parent().toggleClass("edit");

	var parentId = $(this).parent().attr('id');

	var target = "#" + parentId + " div.button-area";

	var targetTwo = "#" + parentId + " div.item-description";

	var showState = $( target ).hasClass( "hide" );

	if( showState ){
		$(target).removeClass("hide").addClass("show");
		$(targetTwo).removeClass("hide").addClass("show");
	}else{
		$(target).addClass("hide").removeClass("show");
		$(targetTwo).addClass("hide").removeClass("show");
	}

} );


/* Add Item Description */
$("body").on( "click", ".addDesc", function(){

	var parentId = $(this).parent().parent().attr('id');	

	alert(parentId);

	$("#" + parentId ).append("<div class='item-description'><textarea>enter a description</textarea></div>");
	
	$("#" + parentId + " .addDesc").removeClass("show").addClass("hide");
	$("#" + parentId + " .saveDesc").removeClass("hide").addClass("show");
});


/* Edit Item Description */
$("body").on( "click", ".editDesc", function(){

	var parentId = $(this).parent().parent().attr('id');

	alert(parentId);

	var descText  = document.body.querySelector( "#" + parentId + " .item-description" ).innerHTML;

	$(this).parent().parent().children(".item-description").remove();

	var newText = "<div class='item-description'><textarea>" + descText + "</textarea></div>";

	$("#" + parentId + " .deleteDesc").removeClass("hide").addClass("show");
	$("#" + parentId + " .saveDesc").removeClass("hide").addClass("show");
	$("#" + parentId + " .editDesc").removeClass("show").addClass("hide");

	$("#" + parentId ).append(newText);

});


/* save Item Description */
$("body").on( "click", ".saveDesc", function(){

	var parentId = $(this).parent().parent().attr('id');	

	var descText  = document.body.querySelector( "#" + parentId + " .item-description textarea" ).value;

	if ( parentId.match(/item/g)){
		$(this).parent().parent().children(".item-description").remove();
		var strId = parentId.replace("item-", "");
		var type = 'item';
		var str =  "inc/actions.php?action=editDesc&type=item&desc=" + descText + "&id=" + strId;
	}

	if ( parentId.match(/group/g)){
		$(this).parent().parent().children(".group-description").remove();
		var strId = parentId.replace("group-", "");
		var type = 'group';
 		var str =  "inc/actions.php?action=editDesc&type=group&desc=" + descText + "&id=" + strId;
	}

	var newText = "<div class='item-description'>" + descText + "</div>";

    $.post( "inc/actions.php",{   
	action : 'editDesc',
	type : type,  
	id : strId,  
	desc : descText
	 } , 
	 function(response){ 
		$("#" + parentId + " .saveDesc").removeClass("show").addClass("hide");
		$("#" + parentId + " .editDesc").removeClass("hide").addClass("show");
		$("#" + parentId + " .deleteDesc").removeClass("hide").addClass("show");
		$("#" + parentId ).append(newText);
		
	} ); 
});



/* On Enter Press Save Item Description */
$("body").on( "keyup", "textarea", function(e){
	if(e.keyCode == 13)
	{
  	
  	var parentId = $(this).parent().parent().attr('id');	

	var descText  = document.body.querySelector( "#" + parentId + " .item-description textarea" ).value;

	if ( parentId.match(/item/g)){
		$(this).parent().parent().children(".item-description").remove();
		var strId = parentId.replace("item-", "");
		var type = 'item';
		var str =  "inc/actions.php?action=editDesc&type=item&desc=" + descText + "&id=" + strId;
	}

	if ( parentId.match(/group/g)){
		$(this).parent().parent().children(".group-description").remove();
		var strId = parentId.replace("group-", "");
		var type = 'group';
 		var str =  "inc/actions.php?action=editDesc&type=group&desc=" + descText + "&id=" + strId;
	}

   
	var newText = "<div class='item-description'>" + descText + "</div>";


        $.post( "inc/actions.php",{   
		action : 'editDesc',
		type : type,  
		id : strId,  
		desc : descText
		 } , 
		 function(response){ 
		$("#" + parentId + " .saveDesc").removeClass("show").addClass("hide");
		$("#" + parentId + " .editDesc").removeClass("hide").addClass("show");
		$("#" + parentId + " .deleteDesc").removeClass("hide").addClass("show");
		$("#" + parentId ).append(newText);
		} ); 

	} // end key up if
	
});




/* Delete Item Description */
$("body").on( "click", ".deleteDesc", function(){

	var parentId = $(this).parent().parent().attr('id');	

	$(this).parent().parent().children(".item-description").remove();

		if ( parentId.match(/item/g)){
			var strId = parentId.replace("item-", "");
			var type = 'item';
		}


		if ( parentId.match(/group/g)){
			var strId = parentId.replace("group-", "");
			var type = 'group';
		}

		var newText = "<div class='item-description'></div>";

        $.post( "inc/actions.php",{   
		action : 'deleteDesc',
		type : type,  
		id : strId
		 } , 
		 function(response){ 
		$("#" + parentId + " .saveDesc").removeClass("show").addClass("hide");
		$("#" + parentId + " .addDesc").removeClass("hide").addClass("show");
		$("#" + parentId + " .editDesc").removeClass("show").addClass("hide");
		$("#" + parentId + " .deleteDesc").removeClass("show").addClass("hide");
		$("#" + parentId ).append(newText);
		} ); 

});


/* View group options*/
$("body").on( "click", ".group h2", function(){

	var parentId = $(this).parent().attr('id');	
	var target = "#" + parentId + " > div.button-area";


	var showState = $( target ).hasClass( "hide" );

	if( showState ){
		$(target).removeClass("hide").addClass("show");
	}else{
		$(target).addClass("hide").removeClass("show");
	}

});


/* View done items */
$("body").on( "click", ".viewDone, .hideDone, .doneItems h3", function(){

	var parentId = $(this).parent().parent().attr('id');	
	var target = "#" + parentId + " div.doneItems";

	var showState = $( target ).hasClass( "hide" );

	if( showState ){
		$(target).removeClass("hide").addClass("show");
		$(this).parent().children('.hideDone').removeClass("hide").addClass("show");
		$(this).parent().children('.viewDone').removeClass("show").addClass("hide");
		
	}else{
		$(target).addClass("hide").removeClass("show");
		$(this).parent().children('.hideDone').removeClass("show").addClass("hide");
		$(this).parent().children('.viewDone').removeClass("hide").addClass("show");
	}



});

/* Delete done item*/

$("body").on( "click", ".itemDelete", function(){
	var itemId = $(this).parent().attr('id');

	if ( itemId.match(/item/g)){
		var parentId = "#" + itemId ;
		var strId = itemId.replace("item-", "");
		var type = 'item';	
	}

	if ( itemId.match(/group/g)){
		var parentId = "#" + itemId ;
		var strId = itemId.replace("group-", "");
		var type = 'group';
	}
		
        $.post( "inc/actions.php",{   
		action : 'delete',
		type : type,  
		id : strId
		 } , 
		 function(response){ 
			$(parentId).animate({ width: "70%" }, 100 ).animate({ opacity: 0.0 }, 100 ).animate({ height: 0, padding: 0 }, 200 );
			$(parentId).queue(function() {
				$( parentId ).remove();
				$( parentId ).dequeue(); } ); 
		} ); 
} );