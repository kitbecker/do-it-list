

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



/* Add Item Description */
$(".addItem").click(function(){

    $(this).parent().parent().append("<div class='item'><input type='text' placeholder='What do you want to do?' /><button class='saveItem'>+</button></div>");

});
