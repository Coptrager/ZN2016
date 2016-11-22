"use strict";function _classCallCheck(a,b){if(!(a instanceof b))throw new TypeError("Cannot call a class as a function")}function _inherits(a,b){if("function"!=typeof b&&null!==b)throw new TypeError("Super expression must either be null or a function, not "+typeof b);a.prototype=Object.create(b&&b.prototype,{constructor:{value:a,enumerable:!1,writable:!0,configurable:!0}}),b&&(Object.setPrototypeOf?Object.setPrototypeOf(a,b):a.__proto__=b)}var _slicedToArray=function(){function a(a,b){var c=[],d=!0,e=!1,f=void 0;try{for(var g,h=a[Symbol.iterator]();!(d=(g=h.next()).done)&&(c.push(g.value),!b||c.length!==b);d=!0);}catch(i){e=!0,f=i}finally{try{!d&&h["return"]&&h["return"]()}finally{if(e)throw f}}return c}return function(b,c){if(Array.isArray(b))return b;if(Symbol.iterator in Object(b))return a(b,c);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function a(a,b){for(var c=0;c<b.length;c++){var d=b[c];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(a,d.key,d)}}return function(b,c,d){return c&&a(b.prototype,c),d&&a(b,d),b}}(),_get=function(a,b,c){for(var d=!0;d;){var e=a,f=b,g=c;h=j=i=void 0,d=!1,null===e&&(e=Function.prototype);var h=Object.getOwnPropertyDescriptor(e,f);if(void 0!==h){if("value"in h)return h.value;var i=h.get;return void 0===i?void 0:i.call(g)}var j=Object.getPrototypeOf(e);if(null===j)return void 0;a=j,b=f,c=g,d=!0}};define("../../projects/transpayments/js/pages/_phone",["jsx!pages/page"],function(a){var b=function(a){function b(){_classCallCheck(this,b),_get(Object.getPrototypeOf(b.prototype),"constructor",this).call(this,"_phone")}return _inherits(b,a),_createClass(b,[{key:"onShow",value:function(){_get(Object.getPrototypeOf(b.prototype),"onShow",this).call(this),this.setLogo(this.session.get("regProvider").logo?"../img/ui_item/"+this.session.get("regProvider").logo:"../projects/transpayments/img/logo.png"),this.phone=this.session.get("phone")?this.session.get("phone"):"",this.provider=this.session.get("regProvider").shortName,this.updateField(this.session.get("phone")?this.session.get("phone"):"",!0),this.update()}},{key:"performForward",value:function(){var a=this;this.request("wallet.bean-get-identification-status-terminal",{phone:"7"+this.phone,trm_id:qiwi.terminal.id,version:qiwi.application.toString(),urls:["https://facecontrol.qiwi.com/proxy"],headers:{"X-Proxy-Url":"qw_internal_xml"},message:qiwi.i18n("phone_page.load_message"),title:qiwi.i18n("phone_page.load_title")}).done(function(b){a.session.set("phone",a.phone),a.session.set("maskedPhone",qiwi.utils.mask(a.phone,"+7(***)-***-**-**")),a.session.set("user_profile",b.response.bodyXml),a.showPreloader({title:qiwi.i18n("phone_page.load_title"),message:qiwi.i18n("phone_page.identification_message"),type:"load"});var c=setInterval(function(){clearInterval(c),a.hidePreloader(),a.forward()},1e3)},function(b){a.session.set("phone",a.phone),a.session.set("maskedPhone",qiwi.utils.mask(a.phone,"+7(***)***-**-**")),a.showPreloader({title:qiwi.i18n("phone_page.load_title"),message:qiwi.i18n("phone_page.identification_message"),type:"load"});var c=setInterval(function(){clearInterval(c),a.hidePreloader(),a.forward()},1e3)})}},{key:"updateField",value:function(a,b){if(void 0===this.phone||null===a||void 0!=this.phone&&this.phone.length<10){null===a?this.phone=this.phone.slice(0,-1):""===a?this.phone=a:b?this.phone=a:this.phone+=a;var c=10==this.phone.length;this.updateNavigation({nextButton:{enabled:c}}),this.update()}}},{key:"createClass",value:function(){var a=this;return this.loadElements(["field","numpad"]).then(function(c){var d=_slicedToArray(c,2),e=d[0],f=d[1];return _get(Object.getPrototypeOf(b.prototype),"createClass",a).call(a,{render:function(){var a=this.props.context;return React.createElement("div",{id:"phone-page"},React.createElement("div",{className:"header"},React.createElement("div",{className:"provider"},this.props.provider),React.createElement("div",{className:"header"},qiwi.i18n("phone_page.title"))),React.createElement(e,{onEraseClick:function(){return a.updateField(null)},text:this.props.phone,width:"870",mask:{inner:"+7(***)***-**-**",shown:"+7(XXX)XXX-XX-XX"},eraseWidth:"133"}),React.createElement(f,{onClick:function(b){return a.updateField(b)}}))}})})}},{key:"state",get:function(){return{phone:this.phone,provider:this.provider}}}]),b}(a);return b});