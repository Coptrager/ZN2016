"use strict";System.register(["jsx!elements/navigation","jsx!elements/logo","jsx!elements/field","jsx!elements/numpad","jsx!elements/infoBubble","jsx!elements/button","jsx!elements/pageHeader","model/user","requests/request","validators","stores/provider","statistics"],function(_export,_context){var Navigation,Logo,Textfield,Numpad,InfoBubble,Button,PageHeader,User,Request,validators,Provider,statistics,_extends;return{setters:[function(_jsxElementsNavigation){Navigation=_jsxElementsNavigation["default"]},function(_jsxElementsLogo){Logo=_jsxElementsLogo["default"]},function(_jsxElementsField){Textfield=_jsxElementsField["default"]},function(_jsxElementsNumpad){Numpad=_jsxElementsNumpad["default"]},function(_jsxElementsInfoBubble){InfoBubble=_jsxElementsInfoBubble["default"]},function(_jsxElementsButton){Button=_jsxElementsButton["default"]},function(_jsxElementsPageHeader){PageHeader=_jsxElementsPageHeader["default"]},function(_modelUser){User=_modelUser["default"]},function(_requestsRequest){Request=_requestsRequest["default"]},function(_validators){validators=_validators["default"]},function(_storesProvider){Provider=_storesProvider["default"]},function(_statistics){statistics=_statistics["default"]}],execute:function(){_extends=Object.assign||function(target){for(var i=1;i<arguments.length;i++){var source=arguments[i];for(var key in source)Object.prototype.hasOwnProperty.call(source,key)&&(target[key]=source[key])}return target},_export("default",React.createClass({propTypes:{onSuccess:React.PropTypes.func.isRequired,onCancel:React.PropTypes.func.isRequired,needFull:React.PropTypes.bool},getDefaultProps:function(){return{needFull:!1,fields:{login:{name:"login",mask:{inner:"+7(***)***-**-**",shown:"+7(XXX)XXX-XX-XX"},title:qiwi.i18n("loginPage.title"),subtitle:qiwi.i18n("loginPage.subtitle"),requestType:"wallet.check-user-complex",urls:["https://facecontrol.qiwi.com/proxy"],value:"",maxSymbols:10,fieldWidth:815,validator:new validators.PhoneValidator,sideInfo:Provider.sideInfo.phone,loadMessage:qiwi.i18n("loginPage.load_message")},pin:{name:"pin",title:qiwi.i18n("pinPage.title"),subtitle:qiwi.i18n("pinPage.subtitle"),requestType:"wallet.auth-user-with-invoices",value:"",maxSymbols:10,fieldWidth:680,sendPin:!0,secureData:!0,sideInfo:Provider.sideInfo.pin,validator:new validators.PinValidator,loadMessage:qiwi.i18n("pinPage.load_message")},changePin:{name:"changePin",title:qiwi.i18n("changePinPage.title"),subtitle:" ",value:"",maxSymbols:4,fieldWidth:680,secureData:!0,validator:new validators.NewPinValidator,disableMessage:{title:qiwi.i18n("pinPage.generatePin.not_valid_pin_title"),message:qiwi.i18n("pinPage.generatePin.not_valid_pin_message")}},confirmPin:{name:"confirmPin",title:qiwi.i18n("confirmChangePinPage.title"),subtitle:" ",requestType:"wallet.change-pin",value:"",maxSymbols:4,fieldWidth:680,secureData:!0,validator:new validators.ConfirmPinValidator(""),loadMessage:qiwi.i18n("confirmChangePinPage.load_message"),disableMessage:{title:qiwi.i18n("pinPage.generatePin.not_valid_confirm_pin_title"),message:qiwi.i18n("pinPage.generatePin.not_valid_confirm_pin_message")}}}}},componentWillMount:function(){this.props.fields.login.value=User.login.src,this.props.fields.pin.value="";var route=this.route();this.props.fields.login.value&&this.props.needFull&&(route=this.state.routesPinOnly[0],this.setState({pinOnly:!0,currentRoute:this.state.routesPinOnly}))},getInitialState:function(){return{pinChanged:!1,pinOnly:!1,routesLogin:[this.props.fields.login,this.props.fields.pin],routesLoginOnly:[this.props.fields.login],routesPinOnly:[this.props.fields.pin],routesChangePin:[this.props.fields.login,this.props.fields.pin,this.props.fields.changePin,this.props.fields.confirmPin],routesChangePinOnly:[this.props.fields.pin,this.props.fields.changePin,this.props.fields.confirmPin],currentPosition:0,currentRoute:[this.props.fields.login,this.props.fields.pin],logo:"./img/icons/security.png",providerName:"Visa QIWI Wallet"}},performBackward:function(){this.props.fields.pin.value="",this.props.fields.changePin.value="",this.props.fields.confirmPin.value="",0==this.state.currentPosition?(this.state.pinOnly||User.reset(),this.props.onCancel()):this.setState({currentPosition:this.state.currentPosition-1})},performExit:function(){var _this=this;this.props.context.showPopup({type:"question",title:qiwi.i18n("popups.exit_message"),okButtonText:qiwi.i18n("popups.exit_cancel"),cancelButtonText:qiwi.i18n("popups.exit_ok"),cancelHandler:function(){return _this.props.context.exit()}})},disabledForward:function(){this.route().disableMessage&&this.props.context.showPopup({type:"error",title:this.route().disableMessage.title,message:this.route().disableMessage.message})},showPreloader:function(message){this.props.context.showPreloader({title:qiwi.i18n("loginPage.load_title"),message:message,type:"load"})},hidePreloader:function(){this.props.context.hidePreloader()},performForward:function(){var _this2=this;"changePin"==this.route().name&&(this.props.fields.confirmPin.validator=new validators.ConfirmPinValidator(this.route().value)),"pin"==this.route().name&&(this.props.fields.changePin.value="",this.props.fields.confirmPin.value=""),this.route().requestType?!function(){_this2.showPreloader(_this2.route().loadMessage);var to=new Date,from=new Date;from.setMonth((new Date).getMonth()-1),(new Request).send(_this2.route().requestType,{trm_id:qiwi.terminal.id,version:qiwi.application.toString(),phone:"7"+_this2.props.fields.login.value,currency:User.currentCurrency,check_megafon:1,check_pin:1,urls:_this2.route().urls,pin:_this2.props.fields.pin.value,new_pin:_this2.props.fields.confirmPin.value,from:from.toLocaleFormat("%d.%m.%Y")+" 23:59:59",to:to.toLocaleFormat("%d.%m.%Y")+" 23:59:59",headers:{"X-Proxy-Url":"qw_internal_xml"}}).then(function(result){_this2.hidePreloader();var _result$response$data=result.response.data,errorCode=_result$response$data.errorCode,errorMessage=_result$response$data.errorMessage;if(0!=errorCode)throw _this2.hidePreloader(),"pin"!=_this2.route().name&&"confirmPin"!=_this2.route().name||_this2.updateField(""),new qiwi.errors.UserError(errorMessage,errorCode);switch(_this2.route().requestType){case _this2.props.fields.login.requestType:_this2.showPreloader(qiwi.i18n("loginPage.identification_message")),setTimeout(function(){_this2.hidePreloader(),User.login=_this2.route().value,User.exist=result.response.data.exist,User.hasPin=result.response.data.hasPin,User.offerAccepted=result.response.data.offerAccepted,User.checkUserXmlResponse=result.response.bodyXml,User.hasPin?_this2.nextAction():(User.pin=User.defaultPin,_this2.props.needFull?_this2.props.context.showPopup({type:"question",title:qiwi.i18n("wallet_popups.generatePin.title"),message:qiwi.utils.compileTemplate(qiwi.i18n("wallet_popups.generatePin.text"),{phone:User.login.formatted}),okHandler:function(){_this2.showPreloader(qiwi.i18n("pinPage.generatePin.load_message")),(new Request).send("wallet.register-user",{version:qiwi.application.toString(),phone:"7"+User.login.src,trm_id:qiwi.terminal.id}).then(function(result){_this2.hidePreloader(),_this2.nextAction()},function(fail){throw _this2.hidePreloader(),new qiwi.errors.UserError(fail.message)}).done()},okButtonText:qiwi.i18n("wallet_popups.generatePin.ok"),cancelButtonText:qiwi.i18n("wallet_popups.generatePin.cancel")}):User.offerAccepted?(new Request).send("wallet.register-user",{version:qiwi.application.toString(),phone:"7"+User.login.src,trm_id:qiwi.terminal.id}).then(function(result){return _this2.props.context.showPopup({type:"attention",title:qiwi.utils.compileTemplate(qiwi.i18n("pinPage.generatePin.pin_sent"),{phone:User.login.formatted}),okHandler:function(){return _this2.nextAction()}})},function(fail){throw _this2.hidePreloader(),new qiwi.errors.UserError(fail.message)}).done():(new Request).send(_this2.props.fields.pin.requestType,{version:qiwi.application.toString(),phone:"7"+User.login.src,pin:User.pin,trm_id:qiwi.terminal.id,from:from.toLocaleFormat("%d.%m.%Y")+" 23:59:59",to:to.toLocaleFormat("%d.%m.%Y")+" 23:59:59"}).then(function(result){_this2.hidePreloader(),User.ussdEnabled=result.response.data.ussdEnabled,User.invoices=result.response.data.invoices,_this2.state.currentRoute=_this2.state.routesLoginOnly,_this2.nextAction()},function(fail){throw _this2.hidePreloader(),_this2.updateField(""),new qiwi.errors.UserError(fail.message)}).done())},1e3);break;case _this2.props.fields.pin.requestType:User.pin=_this2.route().value,User.ussdEnabled=result.response.data.ussdEnabled,User.invoices=result.response.data.invoices,_this2.state.pinChanged?_this2.props.context.showPopup({type:"question",title:qiwi.i18n("pinPage.generatePin.change_message"),okHandler:function(){_this2.state.pinChanged=!1,_this2.state.currentRoute=_this2.state.pinOnly?_this2.state.routesChangePinOnly:_this2.state.routesChangePin,_this2.nextAction()},cancelHandler:function(){return _this2.nextAction()},okButtonText:qiwi.i18n("pinPage.generatePin.change_yes"),cancelButtonText:qiwi.i18n("pinPage.generatePin.change_no")}):(_this2.state.currentRoute=_this2.state.pinOnly?_this2.state.routesPinOnly:_this2.state.routesLogin,_this2.nextAction());break;case _this2.props.fields.confirmPin.requestType:User.pin=_this2.route().value,_this2.props.context.showPopup({type:"attention",message:qiwi.i18n("pinPage.generatePin.pin_changed"),okHandler:function(){return _this2.nextAction()}})}},function(fail){throw _this2.hidePreloader(),"pin"!=_this2.route().name&&"confirmPin"!=_this2.route().name||_this2.updateField(""),new qiwi.errors.UserError(fail.message)}).done()}():this.nextAction()},nextAction:function(){this.state.currentPosition==this.state.currentRoute.length-1?this.props.onSuccess():(statistics.showPage(this.state.currentRoute[this.state.currentPosition+1].name),this.setState({currentPosition:this.state.currentPosition+1}))},route:function(){return this.state.currentRoute[this.state.currentPosition]},updateField:function(code){null===code?this.route().value=this.route().value.slice(0,-1):""===code?this.route().value="":this.route().value.length<this.route().maxSymbols&&(this.route().value+=code),this.forceUpdate()},changePin:function(){var _this3=this;this.props.context.showPopup({type:"question",title:qiwi.utils.compileTemplate(qiwi.i18n("pinPage.generatePin.message"),{phone:User.login.formatted}),okHandler:function(){_this3.showPreloader(qiwi.i18n("pinPage.generatePin.load_message")),(new Request).send("wallet.send-pin",{version:qiwi.application.toString(),phone:"7"+_this3.props.fields.login.value}).then(function(result){_this3.hidePreloader(),_this3.state.pinChanged=!0,_this3.props.context.showPopup({type:"attention",message:qiwi.utils.compileTemplate(qiwi.i18n("pinPage.generatePin.pin_sent"),{phone:User.login.formatted})})},function(fail){throw _this3.hidePreloader(),_this3.updateField(""),new qiwi.errors.UserError(fail.message+"\n"+qiwi.i18n("pinPage.generatePin.addition_message_for_generate_error"))}).done()},okButtonText:qiwi.i18n("pinPage.generatePin.yes"),cancelButtonText:qiwi.i18n("pinPage.generatePin.no")})},render:function(){var _this4=this,Field=Textfield,route=this.state.currentRoute[this.state.currentPosition];return React.createElement("div",{className:"overlay-screen"},React.createElement("div",{className:"overlay-pin"},React.createElement(PageHeader,{provider:this.state.providerName,title:this.route().title,subtitle:this.route().subtitle}),this.route().sendPin?React.createElement(Button,{className:"option-button send-pin",onClick:function(){return _this4.changePin()},text:qiwi.i18n("pinPage.generatePin.button")}):null,React.createElement(Field,{className:this.route().secureData?"pinField":"",onEraseClick:function(){return _this4.updateField(null)},text:this.route().secureData?this.route().value.replace(/\d/g,"●"):this.route().value,width:this.route().fieldWidth,mask:this.route().mask,eraseWidth:"133"}),React.createElement(Numpad,{onClick:function(code){return _this4.updateField(code)}})),this.route().sideInfo?React.createElement(InfoBubble,{text:this.route().sideInfo}):null,React.createElement(Logo,{image:this.state.logo}),React.createElement(Navigation,_extends({},this.state.navigation,{nextButton:{visible:!0,enabled:route?route.validator.validate(route.value):!1},forward:this.performForward.bind(this),backward:this.performBackward.bind(this),exit:this.performExit.bind(this),disabledForward:this.disabledForward.bind(this)})))}}))}}});