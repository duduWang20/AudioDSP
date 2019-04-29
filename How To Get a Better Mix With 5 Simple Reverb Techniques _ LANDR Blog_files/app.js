(function () {
    if ( typeof window.CustomEvent === "function" ) return false;
    function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'CustomEvent' );
        evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
        return evt;
    }
    CustomEvent.prototype = window.Event.prototype;
    window.CustomEvent = CustomEvent;
})();
(function (_w, _s) {

    var document = _w.document,
        app = {},
        startTimeMS = 0,
        _logMessage = function (m) {
            if (!app.logging)
                return;
            if (app.timing) {
                if (startTimeMS == 0)
                    startTimeMS = (new Date()).getTime();
                var t = (new Date()).getTime();
                m = '[AdButler] ' + m + ' (' + (t - startTimeMS) + ' ms)';
            }
            else
                m = '[AdButler] ' + m;
            _w.console && _w.console.log && _w.console.log(m);
        };


    app = {
        ads: [],
        pixels: {},
        requests: {},
        domains: {},
        clickHandlers: {},

        protocol: 'http:',
        pageKey: false,

        logging: false,
        timing: false,

        // states
        initialized: false,
        viewability:{},

        init: function () {
            app.initialized = true;

            app.logging = app.isBoolean(_w.AdButlerAppLogging) ? _w.AdButlerAppLogging : app.logging;

            _logMessage('app.init()');

            app.protocol = (document.location.protocol === 'http:' ? 'http:' : 'https:');
            app.ads = app.ads ? app.ads : [];

            app.initRND();

            app.viewability = new Viewability();
            app.viewability.initializeViewability();

            var tmp = app.ads;
            app.ads = [];
            app.ads.push = app.registerByPush;

            if (tmp && tmp.length > 0) {
                for (var i = 0; i < tmp.length; i++)
                    app.registerByPush(tmp[i]);
            }

            document.dispatchEvent(new CustomEvent('AdButler_Loaded'));
        },

        _addEventListener: function (el, evt, func) {
            if ('addEventListener' in _w) {
                el.addEventListener(evt, func, false);
            } else if ('attachEvent' in _w) { //IE
                el.attachEvent('on' + evt, func);
            }
        },

        removeEventListener: function (el, evt, func) {
            _logMessage("app.removeEventListener()");

            if ('removeEventListener' in _w) {
                el.removeEventListener(evt, func, false);
            }
        },

        insertScriptBefore: function(beforeEl, src, async, loadFn) {
            var s = document.createElement('script');
            s.async = !!async;
            s.type = 'text/javascript';
            s.src = src;

            if (app.isFunction(loadFn)) {
                app._addEventListener(s, 'load', loadFn);
            }

            beforeEl.parentElement.insertBefore(s, beforeEl);
        },

        registerByPush: function (request) {
            _logMessage('app.registerByPush()');
            if (typeof request === 'function') {
                return request();
            }

            return request.handler.call(null, request.opt);
        },

        register: function (account, zone, size, div, opt) {
            _logMessage('app.register(' + account + ', ' + zone + ', ' + size.join('x') + ', ' + div + ')');

            var request = {core: {}, redirect: {}, opt: {adserveVersion: 'adserve'}, customParams: {}, custom:{}};
            request.core = {
                ID: account,
                size: size.join('x'),
                setID: zone,
                type: 'async',
                domid: div,
                place: opt.place,
                pid: opt.pageKey ? opt.pageKey : app.pageKey,
                sw: (_s.width ? _s.width : 0),
                sh: _s.height ? _s.height : 0,
                spr: _w.devicePixelRatio ? _w.devicePixelRatio : 1,
                rnd: opt.rnd ? opt.rnd : app.rnd
            };

            // conditional core options
            if (opt.keywords && opt.keywords.length)
                request.core.kw = opt.keywords;
            if (opt.extraData && opt.extraData.length)
                request.core.extra = encodeURIComponent(opt.extraData);
            if (opt.rcb)
                request.core.rcb = opt.rcb;

            if(opt.customParams && opt.customParams instanceof Object){
                request.customParams = opt.customParams;
            }

            // custom
            if (typeof(opt.custom) == 'object') {
                for (var key in opt.custom) {
                    request.custom[key] = opt.custom[key];
                }
            }

            // redirect handling
            if (opt.clickURL && opt.clickURL.length)
                request.redirect.clickURL = opt.clickURL;
            if (opt.click && opt.click.length)
                request.redirect.click = opt.click;

            if (opt.adserveVersion) {
                request.opt.adserveVersion = opt.adserveVersion;
            }

            var t = opt.domain.split('.').indexOf('test') >= 0 || opt.domain.split('.').indexOf('test7') >= 0;
            if (!t && opt.domain === 'servedbyadbutler.com' && account % 100 < 100) {
                opt.domain = 'adbutler-fermion.com';
            }

            app.setAccountDomain(account, opt.domain);
            app.setRequestMeta(request);

            app.load(opt.domain, request);
        },

        addEventListener: function (event, handler, options) {
            _w.addEventListener(event, handler, options);
        },

        initRND: function () {
            if (window.rnd) {
                app.pageKey = app.rnd = window.rnd;
            }
            else {
                app.pageKey = app.rnd = window.rnd = app.randomNumber();
            }
        },

        load: function (domain, request) {
            _logMessage('app.load() --> ' + request.core.domid + ' [' + request.core.size + ']');
            var src = [app.protocol + '//' + domain + '/' + request.opt.adserveVersion + '/'],
                key, el;

            //
            for (key in request.core) {
                src.push(key + '=' + request.core[key]);
            }
            //
            for (key in request.custom) {
                src.push(key + '=' + request.custom[key]);
            }
            //
            for(var i = 0; i < 5; i++){
                if(i in request.customParams){
                    key = i+1;
                    src.push("customParam" + key + "=" + request.customParams[i]);
                }
            }
            //
            for (key in request.redirect) {
                src.push(key + '=' + request.redirect[key]);
            }

            el = document.getElementById(request.core.domid);
            app.dispatchAdButlerEvent(el, app.EVENTS.REQUEST, request);

            app.insertScriptBefore(el, src.join(';'), true);
        },

        placePlainMarkup: function (div, html) {
            _logMessage('app.placePlainHTML(' + div + ', *html)');

            var contentDiv = document.getElementById(div);

            app.requests[div].refreshQueued = false;

            app.dispatchAdButlerEvent(contentDiv, app.EVENTS.RESPONSE, app.requests[div], true);

            if ((typeof(contentDiv) != 'undefined') && (contentDiv !== null)) {
                contentDiv.innerHTML = html;

                var imageDiv = contentDiv.querySelector('img');
                if (imageDiv) {
                    if (imageDiv.complete) {
                        app.dispatchAdButlerEvent(contentDiv, app.EVENTS.LOAD, app.requests[div]);
                    } else {
                        imageDiv.addEventListener('load', function() {
                            app.dispatchAdButlerEvent(contentDiv, app.EVENTS.LOAD, app.requests[div]);
                        });
                    }
                }
            }

            app.placeRegisteredPixels(div);
        },

        placeIframeMarkup: function (zone, place, size, div, html, opts, viewableCallback, eligibleCallback, isAccupixel) {
            _logMessage('app.placeIframeHTML(' + zone + ', ' + place + ', ' + size.join('x') + ', ' + div + ', *html)');

            var contentDiv = document.getElementById(div),
                width = size.length === 2 ? size[0] : 0,
                height = size.length === 2 ? size[1] : 0;

            app.requests[div].refreshQueued = false;

            app.dispatchAdButlerEvent(contentDiv, app.EVENTS.RESPONSE, app.requests[div], true);

            contentDiv.innerHTML = '';

            var contentDocument, wrapperFrame;
            wrapperFrame = document.createElement("iframe");
            wrapperFrame.id = 'placement_' + zone + '_' + place + '_iframe';
            wrapperFrame.frameBorder = 0;
            wrapperFrame.scrolling = "no";
            wrapperFrame.noresize = "noresize";
            wrapperFrame.marginheight = 0;
            wrapperFrame.marginwidth = 0;
            wrapperFrame.height = height;
            wrapperFrame.width = width;

            contentDiv.appendChild(wrapperFrame);
            if(eligibleCallback){
                document.getElementById(wrapperFrame.id).setAttribute('eligible-callback', eligibleCallback);
            }
            if(viewableCallback){
                document.getElementById(wrapperFrame.id).setAttribute('viewable-callback', viewableCallback);
            }
            if(viewableCallback){
                app.viewability.addViewableEntity(wrapperFrame.id, isAccupixel);
            }

            app._addEventListener(wrapperFrame, 'load', function _func() {
                app.handleIframeHTMLOnLoad(div, zone, place);
                app.removeEventListener(wrapperFrame, "load", _func);
            });

            html = "<!DOCTYPE HTML><html><head><style>html,body{padding:0;margin:0;}</style></head><body>" + html + "</body></html>";
            if (/msie/.test(navigator.userAgent.toLowerCase()) || _w.opera) {
                wrapperFrame.contentWindow.contents = html;
                return wrapperFrame.src = "javascript:window[\"contents\"]";
            } else {
                contentDocument = wrapperFrame.contentDocument;
                contentDocument.open();
                contentDocument.write(html);
                contentDocument.close();
                return wrapperFrame;
            }
        },

        handleIframeHTMLOnLoad: function (div, zone, place) {
            _logMessage('app.handleIframeHTMLOnLoad(' + div + ', ' + zone + ', ' + place + ')');

            var ifrm = document.getElementById('placement_' + zone + '_' + place + '_iframe');
            if (ifrm !== null && ifrm.readyState !== "complete" && app.isString(ifrm.readyState)) {
                return setTimeout((function () {
                    return app.handleIframeHTMLOnLoad(div, zone, place);
                }), 50);
            }
            else {
                var el = document.getElementById(div);

                app.placeRegisteredPixels(div);
                app.dispatchAdButlerEvent(el, app.EVENTS.LOAD, app.requests[div]);
            }
        },

        servePlainMarkup: function(div, ad) {
            _logMessage('app.servePlainMarkup(' + div + ', *html)');

            var contentDiv = document.getElementById(div);
            if (typeof(contentDiv) != 'undefined')
                contentDiv.innerHTML = ad.markup;

            app.placeRegisteredPixels(div);
        },

        serveIframeByMarkup: function(div, ad, viewableCallback, eligibleCallback, isAccupixel) {
            _logMessage('app.serveFramedMarkup(' + ad.zone + ', ' + ad.place + ', ' + ad.size.join('x') + ', ' + div + ', *html)');
            var contentDiv = document.getElementById(div),
                frameID = 'placement_' + ad.zone + '_' + ad.place + '_iframe',
                width = ad.size.length === 2 ? ad.size[0] : 0,
                height = ad.size.length === 2 ? ad.size[1] : 0,
                contentDocument, wrapperFrame,
                markup, i;

            app.requests[div].refreshQueued = false;

            app.dispatchAdButlerEvent(contentDiv, app.EVENTS.RESPONSE, app.requests[div], true);

            contentDiv.innerHTML = '';

            wrapperFrame = document.createElement("iframe");
            wrapperFrame.id = frameID;
            wrapperFrame.frameBorder = 0;
            wrapperFrame.scrolling = "no";
            wrapperFrame.noresize = "noresize";
            wrapperFrame.marginheight = 0;
            wrapperFrame.marginwidth = 0;
            wrapperFrame.height = height;
            wrapperFrame.width = width;

            //
            contentDiv.appendChild(wrapperFrame);
            if(eligibleCallback){
                document.getElementById(wrapperFrame.id).setAttribute('eligible-callback', eligibleCallback);
            }
            if(viewableCallback){
                document.getElementById(wrapperFrame.id).setAttribute('viewable-callback', viewableCallback);
            }
            if(viewableCallback){
                app.viewability.addViewableEntity(wrapperFrame.id, isAccupixel);
            }

            //
            app._addEventListener(wrapperFrame, 'load', function() {
                return app.processFrameOnLoad(div, frameID, ad);
            });

            //
            app.processAdScripts(div, frameID, ad);

            //
            markup = "<!DOCTYPE HTML><html><head><style>html,body{padding:0;margin:0;}</style></head><body>" + ad.markup + "</body></html>";
            if (/msie/.test(navigator.userAgent.toLowerCase()) || _w.opera) {
                wrapperFrame.contentWindow.contents = markup;
                return wrapperFrame.src = "javascript:window[\"contents\"]";
            } else {
                contentDocument = wrapperFrame.contentDocument;
                contentDocument.open();
                contentDocument.write(markup);
                contentDocument.close();
                return wrapperFrame;
            }
        },

        serveIframeByURL: function(div, ad, viewableCallback, eligibleCallback, isAccupixel) {
            _logMessage('app.serveFramedMarkup(' + ad.zone + ', ' + ad.place + ', ' + ad.size.join('x') + ', ' + div + ', *url)');
            var contentDiv = document.getElementById(div),
                frameID = 'placement_' + ad.zone + '_' + ad.place + '_iframe',
                width = ad.size.length === 2 ? ad.size[0] : 0,
                height = ad.size.length === 2 ? ad.size[1] : 0,
                wrapperFrame;

            app.requests[div].refreshQueued = false;

            app.dispatchAdButlerEvent(contentDiv, app.EVENTS.RESPONSE, app.requests[div], true);

            contentDiv.innerHTML = '';

            wrapperFrame = document.createElement("iframe");
            wrapperFrame.id = frameID;
            wrapperFrame.frameBorder = 0;
            wrapperFrame.scrolling = "no";
            wrapperFrame.noresize = "noresize";
            wrapperFrame.marginheight = 0;
            wrapperFrame.marginwidth = 0;
            wrapperFrame.height = height;
            wrapperFrame.width = width;

            //
            contentDiv.appendChild(wrapperFrame);
            if(eligibleCallback){
                document.getElementById(wrapperFrame.id).setAttribute('eligible-callback', eligibleCallback);
            }
            if(viewableCallback){
                document.getElementById(wrapperFrame.id).setAttribute('viewable-callback', viewableCallback);
            }
            if(viewableCallback){
                app.viewability.addViewableEntity(wrapperFrame.id, isAccupixel);
            }
            //
            app._addEventListener(wrapperFrame, 'load', function() {
                return app.processFrameOnLoad(div, frameID, ad);
            });

            //
            app.processAdScripts(div, frameID, ad);

            // begin
            wrapperFrame.src = ad.src;

            return wrapperFrame;
        },

        processAdScripts: function(div, frameID, ad) {
            var contentDiv = document.getElementById(div),
                i, mediaScript, loadFn;

            // media scripts?
            if ( !(app.isArray(ad.scripts) && ad.scripts.length > 0) ) {
                return;
            }

            for (i = 0; i < ad.scripts.length; i++) {
                loadFn = null;
                mediaScript = ad.scripts[i];
                // if a loader is present
                if (app.isFunction(mediaScript.loadFn)) {
                    loadFn = function(){
                        mediaScript.loadFn(div, frameID, ad);
                    };
                }
                app.insertScriptBefore(contentDiv, mediaScript.src, true, loadFn);
            }
        },

        processFrameOnLoad: function(div, frameID, ad) {
            _logMessage('app.processFrameOnLoad(' + div + ', ' + ad.zone + ', ' + ad.place + ')');

            var ifrm = document.getElementById(frameID);
            if (ifrm !== null && ifrm.readyState !== "complete" && app.isString(ifrm.readyState)) {
                return setTimeout((function () {
                    return app.processFrameOnLoad(div, frameID, ad);
                }), 50);
            }
            else {
                var el = document.getElementById(div);
                app.placeRegisteredPixels(div);
                app.dispatchAdButlerEvent(el, app.EVENTS.LOAD, app.requests[div]);
            }
        },

        queuePlacementRefresh: function (div, rct, delay) {
            _logMessage('app.queuePlacementRefresh(' + div + ', ' + rct + ', ' + delay + ')');
            var request = app.getRequestMeta(div),
                domain = app.getAccountDomain(request.core.ID);

            request.core.rct = rct;
            request.refreshQueued = true;

            setTimeout(function () {
                app.load(domain, request);
            }, delay);
        },
        
        triggerZoneReload: function(div) {
            _logMessage('app.triggerZoneReload(' + div + ')');
            var request = app.getRequestMeta(div),
                domain = app.getAccountDomain(request.core.ID);
            
            request.core.rct++;
            
            app.load(domain, request);
        },

        randomNumber: function () {
            return Math.floor(Math.random() * 10e6);
        },

        getZoneMeta: function (zone) {
            if (!app.isObject(app.zoneMeta[zone]))
                app.zoneMeta[zone] = {
                    place: 0,
                    key: app.randomNumber()
                };
            else
                app.zoneMeta[zone].place++;
            return app.zoneMeta[zone];
        },

        setAccountDomain: function (ID, domain) {
            app.domains[ID] = domain;
        },

        getAccountDomain: function (ID) {
            return app.domains[ID];
        },

        setRequestMeta: function (request) {
            app.requests[request.core.domid] = request;
        },

        getRequestMeta: function (domid) {
            return app.requests[domid];
        },

        /* ============================================================ */
        /*  PIXEL FUNCTIONS                                             */
        /* ============================================================ */

        registerPixel: function (div, url) {
            _logMessage('app.registerPixel(' + div + ', *url)');

            if (!app.isArray(app.pixels[div])) {
                app.pixels[div] = [];
            }
            app.pixels[div].push(url);
        },

        placeRegisteredPixels: function (div) {
            _logMessage('app.placeRegisteredPixels(' + div + ')');

            if (app.isArray(app.pixels[div])) {
                for (var k = 0; k < app.pixels[div].length; k++) {
                    app.placePixel(div, app.pixels[div][k]);
                }
                app.pixels[div] = [];
            }
        },

        placePixel: function (div, url) {
            _logMessage('app.placePixel(' + div + ', ' + url + ')');
            if (url.length === 0)
                return;

            var container, pixel;
            container = document.getElementById(div);
            if (container !== null) {
                pixel = document.createElement('img');
                pixel.setAttribute("height", "0");
                pixel.setAttribute("width", "0");
                pixel.setAttribute("border", "0");
                pixel.setAttribute("style", "display:none;");
                pixel.setAttribute("src", url);
                return container.appendChild(pixel);
            }
        },


        /* ============================================================ */
        /*  HELPER FUNCTIONS                                            */
        /* ============================================================ */

        isArray: function (obj) {
            if (obj && obj.isArray) {
                return obj.isArray();
            }
            return typeof(obj) === "object" && obj instanceof Array;
        },

        isFunction: function(obj) {
            return typeof(obj) === 'function';
        },

        isObject: function (obj) {
            return typeof(obj) === "object";
        },

        isString: function (obj) {
            return typeof(obj) === "string";
        },

        isBoolean: function (obj) {
            return typeof(obj) === "boolean";
        },

        /* ============================================================ */
        /*  EVENTS                                                      */
        /* ============================================================ */

        EVENTS: {
            REQUEST: 'adbutlerOnRequest',
            RESPONSE: 'adbutlerOnResponse',
            LOAD: 'adbutlerOnLoad',
            VIEWABLE: 'adbutlerOnViewable'
        },

        dispatchAdButlerEvent: function(target, eventType, request, filled) {
            _logMessage('app.dispatchAdButlerEvent(' + target.id + ', ' + eventType + ', *request, ' + filled + ')');
            var rct = request.core.rct || 0;
            var detail = {
                zoneID: request.core.setID,
                place: request.core.place,
                size: request.core.size,
                elementID: target.id,
                refreshNumber: request.refreshQueued && eventType !== app.EVENTS.REQUEST ? rct - 1 : rct
            };
            if (filled !== undefined) detail.filled = filled;

            target.dispatchEvent(new CustomEvent(eventType, {
                detail: detail,
                bubbles: true
            }));
        },

        emptyResponse: function(divID) {
            var ele = document.getElementById(divID);
            app.requests[divID].refreshQueued = false;
            app.dispatchAdButlerEvent(ele, app.EVENTS.RESPONSE, app.requests[divID], false);
        }
    };

    if (_w.AdButler && _w.AdButler.initialized) {
        if (_w.AdButler.logging) {
            _logMessage('app initialized a second time, carrying on as usual.');
        }
        return;
    }

    if (_w.AdButler) {
        app.ads = _w.AdButler.ads || [];
        app.domain = _w.AdButler.domain || false;
    }

    _w.AdButler = app;

    app.init();


    function Viewability() {
        var viewables = [];
        var screenWidth;
        var screenHeight;
        var screenY;
        var screenX;

        var timeBeforeViewable = 1000;
        var percentageToBeViewable = .5;
        var timeInterval = 100;
        var inFocus = true;
        var debug = false;

        function ViewableAd() {
            this.width = 0;
            this.height = 0;
            this.position = { top:0, left:0 };
            this.percentOnScreen = 0.0;
            this.durationOnScreen = 0.0;
            this.DOMElement = {};
            this.timer = null;
            return this;
        }

        ViewableAd.prototype.recalculate = function (){
            screenHeight = window.innerHeight;
            screenWidth = window.innerWidth;
            screenX = window.scrollX;
            screenY = window.scrollY;
            var bounds = this.DOMElement.getBoundingClientRect();
            this.position.left = bounds.left + screenX;
            this.position.top = bounds.top + screenY;
            this.width = bounds.width;
            this.height = bounds.height;
            
            var screenRect = {x1:screenX, y1:screenY + screenHeight, x2:screenX + screenWidth, y2:screenY};
            var itemRect = {x1:this.position.left, y1:this.position.top + this.height, x2:this.position.left + this.width, y2:this.position.top};

            var itemArea = (itemRect.x2 - itemRect.x1) * (itemRect.y1 - itemRect.y2);

            var x_overlap = Math.max(0, Math.min(screenRect.x2, itemRect.x2) - Math.max(screenRect.x1, itemRect.x1));
            var y_overlap = Math.max(0, Math.min(screenRect.y1, itemRect.y1) - Math.max(screenRect.y2, itemRect.y2));

            var overlapArea = x_overlap * y_overlap;
            this.percentOnScreen =  overlapArea / itemArea;
            if(debug){
                var node = document.getElementById(this.DOMElement.id + "_debug_text");
                var tbl = "<table>" +
                    "<tr><td></td><td>Left</td><td>Top</td><td style=\"color:lawngreen\">" + (this.percentOnScreen * 100).toFixed(2) + "%</td></tr>" +
                    "<tr><td>Abs</td><td>" + this.position.left + "</td><td>" + this.position.top + "</td></tr>" +
                    "<tr><td>Bounds</td><td>" + bounds.left + "</td><td>" + bounds.top + "</td></tr>" +
                    "<tr><td>Screen</td><td>" + screenX + "</td><td>" + screenY + "</td></tr>" +
                    "</table>";
                node.innerHTML = tbl;
            }
        };

        ViewableAd.prototype.initialize = function (domItem){
            this.DOMElement = domItem;
            this.DOMElement.setAttribute('viewable', 'false');
            var self = this;
            this.timer = setInterval(function () {
                self.recalculate();
                if(self.percentOnScreen > percentageToBeViewable) {
                    self.durationOnScreen += timeInterval;
                    if(self.durationOnScreen > timeBeforeViewable){
                        markViewable(self);
                    }
                }else{
                    self.durationOnScreen = 0;
                }
            }, timeInterval);
        };

        Viewability.prototype.addViewableEntity = function(divID, isAccupixel) {
            var viewable = new ViewableAd();
            viewable.initialize(document.getElementById(divID));
            viewables.forEach(function(item){
                if(item.DOMElement.id == divID){
                    clearInterval(item.timer);
                    viewables.splice(viewables.indexOf(item), 1);
                }
            });
            viewables.push(viewable);
            if(debug) {
                addDebugInfo(viewable);
            }
            viewable.recalculate();
            if(!isAccupixel){
                markEligible(viewable);
            }
        };

        Viewability.prototype.initializeViewability = function () {
            document.createAttribute("viewable");
        };
        
        Viewability.prototype.debug = function (on) {
            debug = on;
            if(on){
                viewables.forEach(function(item){
                    addDebugInfo(item);
                });
            }
            else{
                viewables.forEach(function(item){
                    var node = document.getElementById(item.DOMElement.id + "_debug");
                    if(node) { node.remove(); }
                    item.DOMElement.style.position = 'static';
                });
            }
        };
        
        Viewability.prototype.logViewables = function(){
            console.log(viewables);
        };
        
        function addDebugInfo(viewable){
            viewable.DOMElement.style.position = 'relative';
            var node = document.createElement("div");
            node.setAttribute("id", viewable.DOMElement.id + "_debug");
            node.setAttribute("style", "position:absolute; top:0; left:0; width:150px; height:55px; line-height:.8; padding:5px; background-color:rgba(117, 117, 117, .7); border:1px solid #6B6B6B;");
            viewable.DOMElement.appendChild(node);
            var span = document.createElement("span");
            span.setAttribute("id", viewable.DOMElement.id + "_debug_text");
            span.setAttribute("style", "color:white; font-size:12px;");
            node.appendChild(span);
        }

        function markViewable(viewable){
            viewable.DOMElement.setAttribute('viewable', 'true');
            //viewable.DOMElement.style.backgroundColor = 'green';
            clearInterval(viewable.timer);
            var i = viewables.indexOf(viewable);
            viewables.splice(i, 1);
            var callbackUrl = viewable.DOMElement.getAttribute('viewable-callback');
            if(callbackUrl != null && callbackUrl != undefined){
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        // sent
                    }
                };
                xhttp.open("GET", callbackUrl, true);
                xhttp.send();
            }

            // only support async ads
            if (app.requests[viewable.DOMElement.parentElement.id]) {
                var request = app.requests[viewable.DOMElement.parentElement.id];
                app.dispatchAdButlerEvent(viewable.DOMElement.parentElement, app.EVENTS.VIEWABLE, request);
            }
        }

        function markEligible(viewable){
            var callbackUrl = viewable.DOMElement.getAttribute('eligible-callback');
            if(callbackUrl != null && callbackUrl != undefined){
                var xhttp = new XMLHttpRequest();
                xhttp.onreadystatechange = function() {
                    if (this.readyState == 4 && this.status == 200) {
                        // sent
                    }
                };
                xhttp.open("GET", callbackUrl, true);
                xhttp.send();
            }
        }
        
        window.addEventListener('focus', function(){
            inFocus = true;
        });
        
        window.addEventListener('blur', function(){
            inFocus = false;
        });
    }
}(window, screen));
