define("a/wxopen_card.js",["biz_wap/jsapi/core.js","biz_common/utils/report.js","biz_wap/utils/mmversion.js","biz_common/utils/monitor.js","biz_wap/utils/openUrl.js"],function(e){
"use strict";
function i(e,i){
c("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+i);
}
function t(e){
var t=e.url||"";
t=t.replace(/&amp;/g,"&");
var n=t.indexOf("?"),c=0;
(119==e.pt||120==e.pt)&&(c=2),e.report_param="&tid="+e.traceid+"&ticket="+e.ticket+"&aid="+e.aid,
t.indexOf("?")>=0?t=t.slice(0,n)+".html"+t.slice(n):t+=".html";
var _="",l="";
if(document.getElementsByTagName("mpcpc")[0]&&document.getElementsByTagName("mpcpc")[0].dataset&&(_=document.getElementsByTagName("mpcpc")[0].dataset.category_id_list),
"undefined"==typeof w){
var w;
w=window.cgiData&&window.cgiData.__biz?window.cgiData.__biz:window.parent.biz;
}
l=e.traceid+":"+_+":"+w+":"+e.aid+":"+e.pos_type,console.log("sceneNote",l);
var g={
scene:1067,
sceneNote:l,
userName:e.weapp_info.original_id+"@app",
relativeURL:t,
appVersion:1
},f=!1,v=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(v){
var b=Number(v[1]),j=Number(v[2]),z=Number(v[3]);
b>6?f=!0:6===b&&j>5?f=!0:6===b&&5===j&&z>=3&&(f=!0);
}
return console.log("canJumpOnTap : ",f,e.weapp_info.original_id,navigator.userAgent),
f?(u.setSum(110696,0,1),o?u.setSum(110696,3,1):(o=!0,a=+new Date),r?+new Date-r<2e3&&(u.setSum(110696,4,1),
setTimeout(function(){
r=0;
},2e3)):r=+new Date,p?+new Date-p<3e3&&(u.setSum(110696,5,1),setTimeout(function(){
p=0;
},3e3)):p=+new Date,s?+new Date-s<4e3&&(u.setSum(110696,6,1),setTimeout(function(){
s=0;
},4e3)):s=+new Date,void m.invoke("openWeApp",g,function(t){
var n=+new Date-a;
"openWeApp:ok"===t.err_msg&&i(125+c,e.report_param),"system:function_not_exist"===t.err_msg&&(d("https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect"),
i(126+c,e.report_param)),u.setAvg(110696,2,n).send(),o=!1;
})):(d("https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&original_id="+encodeURIComponent(e.weapp_info.original_id)+"#wechat_redirect"),
void i(126+c,e.report_param));
}
function n(e){
m.invoke("preloadMiniProgramContacts",{
userNames:[e.weapp_info.original_id+"@app"]
},function(){}),m.invoke("preloadMiniProgramEnv",{
userNames:[e.weapp_info.original_id+"@app"]
},function(){});
}
var o,a,r,p,s,m=e("biz_wap/jsapi/core.js"),c=e("biz_common/utils/report.js"),u=(e("biz_wap/utils/mmversion.js"),
e("biz_common/utils/monitor.js")),d=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview;
return{
openWxopen:t,
startConnect:n
};
});define("a/card.js",["biz_common/dom/event.js","biz_common/utils/report.js","a/a_report.js","biz_wap/utils/ajax.js","biz_wap/utils/position.js","biz_wap/jsapi/core.js","biz_wap/jsapi/cardticket.js"],function(e,t,a,i){
"use strict";
function o(e,t){
r("http://mp.weixin.qq.com/mp/ad_report?action=follow&type="+e+t.report_param);
}
function s(e){
var t=e.adData,a=e.pos_type||0,i=t.tid,r=t.type,p=t.url,d=t.rl,l={};
e.report_param=e.report_param||"";
var m=e.btn;
if(m){
n.on(m,"click",function(n){
if(!l[i]){
l[i]=!0;
var m,j,u,f,b=!!n&&n.target;
b&&(m=_.getX(b,"js_ad_link")+n.offsetX,j=_.getY(b,"js_ad_link")+n.offsetY,u=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientWidth,
f=document.getElementsByClassName("js_ad_link")[0]&&document.getElementsByClassName("js_ad_link")[0].clientHeight),
c({
type:r,
report_type:2,
click_pos:0,
url:encodeURIComponent(p),
tid:i,
rl:encodeURIComponent(d),
__biz:biz,
pos_type:a,
pt:105,
pos_x:m,
pos_y:j,
ad_w:u||0,
ad_h:f||0
},function(){
l[i]=!1,o(37,e),s.openCardDetail(t.card_id,t.card_ext,e);
});
}
return!1;
});
}
}
var n=e("biz_common/dom/event.js"),r=e("biz_common/utils/report.js"),p=e("a/a_report.js"),c=p.AdClickReport,_=(e("biz_wap/utils/ajax.js"),
e("biz_wap/utils/position.js")),d=(e("biz_wap/jsapi/core.js"),e("biz_wap/jsapi/cardticket.js"));
return s.openCardDetail=function(e,t,a){
d.openCardDetail({
card_id:e,
card_ext:t,
success:function(){
!!a&&o(38,a);
},
error:function(){
!!a&&o(39,a),i("调起卡券错误");
},
access_denied:function(){
!!a&&o(40,a),i("异常错误[access_denied]");
}
});
},s;
});define("biz_wap/utils/position.js",[],function(){
"use strict";
function e(t,f){
var s=t.offsetLeft;
if(t.offsetParent&&t.offsetParent.className){
var a=t.offsetParent.className;
-1==a.indexOf(f)&&(s+=e(t.offsetParent,f));
}
return s;
}
function t(e,f){
var s=e.offsetTop;
if(e.offsetParent&&e.offsetParent.className){
var a=e.offsetParent.className;
-1==a.indexOf(f)&&(s+=t(e.offsetParent,f));
}
return s;
}
return{
getX:e,
getY:t
};
});define("a/a_report.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","appmsg/log.js","a/a_sign.js","a/a_utils.js"],function(e){
"use strict";
function t(e,t){
var a="https:"==location.protocol?1500:1200,c=window.__report,u="/mp/advertisement_report?r="+Math.random()+"&ascene="+encodeURIComponent(window.ascene||-1)+"&",l=[],m=!1,w=!1;
for(var j in e)e.hasOwnProperty(j)&&l.push(j+"="+e[j]);
var f=2;
1==window.__ad_has_exposure&&(f=1),l.push("has_exposure="+f),u+=l.join("&");
var g="trace_id="+e.tid+"&product_type="+e.pt+"&jump_url="+e.url+"&logtype=3&url="+encodeURIComponent(location.href)+"&rl="+e.rl;
e.tid&&n.gtVersion("6.3.22",!0)&&s.invoke("adDataReport",{
ad_info:g,
need_record_page_operation:1
},function(){}),p("[Ad report] url="+u),2==f&&window.__addIdKeyReport("68064",0),
window.__ad_test_exposure||window.__addIdKeyReport("68064",7),d.createSign(e,function(r,s,n,d,l){
var j=u;
u+="&ad_sign_data="+r+"&ad_sign_k1="+s+"&ad_sign_k2="+n+"&ad_sign_md5="+d,p("[Ad click real report] url="+u),
c&&c(123),o({
url:u,
mayAbort:!0,
type:"GET",
success:function(e){
c&&c(56+i),p("[Ad report suc]"+e),w=!0;
},
error:function(e){
c&&c(57+i),p("[Ad report error]"+e.status+":"+e.responseText);
},
complete:function(){
m||(m=!0,!!t&&t()),p("[Ad report complete]");
},
async:!0
}),setTimeout(function(){
m||(m=!0,window.__ajaxtest="1",c&&c(112),!!t&&t(),p("[Ad report timeout complete]"));
},a),setTimeout(function(){
w||o({
url:u,
type:"GET",
success:function(e){
c&&c(113+i),p("[Ad report suc retry]"+e);
},
error:function(e,t){
c&&c(114+i),p("[Ad report error retry]"+e.status+":"+e.responseText),1==t.type?c&&c(115+i):2==t.type?c&&c(116+i):3==t.type&&c&&c(117+i),
p("[Ad report error detail]"+t.toString());
}
});
},2e3),_.reportUrlLength(r,s,n,d,l,e,j);
}),r(e);
}
function r(e){
var t={
biz_click_add:[{
clktime:parseInt(+new Date/1e3),
aid:parseInt(e.aid),
pos_type:parseInt(e.pos_type),
traceid:e.tid
}]
};
t=JSON.stringify(t),o({
url:"/mp/advertisement_report?action=extra_report&extra_data="+t+"&__biz="+biz,
type:"GET",
timeout:2e3,
success:function(e){
console.log(e);
}
});
}
var o=e("biz_wap/utils/ajax.js"),a=location.protocol,i="https:"==a?5:0,s=e("biz_wap/jsapi/core.js"),n=e("biz_wap/utils/mmversion.js"),p=e("appmsg/log.js"),d=e("a/a_sign.js"),_=e("a/a_utils.js");
return{
AdClickReport:t
};
});define("biz_wap/utils/show_time.js",["biz_common/dom/event.js","biz_wap/utils/ajax.js"],function(t){
"use strict";
function i(){
try{
return JSON.parse(localStorage.getItem(d));
}catch(t){
return{};
}
}
function e(){
try{
localStorage.removeItem(d);
}catch(t){}
}
function n(t,e){
var n=i()||{};
n[t]={
traceid:l[t].info.traceid,
aid:+t,
staytime:e,
pos_type:l[t].info.pos_type
};
try{
localStorage.setItem(d,JSON.stringify(n));
}catch(o){}
}
function o(t){
var e=i()||{};
return e[t]?e[t].staytime:0;
}
function r(t,i){
var e=t.id||t.aid;
if(l[e]){
if(l[e].intervalId)return;
}else l[e]={};
l[e].intervalId=setInterval(function(){
var t=o(e);
n(e,t+f);
},f),i||(l[e].inViewport=!0,l[e].info=t);
}
function a(t,i){
l[t]&&l[t].intervalId&&(clearInterval(l[t].intervalId),l[t].intervalId=null,i||(l[t].inViewport=!1));
}
function s(){
window.__ajaxtest="2";
var t=i(),n={
biz_ad_exposure_time:[]
};
if(t&&!window.__second_open__){
for(var o in t)n.biz_ad_exposure_time.push(t[o]);
n.biz_ad_exposure_time.length&&(n=JSON.stringify(n),u({
url:"/mp/advertisement_report?action=extra_report&extra_data="+n+"&__biz="+biz,
type:"GET",
mayAbort:!0,
async:!1,
timeout:2e3,
success:function(){
e();
}
}));
}
}
function _(){
c.bindVisibilityChangeEvt(function(t){
for(var i in l)t?l[i].inViewport&&r({
id:i
},!0):a(i,!0);
}),c.on(window,"unload",s),c.on(window,"load",s);
}
var c=t("biz_common/dom/event.js"),u=t("biz_wap/utils/ajax.js"),d="__WXLS__AD_SHOW_TIME",l={},f=100;
return _(),{
startShow:r,
stopShow:a
};
});define("biz_common/utils/get_para_list.js",[],function(){
"use strict";
function n(n){
for(var r=0;r<n.children.length;r++)if(-1!==e.indexOf(n.children[r].tagName))return!0;
}
function r(e){
var t=e.children;
if(!t.length)return t;
for(var i,c=[],a=0;a<t.length;a++)i=t[a],n(i)&&-1===i.className.indexOf("js_product_container")?c=c.concat(r(i)):c.push(i);
return c;
}
var e=["P","DIV","SECTION","LI","H1","H2","H3","H4","H5","H6","TABLE"];
return r;
});define("biz_wap/utils/openUrl.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
function r(e){
var r=document.createElement("a");
return r.href=e,{
source:e,
protocol:r.protocol.replace(":",""),
host:r.hostname,
port:r.port,
query:r.search,
params:function(){
for(var e,t={},a=r.search.replace(/^\?/,"").split("&"),o=a.length,n=0;o>n;n++)a[n]&&(e=a[n].split("="),
t[e[0]]=e[1]);
return t;
}(),
file:(r.pathname.match(/([^\/?#]+)$/i)||[,""])[1],
hash:r.hash.replace("#",""),
path:r.pathname.replace(/^([^\/])/,"/$1"),
relative:(r.href.match(/tps?:\/\/[^\/]+(.+)/)||[,""])[1],
segments:r.pathname.replace(/^\//,"").split("/")
};
}
function t(e,t){
var o;
t=t||1,0==e.indexOf("/")&&(o=r(location.href),e=o.protocol+"://"+o.host+e,console.log("openUrlWithExtraWebview with relative path:",e)),
e=e.replace(/(#[^#]*)+/,function(e,r){
return r;
}),a.invoke("openUrlWithExtraWebview",{
url:e,
openType:t
},function(r){
-1==r.err_msg.indexOf("ok")&&(location.href=e);
});
}
var a=e("biz_wap/jsapi/core.js");
return{
openUrlWithExtraWebview:t
};
});define("a/a_sign.js",["biz_wap/jsapi/core.js","biz_common/jquery.md5.js"],function(e){
"use strict";
function n(e,n){
var o="";
if(e.beforeSign)o=e.beforeSign;else{
return n(0,0,0,0,{});
var t,r,a;
}
r=window.md5(o),i.invoke("calRqt",{
rqt:r
},function(e){
var i,o,c;
e.data&&e.k1&&e.k2?(i=encodeURIComponent(e.data),o=e.k1,c=e.k2,!t&&n(i,o,c,r,a)):!t&&n(0,0,0,r,a),
t=!0;
}),setTimeout(function(){
!t&&n(0,0,0,r,a),t=!0;
},e.timeout||500);
}
var i=e("biz_wap/jsapi/core.js");
return e("biz_common/jquery.md5.js"),{
createSign:n
};
});define("appmsg/my_comment_tpl.html.js",[],function(){
return'<!-- 发表留言 -->\n<#if(window.new_appmsg){#>\n  <div id="js_cmt_mine" class="discuss_container_wrp" style="display:none;">\n    <div class="discuss_container editing access">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="Comments are visible to your friends and can be seen by everyone after being approved by the Official Account."></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="Comments will be visible to everyone after being approved by the Official Account."></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="Comments will be visible to everyone after being approved by the Official Account."></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">Comments</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="mod_title_context">\n                    <strong class="mod_title">My Comments</strong>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="weui-loadmore" id="js_mycmt_loading">\n                <i class="weui-loading"></i>\n                <span class="weui-loadmore__tips">正在加载</span>\n            </div>\n            <div id="js_cmt_toast" style="display: none;">\n                <div class="weui-mask_transparent"></div>\n                <div class="weui-toast">\n                    <i class="weui-icon-success-no-circle weui-icon_toast"></i>\n                    <p class="weui-toast__content">已留言</p>\n                </div>\n            </div>\n        </div>\n    </div>\n  </div>\n<#}else{#>\n    <div id="js_cmt_mine" class="discuss_container editing access" style="display:none;">\n        <div class="discuss_container_inner">\n            <h2 class="rich_media_title"><#=window.msg_title#></h2>\n            <span id="log"></span>\n            <div class="frm_textarea_box_wrp">\n                <span class="frm_textarea_box">\n                    <#if(window.friend_comment_enabled == 1){#>\n                    <!-- <textarea id="js_cmt_input" class="frm_textarea" placeholder="Comments are visible to your friends and can be seen by everyone after being approved by the Official Account."></textarea> -->\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="Comments will be visible to everyone after being approved by the Official Account."></textarea>\n                    <#}else{#>\n                    <textarea id="js_cmt_input" class="frm_textarea" placeholder="Comments will be visible to everyone after being approved by the Official Account."></textarea>\n                    <#}#>\n                    <div class="emotion_tool">\n                        <span class="emotion_switch" style="display:none;"></span>\n                        <span id="js_emotion_switch" class="pic_emotion_switch_wrp">\n                            <img class="pic_default" src="<#=window.icon_emotion_switch#>" alt="">\n                            <img class="pic_active" src="<#=window.icon_emotion_switch_active#>" alt="">\n                        </span>\n                        <div class="emotion_panel" id="js_emotion_panel">\n                            <span class="emotion_panel_arrow_wrp" id="js_emotion_panel_arrow_wrp">\n                                <i class="emotion_panel_arrow arrow_out"></i>\n                                <i class="emotion_panel_arrow arrow_in"></i>\n                            </span>\n                            <div class="emotion_list_wrp" id="js_slide_wrapper">\n                                <!--<ul class="emotion_list"></ul>-->\n                                <!--<li class="emotion_item"><i class="icon_emotion"></i></li>-->\n                            </div>\n                            <ul class="emotion_navs" id="js_navbar">\n                                <!--<li class="emotion_nav"></li>-->\n                            </ul>\n                        </div>\n                    </div>\n                </span>\n            </div>\n            <div class="discuss_btn_wrp"><a id="js_cmt_submit" class="btn btn_primary btn_discuss btn_disabled" href="##">Comments</a></div>\n            <div class="discuss_list_wrp" style="display:none">\n                <div class="rich_tips with_line title_tips discuss_title_line">\n                    <span class="tips">My Comments</span>\n                </div>\n                <ul class="discuss_list" id="js_cmt_mylist"></ul>\n            </div>\n            <div class="rich_tips tips_global loading_tips" id="js_mycmt_loading">\n                <img src="<#=window.icon_loading_white#>" class="rich_icon icon_loading_white" alt="">\n                <span class="tips">Loading...</span>\n            </div>\n            <div class="wx_poptips" id="js_cmt_toast" style="display:none;">\n                <img alt="" class="icon_toast" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGoAAABqCAYAAABUIcSXAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoyMTUxMzkxZS1jYWVhLTRmZTMtYTY2NS0xNTRkNDJiOGQyMWIiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MTA3QzM2RTg3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MTA3QzM2RTc3N0UwMTFFNEIzQURGMTQzNzQzMDAxQTUiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NWMyOGVjZTMtNzllZS00ODlhLWIxZTYtYzNmM2RjNzg2YjI2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjIxNTEzOTFlLWNhZWEtNGZlMy1hNjY1LTE1NGQ0MmI4ZDIxYiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pmvxj1gAAAVrSURBVHja7J15rF1TFMbXk74q1ZKHGlMkJVIhIgg1FH+YEpEQJCKmGBpThRoSs5jVVNrSQUvEEENIhGiiNf9BiERICCFIRbUiDa2qvudbOetF3Tzv7XWGffa55/uS7593977n3vO7e5+199p7v56BgQGh0tcmvAUERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERREUQVEERVAUQVEERVAUQbVYk+HdvZVG8b5F0xj4RvhouB+eCy8KrdzDJc1RtAX8ILxvx98V1GyCSkN98Cx4z/95/Wn4fj6j6tUEeN4wkFSnw1MJqj5NhBfAuwaUHREUg4lqNMmePVsHll/HFhVfe1t3FwpJI8DXCCquDrCWNN4B6Tb4M3Z98aTPmTvh0YHl18PXw29yZiKejoPvcUD6E74yFBJbVDk6Bb7K8aP/Hb4c/tRzEYIqprPhSxzlf4Uvhb/0Xoig8qnHAJ3lqPMzfDH8XZ4LEpRf2sVdA5/sqPO9Qfop70UJyn+/boaPddT5yrq7VUUvTIVJI7q74MMddXR8NB1eXcYvhBpZm0s2w72/o86HFoKvLau/pYaXzjLMdUJ6y0LwtWV9CIIaXtvA8+G9HHV03u5q+K+yH47U0NoRngPv7KjzHDwTLj0bS1BDazfJJlcnOOostC6ysnCT+q80G/sIvFVgeW09D8FPVT0uoP7VfvAD8NjA8pqmuAN+OcYAjso0RbIZ8DGB5TVNcRO8JMaHY9SXSdfa3eeANJimWBLrA7JFiZwIXye+NMUV8CcxP2SRFjXefok7NRjSGZJlWUPvw2/wtNiQirSoXWyMsR28wR7AzzYM0oXw+Y7yK+CLJGeaoqjyrJSdZJD6Ov4+z5y6NJc0Az7NUecHydIUy+v60KNyQHoM3nKI1y7YCFiq0i7uBvgER52vDdKqWn9djhY1Dn4G3n6Ecqm2rF74dvgoR53S0hQxW9RJAZAGW5bSn58QJA27dQ7uIEedjywEX5NKVxCqsY6y+qA+LxFI4+yZ6oH0trWkNan80jygtIUsc5SflgAsDXgehfdx1KkkTRE76tN+Xue2jnTU0Ru1oIbvpt30bBtKhOp5yaaRkts0lic8V1i6dPcIRx2d/l8Y8XtNNEg7OOo8bl1kmmOKnDsO88CaYzejau0hWZqiL7C83oCH4SeTHvwV2BqqsHRVztSEYOmWF80NeXZT6Hd4KflResE9vCnBOlCyGfDNAstHTVPUDWoQ1t3iW+9WNizvlhfd4aerXd+ThqiMfNR6+9LvOOro5OY5JX2H4+F7HZD+kGzlamMgldWiirQsjcwWFbjmqZJteekJLK9pisvgL6RhKvuciZiwzrWWGapfrPy30kBVcSBIrw0aD3PU0XB6cehntq7rTMf7/2iQlktDVdXJLXlg6VjmiYBn6rWSTRCH6hvJ0hQrpcGq8oidsmHpTP8t8DGO9/vcWt9qabiqPgup1yKyQwvC2tSefZ73SSpNkUJ4PlLorlHZ+446nc8f3fIyywlJhwrTuwVSjBa1ccvSxN0hjjoK5xVrYZMd9V6XbFfgBukixTwGLg8sDam3dZR/wZ6L/dJlin1en8LS+bgpFbz3Ygvzu1J1HKxYNqxGpCmaCEo12rrBorD6LRp8UbpcdR5VWhTW35KlKd6QFqjuM2XzwlpnMxTvSkuUwuG/Xlg6NtPjbT6WFimF/VG6LEvXgn8QGDjMbBukVECFwhpoS+CQatfX2Q1q6H7wENHdrfCr0lKleEB9JyxNneus+VJpsVL9TwI6W65LovWIGl3KtVJaLv7LBwYTFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFEVQFEERFFWq/hFgADUMN4RzT6/OAAAAAElFTkSuQmCC">\n                <p class="toast_content">Commented</p>\n            </div>\n        </div>\n    </div>\n<#}#>\n<div class="weui-webview-nav" style="display:none;background-color: #f2f2f2;" id="js_fake_bar">\n    <button class="weui-webview-nav__btn_goback" id="js_cmt_goback">goback</button>\n    <button class="weui-webview-nav__btn_forward weui-webview-nav__btn_disabled" disabled="disabled">forward</button>\n</div>';
});define("appmsg/cmt_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(Friends)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_appmsg_tag">Sticky on Top</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <# if (is_from_me == 1) { #>\n    <p class="discuss_extra_info">\n        <!-- <#=time#> -->               \n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">Delete</a>\n    </p>\n    <# } #>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">Author</div>\n            <#}else{#>\n            <div class="nickname">Author\'s Reply</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n            </div>\n            <!-- <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p> -->\n        </div>\n    <# } #>\n        \n</li>\n<#}else{#>\n<li class="js_comment_item discuss_item cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" id="cid<# if (is_from_me == 1) { #><#=my_id#><# } else { #><#=content_id#><# } #>" data-elected="<#=report_elected#>" data-friend="<#=report_friend#>" data-content_id="<#=content_id#>">\n    <# if(is_elected == 1){ #>\n    <div class="discuss_opr">\n        <span class="media_tool_meta tips_global meta_praise js_comment_praise <# if(like_status == 1){ #>praised<# } #>" data-status="<#=like_status#>" data-content-id=\'<#=content_id#>\' data-scene="<#=scene#>">\n            <i class="icon_praise_gray"></i>\n            <span class="praise_num"><# if(like_num_format !== 0){ #><#=like_num_format#> <# } #></span>\n        </span>\n    </div>\n    <# } #>\n    <div class="user_info">\n        <strong class="nickname"><#=nick_name#><# if(is_from_friend == 1){ #>(Friends)<# } #></strong>\n        <img class="avatar" src="<#=logo_url#>">\n        <# if(typeof is_top === \'number\' && is_top == 1){ #><span class="icon_discuss_top">Sticky on Top</span><# } #>\n    </div>\n    <div class="discuss_message">\n        <span class="discuss_status"><#=status#></span>\n        <div class="discuss_message_content"><#=content#></div>\n    </div>\n    <p class="discuss_extra_info">\n        <#=time#>               \n        <# if (is_from_me == 1) { #>\n        <a class="discuss_del js_del" data-my-id="<#=my_id#>" data-content-id="<#=content_id#>">Delete</a>\n        <# } #>\n    </p>\n    <# if(reply && reply.reply_list && reply.reply_list.length > 0){ #>\n        <div class="reply_result">\n            <div class="discuss_opr">\n                <span class="media_tool_meta tips_global meta_praise js_reply_praise <# if(reply.reply_list[0].reply_like_status == 1){ #>praised<# } #>" data-status="<#=reply.reply_list[0].reply_like_status#>" data-content-id="<#=content_id#>" data-reply-id=\'<#=reply.reply_list[0].reply_id#>\' data-scene="<#=scene#>">\n                    <i class="icon_praise_gray"></i>\n                    <span class="praise_num"><# if(reply.reply_list[0].reply_like_num_format !== 0){ #><#=reply.reply_list[0].reply_like_num_format#> <# } #></span>\n                </span>\n            </div>\n            <#if(window.new_appmsg){#>\n            <div class="nickname">Author</div>\n            <#}else{#>\n            <div class="nickname">Author\'s Reply</div>\n            <# } #>\n            <div class="discuss_message">\n                <div class="discuss_message_content"><#=reply.reply_list[0].content#></div>\n            </div>\n            <p class="discuss_extra_info"><#=reply.reply_list[0].time#></p>\n        </div>\n    <# } #>\n        \n</li>\n<#}#>\n';
});define("sougou/a_tpl.html.js",[],function(){
return'<h3 class="rich_media_area_title">相关文章</h3>\n<ul class="relate_article_list">\n    <# for(var i in list){#>\n    <li class="relate_article_item">\n        <a class="relate_article_link sg_link" href="<#=list[i].url#>" target="_blank"><#=list[i].title#></a>\n    </li>\n    <#}#>\n</ul>\n';
});define("appmsg/emotion/emotion.js",["appmsg/emotion/dom.js","appmsg/emotion/slide.js","appmsg/emotion/common.js","appmsg/emotion/nav.js","appmsg/emotion/textarea.js","biz_common/utils/emoji_data.js","biz_common/utils/emoji_panel_data.js"],function(n,t){
"use strict";
function i(){
v.WIDTH=S=_("#js_article").width()||_("#js_cmt_mine").width(),v.pageCount=z=e(),
o(),a(),s();
}
function e(){
d=S-2*P,C=parseInt(d/W),M=3*C-1;
var n=parseInt(R/M);
return R%M!==0&&n++,n;
}
function o(){
var n=_("#js_slide_wrapper"),t=v.wrapperWidth=z*S;
n.css({
width:t+"px"
});
}
function a(){
for(var n=_("#js_slide_wrapper").el[0],t=(S-C*W)/2,i=0,e=z;e>i;i++){
var o=document.createElement("ul");
o.setAttribute("class","emotion_list"),n.appendChild(o),_(o).css({
width:S+"px",
"float":"left",
"padding-left":t+"px",
"padding-right":"0"
}),c(o,i,t);
}
}
function s(){
for(var n=_("#js_navbar"),t=0,i=z;i>t;t++){
var e=_(_.el("li"));
e.attr("class","emotion_nav js_emotion_nav"),D.push(e),n.append(e);
}
v.navs=D;
}
function c(n,t,i){
for(var e=0,o=M;o>e;e++){
var a=document.createElement("li");
if(y++,y>R)break;
a=r(y),_(n).append(a);
}
var s=m(i);
_(n).append(s);
}
function r(n){
var t=_(_.el("li")),i=_(_.el("i")),e=0;
i.attr("class","icon_emotion icon"+n),i.css({
"background-position":"0px "+((1-n)*Z-e)+"px"
}),t.attr("class","emotion_item js_emotion_item"),t.attr("data-index",n);
var o=W+"px";
return t.css({
width:o,
height:o
}),t.append(i),t;
}
function m(n){
var t=_(_.el("li")),i=_(_.el("i"));
t.attr("class","emotion_item del js_emotion_item"),t.attr("data-index",-1),i.attr("class","icon_emotion del");
var e=W+"px";
return t.css({
width:e,
height:e,
right:n+"px"
}),t.append(i),t;
}
function p(){
function n(){
o.show(),w.show(),e.blur(),_.later(function(){
e.blur();
});
}
function t(){
o.hide(),w.hide(),e.focus(),_.later(function(){
e.focus();
});
}
w=_("#js_emotion_panel");
var i=_("#js_cmt_input"),e=i.el[0],o=_("#js_emotion_panel_arrow_wrp");
w.hide(),_("#js_emotion_switch").on("tap",function(i){
console.log("emotion click"),i.preventDefault(),i.stopPropagation(),g=!g,g?n():t();
}),i.on("tap",function(){
w.hide(),g=!1;
});
}
function l(){
function n(n){
if(!v.isMoved){
var t=_(n.currentTarget),i=+t.attr("data-index");
h.inputEmotion(i);
}
}
_("li.js_emotion_item").on("click",n),_("li.js_emotion_item").on("touchend",n);
}
function u(n){
for(var t=[],i=0;i<x.length;i++){
var e=x[i];
if(e.cn){
var o=new RegExp(e.cn.replace("[","\\[").replace("]","\\]"),"g"),a=n.match(o);
a&&(t=t.concat(a));
}
if(e.emoji){
var o=new RegExp(e.emoji,"g"),a=n.match(o);
a&&(t=t.concat(a));
}
}
return _.each(t,function(t){
if(void 0!==I[t]){
var i=I[t],e=O[i],o='<i class="icon_emotion_single '+e+'"></i>';
n=n.replace(t,o);
}
}),n;
}
for(var d,_=n("appmsg/emotion/dom.js"),f=n("appmsg/emotion/slide.js"),v=n("appmsg/emotion/common.js"),j=n("appmsg/emotion/nav.js"),h=n("appmsg/emotion/textarea.js"),t=(_.each,
{}),g=!1,w=null,x=n("biz_common/utils/emoji_data.js"),b=n("biz_common/utils/emoji_panel_data.js"),E={},I={},O=[],T=0;T<x.length;T++){
var N=x[T];
E[N.id]=N;
}
for(var T=0;T<b.length;T++){
var k=b[T],N=E[k];
I[N.cn]=T,N.emoji&&(I[N.emoji]=T),O.push(N.style);
}
var z,M,C,S,D=[],P=15,R=v.EMOTIONS_COUNT,W=v.EMOTION_LI_SIZE,Z=v.EMOTION_SIZE;
t.init=function(){
p(),i(),f.init(),j.activeNav(0),l(),h.init();
};
var y=0;
return t.encode=function(n){
n=u(n);
var t=/\/([\u4e00-\u9fa5\w]{1,4})/g,i=n.match(t);
return i?(_.each(i,function(t){
var i=t.replace("/",""),e=[i.slice(0,4),i.slice(0,3),i.slice(0,2),i.slice(0,1)];
_.each(e,function(t){
if(void 0!==I["["+t+"]"]){
var i=I["["+t+"]"],e=O[i],o='<i class="icon_emotion_single '+e+'"></i>';
n=n.replace("/"+t,o);
}
});
}),n):n;
},t.hidePannel=function(){
w.hide();
},t;
});define("biz_common/base64.js",[],function(r,t,n){
"use strict";
var e,c="2.1.9";
if("undefined"!=typeof n&&n.exports)try{}catch(o){}
var u="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",a=function(r){
for(var t={},n=0,e=r.length;e>n;n++)t[r.charAt(n)]=n;
return t;
}(u),h=String.fromCharCode,i=function(r){
if(r.length<2){
var t=r.charCodeAt(0);
return 128>t?r:2048>t?h(192|t>>>6)+h(128|63&t):h(224|t>>>12&15)+h(128|t>>>6&63)+h(128|63&t);
}
var t=65536+1024*(r.charCodeAt(0)-55296)+(r.charCodeAt(1)-56320);
return h(240|t>>>18&7)+h(128|t>>>12&63)+h(128|t>>>6&63)+h(128|63&t);
},f=/[\uD800-\uDBFF][\uDC00-\uDFFFF]|[^\x00-\x7F]/g,A=function(r){
return r.replace(f,i);
},d=function(r){
var t=[0,2,1][r.length%3],n=r.charCodeAt(0)<<16|(r.length>1?r.charCodeAt(1):0)<<8|(r.length>2?r.charCodeAt(2):0),e=[u.charAt(n>>>18),u.charAt(n>>>12&63),t>=2?"=":u.charAt(n>>>6&63),t>=1?"=":u.charAt(63&n)];
return e.join("");
},g=function(r){
return r.replace(/[\s\S]{1,3}/g,d);
},s=e?function(r){
return(r.constructor===e.constructor?r:new e(r)).toString("base64");
}:function(r){
return g(A(r));
},C=function(r,t){
return t?s(String(r)).replace(/[+\/]/g,function(r){
return"+"==r?"-":"_";
}).replace(/=/g,""):s(String(r));
},l=function(r){
return C(r,!0);
},p=new RegExp(["[À-ß][-¿]","[à-ï][-¿]{2}","[ð-÷][-¿]{3}"].join("|"),"g"),S=function(r){
switch(r.length){
case 4:
var t=(7&r.charCodeAt(0))<<18|(63&r.charCodeAt(1))<<12|(63&r.charCodeAt(2))<<6|63&r.charCodeAt(3),n=t-65536;
return h((n>>>10)+55296)+h((1023&n)+56320);

case 3:
return h((15&r.charCodeAt(0))<<12|(63&r.charCodeAt(1))<<6|63&r.charCodeAt(2));

default:
return h((31&r.charCodeAt(0))<<6|63&r.charCodeAt(1));
}
},b=function(r){
return r.replace(p,S);
},v=function(r){
var t=r.length,n=t%4,e=(t>0?a[r.charAt(0)]<<18:0)|(t>1?a[r.charAt(1)]<<12:0)|(t>2?a[r.charAt(2)]<<6:0)|(t>3?a[r.charAt(3)]:0),c=[h(e>>>16),h(e>>>8&255),h(255&e)];
return c.length-=[0,0,2,1][n],c.join("");
},F=function(r){
return r.replace(/[\s\S]{1,4}/g,v);
},j=e?function(r){
return(r.constructor===e.constructor?r:new e(r,"base64")).toString();
}:function(r){
return b(F(r));
},m=function(r){
return j(String(r).replace(/[-_]/g,function(r){
return"-"==r?"+":"/";
}).replace(/[^A-Za-z0-9\+\/]/g,""));
};
return{
VERSION:c,
atob:F,
btoa:g,
fromBase64:m,
toBase64:C,
utob:A,
encode:C,
encodeURI:l,
btou:b,
decode:m
};
});define("biz_common/utils/report.js",[],function(){
"use strict";
return function(n){
var e=new Image;
e.src=n;
};
});define("appmsg/articleReport.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","biz_wap/utils/mmversion.js"],function(i){
"use strict";
function n(i){
i.dom&&(i.dom.style.display="",t.tap(i.dom,function(){
var n=["https://mp.weixin.qq.com/mp/infringement?url=",encodeURIComponent(i.link.htmlDecode()),"&title=",encodeURIComponent(i.title),"&__biz=",window.biz].join("");
return location.href=n+"#wechat_redirect",!1;
}));
}
i("biz_common/utils/string/html.js");
{
var t=i("biz_common/dom/event.js"),e=i("biz_wap/utils/mmversion.js");
({
not_in_mm:!e.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger")
});
}
return{
init:n
};
});define("biz_wap/utils/hand_up_state.js",["biz_common/dom/event.js"],function(n){
"use strict";
function e(){
if("hidden"in document)return"hidden";
for(var n=["webkit","moz","ms","o"],e=0;e<n.length;e++)return n[e]+"Hidden"in document,
n[e]+"Hidden";
return null;
}
function i(){
var n=e();
return n?document[n]:!1;
}
function t(){
return r;
}
var d=n("biz_common/dom/event.js"),o=e(),r=0,u=0;
if(o){
var m=o.replace(/[H|h]idden/,"")+"visibilitychange";
d.on(document,m,function(){
i()?u=(new Date).getTime():r+=(new Date).getTime()-u;
},!1);
}
return{
getHandUpTime:t,
isHidden:i
};
});