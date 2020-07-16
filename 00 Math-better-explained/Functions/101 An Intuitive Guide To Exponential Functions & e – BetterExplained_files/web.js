function setupSharedLayout() {
    $("#sidebar, #app-placeholder").hide();
    $(".calc-container > .row > .col").addClass("push-l2");
    $(".home-only").hide();
    $(".nav-home").removeClass("active");
    $(".nav-shared").addClass("active");
}

function setupSingleCalcLayout() {
    setupSharedLayout();
    $(".public-info").show();
    $(".nav-shared").addClass("active");
}

// router
function route() {
    var matchesSingleCalc = window.location.href.match(/[/]([0-9]+)/);

    var path = window.location.pathname;

    // legacy calc links - version and content available
    // example: http://bit.ly/2gPx4fs
    var query = Util.parseQuery(window.location.href);
    if (query.v) {
        var shared_calc = Util.parseLegacyCalc(window.location.href);
        Embed.save(shared_calc);

        if (path.match("embed")) {
            shared_calc.name = "";
            ReactDOM.render(
                React.createElement(Shared, {
                    Action: window.Embed,
                    view: "embed",
                    embed_id: shared_calc.id
                }),
                document.getElementById("embed")
            );
        } else {
            setupSingleCalcLayout();
            ReactDOM.render(
                React.createElement(Shared, {
                    Action: window.Embed,
                    view: "public",
                    embed_id: shared_calc.id
                }),
                document.getElementById("app")
            );
        }

        return;
    }

    if (path.match("embed")) {
        var embed_id = path.match(/.*[/]([0-9]+)/)[1];
        console.log("embed id:" + embed_id);
        window.ReactComponent = React.createElement(Shared, {
            Action: window.Embed,
            embed_id: embed_id,
            view: "embed"
        });
        console.log(window.ReactComponent);
        ReactDOM.render(window.ReactComponent, document.getElementById("embed"));
    } else if (path == "/" || path.match("chrome.html")) {
        console.log("home");
        $(".home-only").show();
        window.ReactComponent = React.createElement(App, { Action: window.Action });
        console.log(window.ReactComponent);
        ReactDOM.render(window.ReactComponent, document.getElementById("app"));
    } else if (path.match("shared")) {
        console.log("shared gallery");
        setupSharedLayout();
        $("main").hide();
        $(".about h1").text("Browse calcs from the shared gallery");
    } else if (matchesSingleCalc) {
        // if trailing slash, redirect
        if (path.endsWith("/")) {
            console.log("redirecting...");
            window.location.href = path.slice(0, -1);
            return;
        }

        console.log("shared calc");
        setupSingleCalcLayout();

        //  https://instacalc.com/12345
        var calc_id = matchesSingleCalc[1];

        // TODO: redirect if calc doesn't exist'
        window.ReactComponent = React.createElement(Shared, {
                Action: window.Embed,
                view: "public",
                embed_id: calc_id,
                setTitle: true
            })

        ReactDOM.render(window.ReactComponent, document.getElementById("app"));
    } else {
        console.log("redirecting home...");

        // redirect home if we're on the live site...
        if (window.location.href.match('instacalc.com')) {
            window.location.href = "/";
        }
    }
}

var Action = window.Action;

Action.scanForEmbed = function(fn) {
    $("instacalc:not(.loaded)").each(function(index, el) {
        var el = $(el).addClass("loaded").get(0);
        var embed_id = $(el).attr("embed-id");
        ReactDOM.render(
            React.createElement(Shared, {
                Action: window.Embed,
                view: "embed",
                embed_id: embed_id
            }),
            el
        );
        if (fn) {
            fn(embed_id);
        }
    });
};

$(document).ready(function() {
    route();
    Util.uisetup();
});