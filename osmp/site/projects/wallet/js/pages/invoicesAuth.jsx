"use strict";System.register(["jsx!pages/requiredWalletAuth","model/user","model/appSettings"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var RequiredWalletAuth,User,UAppSettingsser,_createClass,_get,_class;return{setters:[function(_jsxPagesRequiredWalletAuth){RequiredWalletAuth=_jsxPagesRequiredWalletAuth["default"]},function(_modelUser){User=_modelUser["default"]},function(_modelAppSettings){UAppSettingsser=_modelAppSettings["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_class=function(_RequiredWalletAuth){function _class(){_classCallCheck(this,_class);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(_class).call(this,"invoicesAuth"));return _this._confirmExit=!1,_this}return _inherits(_class,_RequiredWalletAuth),_createClass(_class,[{key:"hideModal",value:function(){_get(Object.getPrototypeOf(_class.prototype),"hideModal",this).call(this)}},{key:"onShow",value:function(){var _this2=this;_get(Object.getPrototypeOf(_class.prototype),"onShow",this).call(this);var auth=function(){_this2.checkSimpleAuth().then(function(){_this2.forward()},function(error){_this2.exit()}).done()};User.authorizeState.authorized?(User.reset(),auth()):this.showPopup({title:qiwi.i18n("invoicesPage.startMessageTitle"),message:qiwi.i18n("invoicesPage.startMessageMessage"),type:"attention",okHandler:function(){auth()}})}},{key:"createClass",value:function(){var _this3=this;return this.loadElements().then(function(){return _get(Object.getPrototypeOf(_class.prototype),"createClass",_this3).call(_this3,{render:function(){return React.createElement("div",{id:"invoices-auth-page"})}})})}}]),_class}(RequiredWalletAuth),_export("default",_class)}}});