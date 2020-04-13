define("appmsg/weproduct.js",["appmsg/weapp_common.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_common/utils/url/parse.js","biz_common/utils/monitor.js","common/utils.js"],function(t){
"use strict";
function e(){
if(console.log("weproduct init"),"function"==typeof document.getElementsByClassName){
var t=document.getElementsByClassName("js_product_container");
t&&t.length>0&&(a(t),d.getAppidInfo({
onSuccess:function(e){
g.data=e.data,o(t);
}
})),r();
}
}
function a(t){
try{
for(var e=0,a=t.length;a>e;e++){
var o=t[e];
if(o.className.indexOf("js_list_container")>=0){
var i=o.querySelector("img.js_cover");
if(i){
var r=i.parentNode.getBoundingClientRect();
i.style.setProperty("width",r.width+"px","important"),i.style.setProperty("height",r.height+"px","important"),
i.style.setProperty("background-size","unset","important"),"0"==i.getAttribute("data-fail")?n.call(i):i.getAttribute("data-fail")||(i.lazyLoadOnload=i.lazyLoadOnload||[],
i.lazyLoadOnload.push(n));
}
}
}
}catch(p){}
}
function n(){
var t=this.parentNode;
if(t){
var e=document.createElement("span");
e.className=this.className,e.style.background='url("'+this.src+'") no-repeat center',
t.insertBefore(e,this),t.removeChild(this);
}
}
function o(t){
for(var e=0,a=t.length;a>e;e++)!function(t,e){
c.on(t,"tap",".js_product_loop_content",function(t){
var a=t.delegatedTarget,n=a.getAttribute("data-wxaappid"),o=a.getAttribute("data-wxapath"),i=a.getAttribute("data-pid"),r=a.getAttribute("data-appid");
return d.jumpUrl({
privateExtraData:{
cookies:"cps_package=123456; expires=1538286412; busid=mmbiz_ad_cps; domain=*"
},
sourceAppId:r,
appid:n,
path:o,
scene:1091,
sceneNote:encodeURIComponent(location.href)+":"+encodeURIComponent(i),
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(t){
if("openWeApp:ok"===t.err_msg&&i){
var o=a.getAttribute("data-pidtype"),r=2;
2==o&&(r=4),p([{
wxa_appid:n,
pid:i,
type:r,
absolute_order:e+1,
appid:a.getAttribute("data-appid")||"",
templateid:a.getAttribute("data-templateid")||"",
relative_order:1*a.getAttribute("data-order"),
packid:a.getAttribute("data-packid")||""
}]);
}
}
}),!1;
});
}(t[e],e);
var n=document.getElementsByClassName("js_product_loop_content");
if(n&&n.length>0&&m.getInnerHeight()){
for(var e=0;e<n.length;e++)g.pvele.push(n[e]);
i(),c.on(window,"scroll",i);
}
}
function i(){
g.checkInScreenId&&clearTimeout(g.checkInScreenId),g.checkInScreenId=setTimeout(function(){
g.checkInScreenId=null;
for(var t=[],e=0;e<g.pvele.length;e++){
var a=g.pvele[e],n=a.getBoundingClientRect(),o=n.height||n.bottom-n.top;
if(o>0&&n.top<m.getInnerHeight()&&n.bottom>0){
var r=a.getAttribute("data-pid");
if(r){
var d=a.getAttribute("data-pidtype"),s=1;
2==d&&(s=3),t.push({
wxa_appid:a.getAttribute("data-wxaappid"),
pid:r,
type:s,
absolute_order:e+1,
appid:a.getAttribute("data-appid")||"",
templateid:a.getAttribute("data-templateid")||"",
relative_order:1*a.getAttribute("data-order"),
packid:a.getAttribute("data-packid")||""
});
}
g.pvele.splice(e--,1);
}
}
p(t),0==g.pvele.length&&(c.off(window,"scroll",i),i=null);
},100);
}
function r(){
setTimeout(function(){
var t=document.getElementsByClassName("js_product_loop_content").length,e=document.getElementsByClassName("js_product_err_container").length;
u.setSum("64469","15",t+e),u.setSum("64469","16",t),u.setSum("64469","18",e),u.send();
},0);
}
function p(t){
if(t&&0!=t.length){
for(var e={
batch_no:l.getQuery("batch_no")||"",
bizuin:window.biz||"",
biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
total:t.length
},a=0;a<t.length;a++){
var n=t[a],o=a+1;
for(var i in n)n.hasOwnProperty(i)&&(e[i+""+o]=n[i]);
}
s({
url:"/mp/productreport?",
type:"POST",
data:e,
dataType:"json",
async:!0
});
}
}
var d=t("appmsg/weapp_common.js"),c=t("biz_common/dom/event.js"),s=t("biz_wap/utils/ajax.js"),l=t("biz_common/utils/url/parse.js"),u=t("biz_common/utils/monitor.js"),m=t("common/utils.js"),g={
pvele:[],
checkInScreenId:null,
reportRandom:Math.random()
};
e();
});define("appmsg/voicemsg.js",["biz_wap/jsapi/core.js","biz_common/dom/event.js","biz_common/dom/class.js"],function(e){
"use strict";
function o(e){
return document.getElementById(e);
}
function i(){
"1"==window.show_msg_voice&&(s.invoke("getBackgroundAudioState",{},function(e){
console.log("voicemsg getBackgroundAudioState res",e);
var i="waiting"==e.playState||"seeked"==e.playState||"seeking"==e.playState||"play"==e.playState;
e.paused=1*e.paused,e&&!e.paused&&i&&e.src&&e.src.indexOf("/mp/msgvoice?action=get_voice")>=0?a||(o("js_msgvoice_reading").style.display="",
o("js_msgvoice_reading_title").innerHTML=e.title,console.log("hello msgvoice reading"),
n.on(o("js_msgvoice_reading"),"click",function(){
location.href=e.musicbar_url||"https://mp.weixin.qq.com/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"#wechat_redirect";
}),c.addClass(o("page-content"),"voice"),console.log("add class voice in page-content"),
a=!0):(a=!1,o("js_msgvoice_reading").style.display="none",c.removeClass(o("page-content"),"voice"),
console.log("removeClass done"));
}),console.log("begin to getBackgroundAudioState in show_msg_voice"),setTimeout(function(){
i(),4>=d&&(d++,t+=1e3);
},t)),console.log("show_msg_voice is",window.show_msg_voice);
}
var s=e("biz_wap/jsapi/core.js"),n=e("biz_common/dom/event.js"),c=e("biz_common/dom/class.js"),t=1e3,a=!1,d=0;
i();
});define("appmsg/autoread.js",["biz_common/utils/string/html.js","biz_common/dom/event.js","pages/voice_tpl.html.js","pages/voice_component.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function i(){
var e=d("autoread");
e&&(e.innerHTML='<p><label>朗读类型：</label>                                <select id="autoreadSelect">                                <option selected="true" value="0">女1</option>                                <option value="1">女2</option>                                <option value="2">男1</option>                                <option value="6">男2</option>                                </select></p><p id="autoread_voice"></p>',
u.on(d("autoreadSelect"),"change",function(){
p.player&&(p.player.destory(),p.player=null),p.checkAudioId&&(clearTimeout(p.checkAudioId),
p.checkAudioId=null);
var e=d("autoreadSelect");
d("autoread_voice").innerHTML="",o(e.value);
}),o(0));
}
function o(e){
var i=d("autoread_voice");
p._oMusic={
voiceid:p.voiceid,
duration_str:"",
posIndex:p.posIndex,
title:"文章朗读体验（"+p.voiceType[e||0]+"）",
nickname:window.nickname||"公众号"
},s.renderPlayer(r,p._oMusic,i,!0),d("voice_author_"+p.key).innerHTML="来自"+p._oMusic.nickname+"（创建音频中）",
c(e);
}
function n(e,i){
var o=p._oMusic;
d("voice_author_"+p.key).innerHTML="来自"+o.nickname,d("voice_duration_"+p.key).innerHTML=s.formatTime(1*i),
p.player=s.init({
protocal:"hls",
wxIndex:o.posIndex,
type:2,
songId:e,
src:a("https://mp.weixin.qq.com/mp/msgvoice?action=get_voice&media="+e),
allowPause:!0,
autoPlay:!0,
duration:i,
title:o.title,
singer:o.nickname?o.nickname+"'s audio":"Official Account audio",
epname:"Source Article",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:d("voice_main_"+p.key),
playArea:d("voice_play_"+p.key),
progress:d("voice_progress_"+p.key),
fileSize:o.fileSize,
playtimeDom:d("voice_playtime_"+p.key),
bufferDom:d("voice_buffer_"+p.key),
playdotDom:d("voice_playdot_"+p.key),
seekRange:d("voice_seekRange_"+p.key),
seekContainer:d("voice_main_"+p.key),
loadingDom:d("voice_loading_"+p.key)
});
}
function t(e){
p.curNum+=1;
var i=1e3;
p.curNum>p.maxNum&&(i=2e3);
var o=["/mp/msgvoice?action=get_media&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:o,
type:"GET",
dataType:"json",
async:!0,
success:function(o){
o.mediaid&&o.duration?n(o.mediaid,o.duration):p.checkAudioId=setTimeout(function(){
t(e);
},i);
},
error:function(){
p.checkAudioId=setTimeout(function(){
t(e);
},i);
}
});
}
function a(e){
return e+=["&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&uin=",window.uin||"","&key=",window.key||"","&pass_ticket=",window.pass_ticket||"","&clientversion=",window.clientversion||"","&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||""].join("");
}
function c(e){
p.curNum=0;
var i=["/mp/msgvoice?action=tts&mid=",window.mid||"","&idx=",window.idx||"","&biz=",window.biz||"","&type=",e||0].join("");
m({
url:i,
type:"GET",
dataType:"json",
async:!0,
success:function(i){
i&&i.base_resp&&0==i.base_resp.ret?t(e):d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
},
error:function(){
d("voice_author_"+p.key).innerHTML="来自"+window.nickname+"（失败）";
}
});
}
function d(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var u=e("biz_common/dom/event.js"),r=e("pages/voice_tpl.html.js"),s=e("pages/voice_component.js"),m=e("biz_wap/utils/ajax.js"),p={
checkId:"",
voiceid:"autoread",
posIndex:0,
key:"autoread_0",
voiceType:{
0:"女1",
1:"女2",
2:"男1",
6:"男2"
},
maxNum:5,
curNum:0
};
i();
});define("appmsg/voice.js",["biz_common/utils/string/html.js","pages/voice_tpl.html.js","appmsg/log.js","pages/voice_component.js"],function(e){
"use strict";
function i(){
var e=a("js_content");
return e?(p._oElements=e.getElementsByTagName("mpvoice")||[],p._oElements.length<=0?!1:!0):!1;
}
function o(){
p.musicLen=p._oElements.length;
}
function n(){
for(var e=0,i=0;i<p.musicLen;i++){
var o=p._oElements[i],n={},t=o.getAttribute("voice_encode_fileid")||"";
try{
t=decodeURIComponent(t);
}catch(a){}
n.voiceid=r.encodeStr(t),n.voiceid=n.voiceid.replace(/&#61;/g,"=").replace(/^\s/,"").replace(/\s$/,""),
n.isaac=1*o.getAttribute("isaac2")||0,n.src=p.srcRoot.replace("#meidaid#",n.voiceid),
1===n.isaac&&(n.jsapi2Src=n.src+"&voice_type=1"),n.voiceid&&"undefined"!=n.voiceid&&(c(o,n,e),
e++);
}
}
function c(e,i,o){
i.duration=parseInt((1*e.getAttribute("play_length")||0)/1e3,10),i.duration_str=r.formatTime(i.duration),
i.posIndex=o;
var n=e.getAttribute("name")||"";
try{
n=decodeURIComponent(n);
}catch(c){}
i.title=r.encodeStr(n).replace(/^\s/,"").replace(/\s$/,""),i.fileSize=1*e.getAttribute("high_size")||0,
i.nickname=window.nickname,r.renderPlayer(d,i,e),t(i),p.musicList[i.voiceid+"_"+i.posIndex]=i;
}
function t(e){
var i=e.voiceid+"_"+e.posIndex,o="";
if(window.voice_in_appmsg&&window.voice_in_appmsg[e.voiceid]){
var n=window.voice_in_appmsg[e.voiceid],c=window.biz||"",t=window.mid||"",d=window.idx||"";
n.bizuin&&n.appmsgid&&n.idx&&(c=n.bizuin,t=n.appmsgid,d=n.idx);
var p=window.location.protocol||"https:";
o=p+"//mp.weixin.qq.com/mp/audio?_wxindex_=#_wxindex_#&scene=104&__biz=#biz#&mid=#mid#&idx=#idx#&voice_id=#voice_id#&sn=#sn##wechat_redirect".replace("#_wxindex_#",e.posIndex).replace("#biz#",c).replace("#mid#",t).replace("#idx#",d).replace("#voice_id#",e.voiceid).replace("#sn#",n.sn||"");
}
s("[Voice] init"+o);
var m=r.decodeStr(e.title);
e.player=r.init({
wxIndex:e.posIndex,
type:2,
songId:e.voiceid,
comment_id:"",
src:e.src,
jsapi2Src:e.jsapi2Src,
allowPause:!0,
duration:e.duration,
title:m,
singer:window.nickname?window.nickname+"'s audio":"Official Account audio",
epname:"Source Article",
coverImgUrl:window.__appmsgCgiData.hd_head_img,
playingCss:"share_audio_playing",
playCssDom:a("voice_main_"+i),
playArea:a("voice_play_"+i),
progress:a("voice_progress_"+i),
fileSize:e.fileSize,
playtimeDom:a("voice_playtime_"+i),
bufferDom:a("voice_buffer_"+i),
playdotDom:a("voice_playdot_"+i),
seekRange:a("voice_seekRange_"+i),
seekContainer:a("voice_main_"+i),
loadingDom:a("voice_loading_"+i),
detailArea:o?a("voice_detail_"+i):"",
detailUrl:o,
webUrl:o
});
}
function a(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var d=e("pages/voice_tpl.html.js"),s=e("appmsg/log.js"),r=e("pages/voice_component.js"),p={
musicList:{},
musicLen:0,
srcRoot:location.protocol+"//res.wx.qq.com/voice/getvoice?mediaid=#meidaid#"
};
return i()?(o(),n(),p.musicList):void 0;
});define("appmsg/qqmusic.js",["biz_common/utils/string/html.js","biz_common/utils/url/parse.js","appmsg/log.js","pages/qqmusic_tpl.html.js","pages/voice_component.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e){
"use strict";
function t(){
var e=c("js_content");
return e?(o._oElements=e.getElementsByTagName("qqmusic")||[],o._oElements.length<=0?!1:!0):!1;
}
function i(){
o.musicLen=o._oElements.length;
}
function s(){
for(var e=0,t=0;t<o.musicLen;t++){
var i=o._oElements[t],s={};
s.musicid=l.encodeStr(i.getAttribute("musicid")||"").replace(/^\s/,"").replace(/\s$/,""),
s.musicid&&"undefined"!=s.musicid&&(r(i,s,e),e++);
}
}
function r(e,t,i){
if(t.media_id=l.encodeStr(e.getAttribute("mid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.musictype=parseInt(e.getAttribute("musictype"))||1,t.musictype>2&&(t.musictype=2),
t.albumid=l.encodeStr(e.getAttribute("albumid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.otherid=l.encodeStr(e.getAttribute("otherid")||"").replace(/^\s/,"").replace(/\s$/,""),
t.jumpurlkey=l.encodeStr(e.getAttribute("jumpurlkey")||"").replace(/^\s/,"").replace(/\s$/,""),
t.duration=parseInt(e.getAttribute("play_length")||0,10),t.posIndex=i,t.albumurl=l.encodeStr(e.getAttribute("albumurl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.audiourl=l.encodeStr(e.getAttribute("audiourl")||"").replace(/^\s/,"").replace(/\s$/,""),
t.singer=l.encodeStr(e.getAttribute("singer")||"").replace(/^\s/,"").replace(/\s$/,""),
!t.singer||"undefined"==t.singer){
var s=e.getAttribute("src")||"",r=decodeURIComponent(u.getQuery("singer",s)||"");
t.singer=l.encodeStr(r).replace(/^\s/,"").replace(/\s$/,""),t.singer&&"undefined"!=t.singer||(t.singer="");
}
t.music_name=l.encodeStr(e.getAttribute("music_name")||"").replace(/^\s/,"").replace(/\s$/,""),
o.adapter[t.musictype]&&"function"==typeof o.adapter[t.musictype].initData&&(t=o.adapter[t.musictype].initData(t,{
scene:0
})),l.renderPlayer(m,t,e),n(t),o.musicList[t.musicid+"_"+t.posIndex]=t;
}
function n(e){
var t=e.musicid+"_"+e.posIndex;
a("[Music] init "+e.detailUrl);
var i=l.decodeStr(e.music_name);
e.player=l.init({
allowPause:e.allowPause===!0?!0:!1,
wxIndex:e.posIndex,
type:e.type||0,
comment_id:"",
mid:e.media_id,
otherid:e.otherid,
albumid:e.albumid,
songId:e.musicid,
duration:e.duration,
title:i,
singer:window.nickname?window.nickname+"Recommended Songs":"Songs recommended by Official Accounts",
epname:"Music",
coverImgUrl:e.albumurl,
playingCss:"qqmusic_playing",
pauseCss:e.pauseCss||"",
playCssDom:c("qqmusic_main_"+t),
playArea:c("qqmusic_play_"+t),
detailUrl:e.detailUrl||"",
webUrl:e.webUrl||"",
detailArea:c("qqmusic_home_"+t)
});
}
function c(e){
return document.getElementById(e);
}
e("biz_common/utils/string/html.js");
var u=e("biz_common/utils/url/parse.js"),a=e("appmsg/log.js"),m=e("pages/qqmusic_tpl.html.js"),l=e("pages/voice_component.js"),o={
adapter:{
1:e("pages/qqmusic_ctrl.js"),
2:e("pages/kugoumusic_ctrl.js")
},
musicList:{},
musicLen:0
};
return t()?(i(),s(),o.musicList):void 0;
});define("appmsg/iframe.js",["biz_common/utils/string/html.js","pages/video_communicate_adaptor.js","biz_wap/utils/ajax_wx.js","common/utils.js","biz_common/utils/url/parse.js","new_video/ctl.js","pages/version4video.js","biz_common/dom/attr.js","biz_common/dom/event.js"],function(e){
"use strict";
function t(e){
var t=0;
try{
e.contentDocument&&e.contentDocument.body.offsetHeight?t=e.contentDocument.body.offsetHeight:e.Document&&e.Document.body&&e.Document.body.scrollHeight?t=e.Document.body.scrollHeight:e.document&&e.document.body&&e.document.body.scrollHeight&&(t=e.document.body.scrollHeight);
var i=e.parentElement;
if(i&&(e.style.height=t+"px"),/MSIE\s(7|8)/.test(navigator.userAgent)&&e.contentWindow&&e.contentWindow.document){
var o=e.contentWindow.document.getElementsByTagName("html");
o&&o.length&&(o[0].style.overflow="hidden");
}
}catch(n){}
}
function i(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=c.video_top.length,n=e+d.getInnerHeight(),r=0,m=0;t>m;m++){
var a=c.video_top[m];
a.reported?r++:n>=a.start&&n<=a.end&&(a.reported=!0,setTimeout(function(e,t,i){
return function(){
var n=o.getVideoInfo(),d="",r="",c=3;
n[e]&&(n[e].hit_bizuin&&(d=n[e].hit_bizuin),n[e].hit_vid&&(r=n[e].hit_vid),n[e].ori_status&&(c=n[e].ori_status)),
s.report({
step:1,
hit_vid:r,
hit_bizuin:d,
ori_status:c,
vid:e,
screen_num:Math.ceil(t/i),
screen_height:i
});
};
}(a.vid,n,d.getInnerHeight()),1e4));
}
r==t&&(p.off(window,"scroll",i),c.video_top=c.video_iframe=i=null);
}
e("biz_common/utils/string/html.js");
{
var o=e("pages/video_communicate_adaptor.js"),n=e("biz_wap/utils/ajax_wx.js"),d=e("common/utils.js"),r=e("biz_common/utils/url/parse.js"),s=e("new_video/ctl.js"),c={
txVideoReg:/^http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/,
mpVideoReg:/^http(s)*\:\/\/mp\.weixin\.qq\.com\/mp\/readtemplate\?t=pages\/video_player_tmpl/,
video_iframe:[],
video_top:[]
},m=e("pages/version4video.js"),a=e("biz_common/dom/attr.js"),p=(a.setProperty,e("biz_common/dom/event.js")),_=document.getElementsByTagName("iframe"),l=[];
/MicroMessenger/.test(navigator.userAgent);
}
window.reportVid=[];
for(var u=Math.ceil(1e4*Math.random()),w=0,f=_.length;f>w;++w)!function(e){
var i=e.getAttribute("data-src")||"",o=e.className||"",d=e.getAttribute("src")||i;
if(!i||"#"==i){
var s=e.getAttribute("data-display-src");
if(s&&(0==s.indexOf("/cgi-bin/readtemplate?t=vote/vote-new_tmpl")||0==s.indexOf("https://mp.weixin.qq.com/cgi-bin/readtemplate?t=vote/vote-new_tmpl"))){
s=s.replace(/&amp;/g,"&");
for(var a=s.split("&"),p=["/mp/newappmsgvote?action=show"],_=0;_<a.length;_++)(0==a[_].indexOf("__biz=")||0==a[_].indexOf("supervoteid="))&&p.push(a[_]);
p.length>1&&(i=p.join("&")+"#wechat_redirect");
}
}
if(d&&(c.txVideoReg.test(d)||c.mpVideoReg.test(d))){
if(m.isShowMpVideo()||c.mpVideoReg.test(d)){
var w=r.getQuery("vid",i);
if(!w)return;
var f=e.getAttribute("data-vw"),v=e.getAttribute("data-vh"),g=document.domain;
"qq.com"==g&&((new Image).src="https://badjs.weixinbridge.com/badjs?id=139&level=4&from="+window.encodeURIComponent(window.location.host)+"&msg="+window.encodeURIComponent(window.location.href),
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=27302_100_1&lc=1&log0=[beforeD]"+window.encodeURIComponent(window.location.href)),
window.reportVid.push(w),c.video_iframe.push({
dom:e,
vid:w
}),d=["/mp/videoplayer?video_h=",v,"&video_w=",f,"&scene=",window.source,"&random_num=",u,"&article_title=",encodeURIComponent(window.msg_title.htmlDecode()),"&source=4&vid=",w,"&mid=",appmsgid,"&idx=",itemidx||idx,"&__biz=",biz,"&nodetailbar=",window.is_temp_url?1:0,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&version=",version,"&devicetype=",window.devicetype||"","&wxtoken=",window.wxtoken||"","&sessionid=",window.sessionid||""].join(""),
uin||window.__addIdKeyReport&&window.__addIdKeyReport("28307",21),window.__addIdKeyReport&&window.__addIdKeyReport("28307",11),
setTimeout(function(e,t){
t.setAttribute("marginWidth",0),t.setAttribute("marginHeight",0),t.style.top="0",
window.__second_open__?n({
url:e,
type:"GET",
f:"html",
success:function(i){
t.setAttribute("src",e),t.contentDocument.open("text/html","replace"),t.contentDocument.write(i),
t.contentDocument.close(),t.contentWindow.__iframe_src__=e;
}
}):t.setAttribute("src",e);
},0,d,e);
}
}else if(i&&(i.indexOf("newappmsgvote")>-1&&o.indexOf("js_editor_vote_card")>=0||0==i.indexOf("http://mp.weixin.qq.com/bizmall/appmsgcard")&&o.indexOf("card_iframe")>=0||i.indexOf("appmsgvote")>-1||i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1)){
if(window.is_transfer_msg&&!window.reprint_ticket&&i.indexOf(window.biz)<0)return void l.push(e);
if(window.__second_open__||(i=i.replace(/^http:/,location.protocol)),o.indexOf("card_iframe")>=0){
var h=i.replace("#wechat_redirect",["&pass_ticket=",pass_ticket,"&scene=",source,"&msgid=",appmsgid,"&msgidx=",itemidx||idx,"&version=",version,"&devicetype=",window.devicetype||"","&child_biz=",biz,"&wxtoken=",window.wxtoken||""].join(""));
reprint_ticket&&(h+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx].join("")),
window.__second_open__?n({
url:h,
type:"GET",
f:"html",
success:function(o){
e.setAttribute("src",h),e.contentWindow.document.open("text/html","replace"),e.contentWindow.document.write(o),
e.contentWindow.document.close(),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",h),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}else{
var x=i.indexOf("#wechat_redirect")>-1,b=["&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&wxtoken=",window.wxtoken||""].join("");
reprint_ticket?b+=["&mid=",mid,"&idx=",idx,"&reprint_ticket=",reprint_ticket,"&source_mid=",source_mid,"&source_idx=",source_idx,"&appmsg_token=",appmsg_token].join(""):o.indexOf("vote_iframe")>=0&&(b+=["&mid=",mid,"&idx=",idx,"&appmsg_token=",appmsg_token].join(""));
var h=x?i.replace("#wechat_redirect",b):i+b;
window.__second_open__?n({
url:h,
type:"GET",
f:"html",
success:function(o){
e.contentWindow.Ajax=n,e.setAttribute("src",h),e.contentWindow.document.open("text/html","replace"),
e.contentWindow.document.write(o),e.contentWindow.document.close(),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
});
}
}):(e.setAttribute("src",h),-1==i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")&&(e.onload=function(){
t(e);
}));
}
e.appmsg_idx=_;
}
if(i&&i.indexOf("mp.weixin.qq.com/mp/getcdnvideourl")>-1&&f>0){
var y=f,j=3*y/4;
e.width=y,e.height=j,e.style.setProperty&&(e.style.setProperty("width",y+"px","important"),
e.style.setProperty("height",j+"px","important"));
}
}(_[w]);
for(var v=0;v<l.length;v++){
var g=l[v];
g.parentNode.removeChild(g);
}
if(window.iframe_reload=function(){
for(var e=0,i=_.length;i>e;++e){
var o=_[e],n=o.getAttribute("src");
n&&(n.indexOf("newappmsgvote")>-1||n.indexOf("appmsgvote")>-1)&&t(o);
}
},"getElementsByClassName"in document)for(var h,x=document.getElementsByClassName("video_iframe"),w=0;h=x.item(w++);)h.setAttribute("scrolling","no"),
h.style.overflow="hidden";
c.video_iframe.length>0&&setTimeout(function(){
for(var e=c.video_iframe,t=document.getElementById("js_article"),o=0,n=e.length;n>o;o++){
var r=e[o];
if(!r||!r.dom)return;
for(var s=r.dom,m=s.offsetHeight,a=0;s&&t!==s;)a+=s.offsetTop,s=s.offsetParent;
c.video_top.push({
start:a+m/2,
end:a+m/2+d.getInnerHeight(),
reported:!1,
vid:r.vid
});
}
i(),p.on(window,"scroll",i);
});
});function _typeof(e){
return e&&"undefined"!=typeof Symbol&&e.constructor===Symbol?"symbol":typeof e;
}
define("question_answer/utils.js",["biz_common/utils/string/html.js","pages/utils.js","biz_wap/jsapi/core.js","appmsg/log.js","biz_wap/utils/mmversion.js","biz_common/dom/event.js"],function(e){
"use strict";
e("biz_common/utils/string/html.js");
var t=e("pages/utils.js"),r=e("biz_wap/jsapi/core.js"),o=e("appmsg/log.js"),i=e("biz_wap/utils/mmversion.js"),n=e("biz_common/dom/event.js"),a={
classPrefix:"qa__",
previewFlag:!1
},s=function(e,t){
var r=new Date(1e3*e),o=e-t,i=r.getFullYear(),n=1*t,a=new Date(1e3*n);
r.setHours(0),r.setMinutes(0),r.setSeconds(0);
var s=r.getTime()/1e3;
return n>=s?3600>o?Math.ceil(o/60)+" minutes ago":"Today":n>=s-86400?"Yesterday":n>=s-172800?"2 days ago":a.getFullYear()===i?a.getMonth()+1+"Month"+a.getDate()+"Day":a.getFullYear()+"Year"+(a.getMonth()+1)+"Month"+a.getDate()+"Day";
},l=function(e,r){
r=r||Math.ceil((new Date).getTime()/1e3),e.elected_comment_num=e.elected_comment_num||0,
e.like_num=e.like_num||0,1*e.is_anoymous&&1*!e.is_self_question&&(e.questioner_nickname="匿名",
e.questioner_headimg="",e.question_info.questioner_useruin=""),e.questioner_headimg||(e.questioner_headimg="https://mmbiz.qpic.cn/mmbiz_png/cVgP5bCElFjtIK2EeF0OjuGhbZVFRYyGRfbFeZ9GibWsibibIWP7XRSKews1ibWFZD5biaSXb7HfMF6dMricUib4naAFw/0");
var o=e.question_info;
e.question_page_url=c(e.question_page_url.html(!1)),e.questioner_useruin=o.questioner_useruin,
e.qa_id=e.question_info.qa_id,o.answer&&(o.answer.answer_time_str=s(r,o.answer.answer_timestamp)),
o.question&&(o.question.ask_time_str=s(r,o.question.ask_timestamp),o.question.title=o.question.title.html(!0).replace(/\r/g,"").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"),
o.question.title=t.emojiFormat(o.question.title));
for(var i=[],n=[],a=[],l=[o.question?o.question.desc:[],o.answer?o.answer.answer:[]],u=function(e){
l[e]=l[e].map(function(r){
return"TEXT"===r.type&&r.content?(r.content=r.content.html(!0).replace(/\r/g,"").replace(/\n/g,"<br>").replace(/\s/g,"&nbsp;"),
r.content=t.emojiFormat(r.content)):"PIC_CDN_URL"===r.type&&(i.push(r.content),0===e?n.push(r.content):1===e&&a.push(r.content)),
r;
});
},p=0,m=l.length;m>p;p++)u(p,m);
return e.allImg=i,e.allQuestionImg=n,e.allAnswerImg=a,e;
},u=function(e){
if(!a.previewFlag){
a.previewFlag=!0,"undefined"==typeof window.getComputedStyle&&(window.getComputedStyle=document.body.currentStyle?function(e){
return e.currentStyle;
}:{});
var t={
current:e.curUrl,
urls:e.imgsSrc,
currentInfo:{
url:e.curUrl,
data:""
}
},n=e.dataUrlDom,s="";
if(n){
var l=window.getComputedStyle(n),u=document.createElement("canvas");
u.style.width=l.width,u.style.height=l.height,u.width=parseFloat(l.width),u.height=parseFloat(l.height);
var p=u.getContext("2d");
if(!i.isAndroid)try{
p.drawImage(n,0,0,parseFloat(l.width),parseFloat(l.height)),s=u.toDataURL();
}catch(c){
s="";
}
s&&(t.currentInfo.data=s);
}
var m=null;
if(e.posDom){
var d=window.getComputedStyle(e.posDom),g=e.posDom.getBoundingClientRect();
m={
x:g.left-parseFloat(d.paddingLeft)-parseFloat(d.borderLeftWidth),
y:g.top-parseFloat(d.paddingTop)-parseFloat(d.borderTopWidth),
width:g.width-parseFloat(d.paddingLeft)-parseFloat(d.paddingRight)-parseFloat(d.borderLeftWidth)-parseFloat(d.borderRightWidth),
height:g.height-parseFloat(d.paddingTop)-parseFloat(d.paddingBottom)-parseFloat(d.borderTopWidth)-parseFloat(d.borderBottomWidth)
},t.currentInfo.pos=m;
}
r.invoke("imagePreview",t,function(t){
console.log("imagePreview response",t),window.__addIdKeyReport&&e.reportId&&e.reportKey&&window.__addIdKeyReport(e.reportId,e.reportKey);
}),setTimeout(function(){
a.previewFlag=!1;
},500),o("[questionAnswer] click image, src: "+e.curUrl);
}
},p=function(e){
var t="."+a.classPrefix+"preview_js";
e.container.querySelectorAll(t).forEach(function(t){
!function(r){
n.on(r,"click",function(){
var o=null;
o="img"===r.nodeName.toLocaleLowerCase()&&r.className.indexOf("qa__preview_base64_js")>=0?r:r.querySelector("img.qa__preview_base64_js"),
u({
curUrl:r.getAttribute("data-src"),
dataUrlDom:o,
imgsSrc:e.imgsSrc,
posDom:t,
reportId:e.jsapiReportId,
reportKey:e.jsapiReportKey
});
});
}(t);
});
},c=function(e){
return e.replace("#rd","#wechat_redirect").replace(/^http:\/\//,"https://");
};
return{
formatQuestionInfo:l,
formatCreateTime:s,
classPrefix:a.classPrefix,
bindReviewImageEvent:p,
formatPageUrl:c,
reviewImage:u
};
});define("appmsg/product.js",["biz_common/dom/event.js","common/utils.js"],function(e){
"use strict";
function t(){
for(var e=window.pageYOffset||document.documentElement.scrollTop,t=0;t<i.length;++t){
var o=i[t];
if(!o.isReport){
var n=o.offsetTop;
n>=e&&e+r.getInnerHeight()>=n&&(o.isReport=!0,(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=1&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+o.product_id+"&order="+o.order+"&r="+Math.random());
}
}
}
var o=e("biz_common/dom/event.js"),r=e("common/utils.js");
if(document.getElementsByClassName){
for(var n=document.getElementsByClassName("js_product_section"),d=document.getElementsByClassName("js_product_a"),i=[],s=0;s<n.length;++s){
var a=n[s];
a.dataset&&a.dataset.product_id&&a.dataset.order&&i.push({
dom:a,
offsetTop:a.offsetTop,
product_id:a.dataset.product_id||"",
order:a.dataset.order||"",
isReport:!1
});
}
i.length>0&&(o.on(window,"scroll",t),t());
for(var s=0;s<d.length;++s)!function(e){
o.on(e,"click",function(){
var t=e.dataset||{};
return(new Image).src="/mp/appmsgreport?action=appmsg_recom&type=2&__biz="+biz+"&ascene="+(window.ascene||-1)+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&product_id="+(t.product_id||"")+"&order="+(t.order||"")+"&r="+Math.random(),
t.href?(setTimeout(function(){
location.href="http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(t.href)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&scene=0";
},300),!1):!1;
},!0);
}(d[s]);
}
});define("appmsg/review_image.js",["biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/utils/url/parse.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_wap/utils/mmversion.js","appmsg/cdn_img_lib.js"],function(e){
"use strict";
function t(e,t,o,a){
var i={
current:e,
urls:t,
currentInfo:{
url:e,
data:o,
pos:a
}
};
console.log("imagePreview request",i),console.log("previewFlag",g),g||(g=!0,r.invoke("imagePreview",i,function(e){
console.log("imagePreview response",e),window.__addIdKeyReport&&window.__addIdKeyReport("28307","2");
}),setTimeout(function(){
g=!1;
},500),d("[Appmsg] click image, src: "+e));
}
function o(e,t){
s({
url:"/mp/rewardappmsgreport",
data:{
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
oper:t||"",
cdn_url:e||"",
ascene:window.ascene||-1
},
type:"POST",
dataType:"json",
async:!0
});
}
function a(e){
var a=[],r=e.container,d=e.imgs||[];
if(r)for(var s=r.getElementsByTagName("img")||[],g=0,l=s.length;l>g;g++)d.push(s.item(g));
for(var c=p.isIOS&&1==window._copyright_stat&&1==window.is_need_reward,m=0,g=0,l=d.length;l>g;g++){
var w=d[g],u=w.getAttribute("data-src")||w.getAttribute("src"),h=w.getAttribute("data-type");
if(u&&!u.isGif()&&0!=u.indexOf("data:")){
for(;-1!=u.indexOf("?tp=webp");)u=u.replace("?tp=webp","");
w.dataset&&w.dataset.s&&u.isCDN()&&(u=u.replace(/\/640$/,"/0"),u=u.replace(/\/640\?/,"/0?")),
u.isCDN()&&(u=n.addParam(u,"wxfrom","3",!0)),u=e.is_https_res?u.http2https():u.https2http(),
h&&(u=n.addParam(u,"wxtype",h,!0)),a.push(u),"1"!=w.getAttribute("data-nopreviewclick")&&!function(e){
i.on(w,"click",function(i){
if(!(i&&i.target&&i.target.className&&i.target.className.indexOf("img_loadederror")>-1)){
if("function"==typeof window.__addIdKeyReport&&window.__addIdKeyReport("110644",2),
window.getComputedStyle){
for(var r=i.target,n=r.getBoundingClientRect(),d=.15*n.width,s=.15*n.height,g=!0;r&&"body"!=r.nodeName.toLowerCase();){
var l=window.getComputedStyle(r,null),w=parseInt(l.getPropertyValue("opacity")),u=l.getPropertyValue("filter"),h=l.getPropertyValue("visibility"),f=l.mixBlendMode;
if(1!=w||"visible"!=h||u.indexOf("opacity")>=0||u.indexOf("blur")>=0||f&&"normal"!=f){
g=!1;
break;
}
var b=r.getBoundingClientRect();
if(("hidden"==l.overflow||"hidden"==l.overflowX||"hidden"==l.overflowY)&&(b.left-n.left>d||b.right-n.right<-1*d||b.top-n.top>s||b.bottom-n.bottom<-1*s)){
g=!1;
break;
}
r=r.parentElement;
}
if(!g){
if(console.log("don't try this again"),"function"==typeof window.__addIdKeyReport){
window.__addIdKeyReport("110644",3);
var y=new Image,_="https://badjs.weixinbridge.com/badjs?id=168&level=4&from="+encodeURIComponent(location.href)+"&msg="+encodeURIComponent(e);
y.src=_.slice(0,1024);
}
return!1;
}
}
"undefined"==typeof getComputedStyle&&(window.getComputedStyle=document.body.currentStyle?function(e){
return e.currentStyle;
}:{});
var v=i.target,j=window.getComputedStyle(v),F=v.getBoundingClientRect(),x=document.createElement("canvas");
x.style.width=j.width,x.style.height=j.height,x.width=parseFloat(j.width),x.height=parseFloat(j.height);
var C=x.getContext("2d"),I="";
C.drawImage(v,0,0,parseFloat(j.width),parseFloat(j.height));
try{
I=x.toDataURL();
}catch(i){}
p.isAndroid&&(I=""),t(e,a,I,{
x:F.left-parseFloat(j.paddingLeft)-parseFloat(j.borderLeftWidth),
y:F.top-parseFloat(j.paddingTop)-parseFloat(j.borderTopWidth),
width:F.width-parseFloat(j.paddingLeft)-parseFloat(j.paddingRight)-parseFloat(j.borderLeftWidth)-parseFloat(j.borderRightWidth),
height:F.height-parseFloat(j.paddingTop)-parseFloat(j.paddingBottom)-parseFloat(j.borderTopWidth)-parseFloat(j.borderBottomWidth)
}),c&&0==m&&o(i.target.src,2);
}
});
}(u),w.removeAttribute("data-nopreviewclick");
}
}
if(c){
var f=document.getElementById("js_content"),b=0,y=0;
i.on(f,"touchstart",function(e){
return e&&e.target&&e.target.tagName&&"string"==typeof e.target.tagName&&"IMG"==e.target.tagName.toString().toUpperCase()?(m=+new Date,
b=e.touches[0].pageX,void(y=e.touches[0].pageY)):void(m=0);
}),i.on(f,"touchmove",function(e){
var t=e.touches[0].pageX,o=e.touches[0].pageY;
Math.abs(t-b)>10&&Math.abs(o-y)>10&&(m=0);
}),i.on(f,"touchend",function(e){
0!=m&&(+new Date-m>800&&+new Date-m<6e3?o(e.target.src,1):m=0);
});
}
}
var i=e("biz_common/dom/event.js"),r=e("biz_wap/jsapi/core.js"),n=e("biz_common/utils/url/parse.js"),d=e("appmsg/log.js"),s=e("biz_wap/utils/ajax.js"),p=e("biz_wap/utils/mmversion.js"),g=!1;
return e("appmsg/cdn_img_lib.js"),a;
});define("appmsg/outer_link.js",["biz_common/dom/event.js","appmsg/open_url_with_webview.js"],function(e){
"use strict";
function n(e){
var n=e.container;
if(!n)return!1;
for(var r=n.getElementsByTagName("a")||[],o=0,a=r.length;a>o;++o)!function(n){
var o=r[n],a=o.getAttribute("href");
if(!a)return!1;
var c=0,s=o.innerHTML;
/^[^<>]+$/.test(s)?c=1:/^<img[^>]*>$/.test(s)&&(c=2),!!e.changeHref&&!/^https?:\/\/mp\.weixin\.qq\.com\/cgi-bin\//.test(a)&&(a=e.changeHref(a,c)),
t.on(o,"tap",function(){
return window.__second_open__?i(a,{
sample:1,
reject:function(){
location.href=a;
}
}):location.href=a,!1;
},!0);
}(o);
}
var t=e("biz_common/dom/event.js"),i=e("appmsg/open_url_with_webview.js");
return n;
});define("appmsg/copyright_report.js",["common/utils.js","biz_common/dom/event.js"],function(o){
"use strict";
function t(o){
var t=["/mp/copyrightreport?action=report&biz=",biz,"&scene=",o.scene,"&user_uin=",user_uin,"&uin=",uin,"&key=",key,"&pass_ticket=",pass_ticket,"&t=",Math.random()].join("");
window.isSg&&(t+="&from=sougou");
var e=new Image;
e.src=t.substr(0,1024);
}
function e(){
var o=__appmsgCgiData;
if("2"==o.copyright_stat){
for(var t=r("copyright_info"),e=r("js_article");t&&e!==t;)s.copyright_top+=t.offsetTop,
t=t.offsetParent;
c.on(window,"scroll",n);
}
}
function n(){
var o=window.pageYOffset||document.documentElement.scrollTop;
o+i.getInnerHeight()>s.copyright_top&&(t({
scene:"1",
card_pos:"0"
}),c.off(window,"scroll",n),n=s.copyright_top=null);
}
function r(o){
return document.getElementById(o);
}
var i=o("common/utils.js"),c=o("biz_common/dom/event.js"),s={
copyright_top:0
};
return{
card_click_report:t,
card_pv_report:e
};
});define("appmsg/async.js",["biz_common/utils/string/html.js","appmsg/reward_utils.js","appmsg/comment_utils.js","pages/create_txv.js","pages/video_ctrl.js","biz_common/utils/url/parse.js","appmsg/img_copyright_tpl.html.js","appmsg/appmsgext.js","appmsg/share_tpl.html.js","biz_common/dom/event.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js","biz_common/tmpl.js","biz_wap/utils/storage.js","appmsg/log.js","rt/appmsg/getappmsgext.rt.js","a/a_utils.js","pages/version4video.js","appmsg/like.js","appmsg/iframe.js","appmsg/more_read.js"],function(e,t,i,r){
"use strict";
function a(){
for(var t=document.getElementsByTagName("iframe"),i=[],r=0,a=t.length;a>r;++r)i.push(t[r]);
t=null;
var o=document.getElementById("js_content"),s=o.offsetWidth,d=s/p.getRatio();
window.logs.video_cnt=0;
for(var r=0,a=i.length;a>r;++r){
var _=i[r],m=_.getAttribute("data-src")||"",c=_.getAttribute("src")||m;
if(c){
var l=e("pages/version4video.js");
if(0==c.indexOf("http://z.weishi.com/weixin/player.html"))c=c.replace(/width=\d+/g,"width="+s),
c=c.replace(/height=\d+/g,"height="+d),_.width=s,_.height=d,_.style.setProperty&&(_.style.setProperty("width",s+"px","important"),
_.style.setProperty("height",d+"px","important")),_.setAttribute("src",c),window.__addIdKeyReport&&window.__addIdKeyReport("28307",10),
window.logs.video_cnt++;else if(/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?/.test(c)){
if(!l.isShowMpVideo()){
var w;
w=n(v?_:_),w&&z.push(w),"function"==typeof window.__addIdKeyReport&&(window.__addIdKeyReport("28307",10),
l.device.inWechat&&l.device.inWindowWechat?window.__addIdKeyReport("110644",0):l.device.inWechat&&l.device.inMacWechat&&window.__addIdKeyReport("110644",1));
}
window.logs.video_cnt++;
continue;
}
}
}
z.length>0&&"function"==typeof window.__getVideoWh&&f.on(window,"resize",function(){
try{
for(var e=0,t=z.length;t>e;e++){
var i=z[e],r=i.playerObj;
if(r){
var a=window.__getVideoWh(i);
i.style.width=a.w+"px",i.style.height=a.h+"px",r.resize({
width:a.vw,
height:a.vh
});
}
}
}catch(n){}
},!1);
}
function n(e){
var t=e.getAttribute("data-src")||e.getAttribute("src"),i=w.getQuery("vid",t),r=e.getAttribute("data-vw"),a=e.getAttribute("data-vh"),n=e.getAttribute("data-ratio"),s=document.createElement("span");
s.setAttribute("data-ratio",n),s.id="js_tx_video_container_"+Math.random(),s.className="js_tx_video_container",
s.style.cssText=e.style.cssText,s.style.display="none";
var d=e.parentNode;
return d?(d.lastChild===e?d.appendChild(s):d.insertBefore(s,e.nextSibling),l.createTxVideo({
containerId:s.id,
vid:i,
width:r,
height:a,
autoplay:!1,
allowFullScreen:!0,
onSuccess:function(e){
s.playerObj=e.player,o(s,i),s.style.display="block";
},
onError:function(){}
}),d.removeChild(e),s):void 0;
}
function o(e,t){
if(t&&e){
var i=e.parentNode;
if(i){
for(var r=[],a=0,n=i.children.length;n>a;a++){
var o=i.children[a];
o.className.indexOf("img_loading")>=0&&o.getAttribute("data-vid")==t&&r.push(o);
}
for(var a=0,n=r.length;n>a;a++)i.removeChild(r[a]);
e.style.display="block";
}
}
}
function s(e){
if(e&&e.img_copy_info&&e.img_copy_info.list){
for(var t={},i=e.img_copy_info.list,r=window.__appmsgCgiData.copyright_stat,a=window.__appmsgCgiData.source_biz,n=0,o=i.length;o>n;n++){
var s=i[n];
if(2==s.type){
if(2==r&&a==s.source_uin)continue;
t[s.img_url]={
source_nickname:s.source_nickname,
source_uin:s.source_uin,
source_encode_biz:s.source_encode_biz||""
};
}
}
for(var d=document.getElementsByTagName("img"),n=0,o=d.length;o>n;n++){
var s=d[n],_=s.getAttribute("data-src")||s.getAttribute("data-backsrc")||"";
if(t[_]){
var m=document.createElement("div");
m.innerHTML=k.tmpl(u,t[_]);
{
var c=m.children[0],l=s.parentNode,p=l.insertBefore(c,s),w=p.children[0];
(function(e,t){
f.on(t,"click",function(){
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene=112#wechat_redirect";
return-1!=navigator.userAgent.indexOf("WindowsWechat")||-1!=navigator.userAgent.indexOf("Mac OS")?(location.href=t,
!1):(b.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}),!1);
});
})(t[_],w);
}
p.insertBefore(s,w);
}
}
}
}
function d(t){
var i=t.appmsgstat||{};
if(window.appmsgstat||(window.appmsgstat=i),i.show){
{
var a=document.getElementById("js_read_area3"),n=document.getElementById("like3"),o=document.getElementById("like_old"),s=document.getElementById("likeNum3"),d=document.getElementById("likeNum_old"),_=document.getElementById("readNum3");
document.getElementById("js_like_title");
}
if(!(a&&n&&s&&_))return;
var l,p,w=e("appmsg/like.js");
1==appmsg_like_type?(l=o,p=d):(l=n,p=s),i.liked=window.is_temp_url?window.liked:i.liked,
w.showReadNum({
show:!0,
readAreaDom:a,
readNumDom:_,
readAreaDisplayValue:"block",
readNum:window.is_temp_url?window.read_num:i.read_num
}),b.invoke("handleHaokanAction",{
imgUrl:ori_head_img_url?ori_head_img_url:"",
link:msg_link.html(!1),
desc:msg_desc?msg_desc:"",
title:msg_title?msg_title.htmlDecode():"",
action:"update_recommend_status",
permission:i.like_disabled||2!==appmsg_like_type?0:1,
recommend:i.liked?1:0
},function(){}),i.like_disabled||(w.showLikeNum({
show:!0,
likeAreaDom:l,
likeNumDom:p,
liked:i.liked,
className:1===appmsg_like_type?"praised":"like_btn_liked",
likeAreaDisplayValue:"inline",
likeNum:window.is_temp_url?window.like_num:i.like_num
}),w.initLikeEvent({
likeAreaDom:l,
likeNumDom:p,
className:1===appmsg_like_type?"praised":"like_btn_liked",
prompted:i.prompted,
biz:window.biz,
mid:window.mid,
idx:window.idx,
appmsgid:window.appmsgid,
itemidx:window.itemidx,
is_temp_url:window.is_temp_url,
showType:i.style
}));
}
var u=document.getElementById("js_share_appmsg");
t.share_redirect_url&&u&&(window._share_redirect_url=t.share_redirect_url,u.innerHTML=k.tmpl(h,{
url:t.share_redirect_url
})),c.initCommentByExtData(t),x.setBackgroundClass(),m.init(t.reward,{
reward_entrance_enable_for_preview:t.reward_entrance_enable_for_preview,
reward_wording:t.reward_wording,
reward_author_head:t.reward_author_head
});
var g=document.getElementById("js_cmt_container");
1==t.comment_entrance_enable_for_preview&&window.is_temp_url&&g&&(g.style.display="block"),
t.comment_entrance_enable_for_preview&&(document.getElementById("js_preview_cmt")&&(document.getElementById("js_preview_cmt").style.display="block"),
f.on(document.getElementById("js_preview_cmt_write"),"tap",function(e){
e.preventDefault(),r("预览状态下无法操作。");
})),t.comment_enabled&&g&&(g.style.display="block");
}
function _(){
var t=0,i="27613",r="50";
g.getData({
biz:biz,
appmsg_type:appmsg_type,
mid:mid,
sn:sn,
idx:idx,
scene:source,
title:msg_title,
ct:ct,
abtest_cookie:abtest_cookie,
devicetype:devicetype,
version:window.clientversion,
is_need_ticket:z&&z.length>0?1:0,
is_need_ad:0,
comment_id:comment_id,
is_need_reward:is_need_reward,
both_ad:0,
reward_uin_count:is_need_reward?3*m.getCountPerLine({
can_reward:!0
}):0,
send_time:window.send_time||"",
msg_daily_idx:msg_daily_idx,
item_show_type:window.item_show_type,
is_original:t,
is_only_read:is_only_read,
req_id:window.req_id||"",
pass_ticket:pass_ticket,
is_temp_url:window.is_temp_url||0,
more_read_type:more_read_type||0,
rtId:i,
rtKey:r,
appmsg_like_type:window.appmsg_like_type,
onSuccess:function(t){
if(t)try{
if(t.friend_subscribe_count>0?b.invoke("currentMpInfo",{
userName:window.user_name,
brandName:window.title,
brandIcon:window.hd_head_img.replace(/\/0$/,"/132"),
desc:t.friend_subscribe_count+"个朋友关注"
}):t.original_article_count>0&&b.invoke("currentMpInfo",{
userName:window.user_name,
brandName:window.title,
brandIcon:window.hd_head_img.replace(/\/0$/,"/132"),
desc:t.original_article_count+"篇原创文章"
}),t&&t.base_resp&&t.base_resp.wxtoken&&(window.wxtoken=t.base_resp.wxtoken),window.fromWeixinCached&&e("appmsg/iframe.js"),
s(t),t.ret)return;
var a=document.getElementById("js_more_read_area");
a&&t&&t.more_read_list&&t.more_read_list.length&&e("appmsg/more_read.js")(a,t.more_read_list),
d({
appmsgstat:t.appmsgstat,
comment_enabled:t.comment_enabled,
comment_count:t.comment_count,
friend_comment_enabled:t.friend_comment_enabled,
only_fans_can_comment:t.only_fans_can_comment,
reward:{
reward_total:t.reward_total_count,
reward_head_imgs:t.reward_head_imgs||[],
can_reward:t.can_reward,
user_can_reward:t.user_can_reward,
reward_qrcode_ticket:t.reward_qrcode_ticket,
timestamp:t.timestamp,
reward_author_head:t.reward_author_head,
rewardsn:t.rewardsn,
scene:source,
is_need_reward:is_need_reward,
title:msg_title,
author_id:author_id,
appmsgextRtId:i,
appmsgextRtKey:r
},
reward_entrance_enable_for_preview:t.reward_entrance_enable_for_preview,
reward_wording:t.reward_wording,
reward_author_head:t.reward_author_head,
comment_entrance_enable_for_preview:t.comment_entrance_enable_for_preview,
share_redirect_url:t.share_redirect_url||"",
logo_url:t.logo_url,
nick_name:t.nick_name,
is_fans:t.is_fans
});
}catch(n){
j("[Appmsg] error parse async data, biz="+biz+", mid="+mid);
var o=new Image;
return o.src=("http://mp.weixin.qq.com/mp/jsreport?1=1&key=1&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key1]"+encodeURIComponent(n.toString())+"&r="+Math.random()).substr(0,1024),
void(console&&console.error(n));
}
},
onError:function(){
var e=new Image;
e.src="http://mp.weixin.qq.com/mp/jsreport?1=1&key=2&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key2]ajax_err&r="+Math.random();
}
});
}
e("biz_common/utils/string/html.js");
var m=e("appmsg/reward_utils.js"),c=e("appmsg/comment_utils.js"),l=e("pages/create_txv.js"),p=e("pages/video_ctrl.js"),w=e("biz_common/utils/url/parse.js"),u=e("appmsg/img_copyright_tpl.html.js"),g=e("appmsg/appmsgext.js"),h=e("appmsg/share_tpl.html.js"),y=navigator.userAgent,v=-1!=y.indexOf("MicroMessenger"),f=(-1!=navigator.userAgent.indexOf("WindowsWechat"),
e("biz_common/dom/event.js")),b=(e("biz_wap/utils/ajax.js"),e("biz_wap/jsapi/core.js")),k=e("biz_common/tmpl.js"),j=(e("biz_wap/utils/storage.js"),
e("appmsg/log.js")),x=(e("rt/appmsg/getappmsgext.rt.js"),e("a/a_utils.js")),z=[];
a(),_();
});define("biz_wap/ui/lazyload_img.js",["biz_wap/utils/mmversion.js","biz_common/dom/event.js","biz_common/dom/attr.js","biz_common/ui/imgonepx.js"],function(t){
"use strict";
function i(){
var t=this.images;
if(!t||t.length<=0)return!1;
var i=window.pageYOffset||document.documentElement.scrollTop,e=window.innerHeight||document.documentElement.clientHeight,o=this.offset||60,n=0;
if("wifi"==window.networkType){
var s={
bottom:1,
top:1
};
this.lazyloadHeightWhenWifi&&(s=this.lazyloadHeightWhenWifi()),o=Math.max(s.bottom*e,o),
n=Math.max(s.top*e,n);
}
for(var r=+new Date,c=[],d=this.sw,f=this,g=-1,u=0,p=t.length;p>u;u++)!function(t,i){
var s=t.el.getBoundingClientRect(),r=t.src;
if(r){
(r.match(/\:\/\/[^\/]+\/mmbiz\//)&&r.indexOf("wx_fmt=gif")>-1||r.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&g++;
var f=n,u=o;
(r.match(/\:\/\/[^\/]+\/mmbiz\//)&&r.indexOf("wx_fmt=gif")>-1||r.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&l&&(f=0,
u=60),!t.show&&(s.top<=0&&s.top+s.height+f>=0||s.top>0&&s.top<e+u)&&(i.inImgRead&&(s.top<=0&&s.top+s.height>=0||s.top>0&&s.top<e)&&i.inImgRead(r,networkType),
i.changeSrc&&(r=i.changeSrc(t.el,r,g)),t.el.onerror=function(){
var e=this;
!!i.onerror&&i.onerror(t.el.src,e);
},t.el.onload=function(){
var e=this;
if("data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="!=e.src){
var o=e.getAttribute("data-forceheight");
o?(e.removeAttribute("data-forceheight"),h(e,"height",o,"important")):h(e,"height","auto","important"),
e.getAttribute("_width")?h(e,"width",e.getAttribute("_width"),"important"):h(e,"width","auto","important"),
!!i.onload&&i.onload(t.el.src,e);
}
},m(t.el,"src",r),c.push(r),t.show=!0,h(t.el,"visibility","visible","important")),
a.isWp&&1*t.el.width>d&&(t.el.width=d);
}
}(t[u],f);
c.length>0&&this.detect&&this.detect({
time:r,
loadList:c,
scrollTop:i
});
}
function e(){
var t=document.getElementsByTagName("img"),e=[],o=this.container,n=this.attrKey||"data-src",a=o.offsetWidth,s=0,r=this.imgOccupied||!1,l=this.crossOrigin||!1;
o.currentStyle?s=o.currentStyle.width:"undefined"!=typeof getComputedStyle&&(s=getComputedStyle(o).width),
this.sw=1*s.replace("px","");
for(var d=0,f=t.length;f>d;d++){
var g=t.item(d),u=m(g,n),p=m(g,"src");
if(u&&!(p&&p.indexOf("data:image/gif;base64")<0)){
var w=100;
if(g.dataset&&g.dataset.ratio){
var A=1*g.dataset.ratio,b=1*g.dataset.w||a;
"number"==typeof A&&A>0?(b=a>=b?b:a,w=b*A,r||(g.style.width&&g.setAttribute("_width",g.style.width),
h(g,"width",b+"px","important"),h(g,"visibility","visible","important"),g.setAttribute("src",c))):h(g,"visibility","hidden","important");
}else h(g,"visibility","hidden","important");
r||h(g,"height",w+"px","important"),l&&-1==u.indexOf("mmsns.qpic.cn")&&!(u.match(/\:\/\/[^\/]+\/mmbiz\//)&&u.indexOf("wx_fmt=gif")>-1||u.match(/\:\/\/[^\/]+\/mmbiz_gif\//))&&(g.crossOrigin="anonymous"),
e.push({
el:g,
src:u,
height:w,
show:!1
});
}
}
this.images=e,i.call(this);
}
function o(t){
if(this.__called_first_time)i.call(this,t),this.__called_first_time=!1;else if(!this.debounce){
this.debounce=!0;
var e=this;
setTimeout(function(){
i.call(e,t),e.debounce=!1;
},500);
}
}
function n(t){
s.on(window,"scroll",function(i){
o.call(t,i);
}),setTimeout(function(){
e.call(t,{});
},0),s.on(document,"touchmove",function(i){
o.call(t,i);
}),t.__called_first_time=!0,o.call(t,{});
}
var a=t("biz_wap/utils/mmversion.js"),s=t("biz_common/dom/event.js"),r=t("biz_common/dom/attr.js"),m=r.attr,h=r.setProperty,c=t("biz_common/ui/imgonepx.js"),l=!0;
return n;
});define("biz_common/log/jserr.js",[],function(){
function e(e,n){
return e?(r.replaceStr&&(e=e.replace(r.replaceStr,"")),n&&(e=e.substr(0,n)),encodeURIComponent(e.replace("\n",","))):"";
}
var r={};
return window.onerror=function(n,o,t,c,i){
return"Script error."==n||o?"undefined"==typeof r.key||"undefined"==typeof r.reporturl?!0:void setTimeout(function(){
c=c||window.event&&window.event.errorCharacter||0;
var l=[];
if(l.push("msg:"+e(n,100)),o&&(o=o.replace(/[^\,]*\/js\//g,"")),l.push("url:"+e(o,200)),
l.push("line:"+t),l.push("col:"+c),i&&i.stack)l.push("info:"+e(i.stack.toString(),200));else if(arguments.callee){
for(var s=[],u=arguments.callee.caller,a=3;u&&--a>0&&(s.push(u.toString()),u!==u.caller);)u=u.caller;
s=s.join(","),l.push("info:"+e(s,200));
}
var p=new Image;
if(p.src=(r.reporturl+"&key="+r.key+"&content="+l.join("||")).substr(0,1024),window.console&&window.console.log){
var f=l.join("\n");
try{
f=decodeURIComponent(f);
}catch(d){}
console.log(f);
}
},0):!0;
},function(e){
r=e;
};
});define("appmsg/share.js",["biz_common/utils/string/html.js","appmsg/cdn_img_lib.js","biz_common/dom/event.js","biz_common/utils/url/parse.js","biz_wap/utils/mmversion.js","appmsg/appmsg_report.js","appmsg/malicious_wording.js","biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e){
"use strict";
function i(e,i){
var n="",t="";
try{
""!=tid&&(t="tid="+tid+"&aid=54");
var o=e.split("?")[1]||"";
if(o=o.split("#")[0],""==o);else{
var s=[o,"mpshare=1","scene="+i,"srcid="+srcid];
""!=t&&s.push(t),o=s.join("&"),n=e.split("?")[0]+"?"+o+"#"+(e.split("#")[1]||"");
}
}catch(m){
n="";
}
return n||(n=location.href+"#wechat_redirect",(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_47_1&lc=1&log0=[share_link]["+encodeURIComponent(location.href)+"]["+encodeURIComponent(e)+"]["+encodeURIComponent(msg_link)+"]"),
n;
}
function n(e,i,n){
m.shareReport({
link:e,
action_type:n
});
}
function t(e,i){
return e.isCDN()&&(e=o.addParam(e,"wxfrom",i,!0)),e;
}
e("biz_common/utils/string/html.js"),e("appmsg/cdn_img_lib.js");
var o=(e("biz_common/dom/event.js"),e("biz_common/utils/url/parse.js")),s=e("biz_wap/utils/mmversion.js"),m=e("appmsg/appmsg_report.js"),a=e("appmsg/malicious_wording.js"),c=(e("biz_wap/utils/ajax.js"),
e("biz_wap/jsapi/core.js"));
c.call("hideToolbar"),c.call("showOptionMenu");
var l=msg_title.htmlDecode(),r=(msg_source_url.htmlDecode(),""),_=cdn_url_1_1||msg_cdn_url||ori_head_img_url||round_head_img,u=_,p=msg_link.htmlDecode(),l=msg_title.htmlDecode(),g=msg_desc.htmlDecode();
g=g||"",g=g.replace(/<br\/>/g,"\n"),idx>1&&document.getElementById("js_content")&&1446652800>ct&&(g=document.getElementById("js_content").innerHTML.replace(/<\/?[^>]*\/?>/g,"").htmlDecode().replace(/^(\s*)|(\s*)$/g,"").substr(0,54)),
_.isCDN()&&(_=_.replace(/\/0$/,"/300"),_=_.replace(/\/0\?/,"/300?")),u.isCDN()&&(u=u.replace(/\/0$/,"/640"),
u=u.replace(/\/0\?/,"/640?")),malicious_title_reason_id&&(l=a.maliciousTitleMap[malicious_content_type][malicious_title_reason_id]||l,
g=a.maliciousDescMap[malicious_content_type][malicious_title_reason_id]||g,1!=malicious_content_type&&(_="https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiayFgbgEB9iaDt7hLicfz9RrXGM0LpaQ0TUic2gP7lbbqU3jCD8ibonicgIa3p99yjx1f1P26HChraeRUg/0?wx_fmt=png")),
"1"==is_limit_user&&c.call("hideOptionMenu"),window.is_temp_url&&c.invoke("hideMenuItems",{
menuList:["menuItem:share:timeline","menuItem:share:qq","menuItem:share:weiboApp","menuItem:share:facebook","menuItem:share:qzone","menuitem:share:weibo","menuItem:share:WeiboApp","menuItem:share:QZone","menuitem:facebook","menuItem:copyUrl","menuItem:share:email","menuitem:copy_url","menuitem:share:haokan"]
},function(){});
var d="https://res.wx.qq.com/op_res/Fwh9olR917lxUMxpJVM5sCCyrQOJSm68IEt-HfL7vpc5-_etzmyuLg1kPdU6RNRX";
c.on("menu:share:appmessage",function(e){
if(window.is_wash)c.invoke("sendAppMessage",{
img_url:d,
img_width:"640",
img_height:"640",
link:i(p,o),
desc:"你可以阅读以下原创作者的内容",
title:"原文存在洗稿行为"
},function(){
n(p,fakeid,o);
});else{
var o=1,s=t(_,"1");
e&&"favorite"==e.scene&&(o=24,s=t(_,"4")),1==malicious_content_type&&(s="https://mmbiz.qlogo.cn/mmbiz_png/cVgP5bCElFiayFgbgEB9iaDt7hLicfz9RrXGM0LpaQ0TUic2gP7lbbqU3jCD8ibonicgIa3p99yjx1f1P26HChraeRUg/0?wx_fmt=png"),
c.invoke("sendAppMessage",{
appid:r,
img_url:s,
img_width:"640",
img_height:"640",
link:i(p,o),
desc:g,
title:l
},function(){
n(p,fakeid,o);
});
}
}),c.on("menu:share:timeline",function(){
if(window.is_wash)c.invoke("shareTimeline",{
img_url:d,
img_width:"640",
img_height:"640",
link:i(p,2),
desc:"",
title:"原文存在洗稿行为，你可以阅读以下原创作者的内容"
},function(){});else{
var e=_;
s.isIOS||(e=t(_,"2")),n(p,fakeid,2),c.invoke("shareTimeline",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(p,2),
desc:g,
title:l
},function(){});
}
});
c.on("menu:share:weiboApp",function(){
c.invoke("shareWeiboApp",{
img_url:_,
link:i(p,3),
title:l
},function(){
n(p,fakeid,3);
});
}),c.on("menu:share:facebook",function(){
n(p,fakeid,7),c.invoke("shareFB",{
img_url:u,
img_width:"640",
img_height:"640",
link:i(p,43),
desc:g,
title:l
},function(){});
}),c.on("menu:share:QZone",function(){
var e=t(_,"6");
n(p,fakeid,5),c.invoke("shareQZone",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(p,22),
desc:g,
title:l
},function(){});
}),c.on("menu:share:qq",function(){
var e=t(_,"7");
n(p,fakeid,5),c.invoke("shareQQ",{
img_url:e,
img_width:"640",
img_height:"640",
link:i(p,23),
desc:g,
title:l
},function(){});
}),c.on("menu:share:email",function(){
n(p,fakeid,5),c.invoke("sendEmail",{
content:i(p,5),
title:l
},function(){});
}),c.on("onArticleReadingBtnClicked",function(e){
console.log("argv",e),location.href="https://mp.weixin.qq.com/mp/msgvoice?action=ttspage&__biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&sn="+window.sn+"#wechat_redirect";
}),1==window.show_msg_voice&&c.invoke("showMenuItems",{
menuList:["menuItem:readArticle"]
},function(e){
console.log("showMenuItems call",e);
}),c.on("sys:record",function(){
c.invoke("recordHistory",{
link:p,
title:l,
source:nickname,
img_url:_
},function(){});
});
});define("appmsg/cdn_img_lib.js",[],function(){
"use strict";
function t(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=gif")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_gif\//)&&-1==t.indexOf("/s640");
}
function i(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=png")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_png\//);
}
function n(t){
return!!(t.match(/\:\/\/[^\/]+\/mmbiz\//)&&t.indexOf("wx_fmt=jpg")>-1)||!!t.match(/\:\/\/[^\/]+\/mmbiz_jpg\//);
}
function r(t){
return t.indexOf("tp=webp")>-1;
}
function e(t){
return t.indexOf("tp=wxpic")>-1;
}
String.prototype.http2https=function(){
return this.replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qpic.cn/");
},String.prototype.https2http=function(){
var t=this.replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/");
return t=t.replace(/https:\/\/mmbiz\.qpic\.cn\//g,"http://mmbiz.qpic.cn/");
},String.prototype.isCDN=function(){
return 0==this.indexOf("http://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qpic.cn/")||0==this.indexOf("https://mmbiz.qlogo.cn/")||0==this.indexOf("http://res.wx.qq.com/")||0==this.indexOf("https://res.wx.qq.com/");
},String.prototype.nogif=function(){
var i=this.toString();
return t(i)?i.replace(/\/\d+\?/g,"/s640?").replace(/\/\d+\//g,"/s640/").replace(/\/\d+\./g,"/s640.").replace("wx_fmt=gif",""):i;
},String.prototype.isGif=function(){
var i=this.toString();
return t(i);
},String.prototype.isWxpic=function(){
var t=this.toString();
return e(t);
},String.prototype.isWebp=function(){
var t=this.toString();
return r(t);
},String.prototype.canHevc=function(){
var r=this.toString();
return n(r)||i(r)||t(r);
},String.prototype.getImgType=function(){
var p=this.toString();
return t(p)?"gif":r(p)?"webp":e(p)?"wxpic":i(p)?"png":n(p)?"jpg":"unknow";
},String.prototype.getOriginImgType=function(){
var r=this.toString();
return t(r)?"gif":i(r)?"png":n(r)?"jpg":"unknow";
},String.prototype.imgChange640=function(){
var t=this.toString();
t=t.replace(/(\?tp=webp)|(\?tp=wxpic)|(&tp=webp)|(&tp=wxpic)/g,"");
var i=new Date;
return i.setFullYear(2014,9,1),t.isCDN()&&1e3*ct>=i.getTime()&&!t.isGif()&&(t=t.replace(/\/0$/,"/640"),
t=t.replace(/\/0\?/,"/640?"),t=t.replace(/\/0\./,"/640.")),t;
};
});