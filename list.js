


function itemDone(itemId) {
		var parentId = "#item-" + itemId ;	
		
	$(parentId).animate({ width: "70%" }, 100 ).animate({ opacity: 0.0 }, 100 ).animate({ height: 0, padding: 0 }, 200 );
	$(parentId).queue(function() {
	  $( parentId ).remove();
	  $( parentId ).dequeue();
	});
}




/* mark items as done once clicked */
$(".itemDone").click(function(){
	var test = $(this).parent().attr('id');
	var removeTarg = $(this).parent();
	console.log(test); /* get the items id */
	$(this).parent().animate({ width: "70%" }, 100 ).animate({ opacity: 0.0 }, 100 ).animate({ height: 0, padding: 0 }, 200 );
	$(this).parent().queue(function() {
	  $( removeTarg ).remove();
	  $( this ).dequeue();
	});
}); 



/* item functions*/

/* Add Item */
$(".addItem").click(function(){
	window.totalItems += 1;
    $(this).parent().parent().append("<div class='item' id='item-" + window.totalItems + "'><input type='text' placeholder='What do you want to do?' /><button class='saveItem' onclick='saveItem(" + window.totalItems + ")'>+</button></div>");

});


/* Save New Item */
function saveItem(itemId) {
		var parentId = "#item-" + itemId ;	
		alert(parentId);
		var descText  = document.body.querySelector( parentId + " input[type='text']" ).value;
		alert(descText);
		$(parentId  + " input[type='text']").remove();
		$(parentId  + " .saveItem").remove();
		$(parentId).append("<div class='item-title'>"+ descText +"</div>");
	    $(parentId).append("<button type='button' class='itemDone' onclick='itemDone(" + itemId + ")'></button>");
}


/* Description Actions */

/* See Item Description */
$(".item-title").click(function(){
	$(this).parent().toggleClass("edit");
});


/* Add Item Description */
$(".addDesc").click(function(){

	var parentId = $(this).parent().attr('id');	

	$(this).parent().parent().children(".item-description").append("<textarea>enter a description</textarea>");
	
	$("#" + parentId + " .saveDesc").show(300);
	$("#" + parentId + " .addDesc").hide(300);
	$("#" + parentId + " .deleteDesc").show(300);
});


/* Edit Item Description */
$("button.editDesc").click(function(){

	var parentId = $(this).parent().parent().attr('id');	

	var descText  = document.body.querySelector( "#" + parentId + " .item-description" ).innerHTML;

	$(this).parent().parent().children(".item-description").remove();

	var newText = "<div class='item-description'><textarea>" + descText + "</textarea></div>";

	$("#" + parentId + " .saveDesc").show(300);
	$("#" + parentId + " .editDesc").hide(300);
	$("#" + parentId ).append(newText);

});


/* save Item Description */
$("button.saveDesc").click(function(){

	var parentId = $(this).parent().parent().attr('id');	

	var descText  = document.body.querySelector( "#" + parentId + " .item-description textarea" ).value;

	$(this).parent().parent().children(".item-description").remove();

	var newText = "<div class='item-description'>" + descText + "</div>";

	$("#" + parentId + " .editDesc").show(300);
	$("#" + parentId + " .saveDesc").hide(300);
	$("#" + parentId ).append(newText);

});


/* Delete Item Description */
$("button.deleteDesc").click(function(){

	var parentId = $(this).parent().parent().attr('id');	

	$(this).parent().parent().children(".item-description").remove();

	var newText = "<div class='item-description'></div>";

	$("#" + parentId + " .addDesc").show(300);
	$("#" + parentId + " .deleteDesc").hide(300);
	$("#" + parentId ).append(newText);

});


