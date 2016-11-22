"use strict";System.register(["jsx!pages/page","jsx!elements/pageHeader","jsx!elements/field","jsx!elements/keyboard","jsx!elements/emailSuggest"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var Page,PageHeader,Textfield,Keyboard,EmailSuggest,_createClass,_get,_class;return{setters:[function(_jsxPagesPage){Page=_jsxPagesPage["default"]},function(_jsxElementsPageHeader){PageHeader=_jsxElementsPageHeader["default"]},function(_jsxElementsField){Textfield=_jsxElementsField["default"]},function(_jsxElementsKeyboard){Keyboard=_jsxElementsKeyboard["default"]},function(_jsxElementsEmailSuggest){EmailSuggest=_jsxElementsEmailSuggest["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},_class=function(_Page){function _class(name){_classCallCheck(this,_class);var _this=_possibleConstructorReturn(this,Object.getPrototypeOf(_class).call(this,name));return _this.email="",_this.timeout=6e4,_this}return _inherits(_class,_Page),_createClass(_class,[{key:"onShow",value:function(){_get(Object.getPrototypeOf(_class.prototype),"onShow",this).call(this),this.email="",this.update(),this.updateNavigation({nextButton:{enabled:!1}})}},{key:"selectSuggest",value:function(value){this.statistics.click({suggest:"email"}),this.email=value,this.validate(),this.update()}},{key:"validate",value:function(){/.+@.+\..+/.test(this.email)?this.updateNavigation({nextButton:{enabled:!0}}):this.updateNavigation({nextButton:{enabled:!1}})}},{key:"updateField",value:function(data){null===data?this.email=this.email.slice(0,-1):""===data?this.email=data:this.email+=data,this.validate(),this.update()}},{key:"createClass",value:function(){return _get(Object.getPrototypeOf(_class.prototype),"createClass",this).call(this,{render:function(){var _this2=this;return React.createElement("div",{id:"email-page"},React.createElement(PageHeader,{title:this.props.title,subtitle:this.props.subtitle}),React.createElement(Textfield,{onEraseClick:function(){return _this2.props.update(null)},text:this.props.email,width:"1100",eraseWidth:"145"}),React.createElement(EmailSuggest,{current:this.props.email,onSelectSuggest:function(value){return _this2.props.suggest(value)}}),React.createElement(Keyboard,{onClick:function(code){return _this2.props.update(code)},onEraseAll:function(){return _this2.props.update("")},specialKeyboard:{layout:[["0","1","2","3","4","5","6","7","8","9"],["q","w","e","r","t","y","u","i","o","p","_","@"],["a","s","d","f","g","h","j","k","l","."],["z","x","c","v","b","n","m","-"]],shift:"@bc"},showOptions:{alwaysCaps:!0}}))}})}},{key:"props",get:function(){var _this3=this;return{email:this.email,title:qiwi.i18n("email_page.title"),subtitle:qiwi.i18n("email_page.subtitle"),update:function(data){return _this3.updateField(data)},suggest:function(value){return _this3.selectSuggest(value)}}}}]),_class}(Page),_export("default",_class)}}});