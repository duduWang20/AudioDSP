if(typeof dubspot === 'undefined') {
	var dubspot = {};
}

/**
* DubSpot General API for use through DubSpot Wordpress Blog
* 
* @author Funktion Studios - Damian Galarza
*/
dubspot.app = (function () {
	
	var _this = {
		
		init : function () {
			
			// Setup the Category drop down functionality
			jQuery('#cat').change(events.selectCategory);
			
		}	
	};
	
	var events = {
		
		// Category Drop Down from sidebar event handler
		selectCategory : function (e) {
			var _this = jQuery(this).get(0);
			
			if(_this.value !== '-1') {
				jQuery(this).parents('form').submit();
			}
		}
		
	};
	
	/**
	* Public API for DubSpot
	*/
	var _public = {
		
		/**
		* Use SWF Object to safely inject youtube videos
		*/
		injectSWF : function (videoID, container) {
			// Embed featured video with SWF Object
			var params = { allowScriptAccess: "always" };
		    var atts = { id: container };
			
		   	swfobject.embedSWF("http://www.youtube.com/v/" + videoID + "?enablejsapi=1&playerapiid=ytplayer", container, "641", "387", "8", null, null, params, atts);
		}
		
	};
	
	// Ready? Go!
	jQuery(document).ready(function () {
		_this.init();
	});
	
	return _public;
	
})();