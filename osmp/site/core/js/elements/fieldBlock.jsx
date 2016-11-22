"use strict";System.register(["jsx!elements/field"],function(_export,_context){var Field;return{setters:[function(_jsxElementsField){Field=_jsxElementsField["default"]}],execute:function(){_export("default",React.createClass({propTypes:{defaultShim:React.PropTypes.shape({template:React.PropTypes.string.isRequired}),skipSuggests:React.PropTypes.bool,fields:React.PropTypes.shape({text:React.PropTypes.string,title:React.PropTypes.string,mask:React.PropTypes.shape({inner:React.PropTypes.string.isRequired,shown:React.PropTypes.string}),showShim:React.PropTypes.bool}),onUpdate:React.PropTypes.func,fieldFunctions:React.PropTypes.object},getDefaultProps:function(){return{defaultShim:{template:"Нажмите, чтобы увидеть"},skipSuggests:!1,onUpdate:function(){}}},defaultMaxSymbols:40,componentWillMount:function(){var _this=this;this.props.fieldFunctions&&qiwi.utils.forEach(this.props.fieldFunctions,function(f,name){return _this.props.fieldFunctions[name]=_this[name]}),qiwi.utils.forEach(this.props.fields,function(field){field.text=field.text?field.mask&&field.mask.isMasked?qiwi.utils.demask(field.text,field.mask.inner):field.text.toString():"",field.shim||(field.shim=field.text&&field.showShim?_this.props.defaultShim:null)}),this.current=qiwi.utils.findKey(this.props.fields,function(item){return!item.text}),this.current||1!==Object.keys(this.props.fields).length||(this.current=Object.keys(this.props.fields)[0]),this.props.onUpdate()},updateData:function(){this.props.onUpdate(this.current),this.forceUpdate()},highlight:function(fields){var _this2=this;fields.forEach(function(fieldName){var f=_this2.props.fields[fieldName];f.shim&&delete f.shim}),this.changeCurrent(fields[0])},setFailedFields:function(fields){var _this3=this;qiwi.utils.forEach(this.props.fields,function(field,name){-1!==fields.indexOf(name)&&_this3.current!==name&&field.showShim?field.shim=_this3.props.defaultShim:delete field.shim})},updateSuggests:function(){var _this4=this,fieldName=arguments.length<=0||void 0===arguments[0]?this.current:arguments[0];if(fieldName){var f=this.props.fields[fieldName];return f.autocomplete&&(f.suggests={array:f.autocomplete.apply(f.text),limit:2,onClick:function(text){return _this4.setValue(text)}},0===f.suggests.array.length)?this.removeSuggests(fieldName):void 0}},removeSuggests:function(){var fieldName=arguments.length<=0||void 0===arguments[0]?this.current:arguments[0];if(fieldName){var f=this.props.fields[fieldName];f.suggests&&delete f.suggests}},addSymbol:function(s){if(this.current&&1===s.toString().length){var f=this.props.fields[this.current];f.text+=(f.mask?qiwi.utils.mask(f.text,f.mask.inner).length>=f.mask.inner.length:f.text.length>=(f.maxSymbols||this.defaultMaxSymbols))?"":s.toString(),this.props.skipSuggests||f.mask||this.updateSuggests(),this.updateData()}},setValue:function(value){if(this.current){var f=this.props.fields[this.current];f.text=f.mask?qiwi.utils.mask(value,f.mask.inner):value,this.props.skipSuggests||this.removeSuggests(),this.updateData()}},removeSymbol:function(){if(this.current){var f=this.props.fields[this.current];f.text=f.text.slice(0,-1),this.props.skipSuggests||f.mask||this.updateSuggests(),this.updateData()}},removeAll:function(){if(this.current){var f=this.props.fields[this.current];f.text="",this.props.skipSuggests||this.removeSuggests(),this.updateData()}},changeCurrent:function(nextName){if(nextName!==this.current){var nextField=this.props.fields[nextName],prevField=this.props.fields[this.current]||{};prevField.text&&prevField.showShim&&(prevField.shim=this.props.defaultShim),nextField.shim&&delete nextField.shim,this.props.skipSuggests||this.removeSuggests(),this.current=nextName,this.updateData()}},render:function(){var _this5=this,fields=Object.keys(this.props.fields);return React.createElement("div",{className:"fieldBlock"},qiwi.utils.map(this.props.fields,function(item,key){return React.createElement(Field,{text:item.text||"",title:1!==fields.length&&item.title||null,suggests:item.suggests||null,mask:item.mask||null,shim:item.shim||null,isInactive:key!==_this5.current,eraseText:1===fields.length?"Стереть":"X",eraseWidth:1===fields.length?133:60,eraseBigText:1!==fields.length,onEraseClick:function(){return _this5.removeSymbol()},onClick:function(){return _this5.changeCurrent(key)},className:[1===fields.length?"":"little-text",item.className||""].join(" "),width:1230/Math.min(fields.length,3)-50,key:key})}))}}))}}});