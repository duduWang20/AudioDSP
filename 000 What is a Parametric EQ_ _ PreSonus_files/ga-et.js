$(document).ready(function(){$(document).on("click",".product-artists .youtube-link",function(){var g=$(this);var d=$(".product-nav-title h1:visible").text();var f=$(".product-nav-wrapper ul .tab_active a:visible").text();var e=d+" | "+g.siblings("h3").text().trim();ga("send","event","Product Artists",f+" Tab Click",e)});$(document).on("click",".home-social a",function(){var e=$(this);var d=e.attr("href");ga("send","event","Homepage Instagram Feed","click",d)});$(".container-fluid-homepage.mediabar").on("click",".jp-jplayer",function(){var e=$(this);var d=e.find("video").attr("title");ga("send","event","Homepage Banners","Video Click",d)});$("#post-ads").on("click","a",function(){var e=$(this);var d=e.find("img").attr("alt");ga("send","event","Homepage Banners","Image/Mobile Click",d)});$(document).on("click",".home-news a",function(){var e=$(this);var d=e.find("h3").text();ga("send","event","Homepage News Blocks","click",d)});$("body.homepage").on("click",".home-big-block a",function(){var d=$(".home-big-block h2").text().trim();ga("send","event","Homepage Big Block","click",d)});$(".product-nav__link--buynow").on("click",function(){var d=$(".product-nav-title h1:first").text();ga("send","event","Buy Now Button","Product Nav Click",d)});var c=$("body.products #main");c.on("click","button",function(){var f=$(this);if(f.data("product")!==undefined){var d="Overview Click";var e=$(".product-nav-title h1:first").text();ga("send","event","Buy Now Button",d,e)}});c.on("click","a.btn.small_btn",function(){var d=$(".product-nav-title h1:first").text();ga("send","event","Buy Now Button","Overview Click",d)});$("#main").on("click","button",function(){var f=$(this);if(f.data("product")!==undefined&&f.hasClass("finder-result__omacro-btn")){var d="Finder Result Click";var e=f.siblings("h3:nth-of-type(2)").text().trim();ga("send","event","Buy Now Button",d,e)}});$(document).on("click",".expand_link",function(){var f=$(this);var d=$(".product-nav-title h1:first").text();var e=f.data("expand-id");ga("send","event","Expand Link",d,e)});$(".prod-video .youtube-link").on("click",function(){var d=$(".product-nav-title h1:first").text();ga("send","event","Product Overview Video Click","Click",d)});var b=$(".product-media");b.find(".youtube-link").on("click",function(){var d=$(".product-nav-title h1:first").text();var e=$(this).text().trim();if(e===""){e=$(this).siblings("h4").text().trim()}ga("send","event","Product Media Video Click",d,e)});b.find(".playlist-link").on("click",function(){var d=$(".product-nav-title h1:first").text();var e=$(this).text().trim();if(e===""){e=$(this).siblings("h4").text().trim()}ga("send","event","Product Media Video Playlist Click",d,e)});b.find(".open_zoom").on("click",function(){var d=$(".product-nav-title h1:first").text();var e=$(this).attr("href");e=e.substring(e.lastIndexOf("/")+1).trim();ga("send","event","Product Media Image Click",d,e)});b.on("click",".jp-playlist ul>li",function(){var d=$(".product-nav-title h1:first").text();var e=$(this).find(".jp-playlist-item").text();ga("send","event","Product Media Sound Sample Click",d,e)});$(document).on("click","#globalNav ul li a",function(){var e=$(this);var d=e.text();ga("send","event","Global Nav Links","click",d)});$(document).on("click",".distributor-block a",function(){var e=$(this);var d=e.parent("span").siblings("h4").text()+" - "+e.parent("span").siblings("h4").next().text()+" - "+e.text();ga("send","event","International Distributor Links","click",d)});$(".product-download-container").on("click",".product-download a",function(){var f=$(this);if(!f.hasClass("product-download-notes")){var d=$(".product-nav-title h1:first").text();var e=d+" - "+f.closest("ul").siblings(".dlc-file__header").text()+" - "+f.text();var g="Product Page Downloads";ga("send","event","Product Downloads",g,e)}});ga("set","dimension1",presonus_mws.getViewportDimensions());$(document).on("click",".dropdown-header a, .dropdown-link a",function(){var f=$(this);var e=$(".dropdown-large.open .dropdown-toggle").text();var d=f.text();if(d===""){d=f.siblings("a").text()}ga("send","event","Main Navigation Links",e,d)});var a=$(".footer-container");a.on("click",".footer-sitemap a, .footer-support a, .footer-popular a",function(){var f=$(this);var e=f.parents("ul").siblings("h3").text();var d=f.text();ga("send","event","Footer Links",e,d)});a.on("click","ul.breadcrumbs a",function(){var e=$(this);var d=e.text();if(d===""){d="Home"}ga("send","event","Footer Breadcrumb Links","click",d)});$(document).on("click","#translate_page",function(){var e=$(".product-nav-title h1").text();var d="Open Selector";ga("send","event","Language Selector",e,d)});$(document).on("change","#language_picker",function(){var f=$(this);var e=$(".product-nav-title h1").text();var d=$("option:selected",f).text();ga("send","event","Language Selector",e,d)});$("table.wide-compare h3 a").click(function(){var f=$(this);var e=$(".wide-compare-container h2").text();var d=$(".product-nav-title h1").text()+" - "+f.text();ga("send","event","Wide Compare Table",e,d)});$(".online-retailer__link").click(function(){var f=$(this);var e="Clicks";var d=f.find(".online-retailer__img").attr("alt");ga("send","event","Online Retailer Logo List",e,d)});$("body").on("click",".search__input--search-button",function(g){var f=$(this);var e="Header Search - SM-LG";var d=$(".search__input--text--nav").val();if(f.hasClass("search__input--search-button--mobile")){e="Header Search - XS";d=$(".search__input--text--mobile").val()}else{if(f.hasClass("search__input--search-button--result")){e="Results Search";d=$(".search__input--text--results").val()}}ga("send","event","Search Location",e,d)});$(".search__result-link").on("click",function(g){var f=$(this);var h=f.text().trim();var d=$(".search__term").data("search-term");ga("send","event","Search Results",d.trim(),h)})});