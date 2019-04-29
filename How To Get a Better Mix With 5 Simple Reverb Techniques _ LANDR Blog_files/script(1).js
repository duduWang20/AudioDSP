/*
 * LANDR genesis child theme
 *
 *  BXslider
 *  LANDR layout
 *      Social Fixed - Document ready
 *      Social Fixed - Window resize
 *      Social Fixed - Document scroll
 *      Document ready - Show / Hide Search form
 *      Document ready - Show more comments
 *  Functions
 *      social_fixed_update_value
 *      landr_single_social_fixed
 *      header_show_hide
 *      animate_header_up
 *      animate_header_down
 *      landr_load_more_comments
 */

/* ==============================================
 * BXslider
 * =========================================== */

jQuery(document).ready(function(){

    // See if we can support multiple slider
    if( jQuery( '.bxslider' ).length > 0 ) {

      jQuery('.bxslider').bxSlider({
        mode: 'vertical',
        /*slideWidth: 300,*/
        minSlides: 3,
        moveSlides: 1,
        slideMargin: 10,
        pager: false,
        infiniteLoop: true,
        hideControlOnEnd: true,
        oneToOneTouch: false,
        preventDefaultSwipeX: false,
        preventDefaultSwipeY: true,
        nextText: "<i class='landr-font landr-font-down' aria-hidden='true'></i>",
        prevText: "<i class='landr-font landr-font-up' aria-hidden='true'></i>",
      });

    }

});

/* ==============================================
 * LANDR layout
 * =========================================== */

/** Social Fixed - Document ready */
jQuery(document).ready( function() {

    social_fixed_update_value();

    // If single post - landr_single_social_fixed
    if( jQuery( 'body.single-post' ).length > 0 ) {
        
        st = jQuery(this).scrollTop();

        landr_single_social_fixed( st, article_height );

    }

});

/** Social Fixed - Window resize */
jQuery( window ).resize( function() {

    social_fixed_update_value();

    // If single post - landr_single_social_fixed
    if( jQuery( 'body.single-post' ).length > 0 ) {
        
        st = jQuery(this).scrollTop();

        landr_single_social_fixed( st, article_height );

    }

});

var is_animate = false;

/** Social Fixed - Document scroll */
jQuery(document).scroll( function() {

    social_fixed_update_value();

    st = jQuery(this).scrollTop();

    /*if ( !is_animate ) {
        header_show_hide( st );
    }*/

    if( jQuery( 'body.single-post' ).length > 0 ) {

        landr_single_social_fixed( st, article_height );

    }

});

/**
 * Document ready - Show / Hide Search form
 */

jQuery( document ).ready( function() {

    jQuery( '#landr_search_form_button' ).on( 'click', function() {

        // hide mobile menu
        landr_remove_mobile_visible();

        // Get parent
        this_parent = jQuery( this ).closest( '.landr_search_form' );

        // Toggle Visible
        jQuery( this_parent ).toggleClass( 'visible' );

        // If visible...
        if( jQuery( '.landr_search_form ' ).hasClass( 'visible' ) ) {

            // Focus on form input
            jQuery( '.landr_search_form #s' ).focus();

            // Select
            jQuery( '.landr_search_form #s' ).select();

            jQuery( 'selected' );

            
        }

    });

});



    // Scroll down to comments section

jQuery( document ).ready( function() {
    
    jQuery( '.essb_icon_comments' ).on( 'click', function(e) {

        e.preventDefault();

        jQuery('html, body').animate({
            scrollTop: jQuery( '.comment-respond' ).offset().top
        }, 1000);

        return false;       

    });

});

/** 
 * Document ready - Show more comments
 */

jQuery( document ).ready( function() {

    landr_load_more_comments();

    jQuery( '#landr_load_more_comments' ).on( 'click', function() {

        landr_load_more_comments();

     });

});

/* ==============================================
 * Functions
 * =========================================== */
 
/*
 * social_fixed_update_value
 * Update the variables required for the calculation
 */

 function social_fixed_update_value() {

    social_element = false;

    // Define current article height
    if( jQuery( '.single article' ).length > 0  ) {

        container_padding = parseInt( jQuery( '.site-container' ).css('paddingTop') );
        
        article = jQuery( '.single article' );
        article_height = jQuery( article ).outerHeight();   
        article_margin_top = parseInt( jQuery( article ).css('marginTop') );
    

        if( jQuery( '.landr_single_header' ).length > 0  ) {

            single_header = jQuery( '.landr_single_header' );
            single_header_height = jQuery( single_header ).outerHeight();       
            landr_single_header_feat_image = jQuery( '.landr_single_header_feat_image_wrapper' ).outerHeight();

            if( jQuery( '.landr_easy_share' ).length > 0  ) {

                social = jQuery( '.landr_easy_share' );
                social_height = jQuery( '.landr_easy_share > div' ).outerHeight();  

                // Define site header
                if( jQuery( '.site-header' ).length > 0  ) {

                    site_header = jQuery( '.site-header' );
                    site_header_height = jQuery( site_header ).outerHeight();   

                    // All element are there, let activate the social position script

                    social_element = true;

                }

            }

       }

    }

}

