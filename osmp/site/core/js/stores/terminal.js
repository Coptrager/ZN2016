"use strict";System.register(["terminal"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var terminal,_createClass;return{setters:[function(_terminal){terminal=_terminal["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_export("default",new(function(){function _class(){_classCallCheck(this,_class),this.max=15e3,this.id=null,this.supportPhone=""}return _createClass(_class,[{key:"init",value:function(){var _this=this;terminal.send("SetFakeEmbedMode","true"),terminal.send("GetTermID","true","TermID").then(function(_ref){var TermID=_ref.TermID;return qiwi.terminal.id=_this.id=TermID}),terminal.send("GetTermInfo","true","TermInfo").then(function(_ref2){var TermInfo=_ref2.TermInfo;return _this.supportPhone=(TermInfo.match(/<osmp-general-phone>(.*)<\/osmp-general-phone>/)||[])[1]})}}]),_class}()))}}});