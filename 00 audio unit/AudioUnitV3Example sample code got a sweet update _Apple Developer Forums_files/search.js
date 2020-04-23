jQuery(document).ready(function ($) {

  /* Activity Feed Email alters toggle */
  $('.ios-switch').on('click', function(){
    $(this).toggleClass('off');
  });

  /* Toggle Search Modal */
  var $appleSearchForm = $('#j-spotlight-search');
  var $appleSearchField = $('input#autosearch');
  var $appleSearchResults = $('#apple-search-results');

  
  $('.toggleSearch').on('click', function(e) {
    $appleSearchForm.fadeToggle('fast', function(){
          if( $appleSearchForm.is(':visible') ) {
            $appleSearchField.focus();
            $('html').click(function(e) {
              $appleSearchForm.fadeOut('fast', function(){
                $appleSearchField.val('').blur();
              });
              $('html').off();
              $appleSearchForm.off();
              $appleSearchResults.off().hide();
            });
            $appleSearchResults.on('click', function(e){
                e.stopPropagation();//prevents clicks inside the search results from closing our form
            });
            $appleSearchForm.on('click', function(e){
                e.stopPropagation();//prevents clicks inside the search form from closing the form
            });
          }
    });
  });

});