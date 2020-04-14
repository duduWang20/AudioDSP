/* Source and licensing information for the line(s) below can be found at https://www.soundonsound.com/sites/all/modules/field_group/field_group.js. */
(function($){Drupal.FieldGroup=Drupal.FieldGroup||{};Drupal.FieldGroup.Effects=Drupal.FieldGroup.Effects||{};Drupal.FieldGroup.groupWithfocus=null;Drupal.FieldGroup.setGroupWithfocus=function(element){element.css({display:'block'});Drupal.FieldGroup.groupWithfocus=element};Drupal.FieldGroup.Effects.processFieldset={execute:function(context,settings,type){if(type=='form')$('fieldset.fieldset',context).once('fieldgroup-effects',function(i){if($(this).is('.required-fields')&&$(this).find('.form-required').length>0)$('legend span.fieldset-legend',$(this)).eq(0).append(' ').append($('.form-required').eq(0).clone());if($('.error',$(this)).length){$('legend span.fieldset-legend',$(this)).eq(0).addClass('error');Drupal.FieldGroup.setGroupWithfocus($(this))}})}};Drupal.FieldGroup.Effects.processAccordion={execute:function(context,settings,type){$('div.field-group-accordion-wrapper',context).once('fieldgroup-effects',function(){var wrapper=$(this),active_index=false;wrapper.find('.accordion-item').each(function(i){if($(this).hasClass('field-group-accordion-active'))active_index=i});wrapper.accordion({heightStyle:"content",active:active_index,collapsible:true,changestart:function(event,ui){if($(this).hasClass('effect-none')){ui.options.animated=false}else ui.options.animated='slide'}});if(type=='form'){var $firstErrorItem=false;wrapper.find('div.field-group-accordion-item').each(function(i){if($(this).is('.required-fields')&&$(this).find('.form-required').length>0)$('h3.ui-accordion-header a').eq(i).append(' ').append($('.form-required').eq(0).clone());if($('.error',$(this)).length){if(!$firstErrorItem)$firstErrorItem=$(this).parent().accordion("activate",i);$('h3.ui-accordion-header').eq(i).addClass('error')}});if(!$firstErrorItem)$('.ui-accordion-content-active',$firstErrorItem).css({height:'auto',width:'auto',display:'block'})}})}};Drupal.FieldGroup.Effects.processHtabs={execute:function(context,settings,type){if(type=='form')$('fieldset.horizontal-tabs-pane',context).once('fieldgroup-effects',function(i){if($(this).is('.required-fields')&&$(this).find('.form-required').length>0)$(this).data('horizontalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');if($('.error',$(this)).length){$(this).data('horizontalTab').link.parent().addClass('error');Drupal.FieldGroup.setGroupWithfocus($(this));$(this).data('horizontalTab').focus()}})}};Drupal.FieldGroup.Effects.processTabs={execute:function(context,settings,type){if(type=='form'){var errorFocussed=false;$('fieldset.vertical-tabs-pane',context).once('fieldgroup-effects',function(i){if($(this).is('.required-fields')&&$(this).find('.form-required').length>0)$(this).data('verticalTab').link.find('strong:first').after($('.form-required').eq(0).clone()).after(' ');if($('.error',$(this)).length){$(this).data('verticalTab').link.parent().addClass('error');if(!errorFocussed){Drupal.FieldGroup.setGroupWithfocus($(this));$(this).data('verticalTab').focus();errorFocussed=true}}})}}};Drupal.FieldGroup.Effects.processDiv={execute:function(context,settings,type){$('div.collapsible',context).once('fieldgroup-effects',function(){var $wrapper=$(this),$toggler=$('span.field-group-format-toggler:first',$wrapper),$link=$('<a class="field-group-format-title" href="#"></a>');$link.prepend($toggler.contents());if($(this).is('.required-fields')&&$(this).find('.form-required').length>0)$link.append(' ').append($('.form-required').eq(0).clone());$link.appendTo($toggler);$link.click(function(){var wrapper=$wrapper.get(0);if(!wrapper.animating){wrapper.animating=true;var speed=$wrapper.hasClass('speed-fast')?300:1e3;if($wrapper.hasClass('effect-none')&&$wrapper.hasClass('speed-none')){$('> .field-group-format-wrapper',wrapper).toggle()}else if($wrapper.hasClass('effect-blind')){$('> .field-group-format-wrapper',wrapper).toggle('blind',{},speed)}else $('> .field-group-format-wrapper',wrapper).toggle(speed);wrapper.animating=false};$wrapper.toggleClass('collapsed');return false})})}};Drupal.behaviors.fieldGroup={attach:function(context,settings){settings.field_group=settings.field_group||Drupal.settings.field_group;if(settings.field_group==undefined)return;$.each(Drupal.FieldGroup.Effects,function(func){var type=func.toLowerCase().replace("process","");if(settings.field_group[type]!=undefined&&$.isFunction(this.execute))this.execute(context,settings,settings.field_group[type])});$('.fieldset-wrapper .fieldset > legend').css({display:'block'});$('.vertical-tabs fieldset.fieldset').addClass('default-fallback');$('.group-wrapper .horizontal-tabs-panes > fieldset',context).once('group-wrapper-panes-processed',function(){var fieldgroupID='field_group-'+$(this).attr('id');$(this).attr('id',fieldgroupID)});$('.group-wrapper ul li').once('group-wrapper-ul-processed',function(){var fieldGroupNavigationListIndex=$(this).index();$(this).children('a').click(function(){var fieldset=$('.group-wrapper fieldset').get(fieldGroupNavigationListIndex),hashUrl=$(fieldset).attr('id').replace(/^field_group-/,'').split(' ')[0];window.location.hash=hashUrl})})}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.soundonsound.com/sites/all/modules/field_group/field_group.js. */
;/*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.soundonsound.com/sites/all/modules/ajaxblocks/ajaxblocks.js. */
(function($){Drupal.ajaxblocksSendRequest=function(request,delay){if(delay){setTimeout(function(){Drupal.ajaxblocksSendRequest(request,0)},delay);return};$.ajax({url:((typeof Drupal.settings.ajaxblocks_path!=='undefined')?Drupal.settings.ajaxblocks_path:(Drupal.settings.basePath+Drupal.settings.pathPrefix+"ajaxblocks")),type:"GET",dataType:"json",data:request+'&nocache=1',cache:false,success:function(data){Drupal.freezeHeight();for(var id in data)Drupal.ajaxblocksSetBlockContent(id,data[id]);Drupal.unfreezeHeight()}})};Drupal.ajaxblocksSetBlockContent=function(id,data){if(data.delay){setTimeout(function(){data.delay=0;Drupal.ajaxblocksSetBlockContent(id,data)},data.delay);return};var wrapper=$('#block-'+id+'-ajax-content');if(!wrapper)return;var context=wrapper.parent();Drupal.detachBehaviors(context);if(!context)return;$('#block-'+id).addClass('ajaxblocks-loaded');context.html(data.content);if(data.ajaxblocks_settings)$.extend(true,Drupal.settings,data.ajaxblocks_settings);Drupal.attachBehaviors(context)};$(document).ready(function(){if(typeof Drupal.settings.ajaxblocks!=='undefined')Drupal.ajaxblocksSendRequest(Drupal.settings.ajaxblocks,Drupal.settings.ajaxblocks_delay)});$(window).load(function(){if(typeof Drupal.settings.ajaxblocks_late!=='undefined')Drupal.ajaxblocksSendRequest(Drupal.settings.ajaxblocks_late,Drupal.settings.ajaxblocks_late_delay)})})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.soundonsound.com/sites/all/modules/ajaxblocks/ajaxblocks.js. */
;/*})'"*/
(function ($) {
  var u_menu;
  var cart;
  var search;
  var l_in;
  var m_nav;
  var art_lnk;
  var header;
  var geo_run;

  // Let this run before other behaviors
  Drupal.behaviors['sos_menus.weight'] = -10;
  // Needed to ensure login popup works.
  Drupal.behaviors['sos_users.weight'] = -11;
  Drupal.behaviors['sos_geoip.weight'] = 9;
  Drupal.behaviors['eu_cookie_compliance_popup.weight'] = 10;

  Drupal.theme.prototype.soundOnSoundExampleButton = function (path, title) {
    // Create an anchor element with jQuery.
    return $('<a href="' + path + '" title="' + title + '">' + title + '</a>');
  };

  Drupal.behaviors.sos_geoip = {
    attach: function (context, settings) {
      var region = $.cookie('STYXKEY_region');

      if (geo_run) {
        // Ensure we only run the GeoIP lookup once - AjaxBlocks reattaches behaviours.
        checkRegionContent(region);
        return;
      }
      geo_run = true;

      if (!region || !region.length) {
        var url = Drupal.settings.basePath + Drupal.settings.pathPrefix + 'sos-geoip-check';
        var data = {};
        $.ajaxSetup({async: false});
        $.getJSON(url, data, function (data) {
          $.cookie("STYXKEY_region", data.region, { expires: 7, path: '/' });
          $.cookie("geoip_country", data.country, { expires: 7, path: '/' });

          if (typeof googletag.enableServices === 'function') {
            googletag.cmd.push(function() {
              googletag.pubads().setTargeting("Region", dfpRegion(data.region));
            });
            googletag.enableServices();
            googletag.pubads().refresh();
          }
          else {
            console.log('Ad blocker in place (1)');
          }
        });
        $.ajaxSetup({async: true});
      }
      else {
        googletag.cmd.push(function() {
          googletag.pubads().setTargeting("Region", dfpRegion(region));
        });

        if (typeof googletag.enableServices === 'function') {
          googletag.enableServices();
          googletag.pubads().refresh();
        }
        else {
          console.log('Ad blocker in place (2)');
        }
      }

      // Cookie always set by this point.
      region =  $.cookie('STYXKEY_region');
      checkRegionContent(region);
      console.log('Region: ' + region);
    }
  };

  function checkRegionContent(region) {
    var css_lbl = '.uk';
    var region_ok = false;

    if (region == 'Americas') {
      css_lbl = '.us';
    }
    else if (region == 'Australasia') {
      css_lbl = '.au';
    }
    else if (region == 'India') {
      css_lbl = '.in';
    }

    if ($(css_lbl).not('.sm-icon')[0]) {
      region_ok = true;
    }

    if (css_lbl != '.us') {
      $('.us').css('display', 'none');
    }

    if (css_lbl != '.in') {
      $('.in').not('.sm-icon').css('display', 'none');
    }

    if (css_lbl != '.au') {
      $('.au').css('display', 'none');
    }

    if (region_ok && css_lbl != '.uk') {
      $('.uk').css('display', 'none');
    }
    else if (!region_ok) {
      css_lbl = '.uk';
    }

    // Show the region we have selected.
    $(css_lbl).css('display', 'inline');

    console.log('CSS lbl: ' + css_lbl);
    console.log('Region ok: ' + (region_ok == true));
  }

  function dfpRegion(region) {
    return region.replace(/[()]/g, '');
  }

  Drupal.behaviors.sos_menus = {
    attach: function (context, settings) {
      $('.menu-block-1', context).once(function () {
        if (window.DeviceOrientationEvent) {
          window.addEventListener('orientationchange', function(context) {
            mobileAdapt(context);
          },
          false);

          window.addEventListener('resize', function(context) {
            mobileAdapt(context);
          });
        }

        mobileAdapt(context);
      });

      $('.node--teaser .media--video, .node--teaser .file-video .content, .block--sos-youtube .views-row, .media-video a', context).once(function () {
        $(this).prepend('<div class="play"></div>');
      });
      $('.block--sos-youtube .play', context).once(function () {
        $(this).addClass('vid');
      });

      $('.facetapi-inactive', context).not('.facetapi-zero-results').once(function () {
        $(this).attr('title', Drupal.t('Click to apply filter'));
      });

      $('.node--teaser', context).hover(function() {
        $(this).find('img').addClass('hov');
        $(this).find('.node--content-wrapper').addClass('hov');

      },
      function() {
        $(this).find('img').removeClass('hov');
        $(this).find('.node--content-wrapper').removeClass('hov');
      });
    }
  };

  function mobileAdapt(context) {
    if (Drupal.settings.responsive_menus && $(window).width() <= Drupal.settings.responsive_menus[0].media_size) {
      var prefix = document.createElement('span');
      var new_search = true;
      prefix.innerHTML = '<a href="">More...</a>';

      //header = $('header').clone();
      m_nav  = $('#block-menu-block-1').clone();
      u_menu = $('#block-system-user-menu').clone();
      cart   = $('#block-commerce-cart-cart').clone();
      if (new_search) {
        search = $('#block-sos-tools-sos-tools-search').clone();
      }
      else {
        search = $('#block-search-form').clone();
      }

      // Grab login link and make it a separate element on the page.
      $('#block-system-user-menu a[href="/user/login"]').parent().prependTo('body').wrap('<ul class="mob-ll"></ul>');
      $('#block-system-user-menu a[href="/user/logout"]').parent().prependTo('body').wrap('<ul class="mob-ll"></ul>');

      $('#block-system-user-menu .menu').wrap('<ul></ul>').appendTo((".menu-block-1") + ' ul:first-child').wrap('<li></li>').before(prefix);
      $('#block-system-user-menu').remove();
      $('.menu-block-1 li').removeAttr('class');

      $('#block-commerce-cart-cart .block__content').appendTo((".menu-block-1" + ' ul:first-child')).wrap('<li></li>').removeClass('block__content').addClass('block--cart-mean');
      $('#block-commerce-cart-cart').remove();

      if (new_search) {
        $('#block-sos-tools-sos-tools-search .block__content').appendTo((".menu-block-1") + ' ul:first-child').wrap('<li></li>').removeClass('block__content').addClass('block--search-mean');
        $('#block-sos-tools-sos-tools-search').remove();
      }
      else {
        $('#block-search-form .block__content').appendTo((".menu-block-1") + ' ul:first-child').wrap('<li></li>').removeClass('block__content').addClass('block--search-mean');
        $('#block-search-form').remove();
      }

      //$('header').remove();
      l_in = $('#block-sos-users-sos-logged-in').remove();
      art_lnk = $('#block-sos-articles-sos-articles-sidebar').detach();
    } else {
      if (u_menu) {
        // Put the menus back.
        u_menu.appendTo($('.l-region--header'));
        cart.appendTo($('.l-region--header'));
        search.appendTo($('.l-region--header'));
        $('.mob-ll').remove();
        $('#block-menu-block-1').replaceWith(m_nav);
        art_lnk.insertAfter('#block-dfp-sos-video-ad-300x250');

        $('.l-region--navigation block--menu-block-1').removeClass('')
      }
    }
  }
})(jQuery);

;/*})'"*/
;/*})'"*/
/* Source and licensing information for the line(s) below can be found at https://www.soundonsound.com/sites/all/themes/sound_on_sound/js/orientation-refresh.js. */
(function($){Drupal.behaviors.orientationRefresh={attach:function(context,settings){if(window.DeviceOrientationEvent)window.addEventListener('orientationchange',function(){googletag.pubads().refresh()},false)}}})(jQuery);;
/* Source and licensing information for the above line(s) can be found at https://www.soundonsound.com/sites/all/themes/sound_on_sound/js/orientation-refresh.js. */
;/*})'"*/
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','//connect.facebook.net/en_US/fbevents.js');
    fbq('init', '2320784461577267');fbq('track', "PageView");
;/*})'"*/
;/*})'"*/
