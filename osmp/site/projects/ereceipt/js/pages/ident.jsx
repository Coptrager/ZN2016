"use strict";System.register(["jsx!pages/page"],function(t,e){function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var i,u,c,a;return{setters:[function(t){i=t["default"]}],execute:function(){u=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),c=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,r)}if("value"in o)return o.value;var u=o.get;if(void 0!==u)return u.call(r)},a=function(t){function e(){n(this,e);var t=r(this,Object.getPrototypeOf(e).call(this,"ident"));return t._confirmExit=!1,t.timeout=1e4,t}return o(e,t),u(e,[{key:"onShow",value:function(){c(Object.getPrototypeOf(e.prototype),"onShow",this).call(this),this.updateNavigation(!1),this.exit({url:"./index.html?identification"})}},{key:"createClass",value:function(){var t=this;return this.loadElements().then(function(){return c(Object.getPrototypeOf(e.prototype),"createClass",t).call(t,{render:function(){return React.createElement("div",null)}})})}}]),e}(i),t("default",a)}}});