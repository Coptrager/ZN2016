"use strict";System.register([],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var _slicedToArray,_createClass,_class;return{setters:[],execute:function(){_slicedToArray=function(){function sliceIterator(arr,i){var _arr=[],_n=!0,_d=!1,_e=void 0;try{for(var _s,_i=arr[Symbol.iterator]();!(_n=(_s=_i.next()).done)&&(_arr.push(_s.value),!i||_arr.length!==i);_n=!0);}catch(err){_d=!0,_e=err}finally{try{!_n&&_i["return"]&&_i["return"]()}finally{if(_d)throw _e}}return _arr}return function(arr,i){if(Array.isArray(arr))return arr;if(Symbol.iterator in Object(arr))return sliceIterator(arr,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_class=function(){function _class(){_classCallCheck(this,_class)}return _createClass(_class,[{key:"getRequestKind",value:function(type){return type.split(".")[0]}},{key:"getRequestType",value:function(type){return type.split(".")[1]}},{key:"send",value:function(type,params){var _this=this;return qiwi.utils.require("requests/"+this.getRequestKind(type)).then(function(_ref){var _ref2=_slicedToArray(_ref,1),ConcreteRequest=_ref2[0],req=new ConcreteRequest(_this.getRequestType(type));return req.send(params)})}}]),_class}(),_export("default",_class)}}});