"use strict";System.register(["stores/payment","stores/provider","stores/receipt","stores/transaction","commissions","model/commissions","model/formatters"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var Payment,Provider,Receipt,Transaction,OldCommissions,Commissions,PhoneFormatter,_createClass,State;return{setters:[function(_storesPayment){Payment=_storesPayment["default"]},function(_storesProvider){Provider=_storesProvider["default"]},function(_storesReceipt){Receipt=_storesReceipt["default"]},function(_storesTransaction){Transaction=_storesTransaction["default"]},function(_commissions){OldCommissions=_commissions["default"]},function(_modelCommissions){Commissions=_modelCommissions.Commissions},function(_modelFormatters){PhoneFormatter=_modelFormatters.PhoneFormatter}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),State=function(){function State(){_classCallCheck(this,State),this.receiptTemplate=""}return _createClass(State,[{key:"logo",get:function(){return Provider.logo},set:function(value){Provider.logo=value}},{key:"provider",get:function(){return{get id(){return Provider.id},set id(value){Provider.id=value},get name(){return Provider.shortName},set name(value){Provider.shortName=value},get fullName(){return Provider.fullName},set fullName(value){Provider.fullName=value}}},set:function(value){var id=value.id,name=value.name,fullName=value.fullName;Provider.id=id||Provider.id,Provider.shortName=name||Provider.shortName,Provider.fullName=fullName||Provider.fullName}},{key:"minSum",get:function(){return Provider.limit().min},set:function(value){value=Payment.commissions.reverseSum(value),Provider.limits={min:value,max:Provider.limit().max,currency:Provider.limit().currency}}},{key:"maxSum",get:function(){return Provider.limit().max},set:function(value){Provider.limits={min:Provider.limit().min,max:value,currency:Provider.limit().currency}}},{key:"account",get:function(){return Payment.account},set:function(value){Payment.account=value}},{key:"statusText",set:function(value){Transaction.text=value}},{key:"transNumber",get:function(){return Transaction.number},set:function(value){Transaction.number=value}},{key:"startParam",get:function(){return Provider.startParam},set:function(value){Provider.startParam=value}},{key:"needIdent",set:function(value){Provider.identificationRequired=value}},{key:"balancePayment",get:function(){return{get txnId(){return Transaction.id},set txnId(value){Transaction.id=value}}}},{key:"insertMoney",get:function(){return{set status(value){Transaction.status=value},get subscriptionFeeValue(){return Transaction.subscriptionFee},set subscriptionFeeValue(value){Transaction.subscriptionFee=value},get txn_id(){return Transaction.id},get cash(){return Transaction.cash},get pay(){return Transaction.pay},get commiss(){return Transaction.commiss},get changeSumm(){return Transaction.change.user},get changeCommiss(){return Transaction.change.agentFee}}}},{key:"qwExtras",get:function(){return Payment.qwExtras},set:function(value){value&&value.forEach(function(extra){return Payment.addExtra(extra,!0)})}},{key:"formattedAccount",set:function(_){Payment.accountFormatter=new PhoneFormatter},get:function(){return Payment.formattedAccount}},{key:"fixSum",get:function(){return{get sum(){return Payment.sum.payment},set sum(value){Payment._sum.user=value-(Payment.sum.qwFee||0)},get qdCommission(){return Payment.sum.agentFee},set qdCommission(value){Payment._sum.agentFee=value},get qwCommission(){return Payment.sum.qwFee},get changeId(){return Payment.change.id},get changeName(){return Payment.change.fullName},set changeAccount(value){return Payment.updateChange({account:value})}}}},{key:"qwCommissions",get:function(){return Payment.commissions},set:function(value){value instanceof OldCommissions&&(value=new Commissions({ranges:value._profiles},!0)),Payment.commissions=value}},{key:"change",get:function(){return{get wallet(){return{get id(){return Provider.walletId},set id(value){return Provider.walletId=value}}}}}},{key:"paymentMethod",get:function(){return Payment.method},set:function(value){Payment.method=value}},{key:"subscriptionFee",get:function(){return Transaction.subscriptionFeeEnabled},set:function(value){Transaction.subscriptionFeeEnabled=value}},{key:"paymentSchema",set:function(value){Payment.scheme=value}},{key:"currency",get:function(){return Provider.currency}},{key:"checkPaymentStatus",get:function(){return Transaction.checkPaymentStatus},set:function(value){Transaction.checkPaymentStatus=value}},{key:"successReceipt",get:function(){return Receipt.printed},set:function(value){value&&(Receipt.printed=function(){return value})}},{key:"failReceipt",get:function(){return Receipt.printedFail},set:function(value){value&&(Receipt.printedFail=function(){return value})}},{key:"ereceipt",get:function(){return Receipt.virtual},set:function(value){value&&(Receipt.virtual=function(){return value})}},{key:"ereceiptCompiler",set:function(fn){Receipt.customECompiler=function(virtualFn){return fn({ereceipt:virtualFn(),paymentMethod:Payment.method,formattedAccount:Payment.formattedAccount,account:Payment.account,insertMoney:{txn_id:Transaction.id,cash:Transaction.cash,pay:Transaction.pay,commiss:Transaction.commission,subscriptionFeeValue:Transaction.subscriptionFee,changeSumm:Transaction.change.user,changeCommiss:Transaction.change.agentFee},fixSum:{sum:Payment.sum.payment,changeName:Payment.change.fullName},successReceipt:[{value:Receipt.printed.map(function(_ref){var value=_ref.value;return value.replace(/<br>/,"\n")}).join("\n")}],subscriptionFee:Transaction.subscriptionFeeEnabled})}}}]),State}(),_export("default",new(function(){function _class(){_classCallCheck(this,_class),this.state=new State}return _createClass(_class,[{key:"init",value:function(payment,receipt){this.defaultReceipt=receipt||this.defaultReceipt||"",this.state.qwCommissionsSource=payment&&payment.qwCommission,this.state.receiptTemplate=receipt,Receipt.template=receipt}},{key:"resetState",value:function(){Payment.reset(),this.init()}},{key:"getExtra",value:function(name){return Payment.getExtra(name)}},{key:"setExtra",value:function(extra){return Payment.addExtra(extra)}},{key:"removeExtra",value:function(name){return Payment.removeExtra(name)}},{key:"generateTransNumber",value:function(){return Transaction.syncId}},{key:"setQwSumAndCommiss",value:function(sum){return Payment.updateSum(sum)}},{key:"prepareExtras",value:function(){}},{key:"prepareReceipt",value:function(_ref2){var data=_ref2.data;return Receipt.commonData=Object.assign(Receipt.commonData||{},data),null}},{key:"prepareEReceipt",value:function(){}},{key:"schemas",get:function(){return{QD:"qd",QW_ONLINE:"qw_online",QW_OFFLINE:"qw_offline"}}}]),_class}()))}}});