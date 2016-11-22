"use strict";System.register(["jsx!pages/page","validators"],function(t,e){function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var o,a,r,l,d,c;return{setters:[function(t){o=t["default"]},function(t){a=t["default"]}],execute:function(){r=function(){function t(t,e){var i=[],n=!0,s=!1,o=void 0;try{for(var a,r=t[Symbol.iterator]();!(n=(a=r.next()).done)&&(i.push(a.value),!e||i.length!==e);n=!0);}catch(l){s=!0,o=l}finally{try{!n&&r["return"]&&r["return"]()}finally{if(s)throw o}}return i}return function(e,i){if(Array.isArray(e))return e;if(Symbol.iterator in Object(e))return t(e,i);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),l=function(){function t(t,e){for(var i=0;i<e.length;i++){var n=e[i];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}return function(e,i,n){return i&&t(e.prototype,i),n&&t(e,n),e}}(),d=function e(t,i,n){null===t&&(t=Function.prototype);var s=Object.getOwnPropertyDescriptor(t,i);if(void 0===s){var o=Object.getPrototypeOf(t);return null===o?void 0:e(o,i,n)}if("value"in s)return s.value;var a=s.get;if(void 0!==a)return a.call(n)},c=function(t){function e(){i(this,e);var t=n(this,Object.getPrototypeOf(e).call(this,"second"));return t.timeout=12e4,t.logo="../projects/identification/img/security.png",t._validFieldsCount=0,t.fields={inn:{title:"ИНН",validator:new a.INNValidator,mask:{shown:"XX XX XXXXXX XX",inner:"** ** ****** **"}},snils:{title:"СНИЛС",validator:new a.SNILSValidator,mask:{shown:"XXX-XXX-XXX XX",inner:"***-***-*** **"}},oms:{title:"Полис ОМС",maxSymbols:16,validator:new a.OMSValidator}},t}return s(e,t),l(e,[{key:"onShow",value:function(){d(Object.getPrototypeOf(e.prototype),"onShow",this).call(this),this.clearHeader(),this.fields.inn.text=this.session.get("identification").seconddocument.inn,this.fields.oms.text=this.session.get("identification").seconddocument.oms,this.fields.snils.text=this.session.get("identification").seconddocument.snils,this.updateNavigation({nextButton:{enabled:!1}}),this.update()}},{key:"performExit",value:function(){var t=this;this.showPopup({type:"info",title:"Сообщите данные по телефону",message:"Если вы не хотите самостоятельно заполнять анкету или у вас\nнет под рукой нужного документа, продиктуйте данные\nпо бесплатному телефону 8 800 707-77-59",okHandler:function(){return t.exit()},okButtonText:"НА ГЛАВНУЮ",okButtonAutoSize:!0})}},{key:"performBackward",value:function(){this.statistics.page_data({valid_fields_count:this._validFieldsCount}),this.backward()}},{key:"performForward",value:function(){var t=this;this.statistics.page_data({valid_fields_forward_count:this._validFieldsCount}),this.statistics.page_data({inn:this.fields.inn.validator.validate(this.fields.inn.text),oms:this.fields.oms.validator.validate(this.fields.oms.text),snils:this.fields.snils.validator.validate(this.fields.snils.text)});var e=(this.fields.inn.validator.validate(this.fields.inn.text)?"<inn>"+this.fields.inn.text+"</inn>":"")+(this.fields.oms.validator.validate(this.fields.oms.text)?"<oms>"+this.fields.oms.text+"</oms>":"")+(this.fields.snils.validator.validate(this.fields.snils.text)?"<snils>"+this.fields.snils.text+"</snils>":"");this.request("wallet.confirm-user-profile",{login:this.session.get("identification").login,pin:this.session.get("identification").login0,phone:this.session.get("identification").phone,first_name:this.session.get("identification").firstdocument.firstname,middle_name:this.session.get("identification").firstdocument.middlename,last_name:this.session.get("identification").firstdocument.lastname,birth_date:this.session.get("identification").firstdocument.birthdate,passport_number:this.session.get("identification").firstdocument.passportnumber,second_documents:e,version:qiwi.application.toString()}).done(function(e){t.session.get("identification").seconddocument.inn=t.fields.inn.text,t.session.get("identification").seconddocument.oms=t.fields.oms.text,t.session.get("identification").seconddocument.snils=t.fields.snils.text,t.session.get("identification").verified=e.response.body.verified[0]._text,t.forward()},function(t){throw new qiwi.errors.UserError(t.message)})}},{key:"onUpdate",value:function(t){console.log("not empty onUpdate "+t),this.updateNavigation({nextButton:{enabled:(this._validFieldsCount=t)>0}})}},{key:"createClass",value:function(){var t=this;return this.loadElements(["fieldBlock","numpad"]).then(function(i){var n=r(i,2),s=n[0],o=n[1];return d(Object.getPrototypeOf(e.prototype),"createClass",t).call(t,{onUpdate:function(){var t=this;this.failFields=[],qiwi.utils.forEach(this.props.fields,function(e,i){t.props.fields[i].validator.validate(e.mask&&e.mask.isMasked?qiwi.utils.mask(e.text,e.mask.inner):e.text)||t.failFields.push(i)}),this.props.onUpdate(Object.keys(this.props.fields).length-this.failFields.length),this.fieldFunctions.setFailedFields(this.failFields)},fieldFunctions:{addSymbol:function(){},setFailedFields:function(){}},getDefaultProps:function(){return{fields:{},onUpdate:function(){console.log("empty onUpdate")}}},render:function(){var t=this;return React.createElement("div",{id:"doc-page"},React.createElement("div",{className:"header"},React.createElement("div",{className:"main"},qiwi.i18n("enter_seconddocument")),React.createElement("div",{className:"subtitle"},qiwi.i18n("enter_seconddocument_subtitle"))),0===Object.keys(this.props.fields).length?null:React.createElement(s,{fields:this.props.fields,onUpdate:this.onUpdate,skipSuggests:!0,defaultShim:{template:"или #{_}",color:"blue",hideTitle:!0},fieldFunctions:this.fieldFunctions}),React.createElement(o,{onClick:function(e){return t.fieldFunctions.addSymbol(e)}}))}})})}},{key:"state",get:function(){return{fields:this.fields}}}]),e}(o),t("default",c)}}});