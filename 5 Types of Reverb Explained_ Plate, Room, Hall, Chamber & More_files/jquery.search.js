jQuery(document).ready(function($) {
    /** $LoadMore app */

    var LoadMoreSearchApp = Backbone.View.extend({
        el: $('#main'),
        page: 1,
        autoLoad: true,
        autoLoadThreshold: 999,
        autoLoadRunning: false,
        pages: $('.article-list').data('pages'),
        type: "search-all",
        search: $('.article-list').data('search'),
        reset: false,
        category_id: $('.article-list').data('category-id'),
        data_panel: $('.article-filter a').data('panel'),
        events: {
            "click #load-more": "loadMore",
            "click .article-filter a": "switchType"
        },
        xhr: undefined,

        initialize: function() {
            _.bindAll(this, 'doAutoLoad', 'loadMore', 'getPosts', 'update', 'switchType', 'bindAutoLoad', 'unbindAutoLoad');

            this.$el.find('.loading').show();

            if(this.pages == 1) this.$el.find('.loading').hide();

            this.bindAutoLoad();
        },

        bindAutoLoad: function() {
            $(document).on('scroll', _.debounce(this.doAutoLoad, 200));
        },

        unbindAutoLoad: function() {
            $(document).off('scroll');
        },

        doAutoLoad: function() {
            if(!this.autoLoad) {
                this.unbindAutoLoad();
                return false;
            }

            if (
                this.page >= this.autoLoadThreshold ||
                this.page > this.pages ||
                this.pages == 1
            ) {
                this.autoLoad = false;
                return false;
            }

            var winHeight = $(window).height(),
                scrollPos = $(document).scrollTop(),
                docHeight = $(document).height(),
                listBottom;

            listBottom = docHeight - winHeight - scrollPos;

            if(listBottom <= 300) {
                this.getPosts();
            }
        },

        loadMore: function() {
            var self = this;

            this.$el.find('#load-more')
                    .addClass('loading-posts')
                    .find('a')
                    .html('Loading More Posts...')
                    .attr('disabled', true);

            this.getPosts();
            return false;
        },

        getPosts: function() {
            var self = this;
            this.page = this.page + 1;

            // run only if function is not already running
            if(!this.autoLoadRunning) {
                this.autoLoadRunning = true;

                var url = aqvars.ajaxurl;

                this.xhr = Backbone.ajax({
                    url: url,
                    type: 'POST',
                    data: {
                        action: 'tpaf_search_posts',
                        page: this.page,
                        type: this.type,
                        search: this.search,
                        category_id: this.category_id,
                        panel: this.data_panel
                    }
                })
                .done(function(data) {
                    self.update(data);
                })
                .fail(function() {
                    self.fail;
                })
                .always(function() {
                    self.$el.find('#intermittent').hide();
                });

            }
        },

        update: function(data) {
            this.autoLoadRunning = false;

            // empty response, i.e. no more posts
            if(data == "") {
                this.pages == this.page;
            }

            var articleList = this.$el.find('.article-list');

            if(this.reset) {
                articleList.html(data);
                this.reset = false;
            } else {
                articleList.append(data);
            }

            this.$el.find('#load-more')
                    .removeClass('loading-posts')
                    .find('a')
                    .html('Load More')
                    .attr('disabled', false);

            if(this.page == this.autoLoadThreshold) {
                this.$el.find('.loading').hide();
                this.$el.find('#load-more').fadeIn();
            } else {
                this.$el.find('.loading').show();
            }

            if(this.page >= this.pages) {
                this.$el.find('.loading').hide();
                this.$el.find('#load-more').hide();
                this.$el.find('.no-more-posts').show();
            }
        },

        fail: function(data) {
            console.log('Failed to load more posts');
        },

        switchType: function(el) {
            type = $(el.currentTarget).data('type');

            if(type == this.type) return false;

            // switch type should stop autoLoad, otherwise it won't work properly
            if (typeof this.xhr !== 'undefined') {
                this.xhr.abort();
                this.autoLoadRunning = false;
            }

            // reset page data
            this.page = 0;
            this.type = type;
            this.reset = true;
            this.$el.find('#intermittent').show();
            this.$el.find('.loading').hide();
            this.$el.find('#load-more').hide();
            this.$el.find('.no-more-posts').hide();

            $('.article-filter a').removeClass('current');
            $(el.currentTarget).addClass('current');

            // make sure it always auto-loads
            this.autoLoad = true;

            this.getPosts();
            this.bindAutoLoad();
            return false;
        }
    });

    if($('body.search.search-results').length) {
        new LoadMoreSearchApp;
    }
});
