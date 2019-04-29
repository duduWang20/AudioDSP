/**
 * Globaljs
 *
 * Main script file for the theme
 *
 * @package Editr
 * @author Syamil MJ
 */

jQuery(document).ready(function ($) {

    // Remove no-js class
    $('html').removeClass('no-js').addClass('js');

    var hasTouch = false;

    if (("ontouchstart" in document.documentElement)) {
        $('html').removeClass('no-touch').addClass('touch');
        hasTouch = true;
    }

    var isiPad = navigator.userAgent.match(/iPad/i) != null;

    /** $LoadMore app */
    var LoadMoreApp = Backbone.View.extend({

        el: $('#main'),

        page: 1,

        autoLoadRunning: false,

        currentlyLoading : false,

        maxNumPages: $('#main-article-list').data('max_num_pages'),

        loadMoreButton: '<div id="load-more"><a href="#" class="btn">' + aqvars.loadMorePoststxt + '</a></div>',

        noMorePosts: '<div class="no-more-posts">No more posts to load</div>',

        events: {
            "click #load-more": "loadMore"
        },

        initialize: function () {
            _.bindAll(this, 'autoLoad', 'loadMore', 'getPosts', 'update');
            var self = this;

            this.setAutoLoadThreshold();
            this.$el.find('.loading').show();
            $(document).on('scroll', _.debounce(self.autoLoad, 200));
        },

        // num of pages to load before button appears
        setAutoLoadThreshold: function () {
            return 99;
            this.autoLoadThreshold = aqvars.is_videos ? 2 : 3;
        },

        slug: function () {
            if (aqvars.is_videos) return 'videos/page';
            return 'page';
        },

        autoLoad: function () {
            var windowHeight = $(window).height(),
                intScrollTop = $("html").scrollTop() || $("body").scrollTop(),
                documentHeight = $(document).height(),
                listBottom;

            listBottom = documentHeight - windowHeight - intScrollTop;

            if (this.page >= this.autoLoadThreshold) return false;

            if(this.currentlyLoading) return false;

            this.getPosts();
            this.$el.addClass('autoloaded');
        },

        loadMore: function () {
            var self = this;

            this.$el.find('#load-more').addClass('loading-posts').find('a').html('Loading More Posts...').attr('disabled', true);
            this.getPosts();
            return false;
        },

        getPosts: function () {

            var self = this;
            this.currentlyLoading = true;

            // check if current view is the "main" page
            if (this.$el.hasClass('disable-load-more')) return false;

            // run only if function is not already running
            if (!this.autoLoadRunning) {
                this.autoLoadRunning = true;

                var url = aqvars.home_url + '/' + this.slug() + '/' + (this.page + 1) + '/';

                Backbone.ajax({
                    url: url,
                    type: 'GET',
                }).done(function (data) {
                    self.update(data);
                }).fail(function () {
                    self.fail();
                });
            }

        },

        update: function (data) {
            if (!data) {
                return false;
            }

            // this.$el.find('.loading').hide();
            this.$el.find('#load-more').removeClass('loading-posts').find('a').html('Load More').attr('disabled', false);

            var articleList = this.$el.find('#main-article-list .article-list'),
                articles = $(data).find('#main-article-list .article-list').html();

            articleList.append(articles);

            this.page = this.page + 1;
            this.autoLoadRunning = false;

            // show featured image
            articleList.trigger('loadMore');

            if (this.page == this.autoLoadThreshold) {
                articleList.after(this.loadMoreButton);
            }

            // remove loading button
            if (this.page + 1 > this.autoLoadThreshold) {
                this.$el.find('#autoload-loading').remove();
            }

            if (this.page > this.autoLoadThreshold && this.page <= this.maxNumPages - 1) {
                this.$el.find('#load-more').fadeIn();
            } else if (this.page >= this.maxNumPages - 1) {
                this.$el.find('#load-more').css('display', 'none').remove();
                articleList.after(this.noMorePosts);
                
                if (jQuery('.no-more-posts').length > 1)
                    jQuery('.no-more-posts').first().remove();
            }

            this.currentlyLoading = false;

        },

        fail: function (data) {
            this.$el.find("#autoload-loading").remove();
            if (jQuery('.no-more-posts').length > 1)
                jQuery('.no-more-posts').first().remove();
        }

    });

    /** $Global app */
    var GlobalApp = Backbone.View.extend({

        el: $(document),

        initialize: function () {
            self = this;

            //load more posts
            if (!aqvars.is_paged && ( aqvars.is_home || aqvars.is_videos )) {
                $LoadMore = new LoadMoreApp;
            }

            $('.comment-form-fields').hide();
            $('.comment-date').prettyDate();
            this.responsiveVideos();
            this.flexslider();
            this.showFeaturedImage();
            this.dropdownMenu();
            // this.mobileNav();
        },

        events: {
            "focus #comment": "showCommentFields",
            "loadMore #main-article-list": "showFeaturedImage",
            "click #search-bar i": "toggleSearchBar",
            "click #mobilenav-toggle": "toggleMobileNav",
            "click #main-article-filter li a": "articleFilter",
            "click .list .category span": "goToCategory"
        },

        responsiveVideos: function () {
            if (jQuery().fitVids) {
                $("article").fitVids();
            }
            ;
        },

        flexslider: function () {
            if (jQuery().flexslider) {
                $('.flexslider').flexslider({
                    animation: "slide",
                    smoothHeight: true,
                });
            }
            ;
        },

        showFeaturedImage: function () {
            $('article.format-standard .featured img').each(function () {
                $(this).fadeIn().css('display', 'block');
            });
        },

        toggleMobileNav: function () {
            if ($('html').hasClass('open')) {
                $('#mobile-navigation-wrapper')
                    .slideUp(100);
                $('html').removeClass('open');
                $('#mobilenav-toggle').removeClass('open');
            } else {
                $('#mobile-navigation-wrapper')
                    .slideDown(100)
                    .css('display', 'flex');
                $('html').addClass('open');
                $('#mobilenav-toggle').addClass('open');
            }
        },

        dropdownMenu: function () {
            if (jQuery().hoverIntent) {
                $('nav#primary-nav > ul > li').hoverIntent({
                    over: function () {
                        $(this).children('ul.sub-menu').slideDown().fadeIn();
                    },
                    out: function () {
                        $(this).children('ul.sub-menu').slideUp().fadeOut();
                    },
                    timeout: 100
                });
            }
            ;
        },

        showCommentFields: function () {
            $('.comment-form-fields').slideDown();
        },

        toggleSearchBar: function () {
            $('#search-bar').toggleClass('active');
        },

        articleFilter: function (e) {
            var clickedId = $(e.currentTarget).attr('id');
            var panelId = $(e.currentTarget).data('panel');

            // don't run on current tab
            //if( $('#' + clickedId).hasClass('current') ) return false;

            // different behavior for single post
            if (aqvars.is_single_post) {
                window.location = aqvars.home_url + '#' + clickedId;
                return false;
            }

            $('.article-filter li a').removeClass('current');
            $('#' + clickedId).addClass('current');

            if (clickedId == 'article-filter-latest') {
                $('#main').removeClass('disable-load-more');
                $('#pagination').show();
            } else {
                $('#main').addClass('disable-load-more');
                $('#pagination').hide();
            }

            // show/hide panels
            $('#main-article-list, #popular-article-list, #featured-article-list').css('display', 'none');

            if (panelId == 'main-article-list') {
                $('.list-header h2').text('Latest');
            } else if (panelId == 'popular-article-list') {
                $('.list-header h2').text('Popular');
            } else if (panelId == 'featured-article-list') {
                $('.list-header h2').text('Featured');
            }

            $('#' + panelId).show();

        },

        goToCategory: function (e) {
            var url = $(e.currentTarget).data('url');
            window.location.href = url;
            return false;
        }

    });

    $App = new GlobalApp;

    // trigger tab
    triggerTab = function () {
        if (!aqvars.is_home) return false;
        id = window.location.hash;

        if (id == '#article-tab-latest' || id == '#article-tab-popular' || id == '#article-tab-featured') {
            $(id).trigger('click');

            // removes hash
            history.pushState('', document.title, window.location.pathname);
        } else {
            $('#article-tab-latest').trigger('click');
        }
    }

    triggerTab();

    // Product tabs
    if ($('body').hasClass('page-template-template-products-php')) {

        $('.products-navigation a').click(function () {
            $('.product-panels .panel').hide();

            $('.products-navigation a').removeClass('active');
            $(this).addClass('active');

            var target = $(this).attr("href");
            $(target).fadeIn('200');

            return false;
        });

    }

    // Mobile tabs
    $('#mobile-navigation ul li').click(function () {
        if (aqvars.is_home) {
            if ($(this).hasClass('tab-latest')) {
                $('#article-tab-latest').trigger('click');
                $('#mobilenav-toggle').trigger('click');
            }
            if ($(this).hasClass('tab-popular')) {
                $('#article-tab-popular').trigger('click');
                $('#mobilenav-toggle').trigger('click');
            }
            if ($(this).hasClass('tab-featured')) {
                $('#article-tab-featured').trigger('click');
                $('#mobilenav-toggle').trigger('click');
            }
        }
    });

    $('.dropdown-menu .dropdown-toggle').click(function (e) {
        if ($(this).parent().hasClass("is-open")) {
            $(this).parent().removeClass('is-open');
        } else {
            $('.dropdown-menu.is-open').removeClass('is-open');
            $(this).parent().addClass("is-open");
        }
    })

    $('.dropdown-menu .dropdown-toggle, .dropdown-menu .dropdown-list').click(function (e) {
        e.stopPropagation()
    })

    $(window).click(function (e) {
        $('.dropdown-menu.is-open').removeClass('is-open');
    })

    if ($('#mixing-icon').length) {
        var mixingIcon = Snap('#mixing-icon');
        var toggleOne = mixingIcon.select('#toggle-1');
        var toggleTwo = mixingIcon.select('#toggle-2');
        var toggleThree = mixingIcon.select('#toggle-3');
        var lineOne = mixingIcon.select('#line-1');
        var lineTwo = mixingIcon.select('#line-2');
        var lineThree = mixingIcon.select('#line-3');
        var lineFour = mixingIcon.select('#line-4');
        var lineFive = mixingIcon.select('#line-5');
        var lineSix = mixingIcon.select('#line-6');

        function animateElement(element, startY, endY) {
            return element.animate({y: startY}, 300, mina.easeinout, function () {
                element.animate({y: endY}, 300);
            })
        }

        function animateElementHeight(element, startHeight, endHeight, startY, endY) {
            return element.animate({height: startHeight, y: startY}, 300, mina.easeinout, function () {
                element.animate({height: endHeight, y: endY}, 300)
            })
        }

        mixingIcon.hover(function (event) {
            /* animate the toggles */
            animateElement(toggleOne, 12, 5);
            animateElement(toggleTwo, 2, 9);
            animateElement(toggleThree, 12, 5);

            /* animate the lines */
            animateElement(lineOne, 0, -4);
            animateElement(lineTwo, 17, 11);
            animateElement(lineThree, -4, 0);
            animateElement(lineFour, 9, 15);
            animateElement(lineFive, 0, -4);
            animateElement(lineSix, 17, 11);

        });
    }
    if (window.Snap !== undefined) {
        if ($('#producing-icon').length) {
            var producingIcon = Snap('#producing-icon');
            var rect1 = producingIcon.select('#Rectangle-1');
            var rect2 = producingIcon.select('#Rectangle-3');
            var rect3 = producingIcon.select('#Rectangle-15');
            var rect4 = producingIcon.select('#Rectangle-21');
            var rect5 = producingIcon.select('#Rectangle-10');
            var rect6 = producingIcon.select('#Rectangle-24');
            var rect7 = producingIcon.select('#Rectangle-14');
            var rect8 = producingIcon.select('#Rectangle-6');
            var rect9 = producingIcon.select('#Rectangle-19');
            var rect10 = producingIcon.select('#Rectangle-11');
            var rect11 = producingIcon.select('#Rectangle-23');
            producingIcon.mouseover(function (event) {
                rect1.attr({fill: '#FFDB3D'})
                rect2.attr({fill: '#FFFFFF'})
                rect3.attr({fill: '#F55653'})
                rect4.attr({fill: '#65E061'})
                rect5.attr({fill: '#00BAFF'})
                rect6.attr({fill: '#FFFFFF'})
                rect7.attr({fill: '#FFFFFF'})
                rect8.attr({fill: '#F55653'})
                rect9.attr({fill: '#FFFFFF'})
                rect10.attr({fill: '#65E061'})
                rect11.attr({fill: '#65E061'})
            });
            producingIcon.mouseout(function (event) {
                rect1.attr({fill: '#FFFFFF'})
                rect2.attr({fill: '#FF569F'})
                rect3.attr({fill: '#FFFFFF'})
                rect4.attr({fill: '#FFFFFF'})
                rect5.attr({fill: '#FFFFFF'})
                rect6.attr({fill: '#00BAFF'})
                rect7.attr({fill: '#65E061'})
                rect8.attr({fill: '#FFFFFF'})
                rect9.attr({fill: '#FF9E44'})
                rect10.attr({fill: '#FFFFFF'})
                rect11.attr({fill: '#FFFFFF'})
            });
        }
        if ($('recording-icon').length) {
            var recordingIcon = Snap('#recording-icon');
            var recorder = recordingIcon.select('#record')
            recordingIcon.hover(function (event) {
                recorder.animate({opacity: 0}, 300, mina.easeinout, function () {
                    recorder.animate({opacity: 1}, 300)
                })
            });
        }

        if ($('#mastering-icon').length) {
            var masteringIcon = Snap('#mastering-icon')
            var mLine1 = masteringIcon.select('#line-1')
            var mLine2 = masteringIcon.select('#line-2')
            var mLine3 = masteringIcon.select('#line-3')
            var mLine4 = masteringIcon.select('#line-4')
            var mLine5 = masteringIcon.select('#line-5')

            masteringIcon.mouseover(function (event) {
                animateElementHeight(mLine1, 16, 6, 0, 4.5);
                animateElementHeight(mLine2, 3, 18, 5, 0);
                animateElementHeight(mLine3, 10, 8, 3, 4);
                animateElementHeight(mLine4, 3, 12, 4, 2);
                animateElementHeight(mLine5, 18, 6, 0, 4.5);
            });
        }
    }

    var $firstSidebar = $('.content-right .first-content');
    var $secondSidebar = $('.content-right .second-content');
    var $window = $(window);
    var $articleHeight = $('.content').height();
    var halfArticle = $articleHeight / 3;

    function showSidebar() {
        setTimeout(function () {
            $('.article-sidebar .inner').removeClass('no-js');
        }, 500);
    }

    function hideSidebarAd($el) {
        $el.addClass('fadeOut').removeClass('fadeIn');
    }

    function showSidebarAd($el) {
        $el.addClass('fadeIn').removeClass('fadeOut').removeClass('hidden');
    }

    function initSidebarAds() {
        if ($window.scrollTop() > halfArticle + 600) {
            $firstSidebar.addClass('hidden');
            showSidebarAd($secondSidebar);
        } else {
            $secondSidebar.addClass('hidden');
            showSidebarAd($firstSidebar);
        }
    }

    function handleSidebarAds() {
        // fade out the first ad spot
        if ($window.scrollTop() > halfArticle) {
            hideSidebarAd($firstSidebar);
        }

        // fade in first ad spot
        if ($firstSidebar.hasClass('fadeOut')) {
            if ($window.scrollTop() < halfArticle && $window.scrollTop() > halfArticle - 100) {
                showSidebarAd($firstSidebar);
            }
        }

        // fade in the second ad spot
        if ($window.scrollTop() > halfArticle + 600) {
            showSidebarAd($secondSidebar);
        }

        // fade out second ad spot
        if ($secondSidebar.hasClass('fadeIn')) {
            if ($window.scrollTop() > halfArticle + 400 && $window.scrollTop() < halfArticle + 600) {
                hideSidebarAd($secondSidebar)
            }
        }
    }

    if ($articleHeight > 1200) {
        $firstSidebar.addClass('hidden');
        initSidebarAds();

        $window.scroll(function () {
            handleSidebarAds();
        });

    } else {
        $secondSidebar.fadeOut()
    }

    showSidebar();
});
