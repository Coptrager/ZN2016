"use strict";function _classCallCheck(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function _possibleConstructorReturn(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!=typeof t&&"function"!=typeof t?e:t}function _inherits(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var _slicedToArray=function(){function e(e,t){var n=[],r=!0,o=!1,i=void 0;try{for(var a,s=e[Symbol.iterator]();!(r=(a=s.next()).done)&&(n.push(a.value),!t||n.length!==t);r=!0);}catch(u){o=!0,i=u}finally{try{!r&&s["return"]&&s["return"]()}finally{if(o)throw i}}return n}return function(t,n){if(Array.isArray(t))return t;if(Symbol.iterator in Object(t))return e(t,n);throw new TypeError("Invalid attempt to destructure non-iterable instance")}}(),_createClass=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),_get=function e(t,n,r){null===t&&(t=Function.prototype);var o=Object.getOwnPropertyDescriptor(t,n);if(void 0===o){var i=Object.getPrototypeOf(t);return null===i?void 0:e(i,n,r)}if("value"in o)return o.value;var a=o.get;if(void 0!==a)return a.call(r)};define(["jsx!pages/page","payment"],function(e,t){var n=function(e){function n(e){return _classCallCheck(this,n),_possibleConstructorReturn(this,Object.getPrototypeOf(n).call(this,e||"regionNumber"))}return _inherits(n,e),_createClass(n,[{key:"onShow",value:function(){_get(Object.getPrototypeOf(n.prototype),"onShow",this).call(this),this.setLogo(t.state.logo),this.updateNavigation({nextButton:{enabled:!1}}),this.update()}},{key:"onUpdate",value:function(e){var t=e.code;this.updateNavigation({nextButton:{enabled:t.length>0}}),this.session.set("regionCode",t)}},{key:"createClass",value:function(){var e=this;return this.loadElements(["field","numpad","button","pageHeader"]).then(function(t){var r=_slicedToArray(t,4),o=r[0],i=r[1],a=(r[2],r[3]);return _get(Object.getPrototypeOf(n.prototype),"createClass",e).call(e,{componentWillMount:function(){this.setState({code:this.props.savedCode})},shouldComponentUpdate:function(e,t){return t.code===this.state.code?!1:(this.props.onUpdate(t),!0)},removeSymbol:function(){this.setState({code:this.state.code.slice(0,-1)})},addSymbol:function(e){this.state.code.length<3&&1===e.length&&/\d/.test(e)&&this.setState({code:this.state.code+e})},getInitialState:function(){return{code:""}},getDefaultProps:function(){return{savedCode:""}},render:function(){var e=this;return React.createElement("div",{className:"region-number"},React.createElement(a,{provider:this.props.providerName,title:qiwi.i18n("gibdd_duties.regionNumber.header"),subtitle:qiwi.i18n("gibdd_duties.regionNumber.comment")}),React.createElement(o,{onEraseClick:function(){return e.removeSymbol()},text:this.state.code,width:"680",eraseWidth:"133",className:"textfield-temporary"}),React.createElement(i,{onClick:function(t){return e.addSymbol(t.toString())}}))}})})}},{key:"state",get:function(){return{savedCode:this.session.get("regionCode"),providerName:t.state.provider.fullName}}}]),n}(e);return n});