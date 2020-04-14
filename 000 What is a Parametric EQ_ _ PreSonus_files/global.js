var presonus = {
    apiHost: 'wwwdandev.presonus.com',
    prodApiHost:'presonus.com',
    environment: null,
    globalNavHTML: '\
        <div id="mobile_nav_overlay" style="display: none;">\
        </div>\
        <div id="globalNav">\
            <nav class="container">\
                <ul class="global-links">\
        		    <li class="presonus-com">\
        			    <a href="https://www.presonus.com">PreSonus.com</a>\
                    </li>\
            		<li class="shop">\
            			<a href="https://shop.presonus.com/">Shop</a>\
            		</li>\
            		<li class="commercial">\
            			<a href="http://commercial.presonus.com/">PreSonus Commercial</a>\
            		</li>\
                        <li class="nimbit">\
                            <a href="http://nimbit.com">Nimbit</a>\
                        </li>\
            		<li class="translate" style="display: none;">\
            			<span id="translate_page">Translate</span>\
            		</li>\
            	</ul>\
            </nav>\
        </div>\
    ',
    globalUserHTML: '\
        <div id="global_user" class="profile resize-profile">\
            <div id="separator" style="display: none;"></div>\
        	<div class="thumb-holder" style="">\
        		<img src="" width="40" class="thumb" style="">\
        		<div id="user_details">\
            		<div class="username"></div>\
                    <div class="useractions"><a class="link account">My Account</a> | <a class="link logout">Log Out</a></div>\
        		</div>\
        	</div>\
        </div>\
    ',
    templates: false,
    translations: false,
    defaultLanguage: 'english',
    langMap: {
        en: {
            'language_name': 'English',
            'english_language_name': 'English',
            'id': 'english'
        },
        fr: {
            'language_name': 'Français',
            'english_language_name': 'French',
            'id': 'french'
        },
        de: {
            'language_name': 'Deutsch',
            'english_language_name': 'German',
            'id': 'german'
        },
        jp: {
            'language_name': '日本語',
            'english_language_name': 'Japanese',
            'id': 'japanese'
        },
        ja: {
            'language_name': '日本語',
            'english_language_name': 'Japanese',
            'id': 'japanese'
        },
        cn: {
            'language_name': '汉语',
            'english_language_name': 'Chinese',
            'id': 'chinese'
        },
        zh: {
            'language_name': '汉语',
            'english_language_name': 'Chinese',
            'id': 'chinese'
        },
        es: {
            'language_name': 'Espanol',
            'english_language_name': 'Spanish',
            'id': 'spanish'
        },
        tr: {
          'language_name': 'Türk',
          'english_language_name': 'Turkish',
          'id': 'turkish'
        }
    },
    user: false,
    device: false,
    setDevice: function() {
        if (navigator.userAgent.match(/iPad/i    )) presonus.device = 'iPad';
        if (navigator.userAgent.match(/iPhone/i)) presonus.device = 'iPhone';
        if (navigator.userAgent.match(/iPod/i    )) presonus.device = 'iPod';
        if (navigator.userAgent.match(/android/i    )) presonus.device = 'android';
    },
    parseUrl: function(url) {
        // This function was written by JP
        var o = { url:'' + url, args:{} }; // coerce url to string so document.location may be passed directly
    
        this.re1 || (this.re1 = /^([^:]*):?\/\/([^\/:]+)(:\d+)?\/([^\#?]*)(\#[^\?]*)?([?].*)?/);
    
        if (o.url.match(this.re1)) {
            o.protocol = RegExp.$1 ? RegExp.$1 : '';
            o.host         = RegExp.$2 ? RegExp.$2 : '';
            o.port         = RegExp.$3 ? RegExp.$3.substr(1) : '';
            o.pathname = RegExp.$4 ? RegExp.$4 : '';
            o.hash         = RegExp.$5 ? RegExp.$5.substr(1) : '';
            o.search     = RegExp.$6 ? RegExp.$6.substr(1) : '';
            o.args         = o.search == '' ? false : unescapeArray(o.search);

            this.re2 || (this.re2 = /(store|artist)(s|data)\/([^\/]+)/);
    
            if (o.pathname.match(this.re2)) o.dirname = RegExp.$3 ? RegExp.$3 : '';
        }
    
        o.assemble = function() {
            var s = (this.protocol ? this.protocol + ':' : '') + '//' + o.host;
    
            s += (this.port ? this.port + ':' : '') + '/' + this.pathname;
    
            if (this.args) s += '?' + escapeArray(this.args);
    
            if (this.hash) s += '#' + hash;
    
            return s;
        };
    
        return o;
    },
    propagateSsl: function(url) {
        if (url && url.toString().match(/^http:/i)) {
            var parsed = presonus.parseUrl(url);
            parsed.protocol = presonus.parseUrl(document.location).protocol;
            url = parsed.assemble();
        }
        return url;
    },
    initEnvironment: function(env) {
	    // automatically hide popovers on a body click.
	    $('body').on('click', function (e) {
	        $('.showpopover').each(function () {
                //the 'is' for buttons that trigger popups
                //the 'has' for icons within a button that triggers a popup
                if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                     $(this).popover('hide');
                }
	        });
		});

        presonus.setDevice();
        presonus.environment = env;
        presonus.initGlobalNav();
        presonus.getTemplatesAndUser(function(templates) {
            if (presonus.environment == 'mypresonus') {
                presonus.ajax('GET', '/profile/getPageTranslations', null, function(translations) { // get available languages for pages
                    presonus.ajax('GET', '/language?' + new Date().getTime(), null, function(user_language) { // get user preference on language
                        presonus.translations = translations.pages; // save available languages
                        if (user_language.code && presonus.langMap[user_language.code]) {	// if they have lang pref saved, set locally and save to cookie
                            presonus.defaultLanguage = presonus.langMap[user_language.code].id;
                            presonus.setCookie('language', presonus.langMap[user_language.code].id, 8760);
                        } else { // if not saved
                            if (translations.defaultTrans && presonus.langMap[translations.defaultTrans]) presonus.defaultLanguage = presonus.langMap[translations.defaultTrans].id; // revert to default
                            if (presonus.getCookie('language')) presonus.defaultLanguage = presonus.getCookie('language'); // or read from cookie
                        }

		    	        // save default lang to session
                        presonus.ajax('GET', '/profile/setSessionLang/' + presonus.defaultLanguage + '?' + new Date().getTime(), null, function(data) {
                            if (!data) { // if their language is not available, go get english
                                presonus.ajax('GET', '/profile/getLanguage/mypresonus/english', null, function(language) {
                                    mypresonus.language = language;
                                    go(true);
                                });
                            } else if (data.refresh) {
                                location.reload();
                            } else {
                                if (presonus.defaultLanguage != 'english') {
                                    // get english defaults and replace with selected language entry-by-entry
                                    // except getting the english one doesn't currently work
                                    presonus.ajax('GET', '/profile/getLanguage/mypresonus/english', null, function(language) {
                                        presonus.ajax('GET', '/profile/getLanguage/mypresonus/' + presonus.defaultLanguage, null, function(otherLanguage) {
                                            for (var i in language) {
                                                if (otherLanguage[i]) language[i] = otherLanguage[i];
                                            }
                                            mypresonus.language = language;
                                            go(true);
                                        });
                                    });
                                } else {
                                    presonus.ajax('GET', '/profile/getLanguage/mypresonus/' + presonus.defaultLanguage, null, function(language) {
                                        mypresonus.language = language;
                                        go(true);
                                    });
                                }
                            }
                        });
                    });
                });
            } else if ( presonus.environment == 'homepage' || presonus.environment === 'commercial' || presonus.environment === 'shop') {
		    /**presonus.ajax('GET', '/localize/getPageTranslations', null, function(translations) {
			    presonus.translations = translations.pages;
			    if (presonus.getCookie('language')) presonus.defaultLanguage = presonus.getCookie('language'); // or read from cookie
			go();
		    });*/
		    if (presonus.getCookie('language')) presonus.defaultLanguage = presonus.getCookie('language'); // or read from cookie
		    go();
	    } else {
                go();
            }
            
            function go(translate) {
                presonus.templates = templates;
                if (presonus.environment == 'zendesk' || presonus.environment == 'knowledgebase') {
                    build();
                } else {
                    presonus.loadTemplate('/assets/templates/templates.php', function(envTemplates) {
                        for (template in envTemplates) {
                            if (presonus.environment == 'mypresonus' && translate) {
                                presonus.templates[template] = mypresonus.translateTemplate(envTemplates[template]);
                            } else {
                                presonus.templates[template] = envTemplates[template];
                            }
                        }
                        build();
                    });
                }
            }
            
            function build() {
                presonus.loadFooter($('.footer-container'));
                presonus.getUrls(function(urls) {
                    presonus.urls = urls;
                    presonus.populateGlobalNav();
                    if (window.mypresonus) {
                        presonus.ajax('GET', '/auth/getUserDetails', null, function(data) {
                            if (data) presonus.user = mypresonus.user = data.user;
                            presonus.populateEnvNav();
                        }, 'userXHR');
                        mypresonus.user = presonus.user;
                    } else {
                        presonus.populateEnvNav();
                    }
                })
            }
        });
    },
    loadTemplate: function(url, callBack) {
        var maps = presonus.templates ? presonus.templates : presonus.templates = {};
        url = url.replace(/^https?:/i, document.location. col);
        if (maps[url]) {
            setTimeout(function() { 
                callBack(maps[url]); 
            }, 1); 
        } else {
            $.get(url, function(txt) {
                maps[url] = {};
                var pairs = txt.split(/<!--%\s*/);
                for (var i = 0; i < pairs.length; i++) {
                    if (pairs[i].match(/([^\s]+)\s*%-->\s*([\s\S]*)/)) maps[url][RegExp.$1] = RegExp.$2;
                }
                callBack(maps[url]);
            });
        }
    },
    getTemplatesAndUser: function(callBack) {
        presonus.loadTemplate('/vendor/presonusaudio/presonus-global-style-assets/global/templates.php', function(globalTemplates) {
            if (presonus.getCookie('pae_user2')) {
                var hashedUserData = decodeURIComponent(presonus.getCookie('pae_user2'));

                userData = JSON.parse(decodeURIComponent(atob(hashedUserData)));
                presonus.user = userData;
            } else {
                presonus.user = false;
            }
            for (template in globalTemplates) {
                presonus.templates[template] = globalTemplates[template];
            }
            callBack(presonus.templates);
        });
    },
    populateEnvNav: function() {
        if (presonus.environment == 'mypresonus') {
            if (presonus.user) {
                $('.header-content').append(presonus.templates['mypresonus_nav']);
                $('#mypresonus_nav ul li, footer ul.footer-sitemap li').unbind().click(function() {
                    if (mypresonus && mypresonus.displaySection) mypresonus.displaySection(this.id);
                });
                if (presonus.user.is_dealer) {
                    $('#dealer').show();
                }
                mypresonus.route();
            }
            $('#my_hamburger').click(function() {
                presonus.showMobileGlobalNav();
            });
        } else if (presonus.environment == 'marketplace') {
            shop.populateHeader();
            $('#mobile_browse, #mobile_search').click(function() {
                presonus.showMobileGlobalNav();
            });
        }
    },
    checkPageTranslation: function() {
        var isTranslated = false;
        if (presonus.environment == 'homepage' || presonus.environment === 'commercial' || presonus.environment === 'shop') {
		    isTranslated = $('body').hasClass('has-trans');
        } else {
		    var path = window.location.pathname;
		    var sections = path.split('/');
		    sections.splice(0, 1);
		    if (sections.length == 1 && sections[0] == "") sections[0] = '/';
		    if (sections[sections.length-1] == '') sections.splice(sections.length-1, 1);

		    if (presonus.translations['*']) {
			    presonus.translations[window.location.pathname] = presonus.translations['*'];
			    isTranslated = true;
		    }
    		if (sections.length) {
	    		if (presonus.environment == 'mypresonus' && sections.length == 1 && sections[0] == "/") {
		    		presonus.translations['/profile'] = presonus.translations['profile/*'];
			    	isTranslated = true;
			    } else if (sections.length == 1 && presonus.translations[sections[0]]) {
				    presonus.translations[window.location.pathname] = presonus.translations[sections[0]];
				    isTranslated = true;
			    } else if (presonus.translations[sections[0] + '/*']) {
				    presonus.translations[window.location.pathname] = presonus.translations[sections[0] + '/*'];
				    isTranslated = true;
			    } else if (presonus.translations[window.location.pathname]) {
				    presonus.translations[window.location.pathname] = presonus.translations[window.location.pathname];
				    isTranslated = true;
			    }
		    }
        }
        return isTranslated;
    },
    initGlobalNav: function() {
        if ($('#globalNav').length) {
            $('#globalNav, #mobile_nav_overlay').each(function() {
                $(this).remove();
            });
        }
        $('.header-container').prepend(presonus.globalNavHTML);
        if (presonus.environment == 'homepage' || presonus.environment == 'studioone' || presonus.environment == 'hear' || presonus.environment == 'zendesk' || presonus.environment == 'knowledgebase' || presonus.environment === 'commercial' || presonus.environment === 'shop') $('#globalNav').addClass('fixed').addClass('homepage');
        if (presonus.user && presonus.environment != 'zendesk') {
            $('.header-container').addClass('is_logged_in');
            presonus.populateGlobalNav();
        }
        if (presonus.environment == 'homepage' || presonus.environment === 'commercial' || presonus.environment === 'shop') {

		if ($('body').hasClass('has-trans')==true) {
			if (presonus.getCookie('language')) presonus.defaultLanguage = presonus.getCookie('language');
			var html = presonus.buildLanguageSelectorMessage( presonus.defaultLanguage );
			html += '<select id="language_picker" class="form-control presonus"></select>';
			var title = presonus.buildLanguageSelectorTitle( presonus.defaultLanguage );
			$('#translate_page').text(title);
			$('li.translate').show();

			$(document).off('click', '#translate_page');
			$(document).on('click', '#translate_page', (function () {
				presonus.simpleOverlay(html, title, 'sm', function () {
					var picker = $('#language_picker');
					// get localized URL data and put it into the dropdown
					var pp = $('body').data('localized-urls');
					for (var ll in pp) {
						picker.append('<option value="' + ll + '" data-url="'+ pp[ll].url +'">' + pp[ll].name + '</option>');
					}

					picker.val(presonus.defaultLanguage);
					picker.off().change(function () {
						var thisLang = this.value;
						var thisUrl = $('option:selected',$(this)).data('url');
						presonus.setCookie('language', thisLang,8760);
						$.post('/localize/setLanguage/' + thisLang, {url: location.href}, function (data) {
							//location.reload();
							var newUrl = location.href;
							if ( thisUrl != '' ) {
								window.location = thisUrl;
							} else {
								window.location = newUrl;
							}
						});
					});
				});
			}));
		}
	}
    },
    populateGlobalNav: function() {
	//    console.log('populate global nav');
        if ($('#globalNav').length) {
            $('#globalNav, #mobile_nav_overlay').each(function() {
                $(this).remove();
            });
        }
        $('.header-container').prepend(presonus.globalNavHTML);
        if (presonus.environment == 'homepage' || presonus.environment == 'studioone' || presonus.environment == 'hear' || presonus.environment == 'zendesk' || presonus.environment == 'knowledgebase' || presonus.environment === 'commercial' || presonus.environment === 'shop') $('#globalNav').addClass('fixed homepage');
        var url = 'https://my.presonus.com';
        if (presonus.urls && presonus.urls.mypresonus) url = presonus.urls.mypresonus;
        if (presonus.user) {
            if (presonus.environment != 'zendesk') {
                $('.header-container').addClass('is_logged_in');
                $('ul.global-links').after(presonus.globalUserHTML);
                if (presonus.user.photoURL && presonus.user.photoURL != '//pae-web.presonusmusic.com/global/images/default_avatar.jpg') {
                    $('.thumb-holder img').attr('src', presonus.user.photoURL);
                } else {
                    $('.thumb-holder img').attr('src', '//pae-web.presonusmusic.com/global/images/default_avatar.jpg');
                }
                
                $('.username').text((presonus.user.firstName || presonus.user.firstname) + ' ' + (presonus.user.lastName || presonus.user.lastname));
                
                if (presonus.environment == 'homepage' || presonus.environment == 'studioone' || presonus.environment == 'hear' || presonus.environment === 'commercial' || presonus.environment === 'shop') {
                    $('#global_user').css('color', '#333');
                    $('#global_user #separator').hide();
                    $('#user_details').hide();
                    $('.useractions .account').attr('href', url);
                    $('.useractions .logout').attr('href', url + '/auth/logout');
                    $('.useractions .link').css('color', '#333');
                    $('#global_user').mouseenter(function() {
                        $('#global_user').css('background-color', '#e2e2e2');
                        $('.thumb-holder img').animate({width:'100px', height: '100px'}, 200);
                        $('#global_user').animate({paddingLeft: '15px', paddingRight: '15px', paddingBottom: '15px'}, 100);
                        $('#user_details').show(200);
                    }).mouseleave(function() {
                        $('#user_details').hide(200);
                        $('.thumb-holder img').animate({width:'40px', height: '40px'}, 200);
                        $('#global_user').css('background-color', '');
                        $('#global_user').animate({paddingLeft: '0px', paddingRight: '0px', paddingBottom: '0px'}, 100);
                    });
                } else {
                    //if (!presonus.device) $('#global_user #separator').show();
                    $('.useractions .account').attr('href', url);
                    $('.useractions .logout').attr('href', url + '/auth/logout');
                }
            }            
        } else {
            $('ul.global-links').after('<div class="global_login_link">Log In to My.PreSonus</div>');
            if (presonus.device) $('.global_login_link').text('Log In');
            $('.global_login_link').click(function() {
	            url += '/auth/login';
	            if (presonus.environment == 'marketplace' && presonus.urls && presonus.urls.shop) {
                    url += '?redirect_to=' + encodeURIComponent(presonus.urls.shop);
                } else if (presonus.environment === 'shop' && presonus.urls && presonus.urls.shop) {
                    url = presonus.urls.shop + '/auth/login';
                }
                window.location = url;
            });
        }

        if (presonus.environment == 'homepage' || presonus.environment === 'commercial' || presonus.environment === 'shop') {
		    if (presonus.checkPageTranslation()) {
			    $('#translate_page').text(presonus.buildLanguageSelectorTitle( presonus.defaultLanguage ));
			    $('li.translate').show();
		    }
		    if ( $('.local-fallback').length) {
			    $('.local-fallback').slideToggle();
		    }
        }
        
        if (presonus.environment == 'mypresonus') {
            if (presonus.checkPageTranslation()) {
		        $('#translate_page').text(presonus.buildLanguageSelectorTitle(presonus.defaultLanguage));
		        $('li.translate').show();
                $('#translate_page').unbind().click(function() {
			        var html = presonus.buildLanguageSelectorMessage( presonus.defaultLanguage );
			        html += '<select id="language_picker" class="form-control presonus"></select>';
			        var title = presonus.buildLanguageSelectorTitle( presonus.defaultLanguage );
                    presonus.simpleOverlay(html, title, 'sm', function() {
                        presonus.checkPageTranslation();
                        for (var ll in presonus.translations[window.location.pathname]) {
                            $('#language_picker').append('<option value="' + presonus.translations[window.location.pathname][ll] + '">' + presonus.translations[window.location.pathname][ll].charAt(0).toUpperCase() + presonus.translations[window.location.pathname][ll].slice(1) + '</option>');
                        }
                        // DGP - 2016-07 - section removed per Dave. old version that didn't do anything
                        $('#language_picker').val(presonus.defaultLanguage);
                        $('#language_picker').unbind().change(function() {
                            var thislang = this.value;
                            presonus.setCookie('language', thislang,8760);
                            presonus.ajax('GET', '/profile/setSessionLang/' + thislang + '?' + new Date().getTime(), null, function(data) {
                                // this next method can also be called from shop repo, so when shop gets localized, 
                                // call this method to update user language preference.
                                if (mypresonus.user) {
                                    presonus.ajax('POST', '/language/save/', {"name": thislang}, function(langsave) {
                                        location.reload();
                                    });
                                } else {
                                    location.reload();
                                }
                            });
                        });
                    });
                });
            } else {
                $('li.translate').hide();
            }
        }
        
        if (presonus.device) $('#global_user').unbind('mouseenter').unbind('mouseleave');
        if (presonus.environment == 'mypresonus' || presonus.environment == 'marketplace') {
            $('.thumb-holder img').unbind().click(function() {
                presonus.showMobileGlobalNav();
            });
        }
        
        if (presonus.environment == 'homepage' || presonus.environment === 'commercial' || presonus.environment === 'shop') {
            $('.thumb-holder img').off().click(function() {
                window.location = 'https://my.presonus.com';
            });
        }
        
    },
    showMobileGlobalNav: function() {
        $('#mobile_nav_overlay').fadeIn();
        $('#mobile_nav_overlay').append('<div class="mobile_nav_close"><svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 25 25" enable-background="new 0 0 25 25" xml:space="preserve"><g><line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="0.9" y1="0.9" x2="24.1" y2="24.1"/><line fill="none" stroke="#FFFFFF" stroke-miterlimit="10" x1="24.1" y1="0.9" x2="0.9" y2="24.1"/></g></svg></div>');
        $('body').css('overflow', 'hidden');
        $('#global_user').appendTo('#mobile_nav_overlay');
        $('#user_details').show();
        $('.thumb-holder img').unbind('click');
        if (presonus.environment == 'mypresonus') {
            mypresonus.showMobileNav();
        } else if (presonus.environment == 'marketplace') {
            shop.showMobileNav();
        }
        
        $('.mobile_nav_close').unbind().click(function() {
            presonus.closeMobileGlobalNav();
        });
    }, 
    closeMobileGlobalNav: function() {
        $('#mobile_nav_overlay').fadeOut(200, function() {
            $('#mobile_nav_overlay').html('');
            presonus.populateGlobalNav();
        });
        $('body').css('overflow', '');
        if (presonus.environment == 'mypresonus') {
            $('#mypresonus_nav').appendTo('.header-content').css('display', '');
            presonus.switchNav();
        } else if (presonus.environment == 'marketplace') {
            $('#marketplace_nav').appendTo('.header-content').css('display', '');
            presonus.switchNav();
        }
    },
    switchNav: function() {
        var containerWidth = $('.header-content').width();
        var logoWidth = $('.left_logo').width();
        var navRightOffset = $('.environment_nav').css('right');
        if (navRightOffset == 'auto') {
            navRightOffset = 0;
        } else if (navRightOffset && navRightOffset.slice && navRightOffset.slice(-2) == 'px') {
            navRightOffset = navRightOffset.slice(0, -2)-0;
        }
        var navWidth = $('.environment_nav').width() + navRightOffset;
        
        var showingMainNav = $('.environment_nav').css('display') == 'block';
        var showingMobileNav = $('.environment_mobile_nav').css('display') == 'block';
        if (showingMainNav) {
            if ((navWidth + logoWidth + 10) > (containerWidth)) {
                $('.environment_nav').hide();
                $('.environment_mobile_nav').show();
            }
        } else if (showingMobileNav) {
            if ((navWidth + logoWidth + 10) < (containerWidth)) {
                $('.environment_nav').show();
                $('.environment_mobile_nav').hide();
            }
        }
    },
    loadFooter: function(container) {
        if (presonus.environment === 'commercial') {
		    container.html(presonus.templates.footer_commercial);
	    } else {
		    container.html(presonus.templates.footer);
	    }
        var envLinks = presonus.templates.footer_global_environment_links;
        if (presonus.environment == 'mypresonus') envLinks = presonus.templates.footer_mypresonus_environment_links;
        if (presonus.environment == 'homepage') envLinks = presonus.templates.footer_homepage_environment_links;
        if (presonus.environment == 'commercial') envLinks = presonus.templates.footer_homepage_environment_links;
        if (presonus.environment == 'studioone') envLinks = presonus.templates.footer_studioone_environment_links;
        if (presonus.environment == 'hear') envLinks = presonus.templates.footer_hear_environment_links;
        if (presonus.environment == 'marketplace') envLinks = presonus.templates.footer_marketplace_environment_links;
        if (presonus.environment == 'shop') envLinks = presonus.templates.footer_shop_environment_links;

        $('#environment_links', container).html(envLinks);
        if (presonus.environment == 'mypresonus' && $('#login_page').length) $('#environment_links', container).hide();
        if (presonus.environment == 'mypresonus') $('#footer_signup').hide();
        
        //load php breadcrumbs if they exist.
        if ($('#static_breadcrumbs').length) {
            $('.footer-breadcrumbs .breadcrumbs').html($('#static_breadcrumbs').html());
            $('#static_breadcrumbs').remove();
        }
        
        var date = new Date();
        $('#footer_copy_year').text(date.getFullYear());
    },
    downloadFile: function(url) {
        window.location.assign(url);
    },
    getUserDetails: function(callBack) {
        var url = '/auth/getUserDetails'
        if (presonus.environment == 'marketplace') {
            url = '/market/getUserDetails'
        } else if (presonus.environment == 'homepage' || presonus.environment === 'commercial' || presonus.environment === 'shop') {
            url = '/homepage/getUserDetails'
        } else if (presonus.environment == 'studioone') {
            url = '/index.php/auth/getUserDetails'
        }
        presonus.ajax('GET', url, null, function(data) {
            if (callBack) callBack(data);
        }, 'userXHR');
    },
    getUrls: function(callBack) {
        var url = false;
        if (presonus.environment == 'mypresonus') {
            url = '/auth/getUrls';
        } else if (presonus.environment == 'marketplace') {
            url = '/market/getUrls'
        } else if (presonus.environment === 'shop') {
            url = '/shop/getUrls'
        }

        if (url) {
            presonus.ajax('GET', url, null, function(data) {
                if (callBack) callBack(data);
            });
        } else {
            var urls = {
                "mypresonus": null,
                "shop": null,
                "site": null
            }
            if (callBack) callBack(urls);
        }
        
    },
    createCookie: function(name, value, days) {
		var expires;
		if (days) {
			var date = new Date();
			date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
			expires = "; expires=" + date.toGMTString();
		} else {
			expires = "";
		}
		document.cookie = encodeURI(name) + "=" + encodeURI(value) + expires + "; path=/";
	},
	getYouTubeIDFromURL: function(url) {
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        if (match && match[7].length == 11) {
            return match[7];
        }
    },
    getCookie: function(name) {
        var nameEQ = name + "=";
    	var ca = document.cookie.split(';');
    	for (var i = 0; i < ca.length; i++) {
    		var c = ca[i];
    		while (c.charAt(0) == ' ') {
                c = c.substring(1, c.length);
            }
    		if (c.indexOf(nameEQ) == 0) {
                return c.substring(nameEQ.length, c.length);
            }
    	}
    	return null;
    },
    setCookie: function(name, value, hours) {
        if (hours) {
    		var date = new Date();
    		date.setTime(date.getTime() + (hours * 60 * 60 * 1000));
    		var expires = "; expires=" + date.toGMTString();
    	} else {
            var expires = "";
        }
    	document.cookie = name + "=" + value + expires + ";domain=."+presonus.prodApiHost+";path=/";
    },
    deleteCookie: function(name) {
        presonus.setCookie(name, "", -1);
    },
    showLoginPreference: function() {
        var pref = presonus.getCookie('login_method');
        if (pref) {
            $('#login_container').prepend('<div id="login_suggestion" style="text-align: center;"></div>');
            if (pref == 'presonus') {
                $('#login_suggestion').html('<div class="alert alert-success">You\'ve logged in with your PreSonus username or email in the past. Please login below.</div>');
            } else if (pref == 'google') {
                $('#login_suggestion').html('<div class="alert alert-success">You\'ve logged in with your Google Plus account in the past. Please login below.</div>');
                $('#login_suggestion').append($('#login_google'));
                
                
            } else if (pref == 'facebook') {
                $('#login_suggestion').html('<div class="alert alert-success">You\'ve logged in with your Facebook account in the past. Please login below.</div>');
                $('#login_suggestion').append($('#login_facebook'));
            } else if (pref == 'linkedin') {
                $('#login_suggestion').html('<div class="alert alert-success">You\'ve logged in with your LinkedIn account in the past. Please login below.</div>');
                $('#login_suggestion').append($('#login_linkedin'));
            }
        }
    },
    resizeModal: function() {
        var h1 = $('.modal-content').outerHeight();
        var m1 = $('.modal-dialog').css('margin-top').replace("px", "")-0;
        var m2 = $('.modal-dialog').css('margin-bottom').replace("px", "")-0;
        var windowHeight = $(window).outerHeight();
        var newHeight =    h1 + m1 + m2;
        if (newHeight > windowHeight) $('.modal-backdrop').css('height', newHeight);
    },
    simpleOverlay: function(html, title, size, onShow, onHide) {
        if (!size) size = 'lg';
        var container = '';
        container += '<div class="modal fade" id="simpleOverlay" tabindex="-1" role="dialog" aria-labelledby="basicModal" aria-hidden="true">'
        container += '    <div class="modal-dialog modal-' + size + '">'
        container += '        <div class="modal-content">'
        container += '            <div class="modal-header">'
        container += '                <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>'
        container += '                <h4 class="modal-title" id="myModalLabel">' + title + '</h4>'
        container += '            </div>'
        container += '            <div class="modal-body">'
        container +=                    html
        container += '            </div>'
        container += '            <div class="modal-footer">'
        container += '                <button type="button" class="btn btn-default btn-primary" data-dismiss="modal">Close</button>'
        container += '            </div>'
        container += '        </div>'
        container += '    </div>'
        container += '</div>'
        $('body').append(container);
        $('#simpleOverlay').modal();
        if (onShow) {
            $('#simpleOverlay').on('shown.bs.modal', function (e) {
                onShow();
            });
        }
        $('#simpleOverlay').on('hidden.bs.modal', function (e) {
            $('#simpleOverlay').remove();
            if (onHide) onHide();
        });
    },
    ajax: function(type, url, data, callBack, xhrid, raw) {
        var contentType = raw ? 'application/json' : 'application/x-www-form-urlencoded; charset=UTF-8';
        if (raw) data = JSON.stringify(data);
        if (xhrid) {
            window[xhrid] = $.ajax({
                type: type,
                url: url,
                data: data ? data : null,
                processData: !raw,
                contentType: contentType,
                success: function(data) {
                    if (data) {
                        if (typeof data == 'string') {
                            data = JSON.parse(data);
                        }
                    }
                    if (callBack) callBack(data);
                },
                statusCode: {
                    403: function() {
                        location.reload();
                    }
                },
                dataType: 'json'
            });
        } else {
            $.ajax({
                type: type,
                url: url,
                data: data ? data : null,
                processData: !raw,
                contentType: contentType,
                success: function(data) {
                    if (data) {
                        if (typeof data == 'string') {
                            data = JSON.parse(data);
                        }
                    }
                    if (callBack) callBack(data);
                },
                statusCode: {
                    403: function() {
                        location.reload();
                    }
                },

                dataType: 'json'
            });
        }
        
    },
    buildLanguageSelectorMessage: function( language )
    {
        var html = '';
	    if ( language == 'german' ) {
		    html = '<p>Ihre Sprache ist auf <strong>Deutsch</strong> eingestellt</p>';
		    html += '<p>Einige oder alle der Inhalt dieser Seite ist in mehreren Sprachen verfügbar. Wählen Sie unter Sprache. Wenn der Inhalt nicht verfügbar ist, wird es in englischer Sprache angezeigt.</p>';
	    } else if ( language == 'spanish' ) {
		    html = '<p>Su lengua se establece en <strong>Español</strong></p>';
		    html += '<p>Algunos o todos el contenido de esta página está disponible en varios idiomas. Seleccione su idioma a continuación. Si el contenido no está disponible, se mostrará en Inglés.</p>';
	    } else if ( language == 'japanese' ) {
		    html = '<p>お使いの言語が<strong>日本語</strong>に設定されています</p>';
		    html += '<p>このページのコンテンツの一部または全部を複数の言語で利用可能です。下記の言語を選択してください。コンテンツが使用できない場合、それは、英語で表示されます。</p>';
	    } else if ( language == 'chinese' ) {
		    html = '<p>您的语言设置为<strong>中国</strong></p>';
		    html += '<p>部分或全部此页面上的内容是提供多语言版本。在下面选择您的语言。如果内容不可用，它将以英文显示。</p>';
	    } else if ( language == 'french' ) {
		    html = '<p>Votre langue est le <strong>français</strong></p>';
		    html += '<p>Certains ou la totalité du contenu de cette page est disponible en plusieurs langues. Choisissez votre langue ci-dessous. Si le contenu ne sont pas disponibles, il sera affiché en anglais.</p>';
	    } else if ( language == 'turkish' ) {
		    html = '<p>Diliniz Türkçe olarak ayarlandı.</p>';
		    html += '<p>Certains ou la totalité du contenu de cette page est disponible en plusieurs langues. Choisissez votre langue ci-dessous. Si le contenu ne sont pas disponibles, il sera affiché en anglais.</p>';
	    }
	    if ( html == '' ) {
		    html = '<p>Your language is set to <strong>' + presonus.defaultLanguage.charAt(0).toUpperCase() + presonus.defaultLanguage.slice(1) + '</strong></p>';
		    html += '<p>Some or all of the content on this page is available in multiple languages. Select your language below. If content is not available, it will be displayed in English.</p>';
	    }
        return html;
    },
	buildLanguageSelectorTitle: function ( language )
	{
		var title = '';
		if ( language == 'german' ) {
			title = 'Übersetzen';
		} else if ( language == 'spanish' ) {
			title = 'Traducir';
		} else if ( language == 'japanese' ) {
			title = '翻訳します';
		} else if ( language == 'chinese' ) {
			title = '翻译';
		} else if ( language == 'french' ) {
			title = 'Traduire';
		} else if ( language == 'czech' ) {
      title = 'Přeložit';
    } else if ( language == 'turkish' ) {
      title = 'Türk';
    }
		if ( title == '' ) {
			title = 'Translate';
		}
		return title;
	}
}