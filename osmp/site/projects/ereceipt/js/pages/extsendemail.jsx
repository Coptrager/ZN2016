"use strict";System.register(["jsx!pages/sendemail","payment"],function(t,e){function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function i(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o,c,a,u,p;return{setters:[function(t){o=t["default"]},function(t){c=t["default"]}],execute:function(){a=function(){function t(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,n,r){return n&&t(e.prototype,n),r&&t(e,r),e}}(),u=function e(t,n,r){null===t&&(t=Function.prototype);var i=Object.getOwnPropertyDescriptor(t,n);if(void 0===i){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,n,r)}if("value"in i)return i.value;var c=i.get;if(void 0!==c)return c.call(r)},p=function(t){function e(){return n(this,e),r(this,Object.getPrototypeOf(e).call(this,"extsendemail"))}return i(e,t),a(e,[{key:"onShow",value:function(){u(Object.getPrototypeOf(e.prototype),"onShow",this).call(this),this.updateNavigation({prevButton:{visible:!1}})}},{key:"getReceipt",value:function(){this.receipt.phone=this.receipt.phone||this.receipt.account,this.receipt.transactionDate=(new Date).toLocaleFormat("%d.%m.%Y");var t=this.receipt.phone&&this.receipt.transactionCode&&this.receipt.transactionDate?"Посмотреть статус платежа:\nhttps://qiwi.com/support/check.action?terminal="+qiwi.terminal.id+"&stringDate="+this.receipt.transactionDate+"&phone="+this.receipt.phone.substr(-10)+"&code="+this.receipt.transactionCode:"";return qiwi.utils.compileTemplate(c.state.receiptTemplate.qd.join("\n"),{reciept:this.receipt.receipt.replace(/<br\/>/g,"\n"),paymentStatus:t})}},{key:"performBackward",value:function(){this.exit()}}]),e}(o),t("default",p)}}});