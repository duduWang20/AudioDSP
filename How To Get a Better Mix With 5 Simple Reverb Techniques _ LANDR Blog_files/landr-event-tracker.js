// http://leho.kraav.com/blog/restore-ga-tracker-variable-name-after-yoast-google-analytics-__gatracker-transition/

if ( typeof __gaTracker !== 'undefined' ) {

	 __gaTracker( function() {
	  window.ga = __gaTracker;
	});

}


/*
 * LANDR Blog Event tracker 
 */

 function landr_trackEvent( category, action, label, id ) {

 	
 	// For debugging, this line below show what we send to the tracker
	//console.log( "landr_trackEvent  || [category] : " + category + " || [action] : " + action + " || [label] : " + label + " || [id] : " + id ); 

 	if ( typeof window.ga !== 'undefined' && 
 		 jQuery.isFunction( window.ga ) ) {

 		// https://developers.google.com/analytics/devguides/collection/analyticsjs/events
 		window.ga('send', {
					  hitType: 'event',
					  eventCategory: category,
					  eventAction: action,
					  eventLabel: label
					});

 	// window.ga exist - event tracked
	//console.log( "landr_trackEvent - send" ); 



 	} else {

 		// window.ga do not exist - no event tracked - Make sure you are not logged, Yoast ignore logged user.
 		//console.log( "landr_trackEvent error: event not tracked" ); 

 	}

 }

 function landr_clicked( that ) {
 	
	category = jQuery( that ).data( 'category' );
	label    = jQuery( that ).data( 'label' );
	id    = jQuery( that ).data( 'id' );

	landr_trackEvent( category, 'Clicked', label, id );

 }


function landr_in_viewport( that ) {

	if( jQuery( that ).length ) {

		that_viewed = jQuery( that ).data( 'that_viewed' );

		if( !that_viewed ) {		

			// Define if this element is on the viewport

			is_visible = jQuery( that ).is(":visible"); 

			in_viewport = isElementInViewport ( that );

			if( in_viewport && is_visible ) {

				// Update the element data, so we do not track it anymore
				jQuery( that ).data( 'that_viewed', true );

				// Get element data for the trackEvent function
				category = jQuery( that ).data( 'category' );
				label    = jQuery( that ).data( 'label' );
				id    = jQuery( that ).data( 'id' );

				landr_trackEvent( category, 'Viewed', label, id );

			}

		}

	}

}

function isElementInViewport ( that ) {

    //special bonus for those using jQuery
    if (typeof jQuery === "function" && that instanceof jQuery) {
        that = that[0];
    }

    var rect = that.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );

}

/* =====================
 * Element list
 * ================== */

	/*
	 * CTA
	 * ================== */

	cta_top_right = jQuery( '.landr_in_header-container .widget_landr_button_widget a.button' );
		jQuery( cta_top_right ).data( 'category', 'CTA' );
		jQuery( cta_top_right ).data( 'label', 'Top Right - Acquisition' );
		jQuery( cta_top_right ).data( 'id', 'Top Right - Acquisition' );

	cta_top_left = jQuery( '.title-area .site-title a' );
		jQuery( cta_top_left ).data( 'category', 'CTA' );
		jQuery( cta_top_left ).data( 'label', 'Top Left - Logo' );
		jQuery( cta_top_left ).data( 'id', 'Top Left - Logo' );

	cta_bottom_learn = jQuery( '.landr_before_footer-container .landr_row_widget_background a.button' );
		jQuery( cta_bottom_learn ).data( 'category', 'CTA' );
		jQuery( cta_bottom_learn ).data( 'label', 'Bottom - Learn More' );
		jQuery( cta_bottom_learn ).data( 'id', 'Bottom - Learn More' );

	cta_bottom_newsletter = jQuery( '.footer-widgets .widget_mc4wp_widget form' );
		jQuery( cta_bottom_newsletter ).data( 'category', 'CTA' );
		jQuery( cta_bottom_newsletter ).data( 'label', 'Bottom - Newsletter' );
		jQuery( cta_bottom_newsletter ).data( 'id', 'Bottom - Newsletter' );

	/*
	 * Home Page
	 * ================== */

	 homepage_a = jQuery( '.home .category_header a' );

	jQuery( homepage_a ).each( function() {

		label = jQuery( this ).text();
		jQuery( this ).data( 'category', 'Home Page' );
		jQuery( this ).data( 'label', label );
		jQuery( this ).data( 'id', label );

	 });

	/*
	 * Social
	 * ================== */

	 social_left = jQuery( '.landr_easy_share_wrapper' );
		jQuery( social_left ).data( 'category', 'Social' );
		jQuery( social_left ).data( 'label', 'Left' );
		jQuery( social_left ).data( 'id', 'Social Left' );

	 social_bottom = jQuery( '.menu-social-container' );
		jQuery( social_bottom ).data( 'category', 'Social' );
		jQuery( social_bottom ).data( 'label', 'Bottom' );
		jQuery( social_bottom ).data( 'id', 'Social Bottom' );

	/*
	 * Menu
	 * ================== */

	 menu_main = jQuery( '.menu-primary a' );

	jQuery( menu_main ).each( function() {

		label = jQuery( this ).text();
		jQuery( this ).data( 'category', 'Menu' );
		jQuery( this ).data( 'label', label );
		jQuery( this ).data( 'id', label );

	 });

	 menu_mobile = jQuery( '.landr_mobile_sidebar-container .menu a' );

	jQuery( menu_mobile ).each( function() {

		label = jQuery( this ).find('span').text();
		jQuery( this ).data( 'category', 'Menu Mobile' );
		jQuery( this ).data( 'label', label );
		jQuery( this ).data( 'id', label );

	 });

	/*
	 * Read more
	 * ================== */

	 readmore_picture  = jQuery( '.landr_post_image' );

	jQuery( readmore_picture ).each( function() {

		jQuery( this ).data( 'category', 'Read More' );
		jQuery( this ).data( 'label', 'Picture' );
		id = jQuery( this ).parents( 'article' ).attr('class');
		jQuery( this ).data( 'id', id );

	 });

	 readmore_text     = jQuery( '.entry-header .entry-title a' );	

	jQuery( readmore_text ).each( function() {

		jQuery( this ).data( 'category', 'Read More' );
		jQuery( this ).data( 'label', 'Text' );
		id = jQuery( this ).parents( 'article' ).attr('class');
		jQuery( this ).data( 'id', id );

	 });

	 readmore_featured = jQuery( '.landr_shortcode_featured_readmore_button' );

	jQuery( readmore_featured ).each( function() {

		jQuery( this ).data( 'category', 'Read More' );
		jQuery( this ).data( 'label', 'Feature' );
		id = jQuery( this ).parents( 'article' ).attr('class');
		jQuery( this ).data( 'id', id );

	 });

	/*
	 * Category Page
	 * ================== */

	 category_next = jQuery( '.category .pagination-next' );
		jQuery( category_next ).data( 'category', 'Category Page' );
		jQuery( category_next ).data( 'label', 'Next' );
		jQuery( category_next ).data( 'id', 'Category Next' );

	 category_previous = jQuery( '.category .pagination-previous' );
		jQuery( category_previous ).data( 'category', 'Category Page' );
		jQuery( category_previous ).data( 'label', 'Previous' );
		jQuery( category_previous ).data( 'id', 'Category Previous' );
		










 /* =====================
  * Event Viewed
  * Check if element is in viewport
  * ================== */

