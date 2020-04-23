var homepageTile = {
    base: '',
    page : [],
    spaceId : null,
    targetRow : 'one',

    init: function(){
        var self = this;
        this.base = jiveUrl;

        if($j('.apple-row').length){
            // Return  subspaces with url to search results for category
            //self.spaceId = $j('.apple-row a:first-child').data('target');
            //Apple fix for <rdar://problem/35805011> : Get the results threshold from widget if present
            var numResults = 200;
            if($j('#numResults').length) {
                numResults = $j('#numResults').data('results');
            }
            self.page.row = 'one';
            //self.actionLoad(self.spaceId);

            $j(document).on('click','.apple-row > a', function(){
                if(self.spaceId != $j(this).data('target')){
                    self.spaceId = $j(this).data('target');
                    self.targetRow = $j(this).parent('div').data('attr');
                    self.page.row = self.targetRow;
                    self.actionLoad(self.spaceId,numResults);
                }
            });
        }
    },

    actionLoad: function(spaceId,numResults){
        //Apple fix for <rdar://problem/35805011> Sub Forums Getting Truncated from Main Page
        var subSpaceObjs = this.base+'/__services/v2/rest/containers/'+spaceId+'/children?numResults='+numResults+'&propNames=all';
        this.getJSONobj(subSpaceObjs);

    },

    getJSONobj: function(api){
        self = this;
        $j.getJSON(api,
            function(data){
                data.path = self.base;
                html = new EJS({url: self.base+'/themes/appledevelopers/js/templates/homepage-tiles.ejs'}).render(data);
                self.swapSpaces(html);
            });
    },

    swapSpaces: function(html){
        self = this;
        var closerow = $j('.apple-subrow').animate({
            height: 0
        }, 600);
        $j.when(closerow).done(function(){
            $j('.apple-subrow').removeClass('active');
            $j('.'+self.page.row+' .apple-subnav-container').html(html);
            var rowHeight = $j('.'+self.page.row+' .apple-subnav-container').height();

            $j('.apple-row').find("[data-target='" + self.spaceId + "']").addClass('active');
            $j('.'+self.page.row+'.apple-subrow').animate({
                height: rowHeight
            }, 600).addClass('active');
        });
        $j('.apple-row>a').removeClass('active');
    }

};
