"use strict";System.register(["jsx!pages/sinapPage","../sinap/widget","jsx!elements/confirmationTable"],function(_export,_context){function _toConsumableArray(arr){if(Array.isArray(arr)){for(var i=0,arr2=Array(arr.length);i<arr.length;i++)arr2[i]=arr[i];return arr2}return Array.from(arr)}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(self,call){if(!self)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!call||"object"!=typeof call&&"function"!=typeof call?self:call}function _inherits(subClass,superClass){if("function"!=typeof superClass&&null!==superClass)throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:!1,writable:!0,configurable:!0}}),superClass&&(Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass)}var Page,Widget,Table,_createClass,_get,StaticField;return{setters:[function(_jsxPagesSinapPage){Page=_jsxPagesSinapPage["default"]},function(_sinapWidget){Widget=_sinapWidget["default"]},function(_jsxElementsConfirmationTable){Table=_jsxElementsConfirmationTable["default"]}],execute:function(){_createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||!1,descriptor.configurable=!0,"value"in descriptor&&(descriptor.writable=!0),Object.defineProperty(target,descriptor.key,descriptor)}}return function(Constructor,protoProps,staticProps){return protoProps&&defineProperties(Constructor.prototype,protoProps),staticProps&&defineProperties(Constructor,staticProps),Constructor}}(),_get=function get(object,property,receiver){null===object&&(object=Function.prototype);var desc=Object.getOwnPropertyDescriptor(object,property);if(void 0===desc){var parent=Object.getPrototypeOf(object);return null===parent?void 0:get(parent,property,receiver)}if("value"in desc)return desc.value;var getter=desc.get;if(void 0!==getter)return getter.call(receiver)},StaticField=function(_Page){function StaticField(){return _classCallCheck(this,StaticField),_possibleConstructorReturn(this,Object.getPrototypeOf(StaticField).apply(this,arguments))}return _inherits(StaticField,_Page),_createClass(StaticField,[{key:"onShow",value:function(){var _this2=this;return _get(Object.getPrototypeOf(StaticField.prototype),"onShow",this).call(this).then(function(){return _this2.update()})}},{key:"update",value:function(){if(this.fields.find(function(_ref){var layout=_ref.widget.layout;return layout!==Widget.LAYOUT.INFO}))throw new qiwi.errors.UserError(qiwi.i18n("pages.common.error"),"Incorrect widget on staticField",qiwi.errors.ACTIONS.EXIT);this.lines=this.fields.map(function(_ref2){var title=_ref2.title,value=_ref2.value;return{title:title,text:value}}),_get(Object.getPrototypeOf(StaticField.prototype),"update",this).call(this)}},{key:"createClass",value:function(){return _get(Object.getPrototypeOf(StaticField.prototype),"createClass",this).call(this,{getInitialState:function(){return{tableStyle:void 0}},componentDidMount:function(){this.componentDidUpdate()},componentDidUpdate:function(){var _refs=this.refs,table=_refs.table,page=_refs.page,tableNode=React.findDOMNode(table),checkboxMargin=5,windowSize=1024,headerSize=150,tableSize=tableNode.offsetHeight,outerMargin=15,navigationSize=160,availableSpace=windowSize-headerSize-tableSize-2*outerMargin-navigationSize,checkboxesSize=[].concat(_toConsumableArray(page.children)).filter(function(child){return child.className.includes("checkbox")}).map(function(child){return child.offsetHeight+2*checkboxMargin}).reduce(function(m,size){return m+size},0);checkboxesSize>availableSpace&&this.setState({tableStyle:{maxHeight:tableSize-(checkboxesSize-availableSpace)}})},render:function(prepended,appended){var lines=this.props.lines,_state$tableStyle=this.state.tableStyle,tableStyle=void 0===_state$tableStyle?{}:_state$tableStyle;return React.createElement("div",{className:"sinap-field static-field",ref:"page"},prepended(),React.createElement(Table,{ref:"table",style:tableStyle},lines),appended())}})}},{key:"props",get:function(){return Object.assign({},_get(Object.getPrototypeOf(StaticField.prototype),"props",this),{lines:this.lines})}}]),StaticField}(Page),_export("default",StaticField)}}});