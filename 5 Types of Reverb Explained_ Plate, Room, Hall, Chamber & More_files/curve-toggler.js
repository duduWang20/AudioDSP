/*

Available methods:

.appendTo(parentElement)
.setResolution(points) - default: data array length - 1
.setVerticalZoom(zoom) - default: 15
.setAnimationTime(seconds) - default: 0.1
.draw()
.toggle([state]) - state is optional and must be either 0 or 1

*/

function FRCurveToggler (pathToCurve1, pathToCurve2, startCurve, drawInactive, onload) {
    var resolution = 1000;
    
    var drawInactive = drawInactive;
    var parentElement;
    var verticalZoom = 6.8;
    var verticalOffset = 18;
    
    var doDrawGrid = true;
    var pixelRatio = Math.round(window.devicePixelRatio) || 1;

    var c = document.createElement("canvas");

    var width, height;

    var ctx = c.getContext("2d");

    scaleCanvas();
    
    var fResponse;

    var animationTime = 0.15;
    var animationProgress = startCurve;
    var animationTarget = startCurve;
    var fps = 60;
    var currentFrame = Math.floor(fps * animationTime * animationTarget);

    var firstAnimationDone = true; // huge hack to draw some things only after the first curve transition is done

    // Init frequency response object
    createResponseFromFileData(pathToCurve1, pathToCurve2, function (fr) {
        fResponse = fr;
        resolution = fr.pointArray.length - 1;
        if (onload) onload();
    });


    this.appendTo = function (parent) {
        parentElement = parent;

        if (parentElement) {
            width = parentElement.clientWidth;
            height = parentElement.clientHeight;

            c.width = width;
            c.height = height;
        }

        scaleCanvas();

        fResponse.pointArray = frToPoints(fResponse.response);
        fResponse.targetPointArray = frToPoints(fResponse.targetResponse);

        parentElement.appendChild(c);
    };

    this.setResolution = function (points) {
        if (fResponse) {
            resolution = Math.max(Math.min(points, fResponse.pointArray.length), 2);
            drawFR(fResponse.pointArray, fResponse.targetPointArray, 1 - animationProgress);
        }
    };

    this.setVerticalZoom = function (zoom) {
        verticalZoom = zoom;
        drawFR(fResponse.pointArray, fResponse.targetPointArray, 1 - animationProgress);
    };

    this.setAnimationTime = function (seconds) {
        animationTime = seconds;
    };

    this.draw = function () {
        //drawFR(fResponse.pointArray, fResponse.targetPointArray, 0, true);
        drawFR(fResponse.pointArray, fResponse.targetPointArray, 1, true);
        if (doDrawGrid) drawGrid();
        
        drawFR(fResponse.pointArray, fResponse.targetPointArray, 1 - animationProgress);
    };

    this.toggle = function (target) {
        if (target) animationTarget = target;
        else animationTarget = animationTarget == 1 ? 0 : 1;
        updateAnimation();
    };

    function FResponse (args) {
        this.model = args.model;
        this.response = args.response;
        this.pointArray = args.pointArray;
        this.targetResponse = args.targetResponse;
        this.targetPointArray = args.targetPointArray;
    }

    function Point (x, y) {
        this.x = x;
        this.y = y;
    }

    function FadeText (text, position) {
        var me = this;
        me.text = text;
        me.position = position;

        me.draw = function (alpha) {
            ctx.font = "28px Whitney HTF";
            ctx.textAlign = "left";
            ctx.fillStyle = "rgba(255, 255, 255, " + alpha + ")";
            ctx.fillText(me.text, me.position.x, me.position.y);
        };
    }

    function createResponseFromFileData(model, target, ondone) {

        var fr = new FResponse({ model : model, response : {}, pointArray : [], targetResponse : {}, targetPointArray : [] });

        var responseLoaded = false;
        var targetLoaded = false;

        var loadFile = function (filename) {
            return new Promise(function(resolve, reject) {
                var request = new XMLHttpRequest();
                request.open("GET", filename);

                request.onload = function () {
                    resolve(request.responseText);
                }
                request.send();
            });
        };

        var testIfDone = function () {
            if (responseLoaded && targetLoaded && ondone) ondone(fr);
        };

        loadFile(model).then(function (data) {
            fr.response = processTsvFile(data);
            fr.pointArray = frToPoints(fr.response);
            responseLoaded = true;
            testIfDone();
        });

        loadFile(target).then(function (data) {
            fr.targetResponse = processTsvFile(data);
            fr.targetPointArray = frToPoints(fr.targetResponse);
            targetLoaded = true;
            testIfDone();
        });
    }

    function processTsvFile(str) {
        var r = {};
        var lines = str.split("\n");
        var line;

        for (var ii = 0; ii < lines.length - 1; ii += 1) {
            line = lines[ii].split("\t");
            r[line[0]] = parseFloat(line[1]);
        }

        return r;
    }

    function frequenctyToPx(frequency) {
        var min_f = Math.log(20) / Math.log(10);
        var max_f = Math.log(22000) / Math.log(10);
        var range = max_f - min_f;

        return (Math.log(frequency) / Math.log(10) - min_f) / range * width;
    }

    function frToPoints(response) {
        var points = [];
        var idx = 0;

        for (var f in response) {
            points[idx] = new Point(frequenctyToPx(f), response[f]);
            idx++;
        }

        return points;
    }

    function drawFR (responsePointArray, targetPointArray, scale, isLight) {
        var len = responsePointArray.length;
        var lineColor = animationTarget ? 'rgba(70, 213, 157, 1)' : 'rgba(255, 113, 65, 1)';
        var fillColor = animationTarget ? 'rgba(70, 213, 157, 0.5)' : 'rgba(255, 113, 65, 0.5)';

        if(isLight) {
            var lineColor = 'rgba(255, 113, 65, 0.3)';
            var fillColor = 'rgba(255, 113, 65, 0.2)';    
        }

        if(isLight && drawInactive !== 1) {
            return;
        }

        if (len === 0) {
            console.error("No data to draw :(");
            return;
        }

        ctx.strokeStyle = lineColor;
        ctx.lineWidth = 2;
        //if (isLight) ctx.setLineDash([8, 3]);

        ctx.beginPath();
        ctx.moveTo(responsePointArray[0].x, (responsePointArray[0].y * verticalZoom * scale + height / 2 + targetPointArray[0].y * verticalZoom * (1 - scale)) + verticalOffset);

        for (var ii = 1; ii < len - 1; ii++) {
            if (ii % Math.floor(len / resolution) !== 0) continue;
            ctx.lineTo(responsePointArray[ii].x, (responsePointArray[ii].y * verticalZoom * scale + height / 2 + targetPointArray[ii].y * verticalZoom * (1 - scale)) + verticalOffset);
        }
        ctx.lineTo(responsePointArray[len - 1].x, (responsePointArray[len - 1].y * verticalZoom * scale + height / 2 + targetPointArray[len - 1].y * verticalZoom * (1 - scale)) + verticalOffset); // Always draw last point
        ctx.stroke();

        ctx.setLineDash([]);


            var fillGradient = ctx.createLinearGradient(0, 350, 0, 0);
            fillGradient.addColorStop(0, "transparent");
            fillGradient.addColorStop(1, fillColor);
            ctx.fillStyle = fillGradient;
            ctx.strokeStyle = 'transparent';

            ctx.beginPath();
            ctx.moveTo(responsePointArray[0].x, height);
            for (var ii = 1; ii < len - 1; ii++) {
                if (ii % Math.floor(len / resolution) !== 0) continue;
                ctx.lineTo(responsePointArray[ii].x, (responsePointArray[ii].y * verticalZoom * scale + height / 2 + targetPointArray[ii].y * verticalZoom * (1 - scale)) + verticalOffset);
            }
             ctx.lineTo(responsePointArray[len - 1].x, height);
             ctx.lineTo(responsePointArray[0].x, height);
            
            ctx.stroke();
            ctx.fill();
        
    }

    function drawGrid () {
        var tickMarksFrequency = [100, 1000, 10000];
        var tickMarksDb = [15, 10, 5, 0, -5, -10, -15];
        var tickMarksPx = [];
        var text = ["100Hz", "1kHz", "10kHz"];

        //ctx.setLineDash([8, 3]);
        ctx.strokeStyle = "rgba(164, 167, 173, 0.5)"; // previous: 254, 160, 77
        ctx.lineWidth = 0.5;
        ctx.fillStyle = "rgba(164, 167, 173, 1)";
        ctx.font = "lighter 13px WhitneyHTF";
        ctx.textAlign = "left";

        /*
            X axis tick marks (frequency bands)
        */
        for (var ii = 0; ii < tickMarksFrequency.length; ii++) {
            tickMarksPx.push(frequenctyToPx(tickMarksFrequency[ii]));
        }

        for (var ii = 0; ii < tickMarksPx.length; ii++) {
            ctx.beginPath();
            ctx.moveTo(tickMarksPx[ii] + 0.5, 0 + 0.5);
            ctx.lineTo(tickMarksPx[ii] + 0.5, height + 0.5);
            ctx.stroke();
        }

        for (var ii = 0; ii < text.length; ii++) {
            ctx.textBaseline = 'bottom';
            ctx.fillText(text[ii], tickMarksPx[ii] + 10, height - 2);
        }

        /*
            Y axis tick marks (db)
        */

        for (var i = 0; i < tickMarksDb.length; i++) {
            var db = tickMarksDb[i],
                scale = 1,
                posY = ((-db) * verticalZoom * scale + height / 2 + (-db) * verticalZoom * (1 - scale)) + verticalOffset;

            ctx.strokeStyle = db == 0 ? "rgba(164, 167, 173, 1)" : "rgba(164, 167, 173, 0.5)";

            ctx.beginPath();
            ctx.moveTo(0 + 0.5, posY + 0.5);
            ctx.lineTo(width + 0.5, posY + 0.5);
            ctx.stroke();
            ctx.textBaseline = 'bottom';
            switch(db) {
              case 0:
                ctx.fillText('0 dB', 10, posY - 2);
                break;
              case 5:
                ctx.fillText('+6 dB', 10, posY - 2);
                break;
              case 10:
                ctx.fillText('+12 dB', 10, posY - 2);
                break;
              case 15:
                ctx.fillText('+18 dB', 10, posY - 2);
                break;
              case -5:
                ctx.fillText('-6 dB', 10, posY - 2);
                break;
              case -10:
                ctx.fillText('-12 dB', 10, posY - 2);
                break;
              case -15:
                ctx.fillText('-18 dB', 10, posY - 2);
                break;
            }
        }
    }

    function clear () {
        ctx.clearRect(0, 0, width, height);
    }

    function updateAnimation () {
        if (!fResponse) return;

        animationProgress = currentFrame / (animationTime * fps);
        animationProgress = applyEasing(animationProgress);

        clear();
        
        if (doDrawGrid) drawGrid();
        if (firstAnimationDone) drawFR(fResponse.pointArray, fResponse.targetPointArray, 1, true);
        drawFR(fResponse.pointArray, fResponse.targetPointArray, 1 - animationProgress);


        if (animationTarget == 1 && animationProgress < 1) {
            currentFrame++;
            window.requestAnimationFrame(updateAnimation);
        }
        else if (animationTarget == 0 && animationProgress > 0) {
            currentFrame--;
            window.requestAnimationFrame(updateAnimation);
        }
        else if (!firstAnimationDone) firstAnimationDone = true;
    }

    function applyEasing (p) {
        return p < .5 ? 4 * p * p * p : (p - 1) * (2 * p - 2) * (2 * p - 2) + 1;
    }

    function scaleCanvas() {
        var devicePixelRatio = window.devicePixelRatio || 1,
            backingStoreRatio = c.webkitBackingStorePixelRatio ||
                                c.mozBackingStorePixelRatio ||
                                c.msBackingStorePixelRatio ||
                                c.oBackingStorePixelRatio ||
                                c.backingStorePixelRatio || 1,

            ratio = devicePixelRatio / backingStoreRatio;
        if (devicePixelRatio !== backingStoreRatio) {

            var oldWidth = c.width;
            var oldHeight = c.height;

            c.width = oldWidth * ratio;
            c.height = oldHeight * ratio;

            c.style.width = oldWidth + 'px';
            c.style.height = oldHeight + 'px';

            // now scale the ctx to counter
            // the fact that we've manually scaled
            // our c element
            ctx.scale(ratio, ratio);
        }
    }

    function resizeCanvas() {
        if (parentElement) {
            width = parentElement.clientWidth;
            height = parentElement.clientHeight;

            c.width = width;
            c.height = height;
        }

        scaleCanvas();

        if (fResponse) {
            fResponse.pointArray = frToPoints(fResponse.response);
            fResponse.targetPointArray = frToPoints(fResponse.targetResponse);
            
            if (doDrawGrid) drawGrid();
            if (firstAnimationDone) drawFR(fResponse.pointArray, fResponse.targetPointArray, 1, true);
            drawFR(fResponse.pointArray, fResponse.targetPointArray, 1 - animationTarget);
        }
    } 

    window.onresize = function () {
        resizeCanvas()   
    }
}