/*
 * Single post - share widgets
 * Fixe position
 */

is_stop_position = false;

function landr_single_social_fixed( st, article_height ) {


/*
    console.log( "++++++++++++++++++++++++++" );

    console.log( "article_height : " + article_height );
    console.log( "article_margin_top : " + article_margin_top );
    console.log( "single_header_height : " + single_header_height );
    console.log( "container_padding : " + container_padding );
    console.log( "landr_single_header_feat_image : " + landr_single_header_feat_image );
    console.log( "social_height : " + social_height );

    console.log( "st : " + st );

    console.log( "++++++++++++++++++++++++++" );
*/

    if( social_element ) {

        if( st > ( ( article_height + container_padding + social_height ) - ( single_header_height + article_margin_top ) ) ) {

            // If the scroll is bigger than the article - 
            // Stop updating the css top 

            jQuery( social ).css( 'position', '' );

            if( !is_stop_position ) { 

                    jQuery( social ).css( 'top', ( ( article_height ) - ( single_header_height + social_height ) ) );

                is_stop_position = true;

            }

        } else if( st > ( container_padding + ( single_header_height - landr_single_header_feat_image ) ) ) {

            is_stop_position = false;

            // If the scroll is bigger than the original position of the social share, minus the header height 
            // ( so our social wont be under the header )

            // Update top css - fixed position
            jQuery( social ).css( 'position', 'fixed' );
            jQuery( social ).css( 'top', landr_single_header_feat_image + article_margin_top );

       } else {

            is_stop_position = false;

            // Clear top css - defaut position
            jQuery( social ).css( 'position', '' );
            jQuery( social ).css( 'top', '' );

       }

    }

}


/** 
 * landr_load_more_comments
 */

 function landr_load_more_comments() {

    comments = jQuery( '#comments' ).find( ".depth-1:hidden" );

    // If less than 5, remove '#landr_load_more_comments'
    if( jQuery( comments ).length < 5 ) {
        jQuery( '#landr_load_more_comments' ).css('display', 'none');
    }

    // Get next 5 comments

    $i = 0;

    jQuery.each( comments, function( key, value ) {

        if( $i > 4 ) {
            return false; 
        } 

        // Toggle Visible
        jQuery( value ).toggle( "slow", function() { });
      
      $i++;

    });

 }









 /**
  * Open / Close Mobile menu
  */

jQuery( document ).ready( function() {

    jQuery( '#landr_mobile_nav' ).on( 'click', function() {

        //jQuery( this ).toggleClass( 'mobile_visible' );
        // jQuery( '.site-header' ).toggleClass( 'mobile_visible' );
        jQuery( 'body' ).toggleClass( 'mobile_visible' );

    });

});

// Remove .mobile_visible if resize or search

function landr_remove_mobile_visible() {

        jQuery( '.mobile_visible' ).removeClass( 'mobile_visible' );

}

jQuery( window ).resize( function() {

    // landr_remove_mobile_visible();

});



/**
 * Enable Magnific Popup
 * http://dimsemenov.com/plugins/magnific-popup/documentation.html
 */

jQuery(document).ready(function() {

 // jQuery('.landr-lightbox').magnificPopup({type:'image'});
  
});



/**
 * Calculate the mobile menu height
 */

jQuery( document ).ready( function() {

    landr_mobile_menu_height();

});

jQuery( window ).resize( function() {

    landr_mobile_menu_height();

});

function landr_mobile_menu_height() {

    window_height = jQuery( window ).height();

    hello_bar_height = jQuery( '#landr_hello_bar' ).outerHeight();

    // Apply this height
    jQuery( '.landr_mobile-container' ).css( 'height', window_height - 160 - hello_bar_height );

}

/**
 * Hello bar
 */


