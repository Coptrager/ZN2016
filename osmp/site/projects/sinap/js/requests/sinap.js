"use strict";System.register(["terminal","model/user","statistics"],function(_export,_context){function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}var Terminal,User,Statistics,_createClass,Sinap;return{setters:[function(_terminal){Terminal=_terminal["default"]},function(_modelUser){User=_modelUser["default"]},function(_statistics){Statistics=_statistics["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),Sinap=function(){function Sinap(type){switch(_classCallCheck(this,Sinap),this.type=type,type){case"refs":this.url=function(_ref){var id=_ref.id;return"refs/"+id+"/containers"};break;case"validations":this.url=function(_ref2){var qw=_ref2.qw;return"terms/"+qw+"/validations"};break;case"payments":this.url=function(_ref3){var qw=_ref3.qw;return"terms/"+qw+"/payments"};break;case"sendConfirm":this.url=function(_ref4){var payment=_ref4.payment;return"payments/"+payment+"/confirm"};break;case"resendConfirm":this.url=function(_ref5){var payment=_ref5.payment;return"payments/"+payment+"/resendConfirmationSMS"}}}return _createClass(Sinap,[{key:"send",value:function(opts){var _this=this,extras=arguments.length<=1||void 0===arguments[1]?{}:arguments[1],_opts$phone=opts.phone,phone=void 0===_opts$phone?User.login.src:_opts$phone,_opts$pin=opts.pin,pin=void 0===_opts$pin?User.pin:_opts$pin;extras.fields&&qiwi.utils.defaults(extras,{sum:{amount:"0",currency:"643"},id:"-1",source:"cash"});var request={path:this.url(opts),method:"POST",headers:{Authorization:"Kiosk "+btoa([qiwi.terminal.id,"7"+phone,pin].join(":")),"User-Agent":qiwi.application.toString(),"Content-Type":"application/json"},request:extras};return Terminal.send("sinap.request",JSON.stringify(request),"sinap.response",null,9e4).then(function(_ref6){var _ref6$sinapResponse=_ref6["sinap.response"],data=void 0===_ref6$sinapResponse?{}:_ref6$sinapResponse;try{var _JSON$parse=JSON.parse(data),transporterrorcode=_JSON$parse.transporterrorcode,httperrorcode=_JSON$parse.httperrorcode,_JSON$parse$response=_JSON$parse.response,response=void 0===_JSON$parse$response?{}:_JSON$parse$response;switch(transporterrorcode){case 0:switch(httperrorcode){case 0:case 200:if(!response.code&&!response.message)return Promise.resolve(response);default:return Promise.reject({code:response.code||httperrorcode||-1,title:qiwi.i18n("errors.default"),message:response.message||qiwi.i18n("requests.transport")})}default:return Promise.reject({code:600,title:qiwi.i18n("requests.timeout"),message:qiwi.i18n("errors.timeoutDescription")})}}catch(e){return Promise.reject({code:-1,title:qiwi.i18n("requests.transport"),message:qiwi.i18n("errors.timeoutDescription")})}}).interpose(function(result){return Statistics.online({request:"sinap."+_this.type,result:0})},function(fail){return Statistics.online({request:"sinap."+_this.type,result:fail.code})})}}]),Sinap}(),_export("default",Sinap)}}});