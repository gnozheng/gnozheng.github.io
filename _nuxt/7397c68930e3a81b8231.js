(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{445:function(e,t,n){"use strict";n.r(t);var o=n(77),s={name:"authentication",layout:"blank",beforeMount:function(){var e=this;setTimeout(function(){e.getAccessToken()},5e3)},methods:{getAccessToken:function(){var e=this,t=this.$route.query,n=t.code,s=t.state,c=Object(o.a)(),i=c.accessToken,a=c.accessUserURL,l=i.url,u=i.params;s&&this.$axios.$post(l,u(n,s)).then(function(t){console.log(t);var n=t.access_token;e.getAccessUser(a(n))}).catch(function(e){console.log(e)})},getAccessUser:function(e){var t=this;this.$axios.get(e).then(function(e){console.log(e),localStorage.setItem("user",JSON.stringify(e.data)),t.closeWindow()}).catch(function(e){console.log(e)})},closeWindow:function(){window.opener=null,window.open("","_self"),window.close()}}},c=n(1),i=Object(c.a)(s,function(){var e=this.$createElement;return(this._self._c||e)("div",{staticClass:"o_authenticating"},[this._v("正在认证登录...")])},[],!1,null,null,null);i.options.__file="github.vue";t.default=i.exports}}]);