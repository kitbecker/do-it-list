






/* mark items as done once clicked */
$("body").on( "click", ".itemDone", function(){
	var itemId = $(this).parent().attr('id');
	var parentId = "#" + itemId ;		
	$(parentId).animate({ width: "70%" }, 100 ).animate({ opacity: 0.0 }, 100 ).animate({ height: 0, padding: 0 }, 200 );
	$(parentId).queue(function() {
	  $( parentId ).remove();
	  $( parentId ).dequeue();
	});
}); 



/* item functions*/

/* Add Item */
$("body").on( "click", ".addItem", function(){
	window.totalItems += 1;
    $(this).parent().parent().append("<div class='item' id='item-" + window.totalItems + "'><input type='text' placeholder='What do you want to do?' /><button class='saveItem' onclick='saveItem(" + window.totalItems + ")'>+</button></div>");
});


/* Save New Item */
$("body").on( "click", ".saveItem", function(){
	var itemId = $(this).parent().attr('id');
	var parentId = "#" + itemId ;	
	alert(parentId);
	var descText  = document.body.querySelector( parentId + " input[type='text']" ).value;
	alert(descText);
	$(parentId  + " input[type='text']").remove();
	$(parentId  + " .saveItem").remove();
	$(parentId).append("<div class='item-title'>"+ descText +"</div>");
    $(parentId).append("<button type='button' class='itemDone' onclick='itemDone(" + itemId + ")'></button><div class='item-description'></div><div class='button-area'><button class='addDesc'>add Description</button><button class='saveDesc'>save Description</button><button class='editDesc'>Edit Description</button><button class='deleteDesc'>X</button></div>");
} );


/* Description Actions */

/* See Item Description */
$("body").on( "click", ".item-title", function(){
	$(this).parent().toggleClass("edit");
} );




/* Add Item Description */
$("body").on( "click", ".addDesc", function(){

	var parentId = $(this).parent().attr('id');	

	$(this).parent().parent().children(".item-description").append("<textarea>enter a description</textarea>");
	
	$("#" + parentId + " .saveDesc").show(300);
	$("#" + parentId + " .addDesc").hide(300);
	$("#" + parentId + " .deleteDesc").show(300);
});


/* Edit Item Description */
$("body").on( "click", ".editDesc", function(){

	var parentId = $(this).parent().parent().attr('id');	

	var descText  = document.body.querySelector( "#" + parentId + " .item-description" ).innerHTML;

	$(this).parent().parent().children(".item-description").remove();

	var newText = "<div class='item-description'><textarea>" + descText + "</textarea></div>";

	$("#" + parentId + " .saveDesc").show(300);
	$("#" + parentId + " .editDesc").hide(300);
	$("#" + parentId ).append(newText);

});


/* save Item Description */
$("body").on( "click", ".saveDesc", function(){

	var parentId = $(this).parent().parent().attr('id');	

	var descText  = document.body.querySelector( "#" + parentId + " .item-description textarea" ).value;

	$(this).parent().parent().children(".item-description").remove();

	var newText = "<div class='item-description'>" + descText + "</div>";

	$("#" + parentId + " .editDesc").show(300);
	$("#" + parentId + " .saveDesc").hide(300);
	$("#" + parentId ).append(newText);

});


/* Delete Item Description */
$("body").on( "click", ".deleteDesc", function(){

	var parentId = $(this).parent().parent().attr('id');	

	$(this).parent().parent().children(".item-description").remove();

	var newText = "<div class='item-description'></div>";

	$("#" + parentId + " .addDesc").show(300);
	$("#" + parentId + " .deleteDesc").hide(300);
	$("#" + parentId ).append(newText);

});