jQuery( window ).on( 'DOMContentLoaded load resize scroll', function() {
 	
 	// CTA
	landr_in_viewport( cta_top_right );
	landr_in_viewport( cta_top_left );
	landr_in_viewport( cta_bottom_learn );
	landr_in_viewport( cta_bottom_newsletter );

	// Homepage category
	/*jQuery( homepage_a ).each( function() { landr_in_viewport( this ); });*/

	// Social
	landr_in_viewport( social_left );
	landr_in_viewport( social_bottom );

	// Menu
	jQuery( menu_main ).each( function() { landr_in_viewport( this ); });

	// Menu - Mobile
	jQuery( menu_mobile ).each( function() { landr_in_viewport( this ); });

	// Read more
	/*jQuery( readmore_picture ).each( function() { landr_in_viewport( this ); });
	jQuery( readmore_text ).each( function() { landr_in_viewport( this ); });
	jQuery( readmore_featured ).each( function() { landr_in_viewport( this ); });*/

	// Category Page
	landr_in_viewport( category_next );
	landr_in_viewport( category_previous );


}); 

/* =====================
 * Event Click
 * ================== */

	// CTA
	jQuery( cta_top_right ).on( 'click', function() { landr_clicked( cta_top_right ); });
	jQuery( cta_top_left ).on( 'click', function() { landr_clicked( cta_top_left ); });
	jQuery( cta_bottom_learn ).on( 'click', function() { landr_clicked( cta_bottom_learn ); });
	jQuery( cta_bottom_newsletter ).submit( function() { landr_clicked( cta_bottom_newsletter ); });

	// Homepage category
	jQuery( homepage_a ).each( function() { jQuery( this ).on( 'click', function() { landr_clicked( this ); }); });

	// Social
	jQuery( social_left ).find( 'a' ).on( 'click', function() { landr_clicked( social_left ); });
	jQuery( social_bottom ).find( 'a' ).on( 'click', function() { landr_clicked( social_bottom ); });

	// Menu
	jQuery( menu_main ).each( function() { jQuery( this ).on( 'click', function() { landr_clicked( this ); }); });

	// Menu - Mobile
	jQuery( menu_mobile ).each( function() { jQuery( this ).on( 'click', function() { landr_clicked( this ); }); });

	// Read more
	jQuery( readmore_picture ).each( function() { jQuery( this ).on( 'click', function() { landr_clicked( this ); }); });
	jQuery( readmore_text ).each( function() { jQuery( this ).on( 'click', function() { landr_clicked( this ); }); });
	jQuery( readmore_featured ).each( function() { jQuery( this ).on( 'click', function() { landr_clicked( this ); }); });

	// Category Page
	jQuery( category_next ).on( 'click', function() { landr_clicked( category_next ); });
	jQuery( category_previous ).on( 'click', function() { landr_clicked( category_previous ); });










