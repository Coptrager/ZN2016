"use strict";System.register(["jsx!pages/page","stores/payment","stores/provider","stores/transaction","stores/receipt","model/user","terminal","jsx!elements/pageHeader","jsx!elements/moneyItem"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var Page,Payment,Provider,Transaction,Receipt,User,Terminal,PageHeader,MoneyItem,_createClass,_get,_class;return{setters:[function(_jsxPagesPage){Page=_jsxPagesPage["default"]},function(_storesPayment){Payment=_storesPayment["default"]},function(_storesProvider){Provider=_storesProvider["default"]},function(_storesTransaction){Transaction=_storesTransaction["default"]},function(_storesReceipt){Receipt=_storesReceipt["default"]},function(_modelUser){User=_modelUser["default"]},function(_terminal){Terminal=_terminal["default"]},function(_jsxElementsPageHeader){PageHeader=_jsxElementsPageHeader["default"]},function(_jsxElementsMoneyItem){MoneyItem=_jsxElementsMoneyItem["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_class=function(_Page){function _class(){return _classCallCheck(this,_class),_possibleConstructorReturn(this,Object.getPrototypeOf(_class).apply(this,arguments))}return _inherits(_class,_Page),_createClass(_class,[{key:"onShow",value:function(){var _this2=this;return _get(Object.getPrototypeOf(_class.prototype),"onShow",this).call(this).then(function(){return _this2.update()})}},{key:"requestPayment",value:function(){return this.request("wallet.balance-payment",{trm_id:qiwi.terminal.id,version:qiwi.application.toString(),login:"7"+User.login.src,pin:User.pin,ccy_from:643,ccy_to:643,amount:Payment.sum.user||Payment.getExtra("sum").value,prv_id:Payment.getExtra("id").value,account:Payment.getExtra("acc").value,extras:Payment.qwExtras.filter(function(ext){return"id"!=ext.name&&"acc"!=ext.name&&"transaction-number"!=ext.name&&"client-software"!=ext.name&&"sum"!=ext.name&&"commission"!=ext.name}).map(function(extra){return"<extra name='"+extra.name+"'>"+extra.value+"</extra>"}).join(""),transaction_number:Transaction.syncId})}},{key:"performForward",value:function(){var _this3=this;return this.requestPayment().then(function(result){if(0==result.response.data.errorCode)return Transaction.id=result.response.data.txnId,result.response.data.status>=50&&result.response.data.status<=100?(Transaction.status=Transaction.STATUS.FULL,_this3.sendReceipt().then(function(){return _this3.jump("final")})):_this3.forward();throw new qiwi.errors.UserError(result.response.data.errorMessage)},function(error){throw new qiwi.errors.UserError(error.message)}).done()}},{key:"sendReceipt",value:function(){return this.statistics.money({balance:Payment.sum.payment,to_provider:Payment.sum.user}),Terminal.send(Terminal.REQUEST,[{name:"PrvId",value:Provider.id},{name:"AccNum",value:Payment.account},{name:"AccountMask",value:"NNNNXXXXXNN"},{name:"PrvName",value:Payment.scheme===Payment.SCHEME.QD?Provider.fullName:"Visa QIWI Wallet"}].concat(Receipt.printed.map(function(ext){return{name:ext.name,value:ext.value}})).concat([{name:"PrintCheck",value:"true"}]))}},{key:"createClass",value:function(){return _get(Object.getPrototypeOf(_class.prototype),"createClass",this).call(this,{render:function(){var _props=this.props,providerName=_props.providerName,userBalance=_props.userBalance,paySum=_props.paySum,commissSum=_props.commissSum,userSum=_props.userSum;return React.createElement("div",{className:"balance-payment-page"},React.createElement(PageHeader,{provider:providerName,title:qiwi.i18n("balancePaymentPage.title")}),React.createElement("div",{className:"items"},React.createElement(MoneyItem,{label:qiwi.i18n("balancePaymentPage.balance"),value:userBalance}),React.createElement(MoneyItem,{label:qiwi.i18n("balancePaymentPage.pay_summ"),value:paySum}),React.createElement(MoneyItem,{label:qiwi.i18n("balancePaymentPage.user_summ"),value:userSum}),React.createElement(MoneyItem,{label:qiwi.i18n("balancePaymentPage.commiss_summ"),value:commissSum})))}})}},{key:"props",get:function(){return{userBalance:User.getBalanceByCode(643,qiwi.i18n("currency.rub.short")),paySum:""+qiwi.utils.toSum(Payment.sum.payment)+qiwi.i18n("currency.rub.suffix"),userSum:""+qiwi.utils.toSum(Payment.sum.user)+qiwi.i18n("currency.rub.suffix"),commissSum:""+qiwi.utils.toSum(Payment.sum.qwFee)+qiwi.i18n("currency.rub.suffix"),providerName:Provider.fullName}}}]),_class}(Page),_export("default",_class)}}});