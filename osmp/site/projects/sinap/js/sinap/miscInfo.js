"use strict";System.register([],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass,Item,MiscInfo;return{setters:[],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Item=function Item(_ref){var type=_ref.type,value=_ref.value;if(_classCallCheck(this,Item),!type||!value)throw new Error("Некорректное описание miscInfo item ["+type+": "+value+"]");this.type=type,this.value=value},MiscInfo=function(){function MiscInfo(){var items=arguments.length<=0||void 0===arguments[0]?[]:arguments[0];_classCallCheck(this,MiscInfo),this.items=items.map(function(item){return new Item(item)})}return _createClass(MiscInfo,[{key:"info",get:function(){var items=this.items.filter(function(item){return"KioskAuthenticationScreen"===item.type}).map(function(item){return item.value});return items.length?items:null}}]),MiscInfo}(),_export("default",function(config){return new MiscInfo(config)})}}});