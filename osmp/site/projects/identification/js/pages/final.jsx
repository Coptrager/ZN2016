"use strict";System.register(["jsx!pages/page"],function(t,e){function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function r(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o,a,s,c,u;return{setters:[function(t){o=t["default"]}],execute:function(){a=function(){function t(t,e){var i=[],n=!0,r=!1,o=void 0;try{for(var a,s=t[Symbol.iterator]();!(n=(a=s.next()).done)&&(i.push(a.value),!e||i.length!==e);n=!0);}catch(c){r=!0,o=c}finally{try{!n&&s["return"]&&s["return"]()}finally{if(r)throw o}}return i}return function(e,i){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),s=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),c=function e(t,i,n){null===t&&(t=Function.prototype);var r=Object.getOwnPropertyDescriptor(t,i);if(void 0===r){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,i,n)}if("value"in r)return r.value;var a=r.get;if(void 0!==a)return a.call(n)},u=function(t){function e(){i(this,e);var t=n(this,Object.getPrototypeOf(e).call(this,"final"));return t._confirmExit=!1,t.success=!0,t.validationNeeded=!0,t.timeout=2e4,t}return r(e,t),s(e,[{key:"onShow",value:function(){c(Object.getPrototypeOf(e.prototype),"onShow",this).call(this),this.validationNeeded=!this.session.get("identification").verified,this.title=this.session.get("identification").title,this.description=qiwi.i18n("final_description"),this.success=null!=this.session.get("identification").title,this.update(),this.updateNavigation({nextButton:{visible:!1},prevButton:{visible:!1}})}},{key:"createClass",value:function(){var t=this;return this.loadElements(["textimage"]).then(function(i){var n=a(i,1),r=n[0];return c(Object.getPrototypeOf(e.prototype),"createClass",t).call(t,{getDefaultProps:function(){return{validationNeeded:!1,success:!1,page:{}}},render:function(){var t=this.props.validationNeeded;return React.createElement("div",{id:"final-page"},React.createElement("img",{className:"qiwi",src:"img/qiwi_big.png"}),this.props.success?React.createElement(r,{className:"success",img:"img/icons/ok.png",text:this.props.page.title,margin:"20"}):null,React.createElement(r,{img:"../projects/identification/img/ok_mark.png",text:this.props.page.description,margin:"20"}),React.createElement(r,{img:"../projects/identification/img/"+(t?"warning":"ok_mark")+".png",text:t?"Ваш статус Стандарт (требует подтверждения данных)":"Ваш статус Стандарт",margin:"20"}))}})})}},{key:"state",get:function(){return{success:this.success,validationNeeded:this.validationNeeded,page:{description:this.description,title:this.title}}}}]),e}(o),t("default",u)}}});