"use strict";System.register([],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var _createClass,_React,Component,ItunesText;return{setters:[],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_React=React,Component=_React.Component,ItunesText=function(_Component){function ItunesText(){return _classCallCheck(this,ItunesText),_possibleConstructorReturn(this,Object.getPrototypeOf(ItunesText).apply(this,arguments))}return _inherits(ItunesText,_Component),_createClass(ItunesText,[{key:"render",value:function(){var _props=this.props,title=_props.title,children=_props.children,childrenElement=void 0;return childrenElement=children instanceof Array?React.createElement("ol",{className:"child"},children.map(function(child){return React.createElement("li",null,child)})):React.createElement("div",{className:"child"},children),React.createElement("div",{className:"itunes-text"},React.createElement("div",{className:"title"},title),childrenElement)}}]),ItunesText}(Component),_export("default",ItunesText)}}});