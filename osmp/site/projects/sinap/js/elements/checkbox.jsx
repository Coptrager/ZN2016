"use strict";System.register(["jsx!elements/button"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var Button,_createClass,_React,Component,CheckBox;return{setters:[function(_jsxElementsButton){Button=_jsxElementsButton["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_React=React,Component=_React.Component,CheckBox=function(_Component){function CheckBox(){return _classCallCheck(this,CheckBox),_possibleConstructorReturn(this,Object.getPrototypeOf(CheckBox).apply(this,arguments))}return _inherits(CheckBox,_Component),_createClass(CheckBox,[{key:"render",value:function(){var _props=this.props,text=_props.text,_props$enabled=_props.enabled,enabled=void 0===_props$enabled?!1:_props$enabled,onClick=_props.onClick;return React.createElement(Button,{className:"checkbox",text:text,icon:{name:"switch_"+(enabled?"on":"off"),path:"icons/",projectSpecific:!0,canBeLight:!0},width:null,onClick:onClick})}}]),CheckBox}(Component),_export("default",CheckBox)}}});