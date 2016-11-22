"use strict";System.register(["#initial","terminal","storage","session","stores/regconfig","stores/payment","stores/provider","model/user","model/formatters","sinap"],function(_export,_context){var Init,Terminal,Storage,Session,regConfig,Payment,Provider,User,PhoneFormatter,Sinap,MAIN_SCENARIO,EXTERNAL_SCENARIO;return{setters:[function(_initial){Init=_initial["default"]},function(_terminal){Terminal=_terminal["default"]},function(_storage){Storage=_storage["default"]},function(_session){Session=_session["default"]},function(_storesRegconfig){regConfig=_storesRegconfig["default"]},function(_storesPayment){Payment=_storesPayment["default"]},function(_storesProvider){Provider=_storesProvider["default"]},function(_modelUser){User=_modelUser["default"]},function(_modelFormatters){PhoneFormatter=_modelFormatters.PhoneFormatter},function(_sinap){Sinap=_sinap["default"]}],execute:function(){MAIN_SCENARIO="main",EXTERNAL_SCENARIO="favourite",_export("default",{run:function(){return Provider.id=Storage.get("provider"),Init.run.apply(Init,arguments).then(function(){return Promise.race([regConfig.fetch(Provider.id).then(function(){return Provider.logo="../img/ui_item/"+regConfig.logo,Provider.fullName=regConfig.longName,Provider.shortName=regConfig.shortName,Terminal.send("PrvId",Provider.id,"PrvAllow|PrvDenied")}).then(function(_ref){var allowed=_ref.PrvAllow;return"true"===allowed?null:Promise.reject(qiwi.i18n("errors.providerDenied"))}).then(function(){return Sinap.init()}).then(function(){var favourite=void 0;if(!(Storage.get("login")&&Storage.get("login0")&&Storage.get("balance")&&Storage.get("favourite")))return Promise.resolve(MAIN_SCENARIO);try{favourite=JSON.parse(Storage.getAndRemove("favourite")),favourite.account&&(favourite.extras.account=favourite.account),favourite.extras=Object.keys(favourite.extras).map(function(key){return{name:key,value:favourite.extras[key]}})}catch(e){return Promise.resolve(MAIN_SCENARIO)}return favourite?(User.login=Storage.getAndRemove("login"),Payment.account=User.login.src,Payment.accountFormatter=new PhoneFormatter,User.pin=Storage.getAndRemove("login0"),User.balances=[{currency:Provider.currency,sum:Storage.getAndRemove("balance")}],Payment.updateChange({account:Storage.getAndRemove("login"),id:Storage.getAndRemove("phone_prv_id")||-1}),Session.set("external",!0),Sinap.clean().then(function(){return Sinap.fill(favourite.extras)}).then(function(){return Sinap.block()}).then(function(){return EXTERNAL_SCENARIO})):Promise.resolve(MAIN_SCENARIO)}),Promise.wait(5e3).then(function(){return Promise.reject("Мы пытались подключить провайдера более чем 5 секунд.")})])})}})}}});