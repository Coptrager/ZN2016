"use strict";System.register([],function(_export,_context){return{setters:[],execute:function(){_export("default",React.createClass({propTypes:{label:React.PropTypes.string,value:React.PropTypes.string,bubble:React.PropTypes.string,isSmallSize:React.PropTypes.bool},getDefaultProps:function(){return{label:"",value:"",isSmallSize:!1}},getInitialState:function(){return{value:" "}},componentWillMount:function(){this.setState({value:"-1"!=this.props.value?this.props.value:"  "})},shouldComponentUpdate:function(nextProps){return this.props.label!=nextProps.label||this.props.value!=nextProps.value||this.props.bubble!=nextProps.bubble||this.props.warn!=nextProps.warn},componentWillReceiveProps:function(nextProps){this.setState({value:"-1"!=nextProps.value?nextProps.value:"  "})},render:function(){return React.createElement("div",{className:"moneyItem",style:{marginBottom:this.props.isSmallSize?10:35}},this.props.warn?React.createElement("div",{className:"warning"}):null,React.createElement("div",null,React.createElement("div",{className:"label",style:{color:this.props.warn?"#ffb82a":"#ffffff",fontSize:this.props.isSmallSize?35:48}},this.props.label),React.createElement("div",{className:"value"},React.createElement("div",{className:"money",style:{color:this.props.warn?"#ffb82a":"#ffffff",fontSize:this.props.isSmallSize?35:48}},this.state.value),this.props.bubble&&this.props.bubble.length>0&&this.state.value&&this.state.value.length>0?React.createElement("div",{className:"bubble"},this.props.bubble):null)))}}))}}});