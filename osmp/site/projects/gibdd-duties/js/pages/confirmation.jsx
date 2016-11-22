"use strict";function _classCallCheck(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function _inherits(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var _slicedToArray=function(){function t(t,e){var i=[],r=!0,n=!1,a=void 0;try{for(var s,o=t[Symbol.iterator]();!(r=(s=o.next()).done)&&(i.push(s.value),!e||i.length!==e);r=!0);}catch(m){n=!0,a=m}finally{try{!r&&o["return"]&&o["return"]()}finally{if(n)throw a}}return i}return function(e,i){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function t(t,e){for(var i=0;i<e.length;i++){var r=e[i];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}return function(e,i,r){return i&&t(e.prototype,i),r&&t(e,r),e}}(),_get=function t(e,i,r){null===e&&(e=Function.prototype);var n=Object.getOwnPropertyDescriptor(e,i);if(void 0===n){var a=Object.getPrototypeOf(e);return null===a?void 0:t(a,i,r)}if("value"in n)return n.value;var s=n.get;if(void 0!==s)return s.call(r)};define(["jsx!pages/page","payment","model/user","jsx!elements/textWithLink","../model/gibddDuty","terminal"],function(t,e,i,r,n,a){var s=function(t){function s(){return _classCallCheck(this,s),_possibleConstructorReturn(this,Object.getPrototypeOf(s).call(this,"confirmation"))}return _inherits(s,t),_createClass(s,[{key:"onShow",value:function(){var t=this;_get(Object.getPrototypeOf(s.prototype),"onShow",this).call(this),this.setLogo(e.state.logo),this.showPreloader(),e.state.fixSum.qdCommission=0,a.send("GetReverseCommissFrom",JSON.stringify({prvId:Number(e.state.provider.id),summ:e.state.fixSum.qwCommission+Number(n.extras.main.sum)}),"ReverseCommissFromResult").then(function(a){"cash"==e.state.paymentMethod&&(e.state.fixSum.qdCommission=Number(a.ReverseCommissFromResult)),t.total=Number(n.extras.main.sum)+Number(e.state.fixSum.qwCommission)+Number(e.state.fixSum.qdCommission);var s=0;if(s="cash"==e.state.paymentMethod?Math.min(e.state.maxSum,i.limits.spendLimitTotal-i.limits.spendLimitUsed):i.limits.spendLimitTotal-i.limits.spendLimitUsed,t.total>s)throw new qiwi.errors.UserError(qiwi.i18n("confirmation.limitsError"),-1,function(){return t.exit()});e.state.account=i.login.src,e.state.formattedAccount=i.login.formatted,e.state.minSum=Number(n.extras.main.sum)+Number(e.state.fixSum.qwCommission),e.state.qwExtras=e.state.qwExtras.concat([{name:"id",value:n.extras.main.id},{name:"acc",value:i.login.src},{name:"sum",value:n.extras.main.sum},{name:"commission",value:e.state.fixSum.qwCommission},{name:"date",value:(new Date).toLocaleFormat("%Y%m%d")},{name:"client-software",value:qiwi.application.toString()},{name:"transaction-number",value:e.generateTransNumber()},{name:"recipient_id",value:i.login.src},{name:"comment",value:n.duty.comment?[n.duty.description,n.duty.comment.split("\n")].join(", "):n.duty.description}]),e.state.qwExtras=e.state.qwExtras.concat(Object.keys(n.extras.fio).map(function(t){return{name:t,value:n.extras.fio[t]}})),e.state.qwExtras=e.state.qwExtras.concat(Object.keys(n.extras.address).map(function(t){return{name:t,value:n.extras.address[t]}})),e.state.qwExtras=e.state.qwExtras.concat(Object.keys(n.extras.passport).map(function(t){return{name:t,value:n.extras.passport[t]}})),e.state.qwExtras=e.state.qwExtras.concat(Object.keys(n.extras.info).map(function(t){return{name:t,value:n.extras.info[t]}})),e.setExtra({name:"comment",value:qiwi.application.toString()}),e.prepareExtras();var o=qiwi.utils.extend({},{termid:qiwi.terminal.id,name:n.userFIO,operation_code:e.getExtra("transaction-number",!0).value,address:n.userAddress,price:qiwi.utils.toSum(Number(n.extras.main.sum))+" руб.",total:qiwi.utils.toSum(Number(n.extras.main.sum)+Number(e.state.fixSum.qwCommission))+" руб.",commission:qiwi.utils.toSum(Number(e.state.fixSum.qwCommission))+" руб."},n.extras.info,{description:[n.duty.description,n.duty.comment].join("\n")});e.state.successReceipt=e.prepareReceipt({template:e.state.receiptTemplate.successReceipt,data:o}),e.state.ereceipt=e.prepareEReceipt({template:e.state.receiptTemplate.successReceipt,data:o}),e.state.failReceipt=e.prepareReceipt({template:e.state.receiptTemplate.failReceipt,data:{}}),t.confirmItems=[{title:qiwi.i18n("confirmation.items.phone"),text:i.login.formatted},{title:qiwi.i18n("confirmation.items.dutyName"),text:[n.duty.description,n.duty.comment].join("\n")},{title:qiwi.i18n("confirmation.items.dutyPrice"),text:qiwi.utils.toSum(n.extras.main.sum)+" руб."},{title:qiwi.i18n("confirmation.items.divisionName"),text:n.division.name},{title:qiwi.i18n("confirmation.items.fio"),text:n.userFIO},{title:qiwi.i18n("confirmation.items.address"),text:n.userAddress},{title:qiwi.i18n("confirmation.items.total.title"),text:React.createElement(r,{className:"offertus",message:qiwi.utils.compileTemplate(qiwi.i18n("confirmation.items.total.text"),{sum:qiwi.utils.toSum(t.total)}),link:function(){return t.showPopup({type:"info",title:qiwi.i18n("confirmation.info.title"),message:"cash"==e.state.paymentMethod?qiwi.utils.compileTemplate(qiwi.i18n("confirmation.info.message.qw"),{sum:qiwi.utils.toSum(e.state.fixSum.qwCommission)})+"\n"+qiwi.utils.compileTemplate(qiwi.i18n("confirmation.info.message.qd"),{sum:qiwi.utils.toSum(e.state.fixSum.qdCommission)}):qiwi.utils.compileTemplate(qiwi.i18n("confirmation.info.message.qw"),{sum:qiwi.utils.toSum(e.state.fixSum.qwCommission)})})}})}],t.hidePreloader(),t.update()})["catch"](function(e){return new qiwi.errors.UserError(qiwi.i18n("confirmation.limitsError"),-2,function(){return t.exit()})}).done()}},{key:"createClass",value:function(){var t=this;return this.loadElements(["pageHeader","confirmationPayment","textWithLink"]).then(function(e){var i=_slicedToArray(e,3),r=i[0],n=i[1],a=i[2];return _get(Object.getPrototypeOf(s.prototype),"createClass",t).call(t,{render:function(){return React.createElement("div",{className:"confirmation-page"},React.createElement(r,{provider:this.props.providerName,title:qiwi.i18n("confirmation.title")}),React.createElement(n,{items:this.props.confirmItems}),React.createElement(a,{className:"offertus",message:qiwi.i18n("confirmation.oferta_text"),link:this.props.openOffertus}))}})})}},{key:"state",get:function(){var t=this;return{providerName:e.state.provider.fullName,confirmItems:this.confirmItems,openOffertus:function(){return t.jump("offertus")}}}}]),s}(t);return s});