jQuery("document").ready(function ($) {
	var $window_el = $(document);
	
	// Sticky footer
	(function() {
		var height_percentage = 0.70;
		var target_height = $("#main").height() * height_percentage;
		var $sticky_el = $(".sticky-footer");

		// Only add the events if the mobile navigation is visible (we're on mobile device)
		if (!$("#mobile-header").is(":visible")) return;

		$window_el.on("load", check_scroll);
		$window_el.on("scroll", check_scroll);

		function check_scroll(event) {
			if ($sticky_el.hasClass("show") )
				return;

			if( $window_el.scrollTop()  > target_height && !$sticky_el.hasClass("show") ) {
				$sticky_el.addClass("show");
			}
		}
	})();

	// Mobile call to action header
	(function() {
		// dictates at what percentage we want to show the mobile header
		var height_percentage = 0.25;
		var target_height = $("#main").height() * height_percentage;
		var $cta_el = $("#mobile-header-cta");

		// Only add the events if the mobile navigation is visible (we're on mobile device)
		if( !$("#mobile-header").is(":visible") ) return;

		$window_el.on("load", check_scroll);
		$window_el.on("scroll", check_scroll);

		function check_scroll(event) {
			if( $window_el.scrollTop() > target_height && !$cta_el.is(":visible")) {
				$cta_el.fadeIn();
			} else if($window_el.scrollTop() <= target_height && $cta_el.is(":visible")) {
				$cta_el.fadeOut();
			}
		}
	})();
});
