"use strict";System.register([],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _createClass;return{setters:[],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_export("default",new(function(){function Session(){_classCallCheck(this,Session),this._session={}}return _createClass(Session,[{key:"get",value:function(name){return this._session[name]}},{key:"set",value:function(name,value){this._session[name]=value}},{key:"remove",value:function(name){this._session[name]&&delete this._session[name]}}]),Session}()))}}});