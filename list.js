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


