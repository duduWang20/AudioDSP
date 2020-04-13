define("biz_common/utils/http.js",[],function(){
"use strict";
function t(){
var t=document.getElementsByTagName("html");
if(t&&1==!!t.length){
t=t[0].innerHTML;
var e=t.replace(/[\x00-\xff]/g,""),n=t.replace(/[^\x00-\xff]/g,"");
return 1*n.length+3*e.length+"<!DOCTYPE html><html></html>".length;
}
return 0;
}
return{
htmlSize:t()
};
});define("biz_common/utils/cookie.js",[],function(){
"use strict";
var e={
get:function(e){
if(""==e)return"";
var t=new RegExp(e+"=([^;]*)"),n=document.cookie.match(t);
return n&&n[1]||"";
},
set:function(e,t,n){
var o=new Date;
return o.setDate(o.getDate()+(n||1)),n=o.toGMTString(),document.cookie=e+"="+t+";expires="+n,
!0;
}
};
return e;
});define("appmsg/topic_tpl.html.js",[],function(){
return'<span class="db topic_wrp">\n    <span class="topic_thumb" style="background-image:url({img_url});"></span>\n    <span class="topic_content">\n        <strong class="topic_title">{title}</strong>\n        <span class="topic_desc">{author}</span>\n        <span class="topic_info">\n            <span class="topic_info_extra"><span class="icon_topic"></span>Topic</span>\n            <span class="topic_info_primary">{msg_num} related article(s)</span>\n        </span>\n    </span>\n</span>\n';
});define("question_answer/appmsg_tpl.html.js",[],function(){
return'<section class="qa__card qa__container_js">\n  <#if(dataStatus==3||dataStatus==4){#>\n  <section class="qa__card-empty">\n    <#if(dataStatus==4){#>\n    该问答内容已被删除    <#}else{#>\n    问答内容加载失败    <#}#>\n  </section>\n  <#} else if (dataStatus==2) {#>\n  <section class="qa__item" data-key="<#=dataKey#>">\n    <div class="qa__item-question">\n      <div class="qa__item-question-info">\n        <div class="qa__item-info-avatar">\n          <img class="account_avatar" src="<#=questioner_headimg#>" alt="">\n        </div>\n        <div class="qa__item-info-account">\n          <#=questioner_nickname#>\n        </div>\n        <div>提问</div>\n      </div>\n      <#if(question_info.question){#>\n      <div class="qa__answers-question-title">\n        <#==question_info.question.title#>\n      </div>\n      <div class="qa__detail-question-content">\n        <#for (var i = 0,hasContent=false,data=question_info.question.desc,imglen=0, il = data.length; i < il; i++) {#>\n          <#if (data[i].type === \'TEXT\' && data[i].content) {#>\n            <#if (hasContent) {#>\n              <br>\n            <#}#>\n            <#==data[i].content#>\n            <#hasContent=true;#>\n          <#}else if (data[i].type === \'PIC_CDN_URL\') {imglen++;#>\n          <#}#>\n        <#}#>\n        <#if(imglen>0){#>\n          <div class="qa__showimg_js qa__detail-question-imgs"><#=imglen#>张图片</div>\n        <#}#>\n      </div>\n      <#}#>\n    </div>\n    <div class="qa__tem-reply">\n      <div class="qa__item-reply-head">回答</div>\n      <#if(question_info.answer){#>\n      <div class="qa__item-reply-content">\n        <#for (var i = 0,hasContent=false,data=question_info.answer.answer, il = data.length; i < il; i++) {#>\n          <#if (data[i].type === \'TEXT\' && data[i].content) {#>\n            <#if (hasContent) {#>\n              <br>\n            <#}#>\n            <#==data[i].content#>\n            <#hasContent=true;#>\n          <#}else if (data[i].type === \'PIC_CDN_URL\') {#>\n            <#if (hasContent) {#>\n              <br>\n            <#}#>\n            <img class="qa__preview_js qa__preview_base64_js" crossorigin="anonymous" data-src="<#=data[i].content#>" src="<#=data[i].content#>">\n            <#hasContent=true;#>\n          <#}#>\n        <#}#>\n      </div>\n      <#}#>\n    </div>\n    <div class="qa__show_detail qa__show_detail_js" data-key="<#=dataKey#>">View Details</div>\n  </section>\n  <#}#>\n</section>\n';
});define("pages/weapp_tpl.html.js",[],function(){
return'<!-- <span class="weapp_card flex_context">\n    <span class="weapp_card_hd">\n        <span class="radius_avatar weapp_card_avatar">\n            <img src="<#=avatar#>">\n        </span>\n    </span>\n    <span class="weapp_card_bd flex_bd">\n        <strong class="weapp_card_nickname"><#=nickname#></strong>\n        <span class="weapp_card_logo"><img class="icon_weapp_logo_mini" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEUAAAB4it11h9x2h9x2h9x2htx8j+R8i+B1h9x2h9x3h92Snv91htt2h9x1h9x4h9x1h9x1h9x2idx1h9t2h9t1htt1h9x1h9x1htx2h9x1h912h9x4h913iN17juOOjuN1iNx2h9t4h958i+B1htvejBiPAAAAJHRSTlMALPLcxKcVEOXXUgXtspU498sx69DPu5+Yc2JeRDwbCYuIRiGBtoolAAAA3ElEQVQoz62S1xKDIBBFWYiFYImm2DWF///G7DJEROOb58U79zi4O8iOo8zuCRfV8EdFgbYE49qFQs8ksJInajOA1wWfYvLcGSueU/oUGBtPpti09uNS68KTMcrQ5jce4kmN/HKn9XVPAo702JEdx9hTUrWUqVrI3KwUmM1NhIWMKdwiGvpGMWZOAj1PZuzAxHwhVSplrajoseBnbyDHAwvrtvKKhdqTtFBkL8wO5ijcsS3G1JMNvQ5mdW7fc0x0+ZcnlJlZiflAomdEyFaM7qeK2JahEjy5ZyU7jC/q/Rz/DgqEuAAAAABJRU5ErkJggg==" alt="">Mini Program</span>\n    </span>\n</span> -->\n<span class="weapp_card app_context appmsg_card_context">\n    <span class="weapp_card_bd">\n        <span class="weapp_card_profile flex_context">\n            <span class="radius_avatar weapp_card_avatar">\n                <img src="<#=avatar#>">\n            </span>\n            <span class="weapp_card_nickname flex_bd"><#=nickname#></span>\n        </span>\n        <span class="weapp_card_info">\n            <span class="weapp_card_title"><#=title#></span>\n            <span class="weapp_card_thumb_wrp" style="background-image:url(<#=imageUrl#>);"></span>\n        </span>\n    </span>\n    <span class="weapp_card_ft">\n        <span class="weapp_card_logo"><img class="icon_weapp_logo_mini" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAb1BMVEUAAAB4it11h9x2h9x2h9x2htx8j+R8i+B1h9x2h9x3h92Snv91htt2h9x1h9x4h9x1h9x1h9x2idx1h9t2h9t1htt1h9x1h9x1htx2h9x1h912h9x4h913iN17juOOjuN1iNx2h9t4h958i+B1htvejBiPAAAAJHRSTlMALPLcxKcVEOXXUgXtspU498sx69DPu5+Yc2JeRDwbCYuIRiGBtoolAAAA3ElEQVQoz62S1xKDIBBFWYiFYImm2DWF///G7DJEROOb58U79zi4O8iOo8zuCRfV8EdFgbYE49qFQs8ksJInajOA1wWfYvLcGSueU/oUGBtPpti09uNS68KTMcrQ5jce4kmN/HKn9XVPAo702JEdx9hTUrWUqVrI3KwUmM1NhIWMKdwiGvpGMWZOAj1PZuzAxHwhVSplrajoseBnbyDHAwvrtvKKhdqTtFBkL8wO5ijcsS3G1JMNvQ5mdW7fc0x0+ZcnlJlZiflAomdEyFaM7qeK2JahEjy5ZyU7jC/q/Rz/DgqEuAAAAABJRU5ErkJggg==" alt="">Mini Program</span>\n    </span>\n</span>\n';
});define("biz_common/utils/monitor.js",[],function(){
"use strict";
var n=[],t={};
return t.setAvg=function(e,i,r){
return n.push(e+"_"+i+"_"+r),n.push(e+"_"+(i-1)+"_1"),t;
},t.setSum=function(e,i,r){
return n.push(e+"_"+i+"_"+r),t;
},t.send=function(){
if(0!=n.length){
var t=[];
for(t.push(n.splice(0,60));n.length>0;)t.push(n.splice(0,60));
n=[];
for(var e=0,i=t.length;i>e;e++){
var r=new Image;
r.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+t[e].join(";")+"&t="+Math.random();
}
}
},t;
});define("pages/voice_tpl.html.js",[],function(){
return'<span class="js_audio_frame db">\n    <#if(show_not_support===true){#>\n    <span class="db">当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放</span>\n    <#}#>\n    <span aria-labelledby="语音" id="voice_main_<#=voiceid#>_<#=posIndex#>" class="share_audio_context flex_context pages_reset" <#if(!musicSupport){#>style="display:none;"<#}#>>\n        <span id="voice_play_<#=voiceid#>_<#=posIndex#>" aria-labelledby="播放开关" class="db share_audio_switch"><em class="icon_share_audio_switch" role="button"></em></span>\n        <span id="voice_detail_<#=voiceid#>_<#=posIndex#>" class="share_audio_info flex_bd db">\n            <strong id="voice_title_<#=voiceid#>_<#=posIndex#>" class="share_audio_title" aria-describedby="语音标题" role="link"><#=title#></strong>\n            <#if(!!nickname){#>\n            <span id="voice_author_<#=voiceid#>_<#=posIndex#>" class="share_audio_tips db">来自<#=nickname#></span>\n            <#}#>\n            <span id="voice_seekRange_<#=voiceid#>_<#=posIndex#>" class="db share_audio_progress_wrp">\n                <span class="db share_audio_progress">\n                    <span id="voice_progress_<#=voiceid#>_<#=posIndex#>" style="width:0%" class="share_audio_progress_inner"></span>\n                    <span id="voice_buffer_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_buffer" style="width:0%;"></span>\n                    <span id="voice_loading_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_loading" style="display:none;">\n                        <span class="share_audio_progress_loading_inner"></span>\n                    </span>\n                </span>\n                <span id="voice_playdot_<#=voiceid#>_<#=posIndex#>" class="share_audio_progress_handle" style="display:none;left:0%;"></span>\n            </span>\n            <span class="share_audio_desc db" aria-labelledby="时长">\n                <em id="voice_playtime_<#=voiceid#>_<#=posIndex#>" class="share_audio_length_current" aria-hidden="true">00:00</em>\n                <em id="voice_duration_<#=voiceid#>_<#=posIndex#>" class="share_audio_length_total"><#=duration_str#></em>\n            </span>\n        </span>\n    </span>\n</span>\n';
});define("pages/kugoumusic_ctrl.js",["biz_common/utils/monitor.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function r(e,r){
for(var t,a=[/^http(s)?:\/\/singerimg\.kugou\.com([\/?].*)*$/i,/^http(s)?:\/\/imge\.kugou\.com([\/?].*)*$/i],o=!1,c=0;t=a[c++];)if(t.test(e.albumurl)){
o=!0;
break;
}
return o||(e.albumurl=""),e.detailUrl="https://m3ws.kugou.com/kgsong/"+e.jumpurlkey+".html?fromweixin=",
e.webUrl=e.detailUrl,e.musicIcon=i.musicIcon,e.media_id=e.musicid,e.type=1*r.scene===0?5:1*r.scene===1?6:9,
e;
}
function t(e,r){
var t=e,a=t.otherid+(t.albumid||""),c=i.cache[a];
return c&&"function"==typeof r.callback?void r.callback(c):void(i.submiting[a]!==!0&&(i.submiting[a]=!0,
o({
akey:t.otherid,
albumid:t.albumid||"",
onSuc:function(e){
i.submiting[a]=!1,i.cache[a]=e,"function"==typeof r.callback&&r.callback(e);
},
onError:function(){
i.submiting[a]=!1,"function"==typeof r.callback&&r.callback({
canplay:!1,
msg:"System busy. Please try again later.",
status:-1,
play_url:"",
duration:0
});
}
})));
}
function a(e){
var r=!0,t="";
switch(1*e){
case 0:
r=!0;
break;

case 1:
r=!1,t="该歌曲版权已过期，无法播放。";
break;

case 1002:
r=!1,t="系统错误，请稍后再试。";
break;

case 1001:
r=!1,t="系统错误，请稍后再试。";
break;

default:
r=!1,t="系统错误，请稍后再试。";
}
return t&&(t+="错误码："+e),{
canplay:r,
msg:t
};
}
function o(e){
s.setSum(i.reportId,87,1),s.send();
var r=+new Date,t="/mp/getkugousong?params=#params#",o=[{
akey:e.akey,
albumid:e.albumid||""
}];
t=t.replace("#params#",encodeURIComponent(JSON.stringify(o))),u({
url:t,
type:"GET",
dataType:"json",
success:function(t){
var o=+new Date-r;
if(!t||"undefined"==typeof t.errcode){
var s=1;
return c({
type:"error",
time:o,
code:s
}),void("function"==typeof e.onError&&e.onError({
errcode:s
}));
}
var u=0,i="";
0==t.errcode?t.data&&t.data[0]&&t.data[0].url?(u=0,i=t.data[0].url):u=1001:u=1==t.errcode?1:1002,
c({
type:"success",
time:o,
code:u
});
var n=a(u);
e.onSuc({
canplay:n.canplay,
msg:n.msg,
errcode:u,
play_url:i
});
},
error:function(){
var t=+new Date-r,a=2;
c({
type:"error",
time:t,
code:a
}),"function"==typeof e.onError&&e.onError({
errcode:a
});
}
});
}
function c(e){
var r=Math.max(e.time,0);
if(r=Math.min(r,1e4),r>=0&&500>r?s.setSum(i.reportId,98,1):r>=500&&1e3>r?s.setSum(i.reportId,99,1):r>=1e3&&2e3>r?s.setSum(i.reportId,100,1):r>=2e3&&5e3>r?s.setSum(i.reportId,101,1):r>=5e3&&1e4>=r&&s.setSum(i.reportId,102,1),
"error"==e.type){
switch(1*e.code){
case 1:
s.setSum(i.reportId,94,1);
break;

case 2:
s.setSum(i.reportId,91,1);
break;

case 3:
s.setSum(i.reportId,92,1);
break;

case 4:
s.setSum(i.reportId,93,1);
}
s.setSum(i.reportId,88,1);
}else if("success"==e.type){
switch(1*e.code){
case 1:
s.setSum(i.reportId,95,1);
break;

case 0:
s.setSum(i.reportId,97,1);
break;

case 1002:
s.setSum(i.reportId,96,1);
break;

case 1001:
s.setSum(i.reportId,103,1);
}
s.setSum(i.reportId,89,1);
}
s.send();
}
var s=e("biz_common/utils/monitor.js"),u=e("biz_wap/utils/ajax.js"),i={
reportId:"28306",
musicIcon:window.icon_kugou_source||"",
cache:{},
submiting:{}
};
return{
initData:r,
getPlayUrl:t
};
});define("pages/qqmusic_ctrl.js",["biz_common/utils/monitor.js","pages/player_adaptor.js","pages/loadscript.js","biz_wap/utils/ajax.js"],function(e){
"use strict";
function t(e,t){
if(/^http(s)?:\/\//i.test(e.albumurl)){
for(var r,a=[/^http(s)?:\/\/imgcache\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/y\.gtimg\.cn([\/?].*)*$/i],s=!1,o=0;r=a[o++];)if(r.test(e.albumurl)){
s=!0;
break;
}
s||(e.albumurl="");
}else{
var i=e.albumurl.split("/");
try{
i=i[i.length-1],i=i.split(".")[0];
}catch(n){
i="";
}
e.albumurl=i?u.imgroot2.replace("#mid#",i):u.imgroot+e.albumurl;
}
return e.albumurl=e.albumurl.replace("mid_album_68","mid_album_90").replace("68x68","90x90"),
e.musicIcon=u.musicIcon,e.type=1*t.scene===0?0:1*t.scene===1?1:8,c.inQMClient?(e.allowPause=!0,
e.detailUrl="",e.pauseCss="qqmusic_playing_pause",e.webUrl=e.detailUrl):(e.allowPause=!1,
e.pauseCss="",e.detailUrl=["http://i.y.qq.com/v8/playsong.html?referFrom=music.qq.com&songid=",e.musicid,"&songmid=",e.media_id,,"&ADTAG=weixin_gzh#wechat_redirect"].join(""),
e.webUrl=e.detailUrl),e;
}
function r(e,t){
var r=e,a=u.cache[r.songId];
return c.inQMClient?void t.callback({
canplay:!0,
play_url:"https://www.qq.com"
}):a&&"function"==typeof t.callback?(a.in_cache=!0,void t.callback(a)):void(u.submiting[r.songId]!==!0&&(u.submiting[r.songId]=!0,
s({
id:r.songId,
mid:r.mid,
onSuc:function(e){
u.submiting[r.songId]=!1,u.cache[r.songId]=e,"function"==typeof t.callback&&t.callback(e);
},
onError:function(){
u.submiting[r.songId]=!1,"function"==typeof t.callback&&t.callback({
canplay:!1,
msg:"System busy. Try again later. (Return Code: -1)",
status:-1,
play_url:"",
duration:0
});
}
})));
}
function a(e){
var t=!0,r="";
switch(1*e){
case 0:
t=!0;
break;

case 1:
t=!1,r="The song's copyright has expired. Unable to play.";
break;

case 2:
t=!1,r="Unfortunately, this song is not available in your current country/region due to copyright restrictions.";
break;

case 3:
t=!1,r="The song's copyright has expired. Unable to play.";
break;

case 4:
t=!1,r="Incorrect song info";
break;

case 5:
t=!1,r="系统错误，请稍后再试。";
break;

case 6:
t=!1,r="系统错误，请稍后再试。";
break;

case 7:
t=!1,r="此音乐需付费播放，可到QQ音乐收听。";
break;

case 8:
t=!0,r="该音乐为付费音乐，当前为你播放试听片段。";
break;

default:
t=!1,r="系统错误，请稍后再试。";
}
return r&&1*e!==7&&(r+="Error code: "+e),{
canplay:t,
msg:r
};
}
function s(e){
i.setSum(u.reportId,18,1),i.send();
var t=+new Date,r="//mp.weixin.qq.com/mp/qqmusic?action=get_song_info&song_mid=#mid#";
r=r.replace("#mid#",e.mid),n({
url:r,
type:"GET",
dataType:"json",
success:function(r){
var s=+new Date-t;
if(200==r.http_code){
var i={};
try{
i=JSON.parse(r.resp_data);
}catch(c){
var n=1;
return o({
type:"error",
time:s,
code:n
}),void("function"==typeof e.onError&&e.onError({
errcode:n
}));
}
if("undefined"==typeof i.ret||0!=i.ret||0!=i.sub_ret||0==i.songlist.length){
var n=1;
return o({
type:"error",
time:s,
code:n
}),void("function"==typeof e.onError&&e.onError({
errcode:n
}));
}
var u,l=(i.ret,i.songlist[0].song_play_url),m=i.songlist[0].song_play_time||0;
i.songlist[0].playable?u=l?0:6:i.songlist[0].try_playable?i.songlist[0].try_file_size>0&&i.songlist[0].try_30s_url?(u=8,
l=i.songlist[0].try_30s_url,m=30):u=6:u=7,o({
type:"success",
time:s,
code:u
});
var p=a(1*u);
e.onSuc({
canplay:p.canplay,
msg:p.msg,
status:u,
play_url:l||"",
duration:m
});
}else{
var n=4;
switch(r.http_code){
case 200:
break;

case 400:
n=2;
break;

case 500:
n=3;
break;

default:
n=4;
}
o({
type:"error",
time:s,
code:n
}),"function"==typeof e.onError&&e.onError({
errcode:n
});
}
},
error:function(){}
});
}
function o(e){
var t=Math.max(e.time,0);
if(t=Math.min(t,6e4),e.time>=0&&e.time<200?i.setSum(u.reportId,24,1):e.time>=200&&e.time<500?i.setSum(u.reportId,25,1):e.time>=500&&e.time<1e3?i.setSum(u.reportId,26,1):e.time>=1e3&&e.time<2e3?i.setSum(u.reportId,27,1):e.time>=2e3&&e.time<1e4?i.setSum(u.reportId,28,1):e.time>=1e4&&i.setSum(u.reportId,29,1),
i.setAvg(u.reportId,23,t),"error"==e.type){
switch(1*e.code){
case 1:
i.setSum(u.reportId,9,1);
break;

case 2:
i.setSum(u.reportId,10,1);
break;

case 3:
i.setSum(u.reportId,11,1);
break;

case 4:
i.setSum(u.reportId,12,1);
}
i.setSum(u.reportId,19,1);
}else if("success"==e.type){
switch(1*e.code){
case 1:
i.setSum(u.reportId,8,1);
break;

case 0:
i.setSum(u.reportId,17,1);
break;

case 2:
i.setSum(u.reportId,13,1);
break;

case 3:
i.setSum(u.reportId,14,1);
break;

case 4:
i.setSum(u.reportId,15,1);
break;

case 5:
i.setSum(u.reportId,16,1);
break;

case 6:
i.setSum(u.reportId,47,1);
}
i.setSum(u.reportId,20,1);
}
i.send();
}
var i=e("biz_common/utils/monitor.js"),c=e("pages/player_adaptor.js"),n=(e("pages/loadscript.js"),
e("biz_wap/utils/ajax.js")),u={
imgroot:"https://imgcache.qq.com/music/photo/mid_album_90",
imgroot2:"https://y.gtimg.cn/music/photo_new/T002R90x90M000#mid#.jpg",
reportId:"28306",
musicIcon:window.icon_qqmusic_source||"",
cache:{},
submiting:{}
};
return{
initData:t,
getPlayUrl:r
};
});define("pages/voice_component.js",["biz_common/dom/event.js","biz_common/tmpl.js","pages/music_player.js","pages/player_adaptor.js","biz_common/dom/class.js","pages/report.js","biz_common/utils/monitor.js","pages/music_report_conf.js","pages/player_tips.js","biz_wap/utils/openUrl.js","pages/qqmusic_ctrl.js","pages/kugoumusic_ctrl.js"],function(e,t,a,o){
"use strict";
function r(){
P.hasInit||(p(),s(),c(),P.hasInit=!0);
}
function n(e){
r(),this._o={
protocal:"",
wxIndex:0,
type:0,
comment_id:"",
src:"",
jsapi2Src:"",
mid:"",
songId:"",
otherid:"",
albumid:"",
autoPlay:!1,
duration:0,
needVioceMutex:!0,
appPlay:!0,
title:"",
allowPause:!1,
singer:"",
epname:"",
coverImgUrl:"",
webUrl:[location.protocol,"//mp.weixin.qq.com/s?referFrom=#referFrom#&songid=#songId#&__biz=",window.biz,"&mid=",window.mid,"&idx=",window.idx,"&sn=",window.sn,"#wechat_redirect"].join(""),
musicbar_url:"",
playingCss:"",
pauseCss:"",
playCssDom:"",
playArea:"",
progress:"",
detailUrl:"",
detailArea:"",
fileSize:0,
playtimeDom:"",
loadingDom:"",
bufferDom:"",
playdotDom:"",
seekRange:"",
seekContainer:""
},this._init(e),P.allComponent.push(this);
}
function i(e,t,a,o){
P.num++,t.musicSupport=P.musicSupport,t.show_not_support=!1,P.musicSupport||1!=P.num||(t.show_not_support=!0);
var r=document.createElement("div"),n="";
if(n=h.tmpl(e,t),r.innerHTML=n,o===!0)a.appendChild(r.children[0]);else{
var i=a.parentNode;
if(!i)return;
i.lastChild===a?i.appendChild(r.children[0]):i.insertBefore(r.children[0],a.nextSibling);
}
}
function s(){
P.hasInit||v.inQMClient&&l("QMClient_pv",1);
}
function p(){
window.reportMid=[],window.reportVoiceid=[];
for(var e in I)if(I.hasOwnProperty(e)){
var t=I[e],a=t.split("_");
P.reportData2[e]={
id:a[0],
key:a[1],
count:0
};
}
}
function l(e,t){
P.reportData2[e]&&(t=t||1,P.reportData2[e].count+=t,P.debug&&console.log("addpv:"+e+" count:"+P.reportData2[e].count));
}
function c(){
f.on(window,"unload",d);
}
function d(){
D.triggerUnloadPlaying(),u();
for(var e=0,t=P.allComponent.length;t>e;e++){
var a=P.allComponent[e];
a.player&&"function"==typeof a.player.getPlayTotalTime&&(P.reportData[a._o.type].play_last_time[a._g.posIndex]=parseInt(1e3*a.player.getPlayTotalTime()));
}
for(var e in P.reportData)w.musicreport({
data:P.reportData[e]
});
p();
for(var e=0,t=P.allComponent.length;t>e;e++){
var a=P.allComponent[e];
a&&"function"==typeof a._initReportData&&a._initReportData(),a.player&&"function"==typeof a.player.resetPlayTotalTime&&a.player.resetPlayTotalTime();
}
}
function u(){
for(var e in P.reportData2)if(P.reportData2.hasOwnProperty(e)){
var t=P.reportData2[e];
t.count>0&&x.setSum(t.id,t.key,t.count);
}
x.send();
}
function g(e){
return new n(e);
}
function _(e){
if(isNaN(e))return"00:00";
e=Math.floor(e);
var t=Math.floor(e/3600),a=Math.floor((e-3600*t)/60),o=e-3600*t-60*a;
return 0!=t?(10>t&&(t="0"+t),t+=":"):t="",10>a&&(a="0"+a),10>o&&(o="0"+o),t+a+":"+o;
}
function y(e){
return e=(e||"").replace(/&#96;/g,"`").replace(/&#61;/g,"=").replace(/&#39;/g,"'").replace(/&quot;/g,'"').replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&amp;/g,"&");
}
function m(e){
return e=(e||"").replace(/&/g,"&amp;").replace(/>/g,"&gt;").replace(/</g,"&lt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;").replace(/=/g,"&#61;").replace(/`/g,"&#96;");
}
var f=e("biz_common/dom/event.js"),h=e("biz_common/tmpl.js"),D=e("pages/music_player.js"),v=e("pages/player_adaptor.js"),k=e("biz_common/dom/class.js"),w=e("pages/report.js"),x=e("biz_common/utils/monitor.js"),I=e("pages/music_report_conf.js"),C=e("pages/player_tips.js"),b=e("biz_wap/utils/openUrl.js").openUrlWithExtraWebview,P={
allComponent:[],
hasInit:!1,
reportId:"28306",
musicSupport:D.getSurportType(),
debug:location.href.indexOf("vconsole=1")>0||document.cookie&&document.cookie.indexOf("vconsole_open=1")>-1?!0:!1,
reportData:{},
posIndex:{},
num:0,
reportData2:{},
adapter:{
m:e("pages/qqmusic_ctrl.js"),
k:e("pages/kugoumusic_ctrl.js")
}
};
return n.prototype._init=function(e){
this._extend(e),this._g={
posIndex:void 0,
tag:"",
canDragBar:!1,
barDraging:!1,
canGoDetail:!0
},5==this._o.type||6==this._o.type||9==this._o.type?this._g.tag="k":this._o.type>=2&&this._o.type<=4?this._g.tag="v":7==this._o.type?this._g.tag="a":(0==this._o.type||1==this._o.type||8==this._o.type)&&(this._g.tag="m"),
this._initData(),this._initQQmusicLyric(),this._initReportData(),this._initPlayer();
},n.prototype._initData=function(){},n.prototype._initQQmusicLyric=function(){
var e=this._o,t=this._g;
e.webUrl="m"==t.tag?e.webUrl.replace("#songId#",e.songId||"").replace("#referFrom#","music.qq.com"):e.webUrl.replace("#songId#","").replace("#referFrom#","");
},n.prototype._initReportData=function(){
var e=this._o,t=this._g;
"v"==t.tag?window.reportVoiceid.push(e.songId):"m"==t.tag&&window.reportMid.push(e.songId),
"undefined"==typeof P.reportData[e.type]&&(P.reportData[e.type]=w.getMusicReportData(e),
P.posIndex[e.type]=0),"undefined"==typeof t.posIndex&&(t.posIndex=P.posIndex[e.type]++);
var a=P.reportData[e.type];
a.musicid[t.posIndex]=e.songId,a.commentid[t.posIndex]=e.comment_id,a.hasended[t.posIndex]=0,
a.mtitle[t.posIndex]=e.title,a.detail_click[t.posIndex]=0,a.duration2[t.posIndex]=parseInt(1e3*e.duration),
a.errorcode[t.posIndex]=0,a.play_duration2[t.posIndex]=0,a.seek[t.posIndex]=0,a.seek_position[t.posIndex]=[],
a.play_last_time[t.posIndex]=0,a.local_time[t.posIndex]=0,a.seek_loaded[t.posIndex]=[];
},n.prototype._initPlayer=function(){
if(P.musicSupport){
var e=this,t=this._o,a=this._g.tag;
t.onStatusChange=this._statusChangeCallBack(),t.onTimeupdate=this._timeupdateCallBack(),
t.onError=this._errorCallBack(),t.onUpdateSeekRange=this._onUpdateSeekRange(),t.onAndroidForceH5=function(){
l("force_h5",1);
},t.onH5Begin2Play=function(){
l(a+"_pv",1),l(a+"_h5_pv",1);
},t.onH5Error=function(t,o){
l(a+"_h5_err_total",1),l(a+"_h5_err_"+o.code,1),e._reportH5Error({
type:1,
code:o.code
});
},t.onJsapi1Begin2Play=function(){
l(a+"_pv",1),l(a+"_wx_pv",1),l(a+"_wx_pv_1",1);
},t.onJsapi2Begin2Play=function(e,o){
l(a+"_pv",1),l(a+"_wx_pv",1),l(a+"_wx_pv_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src&&l("aac_pv",1),
t.musicPlayerOnJsapi2Begin2Play&&t.musicPlayerOnJsapi2Begin2Play(o);
},t.onJsapi2PlaySuccess=function(e,a){
t.musicPlayerOnJsapi2PlaySuccess&&t.musicPlayerOnJsapi2PlaySuccess(a);
},t.onJsapi2Begin2PlayErr=function(){
if(l(a+"_wx_err_1",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_start_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
D.isAndroid?(w.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_1",1)):(w.logReport("",e.replace("#type#","ios"),"ajax"),
l("ios_aac_err_1",1));
}
},t.onJsapi2PlayingErr=function(){
if(l(a+"_wx_err_2",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_ing_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
D.isAndroid?(w.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_2",1)):(w.logReport("",e.replace("#type#","ios"),"ajax"),
l("ios_aac_err_2",1));
}
},t.onJsapi2PlayingStop=function(){
var e=a+"_stoped_";
e+=D.isAndroid?"android":"ios",l(e,1);
},t.onJsapi2PlayingPause=function(){
var e=a+"_paused_";
e+=D.isAndroid?"android":"ios",l(e,1);
},t.onSeekErr=function(){
if(l(a+"_seek_err",1),t.jsapi2Src&&t.jsapi2Src!=t.src){
var e="acc_seek_error;type:#type#;uin:"+(window.user_uin||"")+";playurl:"+t.jsapi2Src+";pageurl:"+location.href;
D.isAndroid?(w.logReport("",e.replace("#type#","android"),"ajax"),l("android_aac_err_3",1)):(w.logReport("",e.replace("#type#","ios"),"ajax"),
l("ios_aac_err_3",1));
}
},t.onUnloadPlaying=function(){
l(a+"_unload_wx_pv",1);
},t.onQMClientPlay=function(){
l("QMClient_play",1);
},t.onSeekNeed2Load=function(){
if(e.player&&e.player.surportSeekRange()&&t.playdotDom){
var a=P.reportData[e._o.type],o=a.seek_position[e._g.posIndex].length;
o>0&&(a.seek_loaded[e._g.posIndex][o-1]=1);
}
},t.onSeekNotNeed2Load=function(){
if(e.player&&e.player.surportSeekRange()&&t.playdotDom){
var a=P.reportData[e._o.type],o=a.seek_position[e._g.posIndex].length;
o>0&&(a.seek_loaded[e._g.posIndex][o-1]=0);
}
},v.create(this._o,{
callback:function(t){
e.player=t,e.afterCreatePlayer();
}
});
}
},n.prototype.afterCreatePlayer=function(){
this._playEvent();
},n.prototype.isInSeekrang=function(e){
var t=this._o.seekRange;
if(!t)return!1;
if(t===e)return!0;
for(var a=t.getElementsByTagName("*"),o=0,r=a.length;r>o;o++)if(a[o]===e)return!0;
return!1;
},n.prototype._playEvent=function(){
var e=this,t=this._o,a=this._g;
if(t.detailUrl&&t.detailArea&&f.on(t.detailArea,"click",function(r){
if(!a.barDraging&&a.canGoDetail){
var n=r.target||r.srcElement;
n&&e.isInSeekrang(n)||("v"==a.tag?(P.reportData[t.type].detail_click[a.posIndex]=1,
window.__second_open__?b(t.detailUrl):window.location.href=t.detailUrl):("m"==a.tag||"k"==a.tag)&&P.adapter[a.tag].getPlayUrl(t,{
callback:function(e){
e.canplay?(P.reportData[t.type].detail_click[a.posIndex]=1,window.__second_open__?b(t.detailUrl):window.location.href=t.detailUrl):e.msg&&setTimeout(function(){
o(e.msg);
},0);
}
}));
}
}),P.musicSupport){
var r=0,n=4,i=5;
switch(1*t.type){
case 0:
r=1;
break;

case 1:
r=13;
break;

case 8:
r=14;
break;

case 2:
r=3;
break;

case 3:
r=6;
break;

case 4:
r=7;
break;

case 5:
r=10;
break;

case 6:
r=15;
break;

case 7:
r=11;
break;

case 9:
r=12;
}
var s="";
s=t.allowPause?t.pauseCss||t.playingCss:t.playingCss,f.tap(t.playArea,function(){
return console.log("click playArea",k.hasClass(t.playCssDom,s)),k.hasClass(t.playCssDom,s)?(t.allowPause?e.player.pause():e.player.stop(),
w.report({
type:r,
comment_id:t.comment_id,
voiceid:t.songId,
action:i
})):"v"==a.tag||"a"==a.tag?e._playMusic(r,n):P.adapter[a.tag].getPlayUrl(t,{
callback:function(i){
i.canplay&&i.play_url?(i.duration&&(t.duration=i.duration,e.player.setDuration(t.duration),
P.reportData[t.type].duration2[a.posIndex]=parseInt(1e3*t.duration)),e.player.setSrc(i.play_url),
8!=i.status||i.in_cache?e._playMusic(r,n):new C({
onClick:function(){
e._playMusic(r,n);
}
})):i.msg&&setTimeout(function(){
o(i.msg);
},0);
}
}),!1;
}),e._dragEvent();
}
},n.prototype._dragEvent=function(){
var e=this,t=this._o,a=this._g,o=t.seekRange;
if(o){
var r=0,n=o,i=!1,s=window.__zoom||1;
for(1!=s&&(i=!0);n&&n!=document.body;)r+=i?n.offsetLeft*s:n.offsetLeft,"page-content"==n.id&&(i=!1),
n=n.offsetParent;
var p=e.player.getDuration();
a.seekData={
zoom:s,
offsetLeft:r,
duration:p,
rangeWidth:o.offsetWidth,
startTime:0,
dragTime:0,
downX:0,
moveX:0
},f.on(o,"mousedown",function(t){
a.canDragBar&&(e._pointerDownHandler({
x:t.pageX||t.clientX
}),t.preventDefault());
}),f.on(t.seekContainer,"mousemove",function(t){
a.canDragBar&&a.barDraging&&(e._pointerMoveHandler({
x:t.pageX||t.clientX
}),t.preventDefault(),t.stopPropagation());
}),f.on(document.body,"mouseup",function(t){
return a.canDragBar&&a.barDraging?(e._pointerUpHandler({
x:t.pageX||t.clientX
}),t.preventDefault(),t.stopPropagation(),!1):void 0;
}),f.on(o,"touchstart",function(t){
a.canDragBar&&(e._pointerDownHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault());
}),f.on(o,"touchmove",function(t){
return a.canDragBar&&a.barDraging?(e._pointerMoveHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault(),void t.stopPropagation()):void console.log("no can drag",a.canDragBar,a.barDraging);
}),f.on(o,"touchend",function(t){
return a.canDragBar&&a.barDraging?(e._pointerUpHandler({
x:t.changedTouches[0].clientX
}),t.preventDefault(),t.stopPropagation(),!1):void console.log("no can drag",a.canDragBar,a.barDraging);
});
}
},n.prototype._pointerDownHandler=function(e){
var t=this._g;
t.barDraging=!0,t.canGoDetail=!1,t.seekData.downX=e.x,t.seekData.startTime=this.player.getCurTime();
},n.prototype._pointerMoveHandler=function(e){
var t=this._g,a=t.seekData;
a.moveX=e.x;
var o=(a.moveX-a.offsetLeft)/a.zoom/a.rangeWidth;
o=Math.min(o,1),o=Math.max(o,0),a.dragTime=o*a.duration,a.dragTime!=a.startTime&&this._updateProgressBar(a.dragTime);
},n.prototype._pointerUpHandler=function(e){
var t=this._g,a=t.seekData;
a.dragTime||this._pointerMoveHandler({
x:e.x
}),console.log("up dragging",a.dragTime),t.barDraging=!1,this.player.seek(a.dragTime),
P.reportData[this._o.type].seek[t.posIndex]=1,P.reportData[this._o.type].seek_position[t.posIndex].push(parseInt(1e3*a.startTime)+","+parseInt(1e3*a.dragTime));
var o=P.reportData[this._o.type].seek_position[t.posIndex].length;
P.reportData[this._o.type].seek_loaded[t.posIndex][o-1]=0,t.seekData.startTime=0,
t.seekData.dragTime=0,t.seekData.downX=0,t.seekData.moveX=0,setTimeout(function(){
t.canGoDetail=!0;
},1e3);
},n.prototype._playMusic=function(e,t){
var a=this._o,o=this._g;
this.player.play(),P.reportData[a.type].hasended[o.posIndex]=1,0==P.reportData[a.type].local_time[o.posIndex]&&(P.reportData[a.type].local_time[o.posIndex]=parseInt(+new Date/1e3)),
w.report({
type:e,
comment_id:a.comment_id,
voiceid:a.songId,
action:t
});
},n.prototype._extend=function(e){
for(var t in e)this._o[t]=e[t];
},n.prototype._onUpdateSeekRange=function(){
var e=this,t=e._o,a=e._g;
return function(e){
this.surportSeekRange()&&t.bufferDom&&t.playdotDom?(a.canDragBar=!0,t.playdotDom.style.display="block",
t.bufferDom.style.width=1*e+"%"):(a.canDragBar=!1,t.playdotDom&&(t.playdotDom.style.display="none"));
};
},n.prototype._statusChangeCallBack=function(){
var e=this;
return function(t,a){
e._updatePlayerCss(this,a),e._o.musicPlayerStatusChange&&e._o.musicPlayerStatusChange(a);
};
},n.prototype._timeupdateCallBack=function(){
var e=this,t=this._o,a=this._g;
return function(o,r){
e._updateProgress(r),0!=r&&(P.reportData[t.type].play_duration2[a.posIndex]=parseInt(1e3*r));
};
},n.prototype._errorCallBack=function(){
var e=this,t=this._o,a=this._g;
return function(o,r){
P.reportData[t.type].errorcode[a.posIndex]=r.code,e._updatePlayerCss(this,3);
};
},n.prototype._reportH5Error=function(e){
if("mp.weixin.qq.com"==location.host&&1==e.type||P.debug){
var t=["code:",e.code,";type:",this._o.type,";url:",window.location.href];
this.player&&t.push(";src:"+this.player.getSrc());
var a=new Image;
a.src=["https://badjs.weixinbridge.com/badjs?level=4&id=112&msg=",encodeURIComponent(t.join("")),"&uin=",window.uin||"","&from=",this._o.type].join("");
}
},n.prototype._updatePlayerCss=function(e,t){
!!P.debug&&console.log("status:"+t);
{
var a=this._o,o=a.playCssDom;
a.progress;
}
2==t?(k.removeClass(o,a.playingCss),a.pauseCss&&k.removeClass(o,a.pauseCss),a.playdotDom&&(e.surportSeekRange()?(a.playdotDom.style.display="block",
this._g.canDragBar=!0):(a.playdotDom.style.display="none",this._g.canDragBar=!1))):3==t?(k.removeClass(o,a.playingCss),
a.pauseCss&&k.removeClass(o,a.pauseCss),a.playdotDom&&(a.playdotDom.style.display="none",
this._g.canDragBar=!1),this._updateProgress(0)):(1==t||4==t)&&(a.allowPause?k.addClass(o,a.pauseCss||a.playingCss):k.addClass(o,a.playingCss),
a.playdotDom&&(e.surportSeekRange()?(a.playdotDom.style.display="block",this._g.canDragBar=!0):(a.playdotDom.style.display="none",
this._g.canDragBar=!1))),a.loadingDom&&(a.loadingDom.style.display=4==t?"block":"none");
},n.prototype._updateProgress=function(e){
return this._g.barDraging?void console.log("no dragging return",e):void this._updateProgressBar(e);
},n.prototype._updateProgressBar=function(e){
var t=this._o,a=this.player,o=a.getDuration();
if(o){
var r=this._countProgress(o,e);
t.progress&&(t.progress.style.width=r),t.playtimeDom&&e>0&&(t.playtimeDom.innerHTML=_(e)),
t.playdotDom&&(t.playdotDom.style.left=r);
}
},n.prototype._countProgress=function(e,t){
return Math.min(t/e*100,100)+"%";
},n.prototype.destory=function(){
this.player&&this.player.destory();
},n.prototype.setOption=function(e){
e.duration&&(this._g.seekData.duration=e.duration),this._extend(e);
},n.prototype.setMusicPlayerOption=function(e){
e.duration&&this._g&&this._g.seekData&&(this._g.seekData.duration=e.duration),this.player&&this.player.setOption(e);
},n.prototype.getBackgroundAudioState=function(e){
return this.player.getBackgroundAudioState(e);
},{
init:g,
renderPlayer:i,
formatTime:_,
decodeStr:y,
encodeStr:m
};
});define("pages/qqmusic_tpl.html.js",[],function(){
return'<span id="qqmusic_main_<#=musicid#>_<#=posIndex#>" class="db qqmusic_area <#if(!musicSupport){#> unsupport<#}#>">\n    <span class="tc tips_global unsupport_tips" <#if(show_not_support!==true){#>style="display:none;"<#}#>>\n    当前浏览器不支持播放音乐或语音，请在微信或其他浏览器中播放    </span>\n    <span class="db qqmusic_wrp appmsg_card_context appmsg_card_active">\n        <span class="db qqmusic_bd">\n            <span id="qqmusic_play_<#=musicid#>_<#=posIndex#>" class="play_area">\n                <i class="icon_qqmusic_switch"></i>\n                <img src="<#=window.icon_qqmusic_default#>" alt="" class="pic_qqmusic_default">\n                <img src="<#=albumurl#>" data-autourl="<#=audiourl#>" data-musicid="<#=musicid#>" class="qqmusic_thumb" alt="">\n            </span>\n            <a id="qqmusic_home_<#=musicid#>_<#=posIndex#>" class="access_area">\n                <span class="qqmusic_songname"><#=music_name#></span>\n                <span class="qqmusic_singername"><#=singer#></span>\n                <span class="qqmusic_source"><img src="<#=musicIcon#>" alt=""></span>\n            </a>\n        </span>\n    </span>       \n</span>\n';
});define("new_video/ctl.js",["biz_wap/utils/ajax.js"],function(e){
"use strict";
var i;
if(parent==window)i=window;else try{
{
parent.window.location.href;
}
i=parent.window;
}catch(n){
i=window;
}
var t=i.user_uin,r=Math.floor(i.user_uin/100)%20;
t||(r=-1);
var a=function(){
return r>=0;
};
i.__webviewid||(i.__webviewid=+new Date+"_"+Math.ceil(1e3*Math.random()));
var d=function(){
var e=i.mid,n=i.idx,r="";
r=e&&n?e+"_"+n:"";
var a=i.__webviewid,d=[t,r,a].join("_");
return d;
},o=function(i){
if(20>r)try{
var n=i.vid||"",t={};
t.__biz=parent.window.biz||"",t.vid=n,t.clienttime=+new Date;
var o=parent.window.mid,s=parent.window.idx,w="";
w=o&&s?o+"_"+s:n,t.type="undefined"!=typeof i.type?i.type:o&&s?1:2,t.id=w,t.hit_bizuin=i.hit_bizuin||"",
t.hit_vid=i.hit_vid||"",t.webviewid=d(),t.step=i.step||0,t.orderid=i.orderid||0,
t.ad_source=i.ad_source||0,t.traceid=i.traceid||0,t.ext1=i.ext1||"",t.ext2=i.ext2||"",
t.r=Math.random(),t.devicetype=parent.window.devicetype,t.version=parent.window.clientversion,
t.is_gray=a()?1:0,t.mid=o||"",t.idx=s||"",t.url=parent.window.location.href,t.screen_num=i.screen_num||0,
t.screen_height=i.screen_height||0,t.ori_status=i.ori_status||3,t.fromid=i.fromid||0,
t.sessionid=window.sessionid||"",t.appmsg_scene=window.source||(window.cgiData?window.cgiData.scene:0)||0,
!t.appmsg_scene&&t.fromid?t.appmsg_scene=t.fromid:!t.fromid&&t.appmsg_scene&&(t.fromid=t.appmsg_scene),
t.total_range=i.total_range||0,t.current_range=i.current_range||0,t.duration=i.duration||0;
var _=e("biz_wap/utils/ajax.js");
_({
url:"/mp/ad_video_report?action=user_action",
type:"post",
data:t
});
}catch(c){}
};
return{
report:o,
getWebviewid:d,
showAd:a
};
});define("pages/utils.js",["appmsg/appmsg_report.js","biz_common/utils/emoji_data.js","pages/version4video.js","biz_wap/utils/mmversion.js","biz_wap/jsapi/core.js","biz_common/dom/event.js"],function(e){
"use strict";
var i=e("appmsg/appmsg_report.js"),o=e("biz_common/utils/emoji_data.js"),t=e("pages/version4video.js"),n=e("biz_wap/utils/mmversion.js"),a=e("biz_wap/jsapi/core.js"),r=e("biz_common/dom/event.js"),c={
inWechat:t.device.inWechat,
windowWechat:/WindowsWechat/i.test(navigator.userAgent),
macWechat:/wechat.*mac os/i.test(navigator.userAgent),
emojiImg:'<img src="https://res.wx.qq.com/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_blank.gif" class="icon_emotion_single #style#" alt="#name#">',
emojiDataMap:{}
};
!function(){
for(var e=0,i=o.length;i>e;e++){
var t=o[e];
t.cn&&!c.emojiDataMap[t.cn]&&(c.emojiDataMap[t.cn]={
index:e
}),t.hk&&!c.emojiDataMap[t.hk]&&(c.emojiDataMap[t.hk]={
index:e
}),t.us&&!c.emojiDataMap[t.us]&&(c.emojiDataMap[t.us]={
index:e
});
}
}();
var s=function(e){
return/\[[^\[\]]+\]/.test(e)?e.replace(/\[[^\[\]]+\]/g,function(e){
if(c.emojiDataMap[e]&&o[c.emojiDataMap[e].index]){
var i=o[c.emojiDataMap[e].index];
return c.emojiImg.replace("#name#",e).replace("#style#",i.style);
}
return e;
}):e;
},m=function(e,i){
c.inWechat?c.windowWechat||c.macWechat?i===!0?window.parent.open(e):window.parent.location.href=e:a.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(o){
-1==o.err_msg.indexOf("ok")&&(i===!0?window.parent.open(e):window.parent.location.href=e);
}):i===!0?window.open(e):location.href=e;
},p=function(){
!c.inWechat||c.windowWechat||c.macWechat?window.close():a.invoke("closeWindow",function(e){
-1==e.err_msg.indexOf("ok")&&window.close();
});
},l=function(e){
return document.getElementById(e);
},u=function(e){
return e.replace(/^\s+|\s+$/g,"");
},d=function(e,i){
return(i||document).querySelector(e);
},f=function(e,i){
return(i||document).querySelectorAll(e);
},w=function(e){
var o=e.$container;
o&&!n.isInMiniProgram&&r.on(o,"tap",".js_go_profile",function(o){
var t=o.delegatedTarget;
if(t){
var n=t.getAttribute("data-biz")||e.biz||window.biz||"";
if("function"==typeof e.beforeGo2Profile&&e.beforeGo2Profile(t),1==window.isprofileblock)a.invoke("openUrlWithExtraWebview",{
url:"https://mp.weixin.qq.com/mp/profileblock?__biz="+n+"#wechat_redirect",
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href="https://mp.weixin.qq.com/mp/profileblock?__biz="+n+"#wechat_redirect");
});else{
var r=t.getAttribute("data-scene")||e.profile_scene||"";
i.profileReport({
isnew:0,
title:e.title||"",
item_show_type:e.item_show_type||""
}),a.invoke("profile",{
username:e.user_name,
profileReportInfo:"",
scene:r
},function(){});
}
}
});
};
return{
jumpUrl:m,
closeWin:p,
trim:u,
getId:l,
qs:d,
qsAll:f,
inWechat:c.inWechat,
windowWechat:c.windowWechat,
macWechat:c.macWechat,
emojiFormat:s,
go2ProfileEvent:w
};
});define("appmsg/open_url_with_webview.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var r=e("biz_wap/jsapi/core.js"),n=-1!=navigator.userAgent.indexOf("WindowsWechat"),i=function(e,i){
if(n)return location.href=e,!1;
i=i||{};
var o=i.sample||0;
o*=1e3;
var t=window.user_uin||0,s=0!==t&&Math.floor(t/100)%1e3<o;
return s?void r.invoke("openUrlWithExtraWebview",{
url:e,
openType:i.openType||1,
scene:i.scene||"",
bizUsername:i.user_name||""
},function(e){
e&&"openUrlWithExtraWebview:ok"===e.err_msg?i.resolve&&i.resolve():i.reject&&i.reject();
}):void(i.reject&&i.reject());
};
return i;
});define("appmsg/more_read.js",["biz_common/utils/string/html.js","biz_common/tmpl.js","biz_wap/utils/ajax.js","appmsg/more_read_tpl.html.js","biz_wap/utils/openUrl.js","biz_common/dom/event.js","biz_common/utils/monitor.js","common/utils.js"],function(n){
"use strict";
function i(n){
for(var i=c.getInnerHeight(),e=document.documentElement.clientWidth||window.innerWidth,t=document.body.scrollHeight||document.body.offsetHeight,s=document.body.scrollTop||document.documentElement.scrollTop,m=[],d=0;d<l.length;d++){
var w=[l[d].bizuin||window.biz||"",l[d].mid||"",l[d].idx||""].join("_");
m.push(w);
}
m=m.join("#");
var h=r[n.index].getBoundingClientRect(),p="fans_read_cnt="+l[n.index].fans_read_cnt,g={
act:n.action||0,
bizuin:window.biz||"",
msgid:window.mid||"",
idx:window.idx||"",
scene:window.source||"",
sub_scene:window.subscene||"",
get_a8_key_scene:window.ascene||"",
screen_height:i,
screen_width:e,
screen_num:Math.ceil(t/i),
action_screen_num:Math.ceil((h.top+h.height+s)/i),
start_time_ms:_,
action_time_ms:Date.now(),
more_msg:m,
a_bizuin:l[n.index].bizuin||window.biz||"",
a_msgid:l[n.index].mid||"",
a_idx:l[n.index].idx||"",
rank:n.index+1,
tip:p,
session_id:u
};
o({
url:"/mp/appmsgreport?action=more_read",
type:"POST",
data:g,
timeout:2e3,
async:!1,
mayAbort:!0
});
var b=1===n.action?4:5;
a.setSum(110809,b,1).send();
}
function e(){
if(l){
for(var n=0,t=c.getInnerHeight(),o=0;o<r.length;o++)if(r[o].dataset.show)n++;else{
var s=r[o].getBoundingClientRect();
s.top+s.height<t&&(r[o].dataset.show=1,i({
action:1,
index:o
}));
}
n>=r.length&&d.off(window,"scroll",e);
}
}
n("biz_common/utils/string/html.js");
var t=n("biz_common/tmpl.js"),o=n("biz_wap/utils/ajax.js"),s=n("appmsg/more_read_tpl.html.js"),m=n("biz_wap/utils/openUrl.js"),d=n("biz_common/dom/event.js"),a=n("biz_common/utils/monitor.js"),c=n("common/utils.js"),l=null,r=null,_=Date.now(),u=""+_+"_"+Math.random().toString(36).substring(2);
return d.on(window,"scroll",e),function(n,e){
l=e,n.innerHTML=t.tmpl(s,{
list:l
}),r=n.getElementsByClassName("more_read_link");
for(var o=0;o<r.length;o++)d.on(r[o],"click",function(n){
return function(){
window.__second_open__?m.openUrlWithExtraWebview(l[n].link.htmlDecode()):window.location.href=l[n].link.htmlDecode(),
i({
action:2,
index:n
});
};
}(o));
n.style.display="";
};
});define("appmsg/like.js",["biz_common/dom/event.js","biz_common/dom/class.js","biz_wap/utils/ajax.js","appmsg/log.js","complain/tips.js","appmsg/retry_ajax.js","biz_wap/jsapi/core.js","biz_wap/utils/mmversion.js","common/utils.js"],function(require,exports,module,alert){
"use strict";
function qs(e){
return document.getElementById(e);
}
function showAppToast(e,t){
JSAPI.invoke("handleMPPageAction",{
action:"showToast",
wording:e||"",
status:t||"success"
});
}
function initLikeEvent(opt){
function show(e){
e.style.display="";
}
function hide(e){
e.style.display="none";
}
function vShow(e){
e.style.visibility="visible";
}
function vHide(e){
e.style.visibility="hidden";
}
function clear(e){
e.value="";
}
function showLoading(){
commonUtils.isNativePage()?showAppToast("发送中","loading"):show(qs("js_loading"));
}
function hideLoading(){
commonUtils.isNativePage()?showAppToast("","dismissloading"):hide(qs("js_loading"));
}
function showToast(e){
commonUtils.isNativePage()?showAppToast(e):(el_toastMsg.innerHTML=e,show(el_likeToast),
setTimeout(function(){
hide(el_likeToast);
},1e3));
}
function failAlert(){
alert("网络异常，请稍后重试");
}
var scrollTop,el_like=opt.likeAreaDom,el_likeNum=opt.likeNumDom,showType=opt.showType,prompted=opt.prompted,allPage=document.getElementsByTagName("html")[0],el_likeEducate=qs("js_like_educate"),el_likeToast=qs("js_like_toast"),el_likeBtn=qs("js_like_btn"),el_acknowledge=qs("js_acknowledge"),el_toastMsg=qs("js_toast_msg"),el_educateConfirm=qs("js_educate_like_confirm"),el_alikeComment=qs("js_a_like_comment"),el_alikeCommentConfirm=qs("js_a_like_confirm"),el_alikeCommentText=qs("js_a_like_comment_text"),el_acommentLenSpan=qs("like_a_comment_len_span"),el_acommentLen=qs("like_a_comment_len"),el_acommentErrorMsg=qs("js_a_like_comment_msg"),el_acommentCurrentCount=qs("js_a_like_current_cnt"),el_alikeCommentShare=qs("js_a_like_comment_share"),el_bcommentPanel=qs("js_b_comment_panel"),el_blikeConfirm=qs("js_b_like_confirm"),el_blikeCommentTextFirst=qs("js_b_comment_text_first"),el_blikeCommentTextSecond=qs("js_b_comment_text_second"),el_bcommentCancel=qs("js_b_comment_cancel"),el_bcommentConfirm=qs("js_b_comment_confirm"),el_bcommentErrorMsg=qs("js_b_like_comment_msg"),el_bcommentCurrentCount=qs("js_b_like_current_cnt"),el_bcommentPanel2=qs("js_b_comment_final"),haokanLock=!1,startY;
if(el_like&&el_likeNum){
var img=new Image;
window.appmsg_like_type&&2===window.appmsg_like_type?img.src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=114217_0_1":window.appmsg_like_type&&1===window.appmsg_like_type&&(img.src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=114217_1_1"),
JSAPI.on("menu:haokan",function(e){
var t=0===parseInt(e.recommend)?0:1;
if(0===t)sendRecommendAjax(t,"",2,clientShowType);else{
var o="";
o=e.comment;
var i=1===e.scene?4:5;
sendRecommendAjax(t,o,i,clientShowType);
}
}),2===showType&&(el_bcommentConfirm.setAttribute("disabled","disabled"),el_bcommentConfirm.innerHTML="Post");
var like_report=function(){
log("[Appmsg] click like");
var e=el_like.getAttribute("like"),t=el_likeNum.innerHTML,o=parseInt(e)?parseInt(e):0,i=o?0:1,n=parseInt(t)?parseInt(t):0,s=opt.appmsgid||opt.mid,l=opt.itemidx||opt.idx;
if(o){
if(1!==appmsg_like_type)return void sendRecommendAjax(0);
Class.removeClass(el_like,opt.className),el_like.setAttribute("like",0),n>0&&"100000+"!==t&&(el_likeNum.innerHTML=n-1==0?"Like":n-1);
}else if(1===appmsg_like_type)el_like.setAttribute("like",1),Class.addClass(el_like,opt.className),
"100000+"!==t&&(el_likeNum.innerHTML=n+1);else if(2===appmsg_like_type)return void initRecommendPanel();
RetryAjax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+i+"&f=json&appmsgid="+s+"&itemidx="+l,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:window.item_show_type,
client_version:window.clientversion,
action_type:i?1:2,
device_type:window.devicetype
},
type:"POST"
});
},initRecommendPanel=function(){
if(1!==showType&&2!==showType||1!==prompted)if(1!==showType&&2!==showType||0!==prompted){
if(3===showType)if(isShow(el_bcommentPanel)||isShow(el_bcommentPanel2))!isShow(el_bcommentPanel)&&isShow(el_bcommentPanel2)?hide(el_bcommentPanel2):isShow(el_bcommentPanel)&&!isShow(el_bcommentPanel2)&&hide(el_bcommentPanel);else{
var e=qs("like3").offsetTop-document.body.scrollTop;
show(el_bcommentPanel),qs("js_b_wrp").clientHeight+e+50>document.documentElement.clientHeight?Class.addClass(qs("js_b_wrp"),"like_comment_primary_pos_top"):Class.removeClass(qs("js_b_wrp"),"like_comment_primary_pos_top");
}
}else{
var t=qs("like3").offsetTop-document.body.scrollTop,o=document.documentElement.clientHeight-t-qs("like3").clientHeight;
t>o?Class.addClass(qs("js_like_educate_wrapper"),"like_comment_primary_pos_top"):Class.removeClass(qs("js_like_educate_wrapper"),"like_comment_primary_pos_top"),
show(el_likeEducate);
}else sendRecommendAjax(1,"",1);
},isShow=function(e){
return"none"===e.style.display||"hidden"===e.style.visibility?!1:""===e.style.display||"block"===e.style.display||"visible"===e.style.visibility?!0:void 0;
},connectWithApp=function(e,t,o){
var i={
origin:"mp",
isLike:e?1:0,
url:encodeURIComponent(msg_link.html(!1)),
content:t?t:""
};
JSAPI.invoke("handleHaokanAction",{
action:actionString,
recommend:e?1:0,
server_data:JSON.stringify(i)
},function(e){
console.log("handleHaokanAction",e);
}),setTimeout(function(){
(3===showType&&1===e||o)&&(i={
origin:"mp",
isLike:e?1:0,
url:encodeURIComponent(msg_link.html(!1)),
content:""
},JSAPI.invoke("handleHaokanAction",{
action:actionString,
recommend:e?1:0,
server_data:JSON.stringify(i)
},function(e){
console.log("handleHaokanAction",e);
}));
},500),JSAPI.invoke("handleHaokanAction",{
action:actionForClient,
permission:1,
recommend:e?1:0
},function(e){
console.log("handleHaokanAction for client",e);
});
},isBeenUnvisible=function(e){
return e.offsetTop-document.body.scrollTop>=commonUtils.getInnerHeight()-60?!0:!1;
},likeExpose=function e(){
var t=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop,o=qs("like3").offsetTop,i=opt.appmsgid||opt.mid,n=opt.itemidx||opt.idx;
t+commonUtils.getInnerHeight()>o&&o>=t&&(ajax({
url:"/mp/appmsgreport?action=appmsglikeexposure&__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&f=json&appmsgid="+i+"&itemidx="+n,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:window.item_show_type,
client_version:window.clientversion,
device_type:window.devicetype
},
type:"POST"
}),DomEvent.off(window,"scroll",e));
};
DomEvent.on(el_like,"click",function(e){
return like_report(e),!1;
}),DomEvent.on(el_blikeConfirm,"click",function(){
sendRecommendAjax(1,"",1);
}),DomEvent.on(el_educateConfirm,"click",function(){
sendRecommendAjax(1,"",1),hide(el_likeEducate);
}),DomEvent.on(qs("js_mask_1"),"click",function(){
hide(el_bcommentPanel);
}),DomEvent.on(qs("js_mask_2"),"mousedown",function(){
hide(el_bcommentPanel2),clear(el_blikeCommentTextSecond),vHide(el_bcommentErrorMsg),
enableMove();
}),DomEvent.on(qs("js_mask_3"),"click",function(){
hide(el_likeEducate);
}),DomEvent.on(el_blikeCommentTextFirst,"click",function(){
scrollTop=document.body.scrollTop||document.documentElement.scrollTop||0,hide(el_bcommentPanel),
show(el_bcommentPanel2),el_blikeCommentTextSecond.focus(),disableMove();
}),DomEvent.on(el_bcommentConfirm,"mousedown",function(){
var e;
2===showType?e=4:3===showType&&(e=5),validataComment(el_blikeCommentTextSecond,e);
}),DomEvent.on(el_bcommentCancel,"mousedown",function(){
hide(el_bcommentPanel2),clear(el_blikeCommentTextSecond),vHide(el_bcommentErrorMsg),
enableMove();
}),DomEvent.on(el_acknowledge,"click",function(){
hide(el_likeEducate);
}),DomEvent.on(qs("js_cancel"),"click",function(){
hide(el_likeEducate);
}),DomEvent.on(qs("js_confirm"),"click",function(){
sendRecommendAjax(1,"",1);
}),DomEvent.on(el_alikeCommentShare,"click",function(){
return commonUtils.isNativePage()?void JSAPI.invoke("handleHaokanAction",{
action:"writeComment",
style:"8"===item_show_type||"5"===item_show_type?"black":"white"
}):(scrollTop=document.body.scrollTop||document.documentElement.scrollTop,show(el_bcommentPanel2),
el_blikeCommentTextSecond.focus(),el_bcommentConfirm.setAttribute("disabled","disabled"),
void disableMove());
}),DomEvent.on(el_blikeCommentTextSecond,"focus",function(){}),DomEvent.on(el_blikeCommentTextSecond,"blur",function(){
window.scrollTo(0,scrollTop);
}),DomEvent.on(window,"scroll",likeExpose);
var disableMove=function(){
document.addEventListener("touchmove",preventMove,{
passive:!1
}),el_blikeCommentTextSecond.addEventListener("touchstart",getTouchStart,{
passive:!1
}),el_blikeCommentTextSecond.addEventListener("touchmove",preventText,!1);
},enableMove=function(){
document.removeEventListener("touchmove",preventMove,{
passive:!1
}),el_blikeCommentTextSecond.removeEventListener("touchstart",getTouchStart,{
passive:!1
}),el_blikeCommentTextSecond.removeEventListener("touchmove",preventText,!1);
},preventMove=function(e){
var t=e.target;
"TEXTAREA"!==t.tagName&&"BUTTON"!==t.tagName&&(e.preventDefault(),e.stopPropagation());
},getTouchStart=function(e){
var t=e.targetTouches||[];
if(t.length>0){
var o=t[0]||{};
startY=o.clientY;
}
},preventText=function(e){
var t=!1,o=e.changedTouches,i=this.scrollTop,n=this.offsetHeight,s=this.scrollHeight;
if(o.length>0){
var l=o[0]||{},m=l.clientY;
t=m>startY&&0>=i?!1:startY>m&&i+n>=s?!1:!0,t||e.preventDefault();
}
},unsetLike2Status=function(e){
1===e?alert(" 已取消，想法已同步删除"):showToast("已取消"),2===showType&&isShow(el_alikeComment)&&(hide(el_alikeComment),
vHide(el_acommentErrorMsg));
var t=el_likeNum.innerHTML;
Class.removeClass(el_likeBtn,opt.className),el_like.setAttribute("like",0),el_alikeComment&&hide(el_alikeComment),
realLikeNum-=1,realLikeNum>=0&&"10万+"!==t&&(el_likeNum.innerHTML=dealLikeReadShow(realLikeNum));
},setLike2Status=function(e){
var t="Wow";
switch(showType){
case 1:
switch(prompted){
case 0:
hide(el_likeEducate),prompted=1;
break;

case 1:
showToast(t);
}
setBtnLike();
break;

case 2:
switch(hide(el_bcommentPanel2),clear(el_blikeCommentTextSecond),prompted){
case 0:
hide(el_likeEducate),prompted=1;
break;

case 1:
(4===e||5===e)&&showToast(4===e?"Posted":t);
}
5!==e&&(4===e?hide(el_alikeComment):show(el_alikeComment),isBeenUnvisible(el_alikeComment)&&scrollToShow(el_alikeComment)),
4!==e&&setBtnLike();
break;

case 3:
switch(hide(el_bcommentPanel2),hide(el_bcommentPanel),clear(el_blikeCommentTextSecond),
prompted){
case 0:
qs("educate_title").innerHTML="已发送到看一看",show(el_likeEducate),show(educate_btn2),
prompted=1;
break;

case 1:
showToast(t);
}
setBtnLike();
}
enableMove(),commonUtils.isNativePage()&&JSAPI.invoke("handleHaokanAction",{
action:"closeComment"
});
},setBtnLike=function(){
el_like.setAttribute("like",1),Class.addClass(el_likeBtn,opt.className),realLikeNum+=1;
var e=el_likeNum.innerHTML;
"10万+"!==e&&(el_likeNum.innerHTML=dealLikeReadShow(realLikeNum));
},scrollToShow=function(e){
window.scrollTo(0,e.offsetHeight+window.scrollY);
};
DomEvent.on(el_blikeCommentTextSecond,"input",function(){
var e=el_blikeCommentTextSecond.value.replace(/^\s+|\s+$/g,"");
e.length>200?(el_bcommentCurrentCount.innerHTML=e.length,vShow(el_bcommentErrorMsg)):vHide(el_bcommentErrorMsg),
e.length>0&&e.length<=200?el_bcommentConfirm.removeAttribute("disabled"):0===e.length&&3===showType?el_bcommentConfirm.removeAttribute("disabled"):el_bcommentConfirm.setAttribute("disabled","disabled");
});
var validataComment=function(e,t){
var o=e.value.replace(/^\s+|\s+$/g,"");
sendRecommendAjax(1,o,t);
},sendRecommendAjax=function sendRecommendAjax(like,comment,type,clientType){
if(!haokanLock){
showLoading();
var appmsgid=opt.appmsgid||opt.mid,itemidx=opt.itemidx||opt.idx;
haokanLock=!0;
var action_type;
action_type=like?type:2,ajax({
url:"/mp/appmsg_like?__biz="+opt.biz+"&mid="+opt.mid+"&idx="+opt.idx+"&like="+like+"&f=json&appmsgid="+appmsgid+"&itemidx="+itemidx,
data:{
is_temp_url:opt.is_temp_url||0,
scene:window.source,
subscene:window.subscene,
appmsg_like_type:window.appmsg_like_type,
item_show_type:window.item_show_type,
client_version:window.clientversion,
comment:comment?comment:"",
prompted:1,
style:clientType||showType,
action_type:action_type,
passparam:window.passparam,
request_id:(new Date).getTime(),
device_type:window.devicetype
},
type:"POST",
success:function success(res){
haokanLock=!1;
var data=eval("("+res+")");
hideLoading(),0==data.base_resp.ret?(like?setLike2Status(type):setTimeout(function(){
unsetLike2Status(data.has_comment);
},20),connectWithApp(like,comment,clientType)):failAlert();
},
error:function(){
hideLoading(),failAlert(),haokanLock=!1;
}
});
}
};
}
}
function showLikeNum(e){
var t=e||{};
if(t.show){
var o=t.likeAreaDom,i=t.likeNumDom,n=document.getElementById("js_like_btn");
o&&(o.style.display=t.likeAreaDisplayValue,t.liked&&(1===appmsg_like_type?Class.addClass(o,t.className):Class.addClass(n,t.className)),
o.setAttribute("like",t.liked?"1":"0"));
var s=1===appmsg_like_type?"Like":"";
realLikeNum=t.likeNum||s,1===appmsg_like_type?(parseInt(realLikeNum)>1e5?realLikeNum="100000+":"",
i&&(i.innerHTML=realLikeNum)):2===appmsg_like_type&&(i.innerHTML=dealLikeReadShow(realLikeNum));
}
}
function dealLikeReadShow(e){
var t="";
if(parseInt(e)>1e5)t="10万+";else if(parseInt(e)>1e4&&parseInt(e)<=1e5){
var o=""+parseInt(e)/1e4,i=o.indexOf(".");
t=-1===i?o+"万":o.substr(0,i)+"."+o.charAt(i+1)+"万";
}else t=0===parseInt(e)?"":e;
return t;
}
function showReadNum(e){
var t=e||{};
if(t.show){
var o=t.readAreaDom,i=t.readNumDom;
o&&(o.style.display=t.readAreaDisplayValue);
var n=t.readNum||1;
1===appmsg_like_type?(parseInt(n)>1e5?n="100000+":"",i&&(i.innerHTML=n)):2===appmsg_like_type&&(i.innerHTML=dealLikeReadShow(n));
}
}
var DomEvent=require("biz_common/dom/event.js"),Class=require("biz_common/dom/class.js"),ajax=require("biz_wap/utils/ajax.js"),log=require("appmsg/log.js"),Tips=require("complain/tips.js"),RetryAjax=require("appmsg/retry_ajax.js"),JSAPI=require("biz_wap/jsapi/core.js"),actionString="submitMsgToTL",actionForClient="update_recommend_status",mmversion=require("biz_wap/utils/mmversion.js"),commonUtils=require("common/utils.js"),realLikeNum,clientShowType=5;
return{
initLikeEvent:initLikeEvent,
showLikeNum:showLikeNum,
showReadNum:showReadNum
};
});