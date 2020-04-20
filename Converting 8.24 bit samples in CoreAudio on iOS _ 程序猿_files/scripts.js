jQuery(function() {
		
		  jQuery("<select />").appendTo("nav");
		  jQuery("<option />", {
			 "selected": "selected",
			 "value"   : "",
			 "text"    : "Go to..."
		  }).appendTo("nav select");
		  jQuery("nav a").each(function() {
		   var el = jQuery(this);

		   if(el.parent("li").hasClass("current_page_item")){
			  jQuery("<option />", {
				   "selected": "selected", 
				   "value"   : el.attr("href"),
				   "text"    : el.text()
			   }).appendTo("nav select");
			 }else{
				 jQuery("<option />", {
		
				   "value"   : el.attr("href"),
				   "text"    : el.text()
			   }).appendTo("nav select");	 
			}
		   
		  });
		  jQuery("nav select").change(function() {
			window.location = jQuery(this).find("option:selected").val();
		  }); 
		  
		  var size=jQuery("aside .widget").size(); 
		  jQuery("aside .widget").each(function(index){
				if(index<=size/2){
					jQuery(this).addClass("col");	
				}										   
			})
		  jQuery("aside .widget").not(jQuery("aside .widget.col")).wrapAll("<div class='cols'></div>");
		   jQuery("aside .widget.col").wrapAll("<div class='cols'></div>")
});