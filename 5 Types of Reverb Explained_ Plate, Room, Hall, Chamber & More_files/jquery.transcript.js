/**
 * Globaljs
 *
 * Main script file for the theme
 *
 * @package Editr
 * @author Syamil MJ
 */

jQuery(document).ready(function($) {
    $('.transcript-wrapper .trigger').on('click', function() {
        $('.transcript-wrapper').addClass('expanded');
    });
});
