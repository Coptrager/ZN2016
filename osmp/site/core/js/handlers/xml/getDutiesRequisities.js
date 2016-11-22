"use strict";System.register(["handlers/xml/baseXml","constants/errorCodes"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var BaseXml,ErrorCodes,_createClass,_get,GetDutiesRequisities;return{setters:[function(_handlersXmlBaseXml){BaseXml=_handlersXmlBaseXml["default"]},function(_constantsErrorCodes){ErrorCodes=_constantsErrorCodes["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},GetDutiesRequisities=function(_BaseXml){function GetDutiesRequisities(){return _classCallCheck(this,GetDutiesRequisities),_possibleConstructorReturn(this,Object.getPrototypeOf(GetDutiesRequisities).apply(this,arguments))}return _inherits(GetDutiesRequisities,_BaseXml),_createClass(GetDutiesRequisities,[{key:"parse",value:function(xml){if(_get(Object.getPrototypeOf(GetDutiesRequisities.prototype),"parse",this).call(this,xml),0==this.result.errorCode){var info=this.filterData("/response/infos/info"),actual=info.iterateNext();this.result.info={to_name_f:actual.attributes.to_name_f.textContent,cre:actual.attributes.cre.textContent,kpp:actual.attributes.kpp.textContent,okato:actual.attributes.okato.textContent,subdivision:actual.attributes.subdivision.textContent,rec_bik:actual.attributes.rec_bik.textContent,inn:actual.attributes.inn.textContent,online:actual.attributes.online.textContent,to_bank:actual.attributes.to_bank.textContent,kbk:actual.attributes.kbk.textContent}}return this.result}}]),GetDutiesRequisities}(BaseXml),_export("default",new GetDutiesRequisities)}}});