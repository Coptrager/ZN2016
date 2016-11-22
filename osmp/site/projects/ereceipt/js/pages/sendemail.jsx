"use strict";System.register(["jsx!pages/#email","vo/receipt","payment"],function(t,e){function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function o(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var r,s,a,c,u,p;return{setters:[function(t){r=t["default"]},function(t){s=t["default"]},function(t){a=t["default"]}],execute:function(){c=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),u=function e(t,i,n){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,i);if(void 0===o){var r=Object.getPrototypeOf(t);return null===r?void 0:e(r,i,n)}if("value"in o)return o.value;var s=o.get;if(void 0!==s)return s.call(n)},p=function(t){function e(t){i(this,e);var o=n(this,Object.getPrototypeOf(e).call(this,t||"sendemail"));return o.timeout=6e4,o.logo="../projects/ereceipt/img/logo.png",o}return o(e,t),c(e,[{key:"onShow",value:function(){var t=this;u(Object.getPrototypeOf(e.prototype),"onShow",this).call(this);try{this.receipt=new s(JSON.parse(this.storage.get("ident_adv_counter"))),this.sendMasked=!1,this.session.get("previousEmail")&&this.showPopup({type:"question",title:qiwi.i18n("question_email"),message:this.maskEmail(this.session.get("previousEmail")),okHandler:function(){t.statistics.click({button:"send"}),t.email=t.session.get("previousEmail"),t.sendMasked=!0,t.send()},cancelHandler:function(){t.statistics.click({button:"edit"})},okButtonText:qiwi.i18n("question_email_yes"),cancelButtonText:qiwi.i18n("question_email_no")})}catch(i){}}},{key:"maskEmail",value:function(t){var e="";return e=t.substr(0,t.indexOf("@")).length<3?"******"+t.substr(t.indexOf("@"),t.length-1):t.charAt(0)+"******"+t.substr(t.indexOf("@")-1,t.length-1)}},{key:"getReceipt",value:function(){var t=this.receipt.phone?"Совершать платежи вы можете на сайте:\nhttps://qiwi.com/payment.action?utm_source=eticket&utm_medium=email&utm_content=web-qiwi&utm_campaign=1&utm_term="+this.receipt.phone+"\nИ в мобильном приложении:\nhttps://qiwi.com/settings/apps/mobile.action?utm_source=eticket&utm_medium=email&utm_content=mobile-qiwi&utm_campaign=1&utm_term="+this.receipt.phone:"",e=this.receipt.receipt.replace(/<br\/>/g,"\n"),i="cash"==this.receipt.paymentMethod?"Вы можете уточнить статус платежа прямо сейчас на сайте qiwi.com, указав данные из этого письма.":'Вы можете уточнить статус платежа прямо сейчас на сайте qiwi.com в разделе "Отчеты" (https://qiwi.com/report/list.action?type=1).',n=this.receipt.phone&&this.receipt.transactionCode&&this.receipt.transactionDate?"Посмотреть статус платежа:\nhttps://qiwi.com/support/check.action?terminal="+qiwi.terminal.id+"&stringDate="+this.receipt.transactionDate+"&phone="+this.receipt.phone.substr(-10)+"&code="+this.receipt.transactionCode:"";return qiwi.utils.compileTemplate(a.state.receiptTemplate.qw.join("\n"),{payments:t,reciept:e,statusInfo:i,paymentStatus:n})}},{key:"send",value:function(){var t=this;this.subject="Электронная квитанция QIWI",this.request("network.sendmail",{address:this.email,text:this.getReceipt(),subject:this.subject}).done(function(e){t.statistics.page_data({account:t.receipt.account?t.receipt.account:t.receipt.phone,email:t.email}),t.showPopup({type:"attention",title:"Электронная квитанция отправлена на",message:t.sendMasked?t.maskEmail(t.email):t.email,okHandler:function(){return t.performBackward()}})},function(t){throw new qiwi.errors.UserError("Электронная квитанция не отправлена")})}},{key:"disabledForward",value:function(){throw u(Object.getPrototypeOf(e.prototype),"disabledForward",this).call(this),new qiwi.errors.UserError(qiwi.i18n("wrong_email"))}},{key:"performForward",value:function(){this.send()}},{key:"performBackward",value:function(){this.jump("back")}}]),e}(r),t("default",p)}}});