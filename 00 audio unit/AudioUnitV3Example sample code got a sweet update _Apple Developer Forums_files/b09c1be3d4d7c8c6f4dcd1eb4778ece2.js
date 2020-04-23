goog.provide("jive.shared.token.jiveToken");jive.shared.token.jiveToken=function(opt_data,opt_sb){var output=opt_sb||new soy.StringBuilder;output.append(opt_data.isForm?'<input type="hidden" name="jive.token.name" value="'+soy.$$escapeHtml(opt_data.name)+'"/><input type="hidden" name="'+soy.$$escapeHtml(opt_data.name)+'"'+(opt_data.tokenGUID?' value="'+soy.$$escapeHtml(opt_data.tokenGUID)+'"':"")+"/>":soy.$$escapeHtml(opt_data.tokenGUID));return opt_sb?"":output.toString()};
;
goog.provide("jive.googleoidc.login.form");
jive.googleoidc.login.form=function(opt_data,opt_sb){var output=opt_sb||new soy.StringBuilder;output.append('<form action="',soy.$$filterNoAutoescape(jive.soy.func.buildUrl(window._jive_base_url,opt_data.data.actionURL)),'" method="post" >');jive.shared.token.jiveToken({tokenGUID:opt_data.data.jiveTokenGUID,name:opt_data.data.jiveTokenName,isForm:true},output);output.append('<input type="hidden" name="code" value="',soy.$$escapeHtml(opt_data.data.code),'" /></form>');return opt_sb?"":output.toString()};
;
jive.namespace("GoogleOidcLogin");jive.GoogleOidcLogin.Main=jive.oo.Class.extend(function(a){a.init=function(c){var b=this;b.options=c};this.signIn=function(){var b=this;window.location.href="https://accounts.google.com/o/oauth2/auth?scope=email&state="+b.options.jiveTokenGUID+"&response_type=code&redirect_uri="+b.options.redirectURI+"&client_id="+b.options.clientID+"&openid.realm="+b.options.openIDRealm;return true}});define("apps/google_oidc_login/main",function(){return jive.GoogleOidcLogin.Main});
;
goog.provide("jive.googleoidc.login.head");
jive.googleoidc.login.head=function(opt_data,opt_sb){var output=opt_sb||new soy.StringBuilder;jive.shared.soy.resourceInlineJs({code:"$j(function() {require(['apps/google_oidc_login/main'], function(Main) {window.jiveGoogleOidcLogin = new Main({jiveTokenName: \""+soy.$$escapeHtml(opt_data.jiveTokenName)+'", jiveTokenGUID: "'+soy.$$escapeHtml(opt_data.jiveTokenGUID)+'", clientID: "'+soy.$$escapeHtml(opt_data.clientID)+'", openIDRealm: "'+soy.$$escapeHtml(opt_data.openIDRealm)+'", redirectURI: "'+soy.$$escapeHtml(opt_data.redirectURI)+
'"});});});'},output);return opt_sb?"":output.toString()};
;
