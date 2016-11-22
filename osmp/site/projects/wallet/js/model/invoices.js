"use strict";System.register(["constants/currency"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var Currency,_createClass,Invoices;return{setters:[function(_constantsCurrency){Currency=_constantsCurrency["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Invoices=function(){function Invoices(){_classCallCheck(this,Invoices),this.reset()}return _createClass(Invoices,[{key:"reset",value:function(){this._sourceItems=[],this._selectedItems=[],this._total=0,this._totalCommission=0}},{key:"round",value:function(){this._total=qiwi.utils.round2(this._total),this._totalCommission=qiwi.utils.round2(this._totalCommission)}},{key:"setData",value:function(_ref){var list=_ref.list,rateCalculation=_ref.rateCalculation,currentCurrency=_ref.currentCurrency;this._sourceItems=list,this._selectedItems=[],this._total=0,this._totalCommission=0,this._sourceItems.map(function(item){item.checked=!1,item.currency!=currentCurrency?(item.toPay=rateCalculation(item.amount_lk,currentCurrency,item.currency),item.commission=rateCalculation(item.amount_lk-item.amount,currentCurrency,item.currency)):(item.toPay=item.amount_lk,item.commission=item.amount_lk-item.amount),item.toPayCurrencyText=Currency.getCurrency(currentCurrency)}),1==this._sourceItems.length&&(this._sourceItems[0].checked=!0,this.selectedItems=[this._sourceItems[0]]),this.round()}},{key:"all",get:function(){return this._sourceItems||[]}},{key:"total",get:function(){return this._total}},{key:"totalCommission",get:function(){return this._totalCommission}},{key:"selectedItems",get:function(){return this._selectedItems},set:function(value){var _this=this;this._selectedItems=value.filter(function(item){return item.checked}),this._sourceItems=value,this._total=0,this._totalCommission=0,this._selectedItems.map(function(item){_this._total+=item.toPay,_this._totalCommission+=qiwi.utils.round2(item.commission)}),this.round()}}]),Invoices}(),_export("default",new Invoices)}}});