define("a/tpl/new_cpc_tpl.html.js",[],function(){
return'<!--cpc 文中广告-->\n<!--article_bottom 用于标示底部新样式，目前广告怕大量影响其它广告，所以只实验关注类-->\n<div id="js_cpc_area" class="mpad_cpc <# if(pos_type === 0 && parseInt(crt_size) === 708){ #>article_bottom<# } #>">\n    <!--有文字 "广告"-->\n    <!--<# if(tag_pos == \'left\'){ #>\n    "广告" 居左\n    <div class="mpad_cpc_adTag_left mpad_more_cps_left_container">广告<div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n                <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                        <li class="mpad_more_list_ele">\n                            <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                        </li>\n                    </ul>\n        </div>\n    </div>\n    <# } else if(tag_pos == \'right\'){ #>\n    "广告" 居右\n    <div class="mpad_cpc_adTag_right mpad_more_cps_right_container">广告<div href="javascript:;" class="mpad_more js_ad_opt_list_btn_<#=pos_type#>" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n            <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                <li class="mpad_more_list_ele">\n                    <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">投诉</a>\n                </li>\n            </ul>\n        </div>\n    </div>\n    <# } #>-->\n    <div class="mpad_cpc_inner">\n        <# if(isVideo){ #> <!--视频-->\n        <div id="js_video_container" class="mpad_cpc_bd js_ad_main_area mpad_cpc_video js_material_<#=pos_type#>" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>">\n            <div class="mpad_cpc_video_content js_video_container_new_protocol"></div> <!--这里放视频-->\n        </div>\n        \n        <# }else{ #> <!--纯图片-->\n        <div class="mpad_cpc_bd js_ad_main_area js_material_<#=pos_type#>" style="background-image:url(<#=banner#>)" data-type="<#=type#>" data-ticket="<#=ticket#>" data-url="<#=url#>" data-rl="<#=rl#>"  data-aid="<#=aid#>" data-pt="<#=pt#>" data-tid="<#=traceid#>" data-gid="<#=group_id#>" data-apurl="<#=apurl#>" data-is_cpm="<#=is_cpm#>"></div>\n        <# } #>\n        \n        <div class="mpad_cpc_ft <# if(!price){ #> single<# } #>">\n            <div class="mpad_cpc_ft_hd">\n                <# if(avatar){ #><!--头像-->\n                <!--app 为方头像，图文消息 为圆头像-->\n                <span class="<# if(isDownload){ #> mpad_cpc_avatar<# }else{ #> mpad_cpc_avatar_round<# } #>" style="background: url(<#=avatar#>) no-repeat center; background-size: contain;"></span>\n                <# } #>\n                \n                <div class="mpad_cpc_ft_msg ">\n                    <!--有title和金额-->\n                    <# if(!!title){ #>\n                        <p class="mpad_cpc_ft_msg_title"><#=title#></p>\n                        <# if(!!price){ #> <!--金额-->\n                        <p class="mpad_cpc_ft_msg_price">¥<#=price#></p>\n                        <# } #>\n\n                        <!--底部广告 描述，xx篇原创文章 xx位朋友关注-->\n                        <!-- 公众号描述 -->\n                        <!-- 原创文章 -->\n                        <!-- 好友关注 -->\n                        <# if(pos_type === 0 && parseInt(crt_size) === 708){ #>\n                        <p class="mpad_cpc_ft_msg_desc js_mpad_cpc_ft_msg_contact">\n                            <span class="mpad_cpc_ft_msg_desc_item"></span>\n                            <span class="mpad_cpc_ft_msg_desc_item"></span>\n                        </p>\n                        <# } #>\n                    <# } #>\n                    <# if(!(tag_pos == \'left\' || tag_pos == \'right\') && superscript){ #><!--广告标在里面-->\n                    <!--当没有title和价格的时候，出广告标，底部广告不会出现没有title的情况，所以底部不会出现广告标-->\n                    <!--更新：现在底部广告也有广告标了，并且也有title，所以加了superscript来控制角标 @scotthuang 2018-10-17-->\n                    <div class="mpad_cpc_adTag_inner mpad_more_innertips_container <# if(!title && !price){ #> single<# } #> js_ad_opt_list_btn_<#=pos_type#>">Ad<div href="javascript:;" class="mpad_more js_mpad_more" <# if(!parseInt(can_see_complaint)){ #>style="display:none"<#}#>>\n                            <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_<#=pos_type#>" style="display: none">\n                                <li class="mpad_more_list_ele">\n                                    <a class="mpad_more_list_ele_container js_complain_btn_<#=pos_type#>" href="javascript:;">Report</a>\n                                </li>\n                            </ul>\n                        </div>\n                    </div>\n                    <# } #>\n                </div>\n            </div>\n\n            \n            <# if(isDownload) {#>\n            <!--下载按钮 目前不会有小程序-->\n            <a href="javascript:void(0);" class="mpad_cpc_btn mpad_cpc_download_btn js_ad_action_<#=pos_type#>">\n                <div class="btn_download_outside js_download_outside"><#=btn_text#></div>\n                <div class="btn_progress js_download_percent" style="width: 0%"> \n                    <div class="btn_download_inner js_download_inner"><#=btn_text#></div>\n                </div>\n            </a>\n            <!--delay 用新的下载-->\n            <!--未下载-->\n            <!--下载中-->\n            <!--进度条更新这里-->\n            <!--暂停下载-->\n            <!--<a href="javascript:void(0);" class="mpad_cpc_btn js_ad_action_<#=pos_type#>"><#=btn_text#></a>\n            \n            <a href="javascript:void(0);" class="mpad_cpc_btn mpad_cpc_download_btn js_ad_action_<#=pos_type#>">\n                <div class="btn_progress js_download_percent" style="width: 0%"></div> \n                <span class="btn_download_cancel"></span>\n            </a>-->\n\n            <# }else{ #>\n            <!--非下载按钮-->\n            <a href="javascript:void(0);" class="mpad_cpc_btn js_ad_action_<#=pos_type#>">\n                <!--小程序标，文章底部用绿色。文中用白色-->\n                <# if(!!is_wx_app){ #>\n                <# if(pos_type === 0 && parseInt(crt_size) === 708){ #><img class="icon_wxapp icon_wxapp_article_bottom" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT5ncmVlbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSI9PXNsaWNlPT0iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJhIiBmaWxsPSIjMDZBRTU2Ij4KICAgICAgICAgICAgPHBhdGggZD0iTTExLjYyNDQxOSw4Ljc5MzE5MDMgTDExLjQyOTk3NTgsOC43OTY0NjI5NSBDMTAuODQyMDQ2NCw4Ljc5NjQ2Mjk1IDEwLjQ5OTkzOTgsOC4zNDc4NTg3MiAxMC43MjA5NTU3LDcuODMwNjU5MzggQzEwLjg3MjMwNyw3LjQ2MzMyNzYxIDExLjIxMzc3MDIsNy4xNzk2NDAyOCAxMS42MTcwMzc1LDcuMDg2NDY2MiBDMTIuNjk1OTg0OSw2LjgxNTU3NDMzIDEzLjQyOTA2MjksNS45Mzg0NjU0MiAxMy40MjkwNjI5LDQuOTE4NzcyOTkgQzEzLjQyOTA2MjksMy42ODI1MzI1NSAxMi4yOTQzMjg2LDIuNjc1MDkxOTUgMTAuODc3MDE0NCwyLjY3NTA5MTk1IEM5LjQ1OTcwMDA5LDIuNjc1MDkxOTUgOC4zMjQ5NjU3NywzLjY4MjUzMjU1IDguMzI0OTY1NzcsNC45MTg3NzI5OSBMOC4zMjQ5NjU3NywxMS4wODEyMjcgQzguMzI0OTY1NzcsMTMuMjUxNzU0MyA2LjQ1OTgwNTgsMTUgNC4xNjI0ODI4OCwxNSBDMS44NjUxNTk5NywxNSAwLDEzLjI1MTc1NDMgMCwxMS4wODEyMjcgQzAsOS4xNzgwMjgxNyAxLjQ0NDIzODYxLDcuNTUzNTA4MDcgMy40MTIwMzUyNSw3LjI0NDYyMDA4IEwzLjU3MDAyNDIyLDcuMjQ0NjIwMDggQzQuMDE1MTMxNzQsNy4yNDQ2MjAwOCA0LjMzNTc0NDEzLDcuNTIxNzc0NjQgNC4zMzU3NDM3OCw3LjkxNzU4NDM1IEM0LjMzNTkzMzYyLDcuOTg1NDA1OTQgNC4zMzQzNDk4NSw4LjAxNjc0NjIgNC4zMjc5MTIxNiw4LjA1NjkyMzEgQzQuMzE5MjMzODgsOC4xMTEwODMzOCA0LjMwMjMzNTkxLDguMTYyOTIyMTUgNC4yNzkwNDQzLDguMjEwNDIzNjUgQzQuMTM3MTg0ODEsOC41NTQ3MTg3NCAzLjc3NDUzNjY4LDguODUyODAwODQgMy4zODI5NjI1Myw4Ljk1NDYxNjgzIEMyLjMxMTgxMDQzLDkuMjIzNTUxNTIgMS41NzA5MzcwNSwxMC4wOTUzMDUxIDEuNTcwOTM3MDUsMTEuMDgxMjI3IEMxLjU3MDkzNzA1LDEyLjMxNzQ2NzUgMi43MDU2NzEzNywxMy4zMjQ5MDgxIDQuMTIyOTg1NjQsMTMuMzI0OTA4MSBDNS41NDAyOTk5MSwxMy4zMjQ5MDgxIDYuNjc1MDM0MjMsMTIuMzE3NDY3NSA2LjY3NTAzNDIzLDExLjA4MTIyNyBMNi42NzUwMzQyMyw0LjkxODc3Mjk5IEM2LjY3NTAzNDIzLDIuNzQ4MjQ1NjYgOC41NDAxOTQyLDEgMTAuODM3NTE3MSwxIEMxMy4xMzQ4NCwxIDE1LDIuNzQ4MjQ1NjYgMTUsNC45MTg3NzI5OSBDMTUsNi44MzIwNzU5NyAxMy41ODk3MzMsOC40Mzc2NzM4MyAxMS42MjQ0MTksOC43OTMxOTAzIFoiIGlkPSLlm77moIfpopzoibIiPjwvcGF0aD4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPg==" alt="">\n                <# } else { #><img class="icon_wxapp icon_wxapp_article_bottom" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAAGz7rX1AAAAAXNSR0IArs4c6QAAA65JREFUSA2lVk9oVGcQ/+a9tytoSm6t5pBK9i0trdCTXlrx4EEF/1w0p+Klh9LiQcF9uy9Gu2rcfXlJUfAfth4UvPTPQVop9FCagzdBoaAI+xJjDgpCBaMbzO6+N8687Dy/Td6GRD/Iznwzv5n55vtm5kWp5VahEkyr+Gc51FJdoVJDlhpLVW0J6BqGA8AfiLgXTPPTWCc+FlNwRqc+wTB8KBZjQ/kOb7rnhO9AtOOdpnjHkyO6448/s7LZz33XPsFmUPCCMRXhUcNQmwwri61G474yYJwuZCE7tuA/CRK7KlZqJxlZPfrxA1F0pR2n0lF0MnC8yaZCNEVON3PALw78nmpU/hWz9SCYNwwojpZsX4zaqU5bItDp/MyMzXvDytxiWr7yZG39ef2ZosczTfW15frBl60W3lYA4YdWT2+hsL7OQH2Vv+2bo32PyKwwVDd4M+baSdSo1dzNsjX9/QHTxSvOiR52Pz3sb4mSovqlXIYeOq6mRP6uTOrNsTOnGhyjKx8Rx6DgqT9k96UaFL1gVxThX3QpqACHIYKdqHCrAtVMEhZPTCNUfzKlC5FqqxSqwXV63IMiYP3bpb26CEHhU+YTgzJiwgtIKOVzClEVEwOnEoT1ahA61cnvBSSUwIe4EyjpiHvJ4JqhhNi757u5SwIUSh1yYbNtW3RDcXHKMTyydgW0mA4OQiiyBQOAPhEklF484TXG4rvl63KqtY0I6m+FMEJ7ake1R8Ml7EI9VYInlMcGkVIdDdPZz8j+vWhqaazE47A/k2uEje/oyrcTfoBtANQk/d6iE/44Wsq9ED+rDuJ4tbMYqcPiYDlKc+3QaCl/cVVBnEptgppxGzumgpkDA3bQiW/rgahBDlLNX6MHin1TVj+tOEipGtghYk0cmmBs8dzcHdnrlAbGNzQwrsYyUPNSiDomlYdMJqsrIGMtmWusL3pTX6goPCtYyvhmR4vz+A8bzR8QcB+l+L9lmbsqhYH/xKAbLV981jM3O3uXiiAfRW9rXko0DiJTiT4nC354CgK8akUfPOrmWJe/np3Lk0lv3DxK3aRmOUkPfl8wFk2FX+gEgyygEnxJ7bTPL9r/CmAl1HM33iPcR92wFl8Nf1DiZZhH6BOWGgCbrXW6E2w222nr0nSeMoProsIo+plLUPZCi97kVxHihOwp5QnPtVO/RwlGY+ISbg/L85q8KwuGOueX8ke6AlIUHX1CJ+7l/0Aihfz1jEcF0Smqkn+yZvbyiNNPY2P16w2TL37yLBAjYAAAAABJRU5ErkJggg==" alt="" /><# } #>\n                <!--底部广告专用-->\n                <img class="icon_wxapp icon_wxapp_video_share_bottom" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTZweCIgaGVpZ2h0PSIxNnB4IiB2aWV3Qm94PSIwIDAgMTYgMTYiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUzLjIgKDcyNjQzKSAtIGh0dHBzOi8vc2tldGNoYXBwLmNvbSAtLT4KICAgIDx0aXRsZT53aGl0ZTwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxnIGlkPSI9PXNsaWNlPT0iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgICAgIDxnIGlkPSJhJ2EiIGZpbGw9IiNGRkZGRkYiPgogICAgICAgICAgICA8cGF0aCBkPSJNMTEuNjI0NDE5LDguNzkzMTkwMyBMMTEuNDI5OTc1OCw4Ljc5NjQ2Mjk1IEMxMC44NDIwNDY0LDguNzk2NDYyOTUgMTAuNDk5OTM5OCw4LjM0Nzg1ODcyIDEwLjcyMDk1NTcsNy44MzA2NTkzOCBDMTAuODcyMzA3LDcuNDYzMzI3NjEgMTEuMjEzNzcwMiw3LjE3OTY0MDI4IDExLjYxNzAzNzUsNy4wODY0NjYyIEMxMi42OTU5ODQ5LDYuODE1NTc0MzMgMTMuNDI5MDYyOSw1LjkzODQ2NTQyIDEzLjQyOTA2MjksNC45MTg3NzI5OSBDMTMuNDI5MDYyOSwzLjY4MjUzMjU1IDEyLjI5NDMyODYsMi42NzUwOTE5NSAxMC44NzcwMTQ0LDIuNjc1MDkxOTUgQzkuNDU5NzAwMDksMi42NzUwOTE5NSA4LjMyNDk2NTc3LDMuNjgyNTMyNTUgOC4zMjQ5NjU3Nyw0LjkxODc3Mjk5IEw4LjMyNDk2NTc3LDExLjA4MTIyNyBDOC4zMjQ5NjU3NywxMy4yNTE3NTQzIDYuNDU5ODA1OCwxNSA0LjE2MjQ4Mjg4LDE1IEMxLjg2NTE1OTk3LDE1IDAsMTMuMjUxNzU0MyAwLDExLjA4MTIyNyBDMCw5LjE3ODAyODE3IDEuNDQ0MjM4NjEsNy41NTM1MDgwNyAzLjQxMjAzNTI1LDcuMjQ0NjIwMDggTDMuNTcwMDI0MjIsNy4yNDQ2MjAwOCBDNC4wMTUxMzE3NCw3LjI0NDYyMDA4IDQuMzM1NzQ0MTMsNy41MjE3NzQ2NCA0LjMzNTc0Mzc4LDcuOTE3NTg0MzUgQzQuMzM1OTMzNjIsNy45ODU0MDU5NCA0LjMzNDM0OTg1LDguMDE2NzQ2MiA0LjMyNzkxMjE2LDguMDU2OTIzMSBDNC4zMTkyMzM4OCw4LjExMTA4MzM4IDQuMzAyMzM1OTEsOC4xNjI5MjIxNSA0LjI3OTA0NDMsOC4yMTA0MjM2NSBDNC4xMzcxODQ4MSw4LjU1NDcxODc0IDMuNzc0NTM2NjgsOC44NTI4MDA4NCAzLjM4Mjk2MjUzLDguOTU0NjE2ODMgQzIuMzExODEwNDMsOS4yMjM1NTE1MiAxLjU3MDkzNzA1LDEwLjA5NTMwNTEgMS41NzA5MzcwNSwxMS4wODEyMjcgQzEuNTcwOTM3MDUsMTIuMzE3NDY3NSAyLjcwNTY3MTM3LDEzLjMyNDkwODEgNC4xMjI5ODU2NCwxMy4zMjQ5MDgxIEM1LjU0MDI5OTkxLDEzLjMyNDkwODEgNi42NzUwMzQyMywxMi4zMTc0Njc1IDYuNjc1MDM0MjMsMTEuMDgxMjI3IEw2LjY3NTAzNDIzLDQuOTE4NzcyOTkgQzYuNjc1MDM0MjMsMi43NDgyNDU2NiA4LjU0MDE5NDIsMSAxMC44Mzc1MTcxLDEgQzEzLjEzNDg0LDEgMTUsMi43NDgyNDU2NiAxNSw0LjkxODc3Mjk5IEMxNSw2LjgzMjA3NTk3IDEzLjU4OTczMyw4LjQzNzY3MzgzIDExLjYyNDQxOSw4Ljc5MzE5MDMgWiIgaWQ9IuWbvuagh+minOiJsiI+PC9wYXRoPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+" alt="" /><# } #>\n                <#=btn_text#>\n            </a>\n            <# } #>\n            </div>\n        </div>\n    </div>\n</div>';
});define("appmsg/emotion/caret.js",[],function(e,t){
"use strict";
var t={};
return t.get=function(e){
var t=0;
if(document.selection){
e.focus();
var a=document.selection.createRange();
a.moveStart("character",-e.value.length),t=Sel.text.length;
}else(e.selectionStart||"0"==e.selectionStart)&&(t=e.selectionStart);
return t;
},t.set=function(e,t){
if(e.setSelectionRange)e.focus(),e.setSelectionRange(t,t);else if(e.createTextRange){
var a=e.createTextRange();
a.collapse(!0),a.moveEnd("character",t),a.moveStart("character",t),a.select();
}
},t;
});define("pages/audition_tpl.html.js",[],function(){
return'<div id="js_music_dialog">\n    <div class="weui-mask"></div>\n    <div class="weui-dialog">\n        <div class="weui-dialog__bd">该音乐为付费音乐，当前为你播放试听片段</div>\n        <div class="weui-dialog__ft">\n            <a href="javascript:void(0);" class="weui-dialog__btn weui-dialog__btn_primary js_submit">我知道了</a>\n        </div>\n    </div>\n</div>';
});define("biz_wap/utils/localstorage.js",[],function(){
"use strict";
var t={};
return t=window.localStorage?{
set:function(t,e){
null!==this.get(t)&&this.remove(t),localStorage.setItem(t,e);
},
get:function(t){
var e=localStorage.getItem(t);
return void 0===e?null:e;
},
remove:function(t){
localStorage.removeItem(t);
},
clear:function(){
localStorage.clear();
},
each:function(t){
for(var e,o=localStorage.length,n=0,t=t||function(){};o>n&&(e=localStorage.key(n),
t.call(this,e,this.get(e))!==!1);n++)localStorage.length<o&&(o--,n--);
}
}:{
set:function(){},
get:function(){},
remove:function(){},
clear:function(){},
each:function(){}
};
});define("appmsg/friend_comment_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n    <div class="discuss_container" id="js_friend_cmt_main" style="display:none">\n        <div class="mod_title_context">\n            <strong class="mod_title">Friends\' Comments</strong>\n            <!-- 没有付费才给写留言入口 -->\n            <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n            <p class="discuss_icon_tips tr" id="js_cmt_addbtn3" style="display:none">\n                <a href="javascript:;" id="js_cmt_write3">Comment</a> <!-- 有留言的时候的写留言入口 -->\n            </p>\n            <#}#>\n        </div>\n        <!-- <ul class="discuss_list" id="js_friend_cmt_list"></ul> -->\n        <!-- _js_friend_cmt放全部留言，用来计算总高度，展开的时候赋值给js_friend_cmt  -->\n        <!-- js_friend_cmt初始的时候放前三条留言，展开的时候把总高度加上  -->\n        <ul class="friend_cmt_area hide" id="js_friend_cmt_list_hide"></ul>\n        <ul class="friend_cmt_area" id="js_friend_cmt_list"></ul>\n        <p class="friend_cmt_readmore" style="display:none;" id="js_more_friend_cmt_area">\n            <a href="javascript:void(0);" id="js_more_friend_cmt">更多朋友留言</a>\n        </p>\n    </div>\n\n    <!-- 没有付费才给写留言入口 -->\n    <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n    <div class="discuss_container" id="js_cmt_addbtn4" style="display:none">\n      <div class="mod_title_context">\n        <p class="discuss_icon_tips tc">\n          <a href="javascript:;" id="js_cmt_write4">Comment</a> <!-- 没有留言的时候的写留言入口 -->\n        </p>\n      </div>\n    </div>\n    <#}#>\n\n<#}else{#>\n    <div class="discuss_container" id="js_friend_cmt_main" style="display:none">\n        <p class="discuss_icon_tips title_bottom_tips tr" id="js_cmt_addbtn3" style="display:none">\n            <!-- 没有付费才给写留言入口 -->\n            <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n            <a href="javascript:;" id="js_cmt_write3"><img class="icon_edit" src="<#=window.comment_edit_icon#>" alt="">Comments</a>\n            <#}#>\n        </p>\n        <div class="rich_tips with_line title_tips discuss_title_line">\n            <span class="tips">Friends\' Comments</span>\n        </div>\n        <!-- <ul class="discuss_list" id="js_friend_cmt_list"></ul> -->\n        <!-- _js_friend_cmt放全部留言，用来计算总高度，展开的时候赋值给js_friend_cmt  -->\n        <!-- js_friend_cmt初始的时候放前三条留言，展开的时候把总高度加上  -->\n        <ul class="friend_cmt_area hide" id="js_friend_cmt_list_hide"></ul>\n        <ul class="friend_cmt_area" id="js_friend_cmt_list"></ul>\n        <p class="friend_cmt_readmore" style="display:none;" id="js_more_friend_cmt_area">\n            <a href="javascript:void(0);" id="js_more_friend_cmt">更多朋友留言</a>\n        </p>\n    </div>\n\n    <p class="discuss_icon_tips rich_split_tips tc" id="js_cmt_addbtn4" style="display:none">\n        <!-- 没有付费才给写留言入口 -->\n        <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n        <a href="javascript:;" id="js_cmt_write4"><img class="icon_edit" src="<#=window.comment_edit_icon#>" alt="">Comments</a>\n        <#}#>\n    </p>\n\n<#}#>\n';
});define("appmsg/comment_tpl.html.js",[],function(){
return'<#if(window.new_appmsg){#>\n    <div class="discuss_container" id="js_cmt_main" style="display:none">\n        <div class="mod_title_context">\n            <strong class="mod_title">Featured Comments</strong>\n            <p class="tips_global tr title_bottom_tips" id="js_cmt_nofans1" style="display:none;">Author has disabled comments from non-followers.</p>\n            <!-- 没有付费才给写留言入口 -->\n            <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n            <p class="discuss_icon_tips tr" id="js_cmt_addbtn1" style="display:none">\n                <a href="javascript:;" id="js_cmt_write1">Comment</a>\n            </p>\n            <#}#>\n        </div>\n        <ul class="discuss_list" id="js_cmt_list"></ul>\n    </div>\n\n\n    <!-- 没有付费才给写留言入口 -->\n    <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n    <div class="discuss_container" id="js_cmt_addbtn2" style="display:none">\n      <div class="mod_title_context">\n        <p class="discuss_icon_tips tc">\n          <a href="javascript:;" id="js_cmt_write2">Comment</a>\n        </p>\n      </div>\n    </div>\n    <#}#>\n\n    <div class="discuss_container" id="js_cmt_nofans2" style="display:none">\n      <div class="tips_global rich_split_tips tc">\n          Author has disabled comments from non-followers.      </div>\n    </div>\n    <p class="rich_split_tips tc tips_global" id="js_cmt_tips" style="display:none;"></p>\n\n\n    <div class="weui-loadmore" id="js_cmt_loading">\n        <i class="weui-loading"></i>\n        <span class="weui-loadmore__tips">正在加载</span>\n    </div>\n\n    <div class="rich_split_tips tc discuss_end_tips" id="js_cmt_statement" style="display:none">\n        <div class="weui-loadmore weui-loadmore_line weui-loadmore_dot">\n            <span class="weui-loadmore__tips"></span>\n        </div>\n        <!--\n        The above comments have been approved by the Official Account,         <a href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150313qmMbyi.html?scene_id=kf264">\n            learn more about the comment function.        </a>\n        -->\n    </div>\n<#}else{#>\n    <div class="discuss_container" id="js_cmt_main" style="display:none">\n        <p class="discuss_icon_tips title_bottom_tips tr" id="js_cmt_addbtn1" style="display:none">\n            <!-- 没有付费才给写留言入口 -->\n            <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n            <a href="javascript:;" id="js_cmt_write1"><img class="icon_edit" src="<#=window.comment_edit_icon#>" alt="">Comments</a>\n            <#}#>\n        </p>\n        <div class="rich_tips with_line title_tips discuss_title_line">\n            <span class="tips">Featured Comments</span>\n        </div>\n        <p class="tips_global tc title_bottom_tips" id="js_cmt_nofans1" style="display:none;">The author of this article has disabled comments from non-followers.</p>\n        <ul class="discuss_list" id="js_cmt_list"></ul>\n    </div>\n\n\n    <p class="discuss_icon_tips rich_split_tips tc" id="js_cmt_addbtn2" style="display:none">\n        <!-- 没有付费才给写留言入口 -->\n        <#if(window._copyright_stat!=1 || window.need_pay!=1){#>\n        <a href="javascript:;" id="js_cmt_write2"><img class="icon_edit" src="<#=window.comment_edit_icon#>" alt="">Comments</a>\n        <#}#>\n    </p>\n\n    <div class="tips_global rich_split_tips tc" id="js_cmt_nofans2" style="display:none;">\n        The author of this article has disabled comments from non-followers.    </div>\n    <p class="rich_split_tips tc tips_global" id="js_cmt_tips" style="display:none;"></p>\n\n\n    <div class="rich_tips tips_global loading_tips" id="js_cmt_loading">\n        <img src="<#=window.comment_loading_img#>" class="rich_icon icon_loading_white" alt="">\n        <span class="tips">Loading...</span>\n    </div>\n\n    <div class="rich_tips with_line tips_global" id="js_cmt_statement" style="display:none">\n        <span class="tips">The above comments have been approved for display by the Official Account.</span>\n    </div>\n\n    <p class="rich_split_tips tc" id="js_cmt_qa" style="display:none;">\n        <a href="http://kf.qq.com/touch/sappfaq/150211YfyMVj150313qmMbyi.html?scene_id=kf264">\n            learn more about the comment function.        </a>\n    </p>\n<#}#>\n\n';
});define("biz_wap/utils/fakehash.js",["biz_common/dom/event.js"],function(t){
"use strict";
function s(t){
t=t||location.hash.substr(1);
var s,o,e,i,r=!1,c=[];
for(s=0;s<h.length;s++)o=h[s],e=o[0],i=o[1],e!==a?("string"==typeof e&&e===t||e instanceof RegExp&&e.test(t))&&(i(n),
r=!0):c.push(i);
if(!r)for(s=0;s<c.length;s++)c[s](n,t);
n=t;
}
var o=t("biz_common/dom/event.js"),h=[],a="__default_hash__",n=location.hash.substr(1);
return o.on(window,"popstate",function(t){
var o=a;
t.state&&t.state.hash&&(o=t.state.hash),s(o);
}),o.on(window,"hashchange",s),o.on(window,"load",function(){
history.state&&history.state.hash&&s(history.state.hash);
}),{
val:function(){
return history.state&&history.state.hash||location.hash.substr(1);
},
push:function(t){
history.pushState?(history.pushState({
hash:t
},document.title,location.href),s(t)):location.hash=t;
},
replace:function(t){
history.replaceState?(history.replaceState({
hash:t
},document.title,location.href),s(t)):this.push(t);
},
on:function(t,s){
"function"==typeof t&&(s=t,t=a),h.push([t,s]);
}
};
});define("appmsg/comment_report.js",["biz_wap/utils/ajax.js","biz_common/dom/event.js","biz_wap/utils/storage.js","common/utils.js"],function(t){
"use strict";
var e,o,n=t("biz_wap/utils/ajax.js"),i=t("biz_common/dom/event.js"),m=t("biz_wap/utils/storage.js"),s=t("common/utils.js"),a=new m("comment_expose"),d=function f(t){
var e=t.offsetTop;
return null!=t.offsetParent&&(e+=f(t.offsetParent)),e;
},c=document.getElementById("js_cmt_area"),r=document.getElementById("js_friend_cmt_area"),_={
data:[],
appmsgid:"",
comment_id:"",
idx:"",
item_show_type:0,
biz:""
},p=function(t){
a.remove("comment_expose"),u(t);
},u=function(t){
n({
type:"post",
url:"/mp/appmsg_comment?action=exposurecomment",
data:{
comment_id:t.comment_id,
appmsgid:t.appmsgid,
idx:t.idx,
item_show_type:t.item_show_type,
__biz:t.biz,
data:JSON.stringify(t.data)
},
async:!1,
timeout:2e3
});
};
i.on(window,"scroll",function(){
var t=s.getInnerHeight(),n=window.pageYOffset||document.documentElement.scrollTop||document.body.scrollTop,i=c.querySelectorAll(".js_comment_item"),m=r.querySelectorAll(".js_comment_item");
if(e||(e=d(c)),o||(o=d(r)),m.length)for(var p=0;p<m.length&&o+m[p].offsetTop<n+t;p++)1!=m[p].getAttribute("data-hasreport")&&(m[p].setAttribute("data-hasreport",1),
_.data.push({
content_id:m[p].dataset.content_id,
is_elected_comment:1*m[p].dataset.elected,
is_friend_comment:1,
scene:2
}));
if(i.length)for(var p=0;p<i.length&&e+i[p].offsetTop<n+t;p++)1!=i[p].getAttribute("data-hasreport")&&(i[p].setAttribute("data-hasreport",1),
_.data.push({
content_id:i[p].dataset.content_id,
is_elected_comment:1,
is_friend_comment:1*i[p].dataset.friend,
scene:1
}));
a.set("comment_expose",_);
}),i.on(window,"unload",function(){
p(_);
}),i.on(window,"load",function(){
var t=a.getData("comment_expose");
t.appmsgid&&p(t);
});
var l=function(t){
_.comment_id=t.comment_id,_.appmsgid=t.appmsgid,_.idx=t.idx,_.item_show_type=t.item_show_type||0,
_.biz=t.biz;
};
return l;
});define("a/appdialog_confirm.html.js",[],function(){
return'<div class="wx_profile_dialog_primary">\n    <div class="weui-mask"></div>\n    <div class="weui-dialog weui-skin_android">\n        <div class="weui-dialog__hd"><strong class="weui-dialog__title">是否立即下载该应用</strong></div>\n        <div class="weui-dialog__bd">\n            <div class="weui-flex">\n                <div class="wx_profile_info_avatar_wrp">\n                    <span class="wx_profile_info_avatar">\n                        <img src="<#=app_img_url#>" alt="">\n                    </span>\n                </div>\n                <div class="weui-flex__item">\n                    <strong class="wx_profile_info_title"><#=app_name#></strong>\n                </div>\n            </div>\n        </div>\n        <div class="weui-dialog__ft">\n            <a href="javascript:;" class="js_cancel weui-dialog__btn weui-dialog__btn_default">取消</a>\n            <a href="javascript:;" class="js_ok weui-dialog__btn weui-dialog__btn_primary">下载</a>\n        </div>\n    </div>\n</div>\n';
});;define('widget/wx_profile_dialog_primary.css', [], function(require, exports, module) {
	return ".radius_avatar{display:inline-block;background-color:#fff;padding:3px;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;overflow:hidden;vertical-align:middle}.radius_avatar img{display:block;width:100%;height:100%;border-radius:50%;-moz-border-radius:50%;-webkit-border-radius:50%;background-color:#eee}.wx_profile_dialog_primary .weui-mask{position:fixed;z-index:1000;top:0;right:0;left:0;bottom:0;background:rgba(0,0,0,0.6)}.wx_profile_dialog_primary .weui-dialog{position:fixed;z-index:5000;width:80%;max-width:300px;top:50%;left:50%;-webkit-transform:translate(-50%,-65%);transform:translate(-50%,-65%);background-color:#fff;text-align:center;border-radius:3px;overflow:hidden}.wx_profile_dialog_primary .weui-dialog__hd{position:relative;padding:20px 20px 10px;text-align:left}.wx_profile_dialog_primary .weui-dialog__hd:after{content:\" \";position:absolute;left:20px;right:20px;bottom:0;height:1px;border-bottom:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 100%;transform-origin:0 100%;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.wx_profile_dialog_primary .weui-dialog__title{font-weight:400;font-size:17px}.wx_profile_dialog_primary .weui-dialog__bd{padding:16px 20px;min-height:40px;font-size:15px;line-height:1.3;word-wrap:break-word;word-break:break-all;color:#999}.wx_profile_dialog_primary .weui-dialog__bd:first-child{padding:2.7em 20px 1.7em;color:#353535}.wx_profile_dialog_primary .weui-dialog__ft{position:relative;line-height:44px;font-size:17px;display:-webkit-box;display:-webkit-flex;display:flex}.wx_profile_dialog_primary .weui-dialog__ft:after{content:\" \";position:absolute;left:0;top:0;right:0;height:1px;border-top:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleY(0.5);transform:scaleY(0.5)}.wx_profile_dialog_primary .weui-dialog__btn{display:block;-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#3cc51f;text-decoration:none;-webkit-tap-highlight-color:rgba(0,0,0,0);position:relative}.wx_profile_dialog_primary .weui-dialog__btn:active{background-color:#eee}.wx_profile_dialog_primary .weui-dialog__btn:after{content:\" \";position:absolute;left:0;top:0;width:1px;bottom:0;border-left:1px solid #d5d5d6;color:#d5d5d6;-webkit-transform-origin:0 0;transform-origin:0 0;-webkit-transform:scaleX(0.5);transform:scaleX(0.5)}.wx_profile_dialog_primary .weui-dialog__btn:first-child:after{display:none}.wx_profile_dialog_primary .weui-dialog__btn_default{color:#353535}.wx_profile_dialog_primary .weui-dialog__btn_primary{color:#1aad19}.wx_profile_dialog_primary .weui-skin_android .weui-dialog{text-align:left;box-shadow:0 6px 30px 0 rgba(0,0,0,0.1)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__title{font-size:21px}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__hd{text-align:left;padding:1.3em 1.6em 1.2em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__hd:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__bd{color:#999;padding:0 1.6em 1.4em;font-size:17px;text-align:left}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__bd:first-child{padding:1.6em 1.6em 2em;color:#353535}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__ft{display:block;text-align:right;line-height:42px;font-size:16px;padding:0 1.6em .7em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__ft:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn{display:inline-block;vertical-align:top;padding:0 .8em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:after{display:none}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:active{background-color:rgba(0,0,0,0.06)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:visited{background-color:rgba(0,0,0,0.06)}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn:last-child{margin-right:-0.8em}.wx_profile_dialog_primary .weui-skin_android .weui-dialog__btn_default{color:#808080}@media screen and (min-width:1024px){.wx_profile_dialog_primary .weui-dialog{width:35%}}.wx_profile_dialog_primary .weui-flex{display:-webkit-box;display:-webkit-flex;display:flex}.wx_profile_dialog_primary .weui-flex__item{-webkit-box-flex:1;-webkit-flex:1;flex:1}.wx_profile_dialog_primary .weui-flex{-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wx_profile_dialog_primary .weui-flex__item{word-wrap:break-word;word-break:break-all}.wx_profile_info_avatar_wrp{padding-right:10px}.wx_profile_info_avatar{width:50px;height:50px;padding:0;display:inline-block;background-color:#fff;vertical-align:middle}.wx_profile_info_avatar img{display:block;width:100%;-webkit-border-radius:10px;border-radius:10px}.wx_profile_info_title{display:block;overflow:hidden;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:2;font-size:16px;font-weight:400;text-align:left}";
});define("new_video/player.js",["page/pages/video.css","biz_wap/zepto/zepto.js","biz_wap/zepto/event.js","biz_wap/zepto/touch.js","biz_common/dom/event.js","new_video/player.html.js","biz_wap/utils/device.js","new_video/ctl.js","biz_common/tmpl.js","pages/iframe_communicate.js","a/a_utils.js","biz_common/utils/url/parse.js"],function(e){
"use strict";
function t(){
i();
}
function i(){
document.webkitVisibilityState?document.addEventListener("webkitvisibilitychange",o,!1):document.msVisibilityState?document.addEventListener("msvisibilitychange",o,!1):document.visibilityState&&document.addEventListener("visibilitychange",o,!1);
}
function n(){
if("hidden"in document)return"hidden";
for(var e=["webkit","moz","ms","o"],t=0;t<e.length;t++)return e[t]+"Hidden"in document,
e[t]+"Hidden";
return null;
}
function a(){
var e=n();
return e?document[e]:!1;
}
function o(){
if(a())for(var e in p._players){
var t=p._players[e];
if(t.hasBeginPlay()&&t.isPlay()){
t.pause4outer(),p.visibilityPausePlayer=t;
break;
}
}else{
var i=p.visibilityPausePlayer;
i&&i.hasBeginPlay()&&!i.isEnd()&&(i.play4outer(),p.visibilityPausePlayer=null);
}
}
e("page/pages/video.css"),e("biz_wap/zepto/zepto.js"),e("biz_wap/zepto/event.js"),
e("biz_wap/zepto/touch.js");
var r=e("biz_common/dom/event.js"),s=e("new_video/player.html.js"),d=e("biz_wap/utils/device.js"),u=e("new_video/ctl.js"),l=e("biz_common/tmpl.js"),_=e("pages/iframe_communicate.js"),h=e("a/a_utils.js"),c=e("biz_common/utils/url/parse.js"),p={
_players:{},
visibilityPausePlayer:null
};
try{
p._debug=window.parent.window.location.href.indexOf("&_debug=1")>0?!0:!1;
}catch(g){
p._debug=!1;
}
var f=3e3;
t();
var v=function(e){
p._debug&&console.log(e);
},m=(navigator.userAgent,function(){
return!0;
}()),y=function(){
return!!d.browser.M1;
}(),w=function(e,t){
var i=document.createElement("div");
return e in i.style?(i.style[e]=t,i.style[e]===t):!1;
},T=function(e){
var t=0,i=0,n=0;
.5>e&&(e=0),e=Math.ceil(e);
var t=Math.floor(e/3600),i=Math.floor((e-3600*t)/60),n=e-3600*t-60*i;
return 0!=t?(10>t&&(t="0"+t),t+=":"):t="",10>i&&(i="0"+i),10>n&&(n="0"+n),t+i+":"+n;
},b=!d.canSupportVideo,S=function(e){
var t=$(e.container);
"undefined"==typeof e.videoReportType&&(e.videoReportType=-1),e.width=e.width||300,
e.height=e.height||300,e.videoWidth=e.videoWidth||0,e.videoHeight=e.videoHeight||0,
e.duration=e.duration||0,e.videoFit=!1;
var i={
needToFit:!1,
supportObjectFit:!1,
os:d.os
};
if(e.width&&e.height&&e.videoWidth&&e.videoHeight){
var n=Math.abs(e.width/e.height-e.videoWidth/e.videoHeight);
.1>=n&&(i.needToFit=!0,w("objectFit","fill")&&(i.supportObjectFit=!0,e.videoFit=!0));
}
e.ratio=e.ratio||e.width/e.height,e.autoplay=!!e.autoplay||!1,this.opt=e,this.id=e.id=+new Date+"_"+Math.floor(Math.random()*Math.floor(+new Date)),
this.__forcePause=!1,this.__hasFuncControllBar=!0,this.__dragTimes=[],this.__play_total_time=0,
this.__last_playtime=0,this.__always_hide_loading=e.always_hide_loading||!1,this._g={
timeupdateCacheCount:5,
serialTimeupdateCache:[],
resetShowingLoadingTimeoutId:null,
statusDefine:{
init:1,
play:1,
pause:1,
loading:1,
end:1,
error:1
},
subStatusDefine:{
init:1,
play:1,
playing:1,
waiting:1,
stalled:1,
seeking:1,
seeked:1,
preload:1
},
status:"init",
subStatus:"init"
},e._mustHideFullScreen=y,e.display=e.autoHide?"none":"block",e.ad_muted_btn=e.ad_muted_btn||!1;
var a=l.tmpl(s,e);
t.append(a);
var o=this.container=$("#js_mpvedio_"+this.id);
this.$video=o.find("video");
var r=this.video=this.$video[0];
this.__initData(),this.__initVideo();
var u=e.src;
if(!u)return void this.__triggerOutside("error",{
errorcode:5
});
if(r.setAttribute("origin_src",u),b)return o.find(".js_btn_play").attr("href",u).show(),
this.__loadedHandler(),void this.__bindBtnEvent();
var _=e.plugins||[];
this._blockPlugin={};
for(var h=0,c=_.length;c>h;++h){
var g=_[h];
g.setPlayer(this),!!g.init&&g.init();
}
this.plugins=_,this._trigger("afterCheckVideoFit",i),this._trigger("loading",e),
this._defineEvent(),this.__bindBtnEvent(),this.__bindVideoEvent(),this._addPostmessageListener(),
p._players[this.id]=this;
};
return $.extend(S.prototype,{
__triggerOutside:function(){
var e=this.opt,t=arguments,i=t[0],n=this,a=this.video;
if(i){
i=i.substr(0,1).toUpperCase()+i.substr(1);
var o=e["on"+i];
"function"==typeof o&&o.apply(this,t),"BeginPlay"!=i||null!=n.__replaySec&&0!=n.__replaySec||!d.os.ios||(a.currentTime=.1);
}
},
__errorHandler:function(){
this.video.removeAttribute("src");
},
__loadingHandler:function(e){
this.showLoading(),this._trigger("ready",e);
},
__readyHandler:function(e){
this.opt.src;
this._trigger("loaded",e);
},
__loadedHandler:function(e){
if(e&&e.autoplay)return void this._trigger("readyBeginPlay",e);
this.hideLoading(),this.container.find(".js_video_play_controll").css({
display:"block"
});
var t=this.opt.duration;
t&&t>0&&this.container.find(".js_video_length").html(T(t)).show();
},
__readyBeginPlayHandler:function(e){
this.setSrc(this.opt.src),this._trigger("beginPlay",e);
},
__beginPlayHandler:function(){
b&&(location.href=this.opt.src);
var e=this.container,t=this,i=this.video;
e.find(".js_video_poster").show(),this.showCover(),e.find(".js_video_play_controll").hide(),
this.__hasBeginPlay=!0,t.showLoading("firstTime"),setTimeout(function(){
i.play();
},1);
},
__replayHandler:function(){
var e=this.video.muted;
this.setSrc(this.src,this.video.preload),this.triggerMuted(e),this._afterReplay();
},
__endHandler:function(){
this.container.find(".js_btn_play_aria").data("status","3").removeClass("video_playing"),
this.hideControllBar(),this._hidePlayControllBar();
},
__hideControllTimeoutCallback:function(){
return this.__onTouch?void this.__hideControllTimeout():void(this.isPlay()&&this.hideControllBar());
},
__touchVideoHandler:function(){
var e=this,t=this.opt;
if(t.blockTouchVideo||this.__onTouch)return!1;
if(!e.__canplay||e.isEnd()&&t.hideControllBarAtEnd)return void e.hideControllBar();
var i=e.container.find(".js_controll");
"none"==i.css("display")?e.showControllBar():e.hideControllBar(!0),e.__hideControllTimeout();
},
__hideControllTimeout:function(){
var e=this;
this.__touchVideoTimeoutHandler&&clearTimeout(this.__touchVideoTimeoutHandler),this.__touchVideoTimeoutHandler=setTimeout(function(){
e.__hideControllTimeoutCallback();
},f);
},
__initData:function(){
this.log={
hasended:0,
lastsec:0,
duration:0,
video_error:0
},this.__hasBeginPlay=!1,this.__canplay=!1,this.__hasscroll=!1,this.__replaySec=null,
this.__playQueue=[];
},
__initVideo:function(){
var e=this.opt,t=this.video;
t.addEventListener("contextmenu",function(e){
e.preventDefault(),e.stopPropagation();
},!1),t.hasAttribute("controls")&&t.removeAttribute("controls"),t.setAttribute("webkit-playsinline","isiPhoneShowPlaysinline"),
t.setAttribute("playsinline","isiPhoneShowPlaysinline"),e.loop&&t.setAttribute("loop",e.loop),
e.muted&&(t.setAttribute("muted",e.muted),t.muted=!0),this.$video.off("loadedmetadata durationchange"),
this.__hasVideoDurationchange=!1;
},
__getDuration:function(){
var e=this.opt,t=this.video,i=t.duration;
return i&&1!=i?i:e.duration;
},
__videoDurationchange:function(){
var e=this;
if(!e.__hasVideoDurationchange){
var t=this.video,i=this.opt,n=this.container;
if(1/0!=t.duration&&t.duration>0&&1!=t.duration)e.duration=t.duration,e.__hasVideoDurationchange=!0;else{
if(!i.duration)return!1;
e.duration=i.duration,e.__hasVideoDurationchange=!0;
}
e.log.duration=e.duration,n.find(".js_total_time").text(T(e.duration)),this.__hasFuncControllBar&&n.find(".js_progress_bar,.js_total_time").show();
var a=+new Date,o=a-e.log.loadwait_start;
e.log.loadwait=o,e._trigger("durationchange",{
loadwait:o
});
}
},
__startCountTime:function(){
var e=this,t=this.video;
t&&null===e.__last_playtime&&(e.__last_playtime=t.currentTime);
},
__endCountTime:function(){
var e=this,t=this.video;
t&&t.currentTime>e.__last_playtime&&null!==e.__last_playtime&&(e.__play_total_time+=t.currentTime-e.__last_playtime,
e.__last_playtime=null);
},
__bindVideoEvent:function(){
var e=this.$video,t=this,i=this.container,n=i.find(".js_switch"),a=(i.find(".js_video_pause_controll"),
this.video);
e.off("timeupdate").on("timeupdate",function(){
if(t.__forcePause===!0)return void v(t.id+":timeupdate __forcePause return");
if(t.__hasBeginPlay&&!t.__canplay)return t.showLoading(),!1;
a=t.video,null!=t.__replaySec&&(v(t.id+":timeupdate __replaySec"),a.pause(),a.currentTime=t.__replaySec,
t.__last_playtime=t.__replaySec,a.play(),t.__replaySec=null),t.__videoDurationchange();
var e=a.currentTime;
if(e>0){
t.__startCountTime(),t._addSerialTimeupdate(),(!t.__seeking||t._checkPlayBySerialTimeupdate())&&t.hideLoading();
var i=t.__getDuration();
t.__onTouch||(t.__setControllBar(e/i),t.__setPlayTime(e)),t.hideCover(),t._trigger("timeupdate",{
currentTime:e
});
}
}),e.off("canplay").on("canplay",function(){
null!=t.__replaySec&&(a.currentTime=1*(1*t.__replaySec).toFixed(4),t.__last_playtime=t.__replaySec,
t.__replaySec=null),t.__canplay=!0,t._trigger("canplay");
}),e.off("ended").on("ended",function(){
v("player inner isend:"+t.isEnd()),t.isEnd()&&(t.changeStatus({
status:"end",
subStatus:""
}),t.__endCountTime(),t._trigger("end"));
}),e.off("emptied").on("emptied",function(){}),t.waitingHandlerTimer=null;
var o=0;
e.off("stalled").on("stalled",function(){
if(this.__hasBeginPlay&&!t.waitingHandlerTimer){
t.changeStatus({
status:"loading",
subStatus:"stalled"
}),t.showLoading();
var e=a.src,i=a.readyState,n=a.error;
0!=i||n&&0!=n.code||(clearTimeout(t.waitingHandlerTimer),t.waitingHandlerTimer=null,
t.showLoading(),t.showCover(),a.pause(),a.src=e,a.load(),a.play(),v(t.id+":stalled"));
}
}),e.on("seeked",function(){
t.__onTouch||(t.changeStatus({
status:"loading",
subStatus:"seeked"
}),a.play()),t.__seeking=!1,v("video seeked event");
}),e.off("seeking").on("seeking",function(){
v("seeking,__hasBeginPlay:"+t.__hasBeginPlay),t.__hasBeginPlay&&(t.changeStatus({
status:"loading",
subStatus:"seeking"
}),t.__seeking=!0,t.showLoading());
}),e.off("waiting").on("waiting",function(){
if(v("waiting,__hasBeginPlay:"+t.__hasBeginPlay),t.__hasBeginPlay){
t.changeStatus({
status:"loading",
subStatus:"waiting"
}),t.showLoading(),clearTimeout(t.waitingHandlerTimer),t.waitingHandlerTimer=null;
var e=0;
for(var i in p._players)if(p._players.hasOwnProperty(i)&&e++,e>1)break;
e>1&&t.__forcePause===!1&&(t.waitingHandlerTimer=setTimeout(function(){
if(t.__forcePause!==!0){
var e=a.error;
if(0==a.readyState&&(!e||0==e.code)){
clearTimeout(t.waitingHandlerTimer),t.waitingHandlerTimer=null;
var i=a.src;
t.showLoading(),t.showCover(),a.pause(),a.src=i,o++,a.load(),a.play(),v(t.id+":waitingHandlerTimer");
}
}
},1e4)),t._trigger("waiting");
}
}),e.off("play playing").on("play playing",function(e){
return t.__forcePause===!0?void v(t.id+":play playing __forcePause return"):(t.changeStatus({
status:"play",
subStatus:e.type
}),setTimeout(function(){
t.adVideoStatus="play";
},10),v(t.id+":play playing"),n.removeClass("switch_on"),n.addClass("switch_off"),
t._hidePlayControllBar(),t.__startCountTime(),void t._trigger("play"));
}),e.off("pause").on("pause",function(){
v(t.id+":video pause event"),t.changeStatus({
status:"pause",
subStatus:""
}),n.addClass("switch_on"),n.removeClass("switch_off"),!t.__canplay||t.isEnd()||t.__onTouch?t._hidePlayControllBar():(t.hideControllBar(!0),
t._showPlayControllBar()),t.__endCountTime(),t._trigger("pause");
}),e.off("error").on("error",function(){
var e;
t.video.error&&(e=t.video.error.code),t.changeStatus({
status:"error",
subStatus:e||""
}),t._trigger("error",{
errorcode:e
});
}),e.off("webkitbeginfullscreen webkitendfullscreen webkitfullscreenchange mozfullscreenchange fullscreenchange").on("webkitbeginfullscreen webkitendfullscreen webkitfullscreenchange mozfullscreenchange fullscreenchange",function(e){
var i;
i="webkitbeginfullscreen"==e.type?!0:"webkitendfullscreen"==e.type?!1:document.fullScreen||document.mozFullScreen||document.webkitIsFullScreen;
var n=$(this);
i?(n.parents(".js_inner").removeClass("not_fullscreen"),t.__isInFullScreen=!0):(n.parents(".js_inner").addClass("not_fullscreen"),
t.hideLoading(),t.__isInFullScreen=!1),v("fullscreenchange state:"+t.__isInFullScreen+"; event type:"+e.type),
_.broadcastMessage({
type:"fullscreenchange",
data:{
fullScreen:t.__isInFullScreen,
id:t.id
}
});
});
},
_defineEvent:function(){
var e=this;
this._event={
progressBarMousemove:function(t){
e.__hasFuncControllBar&&e.__onTouch&&e._pointerMoveHandler({
x:t.pageX||t.clientX,
y:t.pageY||t.clientY,
e:t
});
},
progressBarMouseup:function(t){
return e.__hasFuncControllBar&&e.__onTouch?(e._pointerUpHandler({
x:t.pageX||t.clientX,
y:t.pageY||t.clientY,
e:t
}),!1):void 0;
},
progressBarTouchmove:function(t){
if(e.__hasFuncControllBar&&e.__onTouch){
var i=t.changedTouches[0];
e._pointerMoveHandler({
x:i.pageX,
y:i.pageY,
e:t
});
}
},
progressBarTouchend:function(t){
if(e.__hasFuncControllBar&&e.__onTouch){
var i=t.changedTouches[0];
return e._pointerUpHandler({
x:i.pageX,
y:i.pageY,
e:t
}),!1;
}
},
broadcastPlay:function(t){
t.id!==e.id&&e.__hasBeginPlay&&!e.isEnd()&&e.pause4outer();
}
};
},
_addPostmessageListener:function(){
_.addListener({
type:"broadcastPlay",
func:this._event.broadcastPlay
});
},
__bindBtnEvent:function(){
function e(){
if(b)return location.href=i.opt.src,!1;
if(i.changeStatus({
status:"loading",
subStatus:"preload"
}),a){
var e=2;
try{
e=window.cgiData&&"0"==window.cgiData.media_source?11:2;
}catch(t){}
u.report({
step:e,
vid:a.vid,
hit_bizuin:a.hit_bizuin,
hit_vid:a.hit_vid,
traceid:a.pageplayer._getTraceId(),
orderid:a.pageplayer._getOrderid(),
ori_status:a.pageplayer._getOriStatus(),
type:n.videoReportType,
fromid:a.pageplayer._getFromid()
});
}
i._trigger("readyBeginPlay");
}
function t(){
i.isPlay()?(a&&u.report({
step:12,
vid:a.vid,
hit_bizuin:a.hit_bizuin,
hit_vid:a.hit_vid,
traceid:a.pageplayer._getTraceId(),
orderid:a.pageplayer._getOrderid(),
ori_status:a.pageplayer._getOriStatus(),
type:n.videoReportType,
fromid:a.pageplayer._getFromid()
}),i.pause4outer()):i.play4outer();
}
var i=this,n=this.opt,a=n.extinfo,o=this.container,s=(this.video,o.find(".js_video_play_controll"),
o.find(".js_btn_play")),l=o.find(".js_btn_play_aria"),_=o.find(".js_video_poster"),h=o.find(".js_switch"),c=o.find(".js_progress_bar"),p=o.find(".js_controll"),g=(o.find(".js_played_bar"),
o.find(".js_page_video")),f=o.find(".js_full_mask"),v=o.find(".js_video_pause_controll"),y=o.find(".js_full_screen_control"),w=o.find(".js_loading");
r.on(v[0],"tap",".js_btn_pause",function(){
i.play4outer();
});
var T,S,C,P,B=0,j=!1,k=0,F=0,D=i.__getDuration(),M=0,H=1,x=window.user_uin||0,V=0!==x&&Math.floor(x/100)%1e3<H,I=!1,z=0;
g.on("touchstart",function(e){
1==e.targetTouches.length&&i.isPlay()&&(n.blockTouchVideo||(C=T=new Date,P=S={
x:e.targetTouches[0].clientX,
y:e.targetTouches[0].clientY
},M=i.getCurTime(),d.os.android&&e.preventDefault()));
}),g.on("touchmove",function(e){
if(1==e.targetTouches.length&&i.isPlay()&&!n.blockTouchVideo){
var t=new Date,a=e.changedTouches[0].clientX,o=e.changedTouches[0].clientY;
if(P.x==S.x&&P.y==S.y&&Math.abs(o-P.y)>=10)return void(j=!1);
var r=t-T,s=a-S.x,d=o-S.y,u=Math.sqrt(Math.pow(s,2)+Math.pow(d,2))+F,l=Math.min(Math.ceil(u/r),6);
k=Math.floor(.1*u+.2*l*l*l)*Math.ceil(D/500),F=0==k?u:0,0>s&&(k=-k);
var _=180*Math.atan2(d,s)/Math.PI;
j||(_>=-30&&30>=_&&++B,(_>=150&&180>=_||_>=-180&&-150>=_)&&--B,(B>=4||-4>=B)&&(5>=u?B=0:(z=Math.max(z,l),
j=!0))),j&&(M+=k,0>M&&(M=0),M>D&&(M=1*D),i.__setForwardBar(M),e.preventDefault(),
e.stopPropagation()),S={
x:a,
y:o
},T=t;
}
}),g.on("touchend",function(e){
if(j){
if(i.play(M),o.find(".js_forward").css("display","none"),V&&((new Image).src="/mp/jsmonitor?idkey=28307_29_1",
!I)){
var t=(new Date,{
x:e.changedTouches[0].clientX,
y:e.changedTouches[0].clientY
}),n=t.x-P.x,a=t.y-P.y,r=parseInt(Math.sqrt(Math.pow(n,2)+Math.pow(a,2))),s=parseInt(180*Math.atan2(a,n)/Math.PI);
s>=-30&&30>=s||s>=150&&180>=s||s>=-180&&-150>=s||((new Image).src="/mp/jsmonitor?idkey=28307_35_1"),
(new Image).src="/mp/jsmonitor?idkey=28307_31_1;28307_33_"+r+";28307_34_"+z,I=!0;
}
i._seekReport();
}
k=0,j=!1,B=0;
}),g.on("touchmove MSPointerMove pointermove mousemove",function(e){
i.isInFullScreen()&&!m&&(e.preventDefault(),e.stopPropagation());
}),r.tap(g[0],function(e){
e.target===p[0]||p[0].contains(e.target)||i.isEnd()||i.isPause()||j||i._trigger("touchVideo");
}),r.tap(f[0],function(){
i.isEnd()||i._trigger("touchVideo");
}),f.on("touchmove MSPointerMove pointermove mousemove",function(e){
i.isInFullScreen()&&!m&&(e.preventDefault(),e.stopPropagation());
}),r.tap(l[0],function(){
var n=$(this),a=1*n.data("status");
0==a?(n.addClass("video_playing").data("status","1"),e()):1==a?(n.removeClass("video_playing").data("status","2"),
t()):2==a?(n.addClass("video_playing").data("status","1"),t()):3==a&&(n.addClass("video_playing").data("status","1"),
i._trigger("ariaReplay"));
}),r.tap(s[0],function(){
e();
}),r.tap(w[0],function(){
i._trigger("touchVideo");
}),r.tap(h[0],function(){
t();
}),i.__onTouch=!1,c.on("mousedown",function(e){
i.__hasFuncControllBar&&(p.off("mousemove",i._event.progressBarMousemove).on("mousemove",i._event.progressBarMousemove),
_.off("mousemove",i._event.progressBarMousemove).on("mousemove",i._event.progressBarMousemove),
$(document.body).off("mouseup").on("mouseup",i._event.progressBarMouseup),i._pointerDownHandler({
x:e.pageX||e.clientX,
y:e.pageY||e.clientY,
e:e
}));
}),c.on("touchstart",function(e){
if(i.__hasFuncControllBar){
c.off("touchmove",i._event.progressBarTouchmove).on("touchmove",i._event.progressBarTouchmove),
c.off("touchend",i._event.progressBarTouchend).on("touchend",i._event.progressBarTouchend);
var t=e.changedTouches[0];
i._pointerDownHandler({
e:e,
x:t.pageX,
y:t.pageY
});
}
}),r.tap(y[0],function(e){
return i.isInFullScreen()?m&&i.exitFullScreen():m&&((new Image).src=location.protocol+"//mp.weixin.qq.com/mp/jsmonitor?idkey=28307_56_1&r="+Math.random(),
i.enterFullScreen()),e.stopPropagation(),e.preventDefault(),!1;
});
},
_pointerDownHandler:function(e){
this.__onTouch=!0,this.showControllBar(),this.progressBarSeekData={
x1:e.x,
y1:e.y,
startTime:this.video.currentTime
},this.pause(),e.e.preventDefault();
},
_pointerMoveHandler:function(e){
var t=this.container.find(".js_played_bar"),i=this.container.find(".js_progress_bar");
this.__onTouch=!0,this.__has_drag=!0,this.progressBarSeekData.x2=e.x,this.progressBarSeekData.y2=e.y;
var n=t.offset(),a=i.width(),o=(e.x-n.left)/a,r=this.__getDuration(),s=1*(r*o).toFixed(4);
s>r&&(s=r-1);
var d=!1;
"undefined"==typeof this.progressBarSeekData.dragTime&&(d=!0);
var u=Math.abs(1*s-1*this.progressBarSeekData.dragTime);
(d||u>=.5)&&(this.progressBarSeekData.dragTime=s,v("_pointerMoveHandler set currentTime, dragTime:"+this.progressBarSeekData.dragTime+" currentTime:"+this.video.currentTime),
this.video.currentTime=this.progressBarSeekData.dragTime,this.__setPlayTime(this.progressBarSeekData.dragTime)),
this.__setControllBar(o),e.e&&(e.e.preventDefault(),e.e.stopPropagation());
},
_pointerUpHandler:function(e){
var t=this;
e.e.preventDefault(),e.e.stopPropagation(),this.container.find(".js_controll").off("mousemove",t._event.progressBarMousemove),
this.container.find(".js_video_poster").off("mousemove",t._event.progressBarMousemove),
$(document.body).off("mouseup",t._event.progressBarMouseup),this.container.find(".js_progress_bar").off("touchmove",t._event.progressBarTouchmove).off("touchend",t._event.progressBarTouchend),
"undefined"==typeof this.progressBarSeekData.dragTime&&this._pointerMoveHandler({
x:e.x,
y:e.y
});
var i=this.progressBarSeekData.dragTime;
i==this.video.currentTime&&(i-=.1),this.progressBarSeekData.startTime&&t.__dragTimes.push(Math.round(1e3*this.progressBarSeekData.startTime)+":#:"+Math.round(1e3*i)),
this.progressBarSeekData=null,v("_pointerUpHandler dragTime:"+i+" currentTime:"+this.video.currentTime),
setTimeout(function(){
t.__onTouch=!1,t.__forcePause=!1,t.isEnd()||(t.showLoading(),t.play(i),t._seekReport());
},0),this.__hideControllTimeout();
},
_seekReport:function(){
var e=this.opt,t=e.extinfo;
t&&u.report({
step:13,
vid:t.vid,
hit_bizuin:t.hit_bizuin,
hit_vid:t.hit_vid,
traceid:t.pageplayer._getTraceId(),
orderid:t.pageplayer._getOrderid(),
ori_status:t.pageplayer._getOriStatus(),
type:e.videoReportType,
fromid:t.pageplayer._getFromid()
});
},
_hidePlayControllBar:function(){
var e=this.container.find(".js_video_pause_controll");
e.hide();
},
_showPlayControllBar:function(){
var e=this.container.find(".js_video_pause_controll");
this.isEnd()||(this.hideControllBar(),e.show(),this.container.find(".js_video_play_controll").hide());
},
_addSerialTimeupdate:function(){
var e=this.video.currentTime,t=this._g.serialTimeupdateCache.length;
e>0&&(0==t||this._g.serialTimeupdateCache[t-1].currentTime!=e)&&(this._g.serialTimeupdateCache.length>=this._g.timeupdateCacheCount&&this._g.serialTimeupdateCache.shift(),
this._g.serialTimeupdateCache.push({
currentTime:e,
timeStamp:+new Date
}));
},
_checkPlayBySerialTimeupdate:function(){
if(this._g.serialTimeupdateCache.length<this._g.timeupdateCacheCount)return!1;
var e=this._g.serialTimeupdateCache.length,t=this._g.serialTimeupdateCache[e-1],i=this._g.serialTimeupdateCache[e-this._g.timeupdateCacheCount];
return t.timeStamp-i.timeStamp<3e3?!0:!1;
},
_showPlayer:function(){
var e=this.container.find(".js_page_video");
e.show();
},
_hidePlayer:function(){
var e=this.container.find(".js_page_video");
e.hide();
},
__setPlayTime:function(e){
this.container.find(".js_now_play_time").text(T(e));
},
__setControllBar:function(e){
e=Math.ceil(100*e),0>e&&(e=0),e>100&&(e=100);
this.video,this.duration;
this.__setBufferBar(e),e+="%";
var t=this.container;
t.find(".js_played_bar").css({
width:e
}),t.find(".js_played_speed_cnt").css({
left:e
});
},
__setForwardBar:function(e){
var t=this.container,i=(this.video,this.__getDuration()),n=e/i;
t.find(".js_forward").css("display","block"),t.find(".total_time").text(T(i)),t.find(".js_forward_bar").css("width",100*n+"%"),
t.find(".js_forward_play_time").text(T(e));
},
__setBufferBar:function(e){
var t=this.container,i=this.video,n=this.__getDuration(),a=i.currentTime;
e=e||a/n;
var o=e;
i.buffered&&i.buffered.length>0&&i.buffered.end&&n&&(o=i.buffered.end(0)/n,o=Math.max(e,Math.ceil(parseInt(100*o))),
o>98&&(o=100)),t.find(".js_buffer_bar").css({
width:o+"%"
});
},
__resetVideo:function(){
this.$video.remove();
var e=this.container,t=e.find(".js_video_poster");
t.append("<video></video>");
{
var i=this.$video=t.find("video");
this.video=i[0];
}
this.__canplay=!1,this.__forcePause=!1,this.__initVideo(),this.__bindVideoEvent();
},
_trigger:function(e,t){
var i=this;
if("play"==e){
if(i.__forcePause=!1,i._trigger("userplay"),_.broadcastMessage({
type:"broadcastPlay",
data:{
id:this.id
}
}),window.parent.originalVideoAdFrames&&0!=window.parent.originalVideoAdFrames.length)for(var n=0;n<window.parent.originalVideoAdFrames.length;n++)window.parent.originalVideoAdFrames[n].contentWindow.postMessage({
action:"pauseAd",
value:""
},"*");
h.postMessage(window.parent,"onVideoPlayV2",{
vid:c.getQuery("vid")
});
}
var a=this.plugins,o=this._blockPlugin[e]||this._blockPlugin.all,r=0;
if(o&&"function"==typeof o.recv&&(r|=o.recv(e,t),1&r))return!1;
for(var n=0,s=a.length;s>n&&(r|=a[n].recv(e,t),!(2&r));++n);
if(!(this._blockInnerHandler||4&r)){
var d=this["__"+e+"Handler"];
d&&d.call(this,t);
}
8&r||this.__triggerOutside(e,t);
},
_setBlockInnerHandler:function(e){
this._blockInnerHandler=e;
},
_setBlockPlugin:function(e,t){
this._blockPlugin[e]=t;
},
_getContainer:function(){
return this.container;
},
_setCover:function(e,t){
this.container.find(".js_poster_cover").css(t),this.opt.cover=e;
},
_removeCover:function(e){
var e=e||{
"background-image":"none"
};
this.container.find(".js_poster_cover").css(e);
},
_afterReplay:function(){
this.__hasBeginPlay=!0,this.showLoading(),this.play();
},
setSrc:function(e,t){
var i=this,n=this.$video,a=(this.opt,this.video);
this.src=e,i.__initData(),i.__initVideo(),this.showCover(),i.log.loadwait_start=+new Date,
n.attr("src",e),a.preload=t||"metadata",a.load(),this.__setPlayTime(0),n.on("loadedmetadata",function(){
if(i.__videoDurationchange(),i.__playQueue&&i.__playQueue.length>0){
var e=i.__playQueue[0].sec;
i.__playQueue=[],i.play(e);
}
}),a.duration>0&&1!=a.duration&&i.__videoDurationchange();
},
replay:function(){
d.os.android;
var e=this.opt.extinfo;
e&&u.report({
step:9,
vid:e.vid,
hit_bizuin:e.hit_bizuin,
hit_vid:e.hit_vid,
traceid:e.pageplayer._getTraceId(),
orderid:e.pageplayer._getOrderid(),
ori_status:e.pageplayer._getOriStatus(),
type:this.opt.videoReportType,
fromid:e.pageplayer._getFromid()
}),this._trigger("replay");
},
resetVideo:function(){
this.container.find(".js_video_poster").hide(),this.showCover(),this.__resetVideo(),
this._trigger("loading"),this.__hasBeginPlay=!0;
},
changeStatus:function(e){
var t=this._g;
if(t.statusDefine[e.status]&&(!e.subStatus||t.subStatusDefine[e.subStatus]||"error"===e.status)&&(t.status!==e.status||t.subStatus!==e.subStatus)){
var i=t.status,n=t.subStatus;
t.status=e.status,t.subStatus=e.subStatus,v("statusChange, preStatus:"+i+"; status:"+t.status+"; preSubStatus:"+n+"; subStatus:"+t.subStatus),
_.broadcastMessage({
type:"statusChange",
data:{
id:this.id,
preStatus:i,
preSubStatus:n,
status:t.status,
subStatus:t.subStatus
}
}),("seeked"===t.subStatus||"seeking"===t.subStatus)&&this._trigger(t.subStatus,{
currentTime:this.video.currentTime
});
}
},
play:function(e){
var t=this.video,i=this;
if(!i.isEnd()){
if(!t||0==t.readyState)return void(this.__playQueue[0]={
sec:e
});
e*=1;
try{
if(isNaN(e)||"number"!=typeof e)i.__canplay&&i.isPause()||0==t.currentTime?t.play():t.currentTime=0;else{
var n=this.__getDuration();
e>=n&&(e=n-1),0>e&&(e=0),e=1*(1*e).toFixed(4),i.__last_playtime=e,i.__setPlayTime(e),
t.currentTime==e?t.play():t.currentTime=e;
}
}catch(a){
0==t.currentTime?t.play():t.currentTime=0;
}
}
},
pause:function(){
var e=this.video;
e&&0==e.readyState||(this.__replaySec=null,this.waitingHandlerTimer&&(clearTimeout(this.waitingHandlerTimer),
this.waitingHandlerTimer=null),e.pause(),v(this.id+":pause function"));
},
enterFullScreen:function(){
var e=this.video;
e.requestFullscreen?(e.requestFullscreen(),this.__isInFullScreen=!0):e.mozRequestFullScreen?(e.mozRequestFullScreen(),
this.__isInFullScreen=!0):e.webkitRequestFullscreen?(e.webkitRequestFullscreen(),
this.__isInFullScreen=!0):e.webkitEnterFullscreen&&(e.webkitEnterFullscreen(),this.__isInFullScreen=!0);
},
exitFullScreen:function(){
this.video;
this.hideLoading(),document.webkitExitFullscreen&&document.webkitExitFullscreen(),
this.__isInFullScreen=!1;
},
isInFullScreen:function(){
return!!this.__isInFullScreen;
},
play4outer:function(e){
this.__forcePause=!1,this.play(e),this._trigger("userplay"),this._hidePlayControllBar();
},
pause4outer:function(){
this.__forcePause=!0,this.hideLoading(),this.pause(),this._trigger("userpause"),
this.hideControllBar(!0),this._showPlayControllBar();
},
setWidth:function(e){
this.container.find(".js_page_video").css({
width:e
});
},
setHeight:function(e){
this.container.find(".js_page_video").css({
height:e
});
},
showCover:function(){
this.container.find(".js_poster_cover").show();
},
hideCover:function(){
this.container.find(".js_poster_cover").hide();
},
showFuncControllBar:function(){
var e=this.container.find(".js_progress_bar,.js_full_screen_control");
e.show(),this.__hasFuncControllBar=!0;
},
hideFuncControllBar:function(){
var e=this.container.find(".js_progress_bar,.js_full_screen_control");
e.hide(),this.__hasFuncControllBar=!1;
},
showControllBar:function(){
this.__touchVideoTimeoutHandler&&clearTimeout(this.__touchVideoTimeoutHandler),this.__timerHideControll&&(clearTimeout(this.__timerHideControll),
this.__timerHideControll=null),this.container.find(".js_controll").removeClass("opr_fade_out").show();
},
hideControllBar:function(e){
var t=this.container.find(".js_controll");
t.removeClass("opr_fade_in");
var i=this;
i.__timerHideControll&&clearTimeout(i.__timerHideControll);
var e=!1;
e?t.hide():(t.addClass("opr_fade_out"),i.__timerHideControll=setTimeout(function(){
t.hide();
},500));
},
showLoading:function(e){
var t=this;
this.__always_hide_loading||this.__isshowLoading&&this.video&&this.video.currentTime>1||(this.__isshowLoading=!0,
this._g.resetShowingLoadingTimeoutId&&(clearTimeout(this._g.resetShowingLoadingTimeoutId),
this._g.resetShowingLoadingTimeoutId=null),this._g.resetShowingLoadingTimeoutId=window.setTimeout(function(){
t.__isshowLoading=!1;
},1e3),"firstTime"==e&&this.container.find(".js_loading").addClass("start_loading"),
this.container.find(".js_loading").show());
},
hideLoading:function(){
this.container.find(".js_loading").hasClass("start_loading")&&this.container.find(".js_loading").removeClass("start_loading"),
this.container.find(".js_loading").hide();
},
triggerMuted:function(e){
e?(this.video.muted=!0,this.video.setAttribute("muted",!0),this.container.find(".js_muted_btn").addClass("muting")):(this.video.muted=!1,
this.video.removeAttribute("muted"),this.container.find(".js_muted_btn").removeClass("muting"));
},
setVideoCSS:function(e){
var t=this,i=t.container,n=i.find(".js_page_video");
n.css(e);
},
hasFullScreen:function(){
return this.isInFullScreen();
},
hasDrag:function(){
return!!this.__has_drag;
},
getCurTime:function(){
return this.video.currentTime;
},
getEndDom:function(){
return this.container.find(".js_end_dom");
},
getDrag:function(){
return this.__dragTimes;
},
getPlayTotalTime:function(){
return this.__endCountTime(),this.__play_total_time;
},
getLog:function(){
var e=this.log||{};
return{
hasended:e.hasended,
last_ms:Math.floor(1e3*(e.lastsec||0)),
duration_ms:Math.floor(1e3*(e.duration||0)),
video_error:e.video_error||0,
video_error_code:e.video_error_code||0,
loadwait:e.loadwait||0
};
},
isPlay:function(){
return!this.video.paused&&!this.isEnd();
},
isPause:function(){
return!!this.video.paused;
},
isEnd:function(){
return!!this.video.ended;
},
hasBeginPlay:function(){
return this.__hasBeginPlay;
},
destroy:function(){
_.removeListener({
type:"broadcastPlay",
func:this._event.broadcastPlay
});
try{
delete p._players[this.id];
}catch(e){}
p.visibilityPausePlayer===this&&(p.visibilityPausePlayer=null);
}
}),S._getFormatTime=T,S;
});define("a/tpl/mpda_bottom_tpl.html.js",[],function(){
return'<div class="rich_media_extra">\n    <div class="weui-loadmore weui-loadmore_line mod_title_context_primary mpad_more_container">\n        <span class="weui-loadmore__tips js_ad_opt_list_btn_0">Ad<!--投诉入口 begin-->\n            <div class="mpad_more js_mpad_more">\n                <ul class="mpad_more_list js_ad_opt_list js_ad_opt_list_0" style="display:none">\n                    <li class="mpad_more_list_ele">\n                        <a class="mpad_more_list_ele_container js_complain_btn_0" href="javascript:;">Report</a>\n                    </li>\n                </ul>\n            </div>\n            <!--投诉入口 end--> \n        </span>\n    </div>\n    <!--广告插入位置-->\n    <#=adTpl#>\n</div>';
});define("a/tpl/crt_size_map.js",["a/a_config.js","biz_wap/utils/ajax.js","a/a_sign.js","biz_common/utils/url/parse.js","a/tpl/new_cpc_tpl.html.js","a/tpl/sponsor_tpl.html.js","a/tpl/banner_tpl.html.js","a/tpl/cardticket_tpl.html.js","a/tpl/info_tpl.html.js","a/tpl/smallcard_tpl.html.js","a/tpl/promote_tpl.html.js","a/tpl/banner_info_tpl.html.js","a/tpl/smallbanner_info_tpl.html.js","a/tpl/smallbanner_msg_tpl.html.js"],function(t){
"use strict";
function a(t){
t.biz_info.is_subscribed?(t.btn_text="View",window.__addIdKeyReport&&window.__addIdKeyReport(24729,65,1)):window.__addIdKeyReport&&window.__addIdKeyReport(24729,64,1);
}
var e=t("a/a_config.js"),p=t("biz_wap/utils/ajax.js"),_=t("a/a_sign.js"),n=t("biz_common/utils/url/parse.js");
return{
484:{
tpl:t("a/tpl/new_cpc_tpl.html.js"),
renderData:{
isVideo:!1,
superscript:!0
}
},
996:{
tpl:t("a/tpl/sponsor_tpl.html.js"),
renderData:{
has_banner:!1,
has_desc:!0
}
},
997:{
tpl:t("a/tpl/sponsor_tpl.html.js"),
renderData:{
has_banner:!1,
has_desc:!0
}
},
998:{
multiLogic:[{
selection:{
pos_type:e.AD_POS.POS_SPONSOR
},
tpl:t("a/tpl/sponsor_tpl.html.js"),
renderData:{
has_banner:!0,
has_desc:!0
}
},{
selection:{
pos_type:e.AD_POS.POS_BOTTOM
},
tpl:t("a/tpl/banner_tpl.html.js")
}]
},
135:{
multiLogic:[{
selection:{
pos_type:e.AD_POS.POS_BOTTOM,
product_type:e.AD_TYPE.CARD_PRODUCT_TYPE
},
tpl:t("a/tpl/cardticket_tpl.html.js"),
paramsPreHandler:function(t){
return t.title=t.card_info.card_title,t.avatar=t.card_info.card_logo_url,t.desc=t.card_info.card_brand_name,
t;
}
},{
selection:{
pos_type:e.AD_POS.POS_BOTTOM,
product_type:e.AD_TYPE.ADD_CONTACT_PRODUCT_TYPE
},
tpl:t("a/tpl/info_tpl.html.js"),
paramsPreHandler:function(t){
return t.title=t.avatarTitle,t.desc=t.hint_txt,a(t),t;
},
renderData:{
isWxapp:!1
}
}]
},
267:{
tpl:t("a/tpl/smallcard_tpl.html.js"),
paramsPreHandler:function(t){
return t.title=t.mp_shop_info.name,t.avatar=t.mp_shop_info.img,t.priceBefore=parseInt(t.mp_shop_info.ori_price/100),
t.price=parseInt(t.mp_shop_info.cur_price/100),t;
}
},
133:{
tpl:t("a/tpl/banner_tpl.html.js")
},
420:{
tpl:t("a/tpl/banner_tpl.html.js")
},
134:{
tpl:t("a/tpl/promote_tpl.html.js"),
paramsAlias:{
title:"hint_txt",
desc:"ad_desc",
avatar:"image_url"
}
},
538:{
tpl:t("a/tpl/new_cpc_tpl.html.js"),
renderData:{
isVideo:!0,
tag_pos:-1,
price:!1,
superscript:!1
},
paramsAlias:{
title:"avatarTitle"
}
},
567:{
tpl:t("a/tpl/banner_tpl.html.js")
},
354:{
tpl:t("a/tpl/banner_info_tpl.html.js"),
paramsAlias:{
banner:"image_url"
},
paramsPreHandler:function(t){
return t.hint_txt&&(t.desc=t.hint_txt.split("|")[0],t.suply_desc=t.hint_txt.split("|")[1]||""),
t.product_type==e.AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?(t.title=t.avatarTitle,t.size=t.app_info.app_size):(t.product_type==e.AD_TYPE.ANDROID_APP_PRODUCT_TYPE||t.product_type==e.AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(t.title=t.app_info.app_name,
t.size=t.app_info.app_size,"Open App"==t.btn_text&&(t.btn_text="Enter")),t;
}
},
117:{
tpl:t("a/tpl/smallbanner_info_tpl.html.js"),
paramsAlias:{
banner:"image_url"
},
paramsPreHandler:function(t){
return t.product_type==e.AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?t.title=t.avatarTitle:(t.product_type==e.AD_TYPE.ANDROID_APP_PRODUCT_TYPE||t.product_type==e.AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(t.title=t.app_info.app_name,
"Open App"==t.btn_text&&(t.btn_text="Enter")),a(t),t;
}
},
355:{
tpl:t("a/tpl/smallbanner_info_tpl.html.js"),
paramsAlias:{
banner:"image_url"
},
paramsPreHandler:function(t){
return t.product_type==e.AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?t.title=t.avatarTitle:(t.product_type==e.AD_TYPE.ANDROID_APP_PRODUCT_TYPE||t.product_type==e.AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(t.title=t.app_info.app_name,
"Open App"==t.btn_text&&(t.btn_text="Enter")),a(t),t;
}
},
568:{
tpl:t("a/tpl/smallbanner_info_tpl.html.js"),
paramsAlias:{
banner:"image_url"
},
paramsPreHandler:function(t){
return t.product_type==e.AD_TYPE.ADD_CONTACT_PRODUCT_TYPE?t.title=t.avatarTitle:(t.product_type==e.AD_TYPE.ANDROID_APP_PRODUCT_TYPE||t.product_type==e.AD_TYPE.IOS_APP_PRODUCT_TYPE)&&(t.title=t.app_info.app_name,
"Open App"==t.btn_text&&(t.btn_text="Enter")),a(t),t;
}
},
677:{
tpl:t("a/tpl/smallbanner_msg_tpl.html.js"),
paramsPreHandler:function(t){
var a=t.shop_image;
return t.shop_image.length>0&&(a=a[0]),t.banner=a.image_url,t.title=t.hint_txt,t.tags=a.mp_tags,
t;
}
},
708:{
tpl:t("a/tpl/new_cpc_tpl.html.js"),
paramsPreHandler:function(t){
return t.isVideo=!1,t.price="",t.tag_pos="",t.superscript="",a(t),t;
},
afterRender:function(t,a){
function e(){
i.style.display="none";
}
if(a){
var i=a.getElementsByClassName("js_mpad_cpc_ft_msg_contact")[0];
i&&setTimeout(function(){
_.createSign({
beforeSign:["aid="+t.aid,"appid="+t.biz_appid,"pass_ticket="+window.pass_ticket,"pos_type="+t.pos_type,"sn="+window.sn,"user_uin="+window.user_uin].join("&"),
timeout:2e3
},function(a,_,r,l){
p({
url:n.join("/mp/getappmsgad",{
action:"getbizext",
ad_sign_data:a,
ad_sign_k1:_,
ad_sign_k2:r,
ad_sign_md5:l,
pos_type:t.pos_type,
aid:t.aid,
pass_ticket:encodeURIComponent(window.pass_ticket)
},!0),
type:"POST",
notEncode:!0,
data:{
sn:window.sn,
appmsgid:window.appmsgid,
idx:window.idx,
appid:t.biz_appid,
__biz:window.biz,
mid:window.mid,
send_time:window.send_time||""
},
success:function(t){
try{
t=JSON.parse(t);
}catch(a){
return void e();
}
if(!t.biz_info)return void e();
var p=i.getElementsByTagName("span")[0],_=i.getElementsByTagName("span")[1],n=t.biz_info.original_cnt>=10?t.biz_info.original_cnt+"篇原创文章":"",r=t.biz_info.comm_sub_cnt>0?t.biz_info.comm_sub_cnt+"位朋友关注":"";
n?(p.innerHTML=n,_.innerHTML=r):r?p.innerHTML=r:t.biz_info.signature?p.innerHTML=t.biz_info.signature:e();
},
error:function(){
e();
}
});
});
},1e3);
}
}
}
};
});define("biz_wap/jsapi/cardticket.js",["biz_wap/jsapi/core.js"],function(e){
"use strict";
var c=e("biz_wap/jsapi/core.js"),r={
openCardDetail:function(e){
function r(){
c.invoke("openCardDetail",{
card_id:e.card_id,
card_ext:e.card_ext
},function(c){
"open_card_detail:fail"==c.err_msg||"open_card_detail:ok"==c.err_msg||"open_card_detail:cancel"==c.err_msg?e.success&&e.success(c):c.err_msg.indexOf("function_not_exist")>=0?e.function_not_exist&&e.function_not_exist():"system:access_denied"==c.err_msg?e.access_denied&&e.access_denied("openCardDetail"):e.error&&e.error(c);
});
}
function n(){
c.invoke("batchAddCard",{
card_list:[{
card_id:e.card_id,
card_ext:e.card_ext
}]
},function(c){
"batch_add_card:ok"==c.err_msg||"batch_add_card:fail"==c.err_msg||"batch_add_card:cancel"==c.err_msg?e.success&&e.success(c):c.err_msg.indexOf("function_not_exist")>=0?r():"system:access_denied"==c.err_msg?e.access_denied&&e.access_denied("batchAddCard"):e.error&&e.error(c);
});
}
n();
},
supportCardDetail:function(e){
c.invoke("openCardDetail",{
card_id:"err_id"
},function(c){
e.callback(c.err_msg.indexOf("function_not_exist")>=0?!1:!0);
});
},
openCard:function(e){
c.invoke("batchViewCard",{
cardList:[{
cardId:e.cardId,
code:e.code
}]
},function(c){
c.err_msg.indexOf("function_not_exist")>=0?e.function_not_exist&&e.function_not_exist():e.success&&e.success(c);
});
}
};
return r;
});!function(n){
"use strict";
function t(n,t){
var r=(65535&n)+(65535&t),u=(n>>16)+(t>>16)+(r>>16);
return u<<16|65535&r;
}
function r(n,t){
return n<<t|n>>>32-t;
}
function u(n,u,e,o,c,f){
return t(r(t(t(u,n),t(o,f)),c),e);
}
function e(n,t,r,e,o,c,f){
return u(t&r|~t&e,n,t,o,c,f);
}
function o(n,t,r,e,o,c,f){
return u(t&e|r&~e,n,t,o,c,f);
}
function c(n,t,r,e,o,c,f){
return u(t^r^e,n,t,o,c,f);
}
function f(n,t,r,e,o,c,f){
return u(r^(t|~e),n,t,o,c,f);
}
function i(n,r){
n[r>>5]|=128<<r%32,n[(r+64>>>9<<4)+14]=r;
var u,i,h,a,g,l=1732584193,d=-271733879,v=-1732584194,C=271733878;
for(u=0;u<n.length;u+=16)i=l,h=d,a=v,g=C,l=e(l,d,v,C,n[u],7,-680876936),C=e(C,l,d,v,n[u+1],12,-389564586),
v=e(v,C,l,d,n[u+2],17,606105819),d=e(d,v,C,l,n[u+3],22,-1044525330),l=e(l,d,v,C,n[u+4],7,-176418897),
C=e(C,l,d,v,n[u+5],12,1200080426),v=e(v,C,l,d,n[u+6],17,-1473231341),d=e(d,v,C,l,n[u+7],22,-45705983),
l=e(l,d,v,C,n[u+8],7,1770035416),C=e(C,l,d,v,n[u+9],12,-1958414417),v=e(v,C,l,d,n[u+10],17,-42063),
d=e(d,v,C,l,n[u+11],22,-1990404162),l=e(l,d,v,C,n[u+12],7,1804603682),C=e(C,l,d,v,n[u+13],12,-40341101),
v=e(v,C,l,d,n[u+14],17,-1502002290),d=e(d,v,C,l,n[u+15],22,1236535329),l=o(l,d,v,C,n[u+1],5,-165796510),
C=o(C,l,d,v,n[u+6],9,-1069501632),v=o(v,C,l,d,n[u+11],14,643717713),d=o(d,v,C,l,n[u],20,-373897302),
l=o(l,d,v,C,n[u+5],5,-701558691),C=o(C,l,d,v,n[u+10],9,38016083),v=o(v,C,l,d,n[u+15],14,-660478335),
d=o(d,v,C,l,n[u+4],20,-405537848),l=o(l,d,v,C,n[u+9],5,568446438),C=o(C,l,d,v,n[u+14],9,-1019803690),
v=o(v,C,l,d,n[u+3],14,-187363961),d=o(d,v,C,l,n[u+8],20,1163531501),l=o(l,d,v,C,n[u+13],5,-1444681467),
C=o(C,l,d,v,n[u+2],9,-51403784),v=o(v,C,l,d,n[u+7],14,1735328473),d=o(d,v,C,l,n[u+12],20,-1926607734),
l=c(l,d,v,C,n[u+5],4,-378558),C=c(C,l,d,v,n[u+8],11,-2022574463),v=c(v,C,l,d,n[u+11],16,1839030562),
d=c(d,v,C,l,n[u+14],23,-35309556),l=c(l,d,v,C,n[u+1],4,-1530992060),C=c(C,l,d,v,n[u+4],11,1272893353),
v=c(v,C,l,d,n[u+7],16,-155497632),d=c(d,v,C,l,n[u+10],23,-1094730640),l=c(l,d,v,C,n[u+13],4,681279174),
C=c(C,l,d,v,n[u],11,-358537222),v=c(v,C,l,d,n[u+3],16,-722521979),d=c(d,v,C,l,n[u+6],23,76029189),
l=c(l,d,v,C,n[u+9],4,-640364487),C=c(C,l,d,v,n[u+12],11,-421815835),v=c(v,C,l,d,n[u+15],16,530742520),
d=c(d,v,C,l,n[u+2],23,-995338651),l=f(l,d,v,C,n[u],6,-198630844),C=f(C,l,d,v,n[u+7],10,1126891415),
v=f(v,C,l,d,n[u+14],15,-1416354905),d=f(d,v,C,l,n[u+5],21,-57434055),l=f(l,d,v,C,n[u+12],6,1700485571),
C=f(C,l,d,v,n[u+3],10,-1894986606),v=f(v,C,l,d,n[u+10],15,-1051523),d=f(d,v,C,l,n[u+1],21,-2054922799),
l=f(l,d,v,C,n[u+8],6,1873313359),C=f(C,l,d,v,n[u+15],10,-30611744),v=f(v,C,l,d,n[u+6],15,-1560198380),
d=f(d,v,C,l,n[u+13],21,1309151649),l=f(l,d,v,C,n[u+4],6,-145523070),C=f(C,l,d,v,n[u+11],10,-1120210379),
v=f(v,C,l,d,n[u+2],15,718787259),d=f(d,v,C,l,n[u+9],21,-343485551),l=t(l,i),d=t(d,h),
v=t(v,a),C=t(C,g);
return[l,d,v,C];
}
function h(n){
var t,r="";
for(t=0;t<32*n.length;t+=8)r+=String.fromCharCode(n[t>>5]>>>t%32&255);
return r;
}
function a(n){
var t,r=[];
for(r[(n.length>>2)-1]=void 0,t=0;t<r.length;t+=1)r[t]=0;
for(t=0;t<8*n.length;t+=8)r[t>>5]|=(255&n.charCodeAt(t/8))<<t%32;
return r;
}
function g(n){
return h(i(a(n),8*n.length));
}
function l(n,t){
var r,u,e=a(n),o=[],c=[];
for(o[15]=c[15]=void 0,e.length>16&&(e=i(e,8*n.length)),r=0;16>r;r+=1)o[r]=909522486^e[r],
c[r]=1549556828^e[r];
return u=i(o.concat(a(t)),512+8*t.length),h(i(c.concat(u),640));
}
function d(n){
var t,r,u="0123456789abcdef",e="";
for(r=0;r<n.length;r+=1)t=n.charCodeAt(r),e+=u.charAt(t>>>4&15)+u.charAt(15&t);
return e;
}
function v(n){
return unescape(encodeURIComponent(n));
}
function C(n){
return g(v(n));
}
function s(n){
return d(C(n));
}
function A(n,t){
return l(v(n),v(t));
}
function m(n,t){
return d(A(n,t));
}
n.md5=function(n,t,r){
return t?r?A(t,n):m(t,n):r?C(n):s(n);
};
}("function"==typeof jQuery?jQuery:this);