define("appmsg/log.js",["biz_wap/utils/log.js"],function(i){
"use strict";
var s=i("biz_wap/utils/log.js");
return function(i,t){
s(i,t);
};
});define("biz_common/dom/class.js",[],function(){
"use strict";
function s(s,a){
return s.classList?s.classList.contains(a):s.className.match(new RegExp("(\\s|^)"+a+"(\\s|$)"));
}
function a(s,a){
s.classList?s.classList.add(a):this.hasClass(s,a)||(s.className+=" "+a);
}
function e(a,e){
if(a.classList)a.classList.remove(e);else if(s(a,e)){
var c=new RegExp("(\\s|^)"+e+"(\\s|$)");
a.className=a.className.replace(c," ");
}
}
function c(c,l){
s(c,l)?e(c,l):a(c,l);
}
return{
hasClass:s,
addClass:a,
removeClass:e,
toggleClass:c
};
});define("biz_wap/utils/device.js",[],function(){
"use strict";
function s(s){
{
var e=s.match(/MQQBrowser\/(\d+\.\d+)/i),r=s.match(/QQ\/(\d+\.(\d+)\.(\d+)\.(\d+))/i)||s.match(/V1_AND_SQ_([\d\.]+)/),i=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/)||s.match(/MicroMessenger\/((\d+)\.(\d+))/),t=s.match(/Mac\sOS\sX\s(\d+\.\d+)/),n=s.match(/Windows(\s+\w+)?\s+?(\d+\.\d+)/),a=s.match(/MiuiBrowser\/(\d+\.\d+)/i),d=s.match(/MI-ONE/),h=s.match(/MI PAD/),w=s.match(/UCBrowser\/(\d+\.\d+(\.\d+\.\d+)?)/)||s.match(/\sUC\s/),c=s.match(/IEMobile(\/|\s+)(\d+\.\d+)/)||s.match(/WPDesktop/),u=s.match(/(ipod).*\s([\d_]+)/i),b=s.match(/(ipad).*\s([\d_]+)/i),p=s.match(/(iphone)\sos\s([\d_]+)/i),v=s.match(/Chrome\/(\d+\.\d+)/),m=s.match(/Mozilla.*Linux.*Android.*AppleWebKit.*Mobile Safari/),f=s.match(/(android)\s([\d\.]+)/i);
s.indexOf("HTC")>-1;
}
if(o.browser=o.browser||{},o.os=o.os||{},window.ActiveXObject){
var l=6;
(window.XMLHttpRequest||s.indexOf("MSIE 7.0")>-1)&&(l=7),(window.XDomainRequest||s.indexOf("Trident/4.0")>-1)&&(l=8),
s.indexOf("Trident/5.0")>-1&&(l=9),s.indexOf("Trident/6.0")>-1&&(l=10),o.browser.ie=!0,
o.browser.version=l;
}else s.indexOf("Trident/7.0")>-1&&(o.browser.ie=!0,o.browser.version=11);
f&&(this.os.android=!0,this.os.version=f[2]),u&&(this.os.ios=this.os.ipod=!0,this.os.version=u[2].replace(/_/g,".")),
b&&(this.os.ios=this.os.ipad=!0,this.os.version=b[2].replace(/_/g,".")),p&&(this.os.iphone=this.os.ios=!0,
this.os.version=p[2].replace(/_/g,".")),n&&(this.os.windows=!0,this.os.version=n[2]),
t&&(this.os.Mac=!0,this.os.version=t[1]),s.indexOf("lepad_hls")>0&&(this.os.LePad=!0),
h&&(this.os.MIPAD=!0),e&&(this.browser.MQQ=!0,this.browser.version=e[1]),r&&(this.browser.MQQClient=!0,
this.browser.version=r[1]),i&&(this.browser.WeChat=!0,this.browser.mmversion=this.browser.version=i[1]),
a&&(this.browser.MIUI=!0,this.browser.version=a[1]),w&&(this.browser.UC=!0,this.browser.version=w[1]||0/0),
c&&(this.browser.IEMobile=!0,this.browser.version=c[2]),m&&(this.browser.AndriodBrowser=!0),
d&&(this.browser.M1=!0),v&&(this.browser.Chrome=!0,this.browser.version=v[1]),this.os.windows&&(this.os.win64="undefined"!=typeof navigator.platform&&"win64"==navigator.platform.toLowerCase()?!0:!1);
var M={
iPad7:"iPad; CPU OS 7",
LePad:"lepad_hls",
XiaoMi:"MI-ONE",
SonyDTV:"SonyDTV",
SamSung:"SAMSUNG",
HTC:"HTC",
VIVO:"vivo"
};
for(var g in M)this.os[g]=-1!==s.indexOf(M[g]);
o.os.phone=o.os.phone||/windows phone/i.test(s),this.os.getNumVersion=function(){
return parseFloat(o.os.version,"10");
},this.os.hasTouch="ontouchstart"in window,this.os.hasTouch&&this.os.ios&&this.os.getNumVersion()<6&&(this.os.hasTouch=!1),
o.browser.WeChat&&o.browser.version<5&&(this.os.hasTouch=!1),o.browser.getNumVersion=function(){
return parseFloat(o.browser.version,"10");
},o.browser.isFFCanOcx=function(){
return o.browser.firefox&&o.browser.getNumVersion()>=3?!0:!1;
},o.browser.isCanOcx=function(){
return!(!o.os.windows||!o.browser.ie&&!o.browser.isFFCanOcx()&&!o.browser.webkit);
},o.browser.isNotIESupport=function(){
return!!o.os.windows&&(!!o.browser.webkit||o.browser.isFFCanOcx());
},o.userAgent={},o.userAgent.browserVersion=o.browser.version,o.userAgent.osVersion=o.os.version,
delete o.userAgent.version;
}
var o={};
s.call(o,window.navigator.userAgent);
var e=function(){
var s=window.navigator.userAgent,e=null;
if(o.os.android){
if(o.browser.MQQ&&o.browser.getNumVersion()>=4.2)return!0;
if(-1!=s.indexOf("MI2"))return!0;
if(o.os.version>="4"&&(e=s.match(/MicroMessenger\/((\d+)\.(\d+))\.(\d+)/))&&e[1]>=4.2)return!0;
if(o.os.version>="4.1")return!0;
}
return!1;
}(),r=function(){
var s=document.createElement("video");
if("function"==typeof s.canPlayType){
if("probably"==s.canPlayType('video/mp4; codecs="mp4v.20.8"'))return!0;
if("probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E"')||"probably"==s.canPlayType('video/mp4; codecs="avc1.42E01E, mp4a.40.2"'))return!0;
}
return!1;
}(),i=function(){
return console.info("[canSupportAutoPlay]",o.os.ios,o.os.getNumVersion()),o.os.ios&&o.os.getNumVersion()<10?!1:!0;
}();
return o.canSupportVideo=r||e,o.canSupportVideoMp4=r,o.canSupportH5Video=e,o.canSupportAutoPlay=i,
o;
});define("appmsg/weapp_common.js",["biz_wap/utils/ajax.js","biz_wap/jsapi/core.js"],function(e,p,a,n){
"use strict";
function o(){
var e=navigator.userAgent.match(/MicroMessenger\/(\d+)\.(\d+)\.(\d+)/);
if(e){
var p=Number(e[1]),a=Number(e[2]),n=Number(e[3]);
p>6?g.canJumpOnTap=!0:6===p&&a>5?g.canJumpOnTap=!0:6===p&&5===a&&n>=3&&(g.canJumpOnTap=!0);
}else navigator.userAgent.match(/MicroMessenger\//)||(g.isNonWechat=!0);
t();
}
function t(){
try{
g.appidSnInfo=JSON.parse(window.weapp_sn_arr_json).weapp_card_list;
}catch(e){
g.appidSnInfo=[];
}
if(!g.appidSnInfo||0==g.appidSnInfo.length)return g.getInfoState=1,void r();
for(var p={
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
uin:window.uin||"",
key:window.key||"",
pass_ticket:window.pass_ticket||"",
weapp_num:g.appidSnInfo.length
},a={},n={},o=0;o<p.weapp_num;o++){
var t=g.appidSnInfo[o].appid,i=g.appidSnInfo[o].sn;
a[t]?a[t].push(o):(a[t]=[o],p["weapp_appid_"+o]=g.appidSnInfo[o].appid,g.appidSnDict[t]=i),
n[i]?n[i].push(o):(n[i]=[o],p["weapp_sn_"+o]=g.appidSnInfo[o].sn);
}
var c="/mp/appmsg_weapp?action=batch_get_weapp";
for(var s in p)c+="&"+s+"="+encodeURIComponent(p[s]);
m({
url:c,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
try{
if(console.log("weapp_common success:",e),g.appidInfoResp=e,e.base_resp.ret)throw new Error("Fetch weapp info but get ret="+e.base_resp.ret);
g.data={
infoMap:{},
appid:e.appid||"",
appmsg_compact_url:e.appmsg_compact_url||"",
pathArgs:"appid="+encodeURIComponent(e.appid)+(e.appmsg_compact_url?"&appmsg_compact_url="+encodeURIComponent(e.appmsg_compact_url):"")
};
for(var p=e.weapp_info,a=0;a<p.length;a++){
var n=p[a].weapp_appid;
g.data.infoMap[n]=p[a];
}
g.getInfoState=4;
}catch(o){
g.getInfoState=3,g.appidInfoCatchErr=o;
}
r();
},
error:function(){
g.getInfoState=2,r();
}
});
}
function r(){
if(1==g.getInfoState||2==g.getInfoState)for(var e=0,p=g.appInfoErrQueue.length;p>e;e++){
var a=g.appInfoErrQueue[e];
"function"==typeof a&&a({
code:g.getInfoState
});
}else if(3==g.getInfoState)for(var e=0,p=g.appInfoErrQueue.length;p>e;e++){
var a=g.appInfoErrQueue[e];
"function"==typeof a&&a({
code:g.getInfoState,
resp:g.appidInfoResp,
catchErr:g.appidInfoCatchErr
});
}else if(4==g.getInfoState)for(var e=0,p=g.appInfoSucQueue.length;p>e;e++){
var a=g.appInfoSucQueue[e];
"function"==typeof a&&a({
resp:g.appidInfoResp,
data:g.data
});
}
g.appInfoErrQueue=[],g.appInfoSucQueue=[];
}
function i(e){
console.log("getAppidInfo",g),1!=g.getInfoState&&2!=g.getInfoState||"function"!=typeof e.onError?3==g.getInfoState&&"function"==typeof e.onError?e.onError({
code:g.getInfoState,
resp:g.appidInfoResp,
catchErr:g.appidInfoCatchErr
}):4==g.getInfoState&&"function"==typeof e.onSuccess?e.onSuccess({
resp:g.appidInfoResp,
data:g.data
}):("function"==typeof e.onSuccess&&g.appInfoSucQueue.push(e.onSuccess),"function"==typeof e.onError&&g.appInfoErrQueue.push(e.onError)):e.onError({
code:g.getInfoState
});
}
function c(e,p){
var a={
__biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
weapp_appid:e.appid||"",
weapp_sn:g.appidSnDict[e.appid]||"",
path:e.path||""
},n="/mp/appmsg_weapp?action=get_wxa_code";
for(var o in a)n+="&"+o+"="+encodeURIComponent(a[o]);
m({
url:n,
type:"GET",
dataType:"json",
async:!0,
success:function(e){
e.base_resp&&0===e.base_resp.ret?p&&p(e.url):p&&p();
},
error:function(){
p&&p();
}
});
}
function s(e){
if(!e||!g.data)return"";
var p="",a=e.indexOf("?");
return p=a>=0?e.slice(0,a)+(a>0?".html":"")+e.slice(a)+"&"+g.data.pathArgs:e+(""!==e?".html?":"?")+g.data.pathArgs;
}
function f(e){
var p="",a=e.indexOf("?");
return p=e.slice(0,a)+(a>0?".html":"")+e.slice(a);
}
function u(e){
e=e||{};
var p;
if(e.options)p=e.options;else if(e.appid&&(g.data||e.cps_weapp_username)){
var a;
e.cps_weapp_username?(a={},a.weapp_username=e.cps_weapp_username,a.app_version=e.cps_weapp_version):a=g.data.infoMap[e.appid],
a&&(p={
userName:a.weapp_username,
scene:e.scene,
sceneNote:e.sceneNote,
relativeURL:s(e.path)
},void 0!==a.app_version&&(p.appVersion=a.app_version),e.cps_weapp_username&&(p.relativeURL=f(e.path)));
}
p&&(e.privateExtraData&&(p.privateExtraData=e.privateExtraData),e.sourceAppId&&(p.sourceAppId=e.sourceAppId),
p.scene=e.scene||1058,console.log("weapp257",p),g.canJumpOnTap?I.invoke("openWeApp",p,function(p){
"system:function_not_exist"===p.err_msg?g.isNonWechat?("function"!=typeof e.beforeNonWechatWarn||e.beforeNonWechatWarn()!==!1)&&_():("function"!=typeof e.beforeJumpBackupPage||e.beforeJumpBackupPage()!==!1)&&d(e.appid):"function"==typeof e.onJsapiCallback&&e.onJsapiCallback(p);
}):g.isNonWechat?("function"!=typeof e.beforeNonWechatWarn||e.beforeNonWechatWarn()!==!1)&&_():("function"!=typeof e.beforeJumpBackupPage||e.beforeJumpBackupPage()!==!1)&&d(e.appid));
}
function d(e){
location.href="https://mp.weixin.qq.com/mp/waerrpage?type=upgrade&appid="+encodeURIComponent(e)+"#wechat_redirect";
}
function _(){
setTimeout(function(){
n("Open Mini Program in WeChat");
},0);
}
var m=e("biz_wap/utils/ajax.js"),I=e("biz_wap/jsapi/core.js"),g={
canJumpOnTap:!1,
isNonWechat:!1,
data:null,
appidInfoResp:null,
appidInfoCatchErr:null,
appInfoSucQueue:[],
appInfoErrQueue:[],
appidSnInfo:[],
appidSnDict:{},
getInfoState:0
};
return o(),{
canJumpOnTap:g.canJumpOnTap,
isNonWechat:g.isNonWechat,
getAppidInfo:i,
getAppidCode:c,
appidSnInfo:g.appidSnInfo,
getRelativeURL:s,
jumpUrl:u
};
});define("biz_common/utils/string/html.js",[],function(){
"use strict";
return String.prototype.html=function(t){
var e,n=["&#96;","`","&#39;","'","&quot;",'"',"&nbsp;"," ","&gt;",">","&lt;","<","&yen;","¥","&amp;","&"],r=["&","&amp;","¥","&yen;","<","&lt;",">","&gt;"," ","&nbsp;",'"',"&quot;","'","&#39;","`","&#96;"];
e=t?r:n;
for(var o=0,i=this;o<e.length;o+=2)i=i.replace(new RegExp(e[o],"g"),e[o+1]);
return i;
},String.prototype.htmlEncode=function(){
return this.html(!0);
},String.prototype.htmlDecode=function(){
return this.html(!1);
},String.prototype.getPureText=function(){
return this.replace(/<\/?[^>]*\/?>/g,"");
},String.prototype.htmlLite=function(t){
var e=["&#96;","`","&#39;","'","&quot;",'"',"&gt;",">","&lt;","<","&amp;","&"];
t&&e.reverse();
for(var n=0,r=this;n<e.length;n+=2)r=r.replace(new RegExp(e[n],"g"),e[n+1]);
return r;
},String.prototype.htmlEncodeLite=function(){
return this.htmlLite(!0);
},String.prototype.htmlDecodeLite=function(){
return this.htmlLite(!1);
},{
htmlDecode:function(t){
return t.htmlDecode();
},
htmlEncode:function(t){
return t.htmlEncode();
},
getPureText:function(t){
return t.getPureText();
},
htmlEncodeLite:function(t){
return t.htmlEncodeLite();
},
htmlDecodeLite:function(t){
return t.htmlDecodeLite();
}
};
});define("cps/tpl/list_tpl.html.js",[],function(){
return'<# if(cps_isready == true){ #> <!--cps 数据ready-->\n    <# if(cps_state == \'no_cps\'){ #>\n        <!--违规-->\n        <section class="cps_inner cps_inner_list cps_inner_empty js_product_err_container">\n            <p>此内容因违规，暂无法查看</p>\n        </section>\n    <# } else { #>\n        <!--正常-->\n        <section class="cps_inner cps_inner_list js_list_container js_product_container<# if(pid_type == \'book\' || pid_type != \'movie\'){ #> cps_inner_book<# } #>">\n            <div class="cps_inner_wrp js_product_loop_content">\n                <div class="cps_inner_content">\n                    <figure class="cps_inner_image_container">\n                        <span class="js_cover cps_inner_image" style="background: url(<#=img_url#>) no-repeat center bottom; background-size: cover;"></span>\n                    </figure>\n                    <# if(is_ad == 1){ #>\n                    <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                    <# } #>\n                    <div class="cps_inner_info">\n                        <div class="cps_inner_info_hd">\n                            <h2 class="cps_inner_info_title <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>line2<# } #>"><#=title#></h2>\n                            <# if(typeof price === \'undefined\' || pid_type === \'book\' || pid_type === \'movie\'){ #>\n                            <p class="cps_inner_info_desc"><#=desc#></p>\n                            <# } #>\n                            <div class="cps_inner_info_from">\n                                <span style="background: url(<#=source_logo_url#>) no-repeat center;\n                                background-size: contain;" class="cps_inner_ic_from"></span><#=source_name#>\n                            </div>\n                        </div>\n        \n                        <div class="cps_inner_info_ft">\n                            <span class="cps_inner_btn_cps_info <# if(is_ad == 1){ #>buy<# } #>"><!--<i class="cps_inner_ic_miniapp"></i><# if(is_ad == 1){ #>购买<# } else { #>详情<# } #>--></span>\n                            <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>\n                            <p class="cps_inner_info_desc price"><span class="price_sign">¥</span><#=price#></p>\n                            <# } #>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n    <# } #>\n<# }else{ #>\n    <section class="cps_inner cps_inner_list cps_inner_placeholder">\n        <div class="cps_inner_wrp" data-templateid="" data-pid="{{pid1}}" data-order="" data-packid="" data-wxaappid="{{wxa_appid1}}" data-wxapath="{{url_path1}}">\n            <!-- 数据加载成功模板 -->\n            <div class="cps_inner_content">\n                <figure class="cps_inner_image_container">\n                    <span width="100%" class="cps_inner_image"></span>\n                </figure>\n                <div class="cps_inner_info">\n                    <div class="cps_inner_info_hd">\n                        <h2 class="cps_inner_info_title"></h2>\n                    </div>\n                    <div class="cps_inner_info_ft"></div>\n                </div>\n            </div>\n        </div>\n    </section>\n<# } #>\n    \n\n\n';
});define("cps/tpl/card_tpl.html.js",[],function(){
return'<!--卡片类型-->\n<# if(cps_isready == true){ #> <!--cps 数据ready-->\n    <# if(cps_state == \'no_cps\'){ #>\n        <!--违规-->\n        <section class="cps_inner cps_inner_card cps_inner_empty js_product_err_container js_banner_container">\n            <p>此内容因违规，暂无法查看</p>\n        </section>\n    \n    <# } else {#>\n        <!--正常-->\n        <section class="cps_inner cps_inner_card js_product_container js_banner_container">\n            <div class="cps_inner_wrp js_product_loop_content">\n                <div class="cps_inner_content">\n                    <figure class="cps_inner_image_container">\n                        <span width="100%" class="js_cover cps_inner_image" style="background: url(<#=img_url#>) no-repeat center; background-size:cover;"></span>\n                        <# if(is_ad == 1){ #>\n                        <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                        <# } #>\n                        <div class="cps_inner_info_from">\n                            <span class="cps_inner_ic_from" style="background: url(<#=source_logo_url#>) no-repeat center;\n                            background-size: contain;"></span><#=source_name#>\n                        </div>\n                    </figure>\n                    <div class="cps_inner_info">\n                        <div class="cps_inner_info_hd">\n                            <h2 class="cps_inner_info_title <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>line2<# } #>"><#=title#></h2> <!--通用模版带金额，title 可以显示2行-->\n                        </div>\n                        <div class="cps_inner_info_ft">\n                            <span class="cps_inner_btn_cps_info <# if(is_ad == 1){ #>buy<# } #>"><!--<i class="cps_inner_ic_miniapp"></i><# if(is_ad == 1){ #>购买<# } else { #>详情<# } #>--></span>\n                            <# if(typeof price !== \'undefined\' && pid_type !== \'book\' && pid_type !== \'movie\'){ #>\n                            <p class="cps_inner_info_desc"><span class="price_sign">¥</span><#=price#></p>\n                            <# } #>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n    \n    <# } #>\n<# }else{ #>\n    <section class="cps_inner cps_inner_card cps_inner_placeholder">\n        <div class="cps_inner_wrp">\n            <!-- 数据加载成功模板 -->\n            <div class="cps_inner_content">\n                <figure class="cps_inner_image_container">\n                    <span class="cps_inner_image"></span>\n                </figure>\n                <div class="cps_inner_info">\n                    <div class="cps_inner_info_hd">\n                        <h2 class="cps_inner_info_title"></h2>\n                    </div>\n                    <div class="cps_inner_info_ft"></div>\n                </div>\n            </div>\n        </div>\n    </section>\n<# } #>\n';
});define("cps/tpl/banner_tpl.html.js",[],function(){
return'<# if(cps_isready == true){ #> <!--cps 数据ready-->\n    <# if(cps_state == \'no_cps\'){ #>\n        <!--违规-->\n        <section class="cps_inner cps_inner_banner cps_inner_empty js_product_err_container js_banner_container">\n            <p>此内容因违规，暂无法查看</p>\n        </section>\n    \n    <# } else {#>\n        <!--正常-->\n        <section class="cps_inner cps_inner_banner js_product_container js_banner_container">\n            <div class="cps_inner_wrp js_product_loop_content">\n                <div class="cps_inner_content">\n                    <figure class="cps_inner_image_container">\n                        <span width="100%" class="js_cover cps_inner_image" style="background: url(<#=img_url#>) no-repeat center; background-size: cover;"></span>\n                    </figure>\n                    <# if(is_ad == 1){ #>\n                    <span class="cps_inner_info_adTag js_cps_adTag">广告</span>\n                    <# } #>\n                    <div class="cps_inner_info">\n                        <div class="cps_inner_info_hd">\n                            <h2 class="cps_inner_info_title"><#=title#></h2>\n                            <p class="cps_inner_info_desc"><#=desc#></p>\n                        </div>\n                        <div class="cps_inner_info_ft">\n                            <div class="cps_inner_info_from">\n                                <span class="cps_inner_ic_from" style="background: url(<#=source_logo_url#>) no-repeat center;\n                                background-size: contain;"></span><#=source_name#>\n                            </div>\n                            <span class="cps_inner_btn_cps_info <# if(is_ad == 1){ #>buy<# } #>"><!--<i class="cps_inner_ic_miniapp"></i><# if(is_ad == 1){ #>购买<# } else { #>详情<# } #>--></span>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </section>\n    \n    <# } #>\n<# }else{ #>\n    <section class="cps_inner cps_inner_banner cps_inner_placeholder">\n        <div class="cps_inner_wrp">\n            <!-- 数据加载成功模板 -->\n            <div class="cps_inner_content">\n                <figure class="cps_inner_image_container">\n                    <span width="100%" class="cps_inner_image"></span>\n                </figure>\n                <div class="cps_inner_info">\n                    <div class="cps_inner_info_hd">\n                        <h2 class="cps_inner_info_title"></h2>\n                        <p class="cps_inner_info_desc"></p>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </section>\n<# } #>\n';
});define("biz_common/tmpl.js",[],function(){
"use strict";
var e=function(e,r,t){
var n="";
n=e.replace(/[\r\t\n]/g," ").split("<#").join("	").replace(/((^|#>)[^\t]*)'/g,"$1\r"),
n=t?n.replace(/\t==(.*?)#>/g,"',$1,'").replace(/\t=(.*?)#>/g,"', String($1).replace(/&/g,'&amp;').replace(/\"/g, '&quot;').replace(/'/g, '&#39;').replace(/</g, '&lt;').replace(/>/g, '&gt;') ,'"):n.replace(/\t=(.*?)#>/g,"',$1,'"),
n=n.split("	").join("');").split("#>").join("p.push('").split("\r").join("\\'");
var p=new Function("obj","var p=[],print=function(){p.push.apply(p,arguments);};with(obj){p.push('"+n+"');}return p.join('');");
return p(r);
},r=function(r,t,n){
var p=document.getElementById(r);
return p?e(p.innerHTML,t,n):"";
};
return{
render:r,
tmpl:e
};
});define("appmsg/index.js",["biz_common/tmpl.js","cps/tpl/banner_tpl.html.js","cps/tpl/card_tpl.html.js","cps/tpl/list_tpl.html.js","biz_common/utils/string/html.js","appmsg/weapp_common.js","biz_wap/utils/device.js","biz_common/dom/class.js","appmsg/log.js","biz_wap/utils/ajax.js","biz_common/dom/attr.js","appmsg/max_age.js","biz_wap/utils/mmversion.js","appmsg/test.js","biz_common/dom/event.js","biz_wap/jsapi/core.js","biz_common/moment.js","appmsg/appmsg_report.js","biz_common/utils/url/parse.js","a/mpAdAsync.js","biz_wap/utils/wapsdk.js","common/utils.js","page/appmsg_new/combo.css","page/appmsg_new/not_in_mm.css","appmsg/finance_communicate.js","appmsg/cdn_img_lib.js","appmsg/share.js","biz_common/log/jserr.js","biz_wap/ui/lazyload_img.js","appmsg/async.js","appmsg/copyright_report.js","appmsg/outer_link.js","appmsg/review_image.js","appmsg/product.js","question_answer/utils.js","appmsg/iframe.js","appmsg/qqmusic.js","appmsg/voice.js","appmsg/autoread.js","appmsg/voicemsg.js","appmsg/weproduct.js","appmsg/weapp.js","question_answer/appmsg.js","appmsg/wxtopic.js","appmsg/cdn_speed_report.js","appmsg/page_pos.js","appmsg/report_and_source.js","appmsg/report.js","appmsg/fereport_without_localstorage.js","appmsg/fereport.js","biz_wap/safe/mutation_observer_report.js","sougou/index.js"],function(e,t,o,i){
"use strict";
function n(e){
for(var t=window.location.search,o=t.substring(1,t.length).split("&"),i=0;i<o.length;i++){
var n=o[i].split("=");
if(n[0].toUpperCase()===e.toUpperCase())return n[1];
}
return"";
}
function a(){
function t(e){
if(e&&0!=e.length){
for(var t={
batch_no:x.getQuery("batch_no")||"",
bizuin:window.biz||"",
biz:window.biz||"",
mid:window.mid||"",
idx:window.idx||"",
total:e.length
},o=0;o<e.length;o++){
var i=e[o],n=o+1;
for(var a in i)i.hasOwnProperty(a)&&(t[a+""+n]=i[a]);
}
_({
url:"/mp/productreport?",
type:"POST",
data:t,
dataType:"json",
async:!0
});
}
}
function o(){
U&&clearTimeout(U),U=setTimeout(function(){
try{
U=null;
for(var e=0;e<M.length;e++){
var o=M[e],i=g.attr(o,"data-showed");
if("no"==i){
var n=o.getElementsByClassName("js_product_loop_content");
if(n.length>0){
n=n[0];
var a=n.getBoundingClientRect(),r=a.height||a.bottom-a.top;
if(r>0&&a.top<k.getInnerHeight()&&a.bottom>0){
o.setAttribute("data-showed","yes");
var s=n.getAttribute("data-pid");
s&&t([{
wxa_appid:n.getAttribute("data-wxaappid"),
pid:s,
type:3,
absolute_order:e+1,
appid:n.getAttribute("data-appid")||"",
templateid:n.getAttribute("data-templateid")||"",
relative_order:1*n.getAttribute("data-order"),
packid:n.getAttribute("data-packid")||""
}]);
}
}
}
}
}catch(d){}
},100);
}
function a(e){
try{
for(var i=window.pageYOffset||document.documentElement.scrollTop,a=0;a<M.length;a+=C){
var m=M[a];
if(!(m.offsetTop>i+k.getInnerHeight()+100)){
var l=g.attr(m,"data-cpsstatus");
if("hide"==l){
m.setAttribute("data-cpsstatus","loading");
for(var w=""+a,u=1,f=a+1;f<M.length&&a+C>f;f++)w=w+"%2c"+f,u++;
var h=Math.ceil(1e7*Math.random());
if(""!==n("mockcps"))var v="/mp/cps_product_info?biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&cpslist="+w+"&sn="+window.sn+"&mockcps="+n("mockcps");else var v="/mp/cps_product_info?biz="+window.biz+"&mid="+window.mid+"&idx="+window.idx+"&cpslist="+w+"&sn="+window.sn+"&istempurl="+(window.is_temp_url||0)+"&random="+h;
!function(e,i,n){
_({
url:i,
type:"GET",
dataType:"json",
async:!0,
error:function(){
try{
window.__addIdKeyReport("64469","18",n);
}catch(e){}
},
success:function(e){
try{
window.__addIdKeyReport("64469","16",e.product_list.length),e.product_list.length<n&&window.__addIdKeyReport("64469","18",n-e.product_list.length);
for(var i=0;i<e.product_list.length;i++){
e.product_list[i].data.cps_isready=!0,e.product_list[i].data.pid_type=e.product_list[i].data.pid_type||e.product_list[i].attr.pid_type;
var a=M[e.product_list[i].index],m=e.product_list[i].template_id;
"list"==m?a.innerHTML=r.tmpl(p,e.product_list[i].data):"banner"==m?a.innerHTML=r.tmpl(s,e.product_list[i].data):"card"==m&&(a.innerHTML=r.tmpl(d,e.product_list[i].data)),
e.product_list[i].weapp_username&&(e.product_list[i].attr.weapp_username=e.product_list[i].weapp_username),
e.product_list[i].weapp_version&&(e.product_list[i].attr.weapp_version=e.product_list[i].weapp_version),
a.setAttribute("data-cpsstatus","complete");
for(var l=a.getElementsByClassName("js_product_loop_content"),w=0;w<l.length;w++)for(var _ in e.product_list[i].attr)l[w].setAttribute("data-"+_,e.product_list[i].attr[_]);
for(var u=a.getElementsByTagName("img"),w=0;w<u.length;w++)u[w].src=g.attr(u[w],"data-src");
!function(e,o){
y.on(e,"tap",".js_product_loop_content",function(e){
try{
var i=e.delegatedTarget,n=i.getAttribute("data-wxaappid"),a=i.getAttribute("data-wxapath"),r=i.getAttribute("data-pid"),s=i.getAttribute("data-appid"),d=i.getAttribute("data-cpspackage"),p=Math.floor((new Date).getTime()/1e3)+5184e3,m=i.getAttribute("data-weapp_username"),l=i.getAttribute("data-weapp_version");
c.jumpUrl({
cps_weapp_username:m,
cps_weapp_version:l,
privateExtraData:{
cookies:"cps_package="+encodeURIComponent(d)+"; expires="+p+"; busid=mmbiz_ad_cps; domain=*; spread=*"
},
sourceAppId:s,
appid:n,
path:a,
scene:1091,
sceneNote:encodeURIComponent(location.href)+":"+encodeURIComponent(r),
beforeNonWechatWarn:function(){},
beforeJumpBackupPage:function(){},
onJsapiCallback:function(e){
"openWeApp:ok"===e.err_msg&&r&&t([{
wxa_appid:n,
pid:r,
type:4,
absolute_order:o+1,
appid:i.getAttribute("data-appid")||"",
templateid:i.getAttribute("data-templateid")||"",
relative_order:1*i.getAttribute("data-order"),
packid:i.getAttribute("data-packid")||""
}]);
}
});
}catch(e){}
return!1;
});
}(a,e.product_list[i].index);
}
o();
}catch(f){
window.__addIdKeyReport("64469","18",e.product_list.length);
}
}
});
}(w,v,u);
}
}
}
}catch(e){
console.log(e);
}
}
function q(e){
try{
H&&clearTimeout(H),H=setTimeout(function(){
a(e);
},300);
}catch(e){}
}
function R(){
var e=document.documentElement.scrollTop||window.pageYOffset||document.body.scrollTop;
e>=40&&!K?(document.title=window.title,K=!0,window.show_top_bar&&window.user_name&&(A.invoke("currentMpInfoShow",function(){}),
_({
url:"/mp/appmsgreport?action=topbarevent",
data:{
__biz:biz,
mid:mid,
idx:idx,
scene:source,
subscene:subscene,
sessionid:sessionid,
enterid:enterid,
screen:Math.ceil((window.pageYOffset||document.documentElement.scrollTop)/k.getInnerHeight()),
event:"show"
},
type:"POST",
dataType:"json",
async:!0
}))):40>e&&K&&(document.title="",K=!1,window.show_top_bar&&window.user_name&&(A.invoke("currentMpInfoHide",function(){}),
_({
url:"/mp/appmsgreport?action=topbarevent",
data:{
__biz:biz,
mid:mid,
idx:idx,
scene:source,
subscene:subscene,
sessionid:sessionid,
enterid:enterid,
screen:Math.ceil((window.pageYOffset||document.documentElement.scrollTop)/k.getInnerHeight()),
event:"hide"
},
type:"POST",
dataType:"json",
async:!0
})));
}
function S(e,t){
var o={
lossy:"UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA",
lossless:"UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==",
alpha:"UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==",
animation:"UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA"
},i=new Image;
i.onload=function(){
var o=i.width>0&&i.height>0;
t(e,o);
},i.onerror=function(){
t(e,!1);
},i.src="data:image/webp;base64,"+o[e];
}
function N(){
var e=window.performance||window.msPerformance||window.webkitPerformance;
if(e.timing){
var t=e.timing;
w("[Appmsg] dns:"+(t.domainLookupEnd-t.domainLookupStart)+"^^^ ssl:"+(0==t.secureConnectionStart?0:t.connectEnd-t.secureConnectionStart)+"^^^ tcp:"+(t.connectEnd-t.connectStart)+"^^^ request:"+(t.responseStart-t.requestStart)+"^^^ getPackageTime:"+(t.responseEnd-t.responseStart)+"^^^ domCententLoaded:"+(t.domContentLoadedEventStart-t.domLoading)+"^^^ domComplete:"+(t.domComplete-t.domLoading)+"^^^ firstViewTime:"+(real_show_page_time-t.navigationStart)+"^^^ interactiveTime:"+(page_endtime-t.navigationStart))+"^^^ ua:"+window.navigator.userAgent,
setTimeout(function(){
t.loadEventEnd&&w("[Appmsg] onload:"+(t.loadEventEnd-t.loadEventStart));
},100);
}
"function"!=typeof String.prototype.trim&&(String.prototype.trim=function(){
return this.replace(/^\s+|\s+$/g,"");
}),""==document.getElementById("js_content").innerHTML.trim()&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_94_1");
var o=Math.random();
.001>o&&document.getElementById("js_read_area3")&&document.getElementById("js_read_area3").innerText&&document.getElementById("js_read_area3").innerText.indexOf("Pageview")>-1&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=24729_95_1"),
window.__wxjs_is_wkwebview&&window.__addIdKeyReport("28307",67);
}
try{
var M=document.getElementsByTagName("mpcps");
window.__addIdKeyReport("64469","15",M.length);
for(var D=0;D<M.length;D++){
M[D].setAttribute("data-cpsstatus","hide"),M[D].setAttribute("data-showed","no");
var L={
cps_isready:!1,
cps_state:"",
pid_type:"",
img_url:"",
title:"",
desc:"",
source_name:"",
source_logo_url:"",
is_ad:1
},W=g.attr(M[D],"data-templateid");
"list"==W?M[D].innerHTML=r.tmpl(p,L):"banner"==W?M[D].innerHTML=r.tmpl(s,L):"card"==W&&(M[D].innerHTML=r.tmpl(d,L));
}
}catch(P){
console.log(P);
}
var H,U=null;
o(),y.on(window,"scroll",o),a(),y.on(window,"scroll",q),A.on("topbar:click",function(){
_({
url:"/mp/appmsgreport?action=topbarevent",
data:{
__biz:biz,
mid:mid,
idx:idx,
scene:source,
subscene:subscene,
sessionid:sessionid,
enterid:enterid,
screen:Math.ceil((window.pageYOffset||document.documentElement.scrollTop)/k.getInnerHeight()),
event:"click"
},
type:"POST",
dataType:"json",
async:!0
});
}),window.is_new_msg&&-1!=navigator.userAgent.indexOf("MicroMessenger")&&(window.title&&(window.title=window.title.replace(/&#39;/g,"'").replace(/&nbsp;/g," ").replace(/&lt;/g,"<").replace(/&gt;/g,">").replace(/&quot;/g,'"').replace(/&amp;/g,"&")),
hd_head_img||E.jsmonitor({
id:115849,
key:26,
value:1
}),A.invoke("currentMpInfo",{
userName:window.user_name,
brandName:window.title,
brandIcon:hd_head_img.replace(/\/0$/,"/132")
},function(){}),y.on(window,"load",function(){
document.title="",K=!1,R();
}),window.onscroll=R,window.addEventListener("pageshow",R));
var V=document.getElementsByTagName("body");
if(!V||!V[0])return!1;
V=V[0],h.isInMiniProgram&&(document.getElementById("js_name")&&l.addClass(document.getElementById("js_name"),"tips_global_primary"),
document.getElementsByClassName("account_nickname_inner").length&&l.addClass(document.getElementsByClassName("account_nickname_inner")[0],"tips_global_primary"),
document.getElementById("js_share_author")&&l.addClass(document.getElementById("js_share_author"),"tips_global_primary")),
function(){
var e=document.getElementById("js_hotspot_area"),t=0===window.hotspotInfoList.length,o=function i(o){
if(!t){
var n=k.getInnerHeight()+(window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop);
e.offsetTop<n?(t=!0,y.off(window,"scroll",i),(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=59977_15_1",
j.hotspotReport({
hotspotjson:JSON.stringify({
hotspotinfolist:window.hotspotInfoList
})
})):"function"==typeof o&&o();
}
};
o(function(){
y.on(window,"scroll",o);
});
}();
var Q=/^http(s)?:\/\/mp\.weixin\.qq\.com\//g;
try{
if(top!=window&&(!top||top&&location.href&&Q.test(location.href))&&!window.isSg)throw new Error("in iframe");
}catch(P){
var F="",G=new Image;
G.src=("http://mp.weixin.qq.com/mp/jsreport?key=4&content=biz:"+biz+",mid:"+mid+",uin:"+uin+"[key4]"+F+"&r="+Math.random()).substr(0,1024);
}
if(window.isInWeixinApp()&&/#rd$/.test(location.href)&&!window.isWeixinCached&&!window.__second_open__){
var J=-1!=location.href.indexOf("?")?"&":"?";
location.replace(location.href.replace(/#rd$/,J+"rd2werd=1#wechat_redirect"));
}
var Y=e("biz_common/utils/url/parse.js");
e("appmsg/cdn_img_lib.js"),window.page_endtime=+new Date;
{
var $=!h.isWp&&-1==navigator.userAgent.indexOf("MicroMessenger");
-1!=navigator.userAgent.indexOf("WindowsWechat");
}
e("appmsg/share.js");
var X=b(1e3*parseInt(window.modify_time)),Z=X.format("YYYY-MM-DD"),et=document.getElementById("js_modify_time");
if(et&&(et.innerHTML=Z),window.isSg||"mp.weixin.qq.com"==location.host){
var tt=e("biz_common/log/jserr.js");
tt({
key:0,
reporturl:"http://mp.weixin.qq.com/mp/jsreport?1=1",
replaceStr:/http(s)?:(.*?)js\//g
});
}
window.logs.webplog={
lossy:0,
lossless:0,
alpha:0,
animation:0,
total:0
};
var ot=-1!=navigator.userAgent.indexOf("TBS/"),it=function(e,t){
S(e,function(e,o){
if(window.logs.webplog[e]=o?1:0,window.logs.webplog.total++,4==window.logs.webplog.total){
var i=window.logs.webplog,n=Math.random();
ot&&1>=n&&(i.lossy=i.lossless=i.alpha=1,window.logs.webplog=i);
var a=i.lossy&i.lossless&i.alpha;
t(!!a);
}
});
},nt=function(e){
for(var t=document.getElementsByTagName("img"),o=!1,i=!1,n=0,a=t.length;a>n;n++){
var r=t[n].getAttribute("data-src");
r&&r.canHevc()&&(o=!0),r&&r.isGif()&&(i=!0);
}
var s=h.gtVersion("6.5.13",!0)&&i,d=h.gtVersion("6.8.0",!0)&&o,p=!1;
try{
{
top.window.document;
}
}catch(c){
p=!0;
}
(B||navigator.userAgent.indexOf("Br_trunk")>-1)&&h.isIOS&&(s||d)&&!p?(console.info("[HEVC代理] 当前版本可以启用HEVC代理"),
A.invoke("imageProxyInit",{},function(t){
t.err_msg.indexOf(":ok")>-1?(O=t.serverUrl,window.__addIdKeyReport("28307",117)):t.err_msg.indexOf(":fail")>-1&&window.__addIdKeyReport("28307",118),
e();
})):e();
},at=function(e){
it("lossy",e),it("lossless",e),it("alpha",e),it("animation",e);
};
window.webp=!1,nt(function(){
at(function(t){
function o(e){
e.width<40||e.height<40||-1==e.className.indexOf("img_loading")&&(e.className+=" img_loading");
}
function i(e){
if(!(e.width<40||e.height<40)){
var t=e.src;
if(e.className=e.className.replace("img_loading",""),-1==e.className.indexOf("img_loadederror")){
e.className+=" img_loadederror",e.src="data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==",
window.__addIdKeyReport("28307",51);
var i=function(){
window.__addIdKeyReport("28307",66),n(e),o(e);
var i=e.__retryload;
return i=0,t=t.https2http(),e.__retryload=i,e.src=Y.addParam(t,"retryload",i,!0),
!1;
};
y.on(e,"click",i);
}
}
}
function n(e){
e.className=e.className.replace("img_loading",""),e.className=e.className.replace("img_loadederror","");
}
window.webp=t,t&&window.localStorage&&window.localStorage.setItem&&window.localStorage.setItem("webp","1"),
window.logs.img={
download:{},
read:{},
load:{}
};
var a=document.getElementById("js_cover");
if(a){
var r=a.getAttribute("data-src");
r&&(r.isCDN()&&(r=r.imgChange640(),t&&(r=Y.addParam(r,"tp","webp",!0)),r=Y.addParam(r,"wxfrom","5",!0),
is_https_res||T?r=r.http2https():("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(r=r.https2http())),
setTimeout(function(){
a.onload=function(){
u(a,"height","auto","important"),u(a,"visibility","visible","important");
},a.setAttribute("src",r);
},0),window.logs.img.read[r]=!0,window.logs.img.load[r]=!0,a.removeAttribute("data-src"));
}
var s=e("biz_wap/ui/lazyload_img.js"),d=1;
window.logs.outer_pic=0;
for(var p=document.getElementsByTagName("img"),c=0,m=p.length;m>c;c++){
{
var _=p[c].getAttribute("data-src");
p[c].getAttribute("src");
}
_&&_.isGif()&&p[c].className.indexOf("__bg_gif")<0&&(p[c].className+=" __bg_gif");
}
for(var g=document.getElementsByClassName("__bg_gif"),c=0,m=g.length;m>c;++c)g[c].setAttribute("data-order",c);
var f=function(e){
try{
var t=e,o=t.getAttribute("data-src");
if(!/^https?\:\/\/mmbiz\.qpic\.cn/.test(o))return;
var i=t.parentNode,n=!1;
l.hasClass(i,"js_jump_icon")&&(n=!0);
for(var a=!1;i.tagName&&"body"!=i.tagName.toLowerCase();){
if("a"==i.tagName.toLowerCase()){
var r=i.getAttribute("href")||"";
null!=r.match(/^http/)&&(a=!0);
break;
}
i=i.parentNode;
}
if(n&&!a){
var s=t.parentNode,d=s.parentNode;
if(d){
for(var p=document.createDocumentFragment();s.firstChild;)p.appendChild(s.firstChild);
d.insertBefore(p,s),d.removeChild(s);
}
}else if(!n&&a){
var c=document.createElement("span"),m=getComputedStyle(t);
"static"!=m.positon&&(c.style.position=m.positon),c.style.left=m.left,c.style.top=m.top,
c.style.right=m.right,c.style.bottom=m.bottom,c.style.margin=m.margin,l.addClass(c,"js_jump_icon"),
l.addClass(c,"h5_image_link"),t.style.position="static",t.style.margin="0px",t.parentNode.insertBefore(c,t),
c.appendChild(t),window.__addIdKeyReport("111535",0);
}
}catch(w){}
},v=function z(e){
try{
var t=e.childNodes,o=getComputedStyle(e);
(o.backgroundImage.match(/https\:\/\/mmbiz\.qpic\.cn/)||o.backgroundImage.match(/http\:\/\/mmbiz\.qpic\.cn/))&&window.__addIdKeyReport("111535",2);
for(var i=0;i<t.length;i++)"a"!=t[i].tagName.toLowerCase()&&z(t[i]);
}catch(n){}
};
try{
for(var A=document.getElementsByTagName("a"),b=0;b<A.length;b++){
var j=A.item(b),x=j.getAttribute("href")||"";
null!=x.match(/^http/)&&v(j);
}
}catch(I){}
var k=!1;
new s({
attrKey:"data-src",
imgOccupied:!0,
crossOrigin:!0,
lazyloadHeightWhenWifi:function(){
var e,t=1,o=1;
e=window.svr_time?new Date(1e3*window.svr_time):new Date;
var i=e.getHours();
return i>=20&&23>i&&(t=.5,o=0),{
bottom:t,
top:o
};
},
inImgRead:function(e){
e&&(window.logs.img.read[e]=!0);
},
changeSrc:function(e,t){
if(!t)return"";
var o=t;
if(t.isCDN()){
o=o.imgChange640();
var i,n=window.navigator.userAgent,a=/TBS\/([\d\.]+)/i,r=n.match(a);
r&&r[1]&&(i=parseInt(r[1]));
var s,d=/XWEB\/([\d\.]+)/i,p=n.match(d);
p&&p[1]&&(s=parseInt(p[1]));
var c=1e3,m=window.user_uin||0,l=0!==m&&Math.floor(m/100)%1e3<c,_=(i>=43305||s>=16)&&o.isGif(),g=0!==m&&Math.floor(m/100)%1e3<=100,u=s>=564&&o.canHevc()&&h.gtVersion("6.8.0",!0)&&g;
l&&44206!=i&&(_||u)?(o=Y.addParam(o,"tp","wxpic",!0),window.__addIdKeyReport("28307",91)):window.webp&&(o=Y.addParam(o,"tp","webp",!0),
window.__addIdKeyReport("28307",84)),o=Y.addParam(o,"wxfrom","5",!0),is_https_res||T?(o=o.http2https(),
window.__addIdKeyReport("28307",77)):("http:"==location.protocol||-1!=navigator.userAgent.indexOf("MicroMessenger"))&&(o=o.https2http(),
window.__addIdKeyReport("28307",70));
}else try{
var a=new RegExp("^http(s)?://((mmbiz.qpic.cn/.*)|(m.qpic.cn/.*)|(mmsns.qpic.cn/.*)|(shp.qpic.cn/.*)|(wx.qlogo.cn/.*)|(mmbiz.qlogo.cn/.*)|((a|b)[0-9]*.photo.store.qq.com/.*)|(mp.weixin.qq.com/.*)|(res.wx.qq.com/.*))");
a.test(t)||(window.__addIdKeyReport("28307",9),window.logs.outer_pic++);
}catch(f){}
var v=/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g;
o=o.replace(v,"http://m.qpic.cn"),/^http(s)?:\/\/m\.qpic\.cn([\/?].*)*$/i.test(o)&&!window.webp&&(o=Y.addParam(o,"t","",!0)),
o=Y.addParam(o,"wx_lazy","1",!0);
var y=h.gtVersion("6.5.13",!0)&&o.isGif(),A=h.gtVersion("6.8.0",!0)&&o.canHevc();
return O&&(y||A)&&(window.__addIdKeyReport("28307",106),o=Y.addParam(o,"tp","wxpic",!0),
o=O+"hevc?url="+encodeURIComponent(o)+"&type="+o.getOriginImgType()),"anonymous"==e.crossOrigin&&(o=Y.addParam(o,"wx_co","1",!0)),
window.logs.img.load[o]=!0,w("[Appmsg] image_load_event_change_src. originsrc:"+t+"  ^^^ newsrc : "+o),
e.start_load_time=+new Date,o;
},
onerror:function(e,t){
var o=t?t.__retryload||0:0;
if(1==o&&i(t),e&&!(o>d)){
if(!e.isCDN()){
if(!O)return;
if(-1==e.indexOf(O))return;
}
var n=0==e.indexOf("https://")?7:0;
if(window.__addIdKeyReport("28307",72+n),window.__addIdKeyReport("28307",75+1*o+n),
e.isWxpic()?(window.__addIdKeyReport("28307",93),window.__addIdKeyReport("28307",96+1*o)):e.isWebp()&&(window.__addIdKeyReport("28307",86),
window.__addIdKeyReport("28307",89+1*o)),O&&e.indexOf(O)>-1&&window.__addIdKeyReport("28307",108),
d>o){
if(o++,t.__retryload=o,1==o&&e.indexOf("http://")>-1?(e=e.http2https(),window.__addIdKeyReport("28307",60),
window.__addIdKeyReport("28307",77)):1==o&&e.indexOf("https://")>-1&&(window.__addIdKeyReport("28307",61),
window.__addIdKeyReport("28307",77)),O&&e.indexOf(O)>-1){
var a=e.split("hevc?url=")[1];
a=a.split("&type")[0],a=decodeURIComponent(a),a=a.replace("tp=wxpic",""),e=a.https2http();
}
t.start_load_time=+new Date,t.src=Y.addParam(e,"retryload",o,!0);
}
window.__has_imgfailed||(window.__has_imgfailed=!0,window.__addIdKeyReport("28307",65)),
w("[Appmsg] image_load_event_on_error. src:"+e),t.setAttribute("data-fail",1);
try{
if("[object Array]"==Object.prototype.toString.call(t.lazyLoadOnerror))for(var r=0,s=t.lazyLoadOnerror.length;s>r;r++)"function"==typeof t.lazyLoadOnerror[r]&&t.lazyLoadOnerror[r].call(t);
}catch(p){}
var c=10;
/tp\=webp/.test(e)&&(c=11);
var m=new Image;
m.src="http://mp.weixin.qq.com/mp/jsreport?key="+c+"&content="+(encodeURIComponent(e)+"["+uin+"]")+"&r="+Math.random();
}
},
onload:function(e,t){
if(!window.__second_open__&&!k){
var o=window.performance||window.msPerformance||window.webkitPerformance;
if(!o||!o.timing)return;
var i=window.location.protocol;
E.saveSpeeds({
uin:uin,
pid:"https:"==i?462:417,
speeds:{
sid:35,
time:Date.now()-window.performance.timing.navigationStart
}
}),E.send(),k=!0;
}
n(t),t.gray&&!t.loadGif&&((t.width||t.naturalWidth)<120||(t.height||t.naturalHeight)<120?t.autoTap&&t.autoTap():t.span&&t.span.children&&t.span.children.item(0)&&(t.span.children.item(0).style.display=""));
var a=t?t.__retryload||0:0;
if(!(a>d)){
w("[Appmsg] image_load_event_onload_image. src:"+e+"  ^^^  retryloadtimes: "+a),
t.setAttribute("data-fail",0),f(t);
try{
if("[object Array]"==Object.prototype.toString.call(t.lazyLoadOnload))for(var r=0,s=t.lazyLoadOnload.length;s>r;r++)"function"==typeof t.lazyLoadOnload[r]&&t.lazyLoadOnload[r].call(t);
}catch(p){}
var c=0==e.indexOf("https://")?7:0;
window.__addIdKeyReport("28307",71+c),window.__addIdKeyReport("28307",73+1*a+c),
e.isWxpic()?(window.__addIdKeyReport("28307",92),window.__addIdKeyReport("28307",94+1*a)):e.isWebp()&&(window.__addIdKeyReport("28307",85),
window.__addIdKeyReport("28307",87+1*a)),O&&e.indexOf(O)>-1&&window.__addIdKeyReport("28307",107),
window.__has_imgsucceed||(window.__has_imgsucceed=!0,window.__addIdKeyReport("28307",64)),
1==a&&e.indexOf("http://")>-1&&window.__addIdKeyReport("28307",50),1==a&&e.indexOf("https://")>-1&&window.__addIdKeyReport("28307",52);
var m=Math.random(),l=+new Date-t.start_load_time;
l&&0==e.indexOf("https://")&&.5>m?(window.__addIdKeyReport("27822",121,l),window.__addIdKeyReport("27822",122)):l&&5e-4>m&&(window.__addIdKeyReport("27822",124,l),
window.__addIdKeyReport("27822",125)),"none"!=getComputedStyle(t).filter&&(t.style.transform="translateZ(0)",
t.style.webkitTransform="translateZ(0)");
}
},
detect:function(e){
if(e&&e.time&&e.loadList){
var t=e.time,o=e.loadList;
window.logs.img.download[t]=o;
}
},
container:document.getElementById("page-content")
});
});
}),e("appmsg/async.js"),!window.isSg;
var rt=e("appmsg/copyright_report.js");
!function(){
var e=document.getElementById("profileBt"),t=document.getElementById("copyright_info"),o=[];
if(h.isInMiniProgram&&t&&l.addClass(t,"disabled"),t&&(t.style.visibility="visible"),
e){
var i="57";
"26"==window.source&&(i="95"),"28"==window.source&&(i="96"),"29"==window.source&&(i="39"),
"15"==window.source&&(i="121"),o.push({
dom:e,
username:user_name_new||user_name,
profileReportInfo:window.profileReportInfo||"",
scene:i
});
}
t&&source_encode_biz&&o.push({
dom:t,
source_encode_biz:source_encode_biz,
scene:"110"
});
var n=document.getElementById("js_share_headimg");
n&&o.push({
dom:n,
username:source_username,
scene:0
});
var a=document.getElementById("js_share_author");
a&&o.push({
dom:a,
username:source_username,
scene:"0"
});
for(var r=0,s=o.length;s>r;r++)!function(e){
y.on(e.dom,"click",function(){
if("copyright_info"==e.dom.id&&source_encode_biz){
if(h.isInMiniProgram)return!1;
rt.card_click_report({
scene:"0"
});
var t="https://mp.weixin.qq.com/mp/profile_ext?action=home&__biz="+e.source_encode_biz+"&scene="+e.scene+"#wechat_redirect";
-1!=navigator.userAgent.indexOf("WindowsWechat")?location.href=t:A.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
});
}else{
if(w("[Appmsg] profile_click_before_loadprofile: username:"+e.username+", scene:"+e.scene),
j.profileReport({
hotspotjson:JSON.stringify({
hotspotinfolist:window.hotspotInfoList
})
}),profileReportInfo){
var o=String(profileReportInfo).split("_");
3==o.length&&_({
url:"/mp/ad_biz_info?action=report&__biz="+window.biz+"&report_type=2&aid="+o[1]+"&tid="+o[2],
type:"GET",
dataType:"json",
async:!0,
success:function(){}
});
}
h.isInMiniProgram||(1==isprofileblock?A.invoke("openUrlWithExtraWebview",{
url:"https://mp.weixin.qq.com/mp/profileblock?__biz="+window.biz+"#wechat_redirect",
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href="https://mp.weixin.qq.com/mp/profileblock?__biz="+window.biz+"#wechat_redirect");
}):A.invoke("profile",{
username:e.username,
profileReportInfo:e.profileReportInfo||"",
scene:e.scene+""
},function(t){
window.__addIdKeyReport("28307","1"),w("[Appmsg] profile_click_after_loadprofile: username:"+e.username+", scene:"+e.scene+", profileReportInfo:"+e.profileReportInfo+", res.err_msg:"+t.err_msg);
}));
}
return!1;
}),h.isWp&&e.dom.setAttribute("href","weixin://profile/"+e.username);
}(o[r]);
}(),function(){
h.isIOS&&location.href.match(/fontScale=\d+/)&&A.on("menu:setfont",function(e){
e.fontScale<=0&&(e.fontScale=100),document.getElementsByTagName("html").item(0).style.webkitTextSizeAdjust=e.fontScale+"%",
l.addClass(document.getElementsByTagName("body").item(0),"appmsg_skin_fontscale_"+e.fontSize);
});
}(),function(){
function e(){
if("hidden"in document)return"hidden";
for(var e=["webkit","moz","ms","o"],t=0;t<e.length;t++)return e[t]+"Hidden"in document,
e[t]+"Hidden";
return null;
}
function t(){
var t=e();
return t?document[t]:!1;
}
function o(){
if(t())for(var e=0;e<window.parent.originalVideoAdFrames.length;e++)window.parent.originalVideoAdFrames[e].contentWindow.postMessage({
action:"pauseAd",
value:""
},"*");else window.originalVideoAdCurrentFrame&&window.originalVideoAdCurrentFrame.contentWindow.postMessage({
action:"playAd"
},"*");
}
document.webkitVisibilityState?document.addEventListener("webkitvisibilitychange",o,!1):document.msVisibilityState?document.addEventListener("msvisibilitychange",o,!1):document.visibilityState&&document.addEventListener("visibilitychange",o,!1);
}();
try{
var st=document.getElementById("js_author_name");
if(st){
var dt="";
y.on(st,"click",function(){
return l.hasClass(st,"rich_media_meta_link")?window.is_temp_url?(i("预览状态下不能操作"),
!1):st.getAttribute("data-rewardsn")?1!=st.getAttribute("data-canreward")?!1:(dt="https://mp.weixin.qq.com/mp/author?action=show&author_id="+author_id+"&rewardsn="+st.getAttribute("data-rewardsn")+"&timestamp="+st.getAttribute("data-timestamp")+"&__biz="+window.biz+"&appmsgid="+window.appmsgid+"&idx="+window.idx+"&scene=142&rscene=129#wechat_redirect",
h.isInMiniProgram?!1:(-1!=navigator.userAgent.indexOf("MicroMessenger")&&(h.isIOS||h.isAndroid||h.isWp)?(window.__addIdKeyReport("110809","1"),
A.invoke("openUrlWithExtraWebview",{
url:dt,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=dt);
})):location.href=dt,!1)):!1:!1;
});
}
}catch(P){}
var pt=e("appmsg/outer_link.js");
if(new pt({
container:document.getElementById("js_content"),
changeHref:function(e,t){
if(!e||0!=e.indexOf("http://mp.weixin.qq.com/")&&0!=e.indexOf("https://mp.weixin.qq.com/")){
if(18==ban_scene)return"/mp/ban?action=check&__biz="+biz+"&mid="+mid+"&idx="+idx+"&scene="+ban_scene+"#wechat_redirect";
if(0!=e.indexOf("http://mp.weixinbridge.com/mp/wapredirect"))return"http://mp.weixinbridge.com/mp/wapredirect?url="+encodeURIComponent(e)+"&action=appmsg_redirect&uin="+uin+"&biz="+biz+"&mid="+mid+"&idx="+idx+"&type="+t+"&scene=0";
}else{
e=e.replace(/#rd\s*$/,""),e=e.replace(/#wechat_redirect\s*$/,""),e=e.replace(/[\?&]scene=21/,"");
var o="&";
-1==e.indexOf("?")&&(o="?"),e+=o+"scene=21#wechat_redirect";
}
return e;
}
}),!$){
var ct=e("appmsg/review_image.js"),mt=document.getElementById("js_cover"),lt=[];
mt&&lt.push(mt),new ct({
container:document.getElementById("js_content"),
is_https_res:is_https_res,
imgs:lt
});
}
e("appmsg/product.js"),function(){
try{
var t=e("question_answer/utils.js"),o=document.getElementById("js_content");
if(!o||!o.querySelectorAll)return;
for(var i=o.querySelectorAll("*"),n="rich_pages,blockquote_info,blockquote_biz,blockquote_other,blockquote_article,js_jump_icon,h5_image_link,js_banner_container,js_list_container,js_cover,js_tx_video_container,js_product_err_container,js_product_loop_content,js_product_container,img_loading,list-paddingleft-1,list-paddingleft-2,list-paddingleft-3,selectTdClass,noBorderTable,ue-table-interlace-color-single,ue-table-interlace-color-double,__bg_gif,weapp_text_link,weapp_image_link,js_img_loading,wx_video_context,db,wx_video_thumb_primary,wx_video_play_btn,wx_video_mask".split(","),a=[new RegExp("^cps_inner"),new RegExp("^bizsvr_"),new RegExp("^code-snippet"),new RegExp("^"+t.classPrefix),new RegExp("^wx-edui-")],r=function(e){
var t=e.getAttribute("class");
if(t){
for(var o=t.split(/\s+/),i=[],r=0,s=o.length;s>r;++r){
var d=o[r];
if(d&&-1!=n.indexOf(d))i.push(d);else for(var p=0,c=a.length;c>p;p++)if(a[p].test(d)){
i.push(d);
break;
}
}
e.setAttribute("class",i.join(" "));
}
},s=0,d=i.length;d>s;++s){
var p=i[s];
p&&p.tagName&&"iframe"!=p.tagName.toLowerCase()?r(p):p&&p.tagName&&"iframe"==p.tagName.toLowerCase()&&"video_ad_iframe"===p.getAttribute("class")&&p.setAttribute("class","");
}
}catch(c){}
}(),function(){
window.originalVideoAdFrames=[],window.originalVideoAdCurrentFrame=null,window.originalVideoAdFramesUnsetList=[],
window.addEventListener("message",function(e){
var t="",o=document.getElementsByTagName("iframe");
if(e.data&&"originalVideoAdNeedData"==e.data.action&&e.data.vid)if(window.originalVideoAdFramesAdData){
window.originalVideoAdFramesAdData&&window.originalVideoAdFramesAdData[e.data.vid]&&(t=window.originalVideoAdFramesAdData[e.data.vid]);
for(var i=0;i<o.length;i++)if(o[i].dataset&&o[i].dataset.mpvid==e.data.vid){
o[i].contentWindow.postMessage({
action:"receiveOriginalVideoData",
vid:e.data.vid,
adData:t
},"*");
break;
}
}else console.log(e.data.vid," has no ad data yet"),window.originalVideoAdFramesUnsetList.push(e.data.vid);
});
}(),window.fromWeixinCached||e("appmsg/iframe.js"),I.getAdData(window.reportVid),
e("appmsg/qqmusic.js"),e("appmsg/voice.js"),window.__appmsgCgiData&&1==window.__appmsgCgiData.show_msg_voice&&e("appmsg/autoread.js"),
"1"==window.show_msg_voice&&(console.log("load voicemsg"),e("appmsg/voicemsg.js")),
!window.__appmsgCgiData||1!=window.__appmsgCgiData.wxa_product&&1!=window.__appmsgCgiData.wxa_cps||e("appmsg/weproduct.js"),
e("appmsg/weapp.js"),e("question_answer/appmsg.js"),e("appmsg/wxtopic.js"),e("appmsg/cdn_speed_report.js");
var wt=e("appmsg/page_pos.js");
wt.init({
hasSpAd:!0
}),setTimeout(function(){
window.article_improve_combo_css;
},0),setTimeout(function(){
y.tap(document.getElementById("copyright_logo"),function(){
var e="http://kf.qq.com/touch/sappfaq/150211YfyMVj150326iquI3e.html";
window.__second_open__?A.invoke("openUrlWithExtraWebview",{
url:e,
openType:1
},function(t){
-1==t.err_msg.indexOf("ok")&&(location.href=e);
}):location.href=e;
}),f(),v(),y.tap(document.getElementById("js_hotspot_area"),function(e){
if(l.hasClass(e.target,"js_hotspot")){
var t=e.target.dataset.id;
if(!t)return;
t="https://search.weixin.qq.com/cgi-bin/searchweb/clientjump?scene=306&tag=mp_topic&topic_id="+t+"#wechat_redirect",
-1!=navigator.userAgent.indexOf("MicroMessenger")&&(h.isIOS||h.isAndroid||h.isWp)?A.invoke("openUrlWithExtraWebview",{
url:t,
openType:1
},function(e){
-1==e.err_msg.indexOf("ok")&&(location.href=t);
}):location.href=t;
}
}),e("appmsg/report_and_source.js"),function(){
if($){
document.title=window.title,l.addClass(V,"not_in_mm");
var e=document.getElementById("js_pc_qr_code_img");
if(e){
var t=10000004,o=document.referrer;
if(0==o.indexOf("http://weixin.sogou.com")?t=10000001:0==o.indexOf("https://wx.qq.com")&&(t=10000003),
window.isSg)e.setAttribute("src",sg_qr_code.htmlDecode());else{
e.setAttribute("src","/mp/qrcode?scene="+t+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var i=new Image;
i.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+t+"&r="+Math.random();
}
document.getElementById("js_pc_qr_code").style.display="block";
}
var n=document.getElementById("js_profile_qrcode"),a=document.getElementById("js_profile_arrow_wrp"),r=document.getElementById("profileBt");
if(n&&r&&a){
var s=function(){
var e=10000005,t=document.referrer;
0==t.indexOf("http://weixin.sogou.com")?e=10000006:0==t.indexOf("https://wx.qq.com")&&(e=10000007);
var o=document.getElementById("js_profile_qrcode_img");
if(o)if(window.isSg)o.setAttribute("src",sg_qr_code.htmlDecode());else{
o.setAttribute("src","/mp/qrcode?scene="+e+"&size=102&__biz="+biz+"&mid="+mid+"&idx="+idx+"&sn="+sn+"&send_time="+send_time);
var i=new Image;
i.src="/mp/report?action=pcclick&__biz="+biz+"&uin="+uin+"&scene="+e+"&r="+Math.random();
}
return n.style.display="block",a.style.left=r.offsetWidth/2-8+"px",!1;
};
y.on(r,"click",s),y.on(n,"click",s),y.on(document,"click",function(e){
var t=e.target||e.srcElement;
t!=r&&t!=n&&(n.style.display="none");
});
}
}else{
var d=document.getElementById("js_report_article3");
!!d&&(d.style.display="");
}
}(),function(){
var e=location.href.indexOf("scrolltodown")>-1?!0:!1,t=document.getElementById("img-content");
if(e&&t&&t.getBoundingClientRect){
var o=t.getBoundingClientRect().height;
window.scrollTo(0,o);
}
}(),e("appmsg/report.js");
for(var t=document.getElementsByTagName("map"),o=0,i=t.length;i>o;++o)t[o].parentNode.removeChild(t[o]);
if(rt.card_pv_report(),Math.random()<.01)try{
var n="https://js.aq.qq.com/js/aq_common.js",a=document.createElement("script");
a.src=n;
var r=document.getElementsByTagName("head")[0];
r.appendChild(a);
}catch(s){}
var d=document.getElementById("js_close_temp");
y.on(d,"click",function(){
d.parentNode.parentNode.removeChild(d.parentNode),l.removeClass(document.getElementById("js_article"),"preview_appmsg");
});
},1e3),function(){
if(m.os.ios&&"onorientationchange"in window){
var e=[],t="onorientationchange"in window?"orientationchange":"resize",o=function(){
return 90===Math.abs(window.orientation)?1:2;
};
e.push({
ori:o(),
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
var i=(new Date).getHours();
y.on(window,t,function(){
var t=e.length-2,n=o();
if(z=+new Date,t>=0){
{
var a=e[t];
a.ori;
}
e[e.length-1].istouchmove||(i>=11&&17>=i&&window.__report(63),setTimeout(function(){
window.scrollTo(0,a.scroll);
},100));
}
e.push({
ori:n,
scroll:window.pageYOffset||document.documentElement.scrollTop,
istouchmove:!1
});
});
var n=document.getElementById("js_hotspot_area"),a=0===n.children.length;
y.on(window,"scroll",function(){
var t=e.length-1,i=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,r=+new Date;
if(-1!=z){
if(console.log("[横屏滚动检测]",r-z),500>r-z)return void(z=-1);
}else z=-1;
if(e[t].ori==o()&&(e[t].scroll=i,e[t].istouchmove=!0,!a)){
var s=k.getInnerHeight()+i;
n.offsetTop<s&&(a=!0,(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=59977_15_1");
}
});
}
}(),w("[Appmsg] href:"+location.href+"^^^ ua:"+window.navigator.userAgent),window.addEventListener?window.addEventListener("load",N,!1):window.attachEvent&&window.attachEvent("onload",N),
e(window.moon&&moon.clearSample?"appmsg/fereport_without_localstorage.js":"appmsg/fereport.js"),
function(){
window.addEventListener&&document.getElementsByTagName("body")[0].addEventListener("copy",function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_18_1",
h.isIOS&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_19_1"),
h.isAndroid&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_20_1");
},!1);
}(),function(){
window.__observer&&window.__observer_data&&e("biz_wap/safe/mutation_observer_report.js");
}(),function(){
var e=document.getElementById("publish_time");
e&&y.on(e,"click",function(){
e.innerText=window.publish_time;
});
}(),"undefined"!=typeof isSg&&e("sougou/index.js"),setTimeout(function(){
for(var e=function(){
(new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_49_1&lc=1&log0=[28307_49_appmsg_fe_filter]"+encodeURIComponent(location.href);
},t=(window.appmsg_fe_filter||"").split(","),o=function(t,o){
try{
if(!t)return;
if(t.querySelectorAll){
var i=t.querySelectorAll("*["+o+"]");
if(i&&i.length>0){
e();
for(var n=0;n<i.length;++n)i[n]&&i[n].removeAttribute&&i[n].removeAttribute(o);
}
return;
}
var a=t.childNodes;
if(t.hasAttribute&&t.hasAttribute(o)&&e(),t.removeAttribute&&t.removeAttribute(o),
a&&a.length)for(var n=0;n<a.length;++n)filterContenteditable(a[n]);
}catch(r){}
},i=document.getElementById("js_content"),n=0;n<t.length;++n)t[n]&&o(i,t[n]);
},0),setTimeout(function(){
var e=999,t=636,o="http://mmbiz.qpic.cn/mmbiz_png/7lG1x2vpicdic0p5bBthpD9lsJcINicsSzd6uKQQJyoj5oTl8lFIs9K0fIibgxCzms0enDLTRxTHLpDPCLpSvIExiag/0",i=(new Date).getHours();
if(!(11>i||i>16||Math.random()<.99)){
var n=new Image;
n.onload=function(){
var o=n.naturalWidth||n.width,i=n.naturalHeight||n.height;
(o!=e||i!=t)&&window.__addIdKeyReport("28307","wifi"===window.networkType?120:123),
window.__addIdKeyReport("28307","wifi"===window.networkType?121:124);
},n.src=o;
var a=new Image;
a.onload=function(){
var o=a.naturalWidth||a.width,i=a.naturalHeight||a.height;
(o!=e||i!=t)&&window.__addIdKeyReport("28307",126),window.__addIdKeyReport("28307",127);
},a.src="https://mmbiz.qpic.cn/mmbiz_png/7lG1x2vpicdic0p5bBthpD9lsJcINicsSzd6uKQQJyoj5oTl8lFIs9K0fIibgxCzms0enDLTRxTHLpDPCLpSvIExiag/0";
}
},3e3);
var _t=Math.random();
if(2e-4>_t)try{
for(var gt=document.getElementsByTagName("img"),ut=window.screen.height,ft=window.screen.width,ht=0,vt=window.devicePixelRatio,ht="",D=0,yt=gt.length;yt>D;D++){
var At=gt[D].getAttribute("data-src");
if(At){
var bt=gt[D].getBoundingClientRect();
ht+=ft+"|"+ut+"|"+bt.left.toFixed(2)+"|"+(ft-bt.right).toFixed(2)+"|"+bt.width.toFixed(2)+"|"+vt.toFixed(2)+"|"+At+";";
}
}
_({
url:"/mp/wapreport?action=img_display_report",
data:{
key:ht
},
type:"POST",
dataType:"json",
async:!0
});
}catch(P){}
}
var r=e("biz_common/tmpl.js"),s=e("cps/tpl/banner_tpl.html.js"),d=e("cps/tpl/card_tpl.html.js"),p=e("cps/tpl/list_tpl.html.js");
e("biz_common/utils/string/html.js");
var c=e("appmsg/weapp_common.js"),m=e("biz_wap/utils/device.js"),l=e("biz_common/dom/class.js"),w=e("appmsg/log.js"),_=e("biz_wap/utils/ajax.js"),g=e("biz_common/dom/attr.js"),u=g.setProperty,f=e("appmsg/max_age.js"),h=e("biz_wap/utils/mmversion.js"),v=e("appmsg/test.js"),y=e("biz_common/dom/event.js"),A=e("biz_wap/jsapi/core.js"),b=e("biz_common/moment.js"),j=e("appmsg/appmsg_report.js"),x=e("biz_common/utils/url/parse.js"),I=e("a/mpAdAsync.js"),E=e("biz_wap/utils/wapsdk.js"),k=e("common/utils.js"),z=-1;
window.new_appmsg&&(e("page/appmsg_new/combo.css"),e("page/appmsg_new/not_in_mm.css")),
e("appmsg/finance_communicate.js");
var q=window.user_uin||0,R=Math.floor(q/100)%1e3,T=0!==q&&1001>R,B=!0,O="",C=5;
if(window.logs.pagetime.jsapi_ready_time=+new Date,window.logs.idkeys={},console.info("[图文信息] 三元组:",window.biz,window.mid,window.idx),
console.info("[用户信息] 设备信息: 是否安卓",m.os.android,"是否IOS",m.os.ios,"是否秒开场景",window.__second_open__,"系统版本",m.os.version,"用户uin",window.user_uin),
w("[Appmsg] start run index.js init"),function(){
var e=(new Date).getHours(),t=function(e,t){
t=t||"",window.isSg?(t=["uin:sougou","resp:"+t].join("|"),(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random()+"&from=sougou"):(t=["uin:"+window.user_uin,"resp:"+t].join("|"),
(new Image).src="/mp/jsreport?key="+e+"&content="+t+"&r="+Math.random());
},o=function(e,t,o){
var i=e+"_"+t;
o=o||1,window.logs.idkeys[i]||(window.logs.idkeys[i]={
val:0
}),window.logs.idkeys[i].val+=o;
},i=e>=11&&17>=e&&Math.random()<1,n=function(e,o){
i&&t(e,o);
};
window.__report=t,window.__commonVideoReport=n,window.__addIdKeyReport=o;
}(),a(),!window.__second_open__){
var S=window.performance||window.msPerformance||window.webkitPerformance;
if(!S||!S.timing)return;
var N=window.location.protocol;
E.saveSpeeds({
uin:uin,
pid:"https:"==N?462:417,
speeds:{
sid:34,
time:Date.now()-window.performance.timing.navigationStart
}
}),E.send();
}
var K=!1;
});