jQuery( document ).ready( function() {

    jQuery( '#landr_hello_content_background' ).on( 'click', function(e) {
        e.stopPropagation();
    });

    jQuery( '#landr_hello_content' ).on( 'click', function(e) {
        e.stopPropagation();
        landr_close_hello_content();
    });

    jQuery( '#landr_hello_content_close' ).on( 'click', function() {
        landr_close_hello_content();
    });

    jQuery( '#landr_hello_bar' ).on( 'click', function() {

        jQuery( "#landr_hello_content" ).addClass( 'visible' );

        // current scroll - to avoid jump effect
        var current_scroll = jQuery(window).scrollTop();

        // after 0.5 sec, make the background fixed
        window.setTimeout( function() {                      
                                    jQuery( "body" ).addClass( 'hello_content_visible' );
                                    jQuery( "body" ).css( 'top', current_scroll * -1 );
                                    jQuery( "body" ).attr( "data-current-scroll", current_scroll );
                                        } ,500 );

    });

});

function landr_close_hello_content() {

        jQuery( "#landr_hello_content" ).removeClass( 'visible' );
        jQuery( "#landr_hello_content" ).addClass( 'visible_out' );
        jQuery( ".hello_content_visible" ).removeClass( 'hello_content_visible' );
        // scroll back to original position
        previous_scroll = jQuery( "body" ).attr( 'data-current-scroll' );
        jQuery( "body" ).attr( 'data-current-scroll', "" );
        jQuery( "body" ).css( 'top', "" );

        jQuery( window ).scrollTop( previous_scroll );

        // after 0.5 sec, remove visible_out
        window.setTimeout( function() {                      
                                         jQuery( "#landr_hello_content" ).removeClass( 'visible_out' );
                                        } ,500 );
}





/* 
 * Footer menu - mobile
 */

jQuery( document ).ready( function() {

    // if is mobile    
    var is_mobile = false;

        jQuery( '#landr_footer_top .widget-title' ).on( 'click', function() {

            if( jQuery('#landr_mobile_nav').css('display') != 'none') {
                is_mobile = true;       
            }

            if( is_mobile ) {

                    that = jQuery( this );
                    that_widget_wrap = jQuery( that ).closest( '.widget-wrap' );
                    that_widget_container = jQuery( that_widget_wrap ).children( 'div' );

                    // toogle that_widget_container
                    jQuery( that ).toggleClass( 'open' );
                    jQuery( that_widget_container ).slideToggle( function() {
                        jQuery( that_widget_container ).toggleClass( 'footer_div_visible' );
                        jQuery( that_widget_container ).css( 'display', '' ); // to make it compatible with desktop
                    });

            }

        });


});



jQuery(document).scroll( function() {

    scroll_top = jQuery(this).scrollTop();

    if( ( jQuery( '#landr_hello_bar:not(.in_animation)' ).length && 
        jQuery( 'body:not(.mobile_visible)' ).length ) || 
        scroll_top == 0 ) {

        jQuery( "#landr_hello_bar" ).stop();

        if( jQuery( '#landr_hello_bar:not(.fixed)' ).length ) {
            
            if( scroll_top > 38 ) {

                jQuery( "body" ).addClass( 'hello_bar_fixed' );
                jQuery( "body" ).removeClass( 'hello_bar_absolute' );

                /*jQuery( ".site-header" ).stop();
                jQuery( '.site-header' ).animate({
                    top: '64'
                }, 250, function() {});*/

                jQuery( '#landr_hello_bar' ).addClass( 'in_animation' );
                jQuery( '#landr_hello_bar' ).addClass( 'fixed' );

                // animate
                jQuery( '#landr_hello_bar' ).animate({
                    top: '0'
                }, 250, function() {                
                    jQuery( '#landr_hello_bar' ).removeClass( 'in_animation' );
                });

           }

        } else {
            
            if( scroll_top < 38 ) {


                // remove .site-header-top
                // jQuery( '.site-header-top' ).removeClass( 'site-header-top' );

                jQuery( "body" ).removeClass( 'hello_bar_fixed' );
                jQuery( "body" ).addClass( 'hello_bar_absolute' );

                /*jQuery( ".site-header" ).stop();
                jQuery( '.site-header' ).animate({
                    top: '38'
                }, 250, function() {});*/

                jQuery( '#landr_hello_bar' ).addClass( 'in_animation' );
                
                // animate
                jQuery( '#landr_hello_bar' ).animate({
                    top: '-38'
                }, 250, function() {
                    jQuery( '#landr_hello_bar' ).removeClass( 'fixed' );
                    jQuery( '#landr_hello_bar' ).css( 'top', '' );
                    jQuery( '#landr_hello_bar' ).removeClass( 'in_animation' );
                });
            }


        }
    }

    // if the hello bar absolute is out of screen, add fixed

    jQuery( '#landr_hello_bar' );
});