$(".itemDone").click(function(){
	var test = $(this).parent().attr('id');
	var removeTarg = $(this).parent();
	alert(test);
	$(this).parent().animate({ width: "70%" }, 300 );
	$(this).parent().queue(function() {
	  $(this).animate({ opacity: 0.0 }, 300 );
	  $(this).animate({ height: 0, padding: 0 }, 200 );
	  $( removeTarg ).delay(200).remove();
	  $( this ).dequeue();
	});
}); 


